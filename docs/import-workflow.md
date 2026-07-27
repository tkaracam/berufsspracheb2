# Import Workflow

This project already supports admin-side JSON/CSV imports for:

- `nomen_verb_verbindungen`
- `fachwoerter`

## Goal

Convert local PDF source material into uploadable JSON files, then import those files through the admin UI.

## Extractors

Use:

`scripts/extract_import_data.py`

### Nomen-Verb

```bash
python3 scripts/extract_import_data.py nomen-verb INPUT.pdf OUTPUT.json
```

Result shape:

```json
{
  "phrase": "eine Anfrage stellen",
  "synonym": null,
  "beispielsatz": null,
  "kategorie": "A",
  "b2_relevanz": 2,
  "audio_path": null
}
```

### Fachwoerter

```bash
python3 scripts/extract_import_data.py fachwoerter INPUT.pdf OUTPUT.json --berufsfeld-id bewerbung-arbeitsmarkt
```

Result shape:

```json
{
  "berufsfeld_id": "bewerbung-arbeitsmarkt",
  "begriff": "Arbeitgeber/-in",
  "artikel": "der/die",
  "synonym": null,
  "beispielsatz": null
}
```

## Upload

Admin page:

- `/admin/import`

Accepted:

- `.json`
- `.csv`

## Important

- Some PDF sources may be copyrighted by publishers or exam institutions.
- Before publishing imported content publicly, confirm you have the right to use that source material.
- The extractor is best used for internal review, staged imports, or content you are authorized to publish.
