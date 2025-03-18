<?php

namespace App\Http\Controllers;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceControllers extends Controller
{ 
    public function index()
    {
        return response()->json(Service::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0'
        ]);

        $service = Service::create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Service added successfully',
            'data' => $service
        ], 201);
    }

    public function show($id)
    {
        $service = Service::find($id);
        
        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Service fetched successfully',
            'data' => $service
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);
        $service->update($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Service updated successfully',
            'data' => $service
        ], 200);
    }

    public function destroy($id)
    {
        Service::findOrFail($id)->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Service deleted successfully',
        ], 200);
    }
}
