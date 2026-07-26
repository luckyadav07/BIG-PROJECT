function Skeleton({ width = "100%", height = "20px", className = "" }) {
  return (
    <div
      className={`skeleton rounded-xl ${className}`}
      style={{ width, height }}
      aria-hidden
    />
  );
}

export default Skeleton;
