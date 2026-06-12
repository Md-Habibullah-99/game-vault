function Header({
    username
}) {

    return (
        <header className="rounded-[32px] border border-slate-800/80 bg-[#091428]/90 p-6 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.85)] backdrop-blur-xl">
            <div className="space-y-4">
                <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#00F5FF]">Welcome back</p>
                    <h1 className="mt-2 text-4xl font-semibold text-white">{username}</h1>
                </div>
                <p className="max-w-2xl text-slate-300">
                    Discover your next adventure, curate your library, and save favorites with GameVault.
                </p>
            </div>
        </header>
    );
}

export default Header;