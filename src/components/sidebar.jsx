import SidebarBtn from "./SidebarBtn";

function Sidebar({
    username,
    currentView,
    setCurrentView,
    favoritesCount,
    vaultCount,
    onLogout
}) {

    const userInitial =
        username?.slice(0, 1).toUpperCase() || "U";

    const navItems = [
        {
            key: "home",
            label: "Discover",
            icon: "🎮"
        },
        {
            key: "vault",
            label: `My Vault (${vaultCount})`,
            icon: "📚"
        },
        {
            key: "favorites",
            label: `Favorites (${favoritesCount})`,
            icon: "❤️"
        }
    ];

    return (
        <aside className="hidden h-[calc(100vh-4rem)] w-72 flex-col gap-8 rounded-[28px] border border-slate-800/80 bg-[#081329]/95 p-6 text-slate-200 backdrop-blur-xl xl:sticky xl:top-8 xl:flex">
            <div className="space-y-3">
                <h1 className="text-3xl font-bold text-white">GameVault</h1>
                <p className="text-sm text-slate-400">Personal gaming hub for your favorites and library.</p>
            </div>

            <div className="space-y-3 flex-1">
                {navItems.map((item) => (
                    <SidebarBtn
                        key={item.key}
                        icon={item.icon}
                        label={item.label}
                        active={currentView === item.key}
                        onClick={() => setCurrentView(item.key)}
                    />
                ))}
            </div>

            <div className="rounded-2xl border border-slate-700/80 bg-slate-950/70 p-4">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-violet-500 text-sm font-bold text-slate-950">
                        {userInitial}
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Profile</p>
                        <p className="truncate text-sm font-semibold text-white">{username}</p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onLogout}
                    className="group w-full rounded-2xl border border-slate-600/70 bg-slate-900/85 px-4 py-3 text-left text-slate-100 transition duration-200 hover:border-rose-300/60 hover:bg-rose-500/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/45"
                >
                    <span className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-500/20 text-rose-200" aria-hidden="true">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                    <path d="M10 17l5-5-5-5" />
                                    <path d="M15 12H3" />
                                </svg>
                            </span>
                            <span className="text-sm font-semibold tracking-[0.02em]">Sign out</span>
                        </span>
                        
                    </span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;