import { useEffect, useState } from "react";
import { FiPlus, FiTag, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addNote, addTag, updateNote } from "../redux/slices/notesSlice";
import TagList from "./TagList";

const EMPTY_FORM = { title: "", body: "", tags: [] };

function NoteForm({ note, onClose }) {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.notes.tags);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [newTag, setNewTag] = useState("");
  const isEditing = Boolean(note);

  useEffect(() => {
    setFormData(note
      ? { title: note.title, body: note.body, tags: note.tags }
      : EMPTY_FORM);
  }, [note]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const toggleTag = (tag) => {
    setFormData((current) => ({
      ...current,
      tags: current.tags.includes(tag)
        ? current.tags.filter((item) => item !== tag)
        : [...current.tags, tag]
    }));
  };

  const handleAddTag = () => {
    const trimmedTag = newTag.trim();
    if (!trimmedTag) return;

    const existingTag = tags.find(
      (tag) => tag.toLowerCase() === trimmedTag.toLowerCase()
    );
    const tagToUse = existingTag || trimmedTag;

    if (!existingTag) dispatch(addTag(trimmedTag));

    setFormData((current) =>
      current.tags.includes(tagToUse)
        ? current
        : { ...current, tags: [...current.tags, tagToUse] }
    );
    setNewTag("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = formData.title.trim();
    const body = formData.body.trim();
    if (!title) return;

    const now = new Date().toISOString();

    if (isEditing) {
      dispatch(updateNote({ id: note.id, title, body, tags: formData.tags, updatedAt: now }));
    } else {
      dispatch(addNote({
        id: crypto.randomUUID(), title, body, tags: formData.tags,
        createdAt: now, updatedAt: now
      }));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      role="dialog" aria-modal="true" aria-labelledby="note-form-title">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <h2 id="note-form-title" className="text-lg font-bold text-slate-900">{isEditing ? "Edit Note" : "Create Note"}</h2>
            <p className="mt-0.5 text-xs text-slate-500">Use Markdown for formatted note content.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900"><FiX size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-6">
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-semibold text-slate-700">Title</label>
            <input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Enter note title..." autoFocus required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100" />
          </div>

          <div>
            <label htmlFor="body" className="mb-2 block text-sm font-semibold text-slate-700">Body</label>
            <textarea id="body" name="body" value={formData.body} onChange={handleChange} rows={10}
              placeholder={`# Heading

Write your note here...

- Task one
- Task two

**Bold text**`}
              className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100" />
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2"><FiTag className="text-slate-500" /><label className="text-sm font-semibold text-slate-700">Tags</label></div>
            <TagList tags={tags} selectedTags={formData.tags} onToggle={toggleTag} />
            {formData.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700">
                    {tag}
                    <button type="button" onClick={() => setFormData((current) => ({ ...current, tags: current.tags.filter((item) => item !== tag) }))} aria-label={`Remove ${tag}`} className="rounded-full hover:bg-indigo-100"><FiX size={13} /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="newTag" className="mb-2 block text-sm font-semibold text-slate-700">Create New Tag</label>
            <div className="flex gap-2">
              <input id="newTag" value={newTag} onChange={(event) => setNewTag(event.target.value)}
                onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); handleAddTag(); } }}
                placeholder="e.g. Ideas" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100" />
              <button type="button" onClick={handleAddTag} className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><FiPlus size={16} />Add</button>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
            <button type="submit" className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">{isEditing ? "Save Changes" : "Save Note"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;
