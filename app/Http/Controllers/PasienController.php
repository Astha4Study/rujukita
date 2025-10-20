<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use App\Models\Fasilitas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PasienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
            $fasilitasId = $request->query('fasilitas');

            if ($fasilitasId) {
                $pasien = Pasien::with('fasilitas')
                    ->where('fasilitas_id', $fasilitasId)
                    ->latest()
                    ->get();

                $fasilitas = Fasilitas::find($fasilitasId);
            } else {
                $pasien = collect();
                $fasilitas = null;
            }

            return Inertia::render('superAdmin/Pasien/Index', [
                'pasien' => $pasien,
                'fasilitas' => $fasilitas,
                'isSuperAdmin' => true,
            ]);
        }

        // Jika perawat, tampilkan pasien milik perawat tersebut
        $pasien = Pasien::with('fasilitas')
            ->where('created_by', $user->id)
            ->latest()
            ->get();

        return Inertia::render('Perawat/Pasien/Index', [
            'pasien' => $pasien,
            'isSuperAdmin' => false,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();

        // Hanya perawat yang boleh menambahkan pasien
        if ($user->hasRole('super_admin')) {
            return redirect()->back()->with([
                'error' => 'Super admin tidak dapat menambahkan pasien.'
            ]);
        }

        // Ambil fasilitas yang dibuat oleh perawat ini
        $fasilitas = Fasilitas::where('created_by', $user->id)->get();

        // Jika perawat belum punya fasilitas, arahkan ke halaman fasilitas
        if ($fasilitas->isEmpty()) {
            return redirect()->route('perawat.fasilitas.index')->with([
                'warning' => 'Anda belum memiliki fasilitas. Buat fasilitas terlebih dahulu sebelum menambahkan pasien.'
            ]);
        }

        return Inertia::render('Perawat/Pasien/Create', [
            'fasilitas' => $fasilitas,
            'isSuperAdmin' => false,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
            abort(403, 'Super admin tidak dapat menambahkan pasien.');
        }

        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'nik' => 'required|string|size:16|unique:pasien,nik',
            'jenis_kelamin' => 'required|in:L,P',
            'tanggal_lahir' => 'nullable|date',
            'tempat_lahir' => 'nullable|string|max:255',
            'alamat' => 'required|string',
            'no_hp' => 'nullable|string|max:18',
            'golongan_darah' => 'nullable|string|max:3',
            'riwayat_penyakit' => 'nullable|string',
            'alergi' => 'nullable|string',
            'fasilitas_id' => 'required|exists:fasilitas,id',
        ]);

        $validated['created_by'] = $user->id;

        Pasien::create($validated);

        return redirect()->route('pasien.index')->with('success', 'Pasien berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pasien $pasien)
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
            abort(403, 'Super admin tidak dapat mengedit data pasien.');
        }

        if ($pasien->created_by !== $user->id) {
            abort(403, 'Anda tidak memiliki izin untuk mengedit pasien ini.');
        }

        $fasilitas = Fasilitas::where('created_by', $user->id)->get();

        return Inertia::render('pasien/Edit', [
            'pasien' => $pasien,
            'fasilitas' => $fasilitas,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pasien $pasien)
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
            abort(403, 'Super admin tidak dapat memperbarui data pasien.');
        }

        if ($pasien->created_by !== $user->id) {
            abort(403, 'Anda tidak memiliki izin untuk memperbarui pasien ini.');
        }

        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'jenis_kelamin' => 'required|in:L,P',
            'tanggal_lahir' => 'nullable|date',
            'tempat_lahir' => 'nullable|string|max:255',
            'alamat' => 'required|string',
            'no_hp' => 'nullable|string|max:18',
            'golongan_darah' => 'nullable|string|max:3',
            'riwayat_penyakit' => 'nullable|string',
            'alergi' => 'nullable|string',
            'fasilitas_id' => 'required|exists:fasilitas,id',
        ]);

        $pasien->update($validated);

        return redirect()->route('pasien.index')->with('success', 'Data pasien berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pasien $pasien)
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
            abort(403, 'Super admin tidak dapat menghapus data pasien.');
        }

        if ($pasien->created_by !== $user->id) {
            abort(403, 'Anda tidak memiliki izin untuk menghapus pasien ini.');
        }

        $pasien->delete();

        return redirect()->route('pasien.index')->with('success', 'Data pasien berhasil dihapus.');
    }
}
