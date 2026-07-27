export function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.35]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_50%_0%,var(--primary)/8%,transparent)]" />
    </div>
  );
}
