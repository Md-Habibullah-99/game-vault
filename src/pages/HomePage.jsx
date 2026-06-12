import { useState } from "react";

import Header from "../components/header";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import GameCard from "../components/GameCard";

function HomePage({
    username,
    games,
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
                game.genre ===
                selectedGenre;

            const matchesStatus =
                selectedStatus === "All"
                ||
                game.status ===
                selectedStatus;

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