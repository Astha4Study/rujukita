<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rujukan extends Model
{
    use HasFactory;

    protected $table = 'rujukan';

    protected $fillable = [
        'pasien_id',
        'fasilitas_awal',
        'fasilitas_tujuan_id',
        'dibuat_oleh',
        'tanggal_rujukan',
        'alasan_rujukan',
        'status',
        'catatan_tujuan',
    ];

    public function pasien()
    {
        return $this->belongsTo(Pasien::class);
    }

    public function faskesAsal()
    {
        return $this->belongsTo(Fasilitas::class, 'fasilitas_');
    }

    public function faskesTujuan()
    {
        return $this->belongsTo(Fasilitas::class, 'fasilitas_tujuan_id');
    }

    public function dibuatOleh()
    {
        return $this->belongsTo(User::class, 'dibuat_oleh');
    }

    public function rekamMedis()
    {
        return $this->belongsTo(RekamMedis::class);
    }
}
