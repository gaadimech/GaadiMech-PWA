# GaadiMech PWA & APK Generation Guide

This guide explains how to build and deploy the GaadiMech Progressive Web App (PWA) and generate an APK file for beta testing.

## 🚀 PWA Features

- **Offline Support**: Service Worker caches essential resources
- **App-like Experience**: Standalone display mode
- **Fast Loading**: Optimized caching strategies
- **Push Notifications**: Ready for future implementation
- **Add to Home Screen**: Users can install the app on their devices

## 📱 PWA Configuration

The PWA is configured with:
- **App Name**: GaadiMech - Car Service & Repair
- **Theme Color**: #FF7200 (Orange)
- **Background Color**: #FFFFFF (White)
- **Display Mode**: Standalone
- **Orientation**: Portrait
- **Icons**: Multiple sizes using existing logo
- **Shortcuts**: Quick actions for booking and emergency services

## 📁 Project Structure

```
website-ui/
├── Generated Apk/              # 📱 Your APK files will be here
│   ├── README.md              # Instructions for APK distribution
│   └── gaadimech-app-beta.apk # Generated APK (after running generate-apk)
├── public/
│   └── manifest.json          # PWA manifest configuration
├── scripts/
│   ├── generate-apk.js        # APK generation script
│   └── check-apk.js          # APK status checker
└── vite.config.ts            # Vite config with PWA plugin
```

## 🛠️ Build Commands

### Build PWA
```bash
npm run build
# or
npm run pwa-build
```

### Serve Locally for Testing
```bash
npm run build-and-serve
```
This will build the PWA and serve it at `http://localhost:3000`

### Check APK Status
```bash
npm run check-apk
```
This will show you if any APK files are available in the "Generated Apk" folder and provide quick action commands.

## 📦 APK Generation for Beta Testing

### Prerequisites

1. **Node.js 16+** (already installed)
2. **Java Development Kit (JDK) 8+**
   ```bash
   # Check if Java is installed
   java -version
   
   # If not installed, install via Homebrew (macOS)
   brew install openjdk@11
   ```

3. **Android SDK (Optional, for signing)**
   - Download from [Android Developer Site](https://developer.android.com/studio)
   - Or install via Homebrew: `brew install android-sdk`

### Steps to Generate APK

#### Method 1: Using Your Deployed Website

1. **Deploy your PWA** to a public URL (Vercel, Netlify, etc.)
   ```bash
   # Example with Vercel
   npm install -g vercel
   vercel --prod
   ```

2. **Generate APK**
   ```bash
   npm run generate-apk https://your-deployed-url.com
   ```

#### Method 2: Using Local Development

1. **Serve PWA locally**
   ```bash
   npm run build-and-serve
   ```

2. **In another terminal, generate APK**
   ```bash
   npm run generate-apk http://localhost:3000
   ```

### 📁 APK Output

The generated APK will be automatically copied to an easy-to-find location:
```
./Generated Apk/gaadimech-app-beta.apk
```

The original APK is also available at:
```
./android-app/app/build/outputs/apk/release/app-release-unsigned.apk
```

### 🔑 Signing APK (Optional for Beta Testing)

For beta testing, you can use the unsigned APK. For production, you'll need to sign it:

1. **Generate a keystore**
   ```bash
   keytool -genkey -v -keystore android.keystore -alias gaadimech -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Sign the APK**
   ```bash
   jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore android.keystore "Generated Apk/gaadimech-app-beta.apk" gaadimech
   ```

## 📲 Installing APK for Testing

### Method 1: ADB Install (if Android device connected)
```bash
adb install "Generated Apk/gaadimech-app-beta.apk"
```

### Method 2: Manual Install
1. Copy the APK file to your Android device
2. Enable "Install from Unknown Sources" in device settings
3. Open the APK file and install

### Method 3: Share for Beta Testing
1. Upload the APK to a file sharing service (Google Drive, Dropbox, etc.)
2. Share the download link with beta testers
3. Provide installation instructions

## 🔧 Troubleshooting

### PWA Issues
- **Service Worker not registering**: Check browser developer tools console
- **Manifest errors**: Validate manifest.json at [Web App Manifest Validator](https://manifest-validator.appspot.com/)
- **Icons not loading**: Ensure icon files exist in `public/images/`

### APK Generation Issues
- **Bubblewrap command not found**: Reinstall globally `npm install -g @bubblewrap/cli`
- **Java not found**: Install JDK and set JAVA_HOME environment variable
- **Manifest not accessible**: Ensure your PWA is deployed and accessible via HTTPS

### Common Errors
1. **"Failed to fetch manifest"**: Check if your website is accessible and serves the manifest.json
2. **"Build failed"**: Ensure all prerequisites are installed (Java, Android SDK)
3. **"Permission denied"**: Enable unknown sources on Android device

## 📋 Beta Testing Checklist

- [ ] PWA builds successfully
- [ ] PWA works in browser (test offline functionality)
- [ ] APK generates without errors
- [ ] APK installs on test device
- [ ] App opens and functions correctly
- [ ] Test core functionality (booking, services, contact)
- [ ] Test app shortcuts
- [ ] Verify app icon and name appear correctly

## 🚀 Deployment Options

### For PWA Deployment:
- **Vercel**: `npm install -g vercel && vercel --prod`
- **Netlify**: Connect GitHub repo or use Netlify CLI
- **GitHub Pages**: Use GitHub Actions workflow
- **Firebase Hosting**: Use Firebase CLI

### For APK Distribution:
- **Firebase App Distribution**: For internal testing
- **Google Drive**: Simple file sharing
- **TestFlight Alternative**: Use services like Diawi or InstallOnAir

## 📞 Support

For issues or questions about the PWA/APK setup:
1. Check the browser developer console for PWA issues
2. Verify all prerequisites are installed for APK generation
3. Test the PWA in a browser before generating APK
4. Ensure the website is accessible via HTTPS for APK generation

## 🔄 Future Enhancements

- Push notifications integration
- Background sync for offline booking
- Biometric authentication
- App store deployment (Google Play Store)
- iOS app generation using similar tools

---

**Note**: This APK is for beta testing only. For production release to Google Play Store, additional steps and configurations are required including proper signing, store listing, and compliance with Play Store policies. 