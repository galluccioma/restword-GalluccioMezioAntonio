// Sample data challenges
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

//Badges
export const allBadges = [
  {
    id: "personalInfo",
    title: "Chef's Hat",
    description:
      "Hai completato le tue informazioni personali. Un buon chef si presenta sempre al meglio!",
    icon: "👨‍🍳",
    category: "profile",
    unlockCondition: "Completa tutti i campi delle informazioni personali",
    points: 15,
  },
  {
    id: "workExperience",
    title: "Master Chef",
    description:
      "Hai dettagliato la tua esperienza lavorativa. La tua esperienza in cucina è impressionante!",
    icon: "🍳",
    category: "profile",
    unlockCondition:
      "Aggiungi dettagli completi sulle tue esperienze lavorative passate",
    points: 20,
  },
  {
    id: "education",
    title: "Culinary School",
    description:
      "Hai completato la tua formazione. La tua educazione culinaria è fondamentale!",
    icon: "🎓",
    category: "profile",
    unlockCondition:
      "Inserisci informazioni sulla tua formazione e i corsi che hai seguito",
    points: 10,
  },
  {
    id: "skills",
    title: "Kitchen Tools",
    description:
      "Hai aggiunto competenze importanti. I tuoi strumenti culinari sono affilati e pronti!",
    icon: "🔪",
    category: "profile",
    unlockCondition: "Aggiungi almeno 3 competenze chiave",
    points: 9,
  },
  {
    id: "jobPreferences",
    title: "Menu Planner",
    description:
      "Hai specificato le tue preferenze lavorative. Sai esattamente che tipo di menu vuoi creare!",
    icon: "📋",
    category: "profile",
    unlockCondition:
      "Specifica le tue preferenze lavorative in modo dettagliato",
    points: 10,
  },
  {
    id: "cv",
    title: "Recipe Book",
    description:
      "Hai caricato il tuo curriculum vitae. Il tuo libro di ricette personale è pronto!",
    icon: "📕",
    category: "profile",
    unlockCondition: "Carica il tuo CV",
    points: 10,
  },
  {
    id: "allSections",
    title: "Stella Michelin",
    description:
      "Il tuo profilo è molto completo. Hai guadagnato la tua prima stella Michelin!",
    icon: "⭐",
    category: "progress",
    unlockCondition:
      "Completa tutte le sezioni del profilo con un alto livello di dettaglio",
    points: 80,
  },
  {
    id: "expertProfile",
    title: "Celebrity Chef",
    description:
      "Il tuo profilo è eccezionale. Sei diventato uno chef di fama internazionale!",
    icon: "🌟",
    category: "progress",
    unlockCondition:
      "Raggiungi il massimo punteggio in tutte le sezioni del profilo",
    points: 95,
  },
  {
    id: "quickPrep",
    title: "Preparazione Veloce",
    description:
      "Hai iniziato a compilare il tuo profilo. Veloce come un commis che prepara gli ingredienti!",
    icon: "🔪",
    category: "progress",
    unlockCondition:
      "Inizia a compilare il tuo profilo inserendo almeno 3 informazioni",
    points: 3,
  },
  {
    id: "souschef",
    title: "Sous Chef",
    description:
      "Hai aggiunto più esperienze lavorative. Sei il braccio destro dello chef!",
    icon: "👨‍🍳",
    category: "progress",
    unlockCondition: "Aggiungi almeno 2 esperienze lavorative complete",
    points: 15,
  },
  {
    id: "menuPlanner",
    title: "Menu Degustazione",
    description:
      "Le tue competenze sono variegate come un menu degustazione in un ristorante stellato!",
    icon: "📋",
    category: "progress",
    unlockCondition: "Aggiungi almeno 5 competenze diverse al tuo profilo",
    points: 15,
  },
  {
    id: "winePairing",
    title: "Sommelier",
    description:
      "Hai specificato le tue aspettative salariali. Sai abbinare il vino giusto al piatto giusto!",
    icon: "🍷",
    category: "progress",
    unlockCondition:
      "Specifica le tue aspettative salariali nelle preferenze lavorative",
    points: 5,
  },
  {
    id: "signatureDish",
    title: "Piatto Signature",
    description:
      "Foto e CV caricati. Hai creato il tuo piatto signature che ti rappresenta!",
    icon: "🍽️",
    category: "progress",
    unlockCondition: "Carica sia la tua foto che il tuo CV",
    points: 15,
  },
  {
    id: "restaurantOwner",
    title: "Proprietario di Ristorante",
    description:
      "Hai completato tutto il profilo con eccellenza. Sei pronto per gestire il tuo ristorante!",
    icon: "🏆",
    category: "progress",
    unlockCondition:
      "Completa tutte le sezioni del profilo e raggiungi 100+ punti",
    points: 100,
  },
];

