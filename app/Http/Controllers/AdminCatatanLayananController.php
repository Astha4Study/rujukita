<?php

namespace App\Http\Controllers;

use App\Models\CatatanLayanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminCatatanLayananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admin = Auth::user();

        $tindakan = CatatanLayanan::with(['pasien', 'dokter', 'klinik'])
            ->when($admin->hasRole('admin'), function ($q) use ($admin) {
                $q->where('klinik_id', $admin->klinik_id);
            })
            ->orderBy('tanggal_kunjungan', 'desc')
            ->get();

        return Inertia::render('Admin/CatatanLayanan/Index', [
            'tindakan' => $tindakan,
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
    public function show(string $id)
    {
        $tindakan = CatatanLayanan::with(['pasien', 'dokter', 'klinik'])
            ->findOrFail($id);

        return Inertia::render('Admin/CatatanLayanan/Show', [
            'tindakan' => $tindakan,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $tindakan = CatatanLayanan::findOrFail($id);

        return Inertia::render('Admin/CatatanLayanan/Edit', [
            'tindakan' => $tindakan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tindakan = CatatanLayanan::findOrFail($id);

        $validated = $request->validate([
            'pasien_id' => 'required|exists:pasien,id',
            'dokter_id' => 'nullable|exists:dokter,id',
            'antrian_id' => 'nullable|exists:antrian,id',
            'tanggal_kunjungan' => 'required|date',
            'keluhan_utama' => 'nullable|string',
            'detail_keluhan' => 'nullable|string',
            'diagnosa' => 'nullable|string',
            'tindakan' => 'nullable|string',
            'catatan_lain' => 'nullable|string',
        ]);

        $tindakan->update($validated);

        return redirect()
            ->route('admin.catatan-layanan.index')
            ->with('success', 'Catatan layanan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tindakan = CatatanLayanan::findOrFail($id);
        $tindakan->delete();

        return redirect()
            ->route('admin.catatan-layanan.index')
            ->with('success', 'Catatan layanan berhasil dihapus.');
    }
}
