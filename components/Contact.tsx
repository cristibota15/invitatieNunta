'use client'

import { motion } from 'framer-motion'
import weddingConfig from '@/config/config'

const contactItems = [
  {
    icon: '🤵',
    label: 'Cristian',
    value: weddingConfig.contact.phoneCristian,
    href: `tel:${weddingConfig.contact.phoneCristian}`,
  },
  {
    icon: '👰',
    label: 'Ioana',
    value: weddingConfig.contact.phoneIoana,
    href: `tel:${weddingConfig.contact.phoneIoana}`,
  },
]

export default function Contact() {
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  }
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-cream">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-subtitle mb-4"
          >
            Întrebări?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="section-title"
          >
            Ne poți contacta
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="divider-gold mt-6 max-w-xs mx-auto"
          />
        </div>

        {/* Carduri telefon */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {contactItems.map(({ icon, label, value, href }) => (
            <motion.a
              key={label}
              variants={item}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              href={href}
              className="group bg-white rounded-2xl p-8 text-center
                         border border-cream-darker/50 shadow-sm
                         hover:shadow-md hover:border-gold/30
                         transition-all duration-300"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-2">
                {label}
              </p>
              <p className="font-cormorant text-2xl font-light text-[#3D2E1A]
                            group-hover:text-gold transition-colors duration-200">
                {value}
              </p>
              <p className="font-sans text-xs text-[#B09878] mt-2">Apasă pentru a suna</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}