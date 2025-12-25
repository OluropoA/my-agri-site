"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MotionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
}

export const FadeIn = ({ children, className = "", delay = 0, duration = 0.5 }: MotionProps) => (
    <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

export const SlideUp = ({ children, className = "", delay = 0, duration = 0.5 }: MotionProps) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

export const ScaleIn = ({ children, className = "", delay = 0, duration = 0.5 }: MotionProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

export const StaggerContainer = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
    <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
            hidden: {},
            show: {
                transition: {
                    staggerChildren: 0.1,
                    delayChildren: delay,
                },
            },
        }}
        className={className}
    >
        {children}
    </motion.div>
);

export const StaggerItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        className={className}
    >
        {children}
    </motion.div>
);
