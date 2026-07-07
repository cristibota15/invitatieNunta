/**
 * config/config.ts
 *
 * Configurația centrală a website-ului de nuntă.
 * Modifică acest fișier pentru a personaliza site-ul pentru orice cuplu.
 */

export interface GalleryPhoto {
  src: string;
  alt: string;
}

export interface WeddingConfig {
  couple: {
    bride: string;
    groom: string;
  };
  wedding: {
    /** ISO 8601: "2027-08-15T14:00:00" – folosit pentru countdown */
    date: string;
    /** Text afișat: "15 August 2027" */
    displayDate: string;
    location: string;
  };
  ceremony: {
    name: string;
    address: string;
    displayTime: string;
    mapsUrl: string;
  };
  reception: {
    name: string;
    address: string;
    displayTime: string;
    mapsUrl: string;
  };
  dressCode: string;
  contact: {
    phoneCristian: string;
    phoneIoana: string;
    phone: string;
    email: string;
    instagram: string;
    instagramUrl: string;
    mapsUrl: string;
  };
  hero: {
    backgroundImage: string;
  };
  gallery: GalleryPhoto[];
  story: {
    text: string;
  };
  seo: {
    title: string;
    description: string;
    ogImage: string;
    url: string;
  };
}

const weddingConfig: WeddingConfig = {
  couple: {
    bride: "Ioana",
    groom: "Cristian",
  },

  wedding: {
    date: "2026-11-07T17:00:00",
    displayDate: "7 Noiembrie 2026",
    location: "Satu Mare",
  },

  ceremony: {
    name: "Biserica Sfinții Arhangheli Mihail și Gavril",
    address: "Strada Martirilor Deportați, Satu Mare",
    displayTime: "ora 17:00",
    mapsUrl: "https://maps.app.goo.gl/eJQgec6Pf3Du3YDj9",
  },

  reception: {
    name: "Restaurant Simfonia",
    address: "Strada Gorunului 6, Satu Mare",
    displayTime: "ora 19:00",
    mapsUrl: "https://maps.app.goo.gl/nxB8yhvduHbjQoza7",
  },

  dressCode: "Ținută elegantă",

  contact: {
    phoneCristian: "0749136210",
    phoneIoana: "0756566001",
    phone: "0749136210",
    email: "ioana.si.cristian@nunta2026.ro",
    instagram: "@ioana.si.cristian",
    instagramUrl: "https://instagram.com/ioana.si.cristian",
    mapsUrl: "https://maps.app.goo.gl/eJQgec6Pf3Du3YDj9",
  },

  hero: {
    backgroundImage: "/hero.jpg",
  },

  gallery: [
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      alt: "Cuplul nostru",
    },
    {
      src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80",
      alt: "Ceremonia",
    },
    {
      src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
      alt: "Verighetele",
    },
    {
      src: "https://images.unsplash.com/photo-1583939411023-14783179e581?w=800&q=80",
      alt: "Buchetul miresei",
    },
    {
      src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
      alt: "Primul dans",
    },
    {
      src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80",
      alt: "Petrecerea",
    },
  ],

  story: {
    text: "Din prima clipă am știut că destinul ne-a adus împreună. După ani de amintiri, călătorii și momente frumoase, a venit timpul să spunem DA și ne dorim să fiți alături de noi în cea mai importantă zi din viața noastră.",
  },

  seo: {
    title: "Ioana & Cristian – Invitație Nuntă | 7 Noiembrie 2026",
    description:
      "Vă invităm cu drag să fiți alături de noi în cea mai importantă zi din viața noastră. Satu Mare, 7 Noiembrie 2026.",
    ogImage: "https://www.ioana-si-cristian.org/hero.jpg",
    url: "https://www.ioana-si-cristian.org",
  },
};

export default weddingConfig;
