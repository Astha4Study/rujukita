<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\Dokter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AntrianController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

                if (!$user->hasRole('resepsionis')) {
                    abort(403, 'Hanya resepsionis yang dapat mengakses halaman ini.');
                }

                $antrian = Antrian::with(['pasien', 'dokter', 'fasilitas'])
                    ->where('fasilitas_id', $user->fasilitas_id)
                    ->whereDate('tanggal_kunjungan', now()->toDateString())
                    ->orderBy('nomor_antrian')
                    ->get();

                return Inertia::render('Dokter/Antrian/Index', [
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

           $validated = $request->validate([
               'pasien_id' => 'required|exists:pasien,id',
               'spesialis' => 'required',
               'keluhan' => 'nullable|string',
               'tanggal_kunjungan' => 'required|date',
           ]);

           $validated['fasilitas_id'] = $user->fasilitas_id;

           $dokter = Dokter::where('fasilitas_id', $user->fasilitas_id)
               ->where('spesialis', $validated['spesialis'])
               ->where('status', 'available')
               ->first();

           $validated['dokter_id'] = $dokter?->user_id;

           $lastNumber = Antrian::where('fasilitas_id', $user->fasilitas_id)
               ->whereDate('tanggal_kunjungan', $validated['tanggal_kunjungan'])
               ->max('nomor_antrian');

           $validated['nomor_antrian'] = ($lastNumber ?? 0) + 1;

           Antrian::create($validated);

           return redirect()->route('resepsionis.antrian.index')
               ->with('success', 'Pasien berhasil dimasukkan ke antrian.');
    }

    public function indexDokter()
        {
            $user = Auth::user();

            if (!$user->hasRole('dokter')) {
                abort(403);
            }

            $antrian = Antrian::with(['pasien'])
                ->where('dokter_id', $user->id)
                ->whereDate('tanggal_kunjungan', now()->toDateString())
                ->orderBy('nomor_antrian')
                ->get();

            return Inertia::render('Dokter/Antrian', [
                'antrian' => $antrian,
            ]);
        }

        public function updateStatus(Request $request, $id)
           {
               $user = Auth::user();

               if (!$user->hasRole('dokter')) {
                   abort(403);
               }

               $antrian = Antrian::where('dokter_id', $user->id)->findOrFail($id);

               $validated = $request->validate([
                   'status' => 'required|in:Menunggu,Sedang Diperiksa,Selesai',
               ]);

               $antrian->update($validated);

               return back()->with('success', 'Status antrian diperbarui.');
           }

           public function indexAll()
               {
                   $user = Auth::user();

                   if (!$user->hasRole(['admin', 'super_admin'])) {
                       abort(403);
                   }

                   $antrian = Antrian::with(['pasien', 'dokter', 'fasilitas'])
                       ->orderByDesc('tanggal_kunjungan')
                       ->paginate(20);

                   return Inertia::render('Admin/AntrianAll', [
                       'antrian' => $antrian,
                   ]);
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
