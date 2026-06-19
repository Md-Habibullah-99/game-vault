function GameCard({
    game,
    onAddFavorite,
    onAddVault,
    onViewDetails
}) {

    return (
        <article className="game-card overflow-hidden rounded-4xl border border-slate-800/70 bg-[#0b1830]/95 shadow-[0_22px_60px_-34px_rgba(0,0,0,0.8)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40">
            <img
                src={game.image}
                alt={game.title}
                className="game-card-image h-56 w-full object-cover"
            />

            <div className="game-card-content space-y-4 p-6">
                <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-white">{game.title}</h3>
                    <p className="text-sm uppercase tracking-[0.25em] text-[#00F5FF]">{game.genre}</p>
                </div>

                <div className="game-card-meta grid gap-2 text-slate-300 sm:grid-cols-2">
                    <span>⭐ {game.rating}</span>
                    <span>🎯 {game.year}</span>
                </div>

                <p className="game-card-description text-slate-300">{game.description}</p>

                <div className="game-card-actions flex flex-wrap gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => onViewDetails(game)}
                        className="details-btn rounded-3xl bg-linear-to-r from-cyan-500 to-violet-500 px-4 py-2 text-sm font-semibold text-slate-950 transition duration-300 hover:brightness-110"
                    >
                        Details
                    </button>
                    <button
                        type="button"
                        onClick={() => onAddFavorite(game)}
                        className="secondary-action-btn rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-2 text-sm text-slate-100 transition duration-300 hover:bg-slate-800"
                    >
                        ❤️ Favorite
                    </button>
                    <button
                        type="button"
                        onClick={() => onAddVault(game)}
                        className="secondary-action-btn rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-2 text-sm text-slate-100 transition duration-300 hover:bg-slate-800"
                    >
                        📚 Vault
                    </button>
                </div>
            </div>
        </article>
    );
}

export default GameCard;