import { Link, router } from "@inertiajs/react";
import MobileLayout from "../../../Components/AuditPortal/Layout";
import {
    IoShieldCheckmarkOutline,
    IoCallOutline,
    IoBusinessOutline,
    IoCalendarOutline,
    IoCheckmarkCircle,
    IoAlertCircleOutline,
    IoFingerPrintOutline,
    IoLockClosedOutline,
} from "react-icons/io5"; // Ionicons 5
import { LuChevronRight } from "react-icons/lu"; // Lucide icons
import Swal from "sweetalert2";
import { getBusinessInitials } from "../../../Utils/AuditPortal/GetInitialFromNameForAvatar";

export default function Profile({ user }) {
    if (!user) return null;

    console.log(user);
    const handleLogout = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Confirm Logout",
            text: "Are you sure you want to end your session?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#334155",
            confirmButtonText: "Yes, Logout",
            background: "#1e293b",
            color: "#f1f5f9",
            customClass: {
                popup: "rounded-3xl border border-slate-700",
                confirmButton: "rounded-xl px-6 py-3 font-bold",
                cancelButton: "rounded-xl px-6 py-3",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                // Perform logout action here
                router.post(route("member.logout"));
            }
        });
    };

    return (
        <MobileLayout
            title="Profile"
            showBack
            backUrl={route("member.dashboard")}
        >
            <div className="min-h-screen bg-[#0f172a] text-slate-200 pb-24">
                {/* --- Profile Header --- */}
                <div className="pt-10 pb-6 px-4 flex flex-col items-center bg-gradient-to-b from-blue-600/10 to-transparent">
                    <div className="relative">
                        <div className="w-24 h-24 bg-slate-800 rounded-3xl flex items-center justify-center text-3xl font-bold text-blue-400 border border-slate-700 shadow-2xl">
                            {getBusinessInitials(user?.name)}
                        </div>
                        {user.is_phone_verified && (
                            <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1 border-4 border-[#0f172a]">
                                <IoCheckmarkCircle className="text-white w-5 h-5" />
                            </div>
                        )}
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-white tracking-tight">
                        {user.name}
                    </h2>
                    <p className="text-slate-400 text-sm font-medium">
                        Business Member
                    </p>
                </div>

                <div className="px-4 space-y-6">
                    {!user.status && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-4 shadow-lg shadow-red-900/5">
                            <div className="bg-red-500/20 p-2 rounded-xl">
                                <IoAlertCircleOutline className="w-6 h-6 text-red-500" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-red-200">
                                    Account Suspended
                                </h4>
                                <p className="text-xs text-red-500/80">
                                    Please contact support for assistance.
                                </p>
                            </div>
                        </div>
                    )}
                    {/* --- Critical Action: Phone Verification Alert --- */}
                    {!user.is_phone_verified && user.status && (
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center gap-4 shadow-lg shadow-amber-900/5">
                            <div className="bg-amber-500/20 p-2 rounded-xl">
                                <IoAlertCircleOutline className="w-6 h-6 text-amber-500" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-amber-200">
                                    Phone Verification
                                </h4>
                                <p className="text-xs text-amber-500/80">
                                    Your account security is at risk.
                                </p>
                            </div>
                            <Link
                                href={route("member.verify-phone")}
                                className="bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold px-4 py-2 rounded-lg transition-all active:scale-95"
                            >
                                Verify
                            </Link>
                        </div>
                    )}

                    {/* --- Section: Business Details --- */}
                    <div className="space-y-2">
                        <h3 className="text-[11px] uppercase tracking-[0.15em] text-slate-500 font-bold ml-2">
                            Business Info
                        </h3>
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                            <ProfileItem
                                icon={
                                    <IoBusinessOutline className="text-blue-400" />
                                }
                                label="Business Name"
                                value={user.name}
                            />
                            <ProfileItem
                                icon={
                                    <IoFingerPrintOutline className="text-indigo-400" />
                                }
                                label="PAN Number"
                                value={user.pan_no}
                            />
                            <div className="p-4 bg-slate-900/80">
                                <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">
                                    System UUID
                                </p>
                                <p className="text-[11px] font-mono text-slate-400 break-all leading-relaxed">
                                    {user.uuid}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- Section: Security & Settings --- */}
                    <div className="space-y-2">
                        <h3 className="text-[11px] uppercase tracking-[0.15em] text-slate-500 font-bold ml-2">
                            Security & Contact
                        </h3>
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                            <ProfileItem
                                icon={
                                    <IoCallOutline className="text-emerald-400" />
                                }
                                label="Phone Number"
                                value={user.phone_no}
                                status={
                                    user.is_phone_verified
                                        ? "Verified"
                                        : "Unverified"
                                }
                            />

                            {/* Change Password Link */}
                            <Link
                                href={route("member.change-password")}
                                className="flex items-center justify-between p-4 border-b border-slate-800 hover:bg-slate-800/50 transition-colors active:bg-slate-800"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-xl p-2 bg-slate-800 rounded-xl">
                                        <IoLockClosedOutline className="text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                                            Password
                                        </p>
                                        <p className="text-sm font-semibold text-white">
                                            Change Password
                                        </p>
                                    </div>
                                </div>
                                <LuChevronRight className="text-slate-600" />
                            </Link>

                            <ProfileItem
                                icon={
                                    <IoShieldCheckmarkOutline className="text-purple-400" />
                                }
                                label="Account Status"
                                value={user.status ? "Active" : "Suspended"}
                            />
                            <ProfileItem
                                icon={
                                    <IoCalendarOutline className="text-slate-400" />
                                }
                                label="Registration Date"
                                value={user.formatted_registration_date}
                                isLast
                            />
                        </div>
                    </div>

                    {/* --- Logout Button --- */}
                    <button
                        onClick={handleLogout}
                        className="w-full py-4 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-500 font-bold text-sm hover:bg-red-500/10 transition-all active:scale-[0.98] shadow-lg shadow-red-950/10"
                    >
                        Logout from Session
                    </button>
                </div>
            </div>
        </MobileLayout>
    );
}

// Reusable Profile Item Component
function ProfileItem({ icon, label, value, status, isLast }) {
    return (
        <div
            className={`flex items-center justify-between p-4 ${
                !isLast ? "border-b border-slate-800" : ""
            }`}
        >
            <div className="flex items-center gap-4">
                <div className="text-xl p-2 bg-slate-800 rounded-xl">
                    {icon}
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                        {label}
                    </p>
                    <p className="text-sm font-semibold text-white">
                        {value || "N/A"}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {status && (
                    <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            status === "Verified"
                                ? "bg-blue-500/10 text-blue-400"
                                : "bg-red-500/10 text-red-400"
                        }`}
                    >
                        {status}
                    </span>
                )}
            </div>
        </div>
    );
}
