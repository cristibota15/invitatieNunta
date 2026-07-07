'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface RSVPRow {
  id: string
  created_at: string
  prenume: string
  nume: string
  participa: boolean
  numar_persoane: number
  nume_insotitori: string | null
  mesaj: string | null
}

export default function AdminDashboard() {
  const router = useRouter()
  const [rows, setRows] = useState<RSVPRow[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'toate' | 'da' | 'nu'>('toate')

  /* Verifică sesiunea și încarcă datele */
  const loadData = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/admin')
      return
    }

    const { data, error } = await supabase
      .from('rsvp')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) setRows(data)
    setLoading(false)
  }, [router])

  useEffect(() => { loadData() }, [loadData])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  /* Statistici */
  const total = rows.length
  const participa = rows.filter(r => r.participa).length
  const nuParticipa = rows.filter(r => !r.participa).length
  const totalPersoane = rows.filter(r => r.participa).reduce((s, r) => s + (r.numar_persoane || 0), 0)

  const filtered = filter === 'toate' ? rows
    : filter === 'da' ? rows.filter(r => r.participa)
    : rows.filter(r => !r.participa)

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">

      {/* Header */}
      <header className="bg-white border-b border-[#E6DDD0] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-cormorant text-2xl font-light text-[#3D2E1A]">
              💍 Admin Panel
            </h1>
            <p className="font-sans text-xs text-[#7A6548]">
              Ioana & Cristian — Nuntă 7 Noiembrie 2026
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="font-sans text-xs text-[#7A6548] hover:text-[#3D2E1A]
                       border border-[#E6DDD0] rounded-full px-4 py-2
                       hover:border-[#C9A07A] transition-all duration-200"
          >
            Deconectare
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* Statistici */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total răspunsuri', value: total, color: 'text-[#3D2E1A]' },
            { label: 'Participă', value: participa, color: 'text-green-600' },
            { label: 'Nu participă', value: nuParticipa, color: 'text-red-400' },
            { label: 'Total persoane', value: totalPersoane, color: 'text-[#C9A07A]' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-[#E6DDD0] shadow-sm text-center">
              <p className={`font-cormorant text-4xl font-light ${color}`}>{value}</p>
              <p className="font-sans text-xs text-[#7A6548] mt-1 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>

        {/* Filtre + Refresh */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {(['toate', 'da', 'nu'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={[
                  'font-sans text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition-all duration-200',
                  filter === f
                    ? 'bg-[#C9A07A] text-white border-[#C9A07A]'
                    : 'bg-white text-[#7A6548] border-[#E6DDD0] hover:border-[#C9A07A]',
                ].join(' ')}
              >
                {f === 'toate' ? 'Toate' : f === 'da' ? '✓ Participă' : '✗ Nu participă'}
              </button>
            ))}
          </div>
          <button
            onClick={loadData}
            className="font-sans text-xs text-[#7A6548] hover:text-[#C9A07A]
                       flex items-center gap-1.5 transition-colors duration-200"
          >
            ↻ Actualizează
          </button>
        </div>

        {/* Tabel */}
        <div className="bg-white rounded-2xl border border-[#E6DDD0] shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="text-center py-16 font-cormorant text-2xl text-[#B09878] font-light">
              Nicio confirmare încă
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E6DDD0] bg-cream">
                    <th className="text-left px-5 py-3 font-sans text-xs uppercase tracking-wider text-[#7A6548]">Nume</th>
                    <th className="text-left px-5 py-3 font-sans text-xs uppercase tracking-wider text-[#7A6548]">Participă</th>
                    <th className="text-left px-5 py-3 font-sans text-xs uppercase tracking-wider text-[#7A6548]">Persoane</th>
                    <th className="text-left px-5 py-3 font-sans text-xs uppercase tracking-wider text-[#7A6548]">Însoțitori</th>
                    <th className="text-left px-5 py-3 font-sans text-xs uppercase tracking-wider text-[#7A6548]">Mesaj</th>
                    <th className="text-left px-5 py-3 font-sans text-xs uppercase tracking-wider text-[#7A6548]">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, i) => (
                    <tr
                      key={row.id}
                      className={[
                        'border-b border-[#E6DDD0] last:border-0 transition-colors duration-150',
                        i % 2 === 0 ? 'bg-white' : 'bg-cream/40',
                      ].join(' ')}
                    >
                      <td className="px-5 py-4 font-sans text-sm text-[#3D2E1A] font-medium">
                        {row.prenume} {row.nume}
                      </td>
                      <td className="px-5 py-4">
                        <span className={[
                          'inline-flex items-center px-3 py-1 rounded-full text-xs font-sans font-medium',
                          row.participa
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-red-50 text-red-500 border border-red-200',
                        ].join(' ')}>
                          {row.participa ? '✓ Da' : '✗ Nu'}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-sans text-sm text-[#7A6548]">
                        {row.participa ? row.numar_persoane : '—'}
                      </td>
                      <td className="px-5 py-4 font-sans text-sm text-[#7A6548] max-w-[160px]">
                        {row.nume_insotitori ? (
                          <span>{row.nume_insotitori}</span>
                        ) : (
                          <span className="text-[#B09878]">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4 font-sans text-sm text-[#7A6548] max-w-xs">
                        {row.mesaj ? (
                          <span className="italic">&ldquo;{row.mesaj}&rdquo;</span>
                        ) : (
                          <span className="text-[#B09878]">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4 font-sans text-xs text-[#B09878] whitespace-nowrap">
                        {new Date(row.created_at).toLocaleDateString('ro-RO', {
                          day: '2-digit', month: 'short', year: 'numeric',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-center font-sans text-xs text-[#B09878]">
          {filtered.length} {filtered.length === 1 ? 'răspuns' : 'răspunsuri'} afișate
        </p>
      </div>
    </div>
  )
}
