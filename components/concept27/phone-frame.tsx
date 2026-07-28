import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[320px] rounded-[2.6rem] border border-[#e7d9c7] bg-[linear-gradient(180deg,#fffdf9_0%,#fff8f1_100%)] p-[6px] shadow-[0_28px_64px_-36px_rgba(138,116,83,0.36)]",
        className
      )}
    >
      <div className="rounded-[2.3rem] border border-[#eadfce] bg-white px-5 pb-5 pt-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
        <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-[#243042]" />
        {children}
      </div>
    </div>
  );
}
