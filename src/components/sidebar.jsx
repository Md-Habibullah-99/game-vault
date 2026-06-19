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
                    className="sidebar-logout-btn w-full rounded-2xl border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-200 transition"
                >
                    Sign out
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;