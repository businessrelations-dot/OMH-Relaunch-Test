#!/bin/bash

# Figma Asset Download Script (Bash Version)
# Downloads all assets from localhost URLs based on asset-inventory.json

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INVENTORY_FILE="${SCRIPT_DIR}/assets/asset-inventory.json"
ASSETS_DIR="${SCRIPT_DIR}/assets"
LOG_FILE="${ASSETS_DIR}/download-log-$(date +%Y%m%d-%H%M%S).txt"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Statistics
TOTAL_COUNT=0
SUCCESS_COUNT=0
FAILED_COUNT=0
SKIPPED_COUNT=0

# Function to log messages
log_message() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] $1" | tee -a "$LOG_FILE"
}

# Function to print colored output
print_status() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
    log_message "$message"
}

# Function to download a single file
download_file() {
    local url="$1"
    local output_path="$2"
    local description="$3"

    ((TOTAL_COUNT++))

    print_status "$BLUE" "⬇️  Downloading: $description"
    print_status "$BLUE" "   URL: $url"
    print_status "$BLUE" "   Target: $output_path"

    # Check if URL is localhost (security check)
    if [[ ! "$url" =~ ^http://localhost: ]]; then
        print_status "$YELLOW" "   ⚠️  Non-localhost URL detected, skipping for security..."
        ((SKIPPED_COUNT++))
        return 1
    fi

    # Check if file already exists
    if [[ -f "$output_path" ]]; then
        print_status "$YELLOW" "   ⚠️  File already exists, overwriting..."
    fi

    # Create directory if it doesn't exist
    mkdir -p "$(dirname "$output_path")"

    # Download with curl (with fallback to wget)
    if command -v curl >/dev/null 2>&1; then
        if curl -L -f -s -o "$output_path" \
           -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
           --connect-timeout 30 \
           --max-time 60 \
           "$url"; then
            local file_size=$(stat -f%z "$output_path" 2>/dev/null || stat -c%s "$output_path" 2>/dev/null || echo "unknown")
            print_status "$GREEN" "   ✅ Success! Downloaded $file_size bytes"
            ((SUCCESS_COUNT++))
            return 0
        else
            print_status "$RED" "   ❌ curl download failed"
            ((FAILED_COUNT++))
            return 1
        fi
    elif command -v wget >/dev/null 2>&1; then
        if wget -q -O "$output_path" \
           --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
           --timeout=30 \
           "$url"; then
            local file_size=$(stat -f%z "$output_path" 2>/dev/null || stat -c%s "$output_path" 2>/dev/null || echo "unknown")
            print_status "$GREEN" "   ✅ Success! Downloaded $file_size bytes"
            ((SUCCESS_COUNT++))
            return 0
        else
            print_status "$RED" "   ❌ wget download failed"
            ((FAILED_COUNT++))
            return 1
        fi
    else
        print_status "$RED" "   ❌ Neither curl nor wget is available"
        ((FAILED_COUNT++))
        return 1
    fi
}

# Function to process JSON and extract asset information
process_assets() {
    local category="$1"
    local target_dir="$2"

    print_status "$BLUE" "🔄 Processing $category..."

    # Create target directory
    mkdir -p "$target_dir"

    # Extract assets for this category using Python to parse JSON
    python3 -c "
import json
import sys

try:
    with open('$INVENTORY_FILE', 'r') as f:
        data = json.load(f)

    category_assets = data.get('figma_assets', {}).get('$category', {})

    for asset_id, asset_info in category_assets.items():
        url = asset_info.get('url', '')
        target_filename = asset_info.get('target_filename', f'{asset_id}.png')
        description = asset_info.get('description', f'{asset_id}')

        if url:
            print(f'{url}|{target_filename}|{description}')
except Exception as e:
    print(f'Error processing JSON: {e}', file=sys.stderr)
    sys.exit(1)
" | while IFS='|' read -r url target_filename description; do
        if [[ -n "$url" ]]; then
            output_path="${target_dir}/${target_filename}"
            download_file "$url" "$output_path" "$description"

            # Small delay to be respectful to the server
            sleep 0.1
        fi
    done
}

# Function to print summary
print_summary() {
    echo ""
    echo "============================================================"
    print_status "$BLUE" "📊 DOWNLOAD SUMMARY"
    echo "============================================================"
    print_status "$BLUE" "Total assets processed: $TOTAL_COUNT"
    print_status "$GREEN" "Successful downloads: $SUCCESS_COUNT"
    print_status "$RED" "Failed downloads: $FAILED_COUNT"
    print_status "$YELLOW" "Skipped assets: $SKIPPED_COUNT"

    if [[ $TOTAL_COUNT -gt 0 ]]; then
        local success_rate=$((SUCCESS_COUNT * 100 / TOTAL_COUNT))
        print_status "$BLUE" "Success rate: ${success_rate}%"
    fi

    echo ""
    print_status "$BLUE" "📋 Full log saved to: $LOG_FILE"
}

# Main execution
main() {
    print_status "$BLUE" "🚀 Starting Figma Asset Download"
    print_status "$BLUE" "📍 Base directory: $ASSETS_DIR"
    print_status "$BLUE" "📝 Inventory file: $INVENTORY_FILE"

    # Check if inventory file exists
    if [[ ! -f "$INVENTORY_FILE" ]]; then
        print_status "$RED" "❌ Error: Asset inventory file not found at $INVENTORY_FILE"
        print_status "$RED" "Please ensure the asset-inventory.json file exists in the assets/ directory."
        exit 1
    fi

    # Check if Python is available for JSON processing
    if ! command -v python3 >/dev/null 2>&1; then
        print_status "$RED" "❌ Error: Python 3 is required for JSON processing"
        exit 1
    fi

    # Initialize log file
    echo "Figma Asset Download Log - $(date)" > "$LOG_FILE"

    # Create base directories
    mkdir -p "${ASSETS_DIR}/raw/avatars"
    mkdir -p "${ASSETS_DIR}/raw/heroes"
    mkdir -p "${ASSETS_DIR}/raw/logos"
    mkdir -p "${ASSETS_DIR}/raw/icons"
    mkdir -p "${ASSETS_DIR}/raw/patterns"

    print_status "$GREEN" "📁 Directories ready"

    # Process each category
    process_assets "customer_avatars" "${ASSETS_DIR}/raw/avatars"
    process_assets "hero_images" "${ASSETS_DIR}/raw/heroes"
    process_assets "partner_logos" "${ASSETS_DIR}/raw/logos"
    process_assets "navigation_icons" "${ASSETS_DIR}/raw/icons"
    process_assets "background_patterns" "${ASSETS_DIR}/raw/patterns"

    # Print summary
    print_summary

    if [[ $FAILED_COUNT -eq 0 ]]; then
        print_status "$GREEN" "🎉 All downloads completed successfully!"
        exit 0
    else
        print_status "$YELLOW" "⚠️  Some downloads failed. Please check the log and retry if needed."
        exit 1
    fi
}

# Run main function
main "$@"