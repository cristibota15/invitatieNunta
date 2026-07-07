'use client'

import { motion } from 'framer-motion'
import weddingConfig from '@/config/config'

/* Ornament SVG floral discret */
function FloralOrnament() {
  return (
    <svg
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-40 h-auto mx-auto"
      aria-hidden="true"
    >
      <path
        d="M100 20 C80 5, 60 5, 50 20 C60 35, 80 35, 100 20Z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M100 20 C120 5, 140 5, 150 20 C140 35, 120 35, 100 20Z"
        fill="currentColor"
        opacity="0.3"
      />
      <circle cx="100" cy="20" r="4" fill="currentColor" opacity="0.6" />
      <circle cx="50"  cy="20" r="2.5" fill="currentColor" opacity="0.4" />
      <circle cx="150" cy="20" r="2.5" fill="currentColor" opacity="0.4" />
      <path d="M20 20 H44"  stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <path d="M156 20 H180" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
  )
}

export default function Poveste() {
  return (
    <section
      id="poveste"
      className="relative py-28 md:py-36 px-6 overflow-hidden"
    >
      {/* Fundal cu pattern discret */}
      <div className="absolute inset-0 floral-bg opacity-60 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">

        {/* Subtitlu */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-subtitle mb-4"
        >
          Cum a început totul
        </motion.p>

        {/* Titlu */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="section-title mb-6"
        >
          Povestea noastră
        </motion.h2>

        {/* Ornament floral */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gold mb-10"
        >
          <FloralOrnament />
        </motion.div>

        {/* Separator auriu */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="divider-gold mb-10"
        />

        {/* Paragraful poveștii */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="font-cormorant text-xl md:text-2xl font-light text-[#5A4028] leading-relaxed italic"
        >
          &ldquo;{weddingConfig.story.text}&rdquo;
        </motion.p>

        {/* Semnătura */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-8 font-cormorant text-2xl text-gold font-medium"
        >
          {weddingConfig.couple.bride} & {weddingConfig.couple.groom}
        </motion.p>

        {/* Separator jos */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="divider-gold mt-10"
        />
      </div>
    </section>
  )
}
