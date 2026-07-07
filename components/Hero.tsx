'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import weddingConfig from '@/config/config'
import Button from './ui/Button'

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function calcTimeLeft() {
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

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [timeLeft, setTimeLeft] = useState({ zile: 0, ore: 0, minute: 0, secunde: 0 })
  const [mounted, setMounted] = useState(false)

  const update = useCallback(() => setTimeLeft(calcTimeLeft()), [])
  useEffect(() => {
    setMounted(true)
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [update])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const scrollToRSVP = () => {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
  }

  const units = [
    { value: timeLeft.zile,    label: 'Zile' },
    { value: timeLeft.ore,     label: 'Ore' },
    { value: timeLeft.minute,  label: 'Minute' },
    { value: timeLeft.secunde, label: 'Secunde' },
  ]

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center"
    >
      {/* Fundal cu parallax */}
      <motion.div className="absolute inset-0 scale-110" style={{ y: backgroundY }}>
        <Image
          src={weddingConfig.hero.backgroundImage}
          alt={`Nunta ${weddingConfig.couple.bride} & ${weddingConfig.couple.groom}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />

      {/* Conținut */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto mt-32 md:mt-40">

        {/* Subtitlu */}
        <motion.div
          custom={0.1} initial="hidden" animate="visible" variants={fadeUp}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <span className="h-px w-12 bg-white/40" />
          <span className="text-xs uppercase tracking-[0.3em] text-white/70 font-sans font-light">
            Vă invităm să sărbătoriți alături de noi
          </span>
          <span className="h-px w-12 bg-white/40" />
        </motion.div>

        {/* Numele mirilor */}
        <motion.h1
          custom={0.35} initial="hidden" animate="visible" variants={fadeUp}
          className="font-cormorant font-light leading-none mb-8"
          style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
        >
          {weddingConfig.couple.bride}
          <span className="text-gold-300 mx-3 md:mx-5 font-light italic" style={{ fontSize: '0.45em' }}>&</span>
          {weddingConfig.couple.groom}
        </motion.h1>

        {/* Data și locația */}
        <motion.div
          custom={0.6} initial="hidden" animate="visible" variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-3 mb-10 text-white/80"
        >
          <span className="font-sans text-sm md:text-base tracking-widest uppercase">
            {weddingConfig.wedding.displayDate}
          </span>
          <span className="text-gold-300 text-lg">✦</span>
          <span className="font-sans text-sm md:text-base tracking-widest uppercase">
            {weddingConfig.wedding.location}
          </span>
        </motion.div>

        {/* Buton CTA */}
        <motion.div custom={0.85} initial="hidden" animate="visible" variants={fadeUp}>
          <Button variant="outline-white" onClick={scrollToRSVP}>
            Confirmă prezența
          </Button>
        </motion.div>

        {/* Countdown */}
        {mounted && (
          <motion.div
            custom={1.05} initial="hidden" animate="visible" variants={fadeUp}
            className="mt-10 flex items-end justify-center gap-3 md:gap-6"
          >
            {units.map((u, i) => (
              <div key={u.label} className="flex items-end gap-3 md:gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 md:w-18 md:h-18 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center">
                    <motion.span
                      key={u.value}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="font-cormorant text-2xl md:text-3xl font-light text-white tabular-nums"
                    >
                      {String(u.value).padStart(2, '0')}
                    </motion.span>
                  </div>
                  <span className="mt-1.5 font-sans text-[10px] uppercase tracking-[0.15em] text-white/60">
                    {u.label}
                  </span>
                </div>
                {i < units.length - 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="font-cormorant text-xl text-white/40 mb-6"
                  >
                    :
                  </motion.span>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Indicator scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
