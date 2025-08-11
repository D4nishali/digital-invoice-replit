import { pgTable, text, decimal, timestamp, boolean, integer, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: text('username').notNull().unique(),
  email: text('email'),
  password: text('password').notNull(),
  fullName: text('full_name').notNull(),
  role: text('role').notNull().default('cashier'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// Products table
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  barcode: text('barcode'),
  sku: text('sku').notNull().unique(),
  description: text('description'),
  category: text('category').notNull(),
  brand: text('brand'),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  costPrice: decimal('cost_price', { precision: 10, scale: 2 }).notNull(),
  stockQuantity: integer('stock_quantity').notNull().default(0),
  minStockLevel: integer('min_stock_level').notNull().default(5),
  unit: text('unit').notNull().default('pcs'),
  taxRate: decimal('tax_rate', { precision: 5, scale: 2 }).notNull().default('18.00'),
  hsCode: text('hs_code'),
  taxScenario: text('tax_scenario').notNull().default('SN027'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Customers table
export const customers = pgTable('customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  address: text('address'),
  city: text('city'),
  ntn: text('ntn'),
  cnic: text('cnic'),
  businessName: text('business_name'),
  strn: text('strn'),
  loyaltyPoints: integer('loyalty_points').notNull().default(0),
  totalPurchases: decimal('total_purchases', { precision: 10, scale: 2 }).notNull().default('0.00'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// Sales table
export const sales = pgTable('sales', {
  id: uuid('id').primaryKey().defaultRandom(),
  invoiceNumber: text('invoice_number').notNull().unique(),
  customerId: uuid('customer_id').references(() => customers.id),
  userId: uuid('user_id').notNull().references(() => users.id),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  taxAmount: decimal('tax_amount', { precision: 10, scale: 2 }).notNull(),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text('payment_method').notNull().default('cash'),
  status: text('status').notNull().default('completed'),
  fbr_irn: text('fbr_irn'),
  fbr_qr_code: text('fbr_qr_code'),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// Sale Items table
export const saleItems = pgTable('sale_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  saleId: uuid('sale_id').notNull().references(() => sales.id),
  productId: uuid('product_id').notNull().references(() => products.id),
  quantity: integer('quantity').notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  taxAmount: decimal('tax_amount', { precision: 10, scale: 2 }).notNull()
});

// Export schemas for validation
export const userInsertSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const productInsertSchema = createInsertSchema(products).omit({ id: true, createdAt: true, updatedAt: true });
export const customerInsertSchema = createInsertSchema(customers).omit({ id: true, createdAt: true });
export const saleInsertSchema = createInsertSchema(sales).omit({ id: true, createdAt: true });

// Export types
export type User = typeof users.$inferSelect;
export type NewUser = z.infer<typeof userInsertSchema>;
export type Product = typeof products.$inferSelect;
export type NewProduct = z.infer<typeof productInsertSchema>;
export type Customer = typeof customers.$inferSelect;
export type NewCustomer = z.infer<typeof customerInsertSchema>;
export type Sale = typeof sales.$inferSelect;
export type SaleItem = typeof saleItems.$inferSelect;