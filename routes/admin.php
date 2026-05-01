<?php

use App\Http\Controllers\Admin\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/login', [AuthController::class, 'login'])
    ->name('admin.login');
Route::post('/login', [AuthController::class, 'handleLogin']);


Route::get('/dashboard', [AuthController::class, 'dashboard'])
    ->name('admin.dashboard');

Route::get('/', function () {
    return redirect()->route('admin.dashboard');
});
