import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prenume, nume, participa, numar_persoane, nume_insotitori, mesaj } = body

    /* 1. Salvează în Supabase */
    const { error: dbError } = await supabase.from('rsvp').insert([{
      prenume: prenume?.trim(),
      nume: nume?.trim(),
      participa,
      numar_persoane: participa ? numar_persoane : 0,
      nume_insotitori: nume_insotitori?.trim() || null,
      mesaj: mesaj?.trim() || null,
    }])

    if (dbError) throw dbError

    /* 2. Trimite email de notificare */
    if (process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL) {
      const participaText = participa ? '✅ DA' : '❌ NU'
      const persoaneText = participa
        ? `${numar_persoane} ${numar_persoane === 1 ? 'persoană' : 'persoane'}`
        : '—'

      await resend.emails.send({
        from: 'Invitatie Nunta <nunta@ioana-si-cristian.org>',
        to: process.env.NOTIFY_EMAIL,
        subject: `💍 Confirmare nouă: ${prenume} ${nume} – ${participaText}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #FAF7F2; border-radius: 12px;">
            <h1 style="font-size: 28px; font-weight: 300; color: #3D2E1A; margin-bottom: 4px;">
              💍 Confirmare nouă
            </h1>
            <p style="color: #C9A07A; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px;">
              Ioana & Cristian — Nuntă 7 Noiembrie 2026
            </p>

            <hr style="border: none; border-top: 1px solid #E6DDD0; margin-bottom: 24px;" />

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #7A6548; font-size: 13px; width: 140px;">Nume</td>
                <td style="padding: 8px 0; color: #3D2E1A; font-size: 15px; font-weight: bold;">${prenume} ${nume}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #7A6548; font-size: 13px;">Participă</td>
                <td style="padding: 8px 0; font-size: 15px; color: ${participa ? '#16a34a' : '#ef4444'}; font-weight: bold;">${participaText}</td>
              </tr>
              ${participa ? `
              <tr>
                <td style="padding: 8px 0; color: #7A6548; font-size: 13px;">Persoane</td>
                <td style="padding: 8px 0; color: #3D2E1A; font-size: 15px;">${persoaneText}</td>
              </tr>
              ${nume_insotitori ? `
              <tr>
                <td style="padding: 8px 0; color: #7A6548; font-size: 13px;">Însoțitori</td>
                <td style="padding: 8px 0; color: #3D2E1A; font-size: 15px;">${nume_insotitori}</td>
              </tr>
              ` : ''}
              ` : ''}
              ${mesaj ? `
              <tr>
                <td style="padding: 8px 0; color: #7A6548; font-size: 13px; vertical-align: top;">Mesaj</td>
                <td style="padding: 8px 0; color: #3D2E1A; font-size: 15px; font-style: italic;">"${mesaj}"</td>
              </tr>
              ` : ''}
            </table>

            <hr style="border: none; border-top: 1px solid #E6DDD0; margin: 24px 0 16px;" />
            <p style="color: #B09878; font-size: 12px; text-align: center;">
              Vezi toți invitații în <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/dashboard" style="color: #C9A07A;">Admin Panel</a>
            </p>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('RSVP error:', err)
    return NextResponse.json({ error: 'Eroare la salvare' }, { status: 500 })
  }
}
