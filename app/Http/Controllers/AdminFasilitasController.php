<?php

namespace App\Http\Controllers;

use App\Models\Fasilitas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminFasilitasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $fasilitas = Fasilitas::where('created_by', $user->id)->latest()->get();

        return Inertia::render('Admin/Fasilitas/Index', [
            'fasilitas' => $fasilitas,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Fasilitas/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

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
            $validated['gambar'] = $request->file('gambar')->store('fasilitas', 'public');
        }

        $fasilitas = Fasilitas::create($validated);

        if (!$user->fasilitas_id) {
            $user->update(['fasilitas_id' => $fasilitas->id]);
        }

        return redirect()->route('admin.fasilitas.index')->with('success', 'Fasilitas berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Fasilitas $fasilitas)
    {
        $user = Auth::user();

        if ($fasilitas->created_by !== $user->id) {
            abort(403, 'Anda tidak memiliki izin melihat data ini.');
        }

        $fasilitas->load(['pasien']);

        return Inertia::render('Admin/Fasilitas/Show', [
            'fasilitas' => $fasilitas,
            'pasien' => $fasilitas->pasien,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Fasilitas $fasilitas)
    {
        $user = Auth::user();

        if ($fasilitas->created_by !== $user->id) {
            abort(403, 'Admin hanya bisa mengedit fasilitas yang dibuatnya.');
        }

        return Inertia::render('Admin/Fasilitas/Edit', [
            'fasilitas' => $fasilitas,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Fasilitas $fasilitas)
    {
        $user = Auth::user();

           if ($fasilitas->created_by !== $user->id) {
               abort(403, 'Admin hanya bisa memperbarui fasilitas yang dibuatnya.');
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
               'kapasitas_total' => 'required|integer|min:0',
               'kapasitas_tersedia' => 'required|integer|min:0|lte:kapasitas_total',
               'deskripsi' => 'required|string',
               'latitude' => 'nullable|numeric',
               'longitude' => 'nullable|numeric',
               'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096',
           ]);

           $dataToUpdate = $validated;

           if ($request->hasFile('gambar')) {
               if ($fasilitas->gambar) {
                   Storage::disk('public')->delete($fasilitas->gambar);
               }

               $path = $request->file('gambar')->store('fasilitas', 'public');
               $dataToUpdate['gambar'] = $path;
           }

           $fasilitas->update($dataToUpdate);

           return redirect()->route('admin.fasilitas.index')->with('success', 'Data fasilitas berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fasilitas $fasilitas)
    {
        $user = Auth::user();

        if ($fasilitas->created_by !== $user->id) {
            abort(403, 'Admin hanya bisa menghapus fasilitas yang dibuatnya.');
        }

        if ($fasilitas->gambar && Storage::disk('public')->exists($fasilitas->gambar)) {
            Storage::disk('public')->delete($fasilitas->gambar);
        }

        $fasilitas->delete();

        return redirect()->route('admin.fasilitas.index')->with('success', 'Data fasilitas berhasil dihapus.');
    }
}
