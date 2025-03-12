<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceControllers; // Import the ServiceController
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::post('/services', [ServiceControllers::class, 'store']);
// Route::get('/services', [ServiceControllers::class, 'index']);

Route::apiResource('services', ServiceControllers::class); // This line replaces the two lines above
