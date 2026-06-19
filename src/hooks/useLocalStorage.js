import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = localStorage.getItem(key);
			if (item === null) {
				return initialValue;
			}

			return JSON.parse(item);
		} catch {
			return initialValue;
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(key, JSON.stringify(storedValue));
		} catch {
			// Ignore write failures (e.g. private mode or quota limits)
		}
	}, [key, storedValue]);

	return [storedValue, setStoredValue];
}

export default useLocalStorage;
