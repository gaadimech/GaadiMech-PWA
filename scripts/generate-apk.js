#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Configuration for the TWA
const config = {
  packageId: 'com.gaadimech.app',
  name: 'GaadiMech',
  launcherName: 'GaadiMech',
  displayMode: 'standalone',
  orientation: 'portrait',
  themeColor: '#FF7200',
  backgroundColor: '#FFFFFF',
  startUrl: '/',
  iconUrl: '/images/Logo-OLD.png',
  maskableIconUrl: '/images/Logo-OLD.png',
  monochromeIconUrl: '/images/Logo-OLD.png',
  splashScreenFadeOutDuration: 300,
  signingKey: {
    path: './android.keystore',
    alias: 'gaadimech'
  },
  // Default values for PWA requirements
  shortcuts: [
    {
      name: 'Book Service',
      shortName: 'Book',
      url: '/?action=book',
      iconUrl: '/images/Logo-OLD.png'
    },
    {
      name: 'Emergency',
      shortName: 'Emergency', 
      url: '/?action=emergency',
      iconUrl: '/images/Logo-OLD.png'
    }
  ]
};

function generateAPK(websiteUrl) {
  if (!websiteUrl) {
    console.error('❌ Please provide the website URL as an argument');
    console.log('Usage: node scripts/generate-apk.js https://your-domain.com');
    process.exit(1);
  }

  console.log('🚀 Starting APK generation for GaadiMech PWA...');
  console.log(`📱 Website URL: ${websiteUrl}`);

  try {
    // Create Android project directory
    const androidDir = 'android-app';
    if (fs.existsSync(androidDir)) {
      console.log('🧹 Cleaning existing Android project...');
      execSync(`rm -rf ${androidDir}`);
    }

    // Initialize Bubblewrap project
    console.log('📦 Initializing Bubblewrap project...');
    execSync(`bubblewrap init --manifest ${websiteUrl}/manifest.webmanifest ${androidDir}`, {
      stdio: 'inherit'
    });

    // Navigate to Android directory
    process.chdir(androidDir);

    // Build the APK
    console.log('🔨 Building APK...');
    execSync('bubblewrap build', {
      stdio: 'inherit'
    });

    // Copy APK to Generated Apk folder
    console.log('📁 Copying APK to Generated Apk folder...');
    const sourceApk = './app/build/outputs/apk/release/app-release-unsigned.apk';
    const targetDir = '../Generated Apk';
    const targetApk = `${targetDir}/gaadimech-app-beta.apk`;
    
    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Copy the APK file
    if (fs.existsSync(sourceApk)) {
      fs.copyFileSync(sourceApk, targetApk);
      console.log('✅ APK generated and copied successfully!');
      console.log(`📁 APK location: ${targetApk}`);
      console.log(`📱 Original APK: ./android-app/app/build/outputs/apk/release/app-release-unsigned.apk`);
    } else {
      console.log('⚠️  APK file not found at expected location, but build completed');
      console.log('📁 Check: ./android-app/app/build/outputs/apk/release/ for APK files');
    }
    
    console.log('');
    console.log('📋 Next steps for beta testing:');
    console.log('1. Sign the APK (optional for testing):');
    console.log('   - Generate keystore: keytool -genkey -v -keystore android.keystore -alias gaadimech -keyalg RSA -keysize 2048 -validity 10000');
    console.log('   - Sign APK: jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore android.keystore gaadimech-app-beta.apk gaadimech');
    console.log('2. Install on device: adb install "Generated Apk/gaadimech-app-beta.apk"');
    console.log('3. Or share the APK file from "Generated Apk" folder for manual installation');

  } catch (error) {
    console.error('❌ Error generating APK:', error.message);
    process.exit(1);
  }
}

// Get website URL from command line arguments
const websiteUrl = process.argv[2];
generateAPK(websiteUrl); 