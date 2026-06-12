import { useState } from "react";

function LoginPage({ onLogin }) {

    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username.trim()) {
            alert("Please enter a username");
            return;
        }

        onLogin(username.trim());
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-slate-100">
            <div className="w-full max-w-md rounded-4xl border border-slate-700 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-sm">
                <h1 className="text-4xl font-extrabold tracking-tight text-white">
                    🎮 GameVault
                </h1>

                <p className="mt-4 text-slate-300">
                    Track your games, reviews, favorites, and personal library.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-4 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />

                    <button
                        type="submit"
                        className="w-full rounded-3xl bg-linear-to-r from-[#00F5FF] to-[#A855F7] px-4 py-4 text-base font-semibold text-slate-950 transition hover:brightness-110"
                    >
                        Enter GameVault
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;