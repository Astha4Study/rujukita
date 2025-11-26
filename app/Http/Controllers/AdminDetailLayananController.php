<?php

namespace App\Http\Controllers;

use App\Models\DetailLayanan;
use App\Models\Layanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminDetailLayananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $user = Auth::user();

        $request->merge([
            'aktif' => filter_var($request->aktif, FILTER_VALIDATE_BOOLEAN),
        ]);

        $validated = $request->validate([
            'nama_layanan' => 'required|string|max:255',
            'harga' => 'required|integer|min:0',
            'aktif' => 'boolean',
            'keterangan' => 'required|string', // ini penting
        ]);

        // simpan ke tabel layanan
        $layanan = Layanan::create([
            'nama_layanan' => $validated['nama_layanan'],
            'harga' => $validated['harga'],
            'aktif' => $validated['aktif'],
            'klinik_id' => $user->klinik_id,
        ]);

        // simpan ke tabel detail_layanan
        DetailLayanan::create([
            'klinik_id' => $user->klinik_id,
            'layanan_id' => $layanan->id, // pastikan ada kolom ini
            'keterangan' => $validated['keterangan'],
        ]);

        return redirect()->route('admin.layanan.index')->with('success', 'Layanan berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
