import GameCard from "../components/GameCard";

function HomePage({
    games,
    favoriteIds,
    vaultIds,
    onAddFavorite,
    onAddVault,
    onViewDetails
}) {
    return (
        <div className="space-y-6">
            {games.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-white/10 bg-white/[0.02] py-16 text-center">
                    <p className="text-lg font-semibold text-white">No games match your filters</p>
                    <p className="text-sm text-[#9aa0a6]">Try a different search term or reset the filters in the sidebar.</p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {games.map((game) => (
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
            )}
        </div>
    );
}

export default HomePage;
