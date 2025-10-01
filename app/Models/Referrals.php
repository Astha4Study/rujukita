<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Referrals extends Model
{
    protected $fillable = [
        'patient_id',
        'medical_record_id',
        'facility_id',
        'ranking',
        'status',
    ];

    protected $casts = [
        'patient_id' => 'integer',
        'medical_record_id' => 'integer',
        'facility_id' => 'integer',
        'ranking' => 'integer',
        'status' => 'string',
    ];

    public function patient()
    {
        return $this->belongsTo(Patients::class);
    }

    public function medicalRecord()
    {
        return $this->belongsTo(Medical_records::class);
    }

    public function facility()
    {
        return $this->belongsTo(Facilities::class);
    }
}
