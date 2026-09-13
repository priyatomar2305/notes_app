const STORAGE_KEY = "notes-app-data";

export const loadNotesState = () => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) return null;

    const parsedData = JSON.parse(storedData);

    if (
      !parsedData ||
      !Array.isArray(parsedData.notes) ||
      !Array.isArray(parsedData.tags)
    ) return null;

    return parsedData;
  } catch (error) {
    console.error("Failed to load notes from localStorage:", error);
    return null;
  }
};

export const saveNotesState = (state) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ notes: state.notes, tags: state.tags })
    );
  } catch (error) {
    console.error("Failed to save notes to localStorage:", error);
  }
};
