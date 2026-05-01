import { useState, useEffect, useRef, createContext, useContext } from "react";
import { Link, usePage } from "@inertiajs/react";

import {
    RiDashboardLine,
    RiDashboardFill,
    RiGroupLine,
    RiGroupFill,
    RiShoppingBag3Line,
    RiShoppingBag3Fill,
    RiFileList3Line,
    RiFileList3Fill,
    RiBarChartBoxLine,
    RiBarChartBoxFill,
    RiSettings4Line,
    RiSettings4Fill,
    RiMenuFoldLine,
    RiMenuUnfoldLine,
    RiMenuLine,
    RiCloseLine,
    RiNotification3Line,
    RiSearchLine,
    RiArrowDownSLine,
    RiLogoutBoxLine,
    RiUserLine,
    RiShieldCheckLine,
    RiCircleFill,
} from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
// ─── Context ──────────────────────────────────────────────────────────────────
const SidebarContext = createContext(null);

// ─── Navigation ───────────────────────────────────────────────────────────────
const NAV = [
    {
        group: "Main",
        items: [
            {
                label: "Dashboard",
                href: "/dashboard",
                icon: RiDashboardLine,
                activeIcon: RiDashboardFill,
            },
            {
                label: "Analytics",
                href: "/analytics",
                icon: RiBarChartBoxLine,
                activeIcon: RiBarChartBoxFill,
            },
        ],
    },
    {
        group: "Management",
        items: [
            {
                label: "Users",
                href: "/users",
                icon: RiGroupLine,
                activeIcon: RiGroupFill,
            },
            {
                label: "Products",
                href: "/products",
                icon: RiShoppingBag3Line,
                activeIcon: RiShoppingBag3Fill,
            },
            {
                label: "Orders",
                href: "/orders",
                icon: RiFileList3Line,
                activeIcon: RiFileList3Fill,
            },
        ],
    },
    {
        group: "System",
        items: [
            {
                label: "Settings",
                href: "/settings",
                icon: RiSettings4Line,
                activeIcon: RiSettings4Fill,
            },
        ],
    },
];

const NOTIFICATIONS = [
    {
        id: 1,
        text: "New order #1042 received",
        time: "2m ago",
        dot: "bg-amber-400",
    },
    {
        id: 2,
        text: "User Jane Doe registered",
        time: "14m ago",
        dot: "bg-emerald-400",
    },
    { id: 3, text: "Server CPU above 80%", time: "1h ago", dot: "bg-red-400" },
];

