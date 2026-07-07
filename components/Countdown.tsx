'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import weddingConfig from '@/config/config'
import type { TimeLeft } from '@/types'

/* Calculează timpul rămas până la data nunții */
function calcTimeLeft(): TimeLeft {
  const target = new Date(weddingConfig.wedding.date).getTime()
  const diff = target - Date.now()

  if (diff <= 0) return { zile: 0, ore: 0, minute: 0, secunde: 0 }

  return {
    zile: Math.floor(diff / (1000 * 60 * 60 * 24)),
    ore: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minute: Math.floor((diff / (1000 * 60)) % 60),
    secunde: Math.floor((diff / 1000) % 60),
  }
}

/* Un singur câmp din countdown */
function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
      className="flex flex-col items-center"
    >
      {/* Card număr */}
      <div
        className="w-16 h-16 xs:w-20 xs:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32
                    bg-white/10 backdrop-blur-sm
                    border border-white/20
                    rounded-xl md:rounded-2xl
                    flex items-center justify-center
                    shadow-lg"
      >
        <motion.span
          key={value}
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="font-cormorant text-3xl xs:text-4xl md:text-5xl lg:text-6xl
                     font-light text-white tabular-nums"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </div>

      {/* Label */}
      <span className="mt-2 md:mt-3 font-sans text-[10px] xs:text-xs md:text-sm
                       uppercase tracking-[0.15em] md:tracking-[0.2em] text-white/70">
        {label}
      </span>
    </motion.div>
  )
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ zile: 0, ore: 0, minute: 0, secunde: 0 })
  const [mounted, setMounted] = useState(false)

  const update = useCallback(() => setTimeLeft(calcTimeLeft()), [])

  useEffect(() => {
    setMounted(true)
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [update])

  const units = [
    { value: timeLeft.zile,    label: 'Zile' },
    { value: timeLeft.ore,     label: 'Ore' },
    { value: timeLeft.minute,  label: 'Minute' },
    { value: timeLeft.secunde, label: 'Secunde' },
  ]

  return (
    <section
      id="countdown"
      className="relative py-28 md:py-36 px-6 overflow-hidden"
    >
      {/* Fundal gradient bogat */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3D2E1A] via-[#5A3E20] to-[#2A1E10]" />

      {/* Decoratiune geometrica */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #C9A07A 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Subtitlu */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-sans text-xs uppercase tracking-[0.3em] text-gold-300 mb-4"
        >
          Până la marele eveniment
        </motion.p>

        {/* Titlu */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-cormorant text-4xl md:text-5xl lg:text-6xl
                     font-light text-white leading-tight mb-4"
        >
          Numărătoarea inversă
        </motion.h2>

        {/* Data nunții */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-sm text-gold-300 uppercase tracking-widest mb-14"
        >
          {weddingConfig.wedding.displayDate} · {weddingConfig.wedding.location}
        </motion.p>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent mb-14"
        />

        {/* Contoare */}
        {mounted && (
          <div className="flex items-end justify-center gap-2 xs:gap-3 md:gap-6 lg:gap-10">
            {units.map((u, i) => (
              <div key={u.label} className="flex items-end gap-2 xs:gap-3 md:gap-6 lg:gap-10">
                <CountdownUnit value={u.value} label={u.label} />
                {i < units.length - 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="font-cormorant text-2xl xs:text-3xl md:text-4xl
                               text-gold/60 mb-6 xs:mb-7 md:mb-10"
                  >
                    :
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
