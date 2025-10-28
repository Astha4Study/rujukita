<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Dokter extends Model
{
    use HasFactory;

    protected $table = 'dokter';

    protected $fillable = [
        'user_id',
        'fasilitas_id',
        'spesialis',
        'status',
        'antrian_saat_ini',
        'max_antrian_per_hari',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function fasilitas()
    {
        return $this->belongsTo(Fasilitas::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($dokter) {
            // Ambil user yang sedang login
            $user = Auth::user();

            if ($user && $user->hasRole('admin')) {
                // Ambil fasilitas yang dibuat oleh admin tersebut
                $fasilitas = Fasilitas::where('created_by', $user->id)->first();

                if ($fasilitas) {
                    $dokter->fasilitas_id = $fasilitas->id;
                }
            }
        });
    }
}
