<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PasienController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
            $pasien = Pasien::latest()->get();
        } else {
            $pasien = Pasien::where('created_by', $user->id)->latest()->get();
        }

        return Inertia::render('pasien/Index', [
            'pasien' => $pasien,
        ]);
    }

    public function create()
    {
        return Inertia::render('pasien/Create');
    }

    public function store(Request $request)
    {
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
        ]);

        $validated['created_by'] = Auth::id();

        Pasien::create($validated);

        return redirect()->route('pasien.index')->with('success', 'Pasien berhasil ditambahkan.');
    }

    public function edit(Pasien $pasien)
    {
        $user = Auth::user();

        if (! $user->hasRole('super_admin') && $pasien->created_by !== $user->id) {
            abort(403, 'Anda tidak memiliki izin untuk mengedit data ini.');
        }

        return Inertia::render('pasien/Edit', [
            'pasien' => $pasien,
        ]);
    }

    public function update(Request $request, Pasien $pasien)
    {
        $user = Auth::user();

        if (! $user->hasRole('super_admin') && $pasien->created_by !== $user->id) {
            abort(403, 'Anda tidak memiliki izin untuk memperbarui data ini.');
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
        ]);

        $pasien->update($validated);

        return redirect()->route('pasien.index')->with('success', 'Data pasien berhasil diperbarui.');
    }

    public function destroy(Pasien $pasien)
    {
        $user = Auth::user();

        if (! $user->hasRole('super_admin') && $pasien->created_by !== $user->id) {
            abort(403, 'Anda tidak memiliki izin untuk menghapus data ini.');
        }

        $pasien->delete();

        return redirect()->route('pasien.index')->with('success', 'Data pasien berhasil dihapus.');
    }
}
