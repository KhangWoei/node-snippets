import { useEffect, useState } from "react";

interface Data {
    id: number;
    name?: string;
}

export function Fetch() {
    const [data, setData] = useState<Data[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("dummy.com/data");

            if (!response.ok) {
                throw new Error(response.status.toString());
            }

            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to fetch");
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (<div data-testid="loading" />);
    }

    if (error) {
        return (<div data-testid="error" />);
    }

    return (
        <div data-testid="data">
            <ul>
                {data.map((d) => (
                    <li key={d.id}>
                        <strong>{d.name}</strong>
                    </li>
                ))}
            </ul>
        </div>);
}
