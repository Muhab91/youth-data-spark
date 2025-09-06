import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: "up" | "down" | "neutral";
}

export const StatsCard = ({ title, value, change, icon: Icon, trend }: StatsCardProps) => {
  const trendColors = {
    up: "text-emerald-400",
    down: "text-red-400",
    neutral: "text-yellow-400",
  };

  return (
    <Card className="hover:shadow-card transition-all duration-300 hover:scale-105 bg-gradient-card border-primary/20 backdrop-blur-sm animate-float">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className={`text-xs ${trendColors[trend]} flex items-center`}>
          <span className="mr-1">
            {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"}
          </span>
          {change}
        </p>
      </CardContent>
    </Card>
  );
};