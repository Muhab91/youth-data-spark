import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { AthleteCard } from "@/components/AthleteCard";
import { StatsCard } from "@/components/StatsCard";
import { Users, GraduationCap, Calendar, TrendingUp, Plus, Filter } from "lucide-react";
import heroImage from "@/assets/hero-youth.jpg";
import { useAthletes } from "@/hooks/useAthletes";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { athletes, stats: athleteStats, loading, error } = useAthletes();

  const stats = [
    {
      title: "Gesamte Athleten",
      value: athleteStats.totalAthletes.toString(),
      change: "+12% von letztem Monat",
      icon: Users,
      trend: "up" as const,
    },
    {
      title: "Aktive Sportarten",
      value: athleteStats.activePrograms.toString(),
      change: "+2 neue Programme",
      icon: GraduationCap,
      trend: "up" as const,
    },
    {
      title: "Diese Woche Events",
      value: athleteStats.weeklyEvents.toString(),
      change: "3 mehr als letzte Woche",
      icon: Calendar,
      trend: "up" as const,
    },
    {
      title: "Bewertungsrate",
      value: `${athleteStats.completionRate}%`,
      change: "+5% Verbesserung",
      icon: TrendingUp,
      trend: "up" as const,
    },
  ];

  const filteredAthletes = athletes.filter(athlete =>
    athlete.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    athlete.sport?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Lade Athletendaten...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Fehler beim Laden der Daten: {error}</p>
          <Button onClick={() => window.location.reload()}>Erneut versuchen</Button>
        </div>
      </div>
    );
  }

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
            Athletenmanagement mit
            <span className="block bg-white bg-clip-text text-transparent">
              Shabab Alahli
            </span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Die professionelle Plattform für Sportmedizin und Athletenbetreuung.
            Optimiere Leistung und Gesundheit deiner Athleten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Neuen Athleten hinzufügen
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Bewertungen verwalten
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

        {/* Athletes Section */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <TabsList className="bg-card/50 backdrop-blur-sm border border-primary/20">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Alle Athleten
              </TabsTrigger>
              <TabsTrigger value="professional" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Profis
              </TabsTrigger>
              <TabsTrigger value="amateur" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Amateure
              </TabsTrigger>
              <TabsTrigger value="youth" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Jugend
              </TabsTrigger>
            </TabsList>
            
            <div className="flex gap-3">
              <Input
                placeholder="Athleten suchen..."
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
              {filteredAthletes.map((athlete) => (
                <AthleteCard key={athlete.id} athlete={athlete} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="professional">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAthletes
                .filter(athlete => athlete.level === "professional")
                .map((athlete) => (
                  <AthleteCard key={athlete.id} athlete={athlete} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="amateur">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAthletes
                .filter(athlete => athlete.level === "amateur")
                .map((athlete) => (
                  <AthleteCard key={athlete.id} athlete={athlete} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="youth">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAthletes
                .filter(athlete => athlete.level === "youth")
                .map((athlete) => (
                  <AthleteCard key={athlete.id} athlete={athlete} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;