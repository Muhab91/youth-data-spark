import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { StudentCard } from "@/components/StudentCard";
import { StatsCard } from "@/components/StatsCard";
import { Users, GraduationCap, Calendar, TrendingUp, Plus, Filter } from "lucide-react";
import heroImage from "@/assets/hero-youth.jpg";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for demonstration
  const stats = [
    {
      title: "Gesamte Studenten",
      value: "324",
      change: "+12% von letztem Monat",
      icon: Users,
      trend: "up" as const,
    },
    {
      title: "Aktive Programme",
      value: "12",
      change: "+2 neue Programme",
      icon: GraduationCap,
      trend: "up" as const,
    },
    {
      title: "Diese Woche Events",
      value: "8",
      change: "3 mehr als letzte Woche",
      icon: Calendar,
      trend: "up" as const,
    },
    {
      title: "Abschlussrate",
      value: "87%",
      change: "+5% Verbesserung",
      icon: TrendingUp,
      trend: "up" as const,
    },
  ];

  const students = [
    {
      id: "1",
      name: "Ahmed Hassan",
      email: "ahmed.hassan@email.com",
      phone: "+49 123 456 789",
      age: 22,
      program: "Web Development",
      status: "active" as const,
      joinDate: "15.03.2024",
      location: "Berlin, Deutschland",
    },
    {
      id: "2",
      name: "Fatima Al-Zahra",
      email: "fatima.alzahra@email.com",
      phone: "+49 987 654 321",
      age: 20,
      program: "Data Science",
      status: "active" as const,
      joinDate: "08.02.2024",
      location: "Hamburg, Deutschland",
    },
    {
      id: "3",
      name: "Omar Khalil",
      email: "omar.khalil@email.com",
      phone: "+49 555 777 999",
      age: 24,
      program: "UI/UX Design",
      status: "graduated" as const,
      joinDate: "01.12.2023",
      location: "München, Deutschland",
    },
    {
      id: "4",
      name: "Zahra Mansour",
      email: "zahra.mansour@email.com",
      phone: "+49 444 666 888",
      age: 19,
      program: "Mobile Development",
      status: "pending" as const,
      joinDate: "20.04.2024",
      location: "Frankfurt, Deutschland",
    },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.program.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div className="absolute inset-0">
          <img 
            src={heroImage}
            alt="Youth working together"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative container mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-float">
            Zukunft gestalten mit
            <span className="block bg-white bg-clip-text text-transparent">
              Shabab Platform
            </span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Die moderne Plattform für Jugendprogramme und Studentenverwaltung.
            Ermögliche jungen Menschen, ihr volles Potenzial zu entfalten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Neuen Studenten hinzufügen
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Programme verwalten
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Students Section */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <TabsList className="bg-card/50 backdrop-blur-sm border border-primary/20">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Alle Studenten
              </TabsTrigger>
              <TabsTrigger value="active" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Aktiv
              </TabsTrigger>
              <TabsTrigger value="graduated" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Abgeschlossen
              </TabsTrigger>
            </TabsList>
            
            <div className="flex gap-3">
              <Input
                placeholder="Studenten suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 bg-card/50 backdrop-blur-sm border-primary/20"
              />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStudents
                .filter(student => student.status === "active")
                .map((student) => (
                  <StudentCard key={student.id} student={student} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="graduated">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStudents
                .filter(student => student.status === "graduated")
                .map((student) => (
                  <StudentCard key={student.id} student={student} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;