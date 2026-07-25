function GameCard({
    game,
    isFavorite = false,
    isInVault = false,
    onAddFavorite,
    onAddVault,
    onViewDetails,
    onRemoveFavorite,
    onRemoveVault,
    showRemoveFavorite = false,
    showRemoveVault = false
}) {

    const genreLabel = (game.genres || [game.genre]).join(" · ");

    return (
        <article
            onClick={() => onViewDetails(game)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onViewDetails(game);
                }
            }}
            className="game-card cursor-pointer overflow-hidden rounded-4xl border border-slate-800/70 bg-[#0b1830]/95 shadow-[0_22px_60px_-34px_rgba(0,0,0,0.8)] transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:border-cyan-400/40 hover:shadow-lg"
        >
            <img
                src={game.image}
                alt={game.title}
                className="game-card-image h-56 w-full object-cover"
            />

            <div className="game-card-content space-y-4 p-6">
                <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-white">{game.title}</h3>
                    <p className="text-sm uppercase tracking-[0.2em] text-[#00F5FF]">{genreLabel}</p>
                    {(isFavorite || isInVault) && (
                        <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.12em]">
                            {isFavorite && (
                                <span className="rounded-full border border-rose-400/40 bg-rose-500/15 px-3 py-1 text-rose-200">
                                    In Favorites
                                </span>
                            )}
                            {isInVault && (
                                <span className="rounded-full border border-cyan-400/40 bg-cyan-500/15 px-3 py-1 text-cyan-200">
                                    In Vault
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="game-card-meta grid gap-2 text-slate-300 sm:grid-cols-2">
                    <span>⭐ {game.rating}</span>
                    <span>🎯 {game.year}</span>
                </div>

                <p className="game-card-description text-slate-300">{game.description}</p>

                <div className="game-card-actions flex flex-wrap gap-3 pt-2">
                    {showRemoveFavorite ? (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemoveFavorite(game.id);
                            }}
                            className="secondary-action-btn rounded-3xl border border-rose-400/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-200 transition duration-300 hover:bg-rose-500/20"
                        >
                            Remove Favorite
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddFavorite(game);
                            }}
                            disabled={isFavorite}
                            className="secondary-action-btn rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-2 text-sm text-slate-100 transition duration-300 hover:bg-slate-800 disabled:cursor-not-allowed disabled:border-rose-500/30 disabled:bg-rose-500/10 disabled:text-rose-200"
                        >
                            {isFavorite ? "In Favorites" : "❤️ Favorite"}
                        </button>
                    )}

                    {showRemoveVault ? (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemoveVault(game.id);
                            }}
                            className="secondary-action-btn rounded-3xl border border-rose-400/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-200 transition duration-300 hover:bg-rose-500/20"
                        >
                            Remove Vault
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddVault(game);
                            }}
                            disabled={isInVault}
                            className="secondary-action-btn rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-2 text-sm text-slate-100 transition duration-300 hover:bg-slate-800 disabled:cursor-not-allowed disabled:border-cyan-500/30 disabled:bg-cyan-500/10 disabled:text-cyan-200"
                        >
                            {isInVault ? "In Vault" : "📚 Vault"}
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}

export default GameCard;