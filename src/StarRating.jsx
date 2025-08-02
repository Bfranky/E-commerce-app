

export default function StarRating({ rating, reviewCount }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const stars = [];

  for (let i = 0; i < full; i++) stars.push('★');
  if (half) stars.push('☆');
  while (stars.length < 5) stars.push('☆');

  return (
    <div className="flex items-center gap-1 text-sm">
      <div className="text-yellow-500">
        {stars.map((s, i) => (
          <span key={i}>{s}</span>
        ))}
      </div>
      <div className="text-gray-500">
        {rating.toFixed(1)} ({reviewCount})
      </div>
    </div>
  );
}
