<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Facilities extends Model
{
    protected $fillable = [
        'name',
        'type',
        'address',
        'city',
        'latitude',
        'longitude',
        'capacity',
        'available_beds',
        'specialization',
    ];

    protected $casts = [
        'latitude' => 'decimal:6',
        'longitude' => 'decimal:6',
        'capacity' => 'integer',
        'available_beds' => 'integer',
    ];

    public function referrals()
    {
        return $this->hasMany(Referrals::class);
    }
}
