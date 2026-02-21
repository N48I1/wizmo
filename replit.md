# Wizmo Quiz

## Overview

Wizmo Quiz is an educational quiz game designed for kids ages 9-13. The app features a friendly cartoon character named Wizmo who guides children through interactive quizzes covering vocabulary, math, colors, logic, and general knowledge. The application is built as a full-stack web app with offline-first capabilities, using React on the frontend and Express on the backend with PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React hooks for local state
- **Styling**: Tailwind CSS with custom theme extensions for kid-friendly colors (wizmo.blue, wizmo.yellow, wizmo.green, etc.)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for playful, bouncing animations and transitions
- **Fonts**: Fredoka (display) and Quicksand (body) for child-friendly typography

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schema validation
- **Build Tool**: Vite for frontend, esbuild for backend bundling

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema**: Defined in `shared/schema.ts` using Drizzle's type-safe schema builder
- **Migrations**: Drizzle Kit for database migrations (`drizzle-kit push`)
- **Offline Support**: LocalStorage fallback for quiz results when offline

### Key Design Patterns
- **Shared Types**: The `shared/` directory contains schema definitions and API route contracts used by both frontend and backend
- **Type Safety**: Full end-to-end type safety using Zod schemas for validation and TypeScript
- **Path Aliases**: `@/` maps to client source, `@shared/` maps to shared code
- **Mock Data**: Quiz content is currently stored as mock data in `server/storage.ts` for MVP

### API Structure
Routes are defined declaratively in `shared/routes.ts`:
- `GET /api/quizzes` - List all quiz categories
- `GET /api/quizzes/:id` - Get specific quiz with questions
- `POST /api/results` - Save quiz result
- `GET /api/results` - List all quiz results

## External Dependencies

### Database
- PostgreSQL via `DATABASE_URL` environment variable
- Drizzle ORM for database operations
- `connect-pg-simple` for session storage

### UI Libraries
- Radix UI primitives (dialog, dropdown, tabs, etc.)
- Lucide React for iconography
- Canvas Confetti for celebration effects

### Development Tools
- Vite dev server with HMR
- Replit-specific plugins for development (cartographer, dev-banner, error overlay)

### Key NPM Packages
- `@tanstack/react-query` - Data fetching and caching
- `framer-motion` - Animations
- `date-fns` - Date formatting
- `zod` - Runtime type validation
- `drizzle-orm` / `drizzle-zod` - Database ORM and schema validation