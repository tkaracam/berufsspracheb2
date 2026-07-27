export function HeroVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -right-20 -top-20 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/15" />
      <div className="absolute -left-20 -bottom-20 h-[500px] w-[500px] rounded-full bg-amber-400/15 blur-3xl dark:bg-amber-400/10" />
      <div className="absolute left-1/3 top-1/4 h-[400px] w-[400px] rounded-full bg-rose-500/10 blur-3xl dark:bg-rose-500/15" />
      <div className="absolute right-1/4 top-1/2 h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/10" />
      <svg
        className="absolute bottom-0 left-0 right-0 text-muted/20"
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
