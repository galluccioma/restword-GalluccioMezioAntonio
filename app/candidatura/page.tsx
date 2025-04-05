"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { getUserProfile, getJobs, getApplications, applyForJob } from "@/lib/data"
import {
  Search,
  MapPin,
  Clock,
  Users,
  Filter,
  ChevronDown,
  ChevronUp,
  Building,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export default function JobsPage() {
  const [profile, setProfile] = useState(null)
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [jobType, setJobType] = useState("")
  const [contractType, setContractType] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Job detail and application state
  const [selectedJob, setSelectedJob] = useState(null)
  const [showJobDialog, setShowJobDialog] = useState(false)
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const [selectedCV, setSelectedCV] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [matchScore, setMatchScore] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      try {
        const profileData = await getUserProfile()
        const jobsData = await getJobs()
        const applicationsData = await getApplications()

        setProfile(profileData)
        setJobs(jobsData)
        setApplications(applicationsData)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Calculate match score between profile and job
  const calculateMatchScore = (profile, job) => {
    let score = 0
    let maxScore = 0

    // Check job type match
    if (profile.preferences.jobType.some((type) => job.jobType.includes(type))) {
      score += 20
    }
    maxScore += 20

    // Check position match
    if (
      job.position.toLowerCase().includes(profile.preferences.position.toLowerCase()) ||
      profile.preferences.position.toLowerCase().includes(job.position.toLowerCase())
    ) {
      score += 25
    }
    maxScore += 25

    // Check location match
    if (
      job.location.toLowerCase().includes(profile.preferences.location.toLowerCase()) ||
      profile.preferences.location.toLowerCase().includes(job.location.toLowerCase())
    ) {
      score += 15
    }
    maxScore += 15

    // Check contract type match
    if (job.contractType === profile.preferences.contractType) {
      score += 20
    }
    maxScore += 20

    // Check skills match (assuming job has skills requirement)
    if (job.requiredSkills && profile.skills) {
      const matchingSkills = job.requiredSkills.filter((skill) =>
        profile.skills.some(
          (userSkill) =>
            userSkill.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(userSkill.toLowerCase()),
        ),
      )

      const skillScore = Math.min(20, (matchingSkills.length / job.requiredSkills.length) * 20)
      score += skillScore
    }
    maxScore += 20

    // Calculate percentage
    return Math.round((score / maxScore) * 100)
  }

  const filteredJobs = jobs.filter((job) => {
    // Filter by search term (position or company)
    const matchesSearch =
      searchTerm === "" ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by location
    const matchesLocation = location === "" || job.location.toLowerCase().includes(location.toLowerCase())

    // Filter by job type
    const matchesJobType = jobType === "all" || jobType === "" || job.jobType.includes(jobType)

    // Filter by contract type
    const matchesContractType = contractType === "all" || contractType === "" || job.contractType === contractType

    return matchesSearch && matchesLocation && matchesJobType && matchesContractType
  })

  // Check if user has applied to a job
  const hasApplied = (jobId) => {
    return applications.some((app) => app.jobId === jobId)
  }

  // Get application date if user has applied
  const getApplicationDate = (jobId) => {
    const application = applications.find((app) => app.jobId === jobId)
    return application ? application.date : null
  }

  const handleOpenJobDetail = (job) => {
    setSelectedJob(job)
    setMatchScore(calculateMatchScore(profile, job))
    setShowJobDialog(true)
  }

  const handleApplyClick = () => {
    setShowJobDialog(false)
    setShowApplyDialog(true)
  }

  const handleApply = async () => {
    if (!selectedCV) return

    setIsSubmitting(true)
    try {
      await applyForJob({
        jobId: selectedJob.id,
        cvId: selectedCV,
        coverLetter,
        date: new Date().toISOString(),
      })

      // Update local state to reflect the new application
      setApplications((prev) => [
        ...prev,
        {
          jobId: selectedJob.id,
          cvId: selectedCV,
          date: new Date().toISOString(),
        },
      ])

      setShowApplyDialog(false)

      // Reset form
      setSelectedCV("")
      setCoverLetter("")
    } catch (error) {
      console.error("Error applying for job:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`
  }

  const getContractTypeLabel = (type) => {
    const types = {
      "full-time": "Tempo pieno",
      "part-time": "Part-time",
      seasonal: "Stagionale",
      temporary: "Temporaneo",
      freelance: "Freelance",
    }
    return types[type] || type
  }

  const getJobTypeLabel = (type) => {
    const types = {
      restaurant: "Ristorante",
      hotel: "Hotel",
      bar: "Bar/Caffetteria",
      catering: "Catering",
      pastry: "Pasticceria",
    }
    return types[type] || type
  }

  // Calculate days since published
  const daysSincePublished = (publishedDate) => {
    const published = new Date(publishedDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - published.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Oggi"
    if (diffDays === 1) return "Ieri"
    return `${diffDays} giorni fa`
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Caricamento offerte di lavoro...</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">Profilo non trovato</h1>
        <p className="mb-8">Devi creare un profilo prima di visualizzare le offerte di lavoro.</p>
        <Link href="/create-profile">
          <Button variant="default">Crea il tuo profilo</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-purple-600 rounded-lg p-6 mb-8 text-white">
          <h1 className="text-2xl font-bold mb-2">Offerte di lavoro</h1>
          <p className="text-purple-100">Trova il lavoro perfetto nel settore della ristorazione e dell'ospitalità</p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Cerca posizione o azienda"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4" />
              Filtri
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>

          {showFilters && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Località</label>
                    <Input
                      placeholder="Qualsiasi località"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Tipo di attività</label>
                    <Select value={jobType} onValueChange={setJobType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Qualsiasi tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tutti i tipi</SelectItem>
                        <SelectItem value="restaurant">Ristorante</SelectItem>
                        <SelectItem value="hotel">Hotel</SelectItem>
                        <SelectItem value="bar">Bar/Caffetteria</SelectItem>
                        <SelectItem value="catering">Catering</SelectItem>
                        <SelectItem value="pastry">Pasticceria</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Tipo di contratto</label>
                    <Select value={contractType} onValueChange={setContractType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Qualsiasi contratto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tutti i contratti</SelectItem>
                        <SelectItem value="full-time">Tempo pieno</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="seasonal">Stagionale</SelectItem>
                        <SelectItem value="temporary">Temporaneo</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("")
                      setLocation("")
                      setJobType("")
                      setContractType("")
                    }}
                  >
                    Reimposta filtri
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              {filteredJobs.length} {filteredJobs.length === 1 ? "offerta trovata" : "offerte trovate"}
            </p>
            <Select defaultValue="recent">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordina per" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Più recenti</SelectItem>
                <SelectItem value="salary">Retribuzione</SelectItem>
                <SelectItem value="relevance">Rilevanza</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0 relative overflow-hidden">
                          {job.companyLogo ? (
                            <Image
                              src={job.companyLogo || "/placeholder.svg"}
                              alt={job.company}
                              fill
                              className="object-contain p-2"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Building className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">{job.position}</h3>
                              <p className="text-purple-600">{job.company}</p>
                            </div>
                            {hasApplied(job.id) && (
                              <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Candidatura inviata
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2 mt-2 mb-3">
                            {job.jobType.map((type, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-purple-50 text-purple-700 border-purple-200"
                              >
                                {getJobTypeLabel(type)}
                              </Badge>
                            ))}
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {getContractTypeLabel(job.contractType)}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{daysSincePublished(job.publishedDate)}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{job.applicantsCount} candidati</span>
                            </div>
                          </div>

                          {hasApplied(job.id) && (
                            <p className="text-sm text-gray-500 mt-2">
                              Candidatura inviata il {formatDate(getApplicationDate(job.id))}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end mt-4">
                        <Button onClick={() => handleOpenJobDetail(job)} variant="default">
                          Visualizza dettagli
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border">
                <p className="text-gray-500 mb-2">Nessuna offerta di lavoro trovata</p>
                <p className="text-sm text-gray-400">Prova a modificare i filtri di ricerca</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Detail Dialog */}
      {selectedJob && (
        <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedJob.position}</DialogTitle>
            </DialogHeader>

            <div className="py-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0 relative overflow-hidden mr-4">
                  {selectedJob.companyLogo ? (
                    <Image
                      src={selectedJob.companyLogo || "/placeholder.svg"}
                      alt={selectedJob.company}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold">{selectedJob.company}</h2>
                  <p className="text-sm text-gray-500">{selectedJob.location}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {selectedJob.jobType.map((type, index) => (
                  <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    {getJobTypeLabel(type)}
                  </Badge>
                ))}
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {getContractTypeLabel(selectedJob.contractType)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span>Pubblicata il {formatDate(selectedJob.publishedDate)}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{selectedJob.salary}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{selectedJob.applicantsCount} candidati</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Match con il tuo profilo</h3>
                  <span className="font-semibold">{matchScore}%</span>
                </div>
                <Progress
                  value={matchScore}
                  className="h-2"
                  
                />
                <div className="mt-2">
                  {matchScore >= 70 ? (
                    <p className="text-sm text-green-600">
                      <CheckCircle className="h-4 w-4 inline mr-1" />
                      Match eccellente con il tuo profilo!
                    </p>
                  ) : matchScore >= 40 ? (
                    <p className="text-sm text-yellow-600">Match discreto con il tuo profilo</p>
                  ) : (
                    <p className="text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 inline mr-1" />
                      Match basso con il tuo profilo
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Descrizione</h3>
                <div className="text-gray-700 whitespace-pre-wrap text-sm">{selectedJob.description}</div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Requisiti</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Competenze richieste</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.requiredSkills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              {hasApplied(selectedJob.id) ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Candidatura inviata il {formatDate(getApplicationDate(selectedJob.id))}</span>
                </div>
              ) : (
                <Button onClick={handleApplyClick} variant="default">
                  Candidati ora
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Application Dialog */}
      {selectedJob && (
        <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Candidati per {selectedJob.position}</DialogTitle>
            </DialogHeader>

            <div className="py-4 space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Seleziona CV</label>
                <Select value={selectedCV} onValueChange={setSelectedCV}>
                  <SelectTrigger>
                    <SelectValue placeholder="Scegli un CV" />
                  </SelectTrigger>
                  <SelectContent>
                    {profile.cv && profile.cv.length > 0 ? (
                      profile.cv.map((cv) => (
                        <SelectItem key={cv.id} value={cv.id}>
                          {cv.name} {cv.default && "(Default)"}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-cv" disabled>
                        Nessun CV disponibile
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                {profile.cv && profile.cv.length === 0 && (
                  <p className="text-sm text-red-500 mt-1">Devi caricare almeno un CV nel tuo profilo</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Lettera di presentazione (opzionale)</label>
                <Textarea
                  placeholder="Scrivi una breve lettera di presentazione..."
                  rows={5}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowApplyDialog(false)}>
                Annulla
              </Button>
              <Button
                onClick={handleApply}
                disabled={!selectedCV || isSubmitting}
                variant="default"
              >
                {isSubmitting ? "Invio in corso..." : "Invia candidatura"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

