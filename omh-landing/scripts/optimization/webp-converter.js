#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

class WebPConverter {
  constructor(options = {}) {
    this.quality = options.quality || 85;
    this.inputDir = options.inputDir || 'assets/raw';
    this.outputDir = options.outputDir || 'assets/optimized/webp';
    this.stats = {
      processed: 0,
      originalSize: 0,
      optimizedSize: 0,
      savings: 0
    };
  }

  async convertImage(inputPath, outputPath) {
    try {
      // Get original file size
      const originalStats = await fs.stat(inputPath);
      this.stats.originalSize += originalStats.size;

      // Convert to WebP
      await sharp(inputPath)
        .webp({
          quality: this.quality,
          effort: 6, // Higher effort for better compression
          smartSubsample: true
        })
        .toFile(outputPath);

      // Get optimized file size
      const optimizedStats = await fs.stat(outputPath);
      this.stats.optimizedSize += optimizedStats.size;
      this.stats.processed++;

      const savings = ((originalStats.size - optimizedStats.size) / originalStats.size) * 100;

      console.log(chalk.green(`✓ ${path.basename(inputPath)} → ${path.basename(outputPath)}`));
      console.log(chalk.gray(`  ${this.formatBytes(originalStats.size)} → ${this.formatBytes(optimizedStats.size)} (${savings.toFixed(1)}% saved)`));

      return {
        originalSize: originalStats.size,
        optimizedSize: optimizedStats.size,
        savings: savings
      };
    } catch (error) {
      console.log(chalk.red(`✗ Failed to convert ${inputPath}: ${error.message}`));
      throw error;
    }
  }

  async convertAll() {
    console.log(chalk.blue('🔄 Starting WebP conversion...'));

    // Ensure output directory exists
    await fs.ensureDir(this.outputDir);

    // Find all PNG and JPG files
    const patterns = [
      path.join(this.inputDir, '**/*.png'),
      path.join(this.inputDir, '**/*.jpg'),
      path.join(this.inputDir, '**/*.jpeg')
    ];

    let allFiles = [];
    for (const pattern of patterns) {
      const files = glob.sync(pattern);
      allFiles = allFiles.concat(files);
    }

    if (allFiles.length === 0) {
      console.log(chalk.yellow('⚠️  No PNG/JPG files found in ' + this.inputDir));
      return this.stats;
    }

    console.log(chalk.blue(`📁 Found ${allFiles.length} image(s) to convert`));

    // Convert each file
    for (const inputPath of allFiles) {
      const relativePath = path.relative(this.inputDir, inputPath);
      const outputName = path.basename(inputPath, path.extname(inputPath)) + '.webp';
      const outputPath = path.join(this.outputDir, path.dirname(relativePath), outputName);

      // Ensure output subdirectory exists
      await fs.ensureDir(path.dirname(outputPath));

      try {
        await this.convertImage(inputPath, outputPath);
      } catch (error) {
        // Continue with other files even if one fails
        continue;
      }
    }

    this.stats.savings = this.stats.originalSize > 0
      ? ((this.stats.originalSize - this.stats.optimizedSize) / this.stats.originalSize) * 100
      : 0;

    this.printSummary();
    return this.stats;
  }

  printSummary() {
    console.log(chalk.blue('\n📊 WebP Conversion Summary:'));
    console.log(chalk.white(`   Files processed: ${this.stats.processed}`));
    console.log(chalk.white(`   Original size: ${this.formatBytes(this.stats.originalSize)}`));
    console.log(chalk.white(`   Optimized size: ${this.formatBytes(this.stats.optimizedSize)}`));
    console.log(chalk.green(`   Total savings: ${this.formatBytes(this.stats.originalSize - this.stats.optimizedSize)} (${this.stats.savings.toFixed(1)}%)`));
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {};

  // Parse command line arguments
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    const value = args[i + 1];

    switch (key) {
      case '--quality':
        options.quality = parseInt(value);
        break;
      case '--input':
        options.inputDir = value;
        break;
      case '--output':
        options.outputDir = value;
        break;
    }
  }

  const converter = new WebPConverter(options);
  converter.convertAll().catch(console.error);
}

module.exports = WebPConverter;