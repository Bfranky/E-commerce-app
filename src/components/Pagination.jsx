
export default function Pagination({ current, totalPages, onPageChange }) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className="flex items-center gap-2 justify-center mt-8">
      <button
        disabled={current === 1}
        onClick={() => onPageChange(current - 1)}
        className="px-3 py-1 border rounded"
      >
        &lt; Previous
      </button>
      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 border rounded ${p === current ? 'bg-gray-100 font-bold' : ''}`}
        >
          {p}
        </button>
      ))}
      <button
        disabled={current === totalPages}
        onClick={() => onPageChange(current + 1)}
        className="px-3 py-1 border rounded"
      >
        Next &gt;
      </button>
    </div>
  );
}

