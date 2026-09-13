import ReactMarkdown from "react-markdown";
import { FiCalendar, FiEdit2, FiTrash2 } from "react-icons/fi";

function NoteCard({ note, onEdit, onDelete }) {
  const formattedDate = new Date(note.updatedAt || note.createdAt).toLocaleString(undefined, {
    dateStyle: "medium", timeStyle: "short"
  });

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h2 className="line-clamp-2 text-lg font-bold text-slate-900">{note.title || "Untitled Note"}</h2>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={() => onEdit(note)} aria-label={`Edit ${note.title}`} title="Edit note"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"><FiEdit2 size={17} /></button>
          <button type="button" onClick={() => onDelete(note.id)} aria-label={`Delete ${note.title}`} title="Delete note"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"><FiTrash2 size={17} /></button>
        </div>
      </div>
      <div className="markdown-content mb-5 flex-1 overflow-hidden">
        <ReactMarkdown>{note.body}</ReactMarkdown>
      </div>
      {note.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {note.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{tag}</span>)}
        </div>
      )}
      <div className="flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-400">
        <FiCalendar size={14} /><span>Updated {formattedDate}</span>
      </div>
    </article>
  );
}

export default NoteCard;
