const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <div className="w-full max-w-[500px] mx-auto">
      <input
        type="text"
        placeholder={`🔍 ${placeholder}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-5 py-3.5 rounded-full border-2 border-white/20 bg-white text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/25 shadow-md"
      />
    </div>
  );
};

export default SearchBar;