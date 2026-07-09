import { useEffect, useMemo, useState } from "react";
import { FaCalendarDays, FaRotate } from "react-icons/fa6";

import { fetchGameEvents } from "../services/gameEvents";

const eventFilters = [
    "All",
    "Upcoming Games",
    "Events & Tournaments",
    "Sales"
];

const eventSections = [
    {
        key: "Upcoming Games",
        title: "Upcoming Games",
        description: "Games scheduled in the upcoming release window."
    },
    {
        key: "Events & Tournaments",
        title: "Events & Tournaments",
        description: "Upcoming or ongoing showcases, competitions, and community events."
    },
    {
        key: "Sales",
        title: "Sales",
        description: "Ongoing or incoming store deals from the public sale feed."
    }
];

function EventsPageSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((item) => (
                <div
                    key={item}
                    className="h-48 animate-pulse rounded-2xl border border-slate-700/60 bg-slate-900/60"
                />
            ))}
        </div>
    );
}

function EventCard({
    event,
    active,
    onSelect
}) {
    const accentClass =
        event.accent === "emerald"
            ? "from-emerald-400 to-cyan-400"
            : event.accent === "violet"
                ? "from-violet-400 to-fuchsia-400"
                : "from-cyan-400 to-sky-400";

    return (
        <button
            type="button"
            onClick={() => onSelect(event)}
            className={`flex h-full flex-col gap-4 rounded-2xl border p-4 text-left transition ${
                active
                    ? "border-cyan-200/70 bg-cyan-300/15"
                    : "border-slate-700/80 bg-slate-950/45 hover:border-cyan-300/45 hover:bg-cyan-400/10"
            }`}
        >
            <div className="relative h-28 overflow-hidden rounded-xl bg-slate-950/70">
                {event.image ? (
                    <img
                        src={event.image}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className={`flex h-full w-full items-center justify-center bg-linear-to-br ${accentClass} text-slate-950`}>
                        <FaCalendarDays size={28} />
                    </div>
                )}

                <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-slate-950/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-cyan-100">
                    {event.type}
                </span>

                {event.status && (
                    <span className="absolute bottom-3 left-3 rounded-full border border-emerald-200/25 bg-emerald-400/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-emerald-100">
                        {event.status}
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-3">
                <div>
                    <div className="flex items-start justify-between gap-3">
                        <h2 className="text-xl font-bold leading-tight text-white">
                            {event.title}
                        </h2>
                        {event.badge && (
                            <span className="shrink-0 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200">
                                {event.badge}
                            </span>
                        )}
                    </div>
                    <p className="mt-2 text-sm text-slate-400">
                        {event.meta}
                    </p>
                    <div className="mt-3 rounded-xl border border-slate-700/70 bg-slate-900/55 p-3">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                            {event.timelineLabel || "When"}
                        </p>
                        <p className="mt-1 text-sm font-bold text-white">
                            {event.whenText}
                        </p>
                    </div>
                </div>

                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                    View details
                </span>
            </div>
        </button>
    );
}

function EventDetailsPanel({ event }) {
    if (!event) {
        return (
            <aside className="rounded-2xl border border-slate-700/80 bg-slate-950/45 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    Event Details
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                    Choose an event to see API details, timing, sale info, release platforms, and source data here in GameVault.
                </p>
            </aside>
        );
    }

    return (
        <aside className="rounded-2xl border border-cyan-300/25 bg-slate-950/55 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
                {event.type}
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-white">
                {event.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
                {event.description || event.meta}
            </p>

            <div className="mt-5 grid gap-3">
                {event.status && (
                    <div className="rounded-xl border border-slate-700/70 bg-slate-900/50 p-3">
                        <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Status</p>
                        <p className="mt-1 text-sm font-semibold text-white">{event.status}</p>
                    </div>
                )}

                <div className="rounded-xl border border-slate-700/70 bg-slate-900/50 p-3">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                        {event.timelineLabel || "When"}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">{event.whenText}</p>
                </div>

                {event.source && (
                    <div className="rounded-xl border border-slate-700/70 bg-slate-900/50 p-3">
                        <p className="text-xs uppercase tracking-[0.14em] text-slate-500">API Source</p>
                        <p className="mt-1 text-sm font-semibold text-white">{event.source}</p>
                    </div>
                )}

                {(event.details || []).map((detail) => (
                    <div
                        key={detail.label}
                        className="rounded-xl border border-slate-700/70 bg-slate-900/50 p-3"
                    >
                        <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{detail.label}</p>
                        <p className="mt-1 text-sm font-semibold text-white">{detail.value}</p>
                    </div>
                ))}
            </div>
        </aside>
    );
}

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [status, setStatus] = useState("loading");
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedEvent, setSelectedEvent] = useState(null);

    async function requestEvents(signal) {
        try {
            const nextEvents = await fetchGameEvents(signal);
            setEvents(nextEvents);
            setSelectedEvent(nextEvents[0] || null);
            setStatus("ready");
        } catch {
            setStatus("error");
        }
    }

    useEffect(() => {
        const controller = new AbortController();

        fetchGameEvents(controller.signal)
            .then((nextEvents) => {
                setEvents(nextEvents);
                setSelectedEvent(nextEvents[0] || null);
                setStatus("ready");
            })
            .catch(() => {
                setStatus("error");
            });

        return () => {
            controller.abort();
        };
    }, []);

    async function handleRefresh() {
        setStatus("loading");
        await requestEvents();
    }

    function handleFilterChange(filter) {
        setActiveFilter(filter);

        const nextSelected = filter === "All"
            ? events[0]
            : events.find((event) => event.category === filter);

        setSelectedEvent(nextSelected || null);
    }

    const isLoading = status === "loading";

    const categoryCounts = useMemo(
        () => events.reduce((counts, event) => {
            counts[event.category] = (counts[event.category] || 0) + 1;
            return counts;
        }, {}),
        [events]
    );

    const sectionsToShow = useMemo(
        () => eventSections
            .filter((section) => activeFilter === "All" || activeFilter === section.key)
            .map((section) => ({
                ...section,
                events: events.filter((event) => event.category === section.key)
            })),
        [activeFilter, events]
    );

    return (
        <div className="page space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
                        Live API Feed
                    </p>
                    <h1 className="mb-0">
                        Gaming Events
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                        Upcoming games, ongoing or upcoming events and tournaments, plus active or incoming sales shown inside GameVault.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleRefresh}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-sm font-bold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/15"
                >
                    <FaRotate className={isLoading ? "animate-spin" : ""} size={13} />
                    Refresh
                </button>
            </div>

            {isLoading ? (
                <EventsPageSkeleton />
            ) : (
                <div className="space-y-5">
                    <div className="flex flex-wrap gap-2">
                        {eventFilters.map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => handleFilterChange(filter)}
                                className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                                    activeFilter === filter
                                        ? "border-cyan-200/70 bg-cyan-300/15 text-cyan-100"
                                        : "border-slate-700/80 bg-slate-950/45 text-slate-300 hover:border-cyan-300/45 hover:text-white"
                                }`}
                            >
                                {filter}
                                <span className="ml-2 text-xs text-slate-400">
                                    {filter === "All" ? events.length : categoryCounts[filter] || 0}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
                        <div className="space-y-7">
                            {sectionsToShow.map((section) => (
                                <section
                                    key={section.key}
                                    className="space-y-4"
                                >
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">
                                            {section.title}
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-400">
                                            {section.description}
                                        </p>
                                    </div>

                                    {section.events.length > 0 ? (
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {section.events.map((event) => (
                                                <EventCard
                                                    key={event.id}
                                                    event={event}
                                                    active={selectedEvent?.id === event.id}
                                                    onSelect={setSelectedEvent}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="rounded-2xl border border-dashed border-slate-700/80 bg-slate-950/35 p-5 text-sm text-slate-400">
                                            No {section.title.toLowerCase()} are available right now.
                                        </div>
                                    )}
                                </section>
                            ))}
                        </div>

                        <EventDetailsPanel event={selectedEvent} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventsPage;
