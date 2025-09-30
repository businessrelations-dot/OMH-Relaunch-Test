# Figma Asset Download Scripts

This directory contains comprehensive scripts to download all Figma assets from localhost URLs based on the `asset-inventory.json` file.

## Overview

The scripts will download 39 total assets across 5 categories:
- **Customer Avatars** (10 files) → `assets/raw/avatars/`
- **Hero Images** (4 files) → `assets/raw/heroes/`
- **Partner Logos** (15 files) → `assets/raw/logos/`
- **Navigation Icons** (4 files) → `assets/raw/icons/`
- **Background Patterns** (6 files) → `assets/raw/patterns/`

## Available Scripts

### 1. Python Script (Recommended)
**File:** `download-assets.py`

**Features:**
- Comprehensive error handling and retry logic
- Detailed JSON download logs
- Progress reporting with file sizes
- Security checks for localhost-only URLs
- Cross-platform compatibility

**Usage:**
```bash
python download-assets.py
```

**Requirements:**
- Python 3.6+
- No additional packages required (uses only standard library)

### 2. Bash Script (Linux/Mac/WSL)
**File:** `download-assets.sh`

**Features:**
- Shell-based implementation
- Colored output for better readability
- Uses curl or wget for downloads
- Detailed text logs

**Usage:**
```bash
./download-assets.sh
```

**Requirements:**
- Bash shell
- Python 3 (for JSON parsing)
- curl or wget
- Unix-like environment (Linux, macOS, WSL)

### 3. Windows Batch Script
**File:** `download-assets.bat`

**Features:**
- Windows-native batch file
- Automatically runs the Python script
- Windows-friendly error messages

**Usage:**
- Double-click the file in Explorer, or
- Run from Command Prompt: `download-assets.bat`

**Requirements:**
- Windows OS
- Python 3 installed and in PATH

## Prerequisites

### Required Files
- `assets/asset-inventory.json` - Contains all asset URLs and metadata
- Figma localhost server running on port 3845

### Directory Structure
The scripts expect and will create this structure:
```
omh-landing/
├── assets/
│   ├── asset-inventory.json
│   └── raw/
│       ├── avatars/
│       ├── heroes/
│       ├── logos/
│       ├── icons/
│       └── patterns/
├── download-assets.py
├── download-assets.sh
└── download-assets.bat
```

## Security Features

All scripts include security measures:
- **Localhost-only downloads**: Only downloads from `http://localhost:` URLs
- **URL validation**: Skips any non-localhost URLs for security
- **File overwrite protection**: Warns when overwriting existing files

## Output and Logging

### Python Script Logs
Creates detailed JSON logs: `download-log-YYYYMMDD-HHMMSS.json`

Example log structure:
```json
{
  "download_session": {
    "timestamp": "2024-01-15T10:30:00",
    "statistics": {
      "total": 39,
      "successful": 38,
      "failed": 1,
      "skipped": 0
    },
    "downloads": [
      {
        "timestamp": "2024-01-15T10:30:01",
        "category": "customer_avatars",
        "asset_id": "imgImage246",
        "url": "http://localhost:3845/assets/...",
        "target_file": "/path/to/customer-avatar-1.png",
        "success": true,
        "message": "Downloaded 15,234 bytes"
      }
    ]
  }
}
```

### Console Output
All scripts provide real-time progress updates:
```
🚀 Starting Figma Asset Download
📍 Base directory: /path/to/assets
📝 Inventory file: /path/to/asset-inventory.json

🔄 Processing Customer Avatars...
⬇️  Downloading: Customer testimonial avatar 1
   URL: http://localhost:3845/assets/1225fb75873dc0691713fc3356a501966b05f990.png
   Target: /path/to/assets/raw/avatars/customer-avatar-1.png
   ✅ Success! Downloaded 15,234 bytes

📊 DOWNLOAD SUMMARY
================================================================
Total assets processed: 39
Successful downloads: 38
Failed downloads: 1
Skipped assets: 0
Success rate: 97.4%
```

## Error Handling

The scripts handle various error scenarios:

### Network Errors
- Connection timeouts (30-60 second limits)
- HTTP errors (404, 500, etc.)
- DNS resolution failures

### File System Errors
- Permission denied
- Disk space issues
- Path not found

### Data Errors
- Invalid JSON in inventory file
- Missing required fields
- Malformed URLs

## Troubleshooting

### Common Issues

**1. "Asset inventory file not found"**
- Ensure `assets/asset-inventory.json` exists
- Check that you're running the script from the correct directory

**2. "Python not found" (Windows)**
- Install Python 3 from python.org
- Ensure Python is added to your PATH during installation

**3. "Connection refused" or "Cannot connect"**
- Ensure the Figma localhost server is running on port 3845
- Check that the URLs in the inventory file are correct

**4. "Permission denied"**
- Check write permissions for the assets directory
- Run with appropriate privileges if needed

### Manual Download
If scripts fail, you can manually download assets:
1. Start your Figma localhost server
2. Open the asset-inventory.json file
3. Copy individual URLs and download with your browser
4. Save files with the correct `target_filename` in the appropriate subdirectory

## File Naming Convention

Assets are downloaded with standardized names:
- Customer avatars: `customer-avatar-1.png` through `customer-avatar-10.png`
- Hero images: `hero-image-1.png` through `hero-image-4.png`
- Partner logos: `partner-[company].png` (e.g., `partner-samsung.png`)
- Navigation icons: Descriptive names (e.g., `omh-logo-main.svg`, `play-button.svg`)
- Background patterns: `stairs-pattern-1.svg` through `stairs-pattern-5.svg`, `divider-line.svg`

## Next Steps

After successful download:
1. Review the download logs for any failures
2. Verify all expected files are present in the `/raw/` subdirectories
3. Run your image optimization pipeline if available
4. Update your application to use the local asset files instead of placeholders

## Support

For issues with these scripts:
1. Check the download logs for specific error messages
2. Ensure all prerequisites are met
3. Verify the Figma localhost server is accessible
4. Test manual download of a single asset URL to isolate issues