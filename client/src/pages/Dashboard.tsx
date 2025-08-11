import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp,
  Receipt
} from 'lucide-react';

// Types for dashboard stats
type DashboardStats = {
  totalSales: number;
  totalProducts: number;
  totalCustomers: number;
  totalRevenue: number;
};

// Mock data fetcher - replace with actual API call
async function fetchDashboardStats(): Promise<DashboardStats> {
  const response = await fetch('/api/dashboard/stats');
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard stats');
  }
  return response.json();
}

function Dashboard() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Loading...</CardTitle>
                <div className="h-4 w-4 bg-gray-300 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-300 rounded animate-pulse mb-2" />
                <div className="h-4 bg-gray-300 rounded animate-pulse w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Dashboard
        </h1>
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Unable to load dashboard data</p>
              <p className="text-sm mt-2">Please check your connection and try again</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Sales',
      value: stats?.totalSales || 0,
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Customers',
      value: stats?.totalCustomers || 0,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString('en-PK', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  Updated just now
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No recent activity</p>
              <p className="text-sm mt-2">Start making sales to see activity here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button 
                className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => window.location.href = '/sales'}
              >
                <ShoppingCart className="h-8 w-8 text-blue-600 mb-2" />
                <div className="font-medium">New Sale</div>
                <div className="text-sm text-gray-500">Create invoice</div>
              </button>
              
              <button 
                className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => window.location.href = '/products'}
              >
                <Package className="h-8 w-8 text-green-600 mb-2" />
                <div className="font-medium">Add Product</div>
                <div className="text-sm text-gray-500">Manage inventory</div>
              </button>
              
              <button 
                className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => window.location.href = '/customers'}
              >
                <Users className="h-8 w-8 text-purple-600 mb-2" />
                <div className="font-medium">Add Customer</div>
                <div className="text-sm text-gray-500">Customer management</div>
              </button>
              
              <button 
                className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => window.location.href = '/analytics'}
              >
                <TrendingUp className="h-8 w-8 text-orange-600 mb-2" />
                <div className="font-medium">View Reports</div>
                <div className="text-sm text-gray-500">Business insights</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;