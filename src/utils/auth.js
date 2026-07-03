const ACCOUNTS_KEY = "gv_accounts";
const LAST_USERNAME_KEY = "gv_last_username";
const SESSION_USER_KEY = "gv_session_user";

function readJson(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) {
            return fallback;
        }

        return JSON.parse(raw);
    } catch {
        return fallback;
    }
}

function normalizeUsername(username) {
    return username.trim().toLowerCase();
}

export function getAccounts() {
    return readJson(ACCOUNTS_KEY, {});
}

export function getAccountByUsername(username) {
    const normalized = normalizeUsername(username || "");
    if (!normalized) {
        return null;
    }

    const accounts = getAccounts();
    return accounts[normalized] || null;
}

export function createAccount({ username, displayName, password }) {
    const normalized = normalizeUsername(username);
    if (!normalized) {
        return { ok: false, error: "Username is required." };
    }

    const accounts = getAccounts();
    if (accounts[normalized]) {
        return { ok: false, error: "That username is already taken." };
    }

    const account = {
        username: normalized,
        displayName: displayName.trim(),
        password,
        createdAt: new Date().toISOString()
    };

    const nextAccounts = {
        ...accounts,
        [normalized]: account
    };

    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(nextAccounts));
    return { ok: true, account };
}

export function authenticate(username, password) {
    const account = getAccountByUsername(username);
    if (!account) {
        return { ok: false, error: "No account found for this username." };
    }

    if (account.password !== password) {
        return { ok: false, error: "Incorrect password." };
    }

    return { ok: true, account };
}

export function setLastUsername(username) {
    localStorage.setItem(LAST_USERNAME_KEY, normalizeUsername(username));
}

export function getLastUsername() {
    return localStorage.getItem(LAST_USERNAME_KEY) || "";
}

export function setSessionUser(username) {
    localStorage.setItem(SESSION_USER_KEY, normalizeUsername(username));
}

export function getSessionUser() {
    return localStorage.getItem(SESSION_USER_KEY) || "";
}

export function clearSessionUser() {
    localStorage.removeItem(SESSION_USER_KEY);
}

export function getFavoritesStorageKey(username) {
    return `gv_favorites_${normalizeUsername(username)}`;
}

export function getVaultStorageKey(username) {
    return `gv_vault_${normalizeUsername(username)}`;
}

export function getGameMetaStorageKey(username) {
    return `gv_game_meta_${normalizeUsername(username)}`;
}
