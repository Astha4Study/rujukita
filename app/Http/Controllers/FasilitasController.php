<?php

namespace App\Http\Controllers;

use App\Models\Fasilitas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FasilitasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
            $fasilitas = Fasilitas::latest()->get();
            $viewPath = 'SuperAdmin/Fasilitas/Index';
        } else {
            $fasilitas = Fasilitas::where('created_by', $user->id)->latest()->get();
            $viewPath = 'Resepsionis/Fasilitas/Index';
        }

        return Inertia::render($viewPath, [
            'fasilitas' => $fasilitas,
            'isSuperAdmin' => $user->hasRole('super_admin'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();

        // Super admin tidak boleh membuat pasien
        if ($user->hasRole('super_admin')) {
            abort(403, 'Super admin tidak dapat menambahkan pasien.');
        }

        // Ambil fasilitas yang dibuat oleh resepsionis yang sedang login
        $fasilitas = Fasilitas::where('created_by', $user->id)->get();

        // Render halaman Inertia ke folder Resepsionis/Pasien/Create
        return Inertia::render('Resepsionis/Fasilitas/Create', [
            'fasilitas' => $fasilitas,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        if ($user->hasRole('super_admin')) {
            abort(403, 'Super admin tidak bisa menambahkan fasilitas.');
        }

        $validated = $request->validate([
            'nama_fasilitas' => 'required|string|max:255',
            'jenis_fasilitas' => 'required|in:Rumah Sakit Umum,Klinik,Puskesmas,Dokter Mandiri',
            'spesialisasi' => 'required|in:Umum,Anak,Kandungan,Bedah,Gigi,Mata,Jantung,Kulit,Saraf,Lainnya',
            'alamat' => 'required|string',
            'kota' => 'required|string',
            'provinsi' => 'nullable|string|max:255',
            'no_telepon' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'kapasitas_total' => 'nullable|integer|min:0',
            'kapasitas_tersedia' => 'nullable|integer|min:0',
            'deskripsi' => 'required|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096',
        ]);

        $validated['created_by'] = $user->id;

        if ($request->hasFile('gambar')) {
            $path = $request->file('gambar')->store('fasilitas', 'public');
            $validated['gambar'] = $path;
        }

        Fasilitas::create($validated);

        return redirect()->route('resepsionis.fasilitas.index')->with('success', 'Fasilitas berhasil ditambahkan.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Fasilitas $fasilitas)
    {
        $user = Auth::user();

        // Super Admin bisa lihat semua fasilitas
        // Resepsionis hanya bisa lihat fasilitas miliknya
        if (! $user->hasRole('super_admin') && $fasilitas->created_by !== $user->id) {
            abort(403, 'Anda tidak memiliki izin untuk melihat data ini.');
        }

        // Ambil fasilitas beserta pasien-pasiennya
        $fasilitas->load([
            'pasien' => function ($query) {
                $query->select('id', 'nama_lengkap', 'nik', 'fasilitas_id');
            },
        ]);

        return Inertia::render('Resepsionis/Fasilitas/Show', [
            'fasilitas' => $fasilitas,
            'pasien' => $fasilitas->pasien,
            'isSuperAdmin' => $user->hasRole('super_admin'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Fasilitas $fasilitas)
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
            abort(403, 'Super admin tidak dapat mengedit fasilitas.');
        }

        if ($fasilitas->created_by !== $user->id) {
            abort(403, 'Anda tidak memiliki izin untuk mengedit data ini.');
        }

        return Inertia::render('Resepsionis/Fasilitas/Edit', [
            'fasilitas' => $fasilitas,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Fasilitas $fasilitas)
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
            abort(403, 'Super admin tidak dapat memperbarui fasilitas.');
        }

        if ($fasilitas->created_by !== $user->id) {
            abort(403, 'Anda tidak memiliki izin untuk memperbarui data ini.');
        }

        $validated = $request->validate([
            'nama_fasilitas' => 'required|string|max:255',
            'jenis_fasilitas' => 'required|in:Rumah Sakit Umum,Klinik,Puskesmas,Dokter Mandiri',
            'spesialisasi' => 'required|in:Umum,Anak,Kandungan,Bedah,Gigi,Mata,Jantung,Kulit,Saraf,Lainnya',
            'alamat' => 'required|string',
            'kota' => 'required|string',
            'provinsi' => 'nullable|string|max:255',
            'no_telepon' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'kapasitas_total' => 'nullable|integer|min:0',
            'kapasitas_tersedia' => 'nullable|integer|min:0',
            'deskripsi' => 'required|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096',
        ]);

        if ($request->hasFile('gambar')) {
            if ($fasilitas->gambar && Storage::disk('public')->exists($fasilitas->gambar)) {
                Storage::disk('public')->delete($fasilitas->gambar);
            }

            $path = $request->file('gambar')->store('fasilitas', 'public');
            $validated['gambar'] = $path;
        }

        $fasilitas->update($validated);

        return redirect()
            ->route('resepsionis.fasilitas.index')
            ->with('success', 'Data fasilitas berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fasilitas $fasilitas)
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
            abort(403, 'Super admin tidak dapat menghapus fasilitas.');
        }

        if ($fasilitas->created_by !== $user->id) {
            abort(403, 'Anda tidak memiliki izin untuk menghapus data ini.');
        }

        if ($fasilitas->gambar && Storage::disk('public')->exists($fasilitas->gambar)) {
            Storage::disk('public')->delete($fasilitas->gambar);
        }

        $fasilitas->delete();

        return redirect()->route('resepsionis.fasilitas.index')->with('success', 'Data fasilitas berhasil dihapus.');
    }
}
