<?php

namespace App\Http\Controllers;

use App\Models\Fasilitas;
use App\Models\Pasien;
use App\Models\Rujukan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RujukanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $query = Rujukan::with(['pasien', 'faskesAsal', 'faskesTujuan', 'dibuatOleh'])
            ->latest();

        if ($user->hasRole('resepsionis')) {
            $query->where('dibuat_oleh', $user->id);
        }

        $rujukan = $query->get();

        return Inertia::render('Rujukan/Index', [
            'rujukan' => $rujukan,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();

        $pasien = Pasien::query()
            ->when(!$user->hasRole('admin'), function ($query) use ($user) {
                $query->where('fasilitas_id', $user->fasilitas_id);
            })
            ->get();

        return Inertia::render('Rujukan/Create', [
            'pasien' => $pasien,
            'fasilitas' => Fasilitas::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'pasien_id' => 'required|exists:pasien,id',
            'fasilitas_tujuan_id' => 'required|exists:fasilitas,id',
            'alasan_rujukan' => 'required|string',
            'tanggal_rujukan' => 'required|date',
        ]);

        $validated['fasilitas_asal'] = $user->fasilitas_id ?? null;

        $validated['dibuat_oleh'] = $user->id;
        $validated['status'] = 'Menunggu';

        Rujukan::create($validated);

        return redirect()->route('rujukan.index')->with('success', 'Data rujukan berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Rujukan $rujukan)
    {
        $rujukan->load(['pasien', 'faskesAsal', 'faskesTujuan', 'dibuatOleh']);

        return Inertia::render('Rujukan/Show', [
            'rujukan' => $rujukan,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rujukan $rujukan)
    {
        $user = Auth::user();

        $pasien = Pasien::query()
            ->when(!$user->hasRole('admin'), function ($query) use ($user) {
                $query->where('fasilitas_id', $user->fasilitas_id);
            })
            ->get();

        return Inertia::render('Rujukan/Edit', [
            'rujukan' => $rujukan->load(['pasien']),
            'pasien' => $pasien,
            'fasilitas' => Fasilitas::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Rujukan $rujukan)
    {
        $validated = $request->validate([
            'status' => 'in:Menunggu,Diterima,Ditolak,Selesai',
            'catatan_tujuan' => 'nullable|string',
        ]);

        $rujukan->update($validated);

        return redirect()->route('rujukan.index')->with('success', 'Data rujukan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rujukan $rujukan)
    {
        $rujukan->delete();

        return redirect()->route('rujukan.index')->with('success', 'Data rujukan berhasil dihapus.');
    }
}
