// This is a mock service that would normally interact with a backend API
// For now, we'll use localStorage to persist data

// Sample data for challenges
const sampleChallenges = [
  {
    id: "1",
    title: "Completa il profilo",
    description: "Completa tutte le sezioni del tuo profilo professionale",
    type: "profile",
    points: 20,
    completed: false,
    actionText: "Completa profilo",
  },
  {
    id: "2",
    title: "Aggiungi foto profilo",
    description: "Carica una foto professionale per il tuo profilo",
    type: "profile",
    points: 10,
    completed: false,
    actionText: "Carica foto",
  },
  {
    id: "3",
    title: "Aggiungi esperienze",
    description: "Inserisci almeno 2 esperienze lavorative passate",
    type: "profile",
    points: 15,
    completed: false,
    actionText: "Aggiungi esperienze",
  },
  {
    id: "4",
    title: "Carica CV",
    description: "Carica il tuo curriculum vitae in formato PDF",
    type: "cv",
    points: 15,
    completed: false,
    actionText: "Carica CV",
  },
  {
    id: "5",
    title: "Accedi per 5 giorni",
    description: "Accedi alla piattaforma per 5 giorni consecutivi",
    type: "activity",
    requirement: "5 giorni consecutivi",
    points: 10,
    completed: false,
  },
  {
    id: "6",
    title: "Candidati a 3 offerte",
    description: "Candidati ad almeno 3 offerte di lavoro",
    type: "activity",
    requirement: "3 candidature",
    points: 20,
    completed: false,
  },
  {
    id: "7",
    title: "Profilo verificato",
    description: "Ottieni la verifica del tuo profilo da parte del team Restworld",
    type: "achievement",
    points: 30,
    completed: false,
  },
]

// Get user profile from localStorage
export const getUserProfile = async () => {
  if (typeof window === "undefined") return null

    return {
      personal: {
        firstName: "Mario",
        lastName: "Linguini",
        photo: "/images/foto-profilo.png",
        dateOfBirth: "1990-05-15",
        email: "mario.linguini@gmeil.com",
        phone: "+39 123 456 7890",
        address: "Via Roma 123",
        city: "Venezia",
        cap: "10121",
        bio: "Chef con 5 anni di esperienza in ristoranti di alto livello. Specializzato in cucina italiana contemporanea con influenze internazionali.",
      },
      workExperience: [
        {
          id: "1",
          company: "Ristorante La Pergola",
          position: "Sous Chef",
          location: "Venezia",
          startDate: "2020-03-01",
          endDate: "2023-01-15",
          current: false,
          description:
            "Responsabile della preparazione dei piatti principali e della supervisione del personale di cucina. Creazione di menu stagionali e gestione degli ordini.",
        },
      ],
      education: [
        {
          id: "1",
          institution: "Istituto di Arte Culinaria",
          degree: "Diploma",
          field: "Arti Culinarie",
          startDate: "2017-09-01",
          endDate: "2019-06-30",
          current: false,
          description:
            "Formazione completa in tecniche di cucina italiana e internazionale, pasticceria e gestione della cucina.",
        },
      ],
      preferences: {
        jobType: ["restaurant", "hotel"],
        position: "Chef",
        location: "Venezia",
        contractType: "full-time",
        availability: "2-weeks",
        salary: "€2500-3000 mensili",
        additionalInfo:
          "Disponibile a trasferirmi. Preferisco lavorare in ristoranti con focus sulla cucina sostenibile e ingredienti locali.",
      },
      skills: [
        "Cucina mediterranea",
        "Cucina fusion",
        "Gestione della brigata",
        "Menu planning",
        "Controllo costi",
        "Pasticceria base",
        "HACCP",
      ],
      cv: [  {
        id: Date.now().toString(),
        name: `Mario_Linguini_CV_IT.pdf`,
        date: new Date().toISOString(),
        language: "Italiano",
        default: true,
        size: "245 KB",
      }],
    }
}

// Save user profile to localStorage
export const saveUserProfile = async (profileData) => {
  if (typeof window === "undefined") return

  localStorage.setItem("userProfile", JSON.stringify(profileData))
  return true
}

