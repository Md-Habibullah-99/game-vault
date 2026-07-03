# 🎮 GameVault

<div align="center">

### Your Personal Gaming Hub

Discover games, build your collection, track favorites, and share reviews — all in one place.

Built with **React**, **Vite**, and **Tailwind CSS**.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Frontend-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-success)

### 🌐 Live Demo

**https://shahnur07.github.io/game-vault/**

</div>

---

## 📖 About The Project

GameVault is a modern single-page application designed for gamers who want a clean and organized way to discover games and manage their personal collection.

Users can browse a curated game catalog, explore detailed game pages, save titles to their personal vault, mark favorites, and leave ratings and reviews for the community.

The project was built as a portfolio application to showcase frontend development skills using modern React practices and responsive UI design.

---

## ✨ Features

### 🔍 Discover Games

* Browse the complete game library
* Real-time search functionality
* Filter games by genre
* Filter by play status

### 📄 Detailed Game Pages

Each game includes:

* Description and overview
* Platform availability
* System requirements
* Critic and user scores
* Review summaries

### ⭐ Review System

* Rate games out of 10
* Leave written reviews
* Community sentiment analysis:

  * Positive
  * Mixed
  * Negative

### 🏛 Personal Vault

* Save games for later
* Build your own gaming library
* Quickly access saved titles

### ❤️ Favorites

* Keep track of your all-time favorite games
* Separate from your main collection

### 📱 Fully Responsive Design

* Desktop sidebar navigation
* Mobile bottom navigation bar
* Optimized experience across all devices

### 👤 Session Management

* Username-based login system
* Persistent user sessions
* Quick sign-out functionality

---

## 🛠 Tech Stack

| Category         | Technology              |
| ---------------- | ----------------------- |
| Frontend         | React                   |
| Build Tool       | Vite                    |
| Styling          | Tailwind CSS v4         |
| State Management | React Hooks             |
| Fonts            | Inter, Barlow Condensed |
| Deployment       | GitHub Pages            |

---

## 📂 Project Structure

```text
game-vault/
├── public/
│   └── gameVaultIcon.svg
│
├── src/
│   ├── components/
│   │   ├── GameCard.jsx
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SidebarBtn.jsx
│   │   ├── MobileNav.jsx
│   │   └── ReviewCard.jsx
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── DetailsPage.jsx
│   │   ├── VaultPage.jsx
│   │   ├── FavoritesPage.jsx
│   │   └── LoginPage.jsx
│   │
│   ├── icons.jsx
│   ├── App.jsx
│   ├── app.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js (v18 or later recommended)
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/shahnur07/game-vault.git
```

Move into the project directory:

```bash
cd game-vault
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:5173
```

---

## 📦 Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The generated files will be available in:

```text
dist/
```

---

## 🌍 Deployment

GameVault is configured for deployment on **GitHub Pages** using:

```js
base: "/game-vault/"
```

To deploy:

```bash
npm run build
```

Publish the generated `dist` folder contents to the `gh-pages` branch.

---

## 🗺 Future Improvements

Planned features for future versions:

* [ ] Cloud synchronization across devices
* [ ] User accounts and authentication
* [ ] Infinite scrolling or pagination
* [ ] Advanced sorting options
* [ ] Edit or delete reviews
* [ ] Dark/Light theme toggle
* [ ] Game recommendations
* [ ] Wishlist support
* [ ] Achievement tracking
* [ ] Recently played section

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m "Add amazing feature"
```

4. Push your branch

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

For major changes, please open an issue first to discuss the proposed improvements.

---

## 📜 License

Distributed under the MIT License.

See the `LICENSE` file for more information.

---

## 👨‍💻 Author

**Shahnur Islam**

* GitHub: https://github.com/shahnur07
* Project: GameVault

---

<div align="center">

### ⭐ If you like this project, consider giving it a star!

</div>
