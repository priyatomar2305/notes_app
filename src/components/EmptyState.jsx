import { FiFileText } from "react-icons/fi";

function EmptyState({ filtered }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <FiFileText size={24} />
      </div>
      <h2 className="text-lg font-semibold text-slate-900">{filtered ? "No notes found" : "No notes yet"}</h2>
      <p className="mt-2 text-sm text-slate-500">
        {filtered ? "No notes found for the selected tags." : "No notes yet. Create your first note."}
      </p>
    </div>
  );
}

export default EmptyState;
