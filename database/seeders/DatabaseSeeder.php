<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RoleSeeder::class);
        $this->call(FacilitySeeder::class);

        $SuperAdmin = User::firstOrCreate(
            ['email' => 'superadmin@example.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        $SuperAdmin->assignRole('super_admin');

        $perawat = User::firstOrCreate(
            ['email' => 'Perawat@example.com'],
            [
                'name' => 'Perawat',
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        $perawat->assignRole('perawat');

        $pasien = User::firstOrCreate(
            ['email' => 'iyandabes1@gmail.com'],
            [
                'name' => 'Astha',
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        $pasien->assignRole('pasien');

    }
}
