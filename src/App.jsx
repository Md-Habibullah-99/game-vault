import { useEffect, useMemo, useState } from "react";

import LoginPage from "./pages/LoginPage";
import Sidebar from "./components/sidebar";
import MobileNav from "./components/MobileNav";
import Header from "./components/header";
import WelcomeToast from "./components/WelcomeToast";

import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import VaultPage from "./pages/VaultPage";
import DetailsPage from "./pages/DetailsPage";
import EventsPage from "./pages/EventsPage";
import { games } from "./data/games";
import {
    clearSessionUser,
    getAccountByUsername,
    getFavoritesStorageKey,
    getGameMetaStorageKey,
    getSessionUser,
    getVaultStorageKey,
    setSessionUser
} from "./utils/auth";

const NAV_STATE_KEY = "gvNavigation";

function createNavState(view, gameId = null) {
    return {
        [NAV_STATE_KEY]: true,
        view,
        gameId
    };
}

function isAppNavState(state) {
    return Boolean(state && state[NAV_STATE_KEY]);
}

function App() {

    const [account, setAccount] =
        useState(() => {
            const sessionUsername = getSessionUser();
            return getAccountByUsername(sessionUsername);
        });

    const [currentView, setCurrentView] =
        useState("home");

    const [favorites, setFavorites] = useState([]);

    const [vault, setVault] = useState([]);

    const [selectedGame, setSelectedGame] =
        useState(null);

    const [gameMetaById, setGameMetaById] =
        useState({});

    const [collectionsLoaded, setCollectionsLoaded] =
        useState(false);

    const [metaLoaded, setMetaLoaded] =
        useState(false);

    const [sidebarCollapsed, setSidebarCollapsed] =
        useState(false);

    const [showWelcomeToast, setShowWelcomeToast] =
        useState(false);

    const [searchTerm, setSearchTerm] =
        useState("");

    const [selectedGenre, setSelectedGenre] =
        useState("All");

    const [selectedStatus, setSelectedStatus] =
        useState("All");

    const username = useMemo(
        () => account?.displayName || account?.username || "",
        [account]
    );

    const mergedGames = useMemo(
        () => games.map((game) => {
            const meta = gameMetaById[game.id] || {};

            return {
                ...game,
                status: meta.status || game.status,
                playtime: meta.playtime || game.playtime
            };
        }),
        [gameMetaById]
    );

    const genres = useMemo(
        () => Array.from(
            new Set(mergedGames.flatMap((game) => game.genres || [game.genre]))
        ).sort(),
        [mergedGames]
    );

    const statuses = useMemo(
        () => Array.from(
            new Set(mergedGames.map((game) => game.status).filter(Boolean))
        ).sort(),
        [mergedGames]
    );

    const filteredGames = useMemo(
        () => mergedGames.filter((game) => {
            const matchesSearch = game.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            const matchesGenre = selectedGenre === "All"
                || (game.genres || [game.genre]).includes(selectedGenre);

            const matchesStatus = selectedStatus === "All"
                || (game.status && game.status === selectedStatus);

            return matchesSearch && matchesGenre && matchesStatus;
        }),
        [mergedGames, searchTerm, selectedGenre, selectedStatus]
    );

    const favoriteIds = useMemo(
        () => new Set(favorites.map((game) => game.id)),
        [favorites]
    );

    const vaultIds = useMemo(
        () => new Set(vault.map((game) => game.id)),
        [vault]
    );

    const applyNavigationState = (state) => {
        const nextView = state?.view || "home";
        const nextGame = state?.gameId
            ? mergedGames.find((game) => game.id === state.gameId) || null
            : null;

        setCurrentView(nextView);
        setSelectedGame(nextGame);
    };

    const navigateToView = (view, options = {}) => {
        const { replace = false, fromPopState = false } = options;
        const state = createNavState(view, null);

        applyNavigationState(state);

        if (account?.username && !fromPopState) {
            if (replace) {
                window.history.replaceState(state, "");
            } else {
                window.history.pushState(state, "");
            }
        }
    };

    const openDetailsView = (game, options = {}) => {
        const { fromPopState = false } = options;
        const state = createNavState(currentView, game.id);

        applyNavigationState(state);

        if (account?.username && !fromPopState) {
            window.history.pushState(state, "");
        }
    };

    const goBackFromDetails = () => {
        if (isAppNavState(window.history.state)) {
            window.history.back();
            return;
        }

        const fallback = createNavState(currentView, null);
        applyNavigationState(fallback);
        window.history.replaceState(fallback, "");
    };

    useEffect(() => {
        if (!account?.username) {
            setFavorites([]);
            setVault([]);
            setGameMetaById({});
            setCollectionsLoaded(false);
            setMetaLoaded(false);
            return;
        }

        const favoritesKey = getFavoritesStorageKey(account.username);
        const vaultKey = getVaultStorageKey(account.username);

        try {
            const storedFavorites = localStorage.getItem(favoritesKey);
            const storedVault = localStorage.getItem(vaultKey);
            setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
            setVault(storedVault ? JSON.parse(storedVault) : []);
        } catch {
            setFavorites([]);
            setVault([]);
        }

        setCollectionsLoaded(true);
    }, [account]);

    useEffect(() => {
        if (!account?.username || !collectionsLoaded) {
            return;
        }

        localStorage.setItem(
            getFavoritesStorageKey(account.username),
            JSON.stringify(favorites)
        );
    }, [account, favorites, collectionsLoaded]);

    useEffect(() => {
        if (!account?.username || !collectionsLoaded) {
            return;
        }

        localStorage.setItem(
            getVaultStorageKey(account.username),
            JSON.stringify(vault)
        );
    }, [account, vault, collectionsLoaded]);

    useEffect(() => {
        if (!account?.username) {
            return;
        }

        try {
            const rawMeta = localStorage.getItem(getGameMetaStorageKey(account.username));
            setGameMetaById(rawMeta ? JSON.parse(rawMeta) : {});
        } catch {
            setGameMetaById({});
        }

        setMetaLoaded(true);
    }, [account]);

    useEffect(() => {
        if (!account?.username || !metaLoaded) {
            return;
        }

        localStorage.setItem(
            getGameMetaStorageKey(account.username),
            JSON.stringify(gameMetaById)
        );
    }, [account, gameMetaById, metaLoaded]);

    useEffect(() => {
        if (!account?.username) {
            return;
        }

        const state = window.history.state;

        if (isAppNavState(state)) {
            applyNavigationState(state);
        } else {
            window.history.replaceState(createNavState("home", null), "");
        }

        const onPopState = (event) => {
            if (!isAppNavState(event.state)) {
                return;
            }

            applyNavigationState(event.state);
        };

        window.addEventListener("popstate", onPopState);

        return () => {
            window.removeEventListener("popstate", onPopState);
        };
    }, [account, mergedGames]);

    useEffect(() => {
        if (!selectedGame?.id) {
            return;
        }

        const nextSelectedGame = mergedGames.find((game) => game.id === selectedGame.id) || null;
        if (nextSelectedGame) {
            setSelectedGame(nextSelectedGame);
        }
    }, [mergedGames, selectedGame?.id]);

    useEffect(() => {
        if (!account?.username) {
            return undefined;
        }

        setShowWelcomeToast(true);
        const hideTimer = setTimeout(() => setShowWelcomeToast(false), 1000);

        return () => clearTimeout(hideTimer);
    }, [account?.username]);

    const handleLogin = (loggedInAccount) => {

        setAccount(loggedInAccount);
        setSessionUser(loggedInAccount.username);
        window.history.replaceState(createNavState("home", null), "");
        applyNavigationState(createNavState("home", null));
    };

    const handleLogout = () => {

        clearSessionUser();
        setAccount(null);
        setCurrentView("home");
        setSelectedGame(null);
    };

    const addToFavorites = (game) => {

        setFavorites((prev) => {
            const exists = prev.find(g => g.id === game.id);
            return exists ? prev : [...prev, game];
        });
    };

    const removeFromFavorites = (gameId) => {

        setFavorites((prev) => prev.filter(game => game.id !== gameId));
    };

    const addToVault = (game) => {

        setVault((prev) => {
            const exists = prev.find(g => g.id === game.id);
            return exists ? prev : [...prev, game];
        });
    };

    const removeFromVault = (gameId) => {

        setVault((prev) => prev.filter(game => game.id !== gameId));
    };

    const updateGameMeta = (gameId, updates) => {

        const isInVault = vault.some((game) => game.id === gameId);
        if (!isInVault) {
            return;
        }

        setGameMetaById((prev) => {
            const current = prev[gameId] || {};
            const next = {
                ...current,
                ...updates
            };

            if (!next.status) {
                delete next.status;
            }

            if (!next.playtime) {
                delete next.playtime;
            }

            const hasValues = Object.keys(next).length > 0;

            if (!hasValues) {
                const clone = { ...prev };
                delete clone[gameId];
                return clone;
            }

            return {
                ...prev,
                [gameId]: next
            };
        });
    };

    if (!account) {
        return (
            <LoginPage
                onLogin={handleLogin}
            />
        );
    }

    return (
        <div className="min-h-screen bg-[#050710] text-slate-100">
            <WelcomeToast show={showWelcomeToast} />

            <div className="flex min-h-screen w-full flex-col gap-6 px-3 py-4 sm:px-4 sm:py-6 lg:flex-row lg:px-10 lg:py-8">
                <Sidebar
                    username={username}
                    currentView={currentView}
                    setCurrentView={navigateToView}
                    favoritesCount={favorites.length}
                    vaultCount={vault.length}
                    onLogout={handleLogout}
                    collapsed={sidebarCollapsed}
                    onToggleCollapsed={() => setSidebarCollapsed((collapsed) => !collapsed)}
                    genres={genres}
                    statuses={statuses}
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                />

                <main className="flex-1 min-w-0 space-y-6">
                    {selectedGame ? (
                        <div className="rounded-3xl border border-slate-800/80 bg-[#091428]/90 p-4 shadow-[0_30px_90px_-42px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:rounded-4xl sm:p-6">
                            <DetailsPage
                                game={selectedGame}
                                username={username}
                                canTrack={vault.some((game) => game.id === selectedGame.id)}
                                onUpdateGameMeta={updateGameMeta}
                                onBack={goBackFromDetails}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="xl:hidden">
                                <MobileNav
                                    username={username}
                                    currentView={currentView}
                                    setCurrentView={navigateToView}
                                    onLogout={handleLogout}
                                />
                            </div>

                            <Header
                                currentView={currentView}
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                showSearch={currentView === "home"}
                            />

                            <div className="rounded-3xl border border-slate-800/80 bg-[#091428]/90 p-4 shadow-[0_30px_90px_-42px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:rounded-4xl sm:p-6">
                            {currentView === "home" && (
                                <HomePage
                                    username={username}
                                    games={filteredGames}
                                    favoriteIds={favoriteIds}
                                    vaultIds={vaultIds}
                                    onAddFavorite={addToFavorites}
                                    onAddVault={addToVault}
                                    onViewDetails={openDetailsView}
                                />
                            )}

                            {currentView === "favorites" && (
                                <FavoritesPage
                                    favorites={favorites}
                                    onViewDetails={openDetailsView}
                                    onAddFavorite={addToFavorites}
                                    onAddVault={addToVault}
                                    onRemoveFavorite={removeFromFavorites}
                                />
                            )}

                            {currentView === "vault" && (
                                <VaultPage
                                    vault={vault}
                                    onViewDetails={openDetailsView}
                                    onAddFavorite={addToFavorites}
                                    onAddVault={addToVault}
                                    onRemoveVault={removeFromVault}
                                />
                            )}

                            {currentView === "events" && (
                                <EventsPage />
                            )}
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}

export default App;
