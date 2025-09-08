import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface AreaChartComponentProps {
  title?: string;
  height?: number;
}

const AreaChartComponent: React.FC<AreaChartComponentProps> = ({
  title = 'User Activity',
  height = 300,
}) => {
  const data = [
    {
      name: 'Mon',
      activeUsers: 4000,
      newUsers: 2400,
      pageViews: 8000,
    },
    {
      name: 'Tue',
      activeUsers: 3000,
      newUsers: 1398,
      pageViews: 6500,
    },
    {
      name: 'Wed',
      activeUsers: 2000,
      newUsers: 2800,
      pageViews: 5500,
    },
    {
      name: 'Thu',
      activeUsers: 2780,
      newUsers: 3908,
      pageViews: 7200,
    },
    {
      name: 'Fri',
      activeUsers: 1890,
      newUsers: 4800,
      pageViews: 8800,
    },
    {
      name: 'Sat',
      activeUsers: 2390,
      newUsers: 3800,
      pageViews: 6900,
    },
    {
      name: 'Sun',
      activeUsers: 3490,
      newUsers: 4300,
      pageViews: 7800,
    },
  ];

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
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
          <Area
            type="monotone"
            dataKey="pageViews"
            stackId="1"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
            name="Page Views"
          />
          <Area
            type="monotone"
            dataKey="activeUsers"
            stackId="1"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.6}
            name="Active Users"
          />
          <Area
            type="monotone"
            dataKey="newUsers"
            stackId="1"
            stroke="#f59e0b"
            fill="#f59e0b"
            fillOpacity={0.6}
            name="New Users"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;
