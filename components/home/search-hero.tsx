import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchHero() {
  return (
    <form
      action="/suche"
      method="get"
      className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 mt-8 flex w-full max-w-md flex-col gap-2 sm:flex-row"
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          name="q"
          placeholder="Beruf, Fachwort oder Thema suchen…"
          className="h-11 pl-9"
        />
      </div>
      <Button type="submit" className="h-11 px-6">
        Suchen
      </Button>
    </form>
  );
}
