import { FiFilter, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, setSelectedTags } from "../redux/slices/notesSlice";

function TagFilter() {
  const dispatch = useDispatch();
  const { tags, selectedTags } = useSelector((state) => state.notes);

  const toggleTag = (tag) => {
    dispatch(setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter((item) => item !== tag)
        : [...selectedTags, tag]
    ));
  };

  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FiFilter className="text-slate-500" />
          <h2 className="font-semibold text-slate-900">Tags & Filters</h2>
        </div>
        {selectedTags.length > 0 && (
          <button type="button" onClick={() => dispatch(clearFilters())}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900">
            <FiX size={15} />Clear Filters
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => dispatch(clearFilters())}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
            selectedTags.length === 0
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
          }`}>All</button>
        {tags.map((tag) => (
          <button key={tag} type="button" onClick={() => toggleTag(tag)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              selectedTags.includes(tag)
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
            }`}>{tag}</button>
        ))}
      </div>
      {selectedTags.length > 0 && (
        <p className="mt-4 text-xs text-slate-500">Showing notes containing all selected tags.</p>
      )}
    </section>
  );
}

export default TagFilter;
