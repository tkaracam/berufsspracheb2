import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchHero() {
  return (
    <form
      action="/suche"
      method="get"
      className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
    >
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          type="search"
          name="q"
          placeholder="Beruf, Fachwort oder Thema suchen…"
          className="h-12 rounded-2xl border-sky-100 bg-white/85 pl-11 text-slate-700 shadow-[0_16px_35px_-24px_rgba(15,23,42,0.3)] placeholder:text-slate-400"
        />
      </div>
      <Button
        type="submit"
        className="h-12 rounded-2xl bg-sky-500 px-6 shadow-[0_18px_35px_-22px_rgba(59,130,246,0.8)] hover:bg-sky-600"
      >
        Suchen
      </Button>
    </form>
  );
}
