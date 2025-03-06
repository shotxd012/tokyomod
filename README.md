# Tokyo Modded Website Repository

Welcome to the Tokyo Modded website repository! This repository contains the source code for the official Tokyo Modded website, where users can explore mod packs, check server status, and download mods for enhanced Minecraft gameplay.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Dynamic Content**: Rendered using EJS templates.
- **Curated Mod Packs**: Explore mod packs with detailed descriptions.
- **Server Status**: Real-time server status display.
- **Download Functionality**: Download single mods or all mods as a ZIP file.
- **Modern UI**: Built with Tailwind CSS for a sleek and responsive design.

---

## Project Structure

```
.
├── public
│   ├── css          # Stylesheets
│   ├── js           # JavaScript files
│   ├── mod          # Mod files (organized by type)
│   │   ├── new      # New mods
├── views
│   ├── index.ejs    # Homepage template
│   ├── mods.ejs     # Mods page template
│   ├── partials     # Shared EJS components (head, nav, footer)
├── app.js           # Main server logic
├── package.json     # Dependencies and scripts
```

---

## Setup Instructions

Follow these steps to run the project locally:

1. **Clone the Repository**
   ```bash
   git clone git@github.com:shotxd012/tokyomod.git
   cd tokyomod
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Server**
   ```bash
   node app.js
   ```

4. **Access the Website**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Usage

### Available Routes

- `/` - Homepage with server status and mod packs.
- `/mods` - View and download mods.
- `/mods/new` - View and download newly uploaded mods.
- `/store` - Explore the store (placeholder).
- `/download/:type/:fileName` - Download individual files.
- `/download-all/:type` - Download all mods as a ZIP file.

### Mod Packs
- **Create Mod**: Advanced contraptions and engineering marvels.
- **Drawer**: Efficient resource organization.
- **Easy Villager**: Intuitive villager management.
- **More**: Additional enhancements for improved gameplay.

---

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).
