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
        // $this->call(FasilitasSeeder::class);
        $this->call(RoleSeeder::class);

        $SuperAdmin = User::firstOrCreate(
            ['email' => 'superadmin@example.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        $SuperAdmin->assignRole('super_admin');

        $resepsionis = User::firstOrCreate(
            ['email' => 'Resepsionis@example.com'],
            [
                'name' => 'Resepsionis',
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        $resepsionis->assignRole('resepsionis');

        $resepsionis2 = User::firstOrCreate(
            ['email' => 'Resepsionis2@example.com'],
            [
                'name' => 'Resepsionis2',
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        $resepsionis2->assignRole('resepsionis');


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
