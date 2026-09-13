import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./slices/notesSlice";
import { saveNotesState } from "../utils/localStorage";

export const store = configureStore({
  reducer: { notes: notesReducer }
});

store.subscribe(() => {
  saveNotesState(store.getState().notes);
});
