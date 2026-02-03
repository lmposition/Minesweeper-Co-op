import React, { useEffect } from 'react';
import { useMinesweeperStore } from '@/app/store';
import "nes.css/css/nes.min.css";

export default function Timer() {
    const timerSeconds = useMinesweeperStore((state) => state.timerSeconds);
    const timerRunning = useMinesweeperStore((state) => state.timerRunning);
    const setTimerSeconds = useMinesweeperStore((state) => state.setTimerSeconds);

    useEffect(() => {
        if (!timerRunning) return;

        const interval = setInterval(() => {
            setTimerSeconds(timerSeconds + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timerRunning, timerSeconds, setTimerSeconds]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-slate-100 nes-container is-centered" role="timer" aria-label={`Game timer: ${formatTime(timerSeconds)}`}>
            <div className="flex items-center justify-center gap-2">
                <span className="text-lg" aria-hidden="true">⏱️</span>
                <p className="text-xl font-bold m-0 tabular-nums" style={{ fontFamily: 'monospace' }}>
                    {formatTime(timerSeconds)}
                </p>
            </div>
        </div>
    );
}
