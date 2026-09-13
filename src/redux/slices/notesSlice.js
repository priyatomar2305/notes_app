import { createSlice } from "@reduxjs/toolkit";
import { loadNotesState } from "../../utils/localStorage";

const storedState = loadNotesState();

const initialState = {
  notes: storedState?.notes || [],
  tags: storedState?.tags || ["Work", "Personal", "Urgent"],
  selectedTags: []
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.unshift(action.payload);
    },
    updateNote: (state, action) => {
      const { id, title, body, tags, updatedAt } = action.payload;
      const note = state.notes.find((item) => item.id === id);
      if (!note) return;
      note.title = title;
      note.body = body;
      note.tags = tags;
      note.updatedAt = updatedAt;
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    addTag: (state, action) => {
      const tag = action.payload.trim();
      if (!tag) return;
      const exists = state.tags.some(
        (existingTag) => existingTag.toLowerCase() === tag.toLowerCase()
      );
      if (!exists) state.tags.push(tag);
    },
    deleteTag: (state, action) => {
      const tagToDelete = action.payload;
      state.tags = state.tags.filter((tag) => tag !== tagToDelete);
      state.notes.forEach((note) => {
        note.tags = note.tags.filter((tag) => tag !== tagToDelete);
      });
      state.selectedTags = state.selectedTags.filter(
        (tag) => tag !== tagToDelete
      );
    },
    setSelectedTags: (state, action) => {
      state.selectedTags = action.payload;
    },
    clearFilters: (state) => {
      state.selectedTags = [];
    }
  }
});

export const {
  addNote,
  updateNote,
  deleteNote,
  addTag,
  deleteTag,
  setSelectedTags,
  clearFilters
} = notesSlice.actions;

export default notesSlice.reducer;
