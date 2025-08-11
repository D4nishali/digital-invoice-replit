import React from 'react';
import { Router, Route, Link, useLocation } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { 
  Home, 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart3, 
  Settings,
  Receipt
} from 'lucide-react';

// Import pages
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import SettingsPage from './pages/Settings';

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Navigation component
function Navigation() {
  const [location] = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/sales', icon: ShoppingCart, label: 'Sales' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/customers', icon: Users, label: 'Customers' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen p-4">
      <div className="flex items-center gap-2 mb-8">
        <Receipt className="h-8 w-8 text-blue-600" />
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">D-Invoice</h1>
      </div>
      
      <ul className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <li key={item.path}>
              <Link href={item.path}>
                <a
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// Main App component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="d-invoice-theme">
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          <Navigation />
          <main className="flex-1 overflow-auto">
            <Router>
              <Route path="/" component={Dashboard} />
              <Route path="/sales" component={Sales} />
              <Route path="/products" component={Products} />
              <Route path="/customers" component={Customers} />
              <Route path="/analytics" component={Analytics} />
              <Route path="/settings" component={SettingsPage} />
            </Router>
          </main>
        </div>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;