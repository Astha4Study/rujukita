<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patients extends Model
{
        protected $fillable = [
        'name',
        'nik',
        'gender',
        'age',
        'address',
        'phone'
    ];

    protected $casts = [
        'age' => 'integer',
        'gender' => 'string'
    ];

    public function medicalRecords()
    {
        return $this->hasMany(Medical_records::class);
    }

    public function referrals()
    {
        return $this->hasMany(Referrals::class);
    }
}
