<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminAddResepsionisController extends Controller
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

        $resepsionis = User::role('resepsionis')
            ->where('created_by', $admin->id)
            ->get();

        return Inertia::render('Admin/Resepsionis/Index', [
            'resepsionis' => $resepsionis,
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

        return Inertia::render('Admin/Resepsionis/Create');
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
        ]);

        // klinik admin
        $klinikId = $admin->klinik_id;

        if (!$klinikId) {
            return back()->withErrors('Admin belum membuat klinik.');
        }

        $resepsionis = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password'] ?? 'password123'),
            'klinik_id' => $klinikId,
            'created_by' => $admin->id,
        ]);

        $resepsionis->assignRole('resepsionis');

        return redirect()->route('admin.resepsionis.index')
            ->with('success', 'Resepsionis berhasil ditambahkan.');
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

        $resepsionis = User::findOrFail($id);

        if (!$admin->hasRole('admin') || $resepsionis->created_by !== $admin->id) {
            abort(403, 'Tidak boleh menghapus user ini.');
        }

        $resepsionis->delete();

        return redirect()->route('admin.resepsionis.index')
            ->with('success', 'Resepsionis berhasil dihapus.');
    }
}
