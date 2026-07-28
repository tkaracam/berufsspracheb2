export function HeroVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.5),_transparent_45%)]" />
      <div className="absolute -right-12 top-0 h-[420px] w-[420px] rounded-full bg-sky-200/45 blur-3xl" />
      <div className="absolute -left-20 bottom-12 h-[380px] w-[380px] rounded-full bg-cyan-100/70 blur-3xl" />
      <div className="absolute left-1/3 top-24 h-[320px] w-[320px] rounded-full bg-emerald-100/55 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(236,246,255,0.75))]" />
      <svg
        className="absolute bottom-0 left-0 right-0 text-muted/20"
        viewBox="0 0 1440 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 220L0 154C79 136 161 113 248 104C336 94 430 98 524 118C619 138 714 174 812 176C909 179 1009 148 1094 124C1180 100 1249 82 1320 79C1391 77 1463 90 1520 101L1520 220H0Z"
          fill="rgba(186,230,253,0.55)"
        />
        <path
          d="M0 220L0 170C93 173 182 153 269 133C356 113 441 92 532 102C623 111 719 151 806 159C894 166 974 141 1062 121C1150 101 1245 87 1333 98C1421 110 1502 147 1520 155V220H0Z"
          fill="rgba(147,197,253,0.34)"
        />
      </svg>
    </div>
  );
}
