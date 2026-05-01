<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\User\LoginController;
use App\Http\Controllers\User\ProfileController;

Route::get('/', function () {
    return Inertia::render('Home');
});


Route::prefix('member')->group(function () {

    Route::get('/login', [LoginController::class, 'login'])
        ->name('member.login');

    Route::post('/login', [LoginController::class, 'handleLogin']);
    Route::get('/register', [LoginController::class, 'register'])
        ->name('member.register');

    Route::post('/register', [LoginController::class, 'handleRegister']);


    Route::middleware(['member'])->group(function () {

        Route::get('/dashboard', [LoginController::class, 'dashboard'])
            ->name('member.dashboard');
        Route::get('/', function () {
            return redirect()->route('member.dashboard');
        });

        Route::post('/logout', [LoginController::class, 'logout'])
            ->name('member.logout');

        Route::get('/profile', [ProfileController::class, 'index'])
            ->name('member.profile');

        Route::get('/verify-phone', [ProfileController::class, 'verifyPhone'])
            ->name('member.verify-phone');
        Route::post('/verify-phone/send', [ProfileController::class, 'sendOtp'])
            ->name('member.phone.send-otp');
        Route::post('/verify-phone/verify', [ProfileController::class, 'verifyOtp'])
            ->name('member.phone.verify-otp');

        Route::get('/change-password', [ProfileController::class, 'changePassword'])
            ->name('member.change-password');

        Route::post('/change-password', [ProfileController::class, 'handleChangePassword']);
    });
});
