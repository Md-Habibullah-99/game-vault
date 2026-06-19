import { useState } from "react";

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState("");
    const [remember, setRemember] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const name = username.trim();
        if (!name) {
            alert("Please enter a username");
            return;
        }

        if (remember) {
            localStorage.setItem("gv_user", name);
        }

        onLogin(name);
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-10 text-slate-100">
            <div className="w-full max-w-lg">
                <div className="login-card rounded-2xl border border-slate-800/70 bg-[#071227]/90 p-8 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.8)]">
                    <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 to-violet-500 text-lg font-bold text-slate-950">
                            GV
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight">GameVault</h1>
                            <p className="mt-1 text-sm text-slate-400">
                                Personal gaming hub - favorites, library, and reviews.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label className="block text-sm font-medium text-slate-300">Username</label>
                        <input
                            aria-label="Username"
                            type="text"
                            placeholder="Choose a display name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20"
                        />

                        <div className="flex items-center justify-between">
                            <label className="inline-flex items-center gap-3 text-sm text-slate-300">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    className="h-4 w-4 rounded border-slate-700 bg-slate-800"
                                />
                                Remember me
                            </label>

                            <button
                                type="button"
                                onClick={() => {
                                    setUsername("");
                                    setRemember(false);
                                }}
                                className="text-sm text-slate-400 hover:text-white"
                            >
                                Clear
                            </button>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="flex-1 rounded-3xl bg-linear-to-r from-cyan-500 to-violet-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
                            >
                                Sign In
                            </button>

                            <button
                                type="button"
                                onClick={() => onLogin("Guest")}
                                className="rounded-3xl border border-slate-700 px-4 py-3 text-sm text-slate-200 hover:bg-slate-800/60"
                            >
                                Continue as Guest
                            </button>
                        </div>
                    </form>

                    <p className="mt-6 text-xs text-slate-500">
                        By continuing you agree to the GameVault Terms and that your data will be stored locally.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
