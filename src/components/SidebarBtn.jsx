function SidebarBtn({
    icon,
    label,
    count,
    active,
    collapsed,
    onClick
}) {
    return (
        <button
            type="button"
            title={label}
            aria-current={active ? "page" : undefined}
            onClick={onClick}
            className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium transition ${
                collapsed ? "justify-center" : ""
            } ${
                active
                    ? "bg-white/[0.09] text-white"
                    : "text-[#c4c7c5] hover:bg-white/[0.06] hover:text-white"
            }`}
        >
            <span className={`flex h-5 w-5 items-center justify-center ${active ? "text-[#8ab4f8]" : "text-[#9aa0a6] group-hover:text-white"}`}>
                {icon}
            </span>

            {!collapsed && (
                <span className="flex flex-1 items-center justify-between gap-2 min-w-0">
                    <span className="truncate">{label}</span>
                    {typeof count === "number" && (
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${active ? "bg-[#8ab4f8]/20 text-[#8ab4f8]" : "bg-white/[0.06] text-[#9aa0a6]"}`}>
                            {count}
                        </span>
                    )}
                </span>
            )}
        </button>
    );
}

export default SidebarBtn;
