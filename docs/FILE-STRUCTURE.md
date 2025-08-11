# D-Invoice File Structure Guide

## Overview
This document explains the professional file organization for the D-Invoice POS system, designed for clean separation of concerns and easy maintenance.

## Current Structure

### Modern Organization (`src/` directory)
```
src/
├── frontend/                  # React Frontend Application
│   ├── components/           # Reusable UI Components
│   │   ├── ui/              # Shadcn/UI base components
│   │   ├── forms/           # Form components
│   │   ├── modals/          # Modal dialogs
│   │   └── layouts/         # Layout components
│   ├── pages/               # Application Pages
│   │   ├── dashboard.tsx    # Main dashboard
│   │   ├── pos.tsx          # Point of Sale interface
│   │   ├── inventory.tsx    # Product management
│   │   ├── customers.tsx    # Customer management
│   │   ├── invoices.tsx     # Invoice management
│   │   ├── reports.tsx      # Analytics and reports
│   │   └── settings.tsx     # System settings
│   ├── hooks/               # Custom React Hooks
│   │   ├── use-auth.tsx     # Authentication hook
│   │   ├── use-sales.ts     # Sales management
│   │   └── use-inventory.ts # Inventory management
│   ├── lib/                 # Utility Libraries
│   │   ├── queryClient.ts   # TanStack Query setup
│   │   ├── utils.ts         # General utilities
│   │   ├── currency.ts      # Pakistani Rupee formatting
│   │   └── tax-utils.ts     # Tax calculations
│   ├── services/            # API Services
│   │   ├── fbr-api.ts       # FBR/PRAL integration
│   │   ├── ntn-verification.ts # NTN validation
│   │   └── invoice-service.ts # Invoice generation
│   └── assets/              # Static Assets
│       ├── images/          # Image files
│       └── styles/          # CSS files
├── backend/                   # Express Backend Server
│   ├── routes/              # API Route Handlers
│   │   ├── sales.ts         # Sales endpoints
│   │   ├── products.ts      # Product endpoints
│   │   ├── customers.ts     # Customer endpoints
│   │   ├── hardware.ts      # Hardware integration
│   │   └── analytics.ts     # Analytics endpoints
│   ├── services/            # Business Logic Services
│   │   ├── tax-calculator.ts # Pakistani tax calculations
│   │   ├── fbr-integration.ts # FBR compliance
│   │   └── email-service.ts  # Email notifications
│   ├── middleware/          # Express Middleware
│   │   ├── auth.ts          # Authentication middleware
│   │   ├── validation.ts    # Request validation
│   │   └── error-handler.ts # Error handling
│   └── utils/               # Server Utilities
│       ├── logger.ts        # Logging utility
│       └── helpers.ts       # General helpers
└── database/                  # Database Layer
    ├── schema/              # Database Schemas
    │   ├── users.ts         # User schema
    │   ├── products.ts      # Product schema
    │   ├── sales.ts         # Sales schema
    │   └── customers.ts     # Customer schema
    ├── migrations/          # Database Migrations
    └── seeds/               # Database Seed Data
```

### Legacy Compatibility Structure
```
client/                        # Frontend (Compatibility)
├── index.html
└── src/
    ├── App.tsx
    ├── main.tsx
    └── [frontend files...]

server/                        # Backend (Compatibility)
├── index.ts
├── routes.ts
├── db-storage.ts
└── [backend files...]

shared/                        # Shared Code (Compatibility)
├── schema.ts
└── [shared files...]
```

## Best Practices

### File Naming Conventions
- **Components**: PascalCase (e.g., `ProductCard.tsx`)
- **Pages**: kebab-case (e.g., `product-management.tsx`)
- **Utilities**: camelCase (e.g., `taxCalculator.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `TAX_RATES.ts`)

### Import Organization
```typescript
// 1. External libraries
import React from 'react';
import { useState } from 'react';

// 2. Internal utilities
import { formatCurrency } from '@/lib/currency';

// 3. Components
import { Button } from '@/components/ui/button';

// 4. Types
import type { Product } from '@/types/product';
```

### Component Structure
```typescript
// ProductCard.tsx
interface ProductCardProps {
  product: Product;
  onSelect: (id: string) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  // Component logic here
  return (
    // JSX here
  );
}
```

## Development Guidelines

### Frontend Development
1. **Components**: Create reusable components in `src/frontend/components/`
2. **Pages**: Main application pages go in `src/frontend/pages/`
3. **State Management**: Use TanStack Query for server state, useState for local state
4. **Styling**: Use Tailwind CSS with component-specific classes

### Backend Development
1. **Routes**: API endpoints in `src/backend/routes/`
2. **Business Logic**: Core business logic in `src/backend/services/`
3. **Database**: Schema definitions in `src/database/schema/`
4. **Validation**: Zod schemas for request/response validation

### Database Development
1. **Schema Changes**: Update `src/database/schema/` files
2. **Migrations**: Use `npm run db:push` to apply changes
3. **Types**: Auto-generated from Drizzle schemas

## Migration Guide

### Moving from Legacy to Modern Structure
1. **Identify File Type**: Determine if file is frontend, backend, or shared
2. **Move to Appropriate Directory**: Place in corresponding `src/` subdirectory
3. **Update Imports**: Fix import paths to use new structure
4. **Test Functionality**: Ensure all features work after migration

### Benefits of New Structure
- **Clear Separation**: Frontend, backend, and database code are clearly separated
- **Scalability**: Easy to add new features and maintain existing ones
- **Team Collaboration**: Multiple developers can work on different layers
- **Professional Standards**: Follows modern web development practices

## Next Steps

1. **Gradual Migration**: Move files from legacy structure to modern structure
2. **Update Documentation**: Keep this guide updated as structure evolves
3. **Team Training**: Ensure all developers understand the new structure
4. **Automation**: Create scripts to help with file organization tasks