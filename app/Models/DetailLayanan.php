<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailLayanan extends Model
{
    use HasFactory;

    protected $table = 'detail_layanan';

    protected $fillable = [
        'klinik_id',
        'layanan_id',
        'keterangan'
    ];

    public function klinik()
    {
        return $this->belongsTo(Klinik::class, 'klinik_id');
    }

    public function layanan()
    {
        return $this->belongsTo(Layanan::class, 'layanan_id');
    }


}
