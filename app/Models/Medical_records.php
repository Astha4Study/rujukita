<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medical_records extends Model
{
    protected $fillable = [
        'patient_id',
        'symptoms',
        'diagnosis',
        'history',
        'status_severity',
    ];

    protected $casts = [
        'patient-id' => 'integer',
        'status_severity' => 'string'
    ];

    public function patient()
    {
        return $this->belongsTo(Patients::class);
    }

    public function referrals()
    {
        return $this->hasMany(Referrals::class);
    }
}
