<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Antrian extends Model
{
    use HasFactory;

    protected $table = 'antrian';

    protected $fillable = [
            'nomor_antrian',
            'pasien_id',
            'dokter_id',
            'fasilitas_id',
            'rekam_medis_id',
            'spesialis',
            'keluhan',
            'status',
            'tanggal_kunjungan',
        ];

        public function pasien()
        {
            return $this->belongsTo(Pasien::class);
        }

        public function dokter()
        {
            return $this->belongsTo(User::class, 'dokter_id');
        }

        public function fasilitas()
        {
            return $this->belongsTo(Fasilitas::class);
        }

        public function rekamMedis()
        {
            return $this->belongsTo(RekamMedis::class);
        }

        protected static function boot()
            {
                parent::boot();

                static::creating(function ($antrian) {
                    $user = Auth::user();

                    if (!$user || !$user->hasRole('resepsionis')) {
                        throw new \Exception('Hanya resepsionis yang dapat menambahkan antrian.');
                    }

                    $antrian->fasilitas_id = $user->fasilitas_id;

                    if ($antrian->fasilitas_id && $antrian->tanggal_kunjungan) {
                        $lastNumber = self::where('fasilitas_id', $antrian->fasilitas_id)
                            ->whereDate('tanggal_kunjungan', $antrian->tanggal_kunjungan)
                            ->max('nomor_antrian') ?? 0;
                        $antrian->nomor_antrian = $lastNumber + 1;
                    }

                    if (!$antrian->dokter_id && $antrian->spesialis) {
                        $dokter = Dokter::where('fasilitas_id', $antrian->fasilitas_id)
                            ->where('spesialis', $antrian->spesialis)
                            ->where('status', 'aktif')
                            ->first();

                        if ($dokter) {
                            $antrian->dokter_id = $dokter->user_id;
                        }
                    }
                });
            }
}
