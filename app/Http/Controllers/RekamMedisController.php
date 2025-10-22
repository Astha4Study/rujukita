<?php

namespace App\Http\Controllers;

use App\Models\RekamMedis;
use App\Models\Pasien;
use App\Models\Fasilitas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RekamMedisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        $pasien = Pasien::withCount('rekamMedis')
            ->where('created_by', $user->id)
            ->get();

        if ($user->hasRole('super_admin')) {
            $fasilitasId = $request->query('fasilitas');

            $rekamMedis = $fasilitasId
                ? RekamMedis::with(['pasien', 'fasilitas', 'perawat'])
                    ->where('fasilitas_id', $fasilitasId)
                    ->latest()
                    ->get()
                : collect();

            $fasilitas = $fasilitasId ? Fasilitas::find($fasilitasId) : null;

            return Inertia::render('SuperAdmin/RekamMedis/Index', [
                'rekamMedis' => $rekamMedis,
                'pasien' => $pasien,
                'fasilitas' => $fasilitas,
                'isSuperAdmin' => true,
            ]);
        }

        // Untuk perawat: hanya data rekam medis milik fasilitas dia
        $fasilitas = Fasilitas::where('created_by', $user->id)->first();

        $rekamMedis = RekamMedis::with(['pasien', 'fasilitas', 'perawat'])
            ->where('fasilitas_id', $fasilitas->id ?? null)
            ->latest()
            ->get();

        return Inertia::render('Perawat/RekamMedis/Index', [
            'pasien' => $pasien,
            'rekamMedis' => $rekamMedis,
            'isSuperAdmin' => false,
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
            return redirect()->back()->with('error', 'Super admin tidak dapat menambahkan rekam medis.');
        }

        $fasilitas = Fasilitas::where('created_by', $user->id)->first();

        if (!$fasilitas) {
            return redirect()->route('perawat.fasilitas.index')->with(
                'warning',
                'Anda belum memiliki fasilitas. Buat fasilitas terlebih dahulu sebelum menambahkan rekam medis.'
            );
        }

        $pasien = Pasien::where('fasilitas_id', $fasilitas->id)->get();

        return Inertia::render('Perawat/RekamMedis/Create', [
            'fasilitas' => $fasilitas,
            'pasien' => $pasien,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $fasilitas = Fasilitas::where('created_by', $user->id)->first();

        if (!$fasilitas) {
            return redirect()
                ->route('perawat.fasilitas.index')
                ->with('warning', 'Anda belum memiliki fasilitas.');
        }

        $validated = $request->validate([
            'pasien_id' => 'required|exists:pasien,id',
            'tanggal_kunjungan' => 'required|date',
            'keluhan' => 'required|string',
            'diagnosa' => 'nullable|string',
            'tindakan' => 'nullable|string',
            'resep_obat' => 'nullable|string',
            'catatan_lain' => 'nullable|string',
        ]);

        $validated['fasilitas_id'] = $fasilitas->id;
        $validated['ditangani_oleh'] = $user->id;

        RekamMedis::create($validated);

        return redirect()
            ->route('perawat.rekam-medis.index')
            ->with('success', 'Rekam medis berhasil disimpan.');

    }

    /**
     * Display the specified resource.
     */
    public function show(RekamMedis $rekamMedis)
    {
        $rekamMedis->load(['pasien', 'fasilitas', 'perawat']);

        return Inertia::render('Perawat/RekamMedis/Show', [
            'rekamMedis' => $rekamMedis,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RekamMedis $rekamMedis)
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
            abort(403, 'Super admin tidak dapat mengedit rekam medis.');
        }

        $fasilitas = Fasilitas::where('created_by', $user->id)->first();

        if ($rekamMedis->fasilitas_id !== $fasilitas->id) {
            abort(403, 'Anda tidak memiliki izin untuk mengedit data ini.');
        }

        $pasien = Pasien::where('fasilitas_id', $fasilitas->id)->get();

        return Inertia::render('Perawat/RekamMedis/Edit', [
            'rekamMedis' => $rekamMedis,
            'pasien' => $pasien,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RekamMedis $rekamMedis)
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
            abort(403, 'Super admin tidak dapat memperbarui rekam medis.');
        }

        $validated = $request->validate([
            'pasien_id' => 'required|exists:pasien,id',
            'tanggal_kunjungan' => 'required|date',
            'keluhan' => 'required|string',
            'diagnosa' => 'nullable|string',
            'tindakan' => 'nullable|string',
            'resep_obat' => 'nullable|string',
            'catatan_lain' => 'nullable|string',
        ]);

        $rekamMedis->update($validated);

        return redirect()
            ->route('perawat.rekam-medis.index')
            ->with('success', 'Rekam medis berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RekamMedis $rekamMedis)
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
            abort(403, 'Super admin tidak dapat menghapus rekam medis.');
        }

        $rekamMedis->delete();

        return redirect()
            ->route('perawat.rekam-medis.index')
            ->with('success', 'Rekam medis berhasil dihapus.');
    }
}
