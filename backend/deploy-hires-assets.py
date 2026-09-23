#!/usr/bin/env python3
"""
Deploy full-resolution assets from skyline-religion-30plus-separate-images
with zero-distortion 4:5 framing for cards and high-res banners for editorial sections.
"""

import os
from PIL import Image

PACK = '/Users/parthsingh/Documents/Omi/skyline-religion/assets/hires_pack/skyline-religion-30plus-separate-images'
BASE = '/Users/parthsingh/Documents/Omi/skyline-religion/assets'
PRODUCTS = os.path.join(BASE, 'products')
EDITORIAL = os.path.join(BASE, 'editorial')

os.makedirs(PRODUCTS, exist_ok=True)
os.makedirs(EDITORIAL, exist_ok=True)

def make_4_5(img_path, dest_path):
    im = Image.open(img_path).convert('RGB')
    w, h = im.size
    # Target 4:5 ratio (width / height = 0.8)
    current_ratio = w / h
    if abs(current_ratio - 0.8) < 0.02:
        # Already 4:5
        cropped = im
    elif current_ratio > 0.8:
        # Too wide -> crop width symmetrically
        target_w = int(h * 0.8)
        ox = (w - target_w) // 2
        cropped = im.crop((ox, 0, ox + target_w, h))
    else:
        # Too tall -> crop height from top/center
        target_h = int(w / 0.8)
        oy = (h - target_h) // 3 # slightly upper biased for models
        cropped = im.crop((0, oy, w, oy + target_h))
    
    # Resize to standard 1200x1500 for retina displays
    final = cropped.resize((1200, 1500), Image.Resampling.LANCZOS)
    final.save(dest_path, 'JPEG', quality=95, optimize=True)

def copy_wide(img_path, dest_path):
    im = Image.open(img_path).convert('RGB')
    im.save(dest_path, 'JPEG', quality=95, optimize=True)

# 1. Product Cards & Modal Angles (12 Products x 4 Unique Images = 48 completely distinct files)
products_map = {
    # sr-01: Skyline Arch Heavyweight Hoodie — Noir
    'sr-01-front.jpg': f'{PACK}/01_clothing_product/03-black-hoodie-hanger-front.jpg',
    'sr-01-hover.jpg': f'{PACK}/02_models_couples/21-couple-black-hoodies-skyline-portrait.png',
    'sr-01-back.jpg':  f'{PACK}/02_models_couples/10-black-hoodie-back-waterfront.jpg',
    'sr-01-detail.jpg': f'{PACK}/03_brand_logo_detail/14-woven-label-detail.jpg',

    # sr-02: Skyline Arch Heavyweight Hoodie — Alabaster Cream
    'sr-02-front.jpg': f'{PACK}/01_clothing_product/17-cream-hoodie-back-product.jpg',
    'sr-02-hover.jpg': f'{PACK}/02_models_couples/04-male-cream-hoodie-street.jpg',
    'sr-02-back.jpg':  f'{PACK}/02_models_couples/11-female-cream-hoodie-editorial.jpg',
    'sr-02-detail.jpg': f'{PACK}/02_models_couples/20-female-cream-hoodie-waterfront.jpg',

    # sr-03: Sacred Drape Boxy Minimal Tee — Bone
    'sr-03-front.jpg': f'{PACK}/01_clothing_product/19-cream-tee-hanger.jpg',
    'sr-03-hover.jpg': f'{PACK}/02_models_couples/13-couple-walking-black-cream.jpg',
    'sr-03-back.jpg':  f'{PACK}/02_models_couples/27-couple-pier-seated-black-cream.png',
    'sr-03-detail.jpg': f'{PACK}/03_brand_logo_detail/01-brand-skyline-watermark.jpg',

    # sr-04: Metropolitan Relaxed Evening Suit — Noir
    'sr-04-front.jpg': f'{PACK}/02_models_couples/07-couple-black-tailoring-night.jpg',
    'sr-04-hover.jpg': f'{PACK}/02_models_couples/30-couple-seated-waterfront-shopping-bag.png',
    'sr-04-back.jpg':  f'{PACK}/02_models_couples/28-couple-standing-waterfront-portrait.png',
    'sr-04-detail.jpg': f'{PACK}/03_brand_logo_detail/33-01-skyline-religion-logo-red-black.jpg',

    # sr-05: Structure Oversized City Blazer — Charcoal
    'sr-05-front.jpg': f'{PACK}/02_models_couples/26-couple-black-cream-hoodies-night.png',
    'sr-05-hover.jpg': f'{PACK}/02_models_couples/25-couple-black-hoodies-direct-flash.png',
    'sr-05-back.jpg':  f'{PACK}/02_models_couples/29-couple-standing-waterfront-blue-hour.png',
    'sr-05-detail.jpg': f'{PACK}/02_models_couples/23-couple-seated-waterfront-sunset.png',

    # sr-06: Empire Relaxed Pleated Trousers — Noir
    'sr-06-front.jpg': f'{PACK}/02_models_couples/31-couple-black-cream-dusk-portrait.png',
    'sr-06-hover.jpg': f'{PACK}/02_models_couples/02-couple-night-black-hoodies.jpg',
    'sr-06-back.jpg':  f'{PACK}/02_models_couples/22-couple-black-hoodies-waterfront-wide.png',
    'sr-06-detail.jpg': f'{PACK}/02_models_couples/24-couple-waterfront-rail-dusk.png',

    # sr-07: Kinetic Architectural Training Joggers
    'sr-07-front.jpg': f'{PACK}/01_clothing_product/12-black-joggers-product.jpg',
    'sr-07-hover.jpg': f'{PACK}/02_models_couples/16-male-black-tee-studio.jpg',
    'sr-07-back.jpg':  f'{PACK}/01_clothing_product/12-black-joggers-product.jpg',
    'sr-07-detail.jpg': f'{PACK}/03_brand_logo_detail/14-woven-label-detail.jpg',

    # sr-08: Skyline Selvedge Denim Trucker Jacket — Raw Black
    'sr-08-front.jpg': f'{PACK}/01_clothing_product/15-black-denim-jacket-product.jpg',
    'sr-08-hover.jpg': f'{PACK}/02_models_couples/18-couple-burgundy-black-night.jpg',
    'sr-08-back.jpg':  f'{PACK}/01_clothing_product/15-black-denim-jacket-product.jpg',
    'sr-08-detail.jpg': f'{PACK}/03_brand_logo_detail/14-woven-label-detail.jpg',

    # sr-09: Metropolitan Foundations Boxy Tee — Noir
    'sr-09-front.jpg': f'{PACK}/01_clothing_product/06-black-tee-hanger.jpg',
    'sr-09-hover.jpg': f'{PACK}/02_models_couples/05-female-black-crop-tee-subway.jpg',
    'sr-09-back.jpg':  f'{PACK}/01_clothing_product/06-black-tee-hanger.jpg',
    'sr-09-detail.jpg': f'{PACK}/03_brand_logo_detail/14-woven-label-detail.jpg',

    # sr-10: Skyline Spire Structured Studio Cap
    'sr-10-front.jpg': f'{PACK}/01_clothing_product/08-black-cap-product.jpg',
    'sr-10-hover.jpg': f'{PACK}/02_models_couples/25-couple-black-hoodies-direct-flash.png',
    'sr-10-back.jpg':  f'{PACK}/01_clothing_product/08-black-cap-product.jpg',
    'sr-10-detail.jpg': f'{PACK}/03_brand_logo_detail/32-02-skyline-religion-logo-red-transparent.png',

    # sr-11: Nocturne Burgundy Heavyweight Hoodie
    'sr-11-front.jpg': f'{PACK}/02_models_couples/18-couple-burgundy-black-night.jpg',
    'sr-11-hover.jpg': f'{PACK}/02_models_couples/26-couple-black-cream-hoodies-night.png',
    'sr-11-back.jpg':  f'{PACK}/02_models_couples/18-couple-burgundy-black-night.jpg',
    'sr-11-detail.jpg': f'{PACK}/03_brand_logo_detail/14-woven-label-detail.jpg',

    # sr-12: Studio Atelier Tri-Color Capsule Collection
    'sr-12-front.jpg': f'{PACK}/01_clothing_product/09-hoodie-rack-black-cream-burgundy.jpg',
    'sr-12-hover.jpg': f'{PACK}/02_models_couples/28-couple-standing-waterfront-portrait.png',
    'sr-12-back.jpg':  f'{PACK}/01_clothing_product/09-hoodie-rack-black-cream-burgundy.jpg',
    'sr-12-detail.jpg': f'{PACK}/03_brand_logo_detail/14-woven-label-detail.jpg'
}

