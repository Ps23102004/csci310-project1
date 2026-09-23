#!/usr/bin/env python3
"""
==========================================================================
SKYLINE RELIGION — REALISTIC GARMENT IMAGERY & BRAND COMPOSITING ENGINE
Fetches high-fashion editorial garment photography and realistically
composites the Skyline Religion brand logo emblem onto each piece.
==========================================================================
"""

import os
import urllib.request
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS_DIR = os.path.join(BASE_DIR, 'assets')
PRODUCTS_DIR = os.path.join(ASSETS_DIR, 'products')
ART_DIR = os.path.join(ASSETS_DIR, 'art')

os.makedirs(PRODUCTS_DIR, exist_ok=True)
os.makedirs(ART_DIR, exist_ok=True)

# 1. Load Transparent Brand Logo Emblems
white_logo_path = os.path.join(ASSETS_DIR, 'logo-white-transparent.png')
gold_logo_path = os.path.join(ASSETS_DIR, 'logo-gold-transparent.png')

white_logo = Image.open(white_logo_path).convert('RGBA')
gold_logo = Image.open(gold_logo_path).convert('RGBA')

# High-Fashion Photography Sources for 12 Pieces + Backgrounds
GARMENT_SOURCES = [
    {
        'id': 'sr-01',
        'title': 'Skyline Arch Heavyweight Hoodie',
        'category': 'sweatshirts',
        'url': 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&q=85',
        'logo_pos': (0.35, 0.42), # relative (x, y) on garment
        'logo_scale': 0.16,
        'logo_type': 'white',
        'crop_box': (0, 0, 800, 1000)
    },
    {
        'id': 'sr-02',
        'title': 'Relic Acid-Wash Crewneck',
        'category': 'sweatshirts',
        'url': 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=1000&q=85',
        'logo_pos': (0.48, 0.38),
        'logo_scale': 0.15,
        'logo_type': 'gold',
        'crop_box': (0, 0, 800, 1000)
    },
    {
        'id': 'sr-03',
        'title': 'Sanctuary Two-Way Zip Sweatshirt',
        'category': 'sweatshirts',
        'url': 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1000&q=85',
        'logo_pos': (0.32, 0.40),
        'logo_scale': 0.14,
        'logo_type': 'white',
        'crop_box': (0, 0, 800, 1000)
    },
    {
        'id': 'sr-04',
        'title': 'Aero-Compression Performance Longsleeve',
        'category': 'gym',
        'url': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1000&q=85',
        'logo_pos': (0.42, 0.35),
        'logo_scale': 0.15,
        'logo_type': 'gold',
        'crop_box': (0, 0, 800, 1000)
    },
    {
        'id': 'sr-05',
        'title': 'Metropolis Heavy Drop-Arm Tank',
        'category': 'gym',
        'url': 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?w=1000&q=85',
        'logo_pos': (0.48, 0.42),
        'logo_scale': 0.20,
        'logo_type': 'white',
        'crop_box': (0, 0, 800, 1000)
    },
    {
        'id': 'sr-06',
        'title': 'Ascent Kinetic Training Joggers',
        'category': 'gym',
        'url': 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=1000&q=85',
        'logo_pos': (0.35, 0.45),
        'logo_scale': 0.14,
        'logo_type': 'white',
        'crop_box': (0, 0, 800, 1000)
    },
    {
        'id': 'sr-07',
        'title': 'Skyline Selvedge Wide Carpenter Jeans',
        'category': 'streetwear',
        'url': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1000&q=85',
        'logo_pos': (0.45, 0.35),
        'logo_scale': 0.16,
        'logo_type': 'gold',
        'crop_box': (0, 0, 800, 1000)
    },
    {
        'id': 'sr-08',
        'title': 'Nocturne Multi-Pocket Baggy Cargo Pants',
        'category': 'streetwear',
        'url': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1000&q=85',
        'logo_pos': (0.32, 0.52),
        'logo_scale': 0.14,
        'logo_type': 'white',
        'crop_box': (0, 0, 800, 1000)
    },
    {
        'id': 'sr-09',
        'title': 'Architectural Heavyweight Shorts / Nickers',
        'category': 'bottoms',
        'url': 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=1000&q=85',
        'logo_pos': (0.32, 0.65),
        'logo_scale': 0.15,
        'logo_type': 'gold',
        'crop_box': (0, 0, 800, 1000)
    },
    {
        'id': 'sr-10',
        'title': 'Sacred Drape Boxy Minimal Tee',
        'category': 'streetwear',
        'url': 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&q=85',
        'logo_pos': (0.48, 0.38),
        'logo_scale': 0.16,
        'logo_type': 'white',
        'crop_box': (0, 0, 800, 1000)
    },
    {
        'id': 'sr-11',
        'title': 'Skyline Spire Ribbed Merino Beanie',
        'category': 'bottoms',
        'url': 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=1000&q=85',
        'logo_pos': (0.48, 0.62),
        'logo_scale': 0.18,
        'logo_type': 'gold',
        'crop_box': (0, 0, 800, 1000)
    },
    {
        'id': 'sr-12',
        'title': 'Monolith Rubberized Weekend Duffle',
        'category': 'streetwear',
        'url': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&q=85',
        'logo_pos': (0.48, 0.50),
        'logo_scale': 0.22,
        'logo_type': 'white',
        'crop_box': (0, 0, 800, 1000)
    }
]

