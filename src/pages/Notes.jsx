import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import TagFilter from "../components/TagFilter";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import EmptyState from "../components/EmptyState";
import { deleteNote } from "../redux/slices/notesSlice";

function Notes() {
  const dispatch = useDispatch();
  const { notes, selectedTags } = useSelector((state) => state.notes);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const filteredNotes = useMemo(() => {
    if (selectedTags.length === 0) return notes;
    return notes.filter((note) =>
      selectedTags.every((tag) => note.tags.includes(tag))
    );
  }, [notes, selectedTags]);

  const openCreateForm = () => {
    setEditingNote(null);
    setIsFormOpen(true);
  };

  const openEditForm = (note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingNote(null);
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNote(id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onAddNote={openCreateForm} />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-indigo-600">Your workspace</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">All Notes</h2>
          </div>
          <p className="text-sm text-slate-500">{notes.length} {notes.length === 1 ? "note" : "notes"}</p>
        </div>

        <TagFilter />

        {filteredNotes.length === 0 ? (
          <EmptyState filtered={selectedTags.length > 0} />
        ) : (
          <section aria-label="Notes" className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} onEdit={openEditForm} onDelete={handleDelete} />
            ))}
          </section>
        )}
      </main>

      {isFormOpen && <NoteForm note={editingNote} onClose={closeForm} />}
    </div>
  );
}

export default Notes;
