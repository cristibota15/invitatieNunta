'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import weddingConfig from '@/config/config'

const navLinks = [
  { label: 'Detalii', href: '#detalii' },
  { label: 'RSVP', href: '#rsvp' },
  { label: 'Contact', href: '#contact' },
]

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6, ease: 'easeOut' }}
        className={[
          'fixed top-0 left-0 right-0 z-40',
          'transition-all duration-500',
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-cream-darker/30'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo / Nume */}
          <button
            onClick={() => scrollTo('#hero')}
            className={[
              'font-cormorant text-xl font-light transition-colors duration-300',
              scrolled ? 'text-[#3D2E1A]' : 'text-white',
            ].join(' ')}
          >
            {weddingConfig.couple.bride}
            <span className="text-gold mx-1.5">&</span>
            {weddingConfig.couple.groom}
          </button>

          {/* Navigare desktop */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => scrollTo(href)}
                className={[
                  'font-sans text-xs uppercase tracking-[0.15em]',
                  'transition-colors duration-200',
                  'hover:text-gold',
                  scrolled ? 'text-[#7A6548]' : 'text-white/80',
                ].join(' ')}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Buton mobile */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Meniu"
            className={[
              'md:hidden flex flex-col gap-1.5 p-2',
              scrolled ? 'text-[#3D2E1A]' : 'text-white',
            ].join(' ')}
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="block w-5 h-px bg-current transition-all"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="block w-5 h-px bg-current"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="block w-5 h-px bg-current transition-all"
            />
          </button>
        </div>
      </motion.header>

      {/* Meniu mobil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-30
                       bg-white/95 backdrop-blur-md shadow-lg
                       border-b border-cream-darker/40"
          >
            <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => { scrollTo(href); setMenuOpen(false) }}
                  className="text-left py-2.5 px-2
                             font-sans text-sm text-[#5A4028]
                             hover:text-gold transition-colors duration-200
                             border-b border-cream-darker/40 last:border-0
                             uppercase tracking-[0.1em]"
                >
                  {label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
