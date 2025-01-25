'use client';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';

const Orders = () => {
  return (
    <Card>
      <CardHeader className="mb-0 p-6">
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="px-0"></CardContent>
    </Card>
  );
};

export default Orders;
