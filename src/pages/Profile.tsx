import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Zap, 
  Target, 
  Award,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Star,
  Gift,
  Sparkles
} from "lucide-react";

const Profile = () => {
  const userStats = {
    name: "Ana Silva",
    level: 7,
    points: 850,
    nextLevelPoints: 1000,
    checkins: 24,
    streak: 5,
    badges: 8,
    completedMissions: 3,
  };

  const recentActivities = [
    { date: "Hoje", activity: "Hatha Yoga", points: 10, status: "Confirmado" },
    { date: "Ontem", activity: "Meditação Guiada", points: 10, status: "Completado" },
    { date: "2 dias atrás", activity: "Arteterapia", points: 15, status: "Completado" },
  ];

  const badges = [
    { id: 1, name: "Primeira Jornada", icon: "🎯", unlocked: true },
    { id: 2, name: "Constância", icon: "🔥", unlocked: true },
    { id: 3, name: "Explorador", icon: "🗺️", unlocked: true },
    { id: 4, name: "Zen Master", icon: "🧘", unlocked: true },
    { id: 5, name: "Artista", icon: "🎨", unlocked: true },
    { id: 6, name: "Nível 5", icon: "⭐", unlocked: true },
    { id: 7, name: "Social", icon: "👥", unlocked: true },
    { id: 8, name: "Burnout Fighter", icon: "💪", unlocked: true },
    { id: 9, name: "Guardião", icon: "🛡️", unlocked: false },
    { id: 10, name: "Lendário", icon: "👑", unlocked: false },
  ];

  const missions = [
    {
      id: 1,
      title: "Desafio do Burnout",
      description: "Complete 3 atividades focadas em relaxamento esta semana",
      progress: 2,
      total: 3,
      reward: 50,
      status: "in-progress",
    },
    {
      id: 2,
      title: "Explorador",
      description: "Experimente 5 categorias diferentes de atividades",
      progress: 3,
      total: 5,
      reward: 75,
      status: "in-progress",
    },
    {
      id: 3,
      title: "Constância",
      description: "Faça check-in por 7 dias seguidos",
      progress: 5,
      total: 7,
      reward: 100,
      status: "in-progress",
    },
  ];

  const progressPercent = (userStats.points / userStats.nextLevelPoints) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Olá, <span className="bg-gradient-hero bg-clip-text text-transparent">{userStats.name}</span>! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            Continue sua jornada de bem-estar
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Level Progress Card */}
            <Card className="p-6 bg-gradient-card border-2 shadow-glow animate-scale-in">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Zap className="w-6 h-6 text-primary" />
                    Nível {userStats.level}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {userStats.nextLevelPoints - userStats.points} pontos para o próximo nível
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{userStats.points}</div>
                  <div className="text-sm text-muted-foreground">pontos totais</div>
                </div>
              </div>
              <Progress value={progressPercent} className="h-3 mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{userStats.points} pts</span>
                <span>{userStats.nextLevelPoints} pts</span>
              </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { icon: CheckCircle2, label: "Check-ins", value: userStats.checkins, color: "text-primary" },
                { icon: TrendingUp, label: "Sequência", value: `${userStats.streak} dias`, color: "text-orange-500" },
                { icon: Award, label: "Badges", value: userStats.badges, color: "text-purple-500" },
                { icon: Target, label: "Missões", value: userStats.completedMissions, color: "text-blue-500" },
              ].map((stat, index) => (
                <Card
                  key={stat.label}
                  className="p-4 hover:shadow-glow transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <stat.icon className={`w-8 h-8 mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>

            {/* Active Missions */}
            <Card className="p-6 animate-fade-in">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Missões Ativas
              </h3>
              <div className="space-y-4">
                {missions.map((mission) => (
                  <div
                    key={mission.id}
                    className="p-4 rounded-xl bg-gradient-card border-2 border-primary/20 hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg mb-1">{mission.title}</h4>
                        <p className="text-sm text-muted-foreground">{mission.description}</p>
                      </div>
                      <Badge variant="secondary" className="gap-1">
                        <Sparkles className="w-3 h-3" />
                        +{mission.reward} pts
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Progress value={(mission.progress / mission.total) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{mission.progress}/{mission.total} completos</span>
                        <span>{Math.round((mission.progress / mission.total) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activities */}
            <Card className="p-6 animate-fade-in">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Atividades Recentes
              </h3>
              <div className="space-y-3">
                {recentActivities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-card hover:bg-primary/5 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">{item.activity}</div>
                        <div className="text-sm text-muted-foreground">{item.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">+{item.points} pts</div>
                      <Badge variant="secondary" className="text-xs">{item.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges Collection */}
            <Card className="p-6 animate-slide-up">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Conquistas
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 transition-all ${
                      badge.unlocked
                        ? "bg-gradient-hero shadow-glow cursor-pointer hover:scale-110"
                        : "bg-muted opacity-40"
                    }`}
                  >
                    <div className="text-3xl mb-1">{badge.icon}</div>
                    <div className="text-[10px] text-center font-medium text-white">
                      {badge.name}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                {badges.filter(b => b.unlocked).length}/{badges.length} badges desbloqueados
              </p>
            </Card>

            {/* Rewards Store */}
            <Card className="p-6 bg-gradient-accent text-white animate-slide-up">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="w-6 h-6" />
                <h3 className="text-xl font-bold">Loja de Recompensas</h3>
              </div>
              <p className="text-sm text-white/90 mb-6">
                Troque seus pontos por vouchers, experiências exclusivas e mais!
              </p>
              <Button variant="secondary" className="w-full">
                Explorar Recompensas
              </Button>
            </Card>

            {/* Weekly Challenge */}
            <Card className="p-6 border-2 border-primary/50 animate-slide-up">
              <div className="text-center">
                <Star className="w-12 h-12 text-primary mx-auto mb-3 animate-float" />
                <h3 className="text-lg font-bold mb-2">Desafio Semanal</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete 5 atividades esta semana e ganhe uma recompensa especial!
                </p>
                <div className="text-3xl font-bold text-primary mb-2">3/5</div>
                <Progress value={60} className="h-2 mb-4" />
                <Badge variant="secondary" className="gap-1">
                  <Sparkles className="w-3 h-3" />
                  Recompensa: 150 pts
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
