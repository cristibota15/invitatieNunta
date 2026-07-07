'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  /** Activează animația fade-up la scroll */
  animate?: boolean
  /** Delay pentru animație stagger (secunde) */
  delay?: number
  hoverable?: boolean
}

export default function Card({
  children,
  className = '',
  animate = true,
  delay = 0,
  hoverable = false,
}: CardProps) {
  const baseClasses = [
    'bg-white rounded-2xl shadow-sm border border-cream-darker/60',
    'overflow-hidden',
    hoverable ? 'hover:shadow-md hover:-translate-y-1 transition-all duration-300' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (!animate) {
    return <div className={baseClasses}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={baseClasses}
    >
      {children}
    </motion.div>
  )
}
