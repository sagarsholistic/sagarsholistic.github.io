interface StarRatingProps {
  rating: number;
  size?: number;
}

export function StarRating({ rating, size = 1.25 }: StarRatingProps) {
  return (
    <div style={{ display: 'flex', gap: '0.25rem' }}>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          style={{
            fontSize: `${size}rem`,
            color: star <= rating ? '#f39c12' : '#ddd',
            lineHeight: 1
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
