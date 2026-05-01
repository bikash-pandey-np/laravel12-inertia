import React, { useState } from "react";
import MobileLayout from "../../../Components/AuditPortal/Layout";
import { router, useForm } from "@inertiajs/react";
import {
    IoCallOutline,
    IoShieldCheckmarkOutline,
    IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import Swal from "sweetalert2";

export default function VerifyPhone({ user }) {
    const [otpSent, setOtpSent] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        phone_no: user.phone_no,
        otp: "",
    });

    const handleGetOtp = (e) => {
        e.preventDefault();
        post(route("member.phone.send-otp"), {
            onSuccess: () => {
                setOtpSent(true);
                Swal.fire({
                    title: "OTP Sent!",
                    text: "Please check your messages for the verification code.",
                    icon: "success",
                    background: "#1e293b",
                    color: "#f1f5f9",
                });
            },
        });
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        post(route("member.phone.verify-otp"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Verified!",
                    text: "Your phone number has been successfully verified.",
                    icon: "success",
                    background: "#1e293b",
                    color: "#f1f5f9",
                });
            },
        });
    };

    return (
        <MobileLayout
            title="Verify Phone"
            showBack
            backUrl={route("member.profile")}
        >
            <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6">
                <div className="flex flex-col items-center mb-8">
                    <div className="p-4 bg-blue-600/20 rounded-full mb-4">
                        <IoShieldCheckmarkOutline className="w-12 h-12 text-blue-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">
                        Phone Verification
                    </h1>
                    <p className="text-slate-400 text-center text-sm mt-2">
                        We need to verify your number to secure your business
                        account.
                    </p>
                </div>

                <form
                    onSubmit={otpSent ? handleVerifyOtp : handleGetOtp}
                    className="space-y-6"
                >
                    {/* Phone Number Field (Read Only) */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                            Registered Phone
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <IoCallOutline className="text-slate-400 w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                value={data.phone_no}
                                readOnly
                                className="w-full bg-slate-900 border border-slate-800 text-slate-400 py-4 pl-12 pr-4 rounded-2xl focus:outline-none cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* OTP Field (Visible only after sending) */}
                    {otpSent && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                                Enter 6-Digit OTP
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <IoChatbubbleEllipsesOutline className="text-blue-400 w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    maxLength="6"
                                    placeholder="000000"
                                    value={data.otp}
                                    onChange={(e) =>
                                        setData("otp", e.target.value)
                                    }
                                    className="w-full bg-slate-900 border border-slate-700 text-white py-4 pl-12 pr-4 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all tracking-[0.5em] font-bold text-lg"
                                />
                            </div>
                            {errors.otp && (
                                <p className="text-red-500 text-xs ml-1">
                                    {errors.otp}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Dynamic Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className={`w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg ${
                            otpSent
                                ? "bg-emerald-500 text-emerald-950 shadow-emerald-900/20"
                                : "bg-blue-600 text-white shadow-blue-900/20"
                        } ${processing ? "opacity-70 grayscale" : ""}`}
                    >
                        {processing
                            ? "Processing..."
                            : otpSent
                              ? "Verify OTP"
                              : "Get OTP"}
                    </button>
                </form>
            </div>
        </MobileLayout>
    );
}
