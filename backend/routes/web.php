<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\ShippingRequestController;
use App\Http\Controllers\Admin\EmailController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin routes with admin role middleware
Route::middleware(['auth','role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/shipping-requests', [ShippingRequestController::class, 'index'])->name('shipping_requests.index');
    Route::get('/shipping-requests/{id}', [ShippingRequestController::class, 'show'])->name('shipping_requests.show');
    Route::patch('/shipping-requests/{id}/status', [ShippingRequestController::class, 'updateStatus'])->name('shipping_requests.update_status');
    Route::post('shipping-requests/send-email', [EmailController::class, 'sendEmail'])->name('shipping_requests.send_email');
});

require __DIR__.'/auth.php';
