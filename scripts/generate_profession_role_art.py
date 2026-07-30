from __future__ import annotations

import hashlib
import pathlib
import re
import unicodedata
from xml.sax.saxutils import escape


ROOT = pathlib.Path("/Users/Tolga/bsk-b2-platform/web")
MOCK_DATA = ROOT / "lib" / "mock-data.ts"
OUTPUT_DIR = ROOT / "public" / "images" / "professions" / "roles"


FIELD_STYLES = {
    "logistik-transport": {"bg": "#eef6ff", "surface": "#d5e7ff", "accent": "#6b92b9", "warm": "#d59f63", "ink": "#16304d", "icon": "truck"},
    "lager-produktion": {"bg": "#f5f3ee", "surface": "#ded8cc", "accent": "#7f8f7a", "warm": "#c69263", "ink": "#25302a", "icon": "factory"},
    "pflege-gesundheit": {"bg": "#f2fbf8", "surface": "#d4efe6", "accent": "#6aa597", "warm": "#f0c08b", "ink": "#173c3a", "icon": "cross"},
    "erziehung-paedagogik": {"bg": "#fff8ef", "surface": "#f5dfb8", "accent": "#d49652", "warm": "#7db0a4", "ink": "#3f3222", "icon": "book"},
    "hotel-gastronomie": {"bg": "#fff7ef", "surface": "#f5dfc4", "accent": "#d39b63", "warm": "#7aa59a", "ink": "#39291c", "icon": "cloche"},
    "einzelhandel-verkauf": {"bg": "#f6fbff", "surface": "#ddebf3", "accent": "#7aacc0", "warm": "#efc283", "ink": "#1f3542", "icon": "bag"},
    "buero-verwaltung": {"bg": "#f7f9fc", "surface": "#dfe6ef", "accent": "#8198b4", "warm": "#c9a57b", "ink": "#22344b", "icon": "briefcase"},
    "it-digitale-berufe": {"bg": "#f2f8ff", "surface": "#d8e5f7", "accent": "#5a83b8", "warm": "#8fd1d0", "ink": "#162a48", "icon": "monitor"},
    "handwerk-bau": {"bg": "#fbf6ef", "surface": "#ecd8bc", "accent": "#b78453", "warm": "#7fa394", "ink": "#352416", "icon": "hammer"},
    "reinigung-gebaeudemanagement": {"bg": "#f7fbfa", "surface": "#dbeee8", "accent": "#71a79c", "warm": "#e8bc85", "ink": "#1d3f3b", "icon": "sparkle"},
    "sicherheit-service": {"bg": "#f5f8fb", "surface": "#d8e2ec", "accent": "#667f9b", "warm": "#8fb7b0", "ink": "#1d3247", "icon": "shield"},
    "bewerbung-arbeitsmarkt": {"bg": "#faf8f4", "surface": "#e8dfd2", "accent": "#7c8a9c", "warm": "#caa46f", "ink": "#26364a", "icon": "mail"},
    "landwirtschaft-gartenbau": {"bg": "#f4fbf2", "surface": "#d8ecd3", "accent": "#6d9d71", "warm": "#d7b06e", "ink": "#213c24", "icon": "leaf"},
    "kfz-mechatronik": {"bg": "#f5f7fb", "surface": "#d9e0ec", "accent": "#7289a7", "warm": "#c58c62", "ink": "#203247", "icon": "car"},
    "friseur-kosmetik": {"bg": "#fff7fb", "surface": "#f0dce8", "accent": "#bb7c9d", "warm": "#f1c798", "ink": "#4a2438", "icon": "scissors"},
    "lebensmittel-metzgerei": {"bg": "#fff8f2", "surface": "#efdccf", "accent": "#bb7f69", "warm": "#d9b26a", "ink": "#48281e", "icon": "bread"},
    "tourismus-reisen": {"bg": "#f4fbff", "surface": "#d9edf5", "accent": "#6a99b6", "warm": "#f0c98a", "ink": "#1b3650", "icon": "plane"},
    "soziales-behindertenbetreuung": {"bg": "#f4fbf9", "surface": "#d8efe7", "accent": "#72a69b", "warm": "#d9b687", "ink": "#1f3d39", "icon": "heart"},
    "erneuerbare-energien-umwelt": {"bg": "#f2fbf4", "surface": "#d5ecd8", "accent": "#6b9c74", "warm": "#e7c277", "ink": "#203d27", "icon": "bolt-leaf"},
    "banken-versicherungen": {"bg": "#f6f8fc", "surface": "#dde4ef", "accent": "#748db1", "warm": "#d1b184", "ink": "#23334a", "icon": "bank"},
    "marketing-medien": {"bg": "#fff7f3", "surface": "#f0ddd3", "accent": "#d08569", "warm": "#89b7c1", "ink": "#4b2a20", "icon": "megaphone"},
    "chemie-pharma": {"bg": "#f5fbff", "surface": "#d9edf1", "accent": "#72a8b2", "warm": "#afc88d", "ink": "#1c3944", "icon": "flask"},
    "maschinenbau-anlagenbau": {"bg": "#f6f7f9", "surface": "#dfe3e8", "accent": "#7f8f9d", "warm": "#c59267", "ink": "#29343f", "icon": "gear"},
    "textil-mode": {"bg": "#fff8fb", "surface": "#f1dde6", "accent": "#c07f9d", "warm": "#e9c08e", "ink": "#4a2638", "icon": "needle"},
    "sport-fitness": {"bg": "#f4fbfa", "surface": "#d8efe9", "accent": "#6fa596", "warm": "#f1b97a", "ink": "#1d3f39", "icon": "dumbbell"},
    "kunst-kultur": {"bg": "#fff8f4", "surface": "#f1e0d0", "accent": "#c28868", "warm": "#9eb8cf", "ink": "#442a1f", "icon": "music"},
    "elektrotechnik": {"bg": "#f5f9ff", "surface": "#dbe6f5", "accent": "#6f8fb9", "warm": "#efbe6f", "ink": "#1d3150", "icon": "zap"},
    "tiefbau-strassenbau": {"bg": "#f8f4ef", "surface": "#e7d7c4", "accent": "#a8805b", "warm": "#7f9a89", "ink": "#3d2a1c", "icon": "road"},
    "druck-medienproduktion": {"bg": "#f7f8fc", "surface": "#dfe3ee", "accent": "#8590b0", "warm": "#cfa577", "ink": "#29364c", "icon": "printer"},
    "kunststofftechnik": {"bg": "#f6f8fb", "surface": "#dde4f0", "accent": "#7592b5", "warm": "#d3ad7c", "ink": "#25364a", "icon": "layers"},
    "optik-medizintechnik": {"bg": "#f4fbff", "surface": "#d8edf4", "accent": "#72a3b8", "warm": "#b8d7d2", "ink": "#1c3740", "icon": "glasses"},
    "hauswirtschaft-familienpflege": {"bg": "#fbfaf5", "surface": "#ece5d8", "accent": "#9ba087", "warm": "#d3af82", "ink": "#3a392d", "icon": "home"},
    "oeffentlicher-dienst": {"bg": "#f6f8fb", "surface": "#dee5ef", "accent": "#6e88a6", "warm": "#c9a77b", "ink": "#24364a", "icon": "building"},
    "schmuck-uhren": {"bg": "#fff9f3", "surface": "#f2e3cf", "accent": "#c89e61", "warm": "#9bb4c7", "ink": "#4a321a", "icon": "diamond"},
    "moebel-kuechenbau": {"bg": "#fbf7f1", "surface": "#eadbc8", "accent": "#a67e57", "warm": "#95ada1", "ink": "#3d2918", "icon": "sofa"},
    "tierpflege-veterinaermedizin": {"bg": "#f5fbf5", "surface": "#daedd8", "accent": "#7aa07a", "warm": "#d5b280", "ink": "#243a24", "icon": "paw"},
    "musikinstrumente-tonstudio": {"bg": "#fbf7ff", "surface": "#e7def4", "accent": "#8a79b5", "warm": "#d8b47d", "ink": "#312547", "icon": "note"},
    "fahrzeugaufbereitung": {"bg": "#f6f8fb", "surface": "#dde4ef", "accent": "#7a90ac", "warm": "#d0a16f", "ink": "#24364a", "icon": "spray"},
}


