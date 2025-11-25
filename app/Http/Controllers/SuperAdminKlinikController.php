<?php

namespace App\Http\Controllers;

use App\Models\Klinik;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuperAdminKlinikController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $klinik = Klinik::latest()->get();

        return Inertia::render('SuperAdmin/Klinik/Index', [
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
    public function show(Klinik $klinik)
    {
        $klinik->load(['pasien']);

        return Inertia::render('SuperAdmin/Klinik/Show', [
            'klinik' => $klinik,
            'pasien' => $klinik->pasien,
        ]);
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
