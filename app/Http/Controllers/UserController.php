<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
            $users = User::role('admin')->get();
        } elseif ($user->hasRole('admin')) {
            $users = User::where('created_by', $user->id)->get();
        } else {
            abort(403, 'Anda tidak memiliki izin mengakses daftar user');
        }

        return Inertia::render('Admin/Users/Index', [
            'users' => $users->map(fn($u) => [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'roles' => $u->getRoleNames(),
                'created_by' => $u->created_by,
            ]),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();

        // Tentukan role yang bisa dipilih sesuai role login
        if ($user->hasRole('super_admin')) {
            $availableRoles = ['admin'];
        } elseif ($user->hasRole('admin')) {
            $availableRoles = ['resepsionis', 'dokter'];
        } else {
            abort(403, 'Anda tidak memiliki izin menambahkan user.');
        }

        return Inertia::render('Admin/Users/Create', [
            'availableRoles' => $availableRoles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        // Validasi
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'nullable|string|min:8',
            'role' => 'required|string',
        ]);

        // Pastikan role yang dikirim valid sesuai role user login
        $availableRoles = $user->hasRole('super_admin') ? ['admin'] : ['resepsionis', 'dokter'];
        if (!in_array($validated['role'], $availableRoles)) {
            abort(403, 'Role tidak valid.');
        }

        // Buat user
        $newUser = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password'] ?? 'password123'),
            'fasilitas_id' => $user->fasilitas_id,
            'created_by' => $user->id,
        ]);

        // Assign role dari Spatie
        $newUser->assignRole($validated['role']);

        return redirect()->route('admin.users.index')->with('success', ucfirst($validated['role']) . ' berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $user = Auth::user();
        $editUser = User::findOrFail($id);

        if ($user->hasRole('super_admin') && !$editUser->hasRole('admin')) {
            abort(403, 'Super admin hanya bisa mengedit admin.');
        }

        if ($user->hasRole('admin') && $editUser->created_by !== $user->id) {
            abort(403, 'Admin hanya bisa mengedit user yang dibuatnya.');
        }

        return Inertia::render('Admin/Users/Edit', [
            'user' => $editUser,
            'roles' => $editUser->getRoleNames(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $editUser = User::findOrFail($id);

        if ($user->hasRole('super_admin') && !$editUser->hasRole('admin')) {
            abort(403, 'Super admin hanya bisa mengedit admin.');
        }

        if ($user->hasRole('admin') && $editUser->created_by !== $user->id) {
            abort(403, 'Admin hanya bisa mengedit user yang dibuatnya.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $editUser->id,
            'password' => 'nullable|string|min:8',
        ]);

        $editUser->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'] ? Hash::make($validated['password']) : $editUser->password,
        ]);

        return redirect()->route('admin.users.index')
            ->with('success', 'User berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = Auth::user();
        $deleteUser = User::findOrFail($id);

        if ($user->hasRole('super_admin') && !$deleteUser->hasRole('admin')) {
            abort(403, 'Super admin hanya bisa menghapus admin.');
        }

        if ($user->hasRole('admin') && $deleteUser->created_by !== $user->id) {
            abort(403, 'Admin hanya bisa menghapus user yang dibuatnya.');
        }

        $deleteUser->delete();

        return redirect()->route('admin.users.index')->with('success', 'User berhasil dihapus.');
    }
}
