#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const apkFolder = 'Generated Apk';
const apkFile = 'gaadimech-app-beta.apk';
const apkPath = path.join(apkFolder, apkFile);

console.log('🔍 Checking for generated APK files...\n');

if (!fs.existsSync(apkFolder)) {
  console.log('❌ Generated Apk folder not found');
  console.log('💡 Run "npm run generate-apk [URL]" to create APK files');
  process.exit(1);
}

const files = fs.readdirSync(apkFolder);
const apkFiles = files.filter(file => file.endsWith('.apk'));

if (apkFiles.length === 0) {
  console.log('📂 Generated Apk folder exists but no APK files found');
  console.log('💡 Run "npm run generate-apk [URL]" to create APK files');
  process.exit(0);
}

console.log('✅ APK files found:');
apkFiles.forEach(file => {
  const filePath = path.join(apkFolder, file);
  const stats = fs.statSync(filePath);
  const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
  const lastModified = stats.mtime.toLocaleString();
  
  console.log(`📱 ${file}`);
  console.log(`   Size: ${sizeInMB} MB`);
  console.log(`   Modified: ${lastModified}`);
  console.log('');
});

console.log('📋 Quick actions:');
console.log(`📱 Install on device: adb install "${apkPath}"`);
console.log(`📁 Share APK: Open "${apkFolder}" folder and share the APK file`);
console.log(`🔨 Generate new APK: npm run generate-apk [YOUR_DEPLOYED_URL]`);

if (fs.existsSync(apkPath)) {
  console.log('\n✅ Ready for beta testing!');
} else {
  console.log('\n💡 Main APK file not found. Check available files above.');
} 