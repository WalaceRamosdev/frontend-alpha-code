import { useEffect, useState } from 'react';
import { getSession } from 'auth-astro/client';

export default function AuthStatus() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSession = async () => {
            try {
                const data = await getSession();
                if (data) setSession(data);
            } catch (e) {
                // ignore
            } finally {
                setLoading(false);
            }
        };
        loadSession();
    }, []);

    if (loading) return null;

    if (session) {
        return (
            <a href="/dashboard" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.8rem' }}>
                Dashboard
            </a>
        );
    }

    return (
        <a href="/login" className="text-white font-medium hover:text-gray-300 transition" style={{ fontSize: '0.9rem', marginRight: '15px' }}>
            Login
        </a>
    );
}
