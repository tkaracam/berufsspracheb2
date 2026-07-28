import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[320px] rounded-[2.7rem] border border-[#e7dcca] bg-[linear-gradient(180deg,#fffdf9_0%,#fff8f1_100%)] p-[6px] shadow-[0_36px_80px_-44px_rgba(118,94,63,0.34)]",
        className
      )}
    >
      <div className="rounded-[2.32rem] border border-[#eadfce] bg-[linear-gradient(180deg,#fffefb_0%,#fffdfa_100%)] px-5 pb-5 pt-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]">
        <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-[#1f2b3d]" />
        {children}
      </div>
    </div>
  );
}
