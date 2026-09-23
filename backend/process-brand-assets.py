#!/usr/bin/env python3
"""
Skyline Religion — Brand Asset Extraction & Image Optimization Pipeline
Extracts high-resolution assets from zip archive, generates cropped logo variants,
slices composite contact sheets into 4:5 editorial panels, and writes web-optimized assets.
"""

import os
import zipfile
import io
from PIL import Image, ImageOps
import numpy as np

BASE_DIR = '/Users/parthsingh/Documents/Omi/skyline-religion'
ZIP_PATH = '/Users/parthsingh/Downloads/skyline-religion-separate-images.zip'
ASSETS_DIR = os.path.join(BASE_DIR, 'assets')
PRODUCTS_DIR = os.path.join(ASSETS_DIR, 'products')
EDITORIAL_DIR = os.path.join(ASSETS_DIR, 'editorial')

os.makedirs(PRODUCTS_DIR, exist_ok=True)
os.makedirs(EDITORIAL_DIR, exist_ok=True)

def process_pipeline():
    print(f"Opening archive: {ZIP_PATH}")
    with zipfile.ZipFile(ZIP_PATH, 'r') as zf:
        # 1. Process Official Brand Logos
        # A. Transparent Red/White Logo (Cropped to tight bounding box)
        logo_data = zf.read('skyline-religion-separate-images/02-skyline-religion-logo-red-transparent.png')
        logo_img = Image.open(io.BytesIO(logo_data))
        bbox = logo_img.getbbox()
        cropped_logo = logo_img.crop(bbox)
        cropped_logo.save(os.path.join(ASSETS_DIR, 'logo-red-transparent.png'), 'PNG', optimize=True)
        print("Generated assets/logo-red-transparent.png")

        # B. Generate Pure White Transparent Logo for Nocturnal Obsidian Glass Header
        logo_arr = np.array(cropped_logo)
        white_arr = np.zeros_like(logo_arr)
        white_arr[:, :, :3] = 255
        white_arr[:, :, 3] = logo_arr[:, :, 3]
        white_logo = Image.fromarray(white_arr)
        white_logo.save(os.path.join(ASSETS_DIR, 'logo-white-transparent.png'), 'PNG', optimize=True)
        white_logo.save(os.path.join(ASSETS_DIR, 'logo.png'), 'PNG', optimize=True) # Unified default
        print("Generated assets/logo-white-transparent.png and updated assets/logo.png")

        # C. Woven Fabric Crest Logo
        crest_data = zf.read('skyline-religion-separate-images/01-skyline-religion-logo-red-black.jpg')
        crest_img = Image.open(io.BytesIO(crest_data))
        crest_img.save(os.path.join(ASSETS_DIR, 'logo-crest-black.jpg'), 'JPEG', quality=95)
        print("Generated assets/logo-crest-black.jpg")

        # 2. Extract Primary 4:5 Standalone Campaign Assets
        asset_map = {
            '03-couple-waterfront-front.jpg': [
                ('editorial', 'hero-waterfront-couple.jpg'),
                ('products', 'sr-01-lifestyle.jpg'),
                ('products', 'sr-02-hover.jpg'),
                ('products', 'sr-10-hover.jpg')
            ],
            '04-couple-walking-nyc-back.jpg': [
                ('editorial', 'couple-walking-back.jpg'),
                ('products', 'sr-08-hover.jpg')
            ],
            '05-couple-suits-nyc.jpg': [
                ('editorial', 'tailoring-couple-suits.jpg'),
                ('products', 'sr-04-front.jpg'),
                ('products', 'sr-05-hover.jpg')
            ],
            '06-female-streetwear-nyc.jpg': [
                ('editorial', 'female-streetwear-blazer.jpg'),
                ('products', 'sr-05-front.jpg')
            ],
            '07-male-streetwear-nyc.jpg': [
                ('editorial', 'male-streetwear-trousers.jpg'),
                ('products', 'sr-06-front.jpg'),
                ('products', 'sr-03-hover.jpg'),
                ('products', 'sr-07-hover.jpg')
            ],
            '08-female-hoodie-editorial.jpg': [
                ('editorial', 'female-hoodie-portrait.jpg'),
                ('products', 'sr-01-hover.jpg'),
                ('products', 'sr-09-hover.jpg')
            ],
            '09-black-hoodie-hanger-front.jpg': [
                ('products', 'sr-01-front.jpg'),
                ('products', 'sr-08-front.jpg')
            ],
            '10-black-hoodie-hanger-back.jpg': [
                ('products', 'sr-01-back.jpg'),
                ('products', 'sr-08-back.jpg')
            ],
            '11-cream-tee-hanger.jpg': [
                ('products', 'sr-03-front.jpg'),
                ('products', 'sr-03-back.jpg')
            ],
            '12-clothing-rack-studio.jpg': [
                ('editorial', 'studio-rack-craft.jpg'),
                ('products', 'sr-04-hover.jpg'),
                ('products', 'sr-06-hover.jpg'),
                ('products', 'sr-10-front.jpg')
            ],
            '13-cream-hoodie-hanger.jpg': [
                ('products', 'sr-02-front.jpg'),
                ('products', 'sr-02-back.jpg')
            ],
            '14-black-joggers-hanger.jpg': [
                ('products', 'sr-07-front.jpg'),
                ('products', 'sr-07-back.jpg')
            ],
            '15-black-cap-studio.jpg': [
                ('products', 'sr-09-front.jpg'),
                ('products', 'sr-09-back.jpg')
            ],
            '16-woven-label-detail.jpg': [
                ('editorial', 'woven-label-macro.jpg'),
                ('products', 'sr-detail.jpg'),
                ('products', 'sr-01-detail.jpg'),
                ('products', 'sr-02-detail.jpg'),
                ('products', 'sr-03-detail.jpg'),
                ('products', 'sr-04-detail.jpg'),
                ('products', 'sr-05-detail.jpg'),
                ('products', 'sr-06-detail.jpg'),
                ('products', 'sr-07-detail.jpg'),
                ('products', 'sr-08-detail.jpg'),
                ('products', 'sr-09-detail.jpg'),
                ('products', 'sr-10-detail.jpg')
            ]
        }

        for src_name, targets in asset_map.items():
            full_src = f'skyline-religion-separate-images/{src_name}'
            raw_bytes = zf.read(full_src)
            img = Image.open(io.BytesIO(raw_bytes)).convert('RGB')

            for folder, filename in targets:
                dest_dir = EDITORIAL_DIR if folder == 'editorial' else PRODUCTS_DIR
                dest_path = os.path.join(dest_dir, filename)
                img.save(dest_path, 'JPEG', quality=93, optimize=True)
                print(f"Saved {folder}/{filename} ({img.size[0]}x{img.size[1]})")

    print("\nAsset pipeline execution completed successfully!")

if __name__ == '__main__':
    process_pipeline()