ICON_SVGS = {
    "truck": '<path d="M16 36h28l8 10h10v16h-4a8 8 0 0 1-16 0H30a8 8 0 0 1-16 0h-4V20h34z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><circle cx="22" cy="62" r="6" fill="none" stroke="currentColor" stroke-width="2.8"/><circle cx="50" cy="62" r="6" fill="none" stroke="currentColor" stroke-width="2.8"/>',
    "factory": '<path d="M10 58V22l18 12V22l18 12V18h20v40H10z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><path d="M18 58V46m12 12V42m12 16V46m12 12V42" stroke="currentColor" stroke-width="2.8"/>',
    "cross": '<path d="M34 12h12v18h18v12H46v18H34V42H16V30h18z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/>',
    "book": '<path d="M14 20c0-4 3-8 8-8h34v44H22c-5 0-8 3-8 8z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><path d="M56 12v52" stroke="currentColor" stroke-width="2.8"/><path d="M24 24h20m-20 10h20" stroke="currentColor" stroke-width="2.8"/>',
    "cloche": '<path d="M14 50h52m-42 0a16 16 0 0 1 32 0m-24 0h16m-9-18a2 2 0 1 0 2 0" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>',
    "bag": '<path d="M22 24h36l4 38H18z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><path d="M28 28a12 12 0 0 1 24 0" fill="none" stroke="currentColor" stroke-width="2.8"/>',
    "briefcase": '<path d="M14 26h52v32H14z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><path d="M30 26v-8h20v8m-36 14h52" fill="none" stroke="currentColor" stroke-width="2.8"/>',
    "monitor": '<rect x="14" y="16" width="52" height="34" rx="4" fill="none" stroke="currentColor" stroke-width="2.8"/><path d="M28 60h24M40 50v10" stroke="currentColor" stroke-width="2.8"/><path d="M26 26l8 8 14-14" fill="none" stroke="currentColor" stroke-width="2.8"/>',
    "hammer": '<path d="M18 22l10-8 12 12-8 10zM34 34l22 22" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><path d="M44 16l10 10" stroke="currentColor" stroke-width="2.8"/>',
    "sparkle": '<path d="M40 12l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><path d="M56 44l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="none" stroke="currentColor" stroke-width="2.8"/>',
    "shield": '<path d="M40 12l20 8v14c0 15-10 24-20 30-10-6-20-15-20-30V20z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/>',
    "mail": '<path d="M14 20h52v34H14z" fill="none" stroke="currentColor" stroke-width="2.8"/><path d="M14 24l26 18 26-18" fill="none" stroke="currentColor" stroke-width="2.8"/>',
    "leaf": '<path d="M58 18c-18 0-30 8-34 20-3 8 0 18 8 22 8 4 18 1 24-7 8-10 8-24 2-35z" fill="none" stroke="currentColor" stroke-width="2.8"/><path d="M24 54c6-8 16-16 28-24" fill="none" stroke="currentColor" stroke-width="2.8"/>',
    "car": '<path d="M18 44l8-16h28l8 16v12h-6a6 6 0 0 1-12 0H30a6 6 0 0 1-12 0h-6z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><circle cx="24" cy="58" r="4.5" fill="none" stroke="currentColor" stroke-width="2.8"/><circle cx="50" cy="58" r="4.5" fill="none" stroke="currentColor" stroke-width="2.8"/>',
    "scissors": '<circle cx="24" cy="26" r="8" fill="none" stroke="currentColor" stroke-width="2.8"/><circle cx="24" cy="54" r="8" fill="none" stroke="currentColor" stroke-width="2.8"/><path d="M30 30l28-16M30 50l28 16M30 40h30" fill="none" stroke="currentColor" stroke-width="2.8"/>',
    "bread": '<path d="M20 32c0-8 6-14 14-14 4 0 8 2 11 5 2-2 5-3 8-3 7 0 13 6 13 13v19H20z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><path d="M32 24c0 4-3 7-7 7" fill="none" stroke="currentColor" stroke-width="2.8"/>',
    "plane": '<path d="M12 40h54M30 40l30-18-6 18 6 18zM30 40l-12 12M30 40l-12-12" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/>',
    "heart": '<path d="M40 58S16 44 16 28c0-7 5-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 7 0 12 5 12 12 0 16-24 30-24 30z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/>',
    "bolt-leaf": '<path d="M44 12L24 40h12l-4 20 20-30H40z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><path d="M18 20c-4 4-6 10-4 16 2 7 8 12 16 14" fill="none" stroke="currentColor" stroke-width="2.8"/>',
    "bank": '<path d="M12 28l28-14 28 14H12zM18 32v20m12-20v20m12-20v20m12-20v20M12 56h56" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/>',
    "megaphone": '<path d="M18 42l28-12v24L18 42zm0 0v12m28-24 10-4v32l-10-4" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/>',
    "flask": '<path d="M28 14h24m-8 0v18l14 20c4 6 0 14-8 14H30c-8 0-12-8-8-14l14-20V14" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><path d="M28 42h24" stroke="currentColor" stroke-width="2.8"/>',
    "gear": '<circle cx="40" cy="40" r="10" fill="none" stroke="currentColor" stroke-width="2.8"/><path d="M40 16v8m0 32v8M16 40h8m32 0h8M24 24l6 6m20 20 6 6m0-32-6 6M30 50l-6 6" fill="none" stroke="currentColor" stroke-width="2.8"/>',
    "needle": '<path d="M22 56L54 24M46 22c3-3 8-3 11 0s3 8 0 11L46 44 34 32z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><path d="M18 60l10-10" stroke="currentColor" stroke-width="2.8"/>',
    "dumbbell": '<path d="M14 30h8v20h-8zM22 34h8v12h-8zM30 38h20M50 34h8v12h-8zM58 30h8v20h-8z" fill="none" stroke="currentColor" stroke-width="2.8"/>',
    "music": '<path d="M48 18v30a8 8 0 1 1-4-7V26l-18 4v20a8 8 0 1 1-4-7V24z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/>',
    "zap": '<path d="M44 12L24 40h14l-4 20 22-32H42z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/>',
    "road": '<path d="M28 12l-8 52m32-52 8 52M34 12h12M30 30h20M26 48h28" fill="none" stroke="currentColor" stroke-width="2.8"/>',
    "printer": '<path d="M22 22h36v14H22zM18 36h44a6 6 0 0 1 6 6v12H56v12H24V54H12V42a6 6 0 0 1 6-6z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><path d="M30 58h20" stroke="currentColor" stroke-width="2.8"/>',
    "layers": '<path d="M14 28l26-14 26 14-26 14zM14 42l26 14 26-14M14 56l26 14 26-14" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/>',
    "glasses": '<path d="M12 40h10a8 8 0 0 1 16 0h4a8 8 0 0 1 16 0h10M22 40h-8l2-10h14m12 10h14l2-10H48" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/>',
    "home": '<path d="M16 34L40 16l24 18v24H16z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><path d="M32 58V40h16v18" stroke="currentColor" stroke-width="2.8"/>',
    "building": '<path d="M20 66V18h28v48M12 66h56M30 30h8m-8 12h8m12-12h8m-8 12h8" fill="none" stroke="currentColor" stroke-width="2.8"/><path d="M52 66V30h16v36" fill="none" stroke="currentColor" stroke-width="2.8"/>',
    "diamond": '<path d="M16 30l10-14h28l10 14-24 30z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><path d="M26 16l14 44 14-44" fill="none" stroke="currentColor" stroke-width="2.8"/>',
    "sofa": '<path d="M18 40a8 8 0 0 1 8-8h28a8 8 0 0 1 8 8v12H18z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><path d="M12 66V46a10 10 0 0 1 10-10m36 30V46a10 10 0 0 1 10-10M20 66v-8m40 8v-8" fill="none" stroke="currentColor" stroke-width="2.8"/>',
    "paw": '<path d="M28 28a5 8 0 1 1-10 0 5 8 0 1 1 10 0zm14-6a5 8 0 1 1-10 0 5 8 0 1 1 10 0zm14 6a5 8 0 1 1-10 0 5 8 0 1 1 10 0zM40 58c10 0 16-6 16-14 0-8-7-14-16-14s-16 6-16 14c0 8 6 14 16 14z" fill="none" stroke="currentColor" stroke-width="2.8"/>',
    "note": '<path d="M48 16v30a8 8 0 1 1-4-7V24l-18 4v22a8 8 0 1 1-4-7V18z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/>',
    "spray": '<path d="M30 24h18v14H30zM26 38h26v24H26zM40 24v-8m16 18c6 0 10 4 12 10" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/>',
}

