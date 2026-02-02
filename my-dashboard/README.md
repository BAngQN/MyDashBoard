# React Dashboard Project

A modern React dashboard built with TypeScript, Vite, and best practices.

## 🚀 Features

- ⚡️ **Vite** - Lightning fast build tool
- ⚛️ **React 19** - Latest React with all new features
- 🔷 **TypeScript** - Type safety and better DX
- 🎨 **CSS Variables** - Modern theming with dark mode support
- 📱 **Responsive Design** - Works on all devices
- 🎯 **Custom Hooks** - Reusable logic with hooks
- 🧩 **Component Library** - Reusable UI components
- 📁 **Organized Structure** - Clean folder organization

## 📦 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Card.tsx
│   ├── Button.tsx
│   └── index.ts   # Barrel exports
├── hooks/         # Custom React hooks
│   ├── useLocalStorage.ts
│   ├── useWindowSize.ts
│   ├── useDebounce.ts
│   └── index.ts
├── types/         # TypeScript type definitions
│   └── index.ts
├── utils/         # Utility functions
│   └── helpers.ts
├── App.tsx        # Main app component
├── App.css        # App styles
├── main.tsx       # Entry point
└── index.css      # Global styles
```

## 🛠️ Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

## 📚 Key Concepts for Learning

### 1. Component Composition

Components are broken down into small, reusable pieces:

- `Header` - Top navigation bar
- `Sidebar` - Side navigation menu
- `Card` - Content container with variants
- `Button` - Styled button with different variants

### 2. TypeScript Integration

- Props interfaces for type safety
- Generic types in custom hooks
- Type-safe utility functions

### 3. Custom Hooks

- `useLocalStorage` - Persist state in localStorage
- `useWindowSize` - Track window dimensions
- `useDebounce` - Debounce rapidly changing values

### 4. Modern CSS

- CSS Variables for theming
- BEM-like naming convention
- Responsive design with media queries
- Dark mode support

### 5. State Management

- React's `useState` for local state
- Custom hooks for reusable state logic
- Props for component communication

## 🎨 Styling Approach

This project uses vanilla CSS with modern features:

- CSS Custom Properties (variables)
- Mobile-first responsive design
- Component-scoped CSS files
- Consistent naming conventions

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration with path aliases
- `tsconfig.json` - TypeScript base configuration
- `tsconfig.app.json` - App-specific TypeScript config
- `eslint.config.js` - ESLint rules for code quality

## 💡 Tips for Beginners

1. **Start with Components**: Look at how each component is built
2. **Understand Props**: See how data flows from parent to child
3. **Explore Hooks**: Learn useState, useEffect, and custom hooks
4. **Try TypeScript**: Types help catch errors early
5. **Experiment**: Modify the code and see what happens!

## 📖 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

## 🚀 Next Steps

- Add React Router for navigation
- Integrate a UI library (Material-UI, Chakra UI)
- Add state management (Context API, Zustand, Redux)
- Implement API calls with fetch or axios
- Add testing with Vitest and React Testing Library
- Set up CI/CD pipeline

---

## React + TypeScript + Vite Template

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

**Happy Coding! 🎉**

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
