#!/usr/bin/env python3
"""
Figma Asset Download Script
Downloads all assets from localhost URLs based on asset-inventory.json
"""

import json
import os
import urllib.request
import urllib.error
import sys
from datetime import datetime
from pathlib import Path
import time

class AssetDownloader:
    def __init__(self, inventory_file, base_dir):
        """Initialize the asset downloader"""
        self.inventory_file = inventory_file
        self.base_dir = Path(base_dir)
        self.download_log = []
        self.stats = {
            'total': 0,
            'successful': 0,
            'failed': 0,
            'skipped': 0
        }

        # Directory mapping for different asset types
        self.dir_mapping = {
            'customer_avatars': 'raw/avatars',
            'hero_images': 'raw/heroes',
            'partner_logos': 'raw/logos',
            'navigation_icons': 'raw/icons',
            'background_patterns': 'raw/patterns'
        }

    def load_inventory(self):
        """Load the asset inventory JSON file"""
        try:
            with open(self.inventory_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            return data.get('figma_assets', {})
        except FileNotFoundError:
            print(f"❌ Error: Asset inventory file not found: {self.inventory_file}")
            sys.exit(1)
        except json.JSONDecodeError as e:
            print(f"❌ Error: Invalid JSON in inventory file: {e}")
            sys.exit(1)

    def ensure_directories(self):
        """Create necessary directories if they don't exist"""
        for category, rel_path in self.dir_mapping.items():
            full_path = self.base_dir / rel_path
            full_path.mkdir(parents=True, exist_ok=True)
            print(f"📁 Directory ready: {full_path}")

    def download_file(self, url, output_path, description=""):
        """Download a single file with error handling"""
        try:
            print(f"⬇️  Downloading: {description}")
            print(f"   URL: {url}")
            print(f"   Target: {output_path}")

            # Check if file already exists
            if output_path.exists():
                print(f"   ⚠️  File already exists, overwriting...")

            # Create request with user agent
            req = urllib.request.Request(url)
            req.add_header('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')

            # Download with timeout
            with urllib.request.urlopen(req, timeout=30) as response:
                content = response.read()

                # Write to file
                with open(output_path, 'wb') as f:
                    f.write(content)

                file_size = len(content)
                print(f"   ✅ Success! Downloaded {file_size:,} bytes")

                return True, f"Downloaded {file_size:,} bytes"

        except urllib.error.HTTPError as e:
            error_msg = f"HTTP Error {e.code}: {e.reason}"
            print(f"   ❌ {error_msg}")
            return False, error_msg

        except urllib.error.URLError as e:
            error_msg = f"URL Error: {e.reason}"
            print(f"   ❌ {error_msg}")
            return False, error_msg

        except Exception as e:
            error_msg = f"Unexpected error: {str(e)}"
            print(f"   ❌ {error_msg}")
            return False, error_msg

    def process_category(self, category_name, assets):
        """Process all assets in a category"""
        print(f"\n🔄 Processing {category_name.replace('_', ' ').title()}...")

        if category_name not in self.dir_mapping:
            print(f"   ⚠️  Unknown category: {category_name}, skipping...")
            return

        target_dir = self.base_dir / self.dir_mapping[category_name]
        category_stats = {'total': 0, 'successful': 0, 'failed': 0}

        for asset_id, asset_info in assets.items():
            self.stats['total'] += 1
            category_stats['total'] += 1

            url = asset_info.get('url', '')
            target_filename = asset_info.get('target_filename', f'{asset_id}.png')
            description = asset_info.get('description', f'{asset_id}')

            if not url:
                print(f"   ⚠️  No URL found for {asset_id}, skipping...")
                self.stats['skipped'] += 1
                continue

            # Skip non-localhost URLs for safety
            if not url.startswith('http://localhost:'):
                print(f"   ⚠️  Non-localhost URL detected for {asset_id}, skipping for security...")
                self.stats['skipped'] += 1
                continue

            output_path = target_dir / target_filename

            success, message = self.download_file(url, output_path, description)

            # Log the result
            log_entry = {
                'timestamp': datetime.now().isoformat(),
                'category': category_name,
                'asset_id': asset_id,
                'url': url,
                'target_file': str(output_path),
                'description': description,
                'success': success,
                'message': message
            }
            self.download_log.append(log_entry)

            if success:
                self.stats['successful'] += 1
                category_stats['successful'] += 1
            else:
                self.stats['failed'] += 1
                category_stats['failed'] += 1

            # Small delay to be respectful to the server
            time.sleep(0.1)

        print(f"   📊 Category summary: {category_stats['successful']}/{category_stats['total']} successful")

    def save_download_log(self):
        """Save the download log to a JSON file"""
        log_file = self.base_dir / f"download-log-{datetime.now().strftime('%Y%m%d-%H%M%S')}.json"

        log_data = {
            'download_session': {
                'timestamp': datetime.now().isoformat(),
                'inventory_file': str(self.inventory_file),
                'base_directory': str(self.base_dir),
                'statistics': self.stats,
                'downloads': self.download_log
            }
        }

        try:
            with open(log_file, 'w', encoding='utf-8') as f:
                json.dump(log_data, f, indent=2, ensure_ascii=False)
            print(f"📋 Download log saved: {log_file}")
        except Exception as e:
            print(f"⚠️  Warning: Could not save download log: {e}")

    def print_summary(self):
        """Print final download summary"""
        print(f"\n{'='*60}")
        print(f"📊 DOWNLOAD SUMMARY")
        print(f"{'='*60}")
        print(f"Total assets processed: {self.stats['total']}")
        print(f"Successful downloads: {self.stats['successful']}")
        print(f"Failed downloads: {self.stats['failed']}")
        print(f"Skipped assets: {self.stats['skipped']}")

        if self.stats['total'] > 0:
            success_rate = (self.stats['successful'] / self.stats['total']) * 100
            print(f"Success rate: {success_rate:.1f}%")

        if self.stats['failed'] > 0:
            print(f"\n⚠️  {self.stats['failed']} downloads failed. Check the log for details.")
            print("Failed downloads:")
            for log_entry in self.download_log:
                if not log_entry['success']:
                    print(f"   • {log_entry['asset_id']}: {log_entry['message']}")

    def run(self):
        """Run the complete download process"""
        print("🚀 Starting Figma Asset Download")
        print(f"📍 Base directory: {self.base_dir}")
        print(f"📝 Inventory file: {self.inventory_file}")

        # Load inventory
        assets = self.load_inventory()
        print(f"📦 Found {len(assets)} asset categories")

        # Ensure directories exist
        self.ensure_directories()

        # Process each category
        for category_name, category_assets in assets.items():
            self.process_category(category_name, category_assets)

        # Save log and print summary
        self.save_download_log()
        self.print_summary()

        return self.stats['failed'] == 0


def main():
    """Main function"""
    # Configuration
    script_dir = Path(__file__).parent
    inventory_file = script_dir / "assets" / "asset-inventory.json"
    base_dir = script_dir / "assets"

    # Check if inventory file exists
    if not inventory_file.exists():
        print(f"❌ Error: Asset inventory file not found at {inventory_file}")
        print("Please ensure the asset-inventory.json file exists in the assets/ directory.")
        sys.exit(1)

    # Create downloader and run
    downloader = AssetDownloader(inventory_file, base_dir)
    success = downloader.run()

    if success:
        print("\n🎉 All downloads completed successfully!")
        sys.exit(0)
    else:
        print("\n⚠️  Some downloads failed. Please check the log and retry if needed.")
        sys.exit(1)


if __name__ == "__main__":
    main()