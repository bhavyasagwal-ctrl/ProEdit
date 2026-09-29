import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

function Preview() {
  const videoRef = useRef(null);
  const { isPlaying, currentTime, setIsPlaying, setCurrentTime } = useStore();

  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play?.();
    } else {
      videoRef.current.pause?.();
    }
  }, [isPlaying]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-black p-4">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-gradient-to-br from-slate-800 via-black to-slate-800">
        <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-slate-600 bg-slate-900/90 text-5xl text-blue-400 shadow-2xl shadow-blue-500/20">
          ▶
        </div>

        <video ref={videoRef} className="hidden" />
      </div>

      <div className="mt-4 flex w-full max-w-2xl items-center gap-4 rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg hover:bg-blue-500"
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>

        <input
          type="range"
          min="0"
          max="100"
          value={currentTime}
          onChange={(e) => setCurrentTime(Number(e.target.value))}
          className="slider w-full"
        />

        <span className="w-16 text-right text-sm text-slate-300">{formatTime(currentTime)}</span>
      </div>
    </div>
  );
}

function formatTime(value) {
  const totalSeconds = Math.round(value);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export default Preview;
