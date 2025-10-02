<?php

namespace App\Http\Controllers;

use App\Models\Facilities;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacilitiesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('facilities/Index', [
            'facilities' => Facilities::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('facilities/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'type' => 'required|in:Puskesmas,Klinik,Rumah Sakit Umum,Rumah Sakit Rujukan',
            'address' => 'required|string',
            'city' => 'required|string',
            'latitude' => 'required|string',
            'longitude' => 'required|string',
            'capacity' => 'required|integer|min:0',
            'available_beds' => 'required|integer|min:0',
            'specialization' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        Facilities::create($validated);

        return to_route('facilities.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('facilities/Show', [
            'facility' => Facilities::findOrFail($id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('facilities/Edit',  [
            'facilities' => Facilities::findOrFail($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Facilities $facility)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'type' => 'required|in:Puskesmas,Klinik,Rumah Sakit Umum,Rumah Sakit Rujukan',
            'address' => 'required|string',
            'city' => 'required|string',
            'latitude' => 'required|string',
            'longitude' => 'required|string',
            'capacity' => 'required|integer|min:0',
            'available_beds' => 'required|integer|min:0',
            'specialization' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $facility->update($validated);

        return to_route('facilities.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Facilities $facilities)
    {
        $facilities->delete();

        return to_route('facilities.index');
    }
}
