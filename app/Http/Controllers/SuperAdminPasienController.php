<?php

namespace App\Http\Controllers;

use App\Models\Klinik;
use App\Models\Pasien;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuperAdminPasienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $klinikId = $request->query('klinik');

        $pasien = $klinikId
            ? Pasien::with('klinik')->where('klinik_id', $klinikId)->latest()->get()
            : collect();

        $klinik = $klinikId ? Klinik::find($klinikId) : null;

        return Inertia::render('SuperAdmin/Pasien/Index', [
            'pasien' => $pasien,
            'klinik' => $klinik,
            'isSuperAdmin' => true,
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
