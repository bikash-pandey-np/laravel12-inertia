<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::guard('member')->user();

        return Inertia::render('UserPortal/Settings/Profile', [
            'user' => $user,
        ]);
    }

    public function verifyPhone()
    {
        $user = Auth::guard('member')->user();

        return Inertia::render('UserPortal/Settings/VerifyPhone', [
            'user' => $user
        ]);
    }

    public function sendOtp(Request $request)
    {
        $user = Auth::guard('member')->user();

        // 1. Generate a 6-digit code
        $otp = rand(100000, 999999);


        // 2. Store in Cache for 5 minutes (Keyed by user UUID)
        Cache::put('phone_otp_' . $user->uuid, $otp, now()->addMinutes(5));

        Log::info("Generated OTP for {$user->phone_no}: {$otp}"); // For testing purposes, log the OTP. Remove in production.
        // 3. TODO: Integrate your SMS Gateway here (e.g., Twilio, SparrowSMS)
        // Log::info("OTP for {$user->phone_no}: {$otp}");

        return back()->with('success', 'OTP has been sent to your mobile.');
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'otp' => 'required|numeric|digits:6',
        ]);

        $user = Auth::guard('member')->user();
        $cachedOtp = Cache::get('phone_otp_' . $user->uuid);

        if (!$cachedOtp || $cachedOtp != $request->otp) {
            return back()->withErrors(['otp' => 'The OTP is invalid or has expired.']);
        }

        // Success: Update user
        $user->update([
            'is_phone_verified' => true,
            'phone_verified_at' => now(),
        ]);

        // Clean up cache
        Cache::forget('phone_otp_' . $user->uuid);

        return redirect()->route('member.profile')->with('success', 'Phone verified successfully!');
    }

    public function changePassword()
    {
        return Inertia::render('UserPortal/Settings/ChangePassword');
    }

    public function handleChangePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        $user = Auth::guard('member')->user();


        //current password and new password cannot be same 
        if ($request->current_password === $request->new_password) {
            return back()->with('error', 'Current password and new password cannot be the same.');
        }

        if (!(Hash::check($request->current_password, $user->password))) {
            return back()->with('error', 'Current password is incorrect.');
        }

        $user->update([
            'password' => bcrypt($request->new_password),
        ]);

        return back()->with('success', 'Password changed successfully!');
    }
}
