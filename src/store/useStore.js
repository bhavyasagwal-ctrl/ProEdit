import { create } from 'zustand';

export const useStore = create((set) => ({
  project: {
    name: 'Untitled Project',
    fps: 30,
    resolution: '1920x1080',
    duration: 0,
  },
  setProject: (updates) =>
    set((state) => ({
      project: { ...state.project, ...updates },
    })),

  media: [],
  addMedia: (file) =>
    set((state) => ({
      media: [
        ...state.media,
        {
          id: crypto.randomUUID(),
          name: file.name,
          type: file.type.startsWith('video')
            ? 'video'
            : file.type.startsWith('audio')
              ? 'audio'
              : 'image',
          path: file.path || URL.createObjectURL(file),
          duration: 0,
          size: file.size,
        },
      ],
    })),

  removeMedia: (id) =>
    set((state) => ({
      media: state.media.filter((item) => item.id !== id),
    })),

  tracks: [],
  addTrack: (type) =>
    set((state) => ({
      tracks: [
        ...state.tracks,
        {
          id: crypto.randomUUID(),
          type,
          clips: [],
          volume: 1,
          muted: false,
        },
      ],
    })),

  removeTrack: (trackId) =>
    set((state) => ({
      tracks: state.tracks.filter((track) => track.id !== trackId),
    })),

  addClip: (trackId, clip) =>
    set((state) => ({
      tracks: state.tracks.map((track) =>
        track.id === trackId
          ? {
              ...track,
              clips: [
                ...track.clips,
                { id: crypto.randomUUID(), name: clip.name, start: 0, duration: clip.duration || 5, ...clip }
              ],
            }
          : track
      ),
    })),

  removeClip: (trackId, clipId) =>
    set((state) => ({
      tracks: state.tracks.map((track) =>
        track.id === trackId
          ? { ...track, clips: track.clips.filter((clip) => clip.id !== clipId) }
          : track
      ),
    })),

  isPlaying: false,
  currentTime: 0,
  setIsPlaying: (value) => set({ isPlaying: value }),
  setCurrentTime: (value) => set({ currentTime: value }),
}));