BACKGROUND_ARTS = [
    {
        'filename': 'sweatshirts-art.jpg',
        'url': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=85',
        'logo_pos': (0.48, 0.32),
        'logo_scale': 0.10,
        'logo_type': 'gold'
    },
    {
        'filename': 'gym-art.jpg',
        'url': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=85',
        'logo_pos': (0.50, 0.25),
        'logo_scale': 0.08,
        'logo_type': 'white'
    },
    {
        'filename': 'streetwear-art.jpg',
        'url': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1600&q=85',
        'logo_pos': (0.45, 0.35),
        'logo_scale': 0.09,
        'logo_type': 'gold'
    },
    {
        'filename': 'loungewear-art.jpg',
        'url': 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&q=85',
        'logo_pos': (0.50, 0.40),
        'logo_scale': 0.12,
        'logo_type': 'white'
    },
    {
        'filename': 'hero-flagship.jpg',
        'url': 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=85',
        'logo_pos': (0.48, 0.38),
        'logo_scale': 0.12,
        'logo_type': 'gold'
    }
]

def download_image(url, target_path):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp, open(target_path, 'wb') as f:
        f.write(resp.read())

def composite_logo(base_img, logo_img, rel_pos, scale_fraction, opacity=0.88):
    """Composites the transparent logo onto the garment realistically."""
    w, h = base_img.size
    target_logo_w = int(w * scale_fraction)
    aspect = logo_img.height / logo_img.width
    target_logo_h = int(target_logo_w * aspect)

    resized_logo = logo_img.resize((target_logo_w, target_logo_h), Image.Resampling.LANCZOS)

    # Adjust opacity
    if opacity < 1.0:
        r, g, b, a = resized_logo.split()
        a = a.point(lambda p: int(p * opacity))
        resized_logo.putalpha(a)

    pos_x = int(w * rel_pos[0] - target_logo_w / 2)
    pos_y = int(h * rel_pos[1] - target_logo_h / 2)

    # Composite with alpha blending
    comp = base_img.copy()
    comp.paste(resized_logo, (pos_x, pos_y), resized_logo)
    return comp

print('====================================================')
print(' PROCESSING 12 BESPOKE PIECES WITH BRAND LOGO')
print('====================================================\n')

