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
        $service = Service::create($request->all());
        return response()->json($service, 201);
    }

    public function show($id)
    {
        $service = Service::find($id);
        
        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        return response()->json($service);
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);
        $service->update($request->all());
        return response()->json($service);
    }

    public function destroy($id)
    {
        Service::findOrFail($id)->delete();
        return response()->json(['message' => 'Service deleted successfully']);
    }
}
