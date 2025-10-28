<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\Fasilitas;
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

         $antrian = Antrian::with(['pasien:id,nama_lengkap', 'dokter:id,name'])
             ->where('fasilitas_id', $user->fasilitas_id)
             ->whereDate('tanggal_kunjungan', now()->toDateString())
             ->orderBy('nomor_antrian', 'asc')
             ->get()
             ->map(function ($a) {
                 return [
                     'id' => $a->id,
                     'nomor_antrian' => $a->nomor_antrian,
                     'pasien_nama' => $a->pasien->nama_lengkap,
                     'dokter_nama' => $a->dokter->name,
                     'keluhan' => $a->keluhan,
                     'status' => $a->status,
                     'created_at' => $a->created_at?->toISOString(),
                 ];
             });

         return Inertia::render('Resepsionis/Antrian/Index', [
             'antrian' => $antrian,
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
     * Form for creating a new resource from pasien.
     */
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
         $user = Auth::user();

         if (!$user->hasRole('resepsionis')) {
             abort(403, 'Hanya resepsionis yang dapat menambahkan antrian.');
         }

         $fasilitas = Fasilitas::where('created_by', $user->created_by)->first();

         if (!$fasilitas) {
             return back()->withErrors(['error' => 'Resepsionis belum terdaftar pada fasilitas mana pun.']);
         }

         $validated = $request->validate([
             'pasien_id' => 'required|exists:pasien,id',
             'dokter_id' => 'nullable|exists:users,id',
             'spesialis' => 'required|in:Umum,Anak,Kandungan,Bedah,Gigi,Mata,Jantung,Kulit,Saraf,Lainnya',
             'keluhan' => 'nullable|string',
             'tanggal_kunjungan' => 'required|date',
         ]);

         try {
             $nomor = Antrian::where('fasilitas_id', $fasilitas->id)
                 ->whereDate('tanggal_kunjungan', $validated['tanggal_kunjungan'])
                 ->max('nomor_antrian') + 1;

             Antrian::create([
                 'nomor_antrian' => $nomor,
                 'pasien_id' => $validated['pasien_id'],
                 'dokter_id' => $validated['dokter_id'] ?? null,
                 'fasilitas_id' => $fasilitas->id,
                 'spesialis' => $validated['spesialis'],
                 'keluhan' => $validated['keluhan'] ?? null,
                 'tanggal_kunjungan' => $validated['tanggal_kunjungan'],
                 'status' => 'Menunggu',
             ]);

             return redirect()
                 ->route('resepsionis.antrian.index')
                 ->with('success', 'Antrian berhasil ditambahkan!');
         } catch (\Exception $e) {
             return back()->withErrors(['error' => 'Gagal menambahkan antrian: ' . $e->getMessage()]);
         }
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
