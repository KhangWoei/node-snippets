import { useState, useCallback } from "react";

type CustomHook = {
    names: string[];
    isLoading: boolean;
    error: string | null;
    addName: (name: string) => void;
    removeName: (name: string) => void;
    clearNames: () => void;
    addNameAsync: (name: string, delay?: number) => Promise<void>;
    addMultipleNames: (names: string[]) => void;
};

export function useCustomHook(): CustomHook {
    const [names, setNames] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function addName(name: string): void {
        if (name.trim() === "") {
            setError("Name cannot be empty");
            return;
        }
        setError(null);
        const newNames = [...names, name];
        setNames(newNames);
    }

    function removeName(name: string): void {
        const newNames = names.filter(n => n !== name);
        setNames(newNames);
    }

    function clearNames(): void {
        setNames([]);
        setError(null);
    }

    async function addNameAsync(name: string, delay: number = 100): Promise<void> {
        setIsLoading(true);
        setError(null);

        return new Promise((resolve) => {
            setTimeout(() => {
                if (name.trim() === "") {
                    setError("Name cannot be empty");
                    setIsLoading(false);
                    resolve();
                    return;
                }

                setNames(prev => [...prev, name]);
                setIsLoading(false);
                resolve();
            }, delay);
        });
    }

    const addMultipleNames = useCallback((newNames: string[]): void => {
        setNames([...names, ...newNames]);
    }, []);

    return {
        names,
        isLoading,
        error,
        addName,
        removeName,
        clearNames,
        addNameAsync,
        addMultipleNames,
    };
}
