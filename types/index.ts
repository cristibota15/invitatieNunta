/** Datele trimise prin formularul RSVP */
export interface RSVPFormData {
  prenume: string;
  nume: string;
  email: string;
  telefon: string;
  participa: boolean | null;
  numar_persoane: number;
  preferinte_alimentare: string;
  mesaj: string;
}

/** Erori de validare */
export type RSVPErrors = Partial<Record<keyof RSVPFormData, string>>;

/** Starea componentei Countdown */
export interface TimeLeft {
  zile: number;
  ore: number;
  minute: number;
  secunde: number;
}