// Update specific field in user profile
export const updateProfileField = async (field, value) => {
  if (typeof window === "undefined") return

  const profile = await getUserProfile()

  // Handle nested fields with dot notation (e.g., "personal.bio")
  if (field.includes(".")) {
    const [section, key] = field.split(".")
    profile[section][key] = value
  } else {
    profile[field] = value
  }

  await saveUserProfile(profile)
  return profile
}

// Update work experience
export const updateWorkExperience = async (experienceId, data) => {
  if (typeof window === "undefined") return

  const profile = await getUserProfile()

  const index = profile.workExperience.findIndex((exp) => exp.id === experienceId)
  if (index !== -1) {
    profile.workExperience[index] = { ...profile.workExperience[index], ...data }
  }

  await saveUserProfile(profile)
  return profile
}

// Add work experience
export const addWorkExperience = async (data) => {
  if (typeof window === "undefined") return

  const profile = await getUserProfile()

  const newExperience = {
    id: Date.now().toString(),
    ...data,
  }

  profile.workExperience = [...profile.workExperience, newExperience]

  await saveUserProfile(profile)
  return profile
}

// Delete work experience
export const deleteWorkExperience = async (experienceId) => {
  if (typeof window === "undefined") return

  const profile = await getUserProfile()

  profile.workExperience = profile.workExperience.filter((exp) => exp.id !== experienceId)

  await saveUserProfile(profile)
  return profile
}

// Aggiungi queste funzioni per la gestione della formazione

// Update education
export const updateEducation = async (educationId, data) => {
  if (typeof window === "undefined") return

  const profile = await getUserProfile()

  const index = profile.education.findIndex((edu) => edu.id === educationId)
  if (index !== -1) {
    profile.education[index] = { ...profile.education[index], ...data }
  }

  await saveUserProfile(profile)
  return profile
}

// Add education
export const addEducation = async (data) => {
  if (typeof window === "undefined") return

  const profile = await getUserProfile()

  const newEducation = {
    id: Date.now().toString(),
    ...data,
  }

  profile.education = [...profile.education, newEducation]

  await saveUserProfile(profile)
  return profile
}

// Delete education
export const deleteEducation = async (educationId) => {
  if (typeof window === "undefined") return

  const profile = await getUserProfile()

  profile.education = profile.education.filter((edu) => edu.id !== educationId)

  await saveUserProfile(profile)
  return profile
}

// Get user challenges
export const getUserChallenges = async () => {
  if (typeof window === "undefined") return []

  const challenges = localStorage.getItem("userChallenges")

  if (!challenges) {
    localStorage.setItem("userChallenges", JSON.stringify(sampleChallenges))
    return sampleChallenges
  }

  return JSON.parse(challenges)
}

// Complete a challenge
export const completeChallenge = async (challengeId) => {
  if (typeof window === "undefined") return false

  const challenges = await getUserChallenges()

  const updatedChallenges = challenges.map((challenge) =>
    challenge.id === challengeId ? { ...challenge, completed: true } : challenge,
  )

  localStorage.setItem("userChallenges", JSON.stringify(updatedChallenges))
  return true
}

// Delete CV
export const deleteCV = async (cvId) => {
  if (typeof window === "undefined") return

  const profile = await getUserProfile()

  if (profile.cv) {
    profile.cv = profile.cv.filter((cv) => cv.id !== cvId)
    await saveUserProfile(profile)
  }

  return profile
}

// Add CV
export const addCV = async (cvData) => {
  if (typeof window === "undefined") return

  const profile = await getUserProfile()

  if (!profile.cv) {
    profile.cv = []
  }

  const newCV = {
    id: Date.now().toString(),
    ...cvData,
  }

  profile.cv = [...profile.cv, newCV]

  await saveUserProfile(profile)
  return profile
}

// Aggiorna le funzioni per la gestione dei CV

// Update CV
export const updateCV = async (cvId, data) => {
  if (typeof window === "undefined") return

  const profile = await getUserProfile()

  if (profile.cv) {
    const index = profile.cv.findIndex((cv) => cv.id === cvId)
    if (index !== -1) {
      profile.cv[index] = { ...profile.cv[index], ...data }
    }

    // Se stiamo impostando questo CV come default, assicuriamoci che gli altri non lo siano
    if (data.default) {
      profile.cv = profile.cv.map((cv) => (cv.id !== cvId ? { ...cv, default: false } : cv))
    }

    await saveUserProfile(profile)
  }

  return profile
}



