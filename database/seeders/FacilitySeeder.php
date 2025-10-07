<?php

namespace Database\Seeders;

use App\Models\Facilities;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class FacilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = ['RSU', 'Klinik', 'Puskesmas', 'RS Rujukan'];
        $cities = ['Purwokerto', 'Cilacap', 'Banjarnegara', 'Purbalingga', 'Kebumen'];
        $specializations = ['Umum', 'Gigi', 'Anak', 'Bedah', 'Kandungan', 'Jantung'];

        for ($i = 1; $i <= 10; $i++) {
            $city = $cities[array_rand($cities)];
            $lat = -7.4 + mt_rand(0, 100) / 1000;
            $lng = 109.2 + mt_rand(0, 100) / 1000;

            Facilities::create([
                'name' => 'Fasilitas '.$i,
                'type' => $types[array_rand($types)],
                'address' => 'Jl. '.Str::random(10).' No. '.rand(1, 100),
                'city' => $city,
                'latitude' => $lat,
                'longitude' => $lng,
                'capacity' => rand(10, 50),
                'available_beds' => rand(0, 10),
                'specialization' => $specializations[array_rand($specializations)],
                'image' => 'https://via.placeholder.com/150?text=Fasilitas+'.$i,
            ]);
        }
    }
}
