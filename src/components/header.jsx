import { useState } from "react";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";

const VIEW_META = {
    home: { title: "Discover", subtitle: "Find something new to play" },
    vault: { title: "My Vault", subtitle: "Games you're tracking" },
    favorites: { title: "Favorites", subtitle: "Games you've loved" },
    events: { title: "Events", subtitle: "What's happening in gaming" }
};

function Header({
    currentView,
    searchTerm,
    setSearchTerm,
    showSearch = true
}) {
    const [focused, setFocused] = useState(false);

    const meta = VIEW_META[currentView] || VIEW_META.home;

    return (
        <header className="flex flex-col gap-4 rounded-[28px] border border-white/[0.07] bg-[#111214]/90 px-5 py-4 shadow-[0_16px_45px_-28px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="min-w-0">
                <h1 className="truncate text-xl font-semibold tracking-tight text-white sm:text-2xl">{meta.title}</h1>
                <p className="truncate text-sm text-[#9aa0a6]">{meta.subtitle}</p>
            </div>

            {showSearch && (
                <div
                    className={`relative w-full shrink-0 sm:w-[360px] ${
                        focused ? "ring-2 ring-[#8ab4f8]/40" : ""
                    } rounded-full border border-white/10 bg-[#1b1c1e] transition`}
                >
                    <FaMagnifyingGlass
                        size={14}
                        className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                            focused ? "text-[#8ab4f8]" : "text-[#9aa0a6]"
                        }`}
                    />

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder="Search games..."
                        className="w-full rounded-full bg-transparent py-2.5 pl-11 pr-9 text-sm text-[#e3e3e3] placeholder:text-[#80868b] outline-none"
                    />

                    {searchTerm && (
                        <button
                            type="button"
                            onClick={() => setSearchTerm("")}
                            aria-label="Clear search"
                            className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-[#9aa0a6] transition hover:bg-white/10 hover:text-white"
                        >
                            <FaXmark size={11} />
                        </button>
                    )}
                </div>
            )}
        </header>
    );
}

export default Header;
