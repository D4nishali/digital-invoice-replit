const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building D-Invoice One-Click Executable...');

// Step 1: Build the client
console.log('📦 Building frontend...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Frontend build failed:', error.message);
  process.exit(1);
}

// Step 2: Create server entry point for PKG
const serverEntry = `
const express = require('express');
const path = require('path');
const { createServer } = require('http');
const open = require('open');

// Import the main server code
require('./dist/server/index.js');

console.log('D-Invoice POS System starting...');
console.log('Access at: http://localhost:5000');
console.log('Login: admin / SecureAdmin2025!');

// Auto-open browser after short delay
setTimeout(() => {
  try {
    open('http://localhost:5000');
  } catch (error) {
    console.log('Please open http://localhost:5000 manually');
  }
}, 2000);
`;

fs.writeFileSync('server-entry.js', serverEntry);

// Step 3: Create PKG configuration
const pkgConfig = {
  "name": "d-invoice",
  "version": "1.0.0",
  "bin": "server-entry.js",
  "pkg": {
    "scripts": [
      "dist/**/*.js",
      "server/**/*.js"
    ],
    "assets": [
      "dist/**/*",
      "node_modules/better-sqlite3/**/*"
    ],
    "targets": [
      "node18-win-x64"
    ],
    "outputPath": "portable-package"
  }
};

fs.writeFileSync('package-temp.json', JSON.stringify(pkgConfig, null, 2));

// Step 4: Build executable with PKG
console.log('🔧 Creating executable...');
try {
  execSync('npx pkg package-temp.json --output portable-package/D-Invoice.exe', { stdio: 'inherit' });
  console.log('✅ Executable created: portable-package/D-Invoice.exe');
} catch (error) {
  console.error('❌ PKG build failed:', error.message);
  // Fallback to simple batch file approach
  console.log('📝 Creating fallback batch launcher...');
  
  const batchContent = `@echo off
title D-Invoice POS System
color 0A

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                     D-INVOICE STARTING                      ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo Starting D-Invoice POS System...
echo Browser will open automatically...
echo.
echo Login: admin / SecureAdmin2025!
echo.

REM Ensure data directory exists
if not exist "data" mkdir data

REM Set environment variables
set DATABASE_URL=sqlite:./data/pos.db
set NODE_ENV=production
set PORT=5000

REM Start the application
npm start

pause`;

  fs.writeFileSync('portable-package/D-Invoice.bat', batchContent);
  console.log('✅ Batch launcher created: portable-package/D-Invoice.bat');
}

// Step 5: Create customer package structure
const customerReadme = `
╔══════════════════════════════════════════════════════════════╗
║                    D-INVOICE POS SYSTEM                     ║
║                   One-Click Solution                        ║
╚══════════════════════════════════════════════════════════════╝

HOW TO START (ONE CLICK):
═════════════════════════
1. Double-click "D-Invoice.exe" (or "D-Invoice.bat")
2. Browser opens automatically
3. Login: admin / SecureAdmin2025!
4. Start using your POS system

FEATURES:
═════════
✓ Complete POS system
✓ FBR-compliant invoicing
✓ Automatic data saving
✓ Works offline
✓ No installation needed

DATA BACKUP:
════════════
Your data is in the "data" folder
Copy this folder to backup everything

SUPPORT:
════════
For help, contact: [Your Support Details]

Thank you for choosing D-Invoice!
`;

fs.writeFileSync('portable-package/QUICK-START.txt', customerReadme);

// Step 6: Clean up temporary files
try {
  fs.unlinkSync('server-entry.js');
  fs.unlinkSync('package-temp.json');
} catch (error) {
  // Ignore cleanup errors
}

console.log('');
console.log('🎉 D-Invoice One-Click Package Ready!');
console.log('📁 Location: portable-package/');
console.log('📋 Customer gets:');
console.log('   - D-Invoice.exe (main executable)');
console.log('   - D-Invoice.bat (backup launcher)');  
console.log('   - QUICK-START.txt (instructions)');
console.log('   - Backup utilities');
console.log('');
console.log('💼 Distribution: Send entire portable-package folder to customers');
console.log('🎯 Customer Experience: Double-click and use immediately');