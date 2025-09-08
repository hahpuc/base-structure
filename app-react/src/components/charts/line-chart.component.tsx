import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface LineChartComponentProps {
  title?: string;
  height?: number;
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({
  title = 'Revenue Trend',
  height = 300,
}) => {
  const data = [
    {
      name: 'Jan',
      revenue: 4000,
      profit: 2400,
      expenses: 1600,
    },
    {
      name: 'Feb',
      revenue: 3000,
      profit: 1398,
      expenses: 1602,
    },
    {
      name: 'Mar',
      revenue: 2000,
      profit: 9800,
      expenses: 1800,
    },
    {
      name: 'Apr',
      revenue: 2780,
      profit: 3908,
      expenses: 2000,
    },
    {
      name: 'May',
      revenue: 1890,
      profit: 4800,
      expenses: 2181,
    },
    {
      name: 'Jun',
      revenue: 2390,
      profit: 3800,
      expenses: 2500,
    },
    {
      name: 'Jul',
      revenue: 3490,
      profit: 4300,
      expenses: 2100,
    },
  ];

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{
            top: 5,
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
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
