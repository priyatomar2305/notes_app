import { FiCheck } from "react-icons/fi";

function TagList({ tags, selectedTags, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button key={tag} type="button" onClick={() => onToggle(tag)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
              isSelected
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900"
            }`}>
            {isSelected && <FiCheck size={14} />}{tag}
          </button>
        );
      })}
    </div>
  );
}

export default TagList;
