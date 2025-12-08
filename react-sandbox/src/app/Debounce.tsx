import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
    const [debounce, setDebounce] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(value);
        }, delay);

        // cleanup code runs before the next effect or on unmount
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debounce;
}

