# RWIT StaticUI

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js&style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2-blue?logo=react&style=for-the-badge)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?logo=bootstrap&style=for-the-badge)
![Sass](https://img.shields.io/badge/Sass-1.53-pink?logo=sass&style=for-the-badge)

## Project Overview

**RWIT StaticUI** is a static implementation of the live website [rwit.io](https://rwit.io), originally built with **Next.js and Storyblok**.

This project recreates the site using **Next.js with static JSON data** instead of a headless CMS. The primary goal is to decouple the UI from Storyblok so the frontend can be easily integrated with **any CMS in the future**.

It serves as a **CMS-agnostic frontend foundation**, making it easier to experiment with or migrate to different content management systems while preserving the existing UI and component architecture. Most components and layouts from the production site are replicated here and **statically rendered using structured JSON data**.

## Key Features

- **Static Site Generation (SSG)**: Leverages Next.js for blazing fast page loads and optimal SEO.
- **Dynamic Routing**: Includes dynamic page generation for blogs, services, case studies, technologies, industries, and public-sector pages.
- **Rich User Interface**: Built using Bootstrap 5, modular SASS, and highly reusable React components.
- **Advanced Animations**: Integrates `framer-motion`, `gsap`, and `aos` for smooth, scroll-triggered, and engaging interactions.
- **Component-Driven Architecture**: Uses a highly modular folder structure within `/components` for easy maintenance and scalability.
- **Testing Ready**: Configured with `vitest` and `playwright` for unit and end-to-end testing, ensuring reliability.
- **Localized Content Management**: Data is driven by structured local JSON files (e.g., `Header.json`, case studies) allowing for a statically exported site structure and easy content updates.

## Tech Stack

### Framework & UI

- **Framework**: Next.js 15.5.9 (Pages Router)
- **UI & Styling**: React 19, Bootstrap 5.3, SASS
- **Icons & Media**: React Player, React CountUp, React Parallax Tilt

### Animation & Interactivity

- **Animation**: Framer Motion, GSAP, AOS (Animate On Scroll)
- **Sliders & Carousels**: Swiper, Keen Slider

### Testing

- **Frameworks**: Vitest, Playwright

## Project Structure

To keep the structure maintainable and scalable, the repository is organized functionally. Here's a high-level overview of the most important directories:

```text
rwit-staticui/
├── 📂 assets/            # Global styles and SASS variables
│   └── 📂 scss/
│       ├── style.scss    # Main SASS entry point
│       ├── 📂 default/   # Base styles, mixins, variables
│       ├── 📂 elements/  # Component-specific styles
│       ├── 📂 footer/    # Footer styles
│       ├── 📂 header/    # Header and navigation styles
│       └── 📂 template/  # Page-level typography and variations
├── 📂 components/        # Reusable React components (e.g., Layouts, Banners, Buttons)
├── 📂 data/              # Static JSON data driving the UI (e.g., headers, menus, blogs)
├── 📂 helpers/           # Utility functions and scripts
├── 📂 pages/             # Next.js pages and API routes
├── 📂 public/            # Static assets (images, fonts, JSONs)
├── 📂 schemas/           # Data structures and validation schemas
└── 📂 styles/            # Global CSS (globals.css)
```

> **Note**: For a full breakdown of the components and data files, expand the directories in your code editor. We've simplified the tree here for readability (and omitted `.history` and heavily nested files).

## Getting Started

First, install the necessary dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Build and Deployment

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Testing

This project is configured with **Vitest**. To run the tests:

```bash
npm run test
```

_(Check `package.json` scripts if test scripts are configured differently)._

## Maintenance & Contributions

When updating site content or creating new features:

1. **Layout Changes**: Refer to the atomic components located in the `/components` folder before creating new ones.
2. **Data Updates**: For content updates (like Header, Menu, or text sections), modify the specific JSON files inside the `/data` directory.
3. **New Pages**: Follow the established pattern in the `/pages` directory, reusing layout wrappers (`<Layout>`) to ensure visual consistency across the site.
