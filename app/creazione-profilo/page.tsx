"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import PersonalInfoForm from "@/components/profile/personal-info-form";
import WorkExperienceForm from "@/components/profile/work-experience-form";
import EducationForm from "@/components/profile/education-form";
import PreferencesForm from "@/components/profile/preferences-form";
import CvUploadForm from "@/components/profile/cv-upload-form";
import ReviewForm from "@/components/profile/review-form";
import { saveUserProfile } from "@/lib/data";
import Link from "next/link";

export default function CreateProfile() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personal: {
      firstName: "",
      lastName: "",
      photo: "",
      dateOfBirth: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      cap: "",
    },
    workExperience: [],
    education: [],
    preferences: {
      jobType: [],
      position: "",
      location: "",
      contractType: "",
      availability: "",
      salary: "",
    },
    cv: [],
  });

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    await saveUserProfile(formData);
    router.push("/profilo/completato");
  };

  // Calculate profile strength
  const calculateProfileStrength = () => {
    let strength = 0;
    let total = 0;

    // Personal info
    if (formData.personal.firstName && formData.personal.lastName)
      strength += 1;
    if (formData.personal.photo) strength += 1;
    if (formData.personal.email) strength += 1;
    total += 3;

    // Work experience
    if (formData.workExperience.length > 0) strength += 2;
    total += 2;

    // Education
    if (formData.education.length > 0) strength += 1;
    total += 1;

    // Preferences
    if (formData.preferences.position) strength += 1;
    if (formData.preferences.jobType && formData.preferences.jobType.length > 0)
      strength += 1;
    total += 2;

    // CV
    if (formData.cv.length > 0) strength += 2;
    total += 2;

    return Math.round((strength / total) * 100);
  };

  const profileStrength = calculateProfileStrength();
  const badgeCount = 1; // This would be calculated based on achievements
  const totalBadges = 14;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto rounded-lg shadow-md">
        {/* Purple header banner */}
        <div className="bg-restworld min-h-80 flex items-center rounded-lg p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-20">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Crea il tuo profilo Restworld
              </h1>
              <p className="text-purple-100">
                Completa il tuo profilo per aumentare le tue possibilità di
                trovare il lavoro perfetto
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="bg-white/10 hover:bg-white/30 rounded-lg p-3 text-center min-w-[100px]">
                <div className="text-2xl font-bold">
                  {profileStrength > 0 ? profileStrength : 0}
                </div>
                <div className="text-xs uppercase">Punti</div>
              </div>
              <Link href="/profilo/traguardi">
                <div className="bg-[#d6e450] hover:bg-[#c9d643] text-black rounded-lg p-3 text-center min-w-[100px]">
                  <div className="text-2xl font-bold">
                    {badgeCount}/{totalBadges}
                  </div>
                  <div className="text-xs uppercase">Badge</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex overflow-scroll justify-between mb-8 p-6">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div key={step} className="flex flex-col items-center px-6">
              <div
                className={`step-indicator ${
                  step === currentStep
                    ? "active"
                    : step < currentStep
                    ? "completed"
                    : "inactive"
                }`}>
                {step}
              </div>
              <span className="text-xs mt-2 text-center">
                {step === 1 && "Informazioni Personali"}
                {step === 2 && "Esperienze Lavorative"}
                {step === 3 && "Formazione e Competenze"}
                {step === 4 && "Preferenze Lavorative"}
                {step === 5 && "Carica CV"}
                {step === 6 && "Revisione"}
              </span>
            </div>
          ))}
        </div>

        {/* Profile strength */}
        <div className="mb-8 p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Forza del profilo</span>
            <span className="text-sm">{profileStrength}%</span>
          </div>
          <Progress value={profileStrength} className="h-2" />

          {profileStrength < 50 && (
            <div className="mt-4 border border-[#dcd7fe] bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="h-4 w-4">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" x2="12" y1="8" y2="12"></line>
                  <line x1="12" x2="12.01" y1="16" y2="16"></line>
                </svg>
                <h3 className="text-[#351471] font-medium">
                  Forza del profilo:
                  <span className="text-red-500">Debole</span>
                </h3>
              </div>
              <div className="mt-2 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-[#d0e124]">💡</span>
                  <span className="text-[#556070]">
                    Aggiungi una foto professionale per mostrare il volto dietro
                    le tue creazioni culinarie (+5 punti)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#d0e124]">💡</span>
                  <span className="text-[#556070]">
                    Aggiungi più esperienze lavorative per mostrare i diversi
                    ristoranti in cui hai affinato le tue abilità (+10 punti)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <Card>
          <CardContent className="pt-6">
            {currentStep === 1 && (
              <PersonalInfoForm
                data={formData.personal}
                updateData={(data) => updateFormData("personal", data)}
              />
            )}

            {currentStep === 2 && (
              <WorkExperienceForm
                data={formData.workExperience}
                updateData={(data) => updateFormData("workExperience", data)}
              />
            )}

            {currentStep === 3 && (
              <EducationForm
                data={formData.education}
                updateData={(data) => updateFormData("education", data)}
              />
            )}

            {currentStep === 4 && (
              <PreferencesForm
                data={formData.preferences}
                updateData={(data) => updateFormData("preferences", data)}
              />
            )}

            {currentStep === 5 && (
              <CvUploadForm
                data={formData.cv}
                updateData={(data) => updateFormData("cv", data)}
              />
            )}

            {currentStep === 6 && <ReviewForm data={formData} />}

            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={handlePrevious}>
                  Indietro
                </Button>
              ) : (
                <div></div>
              )}

              {currentStep === 6 ? (
                <Button onClick={handleSubmit} variant="default">
                  Salva Profilo
                </Button>
              ) : (
                <Button onClick={handleNext} variant="outline">
                  Avanti <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
