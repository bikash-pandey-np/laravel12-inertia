import { useForm, Head, Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function BusinessLogin({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        phone_no: "",
        password: "",
    });

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.dismiss();
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.dismiss();
            toast.error(flash.error);
        }
        if (flash.info) {
            toast.dismiss();
            toast.info(flash.info);
        }
    }, [flash]);

    const submit = (e) => {
        e.preventDefault();
        post(route("member.login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Business Sign In" />

            <div className="min-h-screen bg-zinc-950 flex">
                {/* ── Left accent panel ── */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-zinc-900 items-center justify-center">
                    {/* Grid */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(to right, #e5e7eb 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />
                    {/* Glowing orb */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-sky-500 opacity-10 blur-3xl pointer-events-none" />

                    <div className="relative z-10 px-16 text-center space-y-8">
                        {/* Audit icon */}
                        <div className="flex justify-center">
                            <div className="w-20 h-20 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shadow-xl">
                                <svg
                                    className="w-10 h-10 text-sky-400"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700 text-zinc-400 text-xs tracking-widest uppercase">
                                Audit Platform
                            </div>
                            <h1
                                className="text-5xl font-bold text-white leading-tight tracking-tight"
                                style={{
                                    fontFamily:
                                        "'Playfair Display', Georgia, serif",
                                }}
                            >
                                Audit smarter,
                                <br />
                                <span className="text-sky-400">
                                    not harder.
                                </span>
                            </h1>
                            <p className="text-zinc-400 text-base leading-relaxed max-w-xs mx-auto">
                                Access your business audit reports, compliance
                                checks, and financial insights — all in one
                                place.
                            </p>
                        </div>

                        {/* Feature pills */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {[
                                "Financial Reports",
                                "Tax Compliance",
                                "Real-time Alerts",
                            ].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Bottom dots */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
                        {[...Array(5)].map((_, i) => (
                            <span
                                key={i}
                                className={`h-1.5 rounded-full ${i === 2 ? "bg-sky-400 w-5" : "bg-zinc-600 w-1.5"}`}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Right: form panel ── */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16">
                    <div className="w-full max-w-md space-y-10">
                        {/* Logo + heading */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
                                        />
                                    </svg>
                                </div>
                                <span className="text-white font-semibold text-lg tracking-tight">
                                    AuditPro
                                </span>
                            </div>
                            <div className="pt-1">
                                <h2 className="text-2xl font-bold text-white tracking-tight">
                                    Business Sign In
                                </h2>
                                <p className="text-sm text-zinc-500 mt-1">
                                    Use your registered PAN number to access
                                    your account
                                </p>
                            </div>
                        </div>

                        {/* Flash status */}
                        {status && (
                            <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 text-sm">
                                <svg
                                    className="w-4 h-4 mt-0.5 shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>{status}</span>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-6">
                            {/* Phone Number */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="phone_no"
                                    className="block text-sm font-medium text-zinc-300"
                                >
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                                        <svg
                                            className="w-4 h-4 text-zinc-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={1.75}
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                                            />
                                        </svg>
                                    </span>
                                    <input
                                        id="phone_no"
                                        type="text"
                                        name="phone_no"
                                        autoComplete="username"
                                        value={data.phone_no}
                                        onChange={(e) =>
                                            setData("phone_no", e.target.value)
                                        }
                                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-900 border text-white text-sm placeholder-zinc-600
                                            focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:border-sky-500 transition-all
                                            ${
                                                errors.phone_no
                                                    ? "border-red-500 bg-red-950/20"
                                                    : "border-zinc-700 hover:border-zinc-600"
                                            }`}
                                        placeholder="123456789"
                                    />
                                </div>
                                {errors.phone_no && (
                                    <FieldError message={errors.phone_no} />
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-zinc-300"
                                    >
                                        Password
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route(
                                                "business.password.request",
                                            )}
                                            className="text-xs text-zinc-400 hover:text-sky-400 transition-colors"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                                        <svg
                                            className="w-4 h-4 text-zinc-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={1.75}
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                            />
                                        </svg>
                                    </span>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-900 border text-white text-sm placeholder-zinc-600
                                            focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:border-sky-500 transition-all
                                            ${
                                                errors.password
                                                    ? "border-red-500 bg-red-950/20"
                                                    : "border-zinc-700 hover:border-zinc-600"
                                            }`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.password && (
                                    <FieldError message={errors.password} />
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="relative w-full py-2.5 px-4 rounded-lg bg-sky-500 hover:bg-sky-400
                                    text-white font-semibold text-sm tracking-wide
                                    focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-950
                                    disabled:opacity-60 disabled:cursor-not-allowed
                                    transition-all duration-150 shadow-lg shadow-sky-500/20 hover:shadow-sky-400/30"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg
                                            className="animate-spin w-4 h-4 text-white/70"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            />
                                        </svg>
                                        Signing in…
                                    </span>
                                ) : (
                                    "Sign in to Dashboard"
                                )}
                            </button>

                            {/* Register link */}
                            <p className="text-center text-sm text-zinc-500">
                                Not registered yet?{" "}
                                <Link
                                    href={route("member.register")}
                                    className="text-sky-400 hover:text-sky-300 font-medium transition-colors"
                                >
                                    Register your business
                                </Link>
                            </p>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-zinc-800" />
                            <span className="text-xs text-zinc-600">
                                Admin?
                            </span>
                            <div className="flex-1 h-px bg-zinc-800" />
                        </div>

                        {/* Admin login link */}
                        <div className="text-center">
                            <Link
                                href={route("admin.login")}
                                className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                            >
                                <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                                    />
                                </svg>
                                Sign in as Administrator
                            </Link>
                        </div>

                        {/* Footer */}
                        <p className="text-center text-xs text-zinc-600">
                            By signing in, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-2 hover:text-zinc-400 transition-colors"
                            >
                                Terms
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-2 hover:text-zinc-400 transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    );
}

function FieldError({ message }) {
    return (
        <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1">
            <svg
                className="w-3.5 h-3.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                />
            </svg>
            {message}
        </p>
    );
}
