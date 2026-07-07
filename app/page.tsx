import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import DetaliiEveniment from '@/components/DetaliiEveniment'
import RSVPForm from '@/components/RSVPForm'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

/**
 * Pagina principală – One Page Wedding Invitation
 *
 * Structura:
 *   1. Navbar        – navigare fixă transparentă
 *   2. Hero          – ecran complet cu parallax
 *   3. Poveste        – povestea cuplului
 *   4. DetaliiEvent   – ceremonie, petrecere, dress code
 *   5. Countdown      – numărătoare inversă
 *   6. Galerie        – galerie foto cu lightbox
 *   7. RSVPForm       – formular confirmare (Supabase)
 *   8. Contact        – date contact + Google Maps
 *   9. Footer
 */
export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <DetaliiEveniment />
      <RSVPForm />
      <Contact />
      <Footer />
    </main>
  )
}
