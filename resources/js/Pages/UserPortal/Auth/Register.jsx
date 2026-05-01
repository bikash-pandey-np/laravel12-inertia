import { useForm, Head, Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        business_name: "Pandey Collection",
        pan_no: "123123123",
        phone_no: "9818252111",
        password: "Nepal@123",
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
        post(route("member.register"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Create Account" />

            <div className="min-h-screen bg-zinc-950 flex">
                {/* ── Left accent panel ── */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-zinc-900 items-center justify-center">
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(to right, #e5e7eb 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500 opacity-10 blur-3xl pointer-events-none" />
                    <div className="relative z-10 px-16 text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700 text-zinc-400 text-xs tracking-widest uppercase">
                            Get started
                        </div>
                        <h1
                            className="text-5xl font-bold text-white leading-tight tracking-tight"
                            style={{
                                fontFamily:
                                    "'Playfair Display', Georgia, serif",
                            }}
                        >
                            Your business,
                            <br />
                            <span className="text-amber-400">
                                our platform.
                            </span>
                        </h1>
                        <p className="text-zinc-400 text-base leading-relaxed max-w-xs mx-auto">
                            Register your business and start managing everything
                            in one place.
                        </p>
                    </div>
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
                                    <svg
                                        className="w-5 h-5 text-zinc-950"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                                <span className="text-white font-semibold text-lg tracking-tight">
                                    Acme
                                </span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">
                                    Create an account
                                </h2>
                                <p className="text-sm text-zinc-500 mt-1">
                                    Fill in your business details to get started
                                </p>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-6">
                            {/* Business Name */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="business_name"
                                    className="block text-sm font-medium text-zinc-300"
                                >
                                    Business Name
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
                                                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                                            />
                                        </svg>
                                    </span>
                                    <input
                                        id="business_name"
                                        type="text"
                                        name="business_name"
                                        autoComplete="organization"
                                        value={data.business_name}
                                        onChange={(e) =>
                                            setData(
                                                "business_name",
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-900 border text-white text-sm placeholder-zinc-600
                                            focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-500 transition-all
                                            ${
                                                errors.business_name
                                                    ? "border-red-500 bg-red-950/20"
                                                    : "border-zinc-700 hover:border-zinc-600"
                                            }`}
                                        placeholder="Acme Pvt. Ltd."
                                    />
                                </div>
                                {errors.business_name && (
                                    <FieldError
                                        message={errors.business_name}
                                    />
                                )}
                            </div>

                            {/* PAN No */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="pan_no"
                                    className="block text-sm font-medium text-zinc-300"
                                >
                                    PAN Number
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
                                        id="pan_no"
                                        type="text"
                                        name="pan_no"
                                        value={data.pan_no}
                                        onChange={(e) =>
                                            setData("pan_no", e.target.value)
                                        }
                                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-900 border text-white text-sm placeholder-zinc-600
                                            focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-500 transition-all
                                            ${
                                                errors.pan_no
                                                    ? "border-red-500 bg-red-950/20"
                                                    : "border-zinc-700 hover:border-zinc-600"
                                            }`}
                                        placeholder="123456789"
                                    />
                                </div>
                                {errors.pan_no && (
                                    <FieldError message={errors.pan_no} />
                                )}
                            </div>

                            {/* Phone No */}
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
                                                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                            />
                                        </svg>
                                    </span>
                                    <input
                                        id="phone_no"
                                        type="tel"
                                        name="phone_no"
                                        autoComplete="tel"
                                        value={data.phone_no}
                                        onChange={(e) =>
                                            setData("phone_no", e.target.value)
                                        }
                                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-900 border text-white text-sm placeholder-zinc-600
                                            focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-500 transition-all
                                            ${
                                                errors.phone_no
                                                    ? "border-red-500 bg-red-950/20"
                                                    : "border-zinc-700 hover:border-zinc-600"
                                            }`}
                                        placeholder="+977 98XXXXXXXX"
                                    />
                                </div>
                                {errors.phone_no && (
                                    <FieldError message={errors.phone_no} />
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-zinc-300"
                                >
                                    Password
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
                                                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                            />
                                        </svg>
                                    </span>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-900 border text-white text-sm placeholder-zinc-600
                                            focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-500 transition-all
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
                                className="relative w-full py-2.5 px-4 rounded-lg bg-amber-400 hover:bg-amber-300
                                    text-zinc-950 font-semibold text-sm tracking-wide
                                    focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-950
                                    disabled:opacity-60 disabled:cursor-not-allowed
                                    transition-all duration-150 shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg
                                            className="animate-spin w-4 h-4 text-zinc-700"
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
                                        Creating account…
                                    </span>
                                ) : (
                                    "Create Account"
                                )}
                            </button>

                            <p className="text-center text-sm text-zinc-500">
                                Already have an account?{" "}
                                <Link
                                    href={route("member.login")}
                                    className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </form>

                        {/* Footer note */}
                        <p className="text-center text-xs text-zinc-600">
                            By registering, you agree to our{" "}
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

// ── Reusable inline error ──
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
