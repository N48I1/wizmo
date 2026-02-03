# 🧙‍♂️ Wizmo Quiz

An interactive, gamified quiz app for kids featuring **Wizmo** – a friendly animated character that guides children through fun educational quizzes.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)
![Capacitor](https://img.shields.io/badge/Capacitor-6-119EFF?logo=capacitor)

---

## ✨ Features

- 🎮 **Interactive Quizzes** – Multiple categories with shuffled questions
- 🧙 **Animated Mascot** – Wizmo reacts with different moods (happy, sad, excited, thinking)
- ⭐ **Progress Tracking** – Earn stars and track high scores per category
- 🎉 **Confetti Celebrations** – Fun visual feedback on correct answers
- 📱 **Mobile-First Design** – Responsive layout optimized for touch devices
- 🌐 **Cross-Platform** – Runs on web and Android (via Capacitor)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS (utility classes) |
| Icons | Lucide React |
| Animations | Canvas Confetti |
| Mobile | Capacitor (Android) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/N48I1/wizmo.git
cd wizmo

# Install dependencies
npm install
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📱 Building for Android

1. Build the web app:
   ```bash
   npm run build
   ```

2. Add Android platform (first time only):
   ```bash
   npx cap add android
   ```

3. Sync changes:
   ```bash
   npx cap sync
   ```

4. Open in Android Studio:
   ```bash
   npx cap open android
   ```

5. Build APK from Android Studio

---

## 📁 Project Structure

```
wizmo-quiz/
├── App.tsx              # Main app component
├── index.tsx            # Entry point
├── index.html           # HTML template
├── types.ts             # TypeScript types
├── components/          # React components
│   ├── Wizmo.tsx        # Animated mascot
│   ├── CategoryCard.tsx # Category selection cards
│   └── QuizOption.tsx   # Answer option buttons
├── services/            # Business logic
│   ├── quizData.ts      # Quiz questions data
│   └── storage.ts       # Local storage for progress
└── public/              # Static assets
```

---

## 🎨 Screenshots

*Coming soon*

---

## 📄 License

This project is private and not licensed for public use.

---

<div align="center">
  Made with ❤️ for kids who love learning
</div>
</CodeContent>
<parameter name="EmptyFile">false
