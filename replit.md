# Project Overview

This is a cyberpunk-themed freelancer dashboard application built as a full-stack web application. The system displays user stats, quick tools, hot deals, and a smart todo system with gamification elements like points and levels.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with hot module replacement
- **Routing**: Wouter for client-side routing
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom cyberpunk theme (neon colors, dark backgrounds)
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Storage**: PostgreSQL database with Drizzle ORM (migrated from in-memory storage)
- **Database ORM**: Drizzle ORM configured for PostgreSQL with Neon serverless
- **Session Management**: Express sessions with PostgreSQL store

### Key Components

#### Data Models
- **Users**: Profile information, levels, and points system
- **Dashboard Stats**: Project metrics, earnings, reviews
- **Quick Tools**: Shortcut actions for common tasks
- **Hot Deals**: Time-limited promotional offers
- **Todo Items**: Task management with priority levels

#### UI Components
- **Dashboard Sections**: Welcome, stats panel, quick tools, hot deals, smart todo, progress tracking
- **Responsive Design**: Mobile-first approach with breakpoint handling
- **Theme System**: Dark cyberpunk theme with neon accents (purple, cyan, indigo)
- **Interactive Elements**: Hover effects, animations, progress bars

## Data Flow

1. **Client Request**: React components use TanStack Query to fetch data
2. **API Layer**: Express routes handle HTTP requests and responses
3. **Storage Layer**: Memory storage implements interface for data operations
4. **Response**: JSON data flows back through the query system to update UI
5. **User Interactions**: Mutations trigger optimistic updates and cache invalidation

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Router alternative)
- Express.js with middleware for JSON parsing and static files
- TypeScript for type safety across the stack

### UI and Styling
- Radix UI primitives for accessible components
- Tailwind CSS for utility-first styling
- Class Variance Authority for component variants
- Lucide React for consistent iconography

### Data Management
- TanStack Query for server state management
- Drizzle ORM for database operations
- Zod for runtime type validation
- Date-fns for date manipulation

### Development Tools
- Vite for fast development and building
- ESBuild for server bundling
- PostCSS with Autoprefixer for CSS processing

## Deployment Strategy

### Development Mode
- Vite dev server with hot module replacement
- Express server with automatic restarts via tsx
- Replit-specific development tools and error overlay

### Production Build
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: ESBuild bundles server code to `dist/index.js`
- Single process serves both static files and API routes

### Database Configuration
- Drizzle configured for PostgreSQL with connection via DATABASE_URL
- Migration files stored in `./migrations` directory
- Schema defined in shared TypeScript files

### Key Architectural Decisions

1. **Monorepo Structure**: Frontend, backend, and shared code in single repository for easier development
2. **Database Integration**: PostgreSQL database with Drizzle ORM for persistent data storage
3. **Shared Schema**: TypeScript types shared between client and server ensure type safety
4. **Component-First UI**: Modular dashboard sections make the interface maintainable and extensible
5. **Query-Based State**: Server state managed by TanStack Query reduces boilerplate and provides caching
6. **Cyberpunk Theme**: Custom CSS variables and Tailwind configuration create consistent visual identity

## Recent Changes

### Database Migration (January 2025)
- Successfully migrated from in-memory storage to PostgreSQL database
- Created `server/db.ts` with Neon serverless configuration
- Updated `server/storage.ts` to use DatabaseStorage class with Drizzle ORM operations
- Pushed database schema using `npm run db:push`
- All data now persists across server restarts