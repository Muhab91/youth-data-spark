import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GraduationCap, Mail, Phone, MapPin, Calendar } from "lucide-react";

interface StudentCardProps {
  student: {
    id: string;
    name: string;
    email: string;
    phone: string;
    age: number;
    program: string;
    status: "active" | "graduated" | "pending";
    joinDate: string;
    location: string;
    avatar?: string;
  };
}

export const StudentCard = ({ student }: StudentCardProps) => {
  const statusColors = {
    active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    graduated: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  };

  return (
    <Card className="group hover:shadow-card transition-all duration-300 hover:scale-105 bg-gradient-card border-primary/20 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 ring-2 ring-primary/20">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {student.name}
              </h3>
              <p className="text-sm text-muted-foreground">{student.age} Jahre alt</p>
            </div>
          </div>
          <Badge className={statusColors[student.status]}>
            {student.status === "active" ? "Aktiv" : 
             student.status === "graduated" ? "Abgeschlossen" : "Wartend"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <GraduationCap className="h-4 w-4 text-primary" />
          <span>{student.program}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4 text-primary" />
          <span className="truncate">{student.email}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4 text-primary" />
          <span>{student.phone}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{student.location}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          <span>Beigetreten: {student.joinDate}</span>
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            Details
          </Button>
          <Button variant="glow" size="sm" className="flex-1">
            Kontakt
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};