<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class FasilitasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create('id_ID');

        $jenisFasilitas = ['Rumah Sakit Umum', 'Klinik', 'Puskesmas', 'Dokter Mandiri'];
        $spesialisasi = ['Umum', 'Anak', 'Kandungan', 'Bedah', 'Gigi', 'Mata', 'Jantung', 'Kulit', 'Saraf', 'Lainnya'];

        for ($i = 0; $i < 10; $i++) {
            DB::table('fasilitas')->insert([
                'nama_fasilitas' => 'Fasilitas ' . Str::random(5),
                'jenis_fasilitas' => $faker->randomElement($jenisFasilitas),
                'alamat' => $faker->streetAddress,
                'kota' => $faker->city,
                'provinsi' => $faker->state,
                'no_telepon' => $faker->phoneNumber,
                'email' => $faker->safeEmail,
                'kapasitas_total' => $faker->numberBetween(10, 100),
                'kapasitas_tersedia' => $faker->numberBetween(0, 100),
                'spesialisasi' => $faker->randomElement($spesialisasi),
                'deskripsi' => $faker->paragraph,
                'latitude' => $faker->latitude,
                'longitude' => $faker->longitude,
                'gambar' => 'fasilitas_' . $i . '.jpg',
                'created_by' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

    }
}
