import React, { useState } from 'react';
import { useStore } from './store/useStore';
import MediaLibrary from './components/MediaLibrary';
import Timeline from './components/Timeline';
import Preview from './components/Preview';
import Sidebar from './components/Sidebar';

function App() {
  const { project } = useStore();
  const [activeView, setActiveView] = useState('editor');

  return (
    <div className="flex h-screen w-full bg-slate-900 text-slate-100">
      <div className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-slate-700 bg-slate-800 px-5">
        <div className="flex items-center gap-6">
          <div className="text-xl font-black tracking-wide text-blue-400">ProEdit</div>
          <nav className="flex gap-4 text-sm text-slate-300">
            <button className="rounded px-2 py-1 hover:bg-slate-700">File</button>
            <button className="rounded px-2 py-1 hover:bg-slate-700">Edit</button>
            <button className="rounded px-2 py-1 hover:bg-slate-700">View</button>
            <button className="rounded px-2 py-1 hover:bg-slate-700">Effects</button>
            <button className="rounded px-2 py-1 hover:bg-slate-700">Export</button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView(activeView === 'editor' ? 'color' : 'editor')}
            className="rounded border border-slate-600 bg-slate-700 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-600"
          >
            {activeView === 'editor' ? 'Color' : 'Editor'}
          </button>
          <div className="rounded bg-slate-700 px-3 py-1 text-sm text-slate-200">
            {project.name}
          </div>
        </div>
      </div>

      <div className="mt-16 flex h-[calc(100vh-4rem)] w-full">
        <aside className="w-72 border-r border-slate-700 bg-slate-800">
          <MediaLibrary />
        </aside>

        <main className="flex flex-1 flex-col">
          <div className="flex h-[58%] min-h-[320px] items-center justify-center border-b border-slate-700 bg-black">
            <Preview />
          </div>

          <div className="h-[42%] min-h-[260px] overflow-auto bg-slate-800">
            <Timeline />
          </div>
        </main>

        <aside className="w-72 border-l border-slate-700 bg-slate-800">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}

export default App;
