# Todo App - Ghost.js + Capacitor

A minimalist, reactive Todo List mobile app built with **Ghost.js** framework and **Capacitor** for Android deployment.

![App Demo](https://img.shields.io/badge/Platform-Android-green)
![Framework](https://img.shields.io/badge/Framework-Ghost.js-purple)
![Size](https://img.shields.io/badge/Bundle%20Size-3.5KB%20gzipped-blue)

## 🎯 Features

- ✅ Add, complete, and delete todos
- ✅ Filter todos (All, Active, Completed)
- ✅ Clear completed todos
- ✅ Persistent storage using signals
- ✅ Responsive mobile-first design
- ✅ Beautiful gradient UI
- ✅ Lightweight (3.5KB gzipped core)

## 🚀 Tech Stack

- **Ghost.js** - Reactive JavaScript framework with signals
- **Capacitor** - Native mobile runtime
- **Android** - Target platform
- **Pure CSS** - No external styling libraries

## 📦 Installation

### Prerequisites

- Node.js (v16+)
- Android SDK
- Java 21 (for Android builds)

### Setup

```bash
# Clone the repository
git clone https://github.com/jarir2020/Todo_App_Ghost.js.git
cd Todo_App_Ghost.js

# Install dependencies
npm install

# Build the web app
npm run build

# Add Android platform
npx cap add android

# Sync web assets
npx cap sync android

# Build APK
cd android
./gradlew assembleDebug
```

## 🎮 Usage

### Development

```bash
# Start dev server
npm run dev

# Visit http://localhost:3000
```

### Building for Android

```bash
# Build web app
npm run build

# Sync with Capacitor
npx cap sync android

# Open in Android Studio
npx cap open android

# Or build APK directly
cd android
./gradlew assembleDebug
```

The APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

## 📱 Installing the APK

1. Transfer the APK to your Android device
2. Enable "Unknown Sources" in Settings → Security
3. Open the APK file and install
4. Enjoy your Todo app!

## 🏗️ Project Structure

```
Todo_App_Ghost.js/
├── src/
│   ├── index.js           # Main app logic
│   └── styles.css         # Styling
├── android/               # Native Android project
├── dist/                  # Build output
├── index.html             # Entry HTML file
├── package.json           # Dependencies
├── capacitor.config.json  # Capacitor configuration
├── BUGS.md               # Ghost.js bugs documented
├── ANALYSIS.md           # Feature analysis
└── BUILDING_OWN_CAPACITOR.md  # Guide to building your own Capacitor
```

## 🐛 Known Issues

This project helped identify several Ghost.js bugs when deploying to Android/Capacitor:

1. **Function-based reactive children** not handled in bundled code
2. **ES module imports** unreliable in Android WebView
3. **Function-based props** showing inconsistent behavior

See [BUGS.md](BUGS.md) for detailed bug reports and workarounds.

See [ANALYSIS.md](ANALYSIS.md) for analysis on whether fixes sacrifice web features.

## 🔧 Workarounds Applied

Due to Ghost.js compatibility issues with Android WebView:

- Removed reactive function children
- Implemented manual re-rendering
- Used standard script tags instead of ES modules
- Inlined all CSS

These workarounds sacrifice some reactivity but ensure the app works on Android.

## 📚 Documentation

- [BUGS.md](BUGS.md) - Documented Ghost.js bugs for framework maintainers
- [ANALYSIS.md](ANALYSIS.md) - Feature analysis and proper fix recommendations
- [BUILDING_OWN_CAPACITOR.md](BUILDING_OWN_CAPACITOR.md) - Complete guide to building your own Capacitor-like framework

## 🤝 Contributing

This is an experimental project. Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Ghost.js** team for the reactive framework
- **Capacitor** team for the mobile runtime
- The Android development community

## 📧 Contact

Jarir Ahmed - [@jarir2020](https://github.com/jarir2020)

Project Link: [https://github.com/jarir2020/Todo_App_Ghost.js](https://github.com/jarir2020/Todo_App_Ghost.js)

## 🎓 Learning Resources

If you're interested in building your own mobile framework, check out:
- [BUILDING_OWN_CAPACITOR.md](BUILDING_OWN_CAPACITOR.md) - Complete guide with code examples

---

**Note**: This project serves as both a functional Todo app and a case study in deploying Ghost.js apps to mobile platforms using Capacitor.
