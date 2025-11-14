<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminAddDoktorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admin = Auth::user();

        if (!$admin->hasRole('admin')) {
            abort(403, 'Akses ditolak.');
        }

        $dokter = User::role('dokter')
            ->where('created_by', $admin->id)
            ->with('dokter')
            ->get();

        return Inertia::render('Admin/Dokter/Index', [
            'dokter' => $dokter,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!Auth::user()->hasRole('admin')) {
            abort(403, 'Akses ditolak.');
        }

        return Inertia::render('Admin/Dokter/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $admin = Auth::user();

        if (!$admin->hasRole('admin')) {
            abort(403, 'Akses ditolak.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'nullable|string|min:8',
            'max_antrian_per_hari' => 'nullable|integer|min:1|max:50',
        ]);

        $klinikId = $admin->klinik_id;

        if (!$klinikId) {
            return back()->withErrors('Admin belum membuat klinik.');
        }

        // Buat user dokter
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password'] ?? 'password123'),
            'klinik_id' => $klinikId,
            'created_by' => $admin->id,
        ]);

        $user->assignRole('dokter');

        // Data ke tabel dokter
        Dokter::create([
            'user_id' => $user->id,
            'klinik_id' => $klinikId,
            'status' => 'tersedia',
            'antrian_saat_ini' => 0,
            'max_antrian_per_hari' => $validated['max_antrian_per_hari'] ?? 7,
        ]);

        return redirect()->route('admin.dokter.index')
            ->with('success', 'Dokter berhasil ditambahkan.');
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
    public function destroy($id)
    {
        $admin = Auth::user();
        $dokter = User::findOrFail($id);

        if (!$admin->hasRole('admin') || $dokter->created_by !== $admin->id) {
            abort(403, 'Tidak boleh menghapus user ini.');
        }

        $dokter->delete();

        return redirect()->route('admin.dokter.index')
            ->with('success', 'Dokter berhasil dihapus.');
    }
}
