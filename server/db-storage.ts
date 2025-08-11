import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '../shared/schema';
import type {
  User, NewUser,
  Product, NewProduct,
  Customer, NewCustomer,
  Sale, NewSale,
  SaleItem, NewSaleItem,
  Settings, NewSettings
} from '../shared/schema';
import { eq, desc, sql, sum, count } from 'drizzle-orm';

// Initialize database connection
const sql_client = neon(process.env.DATABASE_URL || 'postgresql://localhost:5432/d_invoice');
const db = drizzle(sql_client, { schema });

export class DbStorage {
  async init() {
    // Database is automatically initialized through Drizzle migrations
    console.log('Database connection initialized successfully');
  }

  // Users
  async getUsers(): Promise<User[]> {
    return await db.select().from(schema.users).orderBy(desc(schema.users.createdAt));
  }

  async getUserById(id: string): Promise<User | null> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return user || null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.username, username));
    return user || null;
  }

  async createUser(userData: NewUser): Promise<User> {
    const [user] = await db.insert(schema.users).values(userData).returning();
    return user;
  }

  async updateUser(id: string, userData: Partial<NewUser>): Promise<User | null> {
    const [user] = await db.update(schema.users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(schema.users.id, id))
      .returning();
    return user || null;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await db.delete(schema.users).where(eq(schema.users.id, id));
    return result.rowCount > 0;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return await db.select().from(schema.products).orderBy(desc(schema.products.createdAt));
  }

  async getProductById(id: string): Promise<Product | null> {
    const [product] = await db.select().from(schema.products).where(eq(schema.products.id, id));
    return product || null;
  }

  async getProductBySku(sku: string): Promise<Product | null> {
    const [product] = await db.select().from(schema.products).where(eq(schema.products.sku, sku));
    return product || null;
  }

  async getProductByBarcode(barcode: string): Promise<Product | null> {
    const [product] = await db.select().from(schema.products).where(eq(schema.products.barcode, barcode));
    return product || null;
  }

  async createProduct(productData: NewProduct): Promise<Product> {
    const [product] = await db.insert(schema.products).values(productData).returning();
    return product;
  }

  async updateProduct(id: string, productData: Partial<NewProduct>): Promise<Product | null> {
    const [product] = await db.update(schema.products)
      .set({ ...productData, updatedAt: new Date() })
      .where(eq(schema.products.id, id))
      .returning();
    return product || null;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.delete(schema.products).where(eq(schema.products.id, id));
    return result.rowCount > 0;
  }

  // Customers
  async getCustomers(): Promise<Customer[]> {
    return await db.select().from(schema.customers).orderBy(desc(schema.customers.createdAt));
  }

  async getCustomerById(id: string): Promise<Customer | null> {
    const [customer] = await db.select().from(schema.customers).where(eq(schema.customers.id, id));
    return customer || null;
  }

  async createCustomer(customerData: NewCustomer): Promise<Customer> {
    const [customer] = await db.insert(schema.customers).values(customerData).returning();
    return customer;
  }

  async updateCustomer(id: string, customerData: Partial<NewCustomer>): Promise<Customer | null> {
    const [customer] = await db.update(schema.customers)
      .set(customerData)
      .where(eq(schema.customers.id, id))
      .returning();
    return customer || null;
  }

  async deleteCustomer(id: string): Promise<boolean> {
    const result = await db.delete(schema.customers).where(eq(schema.customers.id, id));
    return result.rowCount > 0;
  }

  // Sales
  async getSales(): Promise<Sale[]> {
    return await db.select().from(schema.sales).orderBy(desc(schema.sales.createdAt));
  }

  async getSaleById(id: string): Promise<Sale | null> {
    const [sale] = await db.select().from(schema.sales).where(eq(schema.sales.id, id));
    return sale || null;
  }

  async createSale(saleData: NewSale): Promise<Sale> {
    const [sale] = await db.insert(schema.sales).values(saleData).returning();
    return sale;
  }

  async updateSale(id: string, saleData: Partial<NewSale>): Promise<Sale | null> {
    const [sale] = await db.update(schema.sales)
      .set(saleData)
      .where(eq(schema.sales.id, id))
      .returning();
    return sale || null;
  }

  async deleteSale(id: string): Promise<boolean> {
    const result = await db.delete(schema.sales).where(eq(schema.sales.id, id));
    return result.rowCount > 0;
  }

  // Sale Items
  async getSaleItems(saleId: string): Promise<SaleItem[]> {
    return await db.select().from(schema.saleItems).where(eq(schema.saleItems.saleId, saleId));
  }

  async createSaleItem(saleItemData: NewSaleItem): Promise<SaleItem> {
    const [saleItem] = await db.insert(schema.saleItems).values(saleItemData).returning();
    return saleItem;
  }

  async createSaleItems(saleItemsData: NewSaleItem[]): Promise<SaleItem[]> {
    return await db.insert(schema.saleItems).values(saleItemsData).returning();
  }

  async deleteSaleItems(saleId: string): Promise<boolean> {
    const result = await db.delete(schema.saleItems).where(eq(schema.saleItems.saleId, saleId));
    return result.rowCount > 0;
  }

  // Settings
  async getSettings(): Promise<Settings | null> {
    const [settings] = await db.select().from(schema.settings).limit(1);
    return settings || null;
  }

  async createSettings(settingsData: NewSettings): Promise<Settings> {
    const [settings] = await db.insert(schema.settings).values(settingsData).returning();
    return settings;
  }

  async updateSettings(settingsData: Partial<NewSettings>): Promise<Settings | null> {
    // Update the first settings record or create if none exists
    const existingSettings = await this.getSettings();
    
    if (existingSettings) {
      const [settings] = await db.update(schema.settings)
        .set({ ...settingsData, updatedAt: new Date() })
        .where(eq(schema.settings.id, existingSettings.id))
        .returning();
      return settings;
    } else {
      return await this.createSettings(settingsData as NewSettings);
    }
  }

  // Analytics methods
  async getDashboardStats() {
    const [salesCount] = await db.select({ count: count() }).from(schema.sales);
    const [productsCount] = await db.select({ count: count() }).from(schema.products);
    const [customersCount] = await db.select({ count: count() }).from(schema.customers);
    
    const [totalRevenue] = await db.select({
      total: sum(schema.sales.totalAmount)
    }).from(schema.sales);

    return {
      totalSales: salesCount.count || 0,
      totalProducts: productsCount.count || 0,
      totalCustomers: customersCount.count || 0,
      totalRevenue: parseFloat(totalRevenue.total || '0')
    };
  }
}

export const dbStorage = new DbStorage();