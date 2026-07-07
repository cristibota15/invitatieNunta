export interface TimeLeft {
  zile: number
  ore: number
  minute: number
  secunde: number
}

export interface RSVPFormData {
  prenume: string
  nume: string
  participa: boolean | null
  numar_persoane: number
  // Numele persoanelor care însoțesc invitatul (când numar_persoane > 1)
  nume_insotitori: string
  mesaj: string
}

export type RSVPErrors = Partial<Record<keyof RSVPFormData, string>>
