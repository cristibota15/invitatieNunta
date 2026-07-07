'use client'

import { useState, FormEvent } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email sau parolă incorectă.')
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-3xl mb-2">💍</p>
          <h1 className="font-cormorant text-3xl font-light text-[#3D2E1A]">
            Admin Panel
          </h1>
          <p className="font-sans text-sm text-[#7A6548] mt-1">
            Ioana & Cristian — Nuntă 2026
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E6DDD0]">
          <form onSubmit={handleLogin} className="space-y-5">

            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-sm text-[#5A4028] font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@email.ro"
                required
                className="form-input"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-sm text-[#5A4028] font-medium">
                Parolă
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="form-input"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs font-sans text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#C9A07A] text-white
                         font-sans text-sm uppercase tracking-[0.15em]
                         hover:bg-[#A07840] transition-colors duration-200
                         disabled:opacity-60 cursor-pointer"
            >
              {loading ? 'Se conectează...' : 'Intră în cont'}
            </button>
          </form>
        </div>

        <p className="text-center font-sans text-xs text-[#B09878] mt-6">
          Acces restricționat — doar pentru miri
        </p>
      </div>
    </div>
  )
}