//Achivements
export const achievements = [
  {
    name: "Profilo Completo",
    description: "Completa tutte le sezioni del profilo",
    progress: 85,
    max: 100,
    icon: "user",
  },
  {
    name: "CV Inviati",
    description: "Invia 20 CV",
    progress: 18,
    max: 20,
    icon: "file",
  },
  {
    name: "Giorni Attivi",
    description: "Accedi per 30 giorni consecutivi",
    progress: 24,
    max: 30,
    icon: "calendar",
  },
];

//Attività recenti
export   const recentActivity = [
  {
    type: "cv_sent",
    restaurant: "Ristorante Bella Italia",
    time: "2 ore fa",
    points: 15,
  },
  {
    type: "profile_update",
    section: "Esperienze di lavoro",
    time: "ieri",
    points: 10,
  },
];

//Sfide in evidenza
export   const featuredChallenge = {
  title: "Invia 3 CV oggi",
  description: "Invia 3 CV a ristoranti che cercano personale nella tua zona",
  progress: 1,
  max: 3,
  points: 40,
  timeLeft: "5 ore",
};

//Daily Challenges
export const dailyChallenges = [
    {
      title: "Invia 3 CV oggi",
      description: "Invia 3 CV a ristoranti che cercano personale",
      points: 40,
      progress: 1,
      max: 3,
      icon: "file",
      timeLeft: "5 ore",
    },
    {
      title: "Completa il tuo profilo",
      description: "Aggiungi le tue esperienze lavorative",
      points: 25,
      progress: 2,
      max: 5,
      icon: "user",
      timeLeft: "12 ore",
    },
    {
      title: "Streak di attività",
      description: "Accedi per 7 giorni consecutivi",
      points: 50,
      progress: 6,
      max: 7,
      icon: "calendar",
      timeLeft: "24 ore",
    },
  ];



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





//JOBS

