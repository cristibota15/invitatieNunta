'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { RSVPFormData, RSVPErrors } from '@/types'
import Button from './ui/Button'

/* ── Validare form ──────────────────────────────── */
function validateForm(data: RSVPFormData): RSVPErrors {
  const errors: RSVPErrors = {}

  if (!data.prenume.trim()) errors.prenume = 'Prenumele este obligatoriu'
  if (!data.nume.trim()) errors.nume = 'Numele este obligatoriu'
  if (data.participa === null) errors.participa = 'Te rugăm să selectezi o opțiune'
  if (data.participa === true && data.numar_persoane < 1) {
    errors.numar_persoane = 'Numărul de persoane trebuie să fie cel puțin 1'
  }

  return errors
}

/* ── Câmp de input cu label și eroare ──────────── */
function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-sans text-sm text-[#5A4028] font-medium">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-red-400 text-xs font-sans"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Stare inițială a formularului ─────────────── */
const initialFormData: RSVPFormData = {
  prenume: '',
  nume: '',
  participa: null,
  numar_persoane: 1,
  nume_insotitori: '',
  mesaj: '',
}

/* ── Componenta principală ──────────────────────── */
export default function RSVPForm() {
  const [formData, setFormData] = useState<RSVPFormData>(initialFormData)
  const [errors, setErrors] = useState<RSVPErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function update<K extends keyof RSVPFormData>(key: K, value: RSVPFormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('server error')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  /* ── Mesaj de succes ── */
  if (status === 'success') {
    return (
      <section id="rsvp" className="py-24 md:py-32 px-6 bg-cream-dark">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="bg-white rounded-3xl p-10 md:p-14 text-center shadow-md
                       border border-cream-darker/50"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-6xl mb-6"
            >
              🌸
            </motion.div>
            <h3 className="font-cormorant text-3xl md:text-4xl font-light text-[#3D2E1A] mb-4">
              Mulțumim!
            </h3>
            <p className="font-sans text-[#7A6548] leading-relaxed">
              Confirmarea ta a fost înregistrată cu succes. Abia așteptăm să te vedem
              la cel mai frumos eveniment din viața noastră! 💛
            </p>
            <div className="divider-gold mt-8" />
          </motion.div>
        </div>
      </section>
    )
  }

  /* ── Formularul ── */
  return (
    <section id="rsvp" className="py-24 md:py-32 px-6 bg-cream-dark">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-subtitle mb-4"
          >
            Răspunde invitației
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="section-title"
          >
            Confirmă participarea
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="divider-gold mt-6 max-w-xs mx-auto"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-sans text-sm text-[#7A6548] mt-6"
          >
            Te rugăm să confirmi prezența până pe{' '}
            <strong className="text-[#5A4028]">10 Octombrie 2026</strong>
          </motion.p>
        </div>

        {/* Card formular */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm
                     border border-cream-darker/50"
        >
          <form onSubmit={handleSubmit} noValidate className="space-y-6">

            {/* Prenume + Nume */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField label="Prenume" error={errors.prenume} required>
                <input
                  type="text"
                  value={formData.prenume}
                  onChange={(e) => update('prenume', e.target.value)}
                  placeholder="ex: Maria"
                  className="form-input"
                />
              </FormField>
              <FormField label="Nume" error={errors.nume} required>
                <input
                  type="text"
                  value={formData.nume}
                  onChange={(e) => update('nume', e.target.value)}
                  placeholder="ex: Ionescu"
                  className="form-input"
                />
              </FormField>
            </div>

            {/* Participare */}
            <FormField label="Vei participa?" error={errors.participa} required>
              <div className="flex gap-4">
                {[
                  { value: true,  label: '✓  Da, voi fi prezent(ă)' },
                  { value: false, label: '✗  Nu pot participa' },
                ].map(({ value, label }) => (
                  <button
                    key={String(value)}
                    type="button"
                    onClick={() => update('participa', value)}
                    className={[
                      'flex-1 py-3 px-4 rounded-xl border-2 text-sm font-sans',
                      'transition-all duration-200 cursor-pointer',
                      formData.participa === value
                        ? 'border-gold bg-gold/10 text-[#3D2E1A] font-medium'
                        : 'border-cream-darker text-[#7A6548] hover:border-gold/50',
                    ].join(' ')}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </FormField>

            {/* Număr persoane – apare doar dacă participă */}
            <AnimatePresence>
              {formData.participa === true && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormField
                    label="Număr persoane (inclusiv tu)"
                    error={errors.numar_persoane}
                    required
                  >
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={formData.numar_persoane}
                      onChange={(e) => update('numar_persoane', Number(e.target.value))}
                      className="form-input"
                    />
                  </FormField>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Numele însoțitorilor – apare când sunt mai mult de 1 persoană */}
            <AnimatePresence>
              {formData.participa === true && formData.numar_persoane > 1 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormField
                    label={`Numele însoțitorilor (${formData.numar_persoane - 1} ${formData.numar_persoane - 1 === 1 ? 'persoană' : 'persoane'})`}
                    error={errors.nume_insotitori}
                  >
                    <textarea
                      value={formData.nume_insotitori}
                      onChange={(e) => update('nume_insotitori', e.target.value)}
                      placeholder={`ex: ${formData.numar_persoane === 2 ? 'Ion Popescu' : 'Ion Popescu, Ana Ionescu...'}`}
                      rows={formData.numar_persoane > 3 ? 3 : 2}
                      className="form-input resize-none"
                    />
                  </FormField>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mesaj */}
            <FormField label="Mesaj pentru miri" error={errors.mesaj}>
              <textarea
                value={formData.mesaj}
                onChange={(e) => update('mesaj', e.target.value)}
                placeholder="Orice dorești să ne transmiți..."
                rows={4}
                className="form-input resize-none"
              />
            </FormField>

            {/* Eroare generală */}
            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-50 border border-red-200 rounded-xl p-4
                             text-red-600 text-sm font-sans"
                >
                  A apărut o eroare. Te rugăm să încerci din nou.
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buton submit */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white
                                     rounded-full animate-spin" />
                    Se trimite...
                  </span>
                ) : (
                  'Trimite confirmarea'
                )}
              </Button>
            </div>

            <p className="text-center font-sans text-xs text-[#B09878]">
              Câmpurile marcate cu <span className="text-gold">*</span> sunt obligatorii
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
