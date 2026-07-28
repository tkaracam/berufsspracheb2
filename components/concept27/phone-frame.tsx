import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[320px] rounded-[2.25rem] border border-[#e9dcc8] bg-[linear-gradient(180deg,#fffdf9_0%,#fff8f2_100%)] p-2.5 shadow-[0_24px_60px_-36px_rgba(138,116,83,0.38)]",
        className
      )}
    >
      <div className="rounded-[1.9rem] border border-[#eadfce] bg-white px-4 pb-4 pt-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
        <div className="mb-5 flex items-center justify-between text-[0.72rem] font-medium text-slate-900">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="block h-1.5 w-1.5 rounded-full bg-slate-900" />
            <span className="block h-2 w-3 rounded-sm border border-slate-900" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
