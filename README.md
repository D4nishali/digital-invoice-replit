# D-Invoice - Professional POS System

A production-ready Point of Sale (POS) system built specifically for Pakistani businesses with comprehensive FBR (Federal Board of Revenue) compliance.

## Project Structure

```
d-invoice/
├── src/                           # Application Source Code
│   ├── frontend/                  # React Frontend Application
│   │   ├── components/           # Reusable UI Components
│   │   ├── pages/               # Application Pages
│   │   ├── hooks/               # Custom React Hooks
│   │   ├── lib/                 # Utility Libraries
│   │   ├── services/            # API Services
│   │   └── assets/              # Static Assets
│   ├── backend/                   # Express Backend Server
│   │   ├── routes/              # API Route Handlers
│   │   ├── services/            # Business Logic Services
│   │   ├── middleware/          # Express Middleware
│   │   └── utils/               # Server Utilities
│   └── database/                  # Database Layer
│       ├── schema/              # Database Schemas
│       ├── migrations/          # Database Migrations
│       └── seeds/               # Database Seed Data
├── config/                        # Configuration Files
├── dist/                         # Build Output
├── docs/                         # Documentation
└── tests/                        # Test Files

```

## Features

✅ **Core POS Features**
- Sales processing with invoice generation
- Product inventory management
- Customer management with NTN validation
- Payment processing and tracking
- Real-time analytics and reporting

✅ **Pakistani Business Compliance**
- FBR/PRAL integration for digital invoicing
- GST, FED, and WHT tax calculations
- NTN verification and validation
- Compliant invoice formatting with QR codes

✅ **Hardware Integration**
- Thermal printer support (80mm ESC/POS)
- Barcode scanner integration
- Cash drawer control
- Card reader support (EMV, contactless)

✅ **Business Management**
- Multi-user authentication with role-based access
- Comprehensive reporting and analytics
- Email invoice delivery
- Professional PDF invoice generation

## Technology Stack

**Frontend:** React + TypeScript + Vite + Tailwind CSS + Shadcn/UI
**Backend:** Node.js + Express + TypeScript
**Database:** PostgreSQL + Drizzle ORM
**Development:** Vite + Hot Module Replacement

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Setup**
   ```bash
   npm run db:push
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Login Credentials

- **Admin:** admin / SecureAdmin2025!
- **Manager:** manager / ManagerPass2024!
- **Cashier:** cashier / CashierPass2024!

## License

Commercial License - Contact for licensing information.