// ─── useOnClickOutside ────────────────────────────────────────────────────────
function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const fn = (e) => {
            if (!ref.current || ref.current.contains(e.target)) return;
            handler(e);
        };
        document.addEventListener("mousedown", fn);
        document.addEventListener("touchstart", fn);
        return () => {
            document.removeEventListener("mousedown", fn);
            document.removeEventListener("touchstart", fn);
        };
    }, [ref, handler]);
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar() {
    const { collapsed, setCollapsed, mobileOpen, setMobileOpen } =
        useContext(SidebarContext);
    const { url } = usePage();
    const sidebarRef = useRef(null);

    useOnClickOutside(sidebarRef, () => {
        if (mobileOpen) setMobileOpen(false);
    });

    return (
        <>
            {/* Mobile backdrop */}
            <div
                aria-hidden="true"
                onClick={() => setMobileOpen(false)}
                className={`fixed inset-0 z-20 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden
                    ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            />

            {/* Panel */}
            <aside
                ref={sidebarRef}
                className={`
                    fixed top-0 left-0 z-30 h-full flex flex-col
                    bg-zinc-950 border-r border-zinc-800
                    transition-all duration-300 ease-in-out
                    ${collapsed ? "lg:w-[70px]" : "lg:w-64"}
                    ${mobileOpen ? "translate-x-0 w-72 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                {/* Brand */}
                <div
                    className={`flex items-center h-16 px-4 border-b border-zinc-800 shrink-0
                    ${collapsed ? "lg:justify-center" : "gap-3"}`}
                >
                    <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/25 shrink-0">
                        <RiShieldCheckLine className="text-zinc-950 text-base" />
                    </div>
                    <span
                        className={`text-white font-bold text-lg tracking-tight transition-all duration-200
                        ${collapsed ? "lg:hidden" : "block"}`}
                    >
                        Acme<span className="text-amber-400">Admin</span>
                    </span>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="ml-auto text-zinc-500 hover:text-white lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <RiCloseLine className="text-xl" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4">
                    {NAV.map(({ group, items }) => (
                        <div key={group} className="mb-5">
                            {!collapsed && (
                                <p className="px-4 mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-600 select-none">
                                    {group}
                                </p>
                            )}
                            {collapsed && (
                                <div className="mx-auto mb-1 w-5 h-px bg-zinc-800 hidden lg:block" />
                            )}

                            {items.map(
                                ({
                                    label,
                                    href,
                                    icon: Icon,
                                    activeIcon: ActiveIcon,
                                }) => {
                                    const active = url.startsWith(href);
                                    return (
                                        <Link
                                            key={href}
                                            href={href}
                                            className={`
                                            relative flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium
                                            transition-all duration-150 group
                                            ${
                                                active
                                                    ? "bg-amber-400/10 text-amber-400"
                                                    : "text-zinc-400 hover:bg-zinc-800/70 hover:text-white"
                                            }
                                        `}
                                        >
                                            {active && (
                                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-amber-400" />
                                            )}
                                            <span className="text-lg shrink-0">
                                                {active ? (
                                                    <ActiveIcon />
                                                ) : (
                                                    <Icon />
                                                )}
                                            </span>
                                            <span
                                                className={`truncate ${collapsed ? "lg:hidden" : "block"}`}
                                            >
                                                {label}
                                            </span>
                                            {/* Tooltip when collapsed */}
                                            {collapsed && (
                                                <span
                                                    className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-zinc-800 text-white text-xs
                                                whitespace-nowrap hidden lg:group-hover:block shadow-lg border border-zinc-700 pointer-events-none z-50"
                                                >
                                                    {label}
                                                </span>
                                            )}
                                        </Link>
                                    );
                                },
                            )}
                        </div>
                    ))}
                </nav>

                {/* User card */}
                <div className="shrink-0 border-t border-zinc-800 p-3">
                    <div
                        className={`flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-zinc-800 transition-colors
                        ${collapsed ? "lg:justify-center" : ""}`}
                    >
                        <div className="relative shrink-0">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-sm font-bold text-zinc-950">
                                A
                            </div>
                            <RiCircleFill className="absolute -bottom-0.5 -right-0.5 text-emerald-500 text-[10px]" />
                        </div>
                        <div
                            className={`flex-1 min-w-0 ${collapsed ? "lg:hidden" : "block"}`}
                        >
                            <p className="text-sm font-medium text-white truncate">
                                Admin User
                            </p>
                            <p className="text-xs text-zinc-500 truncate">
                                admin@acme.com
                            </p>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className={`text-zinc-500 hover:text-red-400 transition-colors p-1 rounded ${collapsed ? "lg:hidden" : "block"}`}
                            title="Sign out"
                        >
                            <RiLogoutBoxLine className="text-base" />
                        </Link>
                    </div>
                </div>

                {/* Collapse toggle (desktop only) */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="hidden lg:flex items-center justify-center h-10 border-t border-zinc-800
                        text-zinc-500 hover:text-white hover:bg-zinc-800/60 transition-all duration-150 shrink-0"
                    aria-label={
                        collapsed ? "Expand sidebar" : "Collapse sidebar"
                    }
                >
                    {collapsed ? (
                        <RiMenuUnfoldLine className="text-lg" />
                    ) : (
                        <RiMenuFoldLine className="text-lg" />
                    )}
                </button>
            </aside>
        </>
    );
}

// ─── Topbar ───────────────────────────────────────────────────────────────────
function Topbar({ title }) {
    const { collapsed, setMobileOpen } = useContext(SidebarContext);
    const [searchOpen, setSearchOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const notifRef = useRef(null);
    const profileRef = useRef(null);

    useOnClickOutside(notifRef, () => setNotifOpen(false));
    useOnClickOutside(profileRef, () => setProfileOpen(false));

    return (
        <header
            className={`
                fixed top-0 right-0 z-10 h-16
                flex items-center gap-4 px-4 sm:px-6
                bg-white/80 backdrop-blur-md border-b border-zinc-200
                transition-all duration-300
                left-0 ${collapsed ? "lg:left-[70px]" : "lg:left-64"}
            `}
        >
            {/* Hamburger (mobile) */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-zinc-500 hover:text-zinc-900 p-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
                aria-label="Open sidebar"
            >
                <RiMenuLine className="text-xl" />
            </button>

            {/* Page title */}
            <h1
                className="font-semibold text-zinc-900 text-base sm:text-lg truncate mr-auto"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
                {title}
            </h1>

            {/* Right controls */}
            <div className="flex items-center gap-1 sm:gap-2">
                {/* Search */}
                <div
                    className={`relative transition-all duration-300 ${searchOpen ? "w-48 sm:w-64" : "w-9"}`}
                >
                    {searchOpen ? (
                        <div className="flex items-center gap-2 bg-zinc-100 rounded-lg px-3 py-1.5">
                            <RiSearchLine className="text-zinc-400 text-base shrink-0" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search…"
                                onBlur={() => setSearchOpen(false)}
                                className="flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder-zinc-400"
                            />
                        </div>
                    ) : (
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
                            aria-label="Search"
                        >
                            <RiSearchLine className="text-lg" />
                        </button>
                    )}
                </div>

                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setNotifOpen(!notifOpen)}
                        className="relative w-9 h-9 flex items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
                        aria-label="Notifications"
                    >
                        <RiNotification3Line className="text-lg" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-white" />
                    </button>

                    {notifOpen && (
                        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-zinc-100 overflow-hidden z-50">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
                                <span className="font-semibold text-zinc-900 text-sm">
                                    Notifications
                                </span>
                                <button className="text-xs text-amber-500 font-medium hover:text-amber-600">
                                    Mark all read
                                </button>
                            </div>
                            <ul className="divide-y divide-zinc-50">
                                {NOTIFICATIONS.map((n) => (
                                    <li
                                        key={n.id}
                                        className="flex items-start gap-3 px-4 py-3 hover:bg-zinc-50 transition-colors cursor-pointer"
                                    >
                                        <span
                                            className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.dot}`}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-zinc-700">
                                                {n.text}
                                            </p>
                                            <p className="text-xs text-zinc-400 mt-0.5">
                                                {n.time}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="px-4 py-2.5 border-t border-zinc-100 text-center">
                                <span className="text-xs text-zinc-400 hover:text-zinc-700 cursor-pointer transition-colors">
                                    View all notifications
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="hidden sm:block w-px h-5 bg-zinc-200 mx-1" />

                {/* Profile */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
                    >
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-zinc-950 shrink-0">
                            A
                        </div>
                        <span className="hidden sm:block text-sm font-medium text-zinc-700 max-w-[7rem] truncate">
                            Admin
                        </span>
                        <RiArrowDownSLine
                            className={`hidden sm:block text-zinc-400 text-base transition-transform duration-200
                                ${profileOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {profileOpen && (
                        <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-zinc-100 overflow-hidden z-50">
                            <div className="px-4 py-3 border-b border-zinc-100">
                                <p className="text-sm font-semibold text-zinc-900">
                                    Admin User
                                </p>
                                <p className="text-xs text-zinc-500 truncate">
                                    admin@acme.com
                                </p>
                            </div>
                            <ul className="py-1">
                                {[
                                    {
                                        label: "My Profile",
                                        icon: RiUserLine,
                                        href: "/profile",
                                    },
                                    {
                                        label: "Settings",
                                        icon: RiSettings4Line,
                                        href: "/settings",
                                    },
                                ].map(({ label, icon: Icon, href }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                                        >
                                            <Icon className="text-base text-zinc-400" />
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t border-zinc-100 py-1">
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <RiLogoutBoxLine className="text-base" />
                                    Sign out
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function Layout({ children, title = "Dashboard" }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const { url } = usePage();

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
    useEffect(() => {
        setMobileOpen(false);
    }, [url]);

    return (
        <SidebarContext.Provider
            value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}
        >
            <div
                className="min-h-screen bg-zinc-50"
                style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
            >
                <Sidebar />
                <Topbar title={title} />

                <main
                    className={`transition-all duration-300 pt-16 ml-0 ${collapsed ? "lg:ml-[70px]" : "lg:ml-64"}`}
                >
                    <div className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)]">
                        {children}
                    </div>
                </main>
            </div>
            <ToastContainer />
        </SidebarContext.Provider>
    );
}

// ─── Usage ────────────────────────────────────────────────────────────────────
// import Layout from "@/Layouts/Layout";
//
// export default function Dashboard() {
//     return (
//         <Layout title="Dashboard">
//             <p>Page content goes here.</p>
//         </Layout>
//     );
// }
//
// Persistent layout (no remount on navigation):
// Dashboard.layout = (page) => <Layout title="Dashboard">{page}</Layout>;
