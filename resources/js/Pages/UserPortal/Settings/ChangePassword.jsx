import React, { useState } from "react";
import MobileLayout from "../../../Components/AuditPortal/Layout";
import { useForm } from "@inertiajs/react";
import {
    IoLockClosedOutline,
    IoEyeOutline,
    IoEyeOffOutline,
    IoShieldCheckmarkOutline,
} from "react-icons/io5";
import Swal from "sweetalert2";

export default function ChangePassword() {
    // Separate states for toggling visibility of each field
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("member.change-password"));
    };

    return (
        <MobileLayout
            title="Security"
            showBack
            backUrl={route("member.profile")}
        >
            <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6 pb-24">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-8 pt-4">
                    <div className="p-4 bg-indigo-500/10 rounded-full mb-4">
                        <IoLockClosedOutline className="w-10 h-10 text-indigo-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">
                        Change Password
                    </h1>
                    <p className="text-slate-400 text-center text-sm mt-2">
                        Ensure your account stays secure by using a strong
                        password.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Current Password */}
                    <PasswordField
                        label="Current Password"
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        show={showCurrent}
                        setShow={setShowCurrent}
                        error={errors.current_password}
                    />

                    <div className="pt-4 border-t border-slate-800">
                        <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4">
                            New Credentials
                        </h3>

                        {/* New Password */}
                        <PasswordField
                            label="New Password"
                            value={data.new_password}
                            onChange={(e) =>
                                setData("new_password", e.target.value)
                            }
                            show={showNew}
                            setShow={setShowNew}
                            error={errors.new_password}
                        />

                        {/* Confirm Password */}
                        <div className="mt-5">
                            <PasswordField
                                label="Confirm New Password"
                                value={data.new_password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "new_password_confirmation",
                                        e.target.value,
                                    )
                                }
                                show={showConfirm}
                                setShow={setShowConfirm}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full mt-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-900/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        <IoShieldCheckmarkOutline className="text-lg" />
                        {processing ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </div>
        </MobileLayout>
    );
}

// Internal Sub-component for Password Fields to keep code DRY
function PasswordField({ label, value, onChange, show, setShow, error }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                {label}
            </label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <IoLockClosedOutline className="text-slate-500 group-focus-within:text-indigo-400 transition-colors w-5 h-5" />
                </div>
                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    className="w-full bg-slate-900 border border-slate-800 text-white py-4 pl-12 pr-12 rounded-2xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-700"
                    placeholder="••••••••"
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                    {show ? (
                        <IoEyeOffOutline className="w-5 h-5" />
                    ) : (
                        <IoEyeOutline className="w-5 h-5" />
                    )}
                </button>
            </div>
            {error && (
                <p className="text-red-500 text-[11px] font-medium ml-1 mt-1">
                    {error}
                </p>
            )}
        </div>
    );
}
