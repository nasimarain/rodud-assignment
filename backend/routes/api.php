<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ShippingRequestController;

// Authentication routes
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);

// Protected routes for authenticated users
Route::middleware(['auth:sanctum','role:customer'])->group(function () {
    Route::apiResource('shipping-requests', ShippingRequestController::class)
        ->only(['index', 'store', 'show']);
});

// Route::middleware('auth:sanctum')->post('/shipping-requests/store', [ShippingRequestController::class, 'store']);
