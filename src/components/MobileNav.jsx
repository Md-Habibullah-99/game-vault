function MobileNav({
    username,
    currentView,
    setCurrentView,
    onLogout
}) {

    const userInitial =
        username?.slice(0, 1).toUpperCase() || "U";

    return (

        <div className="mobile-nav-wrap">

            <div className="mobile-profile-row">
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Quick Access</span>
                <div className="flex items-center gap-2">
                    <div className="mobile-profile-icon" title={username}>
                        {userInitial}
                    </div>
                    <button
                        type="button"
                        onClick={onLogout}
                        className="mobile-logout-btn"
                    >
                        Sign out
                    </button>
                </div>
            </div>

            <div className="mobile-nav">

                <button
                    type="button"
                    aria-label="Discover"
                    className={
                        `mobile-nav-btn ${
                            currentView === "home"
                                ? "active"
                                : ""
                        }`
                    }
                    onClick={() =>
                        setCurrentView("home")
                    }
                >
                    <span className="mobile-nav-icon">🎮</span>
                    <span className="mobile-nav-label">Discover</span>
                </button>

                <button
                    type="button"
                    aria-label="My Vault"
                    className={
                        `mobile-nav-btn ${
                            currentView === "vault"
                                ? "active"
                                : ""
                        }`
                    }
                    onClick={() =>
                        setCurrentView("vault")
                    }
                >
                    <span className="mobile-nav-icon">📚</span>
                    <span className="mobile-nav-label">Vault</span>
                </button>

                <button
                    type="button"
                    aria-label="Favorites"
                    className={
                        `mobile-nav-btn ${
                            currentView === "favorites"
                                ? "active"
                                : ""
                        }`
                    }
                    onClick={() =>
                        setCurrentView("favorites")
                    }
                >
                    <span className="mobile-nav-icon">❤️</span>
                    <span className="mobile-nav-label">Favorites</span>
                </button>
            </div>

        </div>

    );
}

export default MobileNav;