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
            $viewPath = 'Perawat/Fasilitas/Index';
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

        // Ambil fasilitas yang dibuat oleh perawat yang sedang login
        $fasilitas = Fasilitas::where('created_by', $user->id)->get();

        // Render halaman Inertia ke folder Perawat/Pasien/Create
        return Inertia::render('Perawat/Fasilitas/Create', [
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

        return redirect()->route('fasilitas.index')->with('success', 'Fasilitas berhasil ditambahkan.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Fasilitas $fasilita)
    {
        $user = Auth::user();

        // Super Admin bisa lihat semua fasilitas
        // Perawat hanya bisa lihat fasilitas miliknya
        if (!$user->hasRole('super_admin') && $fasilita->created_by !== $user->id) {
            abort(403, 'Anda tidak memiliki izin untuk melihat data ini.');
        }

        // Ambil fasilitas beserta pasien-pasiennya
        $fasilita->load([
            'pasien' => function ($query) {
                $query->select('id', 'nama_lengkap', 'nik', 'fasilitas_id');
            }
        ]);

        return Inertia::render('Fasilitas/Show', [
            'fasilitas' => $fasilita,
            'pasien' => $fasilita->pasien,
            'isSuperAdmin' => $user->hasRole('super_admin'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Fasilitas $fasilita)
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
            abort(403, 'Super admin tidak dapat mengedit fasilitas.');
        }

        if ($fasilita->created_by !== $user->id) {
            abort(403, 'Anda tidak memiliki izin untuk mengedit data ini.');
        }

        return Inertia::render('Fasilitas/Edit', [
            'fasilitas' => $fasilita,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Fasilitas $fasilita)
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
            abort(403, 'Super admin tidak dapat memperbarui fasilitas.');
        }

        if ($fasilita->created_by !== $user->id) {
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
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096',
        ]);

        if ($request->hasFile('gambar')) {
            if ($fasilita->gambar && Storage::disk('public')->exists($fasilita->gambar)) {
                Storage::disk('public')->delete($fasilita->gambar);
            }
            $path = $request->file('gambar')->store('fasilitas', 'public');
            $validated['gambar'] = $path;
        }

        $fasilita->update($validated);

        return redirect()->route('fasilitas.index')->with('success', 'Data fasilitas berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fasilitas $fasilita)
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
            abort(403, 'Super admin tidak dapat menghapus fasilitas.');
        }

        if ($fasilita->created_by !== $user->id) {
            abort(403, 'Anda tidak memiliki izin untuk menghapus data ini.');
        }

        if ($fasilita->gambar && Storage::disk('public')->exists($fasilita->gambar)) {
            Storage::disk('public')->delete($fasilita->gambar);
        }

        $fasilita->delete();

        return redirect()->route('fasilitas.index')->with('success', 'Data fasilitas berhasil dihapus.');
    }
}
