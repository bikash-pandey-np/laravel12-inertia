<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = Auth::guard('member')->user();

        return [
            ...parent::share($request),
            'user' => $user ? [
                'name'     => $user->name,
                'phone_no' => $user->phone_no,
                'pan_no'   => $user->pan_no,
            ] : null,
            'flash' => [
                'success' => session()->has('success') ? session()->get('success') : null,
                'error' => session()->has('error') ? session()->get('error') : null,
                'info' => session()->has('info') ? session()->get('info') : null,

            ]
        ];
    }
}
