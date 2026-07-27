"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import {
  Search,
  RotateCcw,
  Shuffle,
  CheckCircle2,
  BookOpen,
  Table2,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  XCircle,
  AlertCircle,
  Plus,
  Trash2,
  Layers,
  Tag,
  Lightbulb,
  Quote,
  StickyNote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/components/layout/language-provider";
import { AudioPlayer } from "./audio-player";
import { addDemoProgress } from "@/lib/demo-storage";
import {
  getCustomCards,
  addCustomCard,
  deleteCustomCard,
  type CustomCard,
} from "@/lib/custom-cards";

export type VocabEntry = {
  id: string;
  type: "fachwort" | "nomen_verb";
  term: string;
  article?: string | null;
  meaning: string | null;
  antonym: string | null;
  example: string | null;
  field: string | null;
  category: string | null;
  audioPath: string | null;
};

export type VocabStatus = "red" | "yellow" | "green";

type UserEntry = {
  status: VocabStatus;
  userAntonym: string;
  userNotes: string;
};

type NotebookState = Record<string, UserEntry>;

const STORAGE_KEY = "bsk-vocab-notebook";

function getInitialState(): NotebookState {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as NotebookState;
  } catch {
    return {};
  }
}

function saveState(state: NotebookState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

type SortableColumn = "term" | "field" | "category" | "status";

interface SortHeaderProps {
  column: SortableColumn;
  label: string;
  sortKey: SortableColumn | null;
  sortDirection: "asc" | "desc";
  onSort: (column: SortableColumn) => void;
}

function SortHeader({ column, label, sortKey, sortDirection, onSort }: SortHeaderProps) {
  return (
    <TableHead className="cursor-pointer select-none" onClick={() => onSort(column)}>
      <Button
        variant="ghost"
        size="sm"
        className="h-auto px-0 py-0 font-medium hover:bg-transparent -ml-2"
      >
        {label}
        {sortKey === column &&
          (sortDirection === "asc" ? (
            <ChevronUp className="ml-1 h-3 w-3" />
          ) : (
            <ChevronDown className="ml-1 h-3 w-3" />
          ))}
      </Button>
    </TableHead>
  );
}

function StatusBadge({ status }: { status: VocabStatus }) {
  const t = useTranslation();
  const config = {
    red: {
      icon: XCircle,
      label: t.vocabularyNotebook.red,
      class: "bg-anki-again/10 text-anki-again border-anki-again/30",
    },
    yellow: {
      icon: AlertCircle,
      label: t.vocabularyNotebook.yellow,
      class: "bg-anki-hard/10 text-anki-hard border-anki-hard/30",
    },
    green: {
      icon: CheckCircle2,
      label: t.vocabularyNotebook.green,
      class: "bg-anki-good/10 text-anki-good border-anki-good/30",
    },
  };
  const { icon: Icon, label, class: className } = config[status];
  return (
    <Badge variant="outline" className={cn("gap-1 font-medium", className)}>
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
}

interface StatusSegmentedControlProps {
  status: VocabStatus;
  onChange: (status: VocabStatus) => void;
  labels: { red: string; yellow: string; green: string };
}

function StatusSegmentedControl({ status, onChange, labels }: StatusSegmentedControlProps) {
  const options: { value: VocabStatus; label: string; icon: typeof XCircle; className: string }[] = [
    {
      value: "red",
      label: labels.red,
      icon: XCircle,
      className:
        "data-[active=true]:bg-anki-again data-[active=true]:text-white data-[active=true]:border-anki-again text-anki-again hover:bg-anki-again/10",
    },
    {
      value: "yellow",
      label: labels.yellow,
      icon: AlertCircle,
      className:
        "data-[active=true]:bg-anki-hard data-[active=true]:text-white data-[active=true]:border-anki-hard text-anki-hard hover:bg-anki-hard/10",
    },
    {
      value: "green",
      label: labels.green,
      icon: CheckCircle2,
      className:
        "data-[active=true]:bg-anki-good data-[active=true]:text-white data-[active=true]:border-anki-good text-anki-good hover:bg-anki-good/10",
    },
  ];

  return (
    <div className="inline-flex rounded-md border p-0.5 bg-muted/30 gap-0.5">
      {options.map((opt) => {
        const Icon = opt.icon;
        return (
          <Button
            key={opt.value}
            type="button"
            variant="ghost"
            size="icon"
            data-active={status === opt.value}
            className={cn(
              "h-9 w-9 rounded-sm border border-transparent transition-colors",
              opt.className
            )}
            onClick={() => onChange(opt.value)}
            aria-label={opt.label}
            aria-pressed={status === opt.value}
            title={opt.label}
          >
            <Icon className="h-4 w-4" />
          </Button>
        );
      })}
    </div>
  );
}

function FieldBadge({ field }: { field: string | null }) {
  if (!field) return <span className="text-muted-foreground">—</span>;
  return (
    <Badge variant="outline" className="text-xs font-normal gap-1">
      <Layers className="h-3 w-3" />
      <span className="truncate max-w-[120px]">{field}</span>
    </Badge>
  );
}

function CategoryBadge({ category }: { category: string | null }) {
  if (!category) return <span className="text-muted-foreground">—</span>;
  const isCustom = category === "Eigene Karte";
  return (
    <Badge
      variant="secondary"
      className={cn(
        "text-xs font-normal gap-1",
        isCustom && "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300"
      )}
    >
      <Tag className="h-3 w-3" />
      <span className="truncate max-w-[120px]">{category}</span>
    </Badge>
  );
}

interface CustomCardsTabProps {
  fields: { id: string; title: string }[];
  customCards: CustomCard[];
  onChange: () => void;
}

function CustomCardsTab({ fields, customCards, onChange }: CustomCardsTabProps) {
  const t = useTranslation();
  const [term, setTerm] = useState("");
  const [meaning, setMeaning] = useState("");
  const [antonym, setAntonym] = useState("");
  const [example, setExample] = useState("");
  const [notes, setNotes] = useState("");
  const [field, setField] = useState("");
  const [category, setCategory] = useState("Eigene Karte");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim()) return;
    addCustomCard({
      term: term.trim(),
      meaning: meaning.trim(),
      antonym: antonym.trim(),
      example: example.trim(),
      notes: notes.trim(),
      field,
      category: category.trim() || "Eigene Karte",
    });
    setTerm("");
    setMeaning("");
    setAntonym("");
    setExample("");
    setNotes("");
    setField("");
    setCategory("Eigene Karte");
    onChange();
  };

  const handleDelete = (id: string) => {
    deleteCustomCard(id);
    onChange();
  };

  const preview: VocabEntry = {
    id: "preview",
    type: "fachwort",
    term: term.trim() || t.vocabularyNotebook.term,
    meaning: meaning.trim() || null,
    antonym: antonym.trim() || null,
    example: example.trim() || null,
    field: field || null,
    category: category.trim() || "Eigene Karte",
    audioPath: null,
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Eigene Karte hinzufügen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Vorschau</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl font-bold">{preview.term}</span>
                <FieldBadge field={preview.field} />
                <CategoryBadge category={preview.category} />
              </div>
              {preview.meaning && (
                <p className="text-sm text-muted-foreground">{preview.meaning}</p>
              )}
              {preview.antonym && (
                <p className="text-sm">
                  <span className="font-medium">{t.vocabularyNotebook.antonym}:</span>{" "}
                  {preview.antonym}
                </p>
              )}
              {preview.example && (
                <p className="text-sm italic text-muted-foreground">„{preview.example}“</p>
              )}
              {notes.trim() && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">{t.vocabularyNotebook.notes}:</span>{" "}
                  {notes}
                </p>
              )}
            </div>
          </div>

          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium flex items-center gap-1">
                  {t.vocabularyNotebook.term} <span className="text-destructive">*</span>
                </label>
                <Input
                  placeholder={t.vocabularyNotebook.term}
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium flex items-center gap-1">
                  {t.vocabularyNotebook.meaning} <span className="text-destructive">*</span>
                </label>
                <Input
                  placeholder={t.vocabularyNotebook.meaning}
                  value={meaning}
                  onChange={(e) => setMeaning(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t.vocabularyNotebook.antonym}</label>
                <Input
                  placeholder={t.vocabularyNotebook.antonym}
                  value={antonym}
                  onChange={(e) => setAntonym(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t.vocabularyNotebook.example}</label>
                <Input
                  placeholder={t.vocabularyNotebook.example}
                  value={example}
                  onChange={(e) => setExample(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t.vocabularyNotebook.field}</label>
                <Select value={field} onValueChange={(v) => setField(v ?? "")}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.vocabularyNotebook.filterByField} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">{t.vocabularyNotebook.allFields}</SelectItem>
                    {fields.map((f) => (
                      <SelectItem key={f.id} value={f.title}>
                        {f.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t.vocabularyNotebook.notes}</label>
                <Input
                  placeholder={t.vocabularyNotebook.notes}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" /> Hinzufügen
            </Button>
          </form>
        </CardContent>
      </Card>

      {customCards.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Noch keine eigenen Karten vorhanden.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {customCards.map((card) => (
            <Card key={card.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg leading-tight">{card.term}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => handleDelete(card.id)}
                    aria-label="Löschen"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <FieldBadge field={card.field} />
                  <CategoryBadge category={card.category} />
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm pt-0">
                {card.meaning && (
                  <p>
                    <span className="font-medium">{t.vocabularyNotebook.meaning}:</span>{" "}
                    {card.meaning}
                  </p>
                )}
                {card.antonym && (
                  <p>
                    <span className="font-medium">{t.vocabularyNotebook.antonym}:</span>{" "}
                    {card.antonym}
                  </p>
                )}
                {card.example && (
                  <p className="italic text-muted-foreground">„{card.example}“</p>
                )}
                {card.notes && (
                  <p className="text-muted-foreground">
                    <span className="font-medium">{t.vocabularyNotebook.notes}:</span>{" "}
                    {card.notes}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

interface Props {
  entries: VocabEntry[];
  fields: { id: string; title: string }[];
}

export function VocabularyNotebook({ entries, fields }: Props) {
  const t = useTranslation();
  const [state, setState] = useState<NotebookState>(() => getInitialState());
  const [search, setSearch] = useState("");
  const [fieldFilter, setFieldFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [mode, setMode] = useState<string>("table");
  const [sortKey, setSortKey] = useState<SortableColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 25;
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [input, setInput] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  const [customCards, setCustomCards] = useState<CustomCard[]>(() => getCustomCards());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const allEntries = useMemo<VocabEntry[]>(() => {
    return [
      ...entries,
      ...customCards.map((c) => ({
        id: c.id,
        type: "fachwort" as const,
        term: c.term,
        article: null,
        meaning: c.meaning || null,
        antonym: c.antonym || null,
        example: c.example || null,
        field: c.field || null,
        category: c.category || "Eigene Karte",
        audioPath: null,
      })),
    ];
  }, [entries, customCards]);

  const categories = useMemo(
    () => Array.from(new Set(allEntries.map((e) => e.category).filter(Boolean))).sort(),
    [allEntries]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allEntries.filter((e) => {
      const matchesSearch =
        !q ||
        e.term.toLowerCase().includes(q) ||
        (e.meaning?.toLowerCase().includes(q) ?? false) ||
        (e.example?.toLowerCase().includes(q) ?? false);
      const matchesField = fieldFilter === "all" || e.field === fieldFilter;
      const matchesCategory = categoryFilter === "all" || e.category === categoryFilter;
      return matchesSearch && matchesField && matchesCategory;
    });
  }, [allEntries, search, fieldFilter, categoryFilter]);

  const sortedEntries = useMemo(() => {
    if (!sortKey) return filtered;
    const dir = sortDirection === "asc" ? 1 : -1;
    const statusOrder = { red: 0, yellow: 1, green: 2 };
    return [...filtered].sort((a, b) => {
      switch (sortKey) {
        case "status": {
          const sa = state[a.id]?.status ?? "red";
          const sb = state[b.id]?.status ?? "red";
          return (statusOrder[sa] - statusOrder[sb]) * dir;
        }
        case "term":
          return a.term.localeCompare(b.term) * dir;
        case "field":
          return (a.field ?? "").localeCompare(b.field ?? "") * dir;
        case "category":
          return (a.category ?? "").localeCompare(b.category ?? "") * dir;
        default:
          return 0;
      }
    });
  }, [filtered, sortKey, sortDirection, state]);

  const totalPages = Math.max(1, Math.ceil(sortedEntries.length / PAGE_SIZE));
  const paginatedEntries = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedEntries.slice(start, start + PAGE_SIZE);
  }, [sortedEntries, page]);

  const toggleSort = (key: SortableColumn) => {
    if (sortKey === key) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
    setPage(1);
  };

  const practiceList = useMemo(() => {
    const sorted = [...filtered].sort((a, b) => {
      const sa = state[a.id]?.status ?? "red";
      const sb = state[b.id]?.status ?? "red";
      const order = { red: 0, yellow: 1, green: 2 };
      return order[sa] - order[sb];
    });
    return sorted;
  }, [filtered, state]);

  const safePracticeIndex = Math.min(practiceIndex, Math.max(practiceList.length - 1, 0));
  const currentPractice = practiceList[safePracticeIndex];

  const updateEntry = useCallback((id: string, patch: Partial<UserEntry>) => {
    setState((prev) => ({
      ...prev,
      [id]: {
        status: prev[id]?.status ?? "red",
        userAntonym: prev[id]?.userAntonym ?? "",
        userNotes: prev[id]?.userNotes ?? "",
        ...patch,
      },
    }));
  }, []);

  const statusCounts = useMemo(() => {
    const counts = { red: 0, yellow: 0, green: 0 };
    filtered.forEach((e) => {
      const s = state[e.id]?.status ?? "red";
      counts[s] += 1;
    });
    return counts;
  }, [filtered, state]);

  const resetFilters = () => {
    setSearch("");
    setFieldFilter("all");
    setCategoryFilter("all");
    setPage(1);
    setSortKey(null);
  };

  const handleCheck = useCallback(() => {
    if (!currentPractice) return;
    const answer = input.trim().toLowerCase();
    const correct = currentPractice.antonym?.toLowerCase().split(",").map((s) => s.trim()) ?? [];
    const isCorrect =
      correct.length > 0
        ? correct.some((c) => answer === c || c.includes(answer) || answer.includes(c))
        : answer.length > 1;
    setFeedback(isCorrect ? "correct" : "wrong");
    setShowAnswer(true);
    if (isCorrect) {
      updateEntry(currentPractice.id, { status: "green" });
      addDemoProgress({
        itemType: currentPractice.type,
        itemId: currentPractice.id,
        score: 100,
        practicedAt: new Date().toISOString(),
      });
    } else {
      updateEntry(currentPractice.id, { status: "yellow" });
      addDemoProgress({
        itemType: currentPractice.type,
        itemId: currentPractice.id,
        score: 50,
        practicedAt: new Date().toISOString(),
      });
    }
  }, [currentPractice, input, updateEntry]);

  const nextPractice = useCallback(() => {
    setPracticeIndex((i) => (i + 1 >= practiceList.length ? 0 : i + 1));
    setInput("");
    setShowAnswer(false);
    setFeedback("idle");
  }, [practiceList.length]);

  const prevPractice = useCallback(() => {
    setPracticeIndex((i) => (i - 1 < 0 ? practiceList.length - 1 : i - 1));
    setInput("");
    setShowAnswer(false);
    setFeedback("idle");
  }, [practiceList.length]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (mode !== "practice" || !currentPractice) return;
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          handleCheck();
          break;
        case "1":
          e.preventDefault();
          updateEntry(currentPractice.id, { status: "green" });
          break;
        case "2":
          e.preventDefault();
          updateEntry(currentPractice.id, { status: "yellow" });
          break;
        case "3":
          e.preventDefault();
          updateEntry(currentPractice.id, { status: "red" });
          break;
        case "ArrowRight":
          e.preventDefault();
          nextPractice();
          break;
        case "ArrowLeft":
          e.preventDefault();
          prevPractice();
          break;
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, currentPractice, handleCheck, nextPractice, prevPractice, updateEntry]);

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          {t.vocabularyNotebook.noEntries}
        </CardContent>
      </Card>
    );
  }

  const statusBorderColor = {
    red: "border-l-anki-again",
    yellow: "border-l-anki-hard",
    green: "border-l-anki-good",
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t.vocabularyNotebook.search}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPracticeIndex(0);
              setPage(1);
            }}
            className="pl-9"
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select
            value={fieldFilter}
            onValueChange={(v) => {
              setFieldFilter(v ?? "all");
              setPracticeIndex(0);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder={t.vocabularyNotebook.filterByField} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.vocabularyNotebook.allFields}</SelectItem>
              {fields.map((f) => (
                <SelectItem key={f.id} value={f.title}>
                  {f.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={categoryFilter}
            onValueChange={(v) => {
              setCategoryFilter(v ?? "all");
              setPracticeIndex(0);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder={t.vocabularyNotebook.allCategories} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.vocabularyNotebook.allCategories}</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c as string}>
                  {c as string}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={resetFilters} type="button" size="sm">
            <RotateCcw className="mr-2 h-4 w-4" />
            {t.common.cancel}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-anki-again/10 dark:bg-anki-again/10 border-l-4 border-l-anki-again">
          <CardContent className="py-3 text-center">
            <p className="text-xl font-bold text-anki-again">{statusCounts.red}</p>
            <p className="text-xs text-muted-foreground">{t.vocabularyNotebook.red}</p>
          </CardContent>
        </Card>
        <Card className="bg-anki-hard/10 dark:bg-anki-hard/10 border-l-4 border-l-anki-hard">
          <CardContent className="py-3 text-center">
            <p className="text-xl font-bold text-anki-hard">{statusCounts.yellow}</p>
            <p className="text-xs text-muted-foreground">{t.vocabularyNotebook.yellow}</p>
          </CardContent>
        </Card>
        <Card className="bg-anki-good/10 dark:bg-anki-good/10 border-l-4 border-l-anki-good">
          <CardContent className="py-3 text-center">
            <p className="text-xl font-bold text-anki-good">{statusCounts.green}</p>
            <p className="text-xs text-muted-foreground">{t.vocabularyNotebook.green}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={mode} onValueChange={setMode}>
        <TabsList className="grid w-full grid-cols-3 sm:w-fit">
          <TabsTrigger value="table" className="gap-2">
            <Table2 className="h-4 w-4" />
            {t.vocabularyNotebook.tableMode}
          </TabsTrigger>
          <TabsTrigger value="practice" className="gap-2">
            <BookOpen className="h-4 w-4" />
            {t.vocabularyNotebook.practiceMode}
          </TabsTrigger>
          <TabsTrigger value="custom" className="gap-2">
            <Plus className="h-4 w-4" />
            Meine Karten
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-4">
          {sortedEntries.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                {t.vocabularyNotebook.noEntries}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
                <span>
                  {sortedEntries.length} {sortedEntries.length === 1 ? "Eintrag" : "Einträge"}
                  {totalPages > 1 && ` · Seite ${page} von ${totalPages}`}
                </span>
              </div>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader className="bg-muted/80 sticky top-0 z-10">
                    <TableRow>
                      <SortHeader
                        column="term"
                        label={t.vocabularyNotebook.term}
                        sortKey={sortKey}
                        sortDirection={sortDirection}
                        onSort={toggleSort}
                      />
                      <TableHead className="w-[140px]">{t.vocabularyNotebook.meaning}</TableHead>
                      <TableHead className="w-[120px]">{t.vocabularyNotebook.category}</TableHead>
                      <TableHead>{t.vocabularyNotebook.antonym}</TableHead>
                      <TableHead className="w-[160px]">{t.vocabularyNotebook.notes}</TableHead>
                      <SortHeader
                        column="status"
                        label={t.vocabularyNotebook.status}
                        sortKey={sortKey}
                        sortDirection={sortDirection}
                        onSort={toggleSort}
                      />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedEntries.map((entry) => {
                      const user = state[entry.id];
                      const status = user?.status ?? "red";
                      return (
                        <TableRow
                          key={entry.id}
                          className={cn(
                            "border-l-4",
                            statusBorderColor[status]
                          )}
                        >
                          <TableCell>
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{entry.term}</span>
                                {entry.audioPath && (
                                  <AudioPlayer path={entry.audioPath} text={entry.term} />
                                )}
                              </div>
                              {entry.field && (
                                <p className="text-xs text-muted-foreground">{entry.field}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            <span className="line-clamp-2">{entry.meaning ?? "—"}</span>
                          </TableCell>
                          <TableCell>
                            <CategoryBadge category={entry.category} />
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 min-w-[140px]">
                              {entry.antonym && (
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                  {entry.antonym}
                                </p>
                              )}
                              <Input
                                placeholder={entry.antonym ?? t.vocabularyNotebook.enterAntonym}
                                value={user?.userAntonym ?? ""}
                                onChange={(e) =>
                                  updateEntry(entry.id, { userAntonym: e.target.value })
                                }
                                className="h-8 text-xs"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Input
                              placeholder={t.vocabularyNotebook.enterNotes}
                              value={user?.userNotes ?? ""}
                              onChange={(e) =>
                                updateEntry(entry.id, { userNotes: e.target.value })
                              }
                              className="h-8 text-xs"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <StatusBadge status={status} />
                              <StatusSegmentedControl
                                status={status}
                                onChange={(s) => updateEntry(entry.id, { status: s })}
                                labels={{
                                  red: t.vocabularyNotebook.markNew,
                                  yellow: t.vocabularyNotebook.markPractice,
                                  green: t.vocabularyNotebook.markKnown,
                                }}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" /> Zurück
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Seite {page} von {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Weiter <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="practice" className="space-y-4">
          {practiceList.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                {t.vocabularyNotebook.noEntries}
              </CardContent>
            </Card>
          ) : (
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    {safePracticeIndex + 1} / {practiceList.length}
                  </span>
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    {currentPractice.field && <FieldBadge field={currentPractice.field} />}
                    {currentPractice.category && <CategoryBadge category={currentPractice.category} />}
                    <StatusBadge status={state[currentPractice.id]?.status ?? "red"} />
                  </div>
                </div>
                <Progress
                  value={((safePracticeIndex + 1) / practiceList.length) * 100}
                  className="h-2"
                />
                <div className="flex items-center justify-center gap-3 mt-8">
                  <CardTitle className="text-4xl text-center font-bold">
                    {currentPractice.term}
                  </CardTitle>
                  {currentPractice.audioPath && (
                    <AudioPlayer path={currentPractice.audioPath} text={currentPractice.term} />
                  )}
                </div>
                <p className="text-center text-muted-foreground mt-2">
                  {currentPractice.meaning ?? "—"}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    {t.vocabularyNotebook.antonymPrompt}
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={t.vocabularyNotebook.enterAntonym}
                      onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                      disabled={showAnswer}
                      className={cn(
                        "flex-1 transition-colors",
                        feedback === "correct" && "border-anki-good focus-visible:ring-anki-good",
                        feedback === "wrong" && "border-anki-again focus-visible:ring-anki-again"
                      )}
                    />
                    <Button
                      onClick={handleCheck}
                      disabled={showAnswer || !input.trim()}
                      type="button"
                      className="bg-anki-good text-white hover:bg-anki-good/90"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      {t.vocabularyNotebook.check}
                    </Button>
                  </div>
                </div>

                {showAnswer && (
                  <div
                    className={cn(
                      "rounded-lg p-5 space-y-3 border",
                      feedback === "correct"
                        ? "bg-anki-good/10 border-anki-good/30 animate-in zoom-in-95 duration-200"
                        : "bg-anki-again/10 border-anki-again/30 animate-in zoom-in-95 duration-200"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {feedback === "correct" ? (
                        <>
                          <CheckCircle2 className="h-6 w-6 text-anki-good" />
                          <span className="font-semibold text-anki-good text-lg">
                            {t.vocabularyNotebook.correct}
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-6 w-6 text-anki-again" />
                          <span className="font-semibold text-anki-again text-lg">
                            {t.vocabularyNotebook.wrong}
                          </span>
                        </>
                      )}
                    </div>
                    <p className="flex items-start gap-2">
                      <span className="font-medium shrink-0">{t.vocabularyNotebook.antonym}:</span>
                      <span>{currentPractice.antonym ?? "—"}</span>
                    </p>
                    {currentPractice.example && (
                      <p className="italic text-muted-foreground flex items-start gap-2">
                        <Quote className="h-4 w-4 shrink-0 mt-0.5" />
                        {currentPractice.example}
                      </p>
                    )}
                    {state[currentPractice.id]?.userNotes && (
                      <p className="text-muted-foreground flex items-start gap-2">
                        <StickyNote className="h-4 w-4 shrink-0 mt-0.5" />
                        {state[currentPractice.id]?.userNotes}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap justify-center gap-2">
                  <Button variant="outline" onClick={prevPractice} type="button" size="sm">
                    <ChevronLeft className="mr-2 h-4 w-4" /> {t.common.back}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPracticeIndex(Math.floor(Math.random() * practiceList.length));
                      setInput("");
                      setShowAnswer(false);
                      setFeedback("idle");
                    }}
                    type="button"
                    size="sm"
                  >
                    <Shuffle className="mr-2 h-4 w-4" /> {t.common.next}
                  </Button>
                  <Button variant="outline" onClick={nextPractice} type="button" size="sm">
                    {t.common.next} <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => updateEntry(currentPractice.id, { status: "green" })}
                    type="button"
                    aria-keyshortcuts="1"
                    className="bg-anki-good text-white hover:bg-anki-good/90"
                  >
                    <CheckCircle2 className="mr-1.5 h-4 w-4" />
                    <span>{t.vocabularyNotebook.markKnown}</span>
                    <span className="ml-1.5 text-xs tracking-widest opacity-80">1</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => updateEntry(currentPractice.id, { status: "yellow" })}
                    type="button"
                    aria-keyshortcuts="2"
                    className="bg-anki-hard text-white hover:bg-anki-hard/90"
                  >
                    <AlertCircle className="mr-1.5 h-4 w-4" />
                    <span>{t.vocabularyNotebook.markPractice}</span>
                    <span className="ml-1.5 text-xs tracking-widest opacity-80">2</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => updateEntry(currentPractice.id, { status: "red" })}
                    type="button"
                    aria-keyshortcuts="3"
                    className="bg-anki-again text-white hover:bg-anki-again/90"
                  >
                    <XCircle className="mr-1.5 h-4 w-4" />
                    <span>{t.vocabularyNotebook.markNew}</span>
                    <span className="ml-1.5 text-xs tracking-widest opacity-80">3</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="custom">
          <CustomCardsTab
            fields={fields}
            customCards={customCards}
            onChange={() => setCustomCards(getCustomCards())}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
