"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserProfile } from "@/lib/data";
import { Star, MapPin, Mail, Phone, Edit, Plus } from "lucide-react";

import EditableField from "@/components/profile/editable-field";
import EditableSkills from "@/components/profile/editable-skills";
import EditableExperience from "@/components/profile/editable-experience";
import EditableEducation from "@/components/profile/editable-education";
import AddExperienceForm from "@/components/profile/add-experience-form";
import AddEducationForm from "@/components/profile/add-education-form";
import CVManager from "@/components/profile/cv-manager";
import EditablePreferences from "@/components/profile/editable-preferences";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("panoramica");
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [isAddingEducation, setIsAddingEducation] = useState(false);

  const profileStrength = 87;
  const badgeCount = 1;
  const totalBadges = 14;

  const loadProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Caricamento profilo...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">
          Nessun profilo trovato
        </h1>
        <p className="mb-8">Non hai ancora creato un profilo professionale.</p>
        <Link href="/creazione-profilo">
          <Button className="bg-purple-600 hover:bg-purple-700">
            Crea il tuo profilo
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-restworld min-h-80 flex items-center rounded-lg p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-20">
            <div>
              <h1 className="text-2xl font-bold mb-2">Bentornato {profile.personal.firstName}</h1>
              <p className="text-purple-100">
                Completa le tue sfide giornaliere e porta il tuo profilo al livello successivo!
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link href="/profilo/sfide">
                <div className="bg-white/10 hover:bg-white/30 rounded-lg p-3 text-center min-w-[100px]">
                  <div className="text-2xl font-bold">{profileStrength}</div>
                  <div className="text-xs uppercase">Punti</div>
                </div>
              </Link>
              <Link href="/profilo/traguardi">
                <div className="bg-[#d6e450] hover:bg-[#c9d643] text-black rounded-lg p-3 text-center min-w-[100px]">
                  <div className="text-2xl font-bold">{badgeCount}/{totalBadges}</div>
                  <div className="text-xs uppercase">Badge</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <Tabs defaultValue="panoramica" className="w-full">
          <TabsList className="grid grid-cols-4 w-full bg-[#efedff]">
            <TabsTrigger value="panoramica" className="data-[state=active]:bg-[#7641d9] data-[state=active]:text-white">Panoramica</TabsTrigger>
            <TabsTrigger value="esperienze" className="data-[state=active]:bg-[#7641d9] data-[state=active]:text-white">Esperienze</TabsTrigger>
            <TabsTrigger value="formazione" className="data-[state=active]:bg-[#7641d9] data-[state=active]:text-white">Formazione</TabsTrigger>
            <TabsTrigger value="preferenze" className="data-[state=active]:bg-[#7641d9] data-[state=active]:text-white">Preferenze</TabsTrigger>
          </TabsList>

          <TabsContent value="panoramica" className="py-6">
            <Card className="mb-6">
              <CardContent className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-6 ">
                  <div className="flex flex-col items-center">
                    <div className="relative w-36 h-36 rounded-full overflow-hidden bg-gray-200 mb-2">
                      {profile.personal.photo ? (
                        <Image
                          src={profile.personal.photo}
                          alt={`${profile.personal.firstName} ${profile.personal.lastName}`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span className="text-2xl font-semibold">
                            {profile.personal.firstName?.charAt(0)}
                            {profile.personal.lastName?.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="text-2xl font-bold">
                          {profile.personal.firstName} {profile.personal.lastName}
                        </h1>
                        <p className="text-gray-600">
                          {profile.preferences.position || "Chef de Cuisine"}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                            <span>{profile.personal.city || "Venezia, Italia"}</span>
                          </div>
                          {profile.personal.email && (
                            <div className="flex items-center text-sm">
                              <Mail className="h-4 w-4 mr-1 text-gray-500" />
                              <span>{profile.personal.email}</span>
                            </div>
                          )}
                          {profile.personal.phone && (
                            <div className="flex items-center text-sm">
                              <Phone className="h-4 w-4 mr-1 text-gray-500" />
                              <span>{profile.personal.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="ml-2 text-lg bg-green-100 text-green-800 px-4 py-1 rounded">Open to work</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Progress value={85} className="h-2 bg-gray-200">
                        <div className="h-full bg-gradient-to-r from-yellow-400 to-purple-600 rounded-full" />
                      </Progress>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="font-medium text-[#351471]">Su di me</h2>
                  <EditableField
                    value={profile.personal.bio || "Chef appassionato con 5 anni di esperienza..."}
                    type="textarea"
                    fieldName="personal.bio"
                    onUpdate={loadProfile}
                  />
                </div>
                <CVManager cvList={profile.cv || []} onUpdate={loadProfile} />
              </CardContent>
            </Card>

            <EditableSkills skills={profile.skills || []} onUpdate={loadProfile} />
          </TabsContent>

          <TabsContent value="esperienze" className="py-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Esperienze Lavorative</h3>
                <Button onClick={() => setIsAddingExperience(true)} variant="outline" className="text-purple-600 border-purple-600">
                  <Plus className="h-4 w-4 mr-1" /> Aggiungi
                </Button>
              </div>
              {isAddingExperience && (
                <AddExperienceForm
                  onAdd={() => {
                    loadProfile();
                    setIsAddingExperience(false);
                  }}
                  onCancel={() => setIsAddingExperience(false)}
                />
              )}
              <div className="space-y-6">
                {(profile.workExperience || []).map((exp) => (
                  <EditableExperience key={exp.id} experience={exp} onUpdate={loadProfile} />
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="formazione" className="py-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Formazione</h3>
                <Button onClick={() => setIsAddingEducation(true)} variant="outline" className="text-purple-600 border-purple-600">
                  <Plus className="h-4 w-4 mr-1" /> Aggiungi
                </Button>
              </div>
              {isAddingEducation && (
                <AddEducationForm
                  onAdd={() => {
                    loadProfile();
                    setIsAddingEducation(false);
                  }}
                  onCancel={() => setIsAddingEducation(false)}
                />
              )}
              <div className="space-y-6">
                {(profile.education || []).map((edu) => (
                  <EditableEducation key={edu.id} education={edu} onUpdate={loadProfile} />
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="preferenze" className="py-6">
            <EditablePreferences preferences={profile.preferences} onUpdate={loadProfile} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}