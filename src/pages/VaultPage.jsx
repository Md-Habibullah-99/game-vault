import GameCard from "../components/GameCard";

function VaultPage({
    vault,
    onViewDetails,
    onAddFavorite,
    onAddVault
}) {

    return (

        <div className="page">

            <h1>
                📚 My Game Vault
            </h1>

            {vault.length === 0 ? (
                <div className="page-empty">
                    <p>Your vault is empty. Add games to build your personal collection!</p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {
                        vault.map(game => (

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

export default VaultPage;