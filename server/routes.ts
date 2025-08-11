import { Router } from 'express';
import { dbStorage } from './db-storage';
import {
  insertUserSchema,
  insertProductSchema,
  insertCustomerSchema,
  insertSaleSchema,
  insertSaleItemSchema,
  insertSettingsSchema
} from '../shared/schema';
import { z } from 'zod';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'D-Invoice POS API is running' });
});

// Users routes
router.get('/users', async (req, res) => {
  try {
    const users = await dbStorage.getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await dbStorage.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.post('/users', async (req, res) => {
  try {
    const userData = insertUserSchema.parse(req.body);
    const user = await dbStorage.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const userData = insertUserSchema.partial().parse(req.body);
    const user = await dbStorage.updateUser(req.params.id, userData);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const success = await dbStorage.deleteUser(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Products routes
router.get('/products', async (req, res) => {
  try {
    const products = await dbStorage.getProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await dbStorage.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

router.post('/products', async (req, res) => {
  try {
    const productData = insertProductSchema.parse(req.body);
    const product = await dbStorage.createProduct(productData);
    res.status(201).json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const productData = insertProductSchema.partial().parse(req.body);
    const product = await dbStorage.updateProduct(req.params.id, productData);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const success = await dbStorage.deleteProduct(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Customers routes
router.get('/customers', async (req, res) => {
  try {
    const customers = await dbStorage.getCustomers();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

router.get('/customers/:id', async (req, res) => {
  try {
    const customer = await dbStorage.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
});

router.post('/customers', async (req, res) => {
  try {
    const customerData = insertCustomerSchema.parse(req.body);
    const customer = await dbStorage.createCustomer(customerData);
    res.status(201).json(customer);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Failed to create customer' });
  }
});

router.put('/customers/:id', async (req, res) => {
  try {
    const customerData = insertCustomerSchema.partial().parse(req.body);
    const customer = await dbStorage.updateCustomer(req.params.id, customerData);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Failed to update customer' });
  }
});

router.delete('/customers/:id', async (req, res) => {
  try {
    const success = await dbStorage.deleteCustomer(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
});

// Sales routes
router.get('/sales', async (req, res) => {
  try {
    const sales = await dbStorage.getSales();
    res.json(sales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: 'Failed to fetch sales' });
  }
});

router.get('/sales/:id', async (req, res) => {
  try {
    const sale = await dbStorage.getSaleById(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json(sale);
  } catch (error) {
    console.error('Error fetching sale:', error);
    res.status(500).json({ error: 'Failed to fetch sale' });
  }
});

router.get('/sales/:id/items', async (req, res) => {
  try {
    const saleItems = await dbStorage.getSaleItems(req.params.id);
    res.json(saleItems);
  } catch (error) {
    console.error('Error fetching sale items:', error);
    res.status(500).json({ error: 'Failed to fetch sale items' });
  }
});

const createSaleSchema = insertSaleSchema.extend({
  items: z.array(insertSaleItemSchema.omit({ saleId: true }))
});

router.post('/sales', async (req, res) => {
  try {
    const { items, ...saleData } = createSaleSchema.parse(req.body);
    
    // Create the sale
    const sale = await dbStorage.createSale(saleData);
    
    // Create sale items with the sale ID
    const saleItems = items.map(item => ({
      ...item,
      saleId: sale.id
    }));
    
    await dbStorage.createSaleItems(saleItems);
    
    res.status(201).json({ sale, items: saleItems });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    console.error('Error creating sale:', error);
    res.status(500).json({ error: 'Failed to create sale' });
  }
});

router.put('/sales/:id', async (req, res) => {
  try {
    const saleData = insertSaleSchema.partial().parse(req.body);
    const sale = await dbStorage.updateSale(req.params.id, saleData);
    if (!sale) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json(sale);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    console.error('Error updating sale:', error);
    res.status(500).json({ error: 'Failed to update sale' });
  }
});

router.delete('/sales/:id', async (req, res) => {
  try {
    // Delete sale items first
    await dbStorage.deleteSaleItems(req.params.id);
    
    // Delete the sale
    const success = await dbStorage.deleteSale(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json({ message: 'Sale deleted successfully' });
  } catch (error) {
    console.error('Error deleting sale:', error);
    res.status(500).json({ error: 'Failed to delete sale' });
  }
});

// Settings routes
router.get('/settings', async (req, res) => {
  try {
    const settings = await dbStorage.getSettings();
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

router.post('/settings', async (req, res) => {
  try {
    const settingsData = insertSettingsSchema.parse(req.body);
    const settings = await dbStorage.createSettings(settingsData);
    res.status(201).json(settings);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    console.error('Error creating settings:', error);
    res.status(500).json({ error: 'Failed to create settings' });
  }
});

router.put('/settings', async (req, res) => {
  try {
    const settingsData = insertSettingsSchema.partial().parse(req.body);
    const settings = await dbStorage.updateSettings(settingsData);
    res.json(settings);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Analytics routes
router.get('/dashboard/stats', async (req, res) => {
  try {
    const stats = await dbStorage.getDashboardStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

export default router;