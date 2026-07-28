"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFocusMode } from "@/components/layout/focus-mode-provider";

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);
  const { focusMode } = useFocusMode();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (focusMode || pathname === "/") return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-4 pb-4 transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="mx-auto max-w-md rounded-[1.6rem] border border-[#eadfce] bg-[#fffdf9]/94 p-3 shadow-[0_22px_44px_-24px_rgba(138,116,83,0.35)] backdrop-blur-xl">
        <Button size="lg" className="h-12 w-full rounded-[1rem] bg-[#73beb2] text-white hover:bg-[#64aea3]" asChild>
          <Link href="/register">
            Kostenlos starten <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
