<?php

namespace App\Http\Controllers;

use App\Models\Fasilitas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ResepsionisFasilitasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        if (!($user->hasRole('resepsionis') || $user->hasRole('dokter'))) {
            abort(403, 'Anda tidak memiliki izin mengakses fasilitas.');
        }

        $fasilitas = Fasilitas::where('created_by', $user->created_by)->get();

        return Inertia::render('Resepsionis/Fasilitas/Index', [
            'fasilitas' => $fasilitas,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Fasilitas $fasilitas)
    {
        $user = Auth::user();

        if (!($user->hasRole('resepsionis') || $user->hasRole('dokter')) || $fasilitas->created_by !== $user->created_by) {
            abort(403, 'Anda tidak memiliki izin mengakses fasilitas ini.');
        }

        $fasilitas->load(['pasien']);

        return Inertia::render('Resepsionis/Fasilitas/Show', [
            'fasilitas' => $fasilitas,
            'pasien' => $fasilitas->pasien,
        ]);
    }

    /**
     * Show the form for editing the specified resource (hanya kapasitas).
     */
    public function edit(Fasilitas $fasilitas)
    {
        $user = Auth::user();

        if (!($user->hasRole('resepsionis') || $user->hasRole('dokter')) || $fasilitas->created_by !== $user->created_by) {
            abort(403, 'Anda tidak memiliki izin mengedit fasilitas ini.');
        }

        return Inertia::render('Resepsionis/Fasilitas/Edit', [
            'fasilitas' => $fasilitas,
        ]);
    }

    /**
     * Update kapasitas fasilitas.
     */
    public function update(Request $request, Fasilitas $fasilitas)
    {
        $user = Auth::user();

        if (!($user->hasRole('resepsionis') || $user->hasRole('dokter')) || $fasilitas->created_by !== $user->created_by) {
            abort(403, 'Anda tidak memiliki izin memperbarui fasilitas ini.');
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

    /**
     * Resepionis/dokter tidak boleh menghapus fasilitas.
     */
    public function destroy(Fasilitas $fasilitas)
    {
        abort(403, 'Resepsionis/dokter tidak bisa menghapus fasilitas.');
    }

    /**
     * Resepionis/dokter tidak boleh membuat fasilitas.
     */
    public function create()
    {
        abort(403, 'Resepsionis/dokter tidak bisa membuat fasilitas.');
    }

    public function store(Request $request)
    {
        abort(403, 'Resepsionis/dokter tidak bisa membuat fasilitas.');
    }
}
