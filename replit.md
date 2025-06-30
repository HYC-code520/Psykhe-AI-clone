# Psykhe AI Personality Test Application

## Overview

This is a full-stack React application that provides a Big Five personality test experience. The application uses a modern tech stack with React for the frontend, Express.js for the backend, and is designed to work with PostgreSQL through Drizzle ORM. The application features a clean, modern UI built with shadcn/ui components and Tailwind CSS.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system and CSS variables
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design
- **Database**: Designed for PostgreSQL with Drizzle ORM
- **Session Management**: In-memory storage with interface for database persistence
- **Development**: Hot reloading with Vite integration

### Data Storage Solutions
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Shared TypeScript schema definitions between client and server
- **Migrations**: Drizzle Kit for database schema management
- **Validation**: Zod schemas for runtime type checking and validation

## Key Components

### Database Schema
- **Test Sessions Table**: Stores user test sessions with unique session IDs
- **Fields**: Session tracking, question progress, answers storage (JSON), completion status, personality results
- **Types**: Full TypeScript type safety with Drizzle schema inference

### API Endpoints
- `POST /api/test-sessions`: Create new test session
- `GET /api/test-sessions/:sessionId`: Retrieve session data
- `PATCH /api/test-sessions/:sessionId`: Update session progress and results

### Frontend Pages
- **Personality Test**: Main test interface with question navigation
- **Results**: Displays Big Five personality trait scores and descriptions
- **404 Page**: Custom not found page

### Personality Assessment
- **Question System**: Multi-select questions with trait-specific scoring
- **Scoring Algorithm**: Calculates Big Five traits (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism)
- **Progress Tracking**: Real-time progress indication and session persistence

## Data Flow

1. **Session Initialization**: User visits app → Creates new test session → Receives unique session ID
2. **Question Flow**: User answers questions → Answers stored in session → Progress tracked
3. **Completion**: All questions answered → Personality scores calculated → Results stored and displayed
4. **Persistence**: All progress automatically saved to allow resuming incomplete tests

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver (Neon DB compatible)
- **@radix-ui/***: Comprehensive UI component primitives
- **@tanstack/react-query**: Powerful data synchronization for React
- **drizzle-orm**: Type-safe SQL ORM for TypeScript

### Development Tools
- **Vite**: Fast build tool with HMR
- **TailwindCSS**: Utility-first CSS framework
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler for production

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tooling integration

## Deployment Strategy

### Development
- Single command development with `npm run dev`
- Vite dev server with Express API proxy
- Hot module replacement for React components
- TypeScript compilation checking

### Production Build
- Vite builds optimized React bundle
- ESBuild bundles Node.js server code
- Static assets served from Express
- Environment-based configuration

### Database Setup
- Drizzle migrations for schema management
- `npm run db:push` for schema deployment
- Environment variable configuration for DATABASE_URL

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 30, 2025. Initial setup