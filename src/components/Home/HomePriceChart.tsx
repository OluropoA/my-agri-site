"use client";

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

// Mock data for the last 6 months
const chartData = [
    { month: 'Jul', Maize: 28000, Rice: 52000, Yam: 3500 },
    { month: 'Aug', Maize: 30000, Rice: 55000, Yam: 3200 },
    { month: 'Sep', Maize: 29000, Rice: 54000, Yam: 3000 },
    { month: 'Oct', Maize: 31000, Rice: 56000, Yam: 3800 },
    { month: 'Nov', Maize: 32500, Rice: 59000, Yam: 4200 },
    { month: 'Dec', Maize: 34000, Rice: 62000, Yam: 4500 },
];

export default function HomePriceChart() {
    const formatPrice = (value: number) => {
        if (value >= 1000) {
            return `₦${(value / 1000).toFixed(0)}k`;
        }
        return `₦${value}`;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-brand-green/10 h-[350px]">
            <h3 className="text-lg font-bold text-brand-charcoal mb-4 font-primary">
                6-Month Price Trend (Lagos Market)
            </h3>
            <ResponsiveContainer width="100%" height="85%">
                <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        tickFormatter={formatPrice}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        formatter={(value: number) => [`₦${value.toLocaleString()}`, '']}
                        labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Rice"
                        stroke="#DAA520"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6, fill: '#DAA520' }}
                        name="Rice (50kg)"
                    />
                    <Line
                        type="monotone"
                        dataKey="Maize"
                        stroke="#2D5016"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6, fill: '#2D5016' }}
                        name="Maize (100kg)"
                    />
                </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-2 text-sm text-gray-600">
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#DAA520] mr-2"></div>
                    Rice (50kg)
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#2D5016] mr-2"></div>
                    Maize (100kg)
                </div>
            </div>
        </div>
    );
}
