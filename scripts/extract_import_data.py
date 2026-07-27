from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Iterable

from pypdf import PdfReader


NOUN_ARTICLES = ("der", "die", "das", "den/die", "der/die", "das/die")
SKIP_PREFIXES = (
    "einfach besser!",
    "© telc",
    "bsp.",
    "artikel deutsch",
    "wortschatz zu lektion",
    "deutsch  aber hallo!",
    "deutsch - aber hallo!",
    "nomen-verb-verbindungen",
    "alphabetische wortliste",
)


def clean_line(value: str) -> str:
    value = value.replace("\x00", " ")
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def iter_pdf_lines(pdf_path: Path, start_page: int = 0) -> Iterable[str]:
    reader = PdfReader(str(pdf_path))
    for page in reader.pages[start_page:]:
        text = page.extract_text() or ""
        for raw_line in text.splitlines():
            line = clean_line(raw_line)
            if line:
                yield line


def parse_nomen_verb(pdf_path: Path) -> list[dict[str, object]]:
    rows: list[dict[str, object]] = []
    current_letter = ""

    for line in iter_pdf_lines(pdf_path, start_page=3):
        if re.fullmatch(r"[A-ZÄÖÜ]", line):
            current_letter = line
            continue
        if not line.startswith("- "):
            continue

        phrase = line[2:].strip()
        phrase = re.sub(r"\s+\(auch fig\.\)", "", phrase)
        if len(phrase) < 4:
            continue

        rows.append(
            {
                "phrase": phrase,
                "synonym": None,
                "beispielsatz": None,
                "kategorie": current_letter or None,
                "b2_relevanz": 2,
                "audio_path": None,
                "source": pdf_path.name,
            }
        )

    seen: set[str] = set()
    unique_rows: list[dict[str, object]] = []
    for row in rows:
        key = str(row["phrase"]).lower()
        if key in seen:
            continue
        seen.add(key)
        unique_rows.append(row)
    return unique_rows


def detect_lesson(line: str) -> tuple[str | None, str | None]:
    match = re.match(r"Wortschatz zu Lektion (\d+):\s*(.+)", line, re.IGNORECASE)
    if not match:
        return None, None
    return match.group(1), match.group(2).strip()


def looks_like_section_header(line: str) -> bool:
    if line.endswith(":"):
        return True
    if line.startswith("Wortschatz zu Lektion"):
        return True
    if any(ch.isdigit() for ch in line):
        return False
    if line.startswith(NOUN_ARTICLES):
        return False
    if line[0].islower():
        return False
    return len(line.split()) <= 5


def split_entry(line: str) -> tuple[str, str | None, str | None] | None:
    parts = line.split(" ", 1)
    if len(parts) < 2:
        return None
    article, rest = parts
    article = article.strip()
    if article not in NOUN_ARTICLES:
        return None

    term = rest.strip()
    synonym = None
    example = None

    if " Bsp.:" in term:
        term, example = term.split(" Bsp.:", 1)
        example = example.strip() or None
    if " Def.:" in term:
        term, definition = term.split(" Def.:", 1)
        synonym = definition.strip() or None
    if " Sg.:" in term:
        term = term.split(" Sg.:", 1)[0].strip()
    if " Pl.:" in term:
        term = term.split(" Pl.:", 1)[0].strip()
    if " ≠ " in term:
        term = term.split(" ≠ ", 1)[0].strip()
    if " = " in term:
        term, synonym = term.split(" = ", 1)
        term = term.strip()
        synonym = synonym.strip() or synonym

    term = re.sub(r"\s+\(.*?\)$", "", term).strip()
    term = re.sub(r"/-in$", "", term).strip()

    if not term:
        return None
    return term, synonym, example


def parse_einfach_besser_fachwoerter(
    pdf_path: Path, berufsfeld_id: str
) -> list[dict[str, object]]:
    rows: list[dict[str, object]] = []
    lesson = None
    lesson_title = None
    section = None

    for line in iter_pdf_lines(pdf_path):
        lowered = line.lower()
        if lowered in {"1", "2", "3", "4"}:
            continue
        if lowered.startswith(SKIP_PREFIXES):
            lesson, lesson_title = detect_lesson(line)
            continue

        new_lesson, new_title = detect_lesson(line)
        if new_lesson:
            lesson, lesson_title = new_lesson, new_title
            section = None
            continue

        if looks_like_section_header(line):
            section = line
            continue

        parsed = split_entry(line)
        if not parsed:
            continue

        begriff, synonym, beispielsatz = parsed
        rows.append(
            {
                "berufsfeld_id": berufsfeld_id,
                "begriff": begriff,
                "artikel": line.split(" ", 1)[0],
                "synonym": synonym,
                "beispielsatz": beispielsatz,
                "lesson": lesson,
                "lesson_title": lesson_title,
                "source_section": section,
                "source": pdf_path.name,
            }
        )

    seen: set[tuple[str, str]] = set()
    unique_rows: list[dict[str, object]] = []
    for row in rows:
        key = (str(row["artikel"]).lower(), str(row["begriff"]).lower())
        if key in seen:
            continue
        seen.add(key)
        unique_rows.append(row)
    return unique_rows


def write_json(out_path: Path, rows: list[dict[str, object]]) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description="Extract import-ready JSON from PDF sources.")
    sub = parser.add_subparsers(dest="command", required=True)

    nv = sub.add_parser("nomen-verb")
    nv.add_argument("pdf", type=Path)
    nv.add_argument("out", type=Path)

    fw = sub.add_parser("fachwoerter")
    fw.add_argument("pdf", type=Path)
    fw.add_argument("out", type=Path)
    fw.add_argument("--berufsfeld-id", required=True)

    args = parser.parse_args()

    if args.command == "nomen-verb":
        rows = parse_nomen_verb(args.pdf)
        write_json(args.out, rows)
        print(f"Wrote {len(rows)} nomen-verb rows to {args.out}")
        return

    rows = parse_einfach_besser_fachwoerter(args.pdf, args.berufsfeld_id)
    write_json(args.out, rows)
    print(f"Wrote {len(rows)} fachwort rows to {args.out}")


if __name__ == "__main__":
    main()
