import { useEffect, useState } from 'react';

export function useAppLaunchApi (url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${url}`);
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }
                const json = await res.json();
                if (isMounted) {
                    setData(json);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url])

    return { data, loading, error };
}
