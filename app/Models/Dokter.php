<?php

namespace App\Models;

use App\Models\Klinik;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Dokter extends Model
{
    use HasFactory;

    protected $table = 'dokter';

    protected $fillable = [
        'user_id',
        'klinik_id',
        'status',
        'antrian_saat_ini',
        'max_antrian_per_hari',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function klinik()
    {
        return $this->belongsTo(Klinik::class);
    }

    public function antrian()
    {
        return $this->hasMany(Antrian::class);
    }


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($dokter) {
            // Ambil user yang sedang login
            $user = Auth::user();

            if ($user && $user->hasRole('admin')) {
                // Ambil klinik yang dibuat oleh admin tersebut
                $klinik = Klinik::where('created_by', $user->id)->first();

                if ($klinik) {
                    $dokter->klinik_id = $klinik->id;
                }
            }
        });
    }
}
