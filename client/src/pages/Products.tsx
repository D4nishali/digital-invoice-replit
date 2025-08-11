import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';

function Products() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Products
      </h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Product management interface coming soon</p>
            <p className="text-sm mt-2">Inventory management will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Products;