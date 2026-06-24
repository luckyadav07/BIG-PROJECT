function Card({ children, className = "", hover = false, ...props }) {
  return (
    <div
      className={`glass-card p-6 ${hover ? "transition-all duration-300 hover:scale-[1.02] hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
