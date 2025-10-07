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

        $admin = User::firstOrCreate(
            ['email' => 'superadmin@example.com'],
            [
                'name' => 'admin',
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        $admin->assignRole('super admin');
    }
}
