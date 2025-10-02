<?php

namespace App\Http\Controllers;

use App\Models\Patients;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('patients/Index', [
            'patients' => Patients::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('patients/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'nik' => 'required|digits:16|unique:patients,nik',
            'gender' => 'required|in:L,P',
            'age' => 'required|integer|min:0',
            'address' => 'required|string',
            'phone' => 'required|string|max:20',
        ]);

        Patients::create($request->all());

        return redirect()->route('patients.index')->with('success', 'Pasien berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('patients/Edit', [
            'patient' => Patients::findOrFail($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Patients $patient)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'nik' => 'required|string|unique:patients,nik,' . $patient->id,
            'gender' => 'required|in:L,P',
            'age' => 'required|integer',
            'address' => 'required|string',
            'phone' => 'required|string',
        ]);

        $patient->update($request->all());

        return to_route('patients.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patients $patient)
    {
        $patient->delete();

        return redirect()->route('patients.index');
    }
}
