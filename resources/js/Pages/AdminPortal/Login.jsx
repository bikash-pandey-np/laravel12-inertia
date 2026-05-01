import { useForm, Head, Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
  import { ToastContainer, toast } from 'react-toastify';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const {flash} = usePage().props;

    useEffect(() => {
        if(flash.success)
        {
            toast.dismiss();
            toast.success(flash.success)
        }

        if(flash.error)
        {
            toast.dismiss();
            toast.error(flash.error)
        }
        if(flash.info)
        {
            toast.dismiss();
            toast.info(flash.info)
        }



    }, [flash])

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Sign In" />

            {/* ── Page shell ── */}
            <div className="min-h-screen bg-zinc-950 flex">

                {/* ── Left accent panel ── */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-zinc-900 items-center justify-center">
                    {/* Decorative grid */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(to right, #e5e7eb 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />
                    {/* Glowing orb */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500 opacity-10 blur-3xl pointer-events-none" />
                    {/* Brand copy */}
                    <div className="relative z-10 px-16 text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700 text-zinc-400 text-xs tracking-widest uppercase">
                            Welcome back
                        </div>
                        <h1 className="text-5xl font-bold text-white leading-tight tracking-tight"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                            Your work,<br />
                            <span className="text-amber-400">your space.</span>
                        </h1>
                        <p className="text-zinc-400 text-base leading-relaxed max-w-xs mx-auto">
                            Sign in to pick up right where you left off.
                        </p>
                    </div>
                    {/* Bottom decorative dots */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
                        {[...Array(5)].map((_, i) => (
                            <span
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full ${i === 2 ? "bg-amber-400 w-5" : "bg-zinc-600"}`}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Right: form panel ── */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16">
                    <div className="w-full max-w-md space-y-10">

                        {/* Logo mark */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/30">
                                    <svg className="w-5 h-5 text-zinc-950" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <span className="text-white font-semibold text-lg tracking-tight">Acme</span>
                            </div>
                            
                        </div>

                        {/* Flash status (e.g. password reset success) */}
                        {status && (
                            <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 text-sm">
                                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{status}</span>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-6">

                            {/* Email */}
                            <div className="space-y-1.5">
                                <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                                    Email address
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                                        <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                    </span>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        autoComplete="username"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-900 border text-white text-sm placeholder-zinc-600
                                            focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-500 transition-all
                                            ${errors.email
                                                ? "border-red-500 bg-red-950/20"
                                                : "border-zinc-700 hover:border-zinc-600"}`}
                                        placeholder="you@example.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1">
                                        <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                        </svg>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                                        Password
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="text-xs text-zinc-400 hover:text-amber-400 transition-colors"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                                        <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                        </svg>
                                    </span>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-900 border text-white text-sm placeholder-zinc-600
                                            focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-500 transition-all
                                            ${errors.password
                                                ? "border-red-500 bg-red-950/20"
                                                : "border-zinc-700 hover:border-zinc-600"}`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1">
                                        <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                        </svg>
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                           

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="relative w-full py-2.5 px-4 rounded-lg bg-amber-400 hover:bg-amber-300
                                    text-zinc-950 font-semibold text-sm tracking-wide
                                    focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-950
                                    disabled:opacity-60 disabled:cursor-not-allowed
                                    transition-all duration-150 shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin w-4 h-4 text-zinc-700" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Signing in…
                                    </span>
                                ) : (
                                    "Sign in"
                                )}
                            </button>

                           
                        </form>

                        {/* Footer note */}
                        <p className="text-center text-xs text-zinc-600">
                            By signing in, you agree to our{" "}
                            <Link href="/terms" className="underline underline-offset-2 hover:text-zinc-400 transition-colors">Terms</Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="underline underline-offset-2 hover:text-zinc-400 transition-colors">Privacy Policy</Link>.
                        </p>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    );
}