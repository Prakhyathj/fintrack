# FinTrack - Smart Finance Management

## Overview

FinTrack is a modern personal finance tracking application built with vanilla HTML, CSS, and JavaScript. It provides users with a comprehensive dashboard to manage their financial data, including bank accounts, transactions, investments, and spending analytics. The application features a glassmorphism design aesthetic with animated backgrounds and smooth transitions, focusing on user experience and data visualization.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application follows a **client-side only architecture** using vanilla web technologies:
- **HTML5** for page structure across multiple views (landing, login, dashboard, transactions, investments, analytics)
- **CSS3** with custom properties for consistent theming and glassmorphism effects
- **Vanilla JavaScript** for all interactions and data management
- **Chart.js** for data visualization and financial charts
- **Bootstrap 5.3.0** for responsive layout and component styling
- **Font Awesome 6.4.0** for iconography

### Data Management Pattern
The application implements a **centralized data management system** through `data-manager.js`:
- **FinanceDataManager class** serves as the single source of truth for all financial data
- **localStorage persistence** for client-side data storage without backend dependency
- **Event-driven updates** across different pages using the shared data manager
- **Sample data initialization** for demo purposes when no stored data exists

### Page Structure & Navigation
The application uses a **multi-page architecture** with consistent navigation:
- **Landing page** (`index.html`) - Marketing and authentication entry point
- **Authentication flow** (`login.html`, `onboarding.html`, `validate-pin.html`) - User verification
- **Main application** (`dashboard.html`, `transactions.html`, `investments.html`, `analytics.html`) - Core functionality
- **Shared sidebar navigation** with active state management across pages

### Component Design System
The UI follows a **glassmorphism design pattern**:
- **CSS custom properties** for consistent theming and color schemes
- **Gradient backgrounds** with animated floating elements
- **Glass-effect cards** with backdrop filters and transparency layers
- **Smooth animations** using CSS transitions and keyframe animations
- **Responsive design** ensuring mobile-first compatibility

### Data Models
The application manages several core data entities:
- **User profiles** with basic information and preferences
- **Bank accounts** supporting multiple account types (savings, current, credit cards)
- **Transactions** with categorization, filtering, and search capabilities
- **Stock portfolio** for investment tracking and performance analysis
- **Categories** for organized expense and income classification

## External Dependencies

### CDN Libraries
- **Bootstrap 5.3.0** - UI component framework and responsive grid system
- **Font Awesome 6.4.0** - Icon library for consistent iconography
- **Chart.js 3.9.1** - Charting library for financial data visualization
- **Google Fonts (Poppins)** - Typography with multiple font weights

### Development Dependencies
- **http-server** (via npm) - Local development server for testing and preview
- **Node.js package management** - For dependency management and local server setup

### Browser APIs
- **localStorage API** - Client-side data persistence
- **DOM APIs** - Dynamic content manipulation and event handling
- **CSS Animation APIs** - Smooth transitions and visual effects
- **Responsive Design APIs** - Viewport and media query support

The application is designed to work entirely in the browser without requiring backend services, making it ideal for demonstration purposes and rapid prototyping of personal finance management features.