for dest, src in products_map.items():
    dest_path = os.path.join(PRODUCTS, dest)
    make_4_5(src, dest_path)
    print(f'Processed Product Card Image: {dest}')

# 2. Editorial Banners & Atmosphere
editorial_map = {
    'hero-waterfront-couple.jpg': f'{PACK}/02_models_couples/24-couple-waterfront-rail-dusk.png',
    'couple-walking-back.jpg': f'{PACK}/02_models_couples/13-couple-walking-black-cream.jpg',
    'tailoring-couple-suits.jpg': f'{PACK}/02_models_couples/07-couple-black-tailoring-night.jpg',
    'female-streetwear-blazer.jpg': f'{PACK}/02_models_couples/05-female-black-crop-tee-subway.jpg',
    'male-streetwear-trousers.jpg': f'{PACK}/02_models_couples/16-male-black-tee-studio.jpg',
    'studio-rack-craft.jpg': f'{PACK}/01_clothing_product/09-hoodie-rack-black-cream-burgundy.jpg',
    'woven-label-macro.jpg': f'{PACK}/03_brand_logo_detail/14-woven-label-detail.jpg'
}

for dest, src in editorial_map.items():
    dest_path = os.path.join(EDITORIAL, dest)
    copy_wide(src, dest_path)
    print(f'Processed Editorial Banner: {dest}')

# 3. Transparent Logos
logo_src = f'{PACK}/03_brand_logo_detail/32-02-skyline-religion-logo-red-transparent.png'
im_logo = Image.open(logo_src)
bbox = im_logo.getbbox()
im_logo_cropped = im_logo.crop(bbox)
im_logo_cropped.save(os.path.join(BASE, 'logo-red-transparent.png'), 'PNG', optimize=True)

import numpy as np
arr = np.array(im_logo_cropped)
white_arr = np.zeros_like(arr)
white_arr[:, :, :3] = 255
white_arr[:, :, 3] = arr[:, :, 3]
white_im = Image.fromarray(white_arr)
white_im.save(os.path.join(BASE, 'logo-white-transparent.png'), 'PNG', optimize=True)
white_im.save(os.path.join(BASE, 'logo.png'), 'PNG', optimize=True)
print('Generated crisp white & red logo variants!')

print('Hires asset deployment completed successfully!')
