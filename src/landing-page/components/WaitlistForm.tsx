'use client';

import { useState } from 'react';

export default function WaitlistForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            console.log('Registered:', email);
            setStatus('success');
            setEmail('');
        }, 1000);
    };

    return (
        <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                    type="email"
                    required
                    placeholder="Enter your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                    disabled={status === 'loading' || status === 'success'}
                />
                <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="px-8 py-3 rounded-full bg-[#FF6B6B] text-white font-semibold hover:bg-[#ff5252] transition-colors disabled:opacity-70 whitespace-nowrap"
                >
                    {status === 'loading' ? 'Joining...' : status === 'success' ? 'Joined!' : 'Join Waitlist'}
                </button>
            </form>
            {status === 'success' && (
                <p className="mt-3 text-green-400 text-sm">Thanks for joining! We'll be in touch soon.</p>
            )}
        </div>
    );
}
