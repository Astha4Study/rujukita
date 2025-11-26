<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Layanan extends Model
{
    use HasFactory;

    protected $table = 'layanan';

    protected $fillable = [
        'klinik_id',
        'nama_layanan',
        'harga',
        'aktif'
    ];

    protected $casts = [
        'aktif' => 'boolean',
    ];

    public function klinik()
    {
        return $this->belongsTo(Klinik::class, 'klinik_id');
    }

    public function detail_layanan()
    {
        return $this->hasMany(DetailLayanan::class, 'layanan_id');
    }

}
