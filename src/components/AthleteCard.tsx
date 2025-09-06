import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GraduationCap, Mail, Phone, MapPin, Calendar, Trophy } from "lucide-react";
import { Athlete } from "@/hooks/useAthletes";

interface AthleteCardProps {
  athlete: Athlete;
}

export const AthleteCard = ({ athlete }: AthleteCardProps) => {
  const getStatusColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'professional':
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case 'amateur':
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case 'youth':
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusLabel = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'professional': return 'Profi';
      case 'amateur': return 'Amateur';
      case 'youth': return 'Jugend';
      default: return level || 'Unbekannt';
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return null;
    const birth = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE');
  };

  const age = athlete.profiles?.date_of_birth ? calculateAge(athlete.profiles.date_of_birth) : null;

  return (
    <Card className="group hover:shadow-card transition-all duration-300 hover:scale-105 bg-gradient-card border-primary/20 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 ring-2 ring-primary/20">
              <AvatarImage src="" alt={athlete.profiles?.full_name || "Athlet"} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {athlete.profiles?.full_name?.split(' ').map(n => n[0]).join('') || 'A'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {athlete.profiles?.full_name || 'Unbekannter Athlet'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {age ? `${age} Jahre alt` : 'Alter unbekannt'}
              </p>
            </div>
          </div>
          <Badge className={getStatusColor(athlete.level)}>
            {getStatusLabel(athlete.level)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Trophy className="h-4 w-4 text-primary" />
          <span>{athlete.sport || 'Sport nicht angegeben'}</span>
        </div>
        
        {athlete.profiles?.email && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 text-primary" />
            <span className="truncate">{athlete.profiles.email}</span>
          </div>
        )}
        
        {athlete.profiles?.phone && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 text-primary" />
            <span>{athlete.profiles.phone}</span>
          </div>
        )}
        
        {athlete.years_experience && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span>{athlete.years_experience} Jahre Erfahrung</span>
          </div>
        )}
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          <span>Registriert: {formatDate(athlete.created_at)}</span>
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            Details
          </Button>
          <Button variant="glow" size="sm" className="flex-1">
            Bewertung
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};