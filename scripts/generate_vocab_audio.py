#!/usr/bin/env python3
"""Generiert .m4a-Audiodateien für Fachwörter und Nomen-Verb-Verbindungen."""

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = ROOT / "lib" / "mock-data.ts"
PUBLIC_DIR = ROOT / "public"
VOICE = "Anna"


def extract_entries(text: str, prefix: str, text_key: str) -> dict[str, str]:
    pattern = re.compile(
        rf'id:\s*"({prefix}\d+)"\s*,\s*.*?{text_key}:\s*"([^"]+)".*?audio_path:\s*"([^"]+)"',
        re.DOTALL,
    )
    return {m.group(3): m.group(2) for m in pattern.finditer(text)}


def generate(path: str, text: str) -> None:
    out_file = PUBLIC_DIR / path.lstrip("/")
    if out_file.exists():
        print(f"Überspringe {out_file.name}")
        return

    out_file.parent.mkdir(parents=True, exist_ok=True)
    aiff = out_file.with_suffix(".aiff")
    txt = out_file.with_suffix(".txt")
    txt.write_text(text, encoding="utf-8")

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
        print(f"✓ {out_file.name}")
    except subprocess.CalledProcessError as e:
        print(f"✗ Fehler bei {path}: {e.stderr}", file=sys.stderr)
    finally:
        if aiff.exists():
            aiff.unlink()
        txt.unlink()


def main() -> None:
    if sys.platform != "darwin":
        print("Dieses Skript benötigt macOS (say/afconvert).", file=sys.stderr)
        sys.exit(1)

    data = DATA_FILE.read_text(encoding="utf-8")
    fachwoerter = extract_entries(data, "fw", "begriff")
    nomen_verb = extract_entries(data, "nv", "phrase")

    total = len(fachwoerter) + len(nomen_verb)
    print(f"{total} Vokabel-Einträge gefunden. Generiere Audio …")
    for path, text in fachwoerter.items():
        generate(path, text)
    for path, text in nomen_verb.items():
        generate(path, text)
    print("Fertig.")


if __name__ == "__main__":
    main()
