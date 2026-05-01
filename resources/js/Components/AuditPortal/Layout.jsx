import { useState, useEffect, createContext, useContext, useRef } from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import {
    RiDashboardLine,
    RiDashboardFill,
    RiFileList3Line,
    RiFileList3Fill,
    RiBarChartBoxLine,
    RiBarChartBoxFill,
    RiNotification3Line,
    RiNotification3Fill,
    RiUserLine,
    RiUserFill,
    RiShieldCheckLine,
    RiArrowLeftLine,
    RiLogoutBoxLine,
    RiLockPasswordLine,
    RiCircleFill,
} from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { getBusinessInitials } from "../../Utils/AuditPortal/GetInitialFromNameForAvatar";

const LayoutContext = createContext(null);

// ─── Navigation ───────────────────────────────────────────────────────────────
const NAV = [
    {
        label: "Home",
        href: route("member.dashboard"),
        icon: RiDashboardLine,
        activeIcon: RiDashboardFill,
    },
    {
        label: "Reports",
        href: "/reports",
        icon: RiFileList3Line,
        activeIcon: RiFileList3Fill,
    },
    {
        label: "Analytics",
        href: "/analytics",
        icon: RiBarChartBoxLine,
        activeIcon: RiBarChartBoxFill,
    },
    {
        label: "Alerts",
        href: "/notifications",
        icon: RiNotification3Line,
        activeIcon: RiNotification3Fill,
    },
    {
        label: "Profile",
        href: route("member.profile"),
        icon: RiUserLine,
        activeIcon: RiUserFill,
    },
];

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
function BottomNav() {
    const { url } = usePage();
    return (
        <nav
            className="fixed bottom-0 inset-x-0 z-30 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800/80"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
            <div className="flex items-stretch h-16">
                {NAV.map(
                    ({ label, href, icon: Icon, activeIcon: ActiveIcon }) => {
                        const active = url.startsWith(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                className="flex-1 flex flex-col items-center justify-center gap-1 relative group"
                            >
                                {active && (
                                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-amber-400" />
                                )}
                                <span
                                    className={`relative flex items-center justify-center w-10 h-7 rounded-xl transition-all duration-200 ${active ? "bg-amber-400/15 text-amber-400" : "text-zinc-500 group-active:bg-zinc-800"}`}
                                >
                                    <span className="text-xl">
                                        {active ? <ActiveIcon /> : <Icon />}
                                    </span>
                                    {label === "Alerts" && (
                                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-zinc-950" />
                                    )}
                                </span>
                                <span
                                    className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${active ? "text-amber-400" : "text-zinc-600"}`}
                                >
                                    {label}
                                </span>
                            </Link>
                        );
                    },
                )}
            </div>
        </nav>
    );
}

// ─── Top Header with Dropdown ────────────────────────────────────────────────
function Header({ title, showBack, backUrl }) {
    const { user } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        setIsOpen(false);
        Swal.fire({
            title: "Confirm Logout",
            text: "Are you sure you want to end your session?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#334155",
            confirmButtonText: "Yes, Logout",
            background: "#18181b", // zinc-900
            color: "#f4f4f5", // zinc-100
            customClass: {
                popup: "rounded-3xl border border-zinc-800",
                confirmButton: "rounded-xl px-6 py-3 font-bold",
                cancelButton: "rounded-xl px-6 py-3",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route("member.logout"));
            }
        });
    };

    return (
        <header
            className="fixed top-0 inset-x-0 z-40 h-14 flex items-center px-4 gap-3 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/60"
            style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
            {console.log("back Url", backUrl)}
            {showBack ? (
                <Link
                    href={backUrl || route("member.dashboard")}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0"
                >
                    <RiArrowLeftLine className="text-lg" />
                </Link>
            ) : (
                <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/25 shrink-0">
                    <RiShieldCheckLine className="text-zinc-950 text-sm" />
                </div>
            )}

            <h1
                className="flex-1 text-white font-semibold text-base tracking-tight truncate"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
                {title}
            </h1>

            {/* Profile Dropdown */}
            <div className="relative shrink-0" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative focus:outline-none active:scale-95 transition-transform"
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-zinc-950 ring-2 ring-zinc-800">
                        {getBusinessInitials(user?.name)}
                    </div>
                    <RiCircleFill className="absolute -bottom-0.5 -right-0.5 text-emerald-500 text-[9px]" />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute right-0 mt-3 w-52 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                        <div className="px-4 py-2 border-b border-zinc-800/50 mb-1">
                            <p className="text-[8px] text-zinc-500 uppercase font-bold tracking-widest">
                                Account
                            </p>
                            <p className="text-xs mt-2 mb-2 text-zinc-300 truncate font-medium tracking-[1px]">
                                Phone :{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-500 font-bold">
                                    {user?.phone_no}
                                </span>
                            </p>
                            <p className="text-xs text-zinc-300 truncate font-medium tracking-[1px]">
                                <span>Pan No. : </span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-500 font-bold">
                                    {user?.pan_no}
                                </span>
                            </p>
                        </div>
                        <div className="h-[1px] w-full bg-white opacity-20" />{" "}
                        <Link
                            href={route("member.profile")}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                        >
                            <RiUserLine className="text-lg text-zinc-500" />{" "}
                            Profile
                        </Link>
                        <Link
                            href={route("member.change-password")}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                        >
                            <RiLockPasswordLine className="text-lg text-zinc-500" />{" "}
                            Change Password
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors border-t border-zinc-800/50 mt-1"
                        >
                            <RiLogoutBoxLine className="text-lg" /> Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

// ─── Main Layout ─────────────────────────────────────────────────────────────
export default function MobileLayout({
    children,
    title = "Dashboard",
    showBack = false,
    backUrl = null,
}) {
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

    return (
        <LayoutContext.Provider value={{}}>
            <Head title={title} />
            <div
                className="min-h-screen bg-zinc-950"
                style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
            >
                <Header title={title} showBack={showBack} backUrl={backUrl} />
                <main className="pt-14 pb-20 min-h-screen">
                    <div className="px-4 py-4">{children}</div>
                </main>
                <BottomNav />
            </div>
            <ToastContainer
                position="top-center"
                toastClassName="!bg-zinc-800 !text-white !border !border-zinc-700 !rounded-xl !text-sm"
                autoClose={2000}
                closeOnClick
            />
        </LayoutContext.Provider>
    );
}
