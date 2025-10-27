<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\Pasien;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ResepsionisAntrianController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

            if (!$user->hasRole('resepsionis')) {
                abort(403);
            }

            $antrian = Antrian::with(['pasien', 'dokter'])
                ->where('fasilitas_id', $user->fasilitas_id)
                ->whereDate('tanggal_kunjungan', now()->toDateString())
                ->orderBy('nomor_antrian', 'asc')
                ->get();

            return Inertia::render('Resepsionis/Antrian/Index', [
                'antrian' => $antrian,
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();

                if (!$user->hasRole('resepsionis')) {
                    abort(403);
                }

                $dokter = User::role('dokter')
                    ->where('fasilitas_id', $user->fasilitas_id)
                    ->get(['id', 'name']);

                return Inertia::render('Resepsionis/Antrian/Create', [
                    'pasien' => null,
                    'dokter' => $dokter,
                ]);
    }

    public function createForPasien($pasienId)
        {
            $user = Auth::user();

            if (!$user->hasRole('resepsionis')) {
                abort(403);
            }

            $pasien = Pasien::where('fasilitas_id', $user->fasilitas_id)
                ->findOrFail($pasienId);

            $dokter = User::role('dokter')
                ->where('fasilitas_id', $user->fasilitas_id)
                ->get(['id', 'name']);

            return Inertia::render('Resepsionis/Antrian/Create', [
                'pasien' => $pasien,
                'dokter' => $dokter,
            ]);
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
