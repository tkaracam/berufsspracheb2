#!/usr/bin/env python3
"""Generiert echte .m4a-Hörtexte aus lib/listening-data.ts mit macOS say/afconvert."""

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = ROOT / "lib" / "listening-data.ts"
OUTPUT_DIR = ROOT / "public" / "audio"
VOICE = "Anna"


def parse_tasks(text: str) -> dict[str, str]:
    """Extrahiert id -> transcript aus der TypeScript-Datei."""
    tasks: dict[str, str] = {}
    # Suche jeden Block, der mit id: "lX" beginnt und transcript: `...` enthält.
    id_pattern = re.compile(r'id:\s*"(l\d+)"', re.MULTILINE)
    transcript_pattern = re.compile(r'transcript:\s*`([\s\S]*?)`\s*,', re.MULTILINE)

    ids = id_pattern.findall(text)
    transcripts = transcript_pattern.findall(text)

    if len(ids) != len(transcripts):
        print(f"Warnung: {len(ids)} IDs aber {len(transcripts)} Transkripte gefunden.")

    for tid, transcript in zip(ids, transcripts):
        # Entferne Template-String-Interpolationen, falls vorhanden
        cleaned = re.sub(r"\$\{[^}]*\}", "", transcript)
        tasks[tid] = cleaned.strip()
    return tasks


def generate(tid: str, transcript: str) -> None:
    out_file = OUTPUT_DIR / f"{tid}.m4a"
    if out_file.exists():
        print(f"{out_file.name} existiert bereits – überspringe.")
        return

    aiff = OUTPUT_DIR / f"{tid}.aiff"
    # say liest am zuverlässigsten aus einer Datei
    txt = OUTPUT_DIR / f"{tid}.txt"
    txt.write_text(transcript, encoding="utf-8")

    try:
        subprocess.run(
            ["say", "-v", VOICE, "-f", str(txt), "-o", str(aiff)],
            check=True,
            capture_output=True,
            text=True,
        )
        subprocess.run(
            ["afconvert", "-f", "m4af", "-d", "aac", str(aiff), str(out_file)],
            check=True,
            capture_output=True,
            text=True,
        )
        print(f"✓ {out_file.name} erstellt")
    except subprocess.CalledProcessError as e:
        print(f"✗ Fehler bei {tid}: {e.stderr}", file=sys.stderr)
        raise
    finally:
        if aiff.exists():
            aiff.unlink()
        txt.unlink()


def main() -> None:
    if sys.platform != "darwin":
        print("Dieses Skript benötigt macOS (say/afconvert).", file=sys.stderr)
        sys.exit(1)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    data = DATA_FILE.read_text(encoding="utf-8")
    tasks = parse_tasks(data)

    print(f"{len(tasks)} Hörtexte gefunden. Generiere Audio in {OUTPUT_DIR} …")
    for tid, transcript in tasks.items():
        generate(tid, transcript)

    print("Fertig.")


if __name__ == "__main__":
    main()
