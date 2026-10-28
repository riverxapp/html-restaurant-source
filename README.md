# Ember & Oak — Restaurant & Café

A responsive, single-page restaurant concept built with plain HTML, CSS, and JavaScript. No installation or build step is required.

## Preview

```bash
npm run dev
```

The static server defaults to port 5173. To choose a host or port:

```bash
npm run dev -- --host 127.0.0.1 --port 5173
```

## Features

- Seasonal menu with four keyboard-accessible category tabs
- Local food and café photography with a gallery lightbox
- Opening hours and a directions link
- Reservation planner with date validation and times based on opening hours
- Responsive mobile navigation, scroll reveals, hover transitions, and reduced-motion support

The restaurant name, menu, prices, address, and hours are illustrative. Reservations are a browser-only demo; no booking is sent, confirmed, or stored. Replace the reservation action with the restaurant's booking provider before launch.

## Customize

- `index.html`: brand, story, opening hours, address, and gallery
- `app.js`: menu items and reservation planner
- `tokens.css`: colors, fonts, spacing, and motion tokens
- `styles.css`: layout and responsive styling
- `assets/`: locally stored photography sourced from Unsplash; filenames preserve the source photo IDs

Fonts load from Google Fonts, with local serif and sans-serif fallbacks.

## Docker

```bash
docker build -t ember-and-oak .
docker run --rm -p 5173:5173 ember-and-oak
```
