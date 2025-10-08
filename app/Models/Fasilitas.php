<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Fasilitas extends Model
{
    use HasFactory;

    protected $table = 'fasilitas';

    protected $fillable = [
        'nama_fasilitas',
        'jenis_fasilitas',
        'spesialisasi',
        'alamat',
        'kota',
        'provinsi',
        'no_telepon',
        'email',
        'kapasitas_total',
        'kapasitas_tersedia',
        'latitude',
        'longitude',
        'gambar',
        'created_by',
    ];

    public function pengguna()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getGambarUrlAttribute()
    {
        return $this->gambar ? asset('storage/' . $this->gambar) : null;
    }

    public function hapusGambarLama()
    {
        if ($this->gambar && Storage::disk('public')->exists($this->gambar)) {
            Storage::disk('public')->delete($this->gambar);
        }
    }
}
