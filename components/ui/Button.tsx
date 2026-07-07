'use client'

import { motion } from 'framer-motion'
import { ReactNode, ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'outline-white' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
  fullWidth?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary: [
    'bg-gold text-white border-2 border-gold',
    'hover:bg-gold-700 hover:border-gold-700',
    'shadow-md hover:shadow-lg',
  ].join(' '),

  outline: [
    'bg-transparent text-gold border-2 border-gold',
    'hover:bg-gold hover:text-white',
  ].join(' '),

  'outline-white': [
    'bg-transparent text-white border-2 border-white/70',
    'hover:bg-white hover:text-[#3D2E1A]',
  ].join(' '),

  ghost: [
    'bg-transparent text-gold border-2 border-transparent',
    'hover:border-gold',
  ].join(' '),
}

export default function Button({
  variant = 'primary',
  children,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={fullWidth ? 'w-full' : 'inline-block'}
    >
      <button
        className={[
          'inline-flex w-full items-center justify-center gap-2',
          'px-8 py-3 rounded-full',
          'font-sans text-sm tracking-[0.15em] uppercase',
          'transition-all duration-300 cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-gold/40',
          variants[variant],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {children}
      </button>
    </motion.div>
  )
}
