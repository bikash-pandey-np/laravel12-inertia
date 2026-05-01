<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function register()
    {
        return Inertia::render('UserPortal/Auth/Register');
    }

    public function handleRegister(Request $request)
    {
        $request->validate([
            'business_name' => 'required|string|max:255',
            'pan_no' => 'nullable|string|max:255|unique:businesses,pan_no',
            'phone_no' => 'required|string|max:10|unique:businesses,phone_no',
            'password' => 'required|string|min:8',
        ]);


        Business::create([
            'name' => $request->business_name,
            'pan_no' => $request->pan_no,
            'phone_no' => $request->phone_no,
            'password' => Hash::make($request->password),
        ]);

        return back()->with('success', 'Registration successful. Please login to continue.');
    }

    public function login()
    {
        return Inertia::render('UserPortal/Auth/Login');
    }

    public function handleLogin(Request $request)
    {
        $request->validate([
            'phone_no' => 'required|string|exists:businesses,phone_no',
            'password' => 'required|string',
        ]);

        if (!(Auth::guard('member')->attempt(['phone_no' => $request->phone_no, 'password' => $request->password]))) {
            return back()->with('error', 'Invalid credentials.');
        }
        return redirect()->route('member.dashboard')->with('success', 'Login successful.');
    }

    public function dashboard()
    {
        return Inertia::render('UserPortal/Dashboard');
    }

    public function logout()
    {
        Auth::guard('member')->logout();
        return redirect()->route('member.login')->with('success', 'Logged out successfully.');
    }
}
