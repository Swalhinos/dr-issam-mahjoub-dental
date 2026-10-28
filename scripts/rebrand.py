# -*- coding: utf-8 -*-
"""Rebrand the base site for Dr Issam Mahjoub (Msaken, Sousse, Tunisia).

Run in GitHub Actions. Writes new translations and components, patches
header/footer/hero/services/page/layout, processes the supplied official
logo into transparent PNG variants and the favicon set, downloads the
verified before/after composite, deletes old-identity assets, and verifies
that no trace of the old identity remains. Exits non-zero on any failure.
"""

import os
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

sys.path.insert(0, str(ROOT / "scripts"))
from content_translations import TRANSLATIONS_TS
from content_components import SOCIAL_ICONS_TSX, SOCIAL_TSX, IMPLANTS_TSX, BEFORE_AFTER_TSX


def fail(msg):
    raise SystemExit("REBRAND FAILED: " + msg)


def read(rel):
    return (ROOT / rel).read_text(encoding="utf-8")


def write(rel, text):
    p = ROOT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding="utf-8")


def patch(rel, old, new, count=1, required=True):
    text = read(rel)
    if old not in text:
        if required:
            fail("patch target not found in %s: %r" % (rel, old[:100]))
        print("WARN patch skipped in %s: %r" % (rel, old[:60]))
        return
    write(rel, text.replace(old, new, count))


def repatch(rel, pattern, repl, required=True):
    text = read(rel)
    text2, n = re.subn(pattern, repl, text, count=1, flags=re.S)
    if n == 0:
        if required:
            fail("regex patch target not found in %s: %s" % (rel, pattern[:80]))
        print("WARN regex patch skipped in %s" % rel)
        return
    write(rel, text2)


def download(url, dest):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = resp.read()
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)
    return data


def fix_client(content):
    content = content.replace("use-client-marker", "'use client'")
    content = content.replace(chr(92) + "'", "'")
    return content


def brand_icons():
    icons = [
        ("facebook", "FacebookIcon"),
        ("instagram", "InstagramIcon"),
        ("tiktok", "TikTokIcon"),
        ("whatsapp", "WhatsAppIcon"),
    ]
    parts = ["// Official brand icons (Simple Icons, CC0), currentColor fill.\n"]
    tmp = ROOT / ".tmp-icon.svg"
    for slug, comp in icons:
        path_d = None
        for base in (
            "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/",
            "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/",
            "https://unpkg.com/simple-icons@latest/icons/",
        ):
            try:
                svg = download(base + slug + ".svg", tmp).decode("utf-8")
            except Exception:
                continue
            m = re.search(r"<path d=\"([^\"]+)\"", svg)
            if m:
                path_d = m.group(1)
                break
        if not path_d:
            fail("could not download official brand icon: " + slug)
        parts.append(
            "export function %s({ className }: { className?: string }) {\n"
            "  return (\n"
            "    <svg viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\" className={className}>\n"
            "      <path d=\"%s\" />\n"
            "    </svg>\n"
            "  )\n"
            "}\n" % (comp, path_d)
        )
    if tmp.exists():
        tmp.unlink()
    write("components/brand-icons.tsx", "\n".join(parts))
    print("brand icons written")


