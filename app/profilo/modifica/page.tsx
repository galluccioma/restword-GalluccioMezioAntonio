"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserProfile, saveUserProfile } from "@/lib/profile-service";
import PersonalInfoForm from "@/components/profile/personal-info-form";
import WorkExperienceForm from "@/components/profile/work-experience-form";
import EducationForm from "@/components/profile/education-form";
import PreferencesForm from "@/components/profile/preferences-form";

export default function EditProfile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("personal");
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
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getUserProfile();
        if (data) {
          setFormData(data);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleSave = async () => {
    await saveUserProfile(formData);
    router.push("/profilo");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Caricamento profilo...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
    <div className="max-w-5xl mx-auto rounded-lg shadow-md">
      {/* Purple header banner */}
      <div className="bg-restword min-h-80 flex items-center rounded-lg p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-20">
          <div>
            <h1 className="text-2xl font-bold mb-2">Modifica il tuo profilo Restworld</h1>
            <p className="text-purple-100">
              Completa il tuo profilo per aumentare le tue possibilità di trovare il lavoro perfetto
            </p>
          </div>
         
        </div>
      </div>
      <Card className="">
        <CardContent className="pt-6 ">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="personal">Dati Personali</TabsTrigger>
              <TabsTrigger value="experience">
                Esperienze Lavorative
              </TabsTrigger>
              <TabsTrigger value="education">Formazione</TabsTrigger>
              <TabsTrigger value="preferences">Preferenze</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <PersonalInfoForm
                data={formData.personal}
                updateData={(data) => updateFormData("personal", data)}
              />
            </TabsContent>

            <TabsContent value="experience">
              <WorkExperienceForm
                data={formData.workExperience}
                updateData={(data) => updateFormData("workExperience", data)}
              />
            </TabsContent>

            <TabsContent value="education">
              <EducationForm
                data={formData.education}
                updateData={(data) => updateFormData("education", data)}
              />
            </TabsContent>

            <TabsContent value="preferences">
              <PreferencesForm
                data={formData.preferences}
                updateData={(data) => updateFormData("preferences", data)}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={() => router.push("/profilo")}>
              Annulla
            </Button>
            <Button
              onClick={handleSave}
              variant="default">
              Salva Modifiche
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
     

  );
}
