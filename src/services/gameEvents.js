const CHEAPSHARK_DEALS_URL =
    "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=60&pageSize=8&sortBy=Savings";

const RAWG_GAMES_URL = "https://api.rawg.io/api/games";

const fallbackEvents = [
    {
        id: "fallback-showcase",
        type: "Showcase",
        category: "Events & Tournaments",
        status: "Upcoming",
        title: "Summer Games Showcase",
        whenText: "Coming soon",
        timelineLabel: "Event date",
        meta: "Trailers and release updates",
        description: "A curated watch item for publisher reveals, trailers, and release date updates.",
        accent: "cyan"
    },
    {
        id: "fallback-tournament",
        type: "Tournament",
        category: "Events & Tournaments",
        status: "Ongoing",
        title: "Weekend ranked cups",
        whenText: "This weekend",
        timelineLabel: "Tournament date",
        meta: "Competitive events to watch",
        description: "Community and ranked cups are highlighted here when no live tournament API data is available.",
        accent: "violet"
    },
    {
        id: "fallback-sale",
        type: "Sale",
        category: "Sales",
        status: "Ongoing",
        title: "Storefront sale rotation",
        whenText: "Updated daily",
        timelineLabel: "Sale status",
        meta: "Live deals appear when the API responds",
        description: "GameVault checks public deal feeds and shows sale cards directly inside this Events page.",
        accent: "emerald"
    },
    {
        id: "fallback-release",
        type: "Upcoming Game",
        category: "Upcoming Games",
        status: "Upcoming",
        title: "Upcoming release watchlist",
        whenText: "Next 120 days",
        timelineLabel: "Release date",
        meta: "Add a RAWG API key for live release data",
        description: "Set VITE_RAWG_API_KEY to fill this section with upcoming releases from RAWG.",
        accent: "cyan"
    }
];

function formatDate(dateValue) {
    if (!dateValue) {
        return "Date TBA";
    }

    return new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric"
    }).format(new Date(dateValue));
}

function getUpcomingWindow() {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 120);

    return {
        start: today.toISOString().slice(0, 10),
        end: endDate.toISOString().slice(0, 10)
    };
}

function mapDealToEvent(deal) {
    const salePrice = Number(deal.salePrice);
    const normalPrice = Number(deal.normalPrice);
    const savings = Math.round(Number(deal.savings || 0));

    return {
        id: `deal-${deal.dealID}`,
        type: "Sale",
        category: "Sales",
        status: "Ongoing",
        title: deal.title,
        whenText: "Live now",
        timelineLabel: "Sale status",
        meta: `$${salePrice.toFixed(2)}${normalPrice ? ` from $${normalPrice.toFixed(2)}` : ""}`,
        badge: savings > 0 ? `${savings}% off` : "Deal",
        image: deal.thumb,
        source: "CheapShark",
        description: `${deal.title} is currently on sale. The latest public deal feed lists it at $${salePrice.toFixed(2)}${normalPrice ? ` instead of $${normalPrice.toFixed(2)}` : ""}.`,
        details: [
            {
                label: "Status",
                value: "Ongoing sale"
            },
            {
                label: "Sale price",
                value: `$${salePrice.toFixed(2)}`
            },
            {
                label: "Normal price",
                value: normalPrice ? `$${normalPrice.toFixed(2)}` : "N/A"
            },
            {
                label: "Savings",
                value: savings > 0 ? `${savings}%` : "Deal"
            }
        ],
        accent: "emerald"
    };
}

function mapReleaseToEvent(game) {
    return {
        id: `release-${game.id}`,
        type: "Upcoming Game",
        category: "Upcoming Games",
        status: "Upcoming",
        title: game.name,
        whenText: formatDate(game.released),
        timelineLabel: "Release date",
        meta: game.genres?.length
            ? game.genres.slice(0, 2).map((genre) => genre.name).join(", ")
            : "Upcoming game",
        image: game.background_image,
        source: "RAWG",
        description: `${game.name} is listed in the upcoming release window from the RAWG games feed.`,
        details: [
            {
                label: "Status",
                value: "Upcoming game"
            },
            {
                label: "Release date",
                value: formatDate(game.released)
            },
            {
                label: "Rating",
                value: game.rating ? `${game.rating}/5` : "Not rated"
            },
            {
                label: "Platforms",
                value: game.platforms?.length
                    ? game.platforms.slice(0, 3).map((item) => item.platform.name).join(", ")
                    : "TBA"
            }
        ],
        accent: "cyan"
    };
}

async function fetchDealEvents(signal) {
    const response = await fetch(CHEAPSHARK_DEALS_URL, { signal });

    if (!response.ok) {
        throw new Error("Unable to load game deals");
    }

    const deals = await response.json();
    return deals.slice(0, 8).map(mapDealToEvent);
}

async function fetchReleaseEvents(signal) {
    const apiKey = import.meta.env.VITE_RAWG_API_KEY;

    if (!apiKey) {
        return [];
    }

    const { start, end } = getUpcomingWindow();
    const url = new URL(RAWG_GAMES_URL);
    url.searchParams.set("key", apiKey);
    url.searchParams.set("dates", `${start},${end}`);
    url.searchParams.set("ordering", "released");
    url.searchParams.set("page_size", "6");

    const response = await fetch(url, { signal });

    if (!response.ok) {
        throw new Error("Unable to load upcoming releases");
    }

    const data = await response.json();
    return (data.results || []).map(mapReleaseToEvent);
}

export async function fetchGameEvents(signal) {
    const settled = await Promise.allSettled([
        fetchReleaseEvents(signal),
        fetchDealEvents(signal)
    ]);

    const events = settled
        .filter((result) => result.status === "fulfilled")
        .flatMap((result) => result.value);

    if (!events.length) {
        return fallbackEvents;
    }

    return [...events, ...fallbackEvents].slice(0, 12);
}
