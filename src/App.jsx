import { useState, useEffect } from "react";

import LoginPage from "./pages/LoginPage";
import Sidebar from "./components/sidebar";

import HomePage from "./pages/HomePage";
import { games } from "./data/games";

function App() {

    const [username, setUsername] =
        useState("");

    const [currentView, setCurrentView] =
        useState("home");

    const [favorites, setFavorites] =
        useState([]);

    const [vault, setVault] =
        useState([]);

    const [selectedGame, setSelectedGame] =
        useState(null);

    useEffect(() => {

        const savedUser =
            localStorage.getItem("gv_user");

        const savedFavorites =
            localStorage.getItem("gv_favorites");

        const savedVault =
            localStorage.getItem("gv_vault");

        if (savedUser) {
            setUsername(savedUser);
        }

        if (savedFavorites) {
            setFavorites(
                JSON.parse(savedFavorites)
            );
        }

        if (savedVault) {
            setVault(
                JSON.parse(savedVault)
            );
        }

    }, []);

    useEffect(() => {
        localStorage.setItem(
            "gv_favorites",
            JSON.stringify(favorites)
        );
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem(
            "gv_vault",
            JSON.stringify(vault)
        );
    }, [vault]);

    const handleLogin = (name) => {

        setUsername(name);

        localStorage.setItem(
            "gv_user",
            name
        );
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
            <div className="flex min-h-screen w-full gap-6 px-4 py-8 lg:px-10">
                <Sidebar
                    currentView={currentView}
                    setCurrentView={setCurrentView}
                    favoritesCount={favorites.length}
                    vaultCount={vault.length}
                />

                <main className="flex-1 min-w-0 rounded-[32px] border border-slate-800/80 bg-[#091428]/90 p-6 shadow-[0_30px_90px_-42px_rgba(0,0,0,0.75)] backdrop-blur-xl">
                    {currentView === "home" && (
                        <HomePage
                            username={username}
                            games={games}
                            onAddFavorite={addToFavorites}
                            onAddVault={addToVault}
                            onViewDetails={setSelectedGame}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}

export default App;