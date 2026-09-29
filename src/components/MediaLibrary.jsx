import React, { useRef } from 'react';
import { useStore } from '../store/useStore';

function MediaLibrary() {
  const { media, addMedia, removeMedia } = useStore();
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    Array.from(files).forEach((file) => addMedia(file));
  };

  return (
    <div className="flex h-full flex-col p-4">
      <h2 className="mb-4 text-lg font-bold">Media Library</h2>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="mb-4 cursor-pointer rounded-xl border-2 border-dashed border-slate-600 bg-slate-700/60 p-4 text-center text-sm text-slate-300 transition hover:border-blue-400"
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="video/*,audio/*,image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div>Drag & drop media</div>
        <div className="mt-1 text-xs text-slate-400">or click to browse</div>
      </div>

      <div className="space-y-2 overflow-auto">
        {media.length === 0 ? (
          <p className="text-sm text-slate-400">No media imported yet.</p>
        ) : (
          media.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('application/json', JSON.stringify(item));
              }}
              className="group flex items-center justify-between rounded-lg border border-slate-700 bg-slate-700/80 px-3 py-2 text-sm"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-slate-100">{item.name}</p>
                <p className="text-xs text-slate-400">{item.type}</p>
              </div>
              <button
                onClick={() => removeMedia(item.id)}
                className="ml-2 text-xs text-red-400 opacity-0 transition group-hover:opacity-100 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MediaLibrary;
