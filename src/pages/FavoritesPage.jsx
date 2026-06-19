import GameCard from "../components/GameCard";

function FavoritesPage({
    favorites,
    onViewDetails,
    onAddFavorite,
    onAddVault
}) {

    return (

        <div className="page">

            <h1>
                ❤️ Favorite Games
            </h1>

            {favorites.length === 0 ? (
                <div className="page-empty">
                    <p>No favorite games yet. Add some games to your favorites to see them here!</p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {
                        favorites.map(game => (

                            <GameCard
                                key={game.id}
                                game={game}
                                onViewDetails={onViewDetails}
                                onAddFavorite={onAddFavorite}
                                onAddVault={onAddVault}
                            />

                        ))
                    }
                </div>
            )}

        </div>
    );
}

export default FavoritesPage;