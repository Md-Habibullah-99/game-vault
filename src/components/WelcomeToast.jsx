import { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

const VISIBLE_MS = 1000; // total time from mount -> unmount (ms)
const FADE_MS = 300; // CSS transition duration (ms)

function WelcomeToast({ show }) {
    const [mounted, setMounted] = useState(false);
    const [entered, setEntered] = useState(false);

    useEffect(() => {
        if (!show) {
            return undefined;
        }

        setMounted(true);

        const enterFrame = requestAnimationFrame(() => setEntered(true));
        const hideTimer = setTimeout(() => setEntered(false), Math.max(0, VISIBLE_MS - FADE_MS));
        const unmountTimer = setTimeout(() => setMounted(false), VISIBLE_MS);

        return () => {
            cancelAnimationFrame(enterFrame);
            clearTimeout(hideTimer);
            clearTimeout(unmountTimer);
        };
    }, [show]);

    if (!mounted) {
        return null;
    }

    return (
        <div
            role="status"
            aria-live="polite"
            className={`pointer-events-none fixed left-1/2 top-5 z-50 -translate-x-1/2 transition-all duration-300 ease-out ${
                entered ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
            }`}
        >
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#1b1c1e]/95 px-5 py-2.5 text-sm font-medium text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl">
                <FaCircleCheck size={15} className="text-[#81c995]" />
                Welcome back!
            </div>
        </div>
    );
}

export default WelcomeToast;
