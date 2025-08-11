import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

function Sales() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Sales
      </h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Point of Sale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Sales interface coming soon</p>
            <p className="text-sm mt-2">Full POS functionality will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Sales;