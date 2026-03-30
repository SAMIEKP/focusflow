# FocusFlow 🧠

<div align=\"center\">
  <img width=\"1200\" alt=\"FocusFlow Banner\" src=\"https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6\" />
  <br>
  <img src=\"https://img.shields.io/badge/React-18-blue?style=flat&logo=react\" alt=\"React\"/>
  <img src=\"https://img.shields.io/badge/TypeScript-5-orange?style=flat&logo=typescript\" alt=\"TypeScript\"/>
  <img src=\"https://img.shields.io/badge/Vite-5-green?style=flat&logo=vite\" alt=\"Vite\"/>
  <img src=\"https://img.shields.io/badge/json--server-black?style=flat&logo=node.js\" alt=\"json-server\"/>
</div>

[![npm version](https://img.shields.io/npm/v/focusflow.svg)](https://www.npmjs.com/package/focusflow)

**FocusFlow** is a modern, responsive productivity web application designed to help users enhance their focus, manage time effectively, and track progress with intuitive tools like focus sessions, schedules, limits, reports, and customizable settings. Built with React and TypeScript for a seamless developer and user experience.

## ✨ Features

- **Dashboard** - Centralized overview of your focus stats, active sessions, and quick actions.
- **Focus Mode** - Immersive timer-based focus sessions (Pomodoro-style) to boost productivity.
- **Focus Schedules** - Plan and manage recurring focus sessions with custom durations and breaks.
- **Limits** - Set daily/weekly usage limits to prevent burnout and maintain balance.
- **Reports** - Detailed analytics and progress reports with visualizations.
- **Settings** - Personalized configuration via intuitive settings panel and context.
- **Responsive UI** - Mobile-friendly with bottom navigation for easy access.
- **Mock Backend** - JSON-server powered data persistence for development.

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS (inferred from index.css)
- **State Management**: React Context (SettingsContext)
- **Custom Hooks**: useFocusScheduler for scheduling logic
- **Backend**: json-server (server/index.ts + db.json)
- **Build Tools**: Vite, TypeScript

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view in browser.

### Backend (Mock API)
The app uses json-server for data. It starts automatically with `npm run dev` via Vite config.

## 📁 Project Structure

```
focusflow/
├── src/
│   ├── components/     # UI components (Dashboard, FocusMode, etc.)
│   ├── context/        # React Context for global state
│   ├── hooks/          # Custom React hooks
│   ├── types.ts        # TypeScript type definitions
│   ├── App.tsx         # Root App component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── server/             # Mock backend
│   ├── db.json         # Data store
│   └── index.ts        # Server config
├── package.json        # Dependencies & scripts
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript config
└── README.md           # This file!
```

## 📱 Screenshots

*(Add screenshots of Dashboard, Focus Mode, Reports here)*

## 🤝 Contributing

1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to branch (`git push origin feature/AmazingFeature`).
5. Open Pull Request.

## 📄 License

This project is open-source and available under the MIT License.

---

⭐ Star us on GitHub if you find it useful!  
💬 Join the conversation in Issues or Discussions.

