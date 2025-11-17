<?php

namespace App\Http\Controllers;

use App\Models\Klinik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ResepsionisKlinikController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        if (! ($user->hasRole('resepsionis') || $user->hasRole('dokter'))) {
            abort(403, 'Anda tidak memiliki izin mengakses klinik.');
        }

        $klinik = Klinik::where('created_by', $user->created_by)->get();

        return Inertia::render('Resepsionis/Klinik/Index', [
            'klinik' => $klinik,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Klinik $klinik)
    {
        // $user = Auth::user();

        // if (! ($user->hasRole('resepsionis') || $user->hasRole('dokter')) || $klinik->created_by !== $user->created_by) {
        //     abort(403, 'Anda tidak memiliki izin mengakses klinik ini.');
        // }

        // $klinik->load(['pasien']);

        // return Inertia::render('Resepsionis/Klinik/Show', [
        //     'klinik' => $klinik,
        //     'pasien' => $klinik->pasien,
        // ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Klinik $klinik)
    {
        $user = Auth::user();

        if (! ($user->hasRole('resepsionis') || $user->hasRole('dokter')) || $klinik->created_by !== $user->created_by) {
            abort(403, 'Anda tidak memiliki izin mengedit klinik ini.');
        }

        return Inertia::render('Resepsionis/Klinik/Edit', [
            'klinik' => $klinik,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Klinik $klinik)
    {
        $user = Auth::user();

        if (! ($user->hasRole('resepsionis') || $user->hasRole('dokter')) || $klinik->created_by !== $user->created_by) {
            abort(403, 'Anda tidak memiliki izin memperbarui klinik ini.');
        }

        $validated = $request->validate([
            'kapasitas_total' => 'required|integer|min:0',
            'kapasitas_tersedia' => 'required|integer|min:0|max:'.($request->kapasitas_total ?? $klinik->kapasitas_total),
        ]);

        $klinik->update([
            'kapasitas_total' => $validated['kapasitas_total'],
            'kapasitas_tersedia' => $validated['kapasitas_tersedia'],
        ]);

        return redirect()->route('resepsionis.klinik.index')
            ->with('success', 'Kapasitas klinik berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Klinik $klinik)
    {
        //
    }
}
