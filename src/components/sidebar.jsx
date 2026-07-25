import { useState } from "react";
import {
    FaAnglesLeft,
    FaAnglesRight,
    FaBookOpen,
    FaCalendarDays,
    FaChevronDown,
    FaGamepad,
    FaHeart,
    FaRightFromBracket,
    FaSliders
} from "react-icons/fa6";

import SidebarBtn from "./SidebarBtn";

function Sidebar({
    username,
    currentView,
    setCurrentView,
    favoritesCount,
    vaultCount,
    onLogout,
    collapsed,
    onToggleCollapsed,
    genres = [],
    statuses = [],
    selectedGenre,
    setSelectedGenre,
    selectedStatus,
    setSelectedStatus
}) {
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const userInitial = username?.slice(0, 1).toUpperCase() || "U";

    const navItems = [
        { key: "home", label: "Discover", icon: <FaGamepad size={16} /> },
        { key: "vault", label: "My Vault", count: vaultCount, icon: <FaBookOpen size={16} /> },
        { key: "favorites", label: "Favorites", count: favoritesCount, icon: <FaHeart size={16} /> },
        { key: "events", label: "Events", icon: <FaCalendarDays size={16} /> }
    ];

    const hasActiveFilters =
        (selectedGenre && selectedGenre !== "All") || (selectedStatus && selectedStatus !== "All");

    const closeOthers = (which) => {
        if (which === "filters") setProfileOpen(false);
        if (which === "profile") setFiltersOpen(false);
    };

    return (
        <aside
            className={`hidden shrink-0 flex-col gap-1 rounded-[28px] border border-white/[0.07] bg-[#111214]/95 py-5 text-[#e3e3e3] shadow-[0_20px_60px_-32px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-[width] duration-300 ease-out xl:sticky xl:top-8 xl:flex xl:h-[calc(100vh-4rem)] z-50 overflow-visible ${
                collapsed ? "xl:w-[84px] px-3" : "xl:w-[272px] px-4"
            }`}
        >
            {/* Brand + collapse toggle */}
            <div className={`mb-6 flex items-center ${collapsed ? "justify-center" : "justify-between"} gap-2 px-1`}>
                {!collapsed && (
                    <div className="min-w-0">
                        <p className="truncate text-[17px] font-semibold tracking-tight text-white">GameVault</p>
                        <p className="truncate text-[11px] text-[#9aa0a6]">Your personal library</p>
                    </div>
                )}

                <button
                    type="button"
                    onClick={onToggleCollapsed}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#9aa0a6] transition hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]/50"
                >
                    {collapsed ? <FaAnglesRight size={14} /> : <FaAnglesLeft size={14} />}
                </button>
            </div>

            {/* Primary navigation: Discover -> Events */}
            <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                    <SidebarBtn
                        key={item.key}
                        icon={item.icon}
                        label={item.label}
                        count={item.count}
                        active={currentView === item.key}
                        collapsed={collapsed}
                        onClick={() => setCurrentView(item.key)}
                    />
                ))}
            </nav>

            <div className="my-4 h-px w-full bg-white/[0.06]" />

            {/* Filter Options */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => {
                        closeOthers("filters");
                        setFiltersOpen((open) => !open);
                    }}
                    title="Filter Options"
                    aria-expanded={filtersOpen}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium transition ${
                        collapsed ? "justify-center" : "justify-between"
                    } ${filtersOpen ? "bg-white/[0.08] text-white" : "text-[#c4c7c5] hover:bg-white/[0.06] hover:text-white"}`}
                >
                    <span className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
                        <span className="relative flex h-5 w-5 items-center justify-center">
                            <FaSliders size={15} />
                            {hasActiveFilters && (
                                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#8ab4f8]" />
                            )}
                        </span>
                        {!collapsed && <span>Filter Options</span>}
                    </span>
                    {!collapsed && (
                        <FaChevronDown
                            size={11}
                            className={`text-[#9aa0a6] transition-transform duration-200 ${filtersOpen ? "rotate-180" : ""}`}
                        />
                    )}
                </button>

                {/* Inline reveal (expanded sidebar) */}
                {!collapsed && (
                    <div
                        className={`grid transition-all duration-300 ease-out ${
                            filtersOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                    >
                        <div className="overflow-hidden">
                            <div className="mt-2 space-y-2 rounded-2xl border border-white/[0.06] bg-black/20 p-3">
                                <label className="block text-[11px] font-medium uppercase tracking-wide text-[#9aa0a6]">
                                    Genre
                                    <select
                                        value={selectedGenre}
                                        onChange={(e) => setSelectedGenre(e.target.value)}
                                        className="mt-1 w-full rounded-xl border border-white/10 bg-[#1b1c1e] px-3 py-2 text-sm font-normal normal-case text-[#e3e3e3] outline-none transition focus:border-[#8ab4f8] focus:ring-2 focus:ring-[#8ab4f8]/25"
                                    >
                                        <option value="All">All genres</option>
                                        {genres.map((genre) => (
                                            <option key={genre} value={genre}>{genre}</option>
                                        ))}
                                    </select>
                                </label>

                                <label className="block text-[11px] font-medium uppercase tracking-wide text-[#9aa0a6]">
                                    Status
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="mt-1 w-full rounded-xl border border-white/10 bg-[#1b1c1e] px-3 py-2 text-sm font-normal normal-case text-[#e3e3e3] outline-none transition focus:border-[#8ab4f8] focus:ring-2 focus:ring-[#8ab4f8]/25"
                                    >
                                        <option value="All">All statuses</option>
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* Floating flyout (collapsed rail) */}
                {collapsed && filtersOpen && (
                    <div className="absolute left-full top-0 z-[1000] ml-3 w-64 rounded-2xl border border-white/10 bg-[#1b1c1e] p-3 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl">
                        <p className="mb-2 px-1 text-[11px] font-medium uppercase tracking-wide text-[#9aa0a6]">Filter Options</p>
                        <div className="space-y-2">
                            <select
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-[#111214] px-3 py-2 text-sm text-[#e3e3e3] outline-none transition focus:border-[#8ab4f8] focus:ring-2 focus:ring-[#8ab4f8]/25"
                            >
                                <option value="All">All genres</option>
                                {genres.map((genre) => (
                                    <option key={genre} value={genre}>{genre}</option>
                                ))}
                            </select>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-[#111214] px-3 py-2 text-sm text-[#e3e3e3] outline-none transition focus:border-[#8ab4f8] focus:ring-2 focus:ring-[#8ab4f8]/25"
                            >
                                <option value="All">All statuses</option>
                                {statuses.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex-1" />

            {/* Profile: progressive disclosure, Sign out hidden until opened */}
            <div className="relative mt-2">
                <button
                    type="button"
                    onClick={() => {
                        closeOthers("profile");
                        setProfileOpen((open) => !open);
                    }}
                    aria-expanded={profileOpen}
                    title="Profile"
                    className={`flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left transition ${
                        collapsed ? "justify-center" : ""
                    } ${profileOpen ? "bg-white/[0.08]" : "hover:bg-white/[0.06]"}`}
                >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8ab4f8] to-[#c58af9] text-[13px] font-semibold text-[#111214]">
                        {userInitial}
                    </span>
                    {!collapsed && (
                        <>
                            <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-medium text-white">{username}</span>
                                <span className="block text-[11px] text-[#9aa0a6]">Profile</span>
                            </span>
                            <FaChevronDown
                                size={11}
                                className={`shrink-0 text-[#9aa0a6] transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                            />
                        </>
                    )}
                </button>

                {/* Inline reveal (expanded sidebar) */}
                {!collapsed && (
                    <div
                        className={`grid transition-all duration-300 ease-out ${
                            profileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                    >
                        <div className="overflow-hidden">
                            <div className="mt-2 space-y-3 rounded-2xl border border-white/[0.06] bg-black/20 p-3">
                                <div>
                                    <p className="text-[11px] uppercase tracking-wide text-[#9aa0a6]">Signed in as</p>
                                    <p className="truncate text-sm font-medium text-white">{username}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={onLogout}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm font-medium text-[#f28b82] transition hover:border-[#f28b82]/40 hover:bg-[#f28b82]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f28b82]/40"
                                >
                                    <FaRightFromBracket size={13} />
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Floating flyout (collapsed rail) */}
                {collapsed && profileOpen && (
                    <div className="absolute bottom-0 left-full z-[1000] ml-3 w-56 rounded-2xl border border-white/10 bg-[#1b1c1e] p-3 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl">
                        <p className="text-[11px] uppercase tracking-wide text-[#9aa0a6]">Signed in as</p>
                        <p className="mb-3 truncate text-sm font-medium text-white">{username}</p>
                        <button
                            type="button"
                            onClick={onLogout}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm font-medium text-[#f28b82] transition hover:border-[#f28b82]/40 hover:bg-[#f28b82]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f28b82]/40"
                        >
                            <FaRightFromBracket size={13} />
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
}

export default Sidebar;
