export function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#f0fdfa_0%,transparent_50%),radial-gradient(ellipse_at_bottom_left,#fffbeb_0%,transparent_50%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]" />
      
      {/* Soft accent blobs */}
      <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -left-32 top-1/3 h-[500px] w-[500px] rounded-full bg-accent/30 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/4 blur-3xl" />
      
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
    </div>
  );
}
