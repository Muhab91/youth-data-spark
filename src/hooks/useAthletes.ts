import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Athlete {
  id: string;
  profile_id: string;
  sport: string;
  level: string;
  height?: number;
  weight?: number;
  years_experience?: number;
  training_hours_per_week?: number;
  created_at: string;
  updated_at: string;
  profiles?: {
    id: string;
    full_name?: string;
    email?: string;
    phone?: string;
    date_of_birth?: string;
    role?: string;
  };
}

export interface AthleteStats {
  totalAthletes: number;
  activePrograms: number;
  weeklyEvents: number;
  completionRate: number;
}

export const useAthletes = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [stats, setStats] = useState<AthleteStats>({
    totalAthletes: 0,
    activePrograms: 0,
    weeklyEvents: 0,
    completionRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAthletes();
    fetchStats();
  }, []);

  const fetchAthletes = async () => {
    try {
      const { data, error } = await supabase
        .from('athletes')
        .select(`
          id,
          profile_id,
          sport,
          level,
          height,
          weight,
          years_experience,
          training_hours_per_week,
          created_at,
          updated_at
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Then fetch profiles separately due to potential relationship issues
      const athletesWithProfiles = await Promise.all(
        (data || []).map(async (athlete) => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('id, full_name, email, phone, date_of_birth, role')
            .eq('id', athlete.profile_id)
            .single();
            
          return {
            ...athlete,
            profiles: profileData
          };
        })
      );
      
      setAthletes(athletesWithProfiles as Athlete[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch athletes');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Get total athletes count
      const { count: totalAthletes } = await supabase
        .from('athletes')
        .select('*', { count: 'exact', head: true });

      // Get unique sports count as active programs
      const { data: sportsData } = await supabase
        .from('athletes')
        .select('sport')
        .not('sport', 'is', null);

      const uniqueSports = new Set(sportsData?.map(item => item.sport)).size;

      // Get recent assessments as weekly events
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const { count: weeklyEvents } = await supabase
        .from('assessments')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', oneWeekAgo.toISOString());

      // Calculate completion rate based on assessments
      const { count: completedAssessments } = await supabase
        .from('assessments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'completed');

      const { count: totalAssessments } = await supabase
        .from('assessments')
        .select('*', { count: 'exact', head: true });

      const completionRate = totalAssessments > 0 
        ? Math.round((completedAssessments / totalAssessments) * 100)
        : 0;

      setStats({
        totalAthletes: totalAthletes || 0,
        activePrograms: uniqueSports,
        weeklyEvents: weeklyEvents || 0,
        completionRate
      });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  return {
    athletes,
    stats,
    loading,
    error,
    refetch: fetchAthletes
  };
};