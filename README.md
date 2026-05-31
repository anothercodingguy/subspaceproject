# Subspace.money Product Teardown Dashboard

Interactive React + Vite case-study dashboard built from the provided Subspace.money product teardown.

LINK: https://subspaceproject.vercel.app/

## Run Locally

```bash
npm install
npm run dev
```

The dev server defaults to Vite's local URL. For a fixed port:

```bash
npm run dev -- --host 127.0.0.1 --port 5173
```

## Verify

```bash
npm run build
npm run lint
```

## Structure

- `src/data.ts` contains the typed teardown content.
- `src/App.tsx` renders the interactive dashboard.
- `src/App.css` and `src/index.css` define the fintech dashboard UI and responsive behavior.
