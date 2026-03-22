---
name: frontend-react-prototype
description: P3+ High-Quality React Prototyping - Execute premium UI/UX prototyping using React, Vite, and Tailwind/Vanilla CSS.
---

# Skill: Frontend React Prototyping

This skill extends the P3 UX Prototyping workflow by utilizing a modern React stack to ensure architectural consistency, smooth transitions, and a "vibe" that matches the Limesoda brand.

## Principles
1. **Component-First**: Never duplicate layout code (Sidebar, Header, Footer). Use React components.
2. **State Management**: Use React state to handle shifts (e.g., Project vs. Organization scope) instead of brittle JS logic.
3. **Vibe & Polish**: Use Framer Motion for micro-animations. Ensure the HSL-based dark/light theme is truly global.
4. **No-Cache Mandate**: Always use `npm run dev` or `http-server -c-1` to avoid stale assets.

## Execution Playbook

### Step 1: Initialize Vite
```bash
npx -y create-vite@latest ./ --template react
npm install
```

### Step 2: Establish the Design System
- Create `src/styles/tokens.css` with HSL variables.
- Configure `tailwind.config.js` (if requested) or use a robust global CSS.

### Step 3: Layout Architecture
- Create `src/components/layout/Layout.jsx` with a shared `<Sidebar />` and `<Main />`.
- Use `react-router-dom` for seamless navigation without page reloads.

### Step 4: Verification
- Use the `browser_subagent` to verify "Wow Factor" and consistency.
- Capture screenshots of the "Project Bubble" and other pulsing effects.
