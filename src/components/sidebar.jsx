import SidebarBtn from "./SidebarBtn";

function Sidebar({
    currentView,
    setCurrentView,
    favoritesCount,
    vaultCount
}) {

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
        <aside className="hidden min-h-screen w-72 flex-col gap-8 border-r border-slate-800/80 bg-[#081329]/95 p-6 text-slate-200 backdrop-blur-xl xl:flex">
            <div className="space-y-3">
                <h1 className="text-3xl font-bold text-white">GameVault</h1>
                <p className="text-sm text-slate-400">Personal gaming hub for your favorites and library.</p>
            </div>

            <div className="space-y-3">
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
        </aside>
    );
}

export default Sidebar;