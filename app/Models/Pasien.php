<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Pasien extends Model
{
    use HasFactory;

    protected $table = 'pasien';

    protected $fillable = [
        'nama_lengkap',
        'nik',
        'jenis_kelamin',
        'tanggal_lahir',
        'tempat_lahir',
        'alamat',
        'no_hp',
        'golongan_darah',
        'riwayat_penyakit',
        'alergi',
        'fasilitas_id',
        'created_by',
    ];

    protected $appends = ['umur', 'tanggal_lahir_format'];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getUmurAttribute()
    {
        return $this->tanggal_lahir ? Carbon::parse($this->tanggal_lahir)->age : null;
    }

    public function getTanggalLahirFormatAttribute()
    {
        return $this->tanggal_lahir
            ? Carbon::parse($this->tanggal_lahir)->translatedFormat('d F Y')
            : '-';
    }

    public function rekamMedis()
    {
        return $this->hasMany(RekamMedis::class);
    }

    public function fasilitas()
    {
        return $this->belongsTo(Fasilitas::class);
    }

    protected static function boot()
        {
            parent::boot();

            static::creating(function ($pasien) {
                // Ambil user yang sedang login
                $user = Auth::user();

                if ($user && $user->hasRole('admin')) {
                    // Ambil fasilitas yang dibuat oleh admin tersebut
                    $fasilitas = Fasilitas::where('created_by', $user->id)->first();

                    if ($fasilitas) {
                        $pasien->fasilitas_id = $fasilitas->id;
                    }
                }
            });
        }
}
