import React from 'react';
import { useStore } from '../store/useStore';

function Timeline() {
  const { tracks, addTrack, removeTrack, removeClip } = useStore();

  const handleAddTrack = (type) => {
    addTrack(type);
  };

  const handleDropOnTrack = (trackId, e) => {
    e.preventDefault();
    const payload = e.dataTransfer.getData('application/json');
    if (!payload) return;

    const media = JSON.parse(payload);
    const track = tracks.find((item) => item.id === trackId);
    if (!track) return;

    const duration = media.duration || 5;

    const clip = {
      id: crypto.randomUUID(),
      name: media.name,
      type: media.type,
      source: media.path,
      duration,
      start: 0,
    };

    const currentTrack = { ...track };
    currentTrack.clips = [...currentTrack.clips, clip];
    const newTracks = tracks.map((item) => (item.id === trackId ? currentTrack : item));
    useStore.setState({ tracks: newTracks });
  };

  return (
    <div className="flex h-full flex-col p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Timeline</h2>
        <div className="flex gap-2">
          <button
            onClick={() => handleAddTrack('video')}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm hover:bg-blue-500"
          >
            + Video Track
          </button>
          <button
            onClick={() => handleAddTrack('audio')}
            className="rounded bg-emerald-600 px-3 py-1.5 text-sm hover:bg-emerald-500"
          >
            + Audio Track
          </button>
        </div>
      </div>

      <div className="timeline-container flex-1 overflow-auto">
        {tracks.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Add a track to begin editing.
          </div>
        ) : (
          tracks.map((track) => (
            <div
              key={track.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropOnTrack(track.id, e)}
              className="track"
            >
              <div className="flex w-28 min-w-28 items-center justify-between rounded bg-slate-600 px-2 py-1 text-xs font-medium text-slate-100">
                <span>{track.type === 'video' ? 'Video' : 'Audio'}</span>
                <button
                  onClick={() => removeTrack(track.id)}
                  className="text-slate-300 hover:text-red-400"
                >
                  ×
                </button>
              </div>

              <div className="flex min-h-[52px] flex-1 items-center gap-2 overflow-x-auto rounded bg-slate-900/60 p-2">
                {track.clips.length === 0 ? (
                  <span className="text-xs text-slate-500">Drop media here</span>
                ) : (
                  track.clips.map((clip) => (
                    <div
                      key={clip.id}
                      className="clip relative"
                      style={{ width: `${Math.max(clip.duration * 28, 120)}px` }}
                    >
                      <div className="clip-label">{clip.name}</div>
                      <button
                        onClick={() => removeClip(track.id, clip.id)}
                        className="absolute right-1 top-1 rounded bg-black/20 px-1 text-[9px] text-white hover:bg-black/40"
                      >
                        x
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Timeline;