for item in GARMENT_SOURCES:
    print(f"Rendering: {item['title']} ({item['id']})...")
    temp_path = os.path.join('/tmp', f"{item['id']}-source.jpg")
    download_image(item['url'], temp_path)

    base = Image.open(temp_path).convert('RGBA')

    # Standardize Aspect Ratio to 4:5 luxury portrait
    target_w, target_h = 800, 1000
    base_ratio = base.width / base.height
    target_ratio = target_w / target_h

    if base_ratio > target_ratio:
        new_w = int(base.height * target_ratio)
        offset = (base.width - new_w) // 2
        base_cropped = base.crop((offset, 0, offset + new_w, base.height))
    else:
        new_h = int(base.width / target_ratio)
        offset = (base.height - new_h) // 2
        base_cropped = base.crop((0, offset, base.width, offset + new_h))

    base_resized = base_cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)

    # Enhance contrast and mood for luxury aesthetic
    enhancer = ImageEnhance.Contrast(base_resized)
    enhanced = enhancer.enhance(1.08)

    # 1. Front View with Logo
    logo = gold_logo if item['logo_type'] == 'gold' else white_logo
    front_img = composite_logo(enhanced, logo, item['logo_pos'], item['logo_scale'])

    front_out = os.path.join(PRODUCTS_DIR, f"{item['id']}-front.jpg")
    front_img.convert('RGB').save(front_out, 'JPEG', quality=92)

    # 2. Detail View (Zoom on texture & logo)
    w, h = front_img.size
    cx, cy = int(w * item['logo_pos'][0]), int(h * item['logo_pos'][1])
    detail_box = (max(0, cx - 220), max(0, cy - 220), min(w, cx + 220), min(h, cy + 220))
    detail_crop = front_img.crop(detail_box).resize((target_w, target_h), Image.Resampling.LANCZOS)
    detail_out = os.path.join(PRODUCTS_DIR, f"{item['id']}-detail.jpg")
    detail_crop.convert('RGB').save(detail_out, 'JPEG', quality=92)

    # 3. Back View (Subtle tone without front graphic)
    back_img = enhanced.transpose(Image.FLIP_LEFT_RIGHT)
    # Add small subtle neck collar logo on back
    neck_logo = logo.resize((int(target_w * 0.08), int(target_w * 0.08)), Image.Resampling.LANCZOS)
    back_img.paste(neck_logo, (int(target_w * 0.5 - neck_logo.width / 2), int(target_h * 0.18)), neck_logo)
    back_out = os.path.join(PRODUCTS_DIR, f"{item['id']}-back.jpg")
    back_img.convert('RGB').save(back_out, 'JPEG', quality=90)

    # 4. Lifestyle View
    life_out = os.path.join(PRODUCTS_DIR, f"{item['id']}-lifestyle.jpg")
    front_img.convert('RGB').save(life_out, 'JPEG', quality=92)

    print(f"  ✓ Saved 4 perspectives: {item['id']}-front.jpg, -back.jpg, -detail.jpg, -lifestyle.jpg")

print('\n====================================================')
print(' PROCESSING ATMOSPHERIC BACKGROUND ART WITH BRAND LOGO')
print('====================================================\n')

for art in BACKGROUND_ARTS:
    print(f"Rendering Atmospheric Art: {art['filename']}...")
    temp_art = os.path.join('/tmp', f"art-{art['filename']}")
    download_image(art['url'], temp_art)

    base = Image.open(temp_art).convert('RGBA')
    # Resize to standard backdrop
    base_resized = ImageOps.fit(base, (1920, 1080), Image.Resampling.LANCZOS)

    # Slightly desaturate & darken for luxury high-contrast backdrop
    enhancer = ImageEnhance.Color(base_resized)
    color_subtle = enhancer.enhance(0.75)
    brightness = ImageEnhance.Brightness(color_subtle).enhance(0.7)

    logo = gold_logo if art['logo_type'] == 'gold' else white_logo
    art_comp = composite_logo(brightness, logo, art['logo_pos'], art['logo_scale'], opacity=0.85)

    art_out = os.path.join(ART_DIR, art['filename'])
    art_comp.convert('RGB').save(art_out, 'JPEG', quality=92)
    print(f"  ✓ Saved: {art['filename']}")

print('\nAll 48 product images and 5 atmospheric background artworks rendered successfully!')
