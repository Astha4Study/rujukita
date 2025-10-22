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

        $superAdmin = User::firstOrCreate(
            ['email' => 'superadmin@example.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        $superAdmin->assignRole('super_admin');

        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'admin',
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        $admin->assignRole('admin');

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
