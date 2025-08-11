import { pgTable, text, decimal, timestamp, boolean, integer, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: text('username').notNull().unique(),
  email: text('email'),
  password: text('password').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  role: text('role').notNull().default('cashier'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
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
  sroScheduleNo: text('sro_schedule_no'),
  sroItemSerialNo: text('sro_item_serial_no'),
  sroDescription: text('sro_description'),
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
  contactPerson: text('contact_person'),
  loyaltyPoints: integer('loyalty_points').notNull().default(0),
  creditLimit: decimal('credit_limit', { precision: 10, scale: 2 }).notNull().default('0.00'),
  totalPurchases: decimal('total_purchases', { precision: 10, scale: 2 }).notNull().default('0.00'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// Sales table
export const sales = pgTable('sales', {
  id: uuid('id').primaryKey().defaultRandom(),
  invoiceNumber: text('invoice_number').notNull().unique(),
  fbrInvoiceNumber: text('fbr_invoice_number'),
  fbrIrn: text('fbr_irn'),
  invoiceDate: timestamp('invoice_date').notNull(),
  dueDate: timestamp('due_date'),
  customerId: uuid('customer_id'),
  customerName: text('customer_name'),
  customerNtn: text('customer_ntn'),
  customerCnic: text('customer_cnic'),
  customerAddress: text('customer_address'),
  customerPhone: text('customer_phone'),
  customerEmail: text('customer_email'),
  userId: uuid('user_id').notNull(),
  cashierName: text('cashier_name'),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  taxAmount: decimal('tax_amount', { precision: 10, scale: 2 }).notNull(),
  discountAmount: decimal('discount_amount', { precision: 10, scale: 2 }).notNull().default('0.00'),
  posServiceFee: decimal('pos_service_fee', { precision: 10, scale: 2 }).notNull().default('1.00'),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  paidAmount: decimal('paid_amount', { precision: 10, scale: 2 }).notNull(),
  changeAmount: decimal('change_amount', { precision: 10, scale: 2 }).notNull().default('0.00'),
  advanceAmount: decimal('advance_amount', { precision: 10, scale: 2 }).notNull().default('0.00'),
  remainingAmount: decimal('remaining_amount', { precision: 10, scale: 2 }).notNull().default('0.00'),
  paymentMethod: text('payment_method').notNull(),
  paymentStatus: text('payment_status').notNull().default('pending'),
  paymentTerms: text('payment_terms').notNull().default('cod'),
  bankName: text('bank_name'),
  bankBranch: text('bank_branch'),
  accountTitle: text('account_title'),
  accountNumber: text('account_number'),
  transactionReference: text('transaction_reference'),
  cardType: text('card_type'),
  cardLastFour: text('card_last_four'),
  transactionId: text('transaction_id'),
  walletProvider: text('wallet_provider'),
  chequeNumber: text('cheque_number'),
  chequeDate: timestamp('cheque_date'),
  fbrStatus: text('fbr_status').notNull().default('not_configured'),
  fbrQrCode: text('fbr_qr_code'),
  fbrSubmissionId: text('fbr_submission_id'),
  taxScenario: text('tax_scenario').notNull().default('SN027'),
  notes: text('notes'),
  deliveryTerms: text('delivery_terms'),
  warrantyInfo: text('warranty_info'),
  saleDate: timestamp('sale_date').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// Sale Items table
export const saleItems = pgTable('sale_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  saleId: uuid('sale_id').notNull(),
  productId: uuid('product_id'),
  productName: text('product_name').notNull(),
  productSku: text('product_sku'),
  productBarcode: text('product_barcode'),
  quantity: integer('quantity').notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  taxRate: decimal('tax_rate', { precision: 5, scale: 2 }).notNull(),
  taxAmount: decimal('tax_amount', { precision: 10, scale: 2 }).notNull(),
  discountRate: decimal('discount_rate', { precision: 5, scale: 2 }).notNull().default('0.00'),
  discountAmount: decimal('discount_amount', { precision: 10, scale: 2 }).notNull().default('0.00'),
  unit: text('unit').notNull().default('pcs'),
  hsCode: text('hs_code'),
  taxScenario: text('tax_scenario').notNull().default('SN027'),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// Settings table
export const settings = pgTable('settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessName: text('business_name').notNull(),
  businessAddress: text('business_address').notNull(),
  businessPhone: text('business_phone').notNull(),
  businessEmail: text('business_email').notNull(),
  businessNtn: text('business_ntn').notNull(),
  businessStrn: text('business_strn'),
  businessLogo: text('business_logo'),
  currency: text('currency').notNull().default('PKR'),
  taxSettings: text('tax_settings'),
  pralSettings: text('pral_settings'),
  emailSettings: text('email_settings'),
  hardwareSettings: text('hardware_settings'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertCustomerSchema = createInsertSchema(customers).omit({
  id: true,
  createdAt: true
});

export const insertSaleSchema = createInsertSchema(sales).omit({
  id: true,
  createdAt: true
});

export const insertSaleItemSchema = createInsertSchema(saleItems).omit({
  id: true,
  createdAt: true
});

export const insertSettingsSchema = createInsertSchema(settings).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// Types
export type User = typeof users.$inferSelect;
export type NewUser = z.infer<typeof insertUserSchema>;

export type Product = typeof products.$inferSelect;
export type NewProduct = z.infer<typeof insertProductSchema>;

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = z.infer<typeof insertCustomerSchema>;

export type Sale = typeof sales.$inferSelect;
export type NewSale = z.infer<typeof insertSaleSchema>;

export type SaleItem = typeof saleItems.$inferSelect;
export type NewSaleItem = z.infer<typeof insertSaleItemSchema>;

export type Settings = typeof settings.$inferSelect;
export type NewSettings = z.infer<typeof insertSettingsSchema>;