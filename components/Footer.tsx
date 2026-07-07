'use client'

import { motion } from 'framer-motion'
import weddingConfig from '@/config/config'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-[#3D2E1A] text-white overflow-hidden">

      {/* Pattern decorativ */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #C9A07A 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Linie aurie sus */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="relative py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">

          {/* Ornament */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl mb-8"
          >
            💍
          </motion.div>

          {/* Citat */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-cormorant text-xl md:text-2xl font-light
                       text-white/80 italic leading-relaxed mb-8 max-w-xl mx-auto"
          >
            &ldquo;Abia așteptăm să sărbătorim împreună cea mai frumoasă
            zi din viața noastră.&rdquo;
          </motion.p>

          {/* Separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-8"
          />

          {/* Numele mirilor */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-cormorant text-3xl md:text-4xl font-light text-gold-300"
          >
            {weddingConfig.couple.bride}
            <span className="mx-3 text-2xl">❤️</span>
            {weddingConfig.couple.groom}
          </motion.p>

          {/* Data */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="font-sans text-xs uppercase tracking-[0.25em]
                       text-white/40 mt-4"
          >
            {weddingConfig.wedding.displayDate} · {weddingConfig.wedding.location}
          </motion.p>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="font-sans text-xs text-white/25 mt-12"
          >
            © {year}
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
