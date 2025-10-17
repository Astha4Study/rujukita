<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RekamMedis extends Model
{

    use HasFactory;
    
    protected $table = 'rekam_medis';

    protected $fillable = [
        'pasien_id',
        'fasilitas_id',
        'ditangani_oleh',
        'tanggal_kunjungan',
        'keluhan',
        'diagnosa',
        'tindakan',
        'resep_obat',
        'catatan_lain',
    ];

    public function pasien()
    {
        return $this->belongsTo(Pasien::class);
    }

    public function fasilitas()
    {
        return $this->belongsTo(Fasilitas::class);
    }

    public function perawat()
    {
        return $this->belongsTo(User::class, 'ditangani_oleh');
    }

    public function rujukan()
    {
        return $this->belongsTo(Rujukan::class);
    }
}
