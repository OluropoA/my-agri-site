"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TickerItem {
    commodity: string;
    price: string;
    change: number;
    trend: 'up' | 'down' | 'stable';
}

const tickerData: TickerItem[] = [
    { commodity: "Maize (White)", price: "₦32,000", change: 2.5, trend: "up" },
    { commodity: "Rice (Local)", price: "₦58,000", change: -1.2, trend: "down" },
    { commodity: "Soybeans", price: "₦42,500", change: 4.1, trend: "up" },
    { commodity: "Palm Oil (25L)", price: "₦65,000", change: 3.14, trend: "up" },
    { commodity: "Yam (Large)", price: "₦4,500", change: 0, trend: "stable" },
    { commodity: "Cassava Flour", price: "₦18,500", change: -2.5, trend: "down" },
    { commodity: "Groundnut", price: "₦85,000", change: 1.8, trend: "up" },
    { commodity: "Sorghum", price: "₦28,000", change: -0.5, trend: "down" },
];

export default function TickerTape() {
    return (
        <div className="bg-white text-brand-charcoal py-2 overflow-hidden border-b border-brand-green/10 relative z-40 shadow-sm">
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear",
                    }}
                    className="flex space-x-8 px-4"
                >
                    {/* Repeat the list twice to create seamless loop effect */}
                    {[...tickerData, ...tickerData, ...tickerData].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                            <span className="font-bold text-brand-green">{item.commodity}</span>
                            <span className="font-mono font-medium">{item.price}</span>
                            <span className={`flex items-center text-xs ${item.trend === 'up' ? 'text-green-600' :
                                item.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                                }`}>
                                {item.trend === 'up' && <TrendingUp className="w-3 h-3 mr-1" />}
                                {item.trend === 'down' && <TrendingDown className="w-3 h-3 mr-1" />}
                                {item.trend === 'stable' && <Minus className="w-3 h-3 mr-1" />}
                                {Math.abs(item.change)}%
                            </span>
                            <span className="text-gray-300 mx-2">|</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
