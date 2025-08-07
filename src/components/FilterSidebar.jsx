export default function FilterSidebar() {
  return (
    <aside className="w-full sm:w-1/4 p-4">
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Category</label>
        <select className="w-full p-2 border rounded-lg">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Office</option>
          <option>Fitness</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">Price Range</label>
        <input type="range" min="0" max="500" className="w-full" />
        <div className="flex justify-between text-sm mt-1">
          <span>$0</span>
          <span>$500</span>
        </div>
        <button className="mt-2 w-full bg-green-700 text-white py-1 rounded-xl">
          Apply Filters
        </button>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input type="checkbox" />
          <span>Show In-Stock Only</span>
        </label>
      </div>
    </aside>
  );
}
