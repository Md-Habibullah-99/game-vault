import { useMemo, useState } from "react";

import {
    authenticate,
    createAccount,
    getLastUsername,
    setLastUsername
} from "../utils/auth";

function validatePassword(password) {
    if (password.length < 8) {
        return "Password must be at least 8 characters.";
    }

    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
        return "Password must include letters and numbers.";
    }

    return "";
}

function LoginPage({ onLogin }) {
    const [mode, setMode] = useState("signin");

    const [signinUsername, setSigninUsername] = useState(() => getLastUsername());
    const [signinPassword, setSigninPassword] = useState("");
    const [signinError, setSigninError] = useState("");

    const [signupUsername, setSignupUsername] = useState("");
    const [signupDisplayName, setSignupDisplayName] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
    const [signupErrors, setSignupErrors] = useState({});
    const [signupSuccess, setSignupSuccess] = useState("");

    const disableSignIn = useMemo(
        () => !signinUsername.trim() || !signinPassword,
        [signinUsername, signinPassword]
    );

    const handleSignIn = (e) => {
        e.preventDefault();
        setSigninError("");

        const username = signinUsername.trim();
        if (!username) {
            setSigninError("Username is required.");
            return;
        }

        const result = authenticate(username, signinPassword);
        if (!result.ok) {
            setSigninError(result.error);
            return;
        }

        setLastUsername(username);
        onLogin(result.account);
    };

    const handleCreateAccount = (e) => {
        e.preventDefault();
        setSignupSuccess("");

        const nextErrors = {};
        const username = signupUsername.trim().toLowerCase();
        const displayName = signupDisplayName.trim();

        if (!username) {
            nextErrors.username = "Username is required.";
        } else if (!/^[a-z0-9_]{3,20}$/.test(username)) {
            nextErrors.username = "Use 3-20 chars: lowercase letters, numbers, underscore.";
        }

        if (!displayName) {
            nextErrors.displayName = "Display name is required.";
        }

        const passwordError = validatePassword(signupPassword);
        if (passwordError) {
            nextErrors.password = passwordError;
        }

        if (signupConfirmPassword !== signupPassword) {
            nextErrors.confirmPassword = "Passwords do not match.";
        }

        if (Object.keys(nextErrors).length > 0) {
            setSignupErrors(nextErrors);
            return;
        }

        const created = createAccount({
            username,
            displayName,
            password: signupPassword
        });

        if (!created.ok) {
            setSignupErrors({ username: created.error });
            return;
        }

        setSignupErrors({});
        setSignupSuccess("Account created. Sign in to continue.");
        setSigninUsername(username);
        setSigninPassword("");
        setSignupUsername("");
        setSignupDisplayName("");
        setSignupPassword("");
        setSignupConfirmPassword("");
        setMode("signin");
    };

    const authCardBase =
        "rounded-3xl border border-slate-800/80 bg-[#091428]/95 p-6 sm:p-8 shadow-[0_30px_90px_-42px_rgba(0,0,0,0.8)] backdrop-blur-xl";

    const inputClass =
        "mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-500/20";

    return (
        <div className="min-h-screen bg-[#050710] px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[85vh] w-full max-w-6xl items-center justify-center">
                <div className="grid w-full gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                    <section className="rounded-3xl border border-slate-800/80 bg-linear-to-br from-[#0e1a33] to-[#060c1d] p-7 sm:p-10">
                        <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">GameVault Access</p>
                        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Secure your personal game space.</h1>
                        <p className="mt-4 max-w-2xl text-slate-300">
                            Create your account, keep your vault private to your profile, and access your favorites with a password-protected sign-in.
                        </p>

                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Per-user tracking</p>
                                <p className="mt-2 text-sm text-slate-300">Favorites and Vault are linked to your account.</p>
                            </div>
                            <div className="rounded-2xl border border-violet-400/20 bg-violet-500/5 p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-violet-300">No auto sign-in</p>
                                <p className="mt-2 text-sm text-slate-300">New accounts must sign in from the Login tab.</p>
                            </div>
                        </div>
                    </section>

                    <section className={authCardBase}>
                        <div className="mb-6 flex rounded-2xl border border-slate-800 bg-slate-950/70 p-1">
                            <button
                                type="button"
                                onClick={() => setMode("signin")}
                                className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
                                    mode === "signin"
                                        ? "bg-cyan-500/20 text-cyan-200"
                                        : "text-slate-400 hover:text-slate-200"
                                }`}
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode("signup")}
                                className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
                                    mode === "signup"
                                        ? "bg-cyan-500/20 text-cyan-200"
                                        : "text-slate-400 hover:text-slate-200"
                                }`}
                            >
                                Sign up
                            </button>
                        </div>

                        {mode === "signin" && (
                            <form onSubmit={handleSignIn} className="space-y-4" noValidate>
                                {signupSuccess && (
                                    <p className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                                        {signupSuccess}
                                    </p>
                                )}

                                {signinError && (
                                    <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                                        {signinError}
                                    </p>
                                )}

                                <label className="block text-sm text-slate-300">
                                    Username
                                    <input
                                        type="text"
                                        autoComplete="username"
                                        value={signinUsername}
                                        onChange={(e) => {
                                            setSigninUsername(e.target.value);
                                            setSigninError("");
                                            setSignupSuccess("");
                                        }}
                                        className={inputClass}
                                        placeholder="your_username"
                                    />
                                </label>

                                <label className="block text-sm text-slate-300">
                                    Password
                                    <input
                                        type="password"
                                        autoComplete="current-password"
                                        value={signinPassword}
                                        onChange={(e) => {
                                            setSigninPassword(e.target.value);
                                            setSigninError("");
                                        }}
                                        className={inputClass}
                                        placeholder="Enter password"
                                    />
                                </label>

                                <button
                                    type="submit"
                                    disabled={disableSignIn}
                                    className="w-full rounded-2xl bg-linear-to-r from-cyan-500 to-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Login to GameVault
                                </button>
                            </form>
                        )}

                        {mode === "signup" && (
                            <form onSubmit={handleCreateAccount} className="space-y-4" noValidate>
                                <label className="block text-sm text-slate-300">
                                    Username
                                    <input
                                        type="text"
                                        autoComplete="username"
                                        value={signupUsername}
                                        onChange={(e) => {
                                            setSignupUsername(e.target.value);
                                            setSignupErrors((prev) => ({ ...prev, username: "" }));
                                        }}
                                        className={inputClass}
                                        placeholder="your_username"
                                    />
                                    {signupErrors.username && <p className="mt-2 text-xs text-rose-300">{signupErrors.username}</p>}
                                </label>

                                <label className="block text-sm text-slate-300">
                                    Display name
                                    <input
                                        type="text"
                                        autoComplete="name"
                                        value={signupDisplayName}
                                        onChange={(e) => {
                                            setSignupDisplayName(e.target.value);
                                            setSignupErrors((prev) => ({ ...prev, displayName: "" }));
                                        }}
                                        className={inputClass}
                                        placeholder="Your public profile name"
                                    />
                                    {signupErrors.displayName && <p className="mt-2 text-xs text-rose-300">{signupErrors.displayName}</p>}
                                </label>

                                <label className="block text-sm text-slate-300">
                                    Password
                                    <input
                                        type="password"
                                        autoComplete="new-password"
                                        value={signupPassword}
                                        onChange={(e) => {
                                            setSignupPassword(e.target.value);
                                            setSignupErrors((prev) => ({ ...prev, password: "" }));
                                        }}
                                        className={inputClass}
                                        placeholder="At least 8 chars, letters and numbers"
                                    />
                                    {signupErrors.password && <p className="mt-2 text-xs text-rose-300">{signupErrors.password}</p>}
                                </label>

                                <label className="block text-sm text-slate-300">
                                    Confirm password
                                    <input
                                        type="password"
                                        autoComplete="new-password"
                                        value={signupConfirmPassword}
                                        onChange={(e) => {
                                            setSignupConfirmPassword(e.target.value);
                                            setSignupErrors((prev) => ({ ...prev, confirmPassword: "" }));
                                        }}
                                        className={inputClass}
                                        placeholder="Re-enter your password"
                                    />
                                    {signupErrors.confirmPassword && (
                                        <p className="mt-2 text-xs text-rose-300">{signupErrors.confirmPassword}</p>
                                    )}
                                </label>

                                <button
                                    type="submit"
                                    className="w-full rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/20"
                                >
                                    Create account
                                </button>

                                <p className="text-center text-xs text-slate-500">
                                    You will be redirected to the Login tab after account creation.
                                </p>
                            </form>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
