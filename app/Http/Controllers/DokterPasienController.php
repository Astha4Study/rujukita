<?php

namespace App\Http\Controllers;

use App\Models\Klinik;
use App\Models\Pasien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DokterPasienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        // Hanya dokter yang bisa akses
        if (!$user->hasRole('dokter')) {
            abort(403, 'Hanya dokter yang dapat mengakses halaman ini.');
        }

        // Ambil pasien yang berada di klinik yang sama dengan dokter
        $pasien = Pasien::with('klinik')
            ->where('klinik_id', $user->klinik_id) // sama seperti dokter
            ->latest()
            ->get();

        return Inertia::render('Dokter/Pasien/Index', [
            'pasien' => $pasien,
            'isDokter' => true,
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
    public function show(Pasien $pasien)
    {
        $user = Auth::user();

        if ($pasien->created_by !== $user->id) {
            abort(403);
        }

        $pasien->load('klinik');

        return Inertia::render('Dokter/Pasien/Show', [
            'pasien' => $pasien,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pasien $pasien)
    {
        $user = Auth::user();
        if ($pasien->created_by !== $user->id) {
            abort(403);
        }

        $klinik = Klinik::where('created_by', $user->id)->get();

        return Inertia::render('Dokter/Pasien/Edit', ['pasien' => $pasien, 'klinik' => $klinik]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pasien $pasien)
    {
        $user = Auth::user();
        if ($pasien->created_by !== $user->id) {
            abort(403);
        }

        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'nik' => 'required|string|size:16|unique:pasien,nik,' . $pasien->id,
            'jenis_kelamin' => 'required|in:L,P',
            'tanggal_lahir' => 'required|date',
            'tempat_lahir' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'no_hp' => 'required|string|max:15',
            'golongan_darah' => 'nullable|string|max:3',
            'riwayat_penyakit' => 'nullable|string',
            'alergi' => 'nullable|string',
        ]);

        $validated['klinik_id'] = $user->klinik_id;
        $pasien->update($validated);

        return redirect()->route('dokter.pasien.index')->with('success', 'Data pasien berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
