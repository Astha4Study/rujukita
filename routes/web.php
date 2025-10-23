<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\FasilitasController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RekamMedisController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::middleware(['role:super_admin'])
        ->prefix('super-admin')
        ->as('super_admin.')
        ->group(function () {
            Route::get('/fasilitas', [FasilitasController::class, 'index'])->name('fasilitas.index');
            Route::get('/fasilitas/{fasilitas}', [FasilitasController::class, 'show'])->name('fasilitas.show');

            Route::get('/pasien', [PasienController::class, 'index'])->name('pasien.index');
            Route::get('/pasien/{pasien}', [PasienController::class, 'show'])->name('pasien.show');

            Route::get('/users/create/{role}', [UserController::class, 'create'])->name('users.create');
            Route::post('/users', [UserController::class, 'store'])->name('users.store');
            Route::get('/users', [UserController::class, 'index'])->name('users.index');

            Route::get('/kelola-admin', [AdminController::class, 'index'])->name('admins.index');
            Route::get('/kelola-admin/create/{role}', [AdminController::class, 'create'])->name('admins.create');
            Route::resource('kelola-admin', AdminController::class)->except(['index', 'create']);
        });

    Route::middleware(['role:admin'])
        ->prefix('admin')
        ->as('admin.')
        ->group(function () {
            Route::get('/fasilitas', [FasilitasController::class, 'index'])->name('fasilitas.index');
            Route::get('/fasilitas/create', [FasilitasController::class, 'create'])->name('fasilitas.create');
            Route::get('/fasilitas/{fasilitas}/edit', [FasilitasController::class, 'edit'])->name('fasilitas.edit');
            Route::resource('fasilitas', FasilitasController::class)->parameters(['fasilitas' => 'fasilitas'])->except(['index', 'create', 'edit', 'show']);

            Route::get('/tambah-user', [UserController::class, 'index'])->name('users.index');
            Route::get('/tambah-user/create', [UserController::class, 'create'])->name('users.create');
            Route::delete('/tambah-user/{user}', [UserController::class, 'destroy'])->name('users.destroy');
            Route::resource('tambah-user', UserController::class)->except(['index', 'create']);
        });

    Route::middleware(['role:resepsionis'])
        ->prefix('resepsionis')
        ->as('resepsionis.')
        ->group(function () {
            Route::get('/fasilitas', [FasilitasController::class, 'index'])->name('fasilitas.index');
            Route::get('/fasilitas/{fasilitas}/edit', [FasilitasController::class, 'edit'])->name('fasilitas.edit');
            Route::resource('fasilitas', FasilitasController::class)->parameters(['fasilitas' => 'fasilitas'])->except(['index', 'edit', 'show']);

            Route::get('/pasien', [PasienController::class, 'index'])->name('pasien.index');
            Route::get('/pasien/create', [PasienController::class, 'create'])->name('pasien.create');
            Route::resource('pasien', PasienController::class)->except(['index', 'create', 'show']);

            Route::get('/rekam-medis', [RekamMedisController::class, 'index'])->name('rekam-medis.index');
            Route::resource('rekam-medis', RekamMedisController::class)->except(['index']);
        });


});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
