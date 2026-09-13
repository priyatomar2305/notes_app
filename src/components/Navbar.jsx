import { FiEdit3 } from "react-icons/fi";

function Navbar({ onAddNote }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
            <FiEdit3 size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Notes App</h1>
            <p className="hidden text-xs text-slate-500 sm:block">Capture your thoughts</p>
          </div>
        </div>
        <button type="button" onClick={onAddNote}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
          <span className="text-lg leading-none">+</span><span>Add Note</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
