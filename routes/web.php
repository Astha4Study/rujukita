<?php

use App\Http\Controllers\AdminAddResepsionisAndDoktorController;
use App\Http\Controllers\AdminKlinikController;
use App\Http\Controllers\DokterAntrianController;
use App\Http\Controllers\DokterFasilitasController;
use App\Http\Controllers\DokterKlinikController;
use App\Http\Controllers\DokterPasienController;
use App\Http\Controllers\RekamMedisController;
use App\Http\Controllers\ResepsionisAntrianController;
use App\Http\Controllers\ResepsionisFasilitasController;
use App\Http\Controllers\ResepsionisKlinikController;
use App\Http\Controllers\ResepsionisPasienController;
use App\Http\Controllers\SuperAdminAddAdminController;
use App\Http\Controllers\SuperAdminKlinikController;
use App\Http\Controllers\SuperAdminPasienController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => Inertia::render('welcome'))->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');

    Route::middleware(['auth', 'role:super_admin'])
        ->prefix('super-admin')
        ->as('super_admin.')
        ->group(function () {
            Route::resource('klinik', SuperAdminKlinikController::class)->only(['index', 'show']);
            Route::resource('pasien', SuperAdminPasienController::class)->only(['index', 'show']);
            Route::get('/admins/create', [SuperAdminAddAdminController::class, 'create'])->name('admins.create');
            Route::post('/admins', [SuperAdminAddAdminController::class, 'store'])->name('admins.store');
            Route::get('/admins', [SuperAdminAddAdminController::class, 'index'])->name('admins.index');
            Route::resource('kelola-admin', SuperAdminAddAdminController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
        });

    Route::middleware(['auth', 'role:admin'])
        ->prefix('admin')
        ->as('admin.')
        ->group(function () {
            Route::resource('klinik', AdminKlinikController::class)
                ->parameters(['klinik' => 'klinik'])
                ->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
            Route::resource('tambah-user', AdminAddResepsionisAndDoktorController::class)
                ->parameters(['tambah-user' => 'user'])
                ->names('users')
                ->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
        });

    Route::middleware(['auth', 'role:resepsionis'])
        ->prefix('resepsionis')
        ->as('resepsionis.')
        ->group(function () {
            Route::resource('klinik', ResepsionisKlinikController::class)
                ->parameters(['klinik' => 'klinik'])
                ->only(['index', 'edit', 'update']);
            Route::resource('pasien', ResepsionisPasienController::class)
                ->parameters(['pasien' => 'pasien'])
                ->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
            Route::get('antrian/create/pasien/{pasien}', [ResepsionisAntrianController::class, 'createForPasien'])
                ->name('antrian.createForPasien');
            Route::resource('antrian', ResepsionisAntrianController::class)
                ->parameters(['antrian' => 'antrian'])
                ->only(['index', 'store', 'edit', 'update', 'destroy']);
        });

    Route::middleware(['auth', 'role:dokter'])
        ->prefix('dokter')
        ->as('dokter.')
        ->group(function (): void {
            Route::resource('klinik', DokterKlinikController::class)
                ->only(['index']);
            Route::resource('pasien', DokterPasienController::class)
                ->parameters(['pasien' => 'pasien'])
                ->only(['index', 'show', 'edit', 'update']);
            Route::resource('antrian', DokterAntrianController::class)
                ->parameters(['antrian' => 'antrian'])
                ->only(['index', 'store', 'edit', 'update', 'destroy']);
        });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
