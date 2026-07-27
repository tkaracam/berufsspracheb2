interface Props {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, centered = true }: Props) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2 className="relative inline-block text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
        <span className="absolute -bottom-2 left-0 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-amber-500" />
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
