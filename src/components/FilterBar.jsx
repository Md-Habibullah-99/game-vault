function FilterBar({
    selectedGenre,
    setSelectedGenre,
    selectedStatus,
    setSelectedStatus
}) {

    return (
        <div className="grid gap-4 rounded-[28px] border border-slate-800/80 bg-[#091428]/90 p-4 shadow-[0_16px_45px_-28px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:grid-cols-2">
            <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20"
            >
                <option value="All">All Genres</option>
                <option value="FPS">FPS</option>
                <option value="RPG">RPG</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Horror">Horror</option>
                <option value="Open World">Open World</option>
            </select>

            <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20"
            >
                <option value="All">All Status</option>
                <option value="Played">Played</option>
                <option value="Playing">Playing</option>
                <option value="Wishlist">Wishlist</option>
            </select>
        </div>
    );
}

export default FilterBar;