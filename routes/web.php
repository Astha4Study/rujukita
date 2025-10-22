<?php

use App\Http\Controllers\FasilitasController;
use App\Http\Controllers\PasienController;
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
        });

    Route::middleware(['role:perawat'])
        ->prefix('perawat')
        ->as('perawat.')
        ->group(function () {
            Route::get('/fasilitas', [FasilitasController::class, 'index'])->name('fasilitas.index');
            Route::get('/fasilitas/create', [FasilitasController::class, 'create'])->name('fasilitas.create');
            Route::get('/fasilitas/{fasilitas}/edit', [FasilitasController::class, 'edit'])->name('fasilitas.edit');
            Route::resource('fasilitas', FasilitasController::class)->except(['index', 'create', 'edit', 'show']);

            Route::get('/pasien', [PasienController::class, 'index'])->name('pasien.index');
            Route::get('/pasien/create', [PasienController::class, 'create'])->name('pasien.create');
            Route::resource('pasien', PasienController::class)->except(['index', 'create', 'show']);
        });


});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
