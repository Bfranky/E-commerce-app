

export default function FilterSidebar({
  filters,
  setFilters,
  categories = [],
  onApply,
  onClear
}) {
  const update = (partial) => setFilters(prev => ({ ...prev, ...partial }));

  return (
    <div className="border rounded p-4 bg-white space-y-6 w-full max-w-xs">
      <div>
        <h4 className="font-semibold mb-1">Category</h4>
        <select
          value={filters.category}
          onChange={e => update({ category: e.target.value })}
          className="w-full border px-2 py-1 rounded"
        >
          <option>All</option>
          {categories.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <h4 className="font-semibold mb-1">Price Range</h4>
        <div className="flex items-center gap-2 text-sm mb-1">
          <div>${filters.minPrice || 0}</div>
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="500"
              step="1"
              value={filters.maxPrice}
              onChange={e => update({ maxPrice: Number(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>${filters.maxPrice || 500}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="inStock"
          checked={filters.inStock}
          onChange={e => update({ inStock: e.target.checked })}
        />
        <label htmlFor="inStock">Only In Stock</label>
      </div>

      <div className="flex gap-2">
        <button onClick={onClear} className="flex-1 border px-3 py-2 rounded">
          Clear Filters
        </button>
        <button onClick={onApply} className="flex-1 bg-green-800 text-white px-3 py-2 rounded">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
