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
         } elseif ($user->hasRole('admin')) {
             $fasilitas = Fasilitas::where('created_by', $user->id)->latest()->get();
             $viewPath = 'Admin/Fasilitas/Index';
         } elseif ($user->hasRole('resepsionis') || $user->hasRole('dokter')) {
             $fasilitas = Fasilitas::where('created_by', $user->created_by)->get();
             $viewPath = 'Resepsionis/Fasilitas/Index';
         } else {
             abort(403, 'Anda tidak memiliki izin mengakses fasilitas.');
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

        if ($user->hasRole('super_admin') || $user->hasRole('resepsionis')) {
             abort(403, 'Anda tidak memiliki izin membuat fasilitas.');
         }

         return Inertia::render('Admin/Fasilitas/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin') || $user->hasRole('resepsionis')) {
            abort(403, 'Anda tidak memiliki izin membuat fasilitas.');
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

        return redirect()->route('admin.fasilitas.index')->with('success', 'Fasilitas berhasil ditambahkan.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Fasilitas $fasilitas)
    {
        $user = Auth::user();

                if ($user->hasRole('resepsionis') && $fasilitas->id !== $user->fasilitas_id) {
                    abort(403, 'Anda tidak memiliki izin untuk melihat data ini.');
                }

                $fasilitas->load(['pasien']);

                $viewPath = $user->hasRole('super_admin') ? 'SuperAdmin/Fasilitas/Show' :
                            ($user->hasRole('admin') ? 'Admin/Fasilitas/Show' : 'Resepsionis/Fasilitas/Show');

                return Inertia::render($viewPath, [
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

         if ($user->hasRole('super_admin')) {
             abort(403, 'Super admin tidak memiliki izin mengedit fasilitas.');
         }

         if ($user->hasRole('admin')) {
             if ($fasilitas->created_by !== $user->id) {
                 abort(403, 'Admin hanya bisa mengedit fasilitas yang dibuatnya.');
             }
             $viewPath = 'Admin/Fasilitas/Edit';
         } elseif ($user->hasRole('resepsionis') || $user->hasRole('dokter')) {
             if ($fasilitas->created_by !== $user->created_by) {
                 abort(403, 'Anda hanya bisa mengedit fasilitas dari admin yang sama.');
             }
             $viewPath = 'Resepsionis/Fasilitas/Edit';
         } else {
             abort(403, 'Anda tidak memiliki izin mengedit fasilitas.');
         }

         return Inertia::render($viewPath, [
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
             abort(403, 'Super admin tidak memiliki izin memperbarui fasilitas.');
         }

         if ($user->hasRole('admin')) {
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
                 'kapasitas_tersedia' => 'required|integer|min:0|max:' . $fasilitas->kapasitas_total,
                 'deskripsi' => 'required|string',
                 'latitude' => 'nullable|numeric',
                 'longitude' => 'nullable|numeric',
                 'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096',
             ]);

             if ($request->hasFile('gambar')) {
                 if ($fasilitas->gambar && Storage::disk('public')->exists($fasilitas->gambar)) {
                     Storage::disk('public')->delete($fasilitas->gambar);
                 }
                 $validated['gambar'] = $request->file('gambar')->store('fasilitas', 'public');
             }

             $fasilitas->update($validated);

             return redirect()->route('admin.fasilitas.index')
                 ->with('success', 'Data fasilitas berhasil diperbarui.');
         }

         if ($user->hasRole('resepsionis') || $user->hasRole('dokter')) {
                if ($fasilitas->created_by !== $user->created_by) {
                    abort(403, 'Anda hanya bisa memperbarui fasilitas dari admin yang sama.');
                }

                $validated = $request->validate([
                    'kapasitas_total' => 'required|integer|min:0',
                    'kapasitas_tersedia' => 'required|integer|min:0|max:' . ($request->kapasitas_total ?? $fasilitas->kapasitas_total),
                ]);

                $fasilitas->update([
                    'kapasitas_total' => $validated['kapasitas_total'],
                    'kapasitas_tersedia' => $validated['kapasitas_tersedia'],
                ]);

                return redirect()->route('resepsionis.fasilitas.index')
                    ->with('success', 'Kapasitas fasilitas berhasil diperbarui.');
            }
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
                    abort(403, 'Anda tidak memiliki izin menghapus data ini.');
                }

                if ($fasilitas->gambar && Storage::disk('public')->exists($fasilitas->gambar)) {
                    Storage::disk('public')->delete($fasilitas->gambar);
                }

                $fasilitas->delete();
                $redirectRoute = $user->hasRole('admin') ? 'admin.fasilitas.index' : 'resepsionis.fasilitas.index';

                return redirect()->route($redirectRoute)->with('success', 'Data fasilitas berhasil dihapus.');

    }
}
