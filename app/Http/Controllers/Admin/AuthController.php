<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use Throwable;

class AuthController extends Controller
{
    public function login()
    {
        return Inertia::render('AdminPortal/Login');
    }

    public function handleLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|exists:users,email',
            'password' => 'required|min:6'
        ]);

        try {
            if (!(Auth::attempt([
                'email' => $request->email,
                'password' => $request->password
            ]))) {
                return back()->with('error', 'invalid credentials');
            }

            return redirect()
                ->route('admin.dashboard')
                ->with('success', 'Login successful');
        } catch (Throwable $th) {
            return back()->with('error', 'Server Error');
        }
    }

    public function dashboard()
    {
        return Inertia::render('AdminPortal/Dashboard');
    }
}
