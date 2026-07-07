'use client'

import { motion } from 'framer-motion'
import weddingConfig from '@/config/config'

interface EventCardProps {
  icon: string
  title: string
  subtitle?: string
  venueName: string
  details: { icon: string; text: string }[]
  delay?: number
  mapsUrl?: string
}

function EventCard({ icon, title, subtitle, venueName, details, delay = 0, mapsUrl }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-sm
                 border border-cream-darker/50 hover:shadow-lg
                 transition-shadow duration-300 text-center"
    >
      {/* Linie decorativă sus */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5
                      bg-gradient-to-r from-transparent via-gold to-transparent
                      rounded-full" />

      {/* Iconiță */}
      <div className="text-4xl mb-5">{icon}</div>

      {/* Titlu card */}
      <h3 className="font-cormorant text-2xl md:text-3xl font-light text-[#3D2E1A] mb-1">
        {title}
      </h3>

      {subtitle && (
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-6">
          {subtitle}
        </p>
      )}

      {/* Separator */}
      <div className="w-10 h-px bg-gold/40 mx-auto mb-6" />

      {/* Numele locației – container cu înălțime minimă fixă pentru aliniere între carduri */}
      <div className="min-h-[4rem] flex items-start justify-center gap-2 text-[#7A6548] mb-3">
        <span className="text-base mt-0.5 shrink-0">📍</span>
        <span className="font-sans text-sm leading-relaxed">{venueName}</span>
      </div>

      {/* Detalii – adresă + oră */}
      <ul className="space-y-3">
        {details.map((d, i) => (
          <li key={i} className="flex items-start justify-center gap-2 text-[#7A6548]">
            <span className="text-base mt-0.5 shrink-0">{d.icon}</span>
            <span className="font-sans text-sm leading-relaxed">{d.text}</span>
          </li>
        ))}
      </ul>

      {/* Buton Maps pe card */}
      {mapsUrl && (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 mt-6
                     text-gold hover:text-[#A07840] font-sans text-xs
                     uppercase tracking-[0.15em] border-b border-gold/40
                     hover:border-gold pb-0.5 transition-all duration-200"
        >
          <span>📍</span>
          <span>Vezi pe Maps</span>
        </a>
      )}
    </motion.div>
  )
}

export default function DetaliiEveniment() {
  const cards: EventCardProps[] = [
    {
      icon: '⛪',
      title: 'Ceremonia religioasă',
      subtitle: weddingConfig.ceremony.displayTime,
      delay: 0.1,
      mapsUrl: weddingConfig.ceremony.mapsUrl,
      venueName: weddingConfig.ceremony.name,
      details: [
        { icon: '🗺️', text: weddingConfig.ceremony.address },
        { icon: '🕐', text: weddingConfig.ceremony.displayTime },
      ],
    },
    {
      icon: '🥂',
      title: 'Petrecerea',
      subtitle: weddingConfig.reception.displayTime,
      delay: 0.25,
      mapsUrl: weddingConfig.reception.mapsUrl,
      venueName: weddingConfig.reception.name,
      details: [
        { icon: '🗺️', text: weddingConfig.reception.address },
        { icon: '🕐', text: weddingConfig.reception.displayTime },
      ],
    },
  ]

  return (
    <section
      id="detalii"
      className="py-24 md:py-32 px-6 bg-cream-dark"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header secțiune */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-subtitle mb-4"
          >
            Programul zilei
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="section-title"
          >
            Detalii eveniment
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="divider-gold mt-6 max-w-xs mx-auto"
          />
        </div>

        {/* Grid carduri */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-3xl mx-auto">
          {cards.map((card, i) => (
            <EventCard key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
