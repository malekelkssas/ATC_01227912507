<div align="center">

# 🦆 QuackSeats Frontend

A modern event booking platform built with React and Vite

</div>

## 📋 Prerequisites

- Node.js (v18.17.1)
- npm (v10.9.0)

## 🚀 Getting Started

1. **Install Node.js and npm**
   - Download and install Node.js v18.17.1 from [Node.js official website](https://nodejs.org/)
   - Verify installation:
     ```bash
     node --version  # Should show v18.17.1
     npm --version   # Should show v10.9.0
     ```

2. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-name>/FE
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Environment Setup**
   ```bash
   # Copy the environment file
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # API Configuration
   VITE_API_URL=http://localhost:3000/api  # Backend API URL
   VITE_IMAGES_API_URL=http://localhost:3000  # Images API URL

   # Environment
   VITE_NODE_ENV=development  # Development/Production environment

   # Security
   VITE_REDUX_ENCRYPT_KEY=Quack-is-U0sing_encryption  # Redux state encryption key
   ```

5. **Start the application in development mode**
   ```bash
   npm run dev
   ```


6. **OR Start the application in production mode**
   ```bash
   npm run build
   ```
   then 
   ```bash
   npm run preview
   ```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── shared/     # Shared components (buttons, inputs, etc.)
│   ├── layout/     # Layout components (header, footer, etc.)
│   ├── pages/      # pages-specific components
│   └── ui/         # shadcn ui components
├── pages/          # Page components
├── context/        # Contexts
├── i18n/           # i18n translations
├── hooks/          # Custom React hooks
├── api/            # API services and data fetching
├── store/          # State management
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
└── App.tsx         # Root component
```

## 🎨 Styling

This project uses:
- Tailwind CSS for utility-first styling
- CSS Modules for component-specific styles
- PostCSS for processing
- shadcn ui for components

## 🔧 Development Tools

- **Vite** - Next Generation Frontend Tooling
- **TypeScript** - Type-safe JavaScript
- **ESLint** - Code linting
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching