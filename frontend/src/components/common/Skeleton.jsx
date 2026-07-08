function Skeleton({ width = "100%", height = "20px", className = "" }) {
  return (
    <div
      className={`skeleton rounded-lg ${className}`}
      style={{ width, height }}
    />
  );
}

export default Skeleton;
