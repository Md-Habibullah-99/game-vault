import { useState } from "react";

import Header from "../components/header";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import GameCard from "../components/GameCard";

function HomePage({
    username,
    games,
    favoriteIds,
    vaultIds,
    onAddFavorite,
    onAddVault,
    onViewDetails
}) {

    const [
        searchTerm,
        setSearchTerm
    ] = useState("");

    const [
        selectedGenre,
        setSelectedGenre
    ] = useState("All");

    const [
        selectedStatus,
        setSelectedStatus
    ] = useState("All");

    const genres =
        Array.from(
            new Set(
                games.flatMap((game) => game.genres || [game.genre])
            )
        ).sort();

    const statuses =
        Array.from(new Set(games.map((game) => game.status).filter(Boolean))).sort();

    const filteredGames =
        games.filter(game => {

            const matchesSearch =
                game.title
                .toLowerCase()
                .includes(
                    searchTerm
                    .toLowerCase()
                );

            const matchesGenre =
                selectedGenre === "All"
                ||
                (game.genres || [game.genre]).includes(selectedGenre);

            const matchesStatus =
                selectedStatus === "All"
                ||
                (game.status && game.status === selectedStatus);

            return (
                matchesSearch
                &&
                matchesGenre
                &&
                matchesStatus
            );

        });

    return (
        <div className="space-y-6">
            <Header username={username} />

            <div className="space-y-4">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <FilterBar
                    genres={genres}
                    statuses={statuses}
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredGames.map((game) => (
                    <GameCard
                        key={game.id}
                        game={game}
                        isFavorite={favoriteIds.has(game.id)}
                        isInVault={vaultIds.has(game.id)}
                        onAddFavorite={onAddFavorite}
                        onAddVault={onAddVault}
                        onViewDetails={onViewDetails}
                    />
                ))}
            </div>
        </div>
    );
}

export default HomePage;