// Sample data for jobs
const sampleJobs = [
  {
    id: "1",
    position: "Chef de Cuisine",
    company: "Ristorante La Pergola",
    companyLogo: "/placeholder.svg?height=48&width=48",
    location: "Roma, Italia",
    jobType: ["restaurant"],
    contractType: "full-time",
    salary: "€3000-3500 mensili",
    publishedDate: "2025-03-25T10:00:00Z",
    applicantsCount: 12,
    description:
      "Ristorante La Pergola, rinomato ristorante italiano con 2 stelle Michelin, è alla ricerca di uno Chef de Cuisine talentuoso e appassionato per guidare il nostro team di cucina.\n\nCome Chef de Cuisine, sarai responsabile della supervisione di tutte le operazioni di cucina, della creazione di menu stagionali innovativi e della gestione del personale di cucina.\n\nOffriamo un ambiente di lavoro stimolante, opportunità di crescita professionale e un pacchetto retributivo competitivo.",
    requirements: [
      "Almeno 5 anni di esperienza in ruoli di cucina di alto livello",
      "Esperienza precedente come Sous Chef o Chef de Cuisine",
      "Conoscenza approfondita della cucina italiana contemporanea",
      "Capacità di leadership e gestione del team",
      "Creatività e passione per l'innovazione culinaria",
      "Conoscenza delle normative HACCP e degli standard di sicurezza alimentare",
    ],
    requiredSkills: [
      "Cucina italiana",
      "Menu planning",
      "Gestione della brigata",
      "Controllo costi",
      "Tecniche di cottura avanzate",
      "Food presentation",
    ],
  },
  {
    id: "2",
    position: "Sous Chef",
    company: "Hotel Splendido",
    companyLogo: "/placeholder.svg?height=48&width=48",
    location: "Milano, Italia",
    jobType: ["hotel", "restaurant"],
    contractType: "full-time",
    salary: "€2500-3000 mensili",
    publishedDate: "2025-04-01T14:30:00Z",
    applicantsCount: 8,
    description:
      "Hotel Splendido, lussuoso hotel 5 stelle nel cuore di Milano, è alla ricerca di un Sous Chef per il nostro ristorante gourmet.\n\nCome Sous Chef, lavorerai a stretto contatto con l'Executive Chef per garantire il funzionamento efficiente della cucina, supervisionare la preparazione dei piatti e contribuire allo sviluppo di nuovi menu.\n\nOffriamo un ambiente di lavoro internazionale, opportunità di formazione continua e benefit competitivi.",
    requirements: [
      "Almeno 3 anni di esperienza in ruoli di cucina di alto livello",
      "Diploma in arti culinarie o formazione equivalente",
      "Conoscenza delle tecniche di cucina classica e moderna",
      "Capacità di lavorare sotto pressione e rispettare le scadenze",
      "Eccellenti capacità organizzative e di gestione del tempo",
      "Conoscenza delle normative HACCP",
    ],
    requiredSkills: [
      "Cucina internazionale",
      "Pasticceria",
      "Gestione della brigata",
      "Controllo qualità",
      "Organizzazione del lavoro",
    ],
  },
  {
    id: "3",
    position: "Barista",
    company: "Caffè Centrale",
    companyLogo: "/placeholder.svg?height=48&width=48",
    location: "Firenze, Italia",
    jobType: ["bar"],
    contractType: "part-time",
    salary: "€1200-1500 mensili",
    publishedDate: "2025-04-03T09:15:00Z",
    applicantsCount: 5,
    description:
      "Caffè Centrale, storico caffè nel centro di Firenze, cerca un barista esperto per unirsi al nostro team.\n\nCome barista, sarai responsabile della preparazione di caffè, cappuccini e altre bevande, dell'accoglienza dei clienti e della gestione della cassa.\n\nOffriamo un ambiente di lavoro dinamico e flessibilità negli orari.",
    requirements: [
      "Esperienza precedente come barista",
      "Conoscenza delle tecniche di preparazione del caffè espresso",
      "Capacità di lavorare in team",
      "Buone doti comunicative e orientamento al cliente",
      "Disponibilità a lavorare nei weekend e in orari flessibili",
    ],
    requiredSkills: ["Preparazione caffè", "Latte art", "Gestione cassa", "Servizio clienti", "Mixology base"],
  },
  {
    id: "4",
    position: "Pasticcere",
    company: "Dolce Vita Pasticceria",
    companyLogo: "/placeholder.svg?height=48&width=48",
    location: "Torino, Italia",
    jobType: ["pastry"],
    contractType: "full-time",
    salary: "€2000-2300 mensili",
    publishedDate: "2025-04-02T11:45:00Z",
    applicantsCount: 3,
    description:
      "Dolce Vita Pasticceria, rinomata pasticceria artigianale di Torino, cerca un pasticcere talentuoso per ampliare il proprio team.\n\nCome pasticcere, sarai responsabile della preparazione di dolci tradizionali italiani e creazioni innovative, seguendo le ricette dello chef pasticcere e contribuendo con idee creative.\n\nOffriamo un ambiente di lavoro stimolante e la possibilità di esprimere la tua creatività.",
    requirements: [
      "Almeno 2 anni di esperienza come pasticcere",
      "Formazione in pasticceria o esperienza equivalente",
      "Conoscenza delle tecniche di pasticceria classica",
      "Creatività e attenzione ai dettagli",
      "Capacità di lavorare in team",
      "Disponibilità a lavorare in orari mattutini",
    ],
    requiredSkills: ["Pasticceria italiana", "Pasticceria moderna", "Decorazione", "Cioccolateria", "Lievitati"],
  },
  {
    id: "5",
    position: "Chef de Partie",
    company: "Trattoria del Mare",
    companyLogo: "/placeholder.svg?height=48&width=48",
    location: "Venezia, Italia",
    jobType: ["restaurant"],
    contractType: "seasonal",
    salary: "€2000-2200 mensili",
    publishedDate: "2025-04-04T16:20:00Z",
    applicantsCount: 7,
    description:
      "Trattoria del Mare, ristorante specializzato in pesce fresco nel cuore di Venezia, cerca uno Chef de Partie per la stagione estiva.\n\nCome Chef de Partie, sarai responsabile della preparazione dei piatti della tua partita, garantendo qualità e consistenza in linea con gli standard del ristorante.\n\nOffriamo un contratto stagionale con possibilità di rinnovo e alloggio per i candidati fuori sede.",
    requirements: [
      "Esperienza precedente come Chef de Partie o Commis Chef",
      "Conoscenza della cucina di pesce",
      "Capacità di lavorare sotto pressione",
      "Flessibilità e disponibilità a lavorare nei weekend e in orari serali",
      "Conoscenza delle normative HACCP",
    ],
    requiredSkills: [
      "Cucina di pesce",
      "Preparazione primi piatti",
      "Cotture alla griglia",
      "Organizzazione del lavoro",
      "Pulizia e filettatura pesce",
    ],
  },
]

