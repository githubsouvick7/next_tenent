'use client';

import { useState } from 'react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) return alert('Invalid credentials');
        window.location.href = `http://${username}.localhost:3000`;
    };

    return (
        <form onSubmit={handleLogin} style={{ padding: '2rem' }}>
            <h1>Login</h1>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <br />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
            />
            <br />
            <button type="submit">Login</button>
        </form>
    );
}
