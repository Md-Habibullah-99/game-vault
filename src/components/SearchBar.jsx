function SearchBar({
    searchTerm,
    setSearchTerm
}) {

    return (
        <div className="rounded-[28px] border border-slate-800/80 bg-[#091428]/90 p-4 shadow-[0_16px_45px_-28px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-4 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20"
            />
        </div>
    );
}

export default SearchBar;