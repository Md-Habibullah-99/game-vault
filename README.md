# GameVault

A personal gaming hub for discovering titles, building a library, and tracking favorites — built with React and Vite, styled with Tailwind CSS.

**Live demo:** [shahnur07.github.io/game-vault](https://shahnur07.github.io/game-vault/)

---

## Overview

GameVault is a single-page application for browsing a game catalog, viewing rich detail pages (system requirements, critic/user scores, platform availability), and curating a personal collection across two lists — **Vault** and **Favorites**. Users can also leave star ratings and written reviews on individual game pages.

## Features

- **Discover** — browse the full catalog with live search and filtering by genre and play status
- **Game details** — a dedicated page per title with description, system requirements, platform availability, and aggregate review data
- **User reviews** — rate a game out of 10 and leave a comment; ratings roll up into a Positive / Mixed / Negative distribution summary
- **Personal Vault** — save games to a private library for later
- **Favorites** — shortlist standout titles separately from the Vault
- **Responsive layout** — a sidebar navigation on desktop that collapses into a bottom mobile nav on smaller screens
- **Account session** — username-based sign-in with a sign-out action available from both desktop and mobile navigation

## Tech Stack

| Layer | Choice |
|---|---|
| UI library | [React](https://react.dev/) |
| Build tool | [Vite](https://vitejs.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + custom CSS (`app.css`) |
| Fonts | Inter (body), Barlow Condensed (display/headings) |
| Hosting | GitHub Pages |

> **Note on data persistence:** if your build wires up `localStorage` (or another storage layer) to persist the Vault and Favorites lists across sessions, document that here — including what's stored and any limitations (e.g., data is device/browser-specific and isn't synced across devices).

## Project Structure

```
game-vault/
├── public/
│   └── gameVaultIcon.svg
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
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── DetailsPage.jsx
│   │   ├── VaultPage.jsx
│   │   ├── FavoritesPage.jsx
│   │   └── LoginPage.jsx
│   ├── icons.jsx
│   ├── App.jsx
│   ├── app.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

> Adjust this tree if your actual file layout differs — it reflects the components and pages currently in the project.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (bundled with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shahnur07/game-vault.git
   ```

2. Navigate into the project directory:
   ```bash
   cd game-vault
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The optimized output is written to the `dist/` directory. Preview it locally with:

```bash
npm run preview
```

## Deployment

This project is configured for GitHub Pages via the `base: '/game-vault/'` setting in `vite.config.js`. After running `npm run build`, deploy the contents of `dist/` to the `gh-pages` branch (manually, or with a tool such as [`gh-pages`](https://www.npmjs.com/package/gh-pages)) to publish updates to the live site.

## Roadmap

Ideas for future iterations:

- [ ] Persist Vault/Favorites to an account rather than per-device storage
- [ ] Pagination or infinite scroll for large catalogs
- [ ] Sort controls (rating, release year, alphabetical) on Discover, Vault, and Favorites
- [ ] Editing or deleting a previously submitted review

## Contributing

Contributions are welcome. To propose a change:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes with a clear message
4. Open a pull request describing what changed and why

For larger or structural changes, please open an issue first to discuss the approach before submitting a pull request.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for the full text.

## Author

Built and maintained by [shahnur07](https://github.com/shahnur07).