// Sample data for applications
const sampleApplications = []


// Get all jobs
export const getJobs = async () => {
  if (typeof window === "undefined") return []

  const jobs = localStorage.getItem("jobs")

  if (!jobs) {
    localStorage.setItem("jobs", JSON.stringify(sampleJobs))
    return sampleJobs
  }

  return JSON.parse(jobs)
}

// Get user applications
export const getApplications = async () => {
  if (typeof window === "undefined") return []

  const applications = localStorage.getItem("applications")

  if (!applications) {
    localStorage.setItem("applications", JSON.stringify(sampleApplications))
    return sampleApplications
  }

  return JSON.parse(applications)
}


// Apply for a job
export const applyForJob = async (applicationData) => {
  if (typeof window === "undefined") return false

  const applications = await getApplications()

  // Check if already applied
  const alreadyApplied = applications.some((app) => app.jobId === applicationData.jobId)
  if (alreadyApplied) return false

  const newApplication = {
    id: Date.now().toString(),
    ...applicationData,
  }

  const updatedApplications = [...applications, newApplication]
  localStorage.setItem("applications", JSON.stringify(updatedApplications))

  // Update job applicants count
  const jobs = await getJobs()
  const updatedJobs = jobs.map((job) =>
    job.id === applicationData.jobId ? { ...job, applicantsCount: job.applicantsCount + 1 } : job,
  )
  localStorage.setItem("jobs", JSON.stringify(updatedJobs))

  // Check and complete challenge if needed
  const applications3Challenge = {
    id: "6",
    title: "Candidati a 3 offerte",
    description: "Candidati ad almeno 3 offerte di lavoro",
    type: "activity",
    requirement: "3 candidature",
    points: 20,
  }

  if (updatedApplications.length >= 3) {
    await completeChallenge(applications3Challenge.id)
  }

  return true
}
