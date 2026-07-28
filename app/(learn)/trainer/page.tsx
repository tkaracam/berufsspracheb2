import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, Mic, Settings2 } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { PhoneFrame } from "@/components/concept27/phone-frame";
import { MobileTabs } from "@/components/concept27/mobile-tabs";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: `Trainer – ${APP_NAME}`,
};

const trainerActions = [
  {
    title: "Persönliche Unterstützung",
    text: "Individuelles Feedback für deine Fortschritte.",
    icon: MessageCircle,
    href: "/trainer/fachwortschatz",
  },
  {
    title: "Lernplan anpassen",
    text: "Wir passen deinen Plan an deine Ziele an.",
    icon: Settings2,
    href: "/dashboard",
  },
  {
    title: "Motivation & Tipps",
    text: "Wir sind für dich da – bei jedem Schritt.",
    icon: Heart,
    href: "/trainer/grammatik",
  },
];

export default function TrainerPage() {
  return (
    <div className="space-y-10">
      <PhoneFrame className="max-w-[330px]">
        <div>
          <p className="text-[2rem] leading-none text-slate-900 [font-family:Georgia,serif]">
            Dein Trainer
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Wir begleiten dich auf deinem Lernweg.
          </p>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-[#f0e5d8] bg-white p-4 shadow-sm">
          <div className="flex gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-[#f6eee3]">
              <Image
                src="/concept27/trainer-lea.png"
                alt="Trainerin Lea Schneider"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-400">Deine Trainerin</p>
              <p className="text-[1.25rem] text-slate-900 [font-family:Georgia,serif]">
                Lea Schneider
              </p>
              <p className="text-xs text-slate-500">DaF-Expertin · B2-Spezialistin</p>
              <p className="mt-2 text-xs text-[#f19a4f]">★ 4,9 · 128 Bewertungen</p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {trainerActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="flex items-center gap-4 rounded-[1.35rem] border border-[#f0e5d8] bg-white px-4 py-3 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5ef] text-[#73beb2]">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900">{action.title}</p>
                  <p className="text-xs leading-5 text-slate-500">{action.text}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <Button
          asChild
          className="mt-5 h-12 w-full rounded-[1rem] bg-[#73beb2] text-base hover:bg-[#64aea3]"
        >
          <Link href="/trainer/sprechen">
            Nachricht schreiben
            <Mic className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        <MobileTabs active="trainer" />
      </PhoneFrame>
    </div>
  );
}
