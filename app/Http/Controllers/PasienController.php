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

            $pasien = $fasilitasId
                ? Pasien::with('fasilitas')->where('fasilitas_id', $fasilitasId)->latest()->get()
                : collect();

            $fasilitas = $fasilitasId ? Fasilitas::find($fasilitasId) : null;

            return Inertia::render('SuperAdmin/Pasien/Index', [
                'pasien' => $pasien,
                'fasilitas' => $fasilitas,
                'isSuperAdmin' => true,
            ]);
        }

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

        if ($user->hasRole('super_admin')) {
            return redirect()->back()->with('error', 'Super admin tidak dapat menambahkan pasien.');
        }

        $fasilitas = Fasilitas::where('created_by', $user->id)->get();

        if ($fasilitas->isEmpty()) {
            return redirect()->route('perawat.fasilitas.index')->with(
                'warning',
                'Anda belum memiliki fasilitas. Buat fasilitas taerlebih dahulu sebelum menambahkan pasien.'
            );
        }

        return Inertia::render('Perawat/Pasien/Create', [
            'fasilitas' => $fasilitas,
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
            'nama_lengkap' => 'required|string|max:255',
            'nik' => 'required|string|size:16|unique:pasien,nik',
            'jenis_kelamin' => 'required|in:L,P',
            'tanggal_lahir' => 'required|date',
            'tempat_lahir' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'no_hp' => 'required|string|max:15',
            'golongan_darah' => 'nullable|string|max:3',
            'riwayat_penyakit' => 'nullable|string',
            'alergi' => 'nullable|string',
        ]);

        $validated['fasilitas_id'] = $fasilitas->id;
        $validated['created_by'] = $user->id;

        Pasien::create($validated);

        return redirect()
            ->route('perawat.pasien.index')
            ->with('success', 'Data pasien berhasil disimpan.');
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

        return Inertia::render('Perawat/Pasien/Edit', [
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

        // Ambil fasilitas_id dari perawat yang sedang login
        $fasilitas_id = $user->fasilitas_id;

        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'nik' => 'required|string|size:16|unique:pasien,nik,' . $pasien->id,
            'jenis_kelamin' => 'required|in:L,P',
            'tanggal_lahir' => 'required|date',
            'tempat_lahir' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'no_hp' => 'required|string|max:15',
            'golongan_darah' => 'nullable|string|max:3',
            'riwayat_penyakit' => 'nullable|string',
            'alergi' => 'nullable|string',
        ]);

        // Tambahkan fasilitas_id otomatis
        $validated['fasilitas_id'] = $fasilitas_id;

        $pasien->update($validated);

        return redirect()
            ->route('perawat.pasien.index')
            ->with('success', 'Data pasien berhasil diperbarui.');
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

        return redirect()
            ->route('perawat.pasien.index')
            ->with('success', 'Data pasien berhasil dihapus.');
    }
}
