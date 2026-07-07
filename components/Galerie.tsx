'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import weddingConfig from '@/config/config'
import type { GalleryPhoto } from '@/config/config'

/* ── Lightbox ─────────────────────────────────── */
function Lightbox({
  photo,
  onClose,
  onPrev,
  onNext,
}: {
  photo: GalleryPhoto
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  // Navigare cu tastatura
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm
                 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Imaginea */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-5xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={1200}
          height={800}
          className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
        />

        {/* Legendă */}
        <p className="text-center text-white/60 font-sans text-sm mt-3">{photo.alt}</p>
      </motion.div>

      {/* Buton închide */}
      <button
        onClick={onClose}
        aria-label="Închide"
        className="absolute top-4 right-4 w-10 h-10 rounded-full
                   bg-white/10 hover:bg-white/20 text-white
                   flex items-center justify-center text-xl
                   transition-colors duration-200"
      >
        ✕
      </button>

      {/* Buton anterior */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Fotografia anterioară"
        className="absolute left-4 top-1/2 -translate-y-1/2
                   w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                   text-white flex items-center justify-center text-xl
                   transition-colors duration-200"
      >
        ‹
      </button>

      {/* Buton următor */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Fotografia următoare"
        className="absolute right-4 top-1/2 -translate-y-1/2
                   w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                   text-white flex items-center justify-center text-xl
                   transition-colors duration-200"
      >
        ›
      </button>
    </motion.div>
  )
}

/* ── Galerie principală ───────────────────────── */
export default function Galerie() {
  const photos = weddingConfig.gallery
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openPhoto = (i: number) => setSelectedIndex(i)
  const closePhoto = () => setSelectedIndex(null)
  const prevPhoto = useCallback(() => {
    setSelectedIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length))
  }, [photos.length])
  const nextPhoto = useCallback(() => {
    setSelectedIndex((i) => (i === null ? null : (i + 1) % photos.length))
  }, [photos.length])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <>
      <section id="galerie" className="py-24 md:py-32 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14 md:mb-18">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-subtitle mb-4"
            >
              Momente prețioase
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="section-title"
            >
              Galerie foto
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="divider-gold mt-6 max-w-xs mx-auto"
            />
          </div>

          {/* Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => openPhoto(i)}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl
                           cursor-pointer shadow-sm hover:shadow-xl
                           transition-shadow duration-300"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700
                             group-hover:scale-110"
                />

                {/* Overlay la hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30
                                transition-colors duration-300
                                flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="w-12 h-12 rounded-full bg-white/90
                               flex items-center justify-center
                               text-[#3D2E1A] text-xl shadow-lg"
                  >
                    🔍
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox
            photo={photos[selectedIndex]}
            onClose={closePhoto}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </>
  )
}
