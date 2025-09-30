@echo off
setlocal EnableDelayedExpansion

rem Figma Asset Download Script (Windows Batch Version)
rem Downloads all assets from localhost URLs based on asset-inventory.json

echo 🚀 Starting Figma Asset Download (Windows)
echo.

rem Configuration
set "SCRIPT_DIR=%~dp0"
set "INVENTORY_FILE=%SCRIPT_DIR%assets\asset-inventory.json"
set "ASSETS_DIR=%SCRIPT_DIR%assets"

rem Check if inventory file exists
if not exist "%INVENTORY_FILE%" (
    echo ❌ Error: Asset inventory file not found at %INVENTORY_FILE%
    echo Please ensure the asset-inventory.json file exists in the assets\ directory.
    pause
    exit /b 1
)

rem Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Python is required but not found in PATH
    echo Please install Python 3 and ensure it's in your PATH
    pause
    exit /b 1
)

echo 📍 Base directory: %ASSETS_DIR%
echo 📝 Inventory file: %INVENTORY_FILE%
echo.

rem Create directories
mkdir "%ASSETS_DIR%\raw\avatars" 2>nul
mkdir "%ASSETS_DIR%\raw\heroes" 2>nul
mkdir "%ASSETS_DIR%\raw\logos" 2>nul
mkdir "%ASSETS_DIR%\raw\icons" 2>nul
mkdir "%ASSETS_DIR%\raw\patterns" 2>nul

echo 📁 Directories ready
echo.

rem Run the Python script
echo 🔄 Running Python download script...
python "%SCRIPT_DIR%download-assets.py"

if errorlevel 1 (
    echo.
    echo ⚠️  Download script completed with errors.
    echo Check the download log for details.
) else (
    echo.
    echo 🎉 All downloads completed successfully!
)

echo.
echo Press any key to exit...
pause >nul