def process_logo():
    from PIL import Image, ImageFilter, ImageDraw
    src = ROOT / "public/images/1000277985_1_n0b5.jpg"
    if not src.exists():
        fail("supplied logo not found: " + str(src))
    img = Image.open(src).convert("RGB")
    lum = img.convert("L")

    def ramp(v):
        if v < 70:
            return 0
        if v > 140:
            return 255
        return int((v - 70) * 255 / 70)

    alpha = lum.point(ramp)
    alpha = alpha.filter(ImageFilter.GaussianBlur(1.2))
    alpha = alpha.point(lambda v: 0 if v < 10 else v)
    rgba = img.convert("RGBA")
    rgba.putalpha(alpha)
    bbox = alpha.getbbox()
    if not bbox:
        fail("logo alpha mask is empty")
    pad = max(4, int(0.02 * max(bbox[2] - bbox[0], bbox[3] - bbox[1])))
    box = (
        max(0, bbox[0] - pad),
        max(0, bbox[1] - pad),
        min(img.width, bbox[2] + pad),
        min(img.height, bbox[3] + pad),
    )
    rgba = rgba.crop(box)
    lum_c = lum.crop(box)
    w, h = rgba.size
    rgba.save(ROOT / "public/images/logo-silver.png", optimize=True)

    def gradient():
        out = Image.new("RGB", (w, h))
        px = out.load()
        lp = lum_c.load()
        navy = (18, 48, 79)
        sky = (79, 195, 247)
        for y in range(h):
            for x in range(w):
                t = (lp[x, y] - 60) / 170.0
                t = 0.0 if t < 0.0 else (1.0 if t > 1.0 else t)
                px[x, y] = tuple(int(navy[i] + (sky[i] - navy[i]) * t) for i in range(3))
        out.putalpha(rgba.getchannel("A"))
        return out

    def white_version():
        out = Image.new("RGB", (w, h))
        px = out.load()
        lp = lum_c.load()
        for y in range(h):
            for x in range(w):
                g = 205 + int(lp[x, y] * 50 / 255)
                px[x, y] = (g, g, min(255, g + 5))
        out.putalpha(rgba.getchannel("A"))
        return out

    color = gradient()
    white = white_version()
    color.save(ROOT / "public/images/logo-color.png", optimize=True)
    white.save(ROOT / "public/images/logo-white.png", optimize=True)

    def square(logo, size):
        canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        scale = min(size * 0.84 / logo.width, size * 0.84 / logo.height)
        thumb = logo.resize((max(1, int(logo.width * scale)), max(1, int(logo.height * scale))), Image.LANCZOS)
        canvas.paste(thumb, ((size - thumb.width) // 2, (size - thumb.height) // 2), thumb)
        return canvas

    icon512 = square(color, 512)
    icon512.save(ROOT / "public/favicon.png")
    icon512.save(ROOT / "public/icon-512.png")
    icon512.resize((192, 192), Image.LANCZOS).save(ROOT / "public/icon-192.png")
    apple = Image.new("RGBA", (180, 180), (18, 48, 79, 255))
    mask = Image.new("L", (180, 180), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([0, 0, 179, 179], radius=40, fill=255)
    out = Image.new("RGBA", (180, 180), (0, 0, 0, 0))
    out.paste(apple, (0, 0), mask)
    scale = min(180 * 0.72 / white.width, 180 * 0.72 / white.height)
    thumb = white.resize((max(1, int(white.width * scale)), max(1, int(white.height * scale))), Image.LANCZOS)
    out.paste(thumb, ((180 - thumb.width) // 2, (180 - thumb.height) // 2), thumb)
    out.save(ROOT / "public/apple-icon.png")
    assets = ROOT / "assets"
    assets.mkdir(exist_ok=True)
    os.replace(src, assets / "logo-original.jpg")
    print("logo variants written")


def download_composite():
    url = "https://images.ctfassets.net/ep6a2e51ydt1/4aKTU1Ecxb6uitPMbG1zRB/fed80e5ead8799c207a59ed1eb8ae500/male-before-after-composite-veneers.png"
    dest = ROOT / "public/images/before-after-composite.png"
    data = download(url, dest)
    if len(data) < 50000 or data[:4] != bytes([0x89, 0x50, 0x4E, 0x47]):
        fail("before/after composite download failed verification (%d bytes)" % len(data))
    print("composite downloaded: %d bytes" % len(data))


def apply_content_and_patches():
    write("lib/translations.ts", TRANSLATIONS_TS)
    write("components/social-icons.tsx", SOCIAL_ICONS_TSX)
    write("components/social-section.tsx", fix_client(SOCIAL_TSX))
    write("components/implants-section.tsx", fix_client(IMPLANTS_TSX).replace("from '@/components/whatsapp-icon'", "from '@/components/brand-icons'"))
    write("components/before-after.tsx", fix_client(BEFORE_AFTER_TSX))
    targets = []
    for base in ("app", "components", "lib"):
        for p in (ROOT / base).rglob("*"):
            if p.is_file() and p.suffix in (".tsx", ".ts", ".css", ".mjs", ".json", ".md"):
                targets.append(p)
    targets.append(ROOT / "README.md")
    replacements = [
        ("Centre Dentaire Al Qods", "Dr Issam Mahjoub"),
        ("Dr. Omari Abdelhakim", "Dr Issam Mahjoub"),
        ("Omari Abdelhakim", "Issam Mahjoub"),
        ("Béni Mellal", "Msaken, Sousse"),
        ("Beni Mellal", "Msaken, Sousse"),
        ("Maroc", "Tunisie"),
        ("Morocco", "Tunisia"),
        ("+212 7 08 81 82 83", "+216 98 800 749"),
        ("+212708818283", "+21698800749"),
        ("wa.me/212708818283", "wa.me/21698800749"),
    ]
    for p in targets:
        text = p.read_text(encoding="utf-8")
        new = text
        for old, newv in replacements:
            new = new.replace(old, newv)
        if new != text:
            p.write_text(new, encoding="utf-8")
    patch("lib/language-context.tsx", "useState<Lang>('en')", "useState<Lang>('fr')")
    patch("components/site-header.tsx", "{ code: 'en', label: 'EN' },", "{ code: 'fr', label: 'FR' },")
    patch("components/site-header.tsx", """  { code: 'es', label: 'ES' },
  { code: 'de', label: 'DE' },
""", "")
    patch("components/site-header.tsx", "{ href: '#services', label: t.nav.services },", "{ href: '#services', label: t.nav.services },\n    { href: '#implants', label: t.nav.implants },\n    { href: '#social', label: t.nav.social },")
    patch("components/site-header.tsx", "src=\"/images/logo.png\"", "src=\"/images/logo-color.png\"")
    patch("components/site-header.tsx", "import { useLanguage } from '@/lib/language-context'", "import { useLanguage } from '@/lib/language-context'\nimport { SocialIcons } from '@/components/social-icons'")
    patch("components/site-header.tsx", "<div className=\"flex items-center gap-2\">", "<div className=\"flex items-center gap-2\">\n          <SocialIcons className=\"hidden lg:flex\" />")
    patch("components/site-footer.tsx", "import { CLINIC } from '@/lib/translations'", "import { CLINIC } from '@/lib/translations'\nimport { SocialIcons } from '@/components/social-icons'")
    patch("components/site-footer.tsx", "src=\"/images/logo.png\"", "src=\"/images/logo-white.png\"")
    patch("components/site-footer.tsx", "className=\"h-11 w-11 rounded-full bg-navy-foreground/90 object-contain p-1\"", "className=\"h-11 w-11 object-contain\"")
    patch("components/site-footer.tsx", "{ href: '#services', label: t.nav.services },", "{ href: '#services', label: t.nav.services },\n  { href: '#implants', label: t.nav.implants },")
    patch("components/site-footer.tsx", "{ href: '#results', label: t.nav.results },", "{ href: '#results', label: t.nav.results },\n  { href: '#social', label: t.nav.social },")
    patch("components/site-footer.tsx", "{t.footer.tagline}</p>", "{t.footer.tagline}</p>\n          <SocialIcons tone=\"dark\" />")
    patch("components/hero.tsx", "src=\"/images/logo.png\"", "src=\"/images/logo-color.png\"")
    patch("components/services.tsx", """import {
  Baby,
  Braces,
  Gem,
  Anchor,
  Slice,
  Sparkles,
  Stethoscope,
  Syringe,
} from 'lucide-react'""", """import {
  Anchor,
  Braces,
  Gem,
  Slice,
  Sparkles,
  Stethoscope,
} from 'lucide-react'""")
    patch("components/services.tsx", "const icons = [Stethoscope, Sparkles, Anchor, Braces, Gem, Baby, Syringe, Slice]", "const icons = [Anchor, Braces, Sparkles, Gem, Stethoscope, Slice]")
    print("content and component patches applied")


def apply_page_layout_patches():
    patch("app/page.tsx", "import { BeforeAfter } from '@/components/before-after'", "import { BeforeAfter } from '@/components/before-after'\nimport { ImplantsSection } from '@/components/implants-section'\nimport { SocialSection } from '@/components/social-section'")
    patch("app/page.tsx", "<Services />", "<Services />\n      <ImplantsSection />")
    patch("app/page.tsx", "<BeforeAfter />", "<BeforeAfter />\n      <SocialSection />")
    patch("app/layout.tsx", "title: 'Dr Issam Mahjoub | Dentist in Msaken, Sousse, Tunisia'", "title: 'Dr Issam Mahjoub | Chirurgien-Dentiste à Msaken, Sousse — Tunisie'", count=10)
    patch("app/layout.tsx", "Premium dental clinic in Msaken, Sousse led by Dr Issam Mahjoub, dental surgeon. Teeth whitening, implants, orthodontics, pediatric dentistry and more. Book your appointment today.", "Cabinet dentaire du Dr Issam Mahjoub à Msaken, Sousse — Tunisie. Implants dentaires, orthodontie, blanchiment, prothèses et urgences. Prenez rendez-vous sur WhatsApp.", count=10)
    repatch("app/layout.tsx", "keywords: \\[[^\\]]*\\]", "keywords: ['dentiste Msaken', 'dentiste Sousse', 'Dr Issam Mahjoub', 'cabinet dentaire Msaken', 'implant dentaire Tunisie', 'blanchiment dentaire Sousse', 'dental implants Tunisia']", required=False)
    patch("app/layout.tsx", "icon: '/images/logo.png'", "icon: '/favicon.png'", required=False)
    patch("app/layout.tsx", "locale: 'en_US'", "locale: 'fr_FR'", required=False)
    patch("app/layout.tsx", '<html lang="en">', '<html lang="fr">', required=False)
    patch("next.config.mjs", "const nextConfig = {", """const nextConfig = {
  output: 'export',""")
    patch("package.json", '"name": "centre-dentaire-al-qods"', '"name": "dr-issam-mahjoub-dental"')
    write("README.md", """# Dr Issam Mahjoub — Dental Clinic Website

Static Next.js website for Dr Issam Mahjoub, chirurgien-dentiste in Msaken, Sousse, Tunisia.

- Phone / WhatsApp: +216 98 800 749 (wa.me/21698800749)
- Address shown: Msaken, Sousse — Tunisie (coordinates-based: 35.729397, 10.579867 — to be confirmed by the client)
- Languages: French (default), Arabic (RTL), English
- Booking form submits via WhatsApp with the form details prefilled in the selected language
- Social: Facebook (facebook.com/docsam1979) and Instagram (instagram.com/dr.issam.mahjoub) verified; TikTok link is a clearly-marked placeholder pending confirmation
- Before/after slider uses one real composite photo (male patient, mouth close-up), captioned as an illustrative example
- Logo: official supplied logo; transparent variants generated from assets/logo-original.jpg (silver for dark surfaces, navy-to-sky gradient for light surfaces, white for the navy footer)

Placeholders the client must still confirm: exact address/city, opening hours (Mon-Fri 09:00-18:00, Sat 09:00-14:00), hero stats, testimonials, TikTok profile link.

Build: npm install, then npm run build (static export in out/).
""")
    css = ROOT / "app/globals.css"
    text = css.read_text(encoding="utf-8")
    if "scroll-behavior: smooth" not in text:
        css.write_text(text + """
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
""", encoding="utf-8")
    print("page and layout patches applied")


def cleanup_and_verify():
    for rel in (
        "public/images/logo.png",
        "public/images/before-after-1.jpg",
        "public/images/before-after-2.jpg",
        "public/icon-dark-32x32.png",
        "public/icon-light-32x32.png",
        "public/icon.svg",
    ):
        p = ROOT / rel
        if p.exists():
            p.unlink()
            print("deleted " + rel)
    required = [
        "public/images/logo-color.png",
        "public/images/logo-white.png",
        "public/images/logo-silver.png",
        "public/favicon.png",
        "public/icon-192.png",
        "public/icon-512.png",
        "public/apple-icon.png",
        "public/images/before-after-composite.png",
        "components/brand-icons.tsx",
        "components/social-section.tsx",
        "components/implants-section.tsx",
        "components/social-icons.tsx",
        "assets/logo-original.jpg",
    ]
    for rel in required:
        p = ROOT / rel
        if not p.exists() or p.stat().st_size == 0:
            fail("required file missing or empty: " + rel)
    forbidden = [
        "Al Qods", "Omari", "Abdelhakim", "Béni Mellal", "Beni Mellal",
        "Asmaa", "Bnin", "+212", "212708818283", "Maroc", "Morocco",
        "logo.png", "before-after-1", "before-after-2", "code: 'es'", 'code: "es"',
        "code: 'de'", 'code: "de"',
    ]
    hits = []
    for base in ("app", "components", "lib"):
        for p in (ROOT / base).rglob("*"):
            if p.is_file() and p.suffix in (".tsx", ".ts", ".css", ".mjs", ".json"):
                text = p.read_text(encoding="utf-8", errors="ignore")
                for term in forbidden:
                    if term in text:
                        hits.append("%s: %s" % (p.relative_to(ROOT), term))
    for p in (ROOT / "public").rglob("*"):
        if p.is_file() and p.name not in ("logo-color.png", "logo-white.png", "logo-silver.png"):
            for term in ("logo.png", "before-after-1", "before-after-2"):
                if term in p.name:
                    hits.append("public filename: " + p.name)
    if hits:
        fail("old-identity traces remain:\n" + "\n".join(hits))
    print("verification passed: no old-identity traces; all assets present")


def main():
    brand_icons()
    process_logo()
    download_composite()
    apply_content_and_patches()
    apply_page_layout_patches()
    cleanup_and_verify()
    print("REBRAND COMPLETE")


if __name__ == "__main__":
    main()
