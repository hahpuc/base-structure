import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface BarChartComponentProps {
  title?: string;
  height?: number;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({
  title = 'Monthly Sales',
  height = 300,
}) => {
  const data = [
    {
      name: 'Jan',
      sales: 4000,
      orders: 240,
      customers: 160,
    },
    {
      name: 'Feb',
      sales: 3000,
      orders: 139,
      customers: 220,
    },
    {
      name: 'Mar',
      sales: 2000,
      orders: 980,
      customers: 290,
    },
    {
      name: 'Apr',
      sales: 2780,
      orders: 390,
      customers: 200,
    },
    {
      name: 'May',
      sales: 1890,
      orders: 480,
      customers: 181,
    },
    {
      name: 'Jun',
      sales: 2390,
      orders: 380,
      customers: 250,
    },
    {
      name: 'Jul',
      sales: 3490,
      orders: 430,
      customers: 210,
    },
  ];

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-gray-600" />
          <YAxis axisLine={false} tickLine={false} className="text-gray-600" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend />
          <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Sales ($)" />
          <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} name="Orders" />
          <Bar dataKey="customers" fill="#f59e0b" radius={[4, 4, 0, 0]} name="New Customers" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
