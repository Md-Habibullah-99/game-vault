import { useState } from "react";

import LoginPage from "./pages/LoginPage";
import Sidebar from "./components/sidebar";
import MobileNav from "./components/MobileNav";

import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import VaultPage from "./pages/VaultPage";
import DetailsPage from "./pages/DetailsPage";
import useLocalStorage from "./hooks/useLocalStorage";
import { games } from "./data/games";

function App() {

    const [username, setUsername] =
        useLocalStorage("gv_user", "");

    const [currentView, setCurrentView] =
        useState("home");

    const [favorites, setFavorites] =
        useLocalStorage("gv_favorites", []);

    const [vault, setVault] =
        useLocalStorage("gv_vault", []);

    const [selectedGame, setSelectedGame] =
        useState(null);

    const handleLogin = (name) => {

        setUsername(name);
    };

    const handleLogout = () => {

        setUsername("");
        setCurrentView("home");
        setSelectedGame(null);
    };

    const addToFavorites = (game) => {

        const exists =
            favorites.find(
                g => g.id === game.id
            );

        if (!exists) {
            setFavorites([
                ...favorites,
                game
            ]);
        }
    };

    const addToVault = (game) => {

        const exists =
            vault.find(
                g => g.id === game.id
            );

        if (!exists) {
            setVault([
                ...vault,
                game
            ]);
        }
    };

    if (!username) {
        return (
            <LoginPage
                onLogin={handleLogin}
            />
        );
    }

    return (
        <div className="min-h-screen bg-[#050710] text-slate-100">
            <div className="flex min-h-screen w-full flex-col gap-6 px-3 py-4 sm:px-4 sm:py-6 lg:flex-row lg:px-10 lg:py-8">
                <Sidebar
                    username={username}
                    currentView={currentView}
                    setCurrentView={setCurrentView}
                    favoritesCount={favorites.length}
                    vaultCount={vault.length}
                    onLogout={handleLogout}
                />

                <main className="flex-1 min-w-0 rounded-3xl border border-slate-800/80 bg-[#091428]/90 p-4 shadow-[0_30px_90px_-42px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:rounded-4xl sm:p-6">
                    {selectedGame ? (
                        <DetailsPage
                            game={selectedGame}
                            username={username}
                            onBack={() => setSelectedGame(null)}
                        />
                    ) : (
                        <>
                            <div className="mb-6 xl:hidden">
                                <MobileNav
                                    username={username}
                                    currentView={currentView}
                                    setCurrentView={setCurrentView}
                                    onLogout={handleLogout}
                                />
                            </div>

                            {currentView === "home" && (
                                <HomePage
                                    username={username}
                                    games={games}
                                    onAddFavorite={addToFavorites}
                                    onAddVault={addToVault}
                                    onViewDetails={setSelectedGame}
                                />
                            )}

                            {currentView === "favorites" && (
                                <FavoritesPage
                                    favorites={favorites}
                                    onViewDetails={setSelectedGame}
                                    onAddFavorite={addToFavorites}
                                    onAddVault={addToVault}
                                />
                            )}

                            {currentView === "vault" && (
                                <VaultPage
                                    vault={vault}
                                    onViewDetails={setSelectedGame}
                                    onAddFavorite={addToFavorites}
                                    onAddVault={addToVault}
                                />
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}

export default App;