TITLE_ICON_RULES: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"koch|bäcker|konditor|metzger|fleisch|servicekraft|kellner", re.I), "cloche"),
    (re.compile(r"hotel|rezeption|buchung|reise|fremdenführer|tourismus", re.I), "plane"),
    (re.compile(r"lager|kommission|postzusteller|spedition|transport|fahrer|disponent|bagger", re.I), "truck"),
    (re.compile(r"produktion|maschinen|anlage|cnc|schwei|druck|extrusion|spritz|verfahren", re.I), "factory"),
    (re.compile(r"kranken|alten|pflege|medizin|therapeut|apothe|heilerziehung", re.I), "cross"),
    (re.compile(r"erzieher|kinder|kita|pädagog|jugend|musiklehrer|kursleiter", re.I), "book"),
    (re.compile(r"verkäufer|kassier|filial|schmuckverkäufer|juwelier|einrichtungsberater", re.I), "bag"),
    (re.compile(r"buchhalter|sachbearbeiter|sekret|verwaltung|bank|versicherung|finanz|amtschef|bürgerservice", re.I), "briefcase"),
    (re.compile(r"software|system|it-|digit|sps|medien|content|social|marketing|grafik|pr-berater|tontechniker", re.I), "monitor"),
    (re.compile(r"elektr|installateur|tischler|schreiner|möbel|küchen|lackierer|automechaniker|mechatronik|werkzeug|uhrmacher", re.I), "hammer"),
    (re.compile(r"reinigung|hausmeister|facility|haushalt|hauswirt|innenreiniger|wäscher|aufbereiter|autopfleger", re.I), "sparkle"),
    (re.compile(r"sicherheit|wachmann|brandschutz|security", re.I), "shield"),
    (re.compile(r"landwirt|gärtner|pflanzen|tier|pferd|hund|umwelt|energie|solar|wind|recycling", re.I), "leaf"),
    (re.compile(r"friseur|kosmetik|barbier|visagist|nagel", re.I), "scissors"),
    (re.compile(r"fitnes|sport|ernährung|rehabilitation", re.I), "dumbbell"),
    (re.compile(r"kunst|museum|theater|restaurator|goldschmied|graveur|modedesigner", re.I), "music"),
    (re.compile(r"optiker|linsen|hörakust|orthopädie|medizinprodukte", re.I), "glasses"),
    (re.compile(r"callcenter|kundenservice|empfang", re.I), "mail"),
]


