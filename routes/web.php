<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminFasilitasController;
use App\Http\Controllers\DokterFasilitasController;
use App\Http\Controllers\DokterPasienController;
use App\Http\Controllers\RekamMedisController;
use App\Http\Controllers\ResepsionisFasilitasController;
use App\Http\Controllers\ResepsionisPasienController;
use App\Http\Controllers\SuperAdminFasilitasController;
use App\Http\Controllers\SuperAdminPasienController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('welcome'))->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');

    Route::middleware(['role:super_admin'])
        ->prefix('super-admin')
        ->as('super_admin.')
        ->group(function () {
            Route::resource('fasilitas', SuperAdminFasilitasController::class)->only(['index', 'show']);
            Route::resource('pasien', SuperAdminPasienController::class)->only(['index', 'show']);
            Route::get('/admins/create', [AdminController::class, 'create'])->name('admins.create');
            Route::post('/admins', [AdminController::class, 'store'])->name('admins.store');
            Route::get('/admins', [AdminController::class, 'index'])->name('admins.index');
            Route::resource('kelola-admin', AdminController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
        });

    Route::middleware(['role:admin'])
        ->prefix('admin')
        ->as('admin.')
        ->group(function () {
            Route::resource('fasilitas', AdminFasilitasController::class)
                 ->parameters(['fasilitas' => 'fasilitas'])
                 ->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
            Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
            Route::post('/users', [UserController::class, 'store'])->name('users.store');
            Route::get('/users', [UserController::class, 'index'])->name('users.index');
            Route::resource('tambah-user', UserController::class)
                ->parameters(['tambah-user' => 'user'])
                ->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
        });

    Route::middleware(['role:resepsionis'])
        ->prefix('resepsionis')
        ->as('resepsionis.')
        ->group(function () {
            Route::resource('fasilitas', ResepsionisFasilitasController::class)
                ->parameters(['fasilitas' => 'fasilitas'])
                ->only(['index', 'edit', 'update']);
            Route::resource('pasien', ResepsionisPasienController::class)
                ->parameters(['pasien' => 'pasien'])
                ->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
            Route::resource('rekam-medis', RekamMedisController::class)
                ->parameters(['rekam-medis' => 'rekamMedis'])
                ->only(['index', 'create', 'store', 'edit', 'update']);
        });

    Route::middleware(['role:dokter'])
        ->prefix('dokter')
        ->as('dokter.')
        ->group(function () {
            Route::resource('fasilitas', DokterFasilitasController::class)
                ->only(['index']);
            Route::resource('pasien', DokterPasienController::class)
                ->parameters(['pasien' => 'pasien'])
                ->only(['index', 'show', 'edit', 'update']);
        });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
