function SidebarBtn({
    icon,
    label,
    active,
    onClick
}) {
    return (
        <button
            className={`flex w-full items-center gap-3 rounded-[24px] px-4 py-4 text-left text-sm font-semibold transition ${active ? "bg-gradient-to-r from-cyan-500/15 via-slate-900/60 to-violet-500/15 text-slate-100 shadow-[0_10px_30px_-18px_rgba(0,245,255,0.35)]" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
            onClick={onClick}
        >
            <span>{icon}</span>
            <span>{label}</span>
        </button>
    );
}

export default SidebarBtn;