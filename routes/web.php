<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\FasilitasController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\RekamMedisController;
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
            Route::resource('fasilitas', FasilitasController::class)->only(['index', 'show']);
            Route::resource('pasien', PasienController::class)->only(['index', 'show']);
            Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
            Route::post('/users', [UserController::class, 'store'])->name('users.store');
            Route::get('/users', [UserController::class, 'index'])->name('users.index');
            Route::resource('kelola-admin', AdminController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
        });

    Route::middleware(['role:admin'])
        ->prefix('admin')
        ->as('admin.')
        ->group(function () {
            Route::resource('fasilitas', FasilitasController::class)->parameters(['fasilitas' => 'fasilitas']);
            Route::resource('tambah-user', UserController::class)
                ->parameters(['tambah-user' => 'user'])
                ->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
        });

    Route::middleware(['role:resepsionis'])
        ->prefix('resepsionis')
        ->as('resepsionis.')
        ->group(function () {
            Route::resource('fasilitas', FasilitasController::class)
                ->parameters(['fasilitas' => 'fasilitas'])
                ->only(['index', 'edit', 'update']);
            Route::resource('pasien', PasienController::class)
                ->parameters(['pasien' => 'pasien'])
                ->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
            Route::resource('rekam-medis', RekamMedisController::class)
                ->parameters(['rekam-medis' => 'rekamMedis'])
                ->only(['index', 'create', 'store', 'edit', 'update']);
        });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
