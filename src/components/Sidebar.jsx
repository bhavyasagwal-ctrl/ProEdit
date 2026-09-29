import React, { useState } from 'react';
import { useStore } from '../store/useStore';

function Sidebar() {
  const { project, setProject, tracks } = useStore();
  const [activeTab, setActiveTab] = useState('properties');

  return (
    <div className="flex h-full flex-col p-4">
      <div className="mb-4 flex border-b border-slate-700">
        <button
          onClick={() => setActiveTab('properties')}
          className={`px-3 py-2 text-sm ${
            activeTab === 'properties' ? 'border-b-2 border-blue-400 text-blue-400' : 'text-slate-400'
          }`}
        >
          Properties
        </button>
        <button
          onClick={() => setActiveTab('effects')}
          className={`px-3 py-2 text-sm ${
            activeTab === 'effects' ? 'border-b-2 border-blue-400 text-blue-400' : 'text-slate-400'
          }`}
        >
          Effects
        </button>
      </div>

      {activeTab === 'properties' && (
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-slate-300">Project name</label>
            <input
              value={project.name}
              onChange={(e) => setProject({ name: e.target.value })}
              className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-sm outline-none ring-0"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Resolution</label>
            <select
              value={project.resolution}
              onChange={(e) => setProject({ resolution: e.target.value })}
              className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-sm"
            >
              <option>1920x1080</option>
              <option>1280x720</option>
              <option>3840x2160</option>
              <option>1024x576</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Frame rate</label>
            <select
              value={project.fps}
              onChange={(e) => setProject({ fps: Number(e.target.value) })}
              className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-sm"
            >
              <option>24</option>
              <option>30</option>
              <option>60</option>
            </select>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-700/60 p-3">
            <div className="mb-2 text-sm font-medium text-slate-200">Project Stats</div>
            <div className="text-xs text-slate-400">
              <div>Tracks: {tracks.length}</div>
              <div>Duration: {project.duration || 0}s</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'effects' && (
        <div className="space-y-3">
          <div className="rounded-lg border border-slate-700 bg-slate-700/60 p-3">
            <h3 className="mb-2 text-sm font-semibold text-slate-200">Transitions</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <button className="w-full rounded bg-slate-600 px-2 py-1 text-left hover:bg-slate-500">Fade</button>
              <button className="w-full rounded bg-slate-600 px-2 py-1 text-left hover:bg-slate-500">Slide</button>
              <button className="w-full rounded bg-slate-600 px-2 py-1 text-left hover:bg-slate-500">Zoom</button>
            </div>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-700/60 p-3">
            <h3 className="mb-2 text-sm font-semibold text-slate-200">Video Effects</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <button className="w-full rounded bg-slate-600 px-2 py-1 text-left hover:bg-slate-500">Brightness</button>
              <button className="w-full rounded bg-slate-600 px-2 py-1 text-left hover:bg-slate-500">Contrast</button>
              <button className="w-full rounded bg-slate-600 px-2 py-1 text-left hover:bg-slate-500">Saturation</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