def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", value)
    value = "".join(ch for ch in value if not unicodedata.combining(ch))
    value = value.replace("ß", "ss").lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return re.sub(r"-{2,}", "-", value).strip("-")


def parse_roles() -> list[tuple[str, str]]:
    text = MOCK_DATA.read_text()
    return re.findall(r'berufsfeld_id: "([^"]+)", title: "([^"]+)"', text)


def hashed(value: str) -> int:
    return int(hashlib.sha256(value.encode("utf-8")).hexdigest()[:12], 16)


def badge_text(title: str) -> str:
    short = re.sub(r"\s*/\s*", " · ", title)
    if len(short) <= 24:
        return short.upper()
    compact = short.split(" · ")[0]
    if len(compact) <= 24:
        return compact.upper()
    return compact[:22].upper() + "…"


def pick_style(field: str) -> dict[str, str]:
    return FIELD_STYLES.get(field, FIELD_STYLES["buero-verwaltung"])


def pick_icon(field: str, title: str) -> str:
    for pattern, icon in TITLE_ICON_RULES:
        if pattern.search(title):
            return icon
    return pick_style(field)["icon"]


def build_svg(field: str, title: str) -> str:
    style = pick_style(field)
    seed = hashed(f"{field}::{title}")
    accent_x = 760 + (seed % 140)
    accent_y = 150 + ((seed // 7) % 180)
    accent_r = 120 + ((seed // 13) % 80)
    orb_x = 170 + ((seed // 17) % 180)
    orb_y = 440 + ((seed // 23) % 140)
    orb_r = 120 + ((seed // 31) % 70)
    arc_shift = (seed // 37) % 90
    icon_svg = ICON_SVGS[pick_icon(field, title)]
    title_badge = escape(badge_text(title))
    field_label = escape(field.replace("-", " ").replace("oe", "ö").replace("ae", "ä").replace("ue", "ü"))

    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760" fill="none">
  <rect width="1200" height="760" rx="40" fill="{style['bg']}"/>
  <rect x="30" y="30" width="1140" height="700" rx="34" fill="url(#panelGradient)" stroke="rgba(32,40,52,0.06)"/>
  <circle cx="{accent_x}" cy="{accent_y}" r="{accent_r}" fill="{style['warm']}" fill-opacity="0.88"/>
  <circle cx="{orb_x}" cy="{orb_y}" r="{orb_r}" fill="{style['surface']}" fill-opacity="0.92"/>
  <path d="M0 610C130 560 180 516 282 516C388 516 444 608 548 608C652 608 718 502 824 502C952 502 1042 612 1200 574V760H0V610Z" fill="{style['surface']}" fill-opacity="0.92"/>
  <path d="M880 150c42 72 56 128 56 196 0 156-104 260-252 260-66 0-118-18-170-46 44-2 92-26 118-64 26-38 38-84 38-132 0-142-90-246-238-246 56-26 112-38 182-38 110 0 212 42 266 70Z" fill="{style['accent']}" fill-opacity="0.18"/>
  <rect x="54" y="54" width="340" height="62" rx="31" fill="white" fill-opacity="0.88" stroke="rgba(32,40,52,0.07)"/>
  <text x="88" y="93" font-size="28" font-family="Arial, sans-serif" fill="{style['ink']}" letter-spacing="5.2">{title_badge}</text>
  <rect x="72" y="574" width="220" height="54" rx="27" fill="white" fill-opacity="0.88" stroke="rgba(32,40,52,0.07)"/>
  <text x="108" y="608" font-size="24" font-family="Arial, sans-serif" fill="{style['ink']}" opacity="0.78" letter-spacing="2.4">{field_label.upper()}</text>
  <rect x="76" y="128" width="114" height="114" rx="30" fill="white" fill-opacity="0.92" stroke="rgba(32,40,52,0.06)"/>
  <g transform="translate(88 140)" style="color:{style['accent']}">{icon_svg}</g>
  <rect x="758" y="182" width="268" height="360" rx="52" fill="{style['accent']}" fill-opacity="0.14" stroke="rgba(32,40,52,0.06)"/>
  <circle cx="894" cy="290" r="82" fill="white" fill-opacity="0.88"/>
  <rect x="838" y="372" width="112" height="154" rx="42" fill="{style['warm']}" fill-opacity="0.98"/>
  <rect x="870" y="398" width="48" height="76" rx="18" fill="white" fill-opacity="0.9"/>
  <path d="M742 {660-arc_shift}c90-40 170-44 264-10 94 34 126 102 170 114" stroke="{style['accent']}" stroke-opacity="0.34" stroke-width="5" stroke-linecap="round"/>
  <path d="M120 520c52-66 118-106 182-126 74-22 154-10 222 46" stroke="{style['accent']}" stroke-opacity="0.22" stroke-width="5" stroke-linecap="round"/>
  <defs>
    <linearGradient id="panelGradient" x1="88" y1="78" x2="1130" y2="700" gradientUnits="userSpaceOnUse">
      <stop stop-color="white" stop-opacity="0.98"/>
      <stop offset="1" stop-color="{style['bg']}" stop-opacity="0.92"/>
    </linearGradient>
  </defs>
</svg>
"""


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    roles = parse_roles()
    for field, title in roles:
        filename = f"{slugify(field)}--{slugify(title)}.svg"
        (OUTPUT_DIR / filename).write_text(build_svg(field, title))
    print(f"generated {len(roles)} role illustrations in {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
