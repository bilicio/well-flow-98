import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Heart, Target, Trophy, Users, Sparkles, MapPin, Calendar, QrCode } from "lucide-react";
import heroImage from "@/assets/hero-wellness.jpg";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();
  const features = [
    {
      icon: MapPin,
      title: "Descubra Experiências",
      description: "Centenas de atividades de bem-estar perto de você: yoga, arte, meditação, dança e muito mais.",
    },
    {
      icon: QrCode,
      title: "Check-in Inteligente",
      description: "QR code + geolocalização para garantir sua presença nas atividades e acumular pontos.",
    },
    {
      icon: Trophy,
      title: "Gamificação",
      description: "Complete missões, ganhe badges, suba de nível e resgate recompensas exclusivas.",
    },
    {
      icon: Target,
      title: "Previna o Burnout",
      description: "Trilhas especializadas focadas em saúde mental, relaxamento e conexões sociais.",
    },
  ];

  const stats = [
    { label: "Atividades", value: "500+" },
    { label: "Parceiros", value: "200+" },
    { label: "Colaboradores", value: "10K+" },
    { label: "Check-ins/mês", value: "50K+" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Olá, {user?.name}!</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Cuide do seu bem-estar.<br />
                <span className="text-white/90">Previna o burnout.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90">
                Acesse centenas de atividades de bem-estar, acumule pontos e transforme sua saúde mental em uma jornada gamificada.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="accent" size="lg" asChild>
                  <Link to="/catalog">
                    <Heart className="w-5 h-5" />
                    Explorar Atividades
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white hover:text-primary">
                  Como Funciona
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 pt-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                    <div className="text-xs md:text-sm text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-scale-in hidden md:block">
              <div className="absolute inset-0 bg-gradient-accent rounded-3xl blur-3xl opacity-30 animate-float" />
              <img
                src={heroImage}
                alt="Pessoas praticando atividades de bem-estar"
                className="relative rounded-3xl shadow-glow object-cover w-full h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Como <span className="bg-gradient-hero bg-clip-text text-transparent">MyndPass</span> Funciona
            </h2>
            <p className="text-lg text-muted-foreground">
              Uma plataforma completa para transformar o bem-estar corporativo em uma experiência engajadora
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="p-6 hover:shadow-glow transition-all duration-300 border-2 hover:border-primary/50 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-card flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
              Comece em 3 Passos
            </h2>

            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Explore o Catálogo",
                  description: "Navegue por centenas de atividades: yoga, arte-terapia, meditação, dança, oficinas culturais e muito mais. Filtre por localização, categoria e horário.",
                  icon: MapPin,
                },
                {
                  step: "02",
                  title: "Reserve e Participe",
                  description: "Escolha uma atividade, faça sua reserva gratuita (inclusa no seu plano) e compareça ao local. Use o QR code para fazer check-in e validar sua presença.",
                  icon: Calendar,
                },
                {
                  step: "03",
                  title: "Acumule Pontos e Recompensas",
                  description: "Cada check-in vale pontos! Complete missões semanais, suba de nível, ganhe badges exclusivos e troque seus pontos por recompensas.",
                  icon: Trophy,
                },
              ].map((step, index) => (
                <div
                  key={step.step}
                  className="flex gap-6 items-start animate-slide-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center text-white text-2xl font-bold shadow-glow">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <step.icon className="w-6 h-6 text-primary" />
                      <h3 className="text-2xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-lg text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="hero" size="lg" asChild>
                <Link to="/catalog">
                  <Sparkles className="w-5 h-5" />
                  Começar Agora
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <Card className="relative overflow-hidden border-0 shadow-glow">
            <div className="absolute inset-0 bg-gradient-hero opacity-90" />
            <div className="relative p-12 md:p-20 text-center text-white">
              <Users className="w-16 h-16 mx-auto mb-6 animate-float" />
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Pronto para transformar seu bem-estar?
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de colaboradores que já melhoraram sua saúde mental e qualidade de vida
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="accent" size="lg" asChild>
                  <Link to="/catalog">
                    <Heart className="w-5 h-5" />
                    Ver Atividades
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white hover:text-primary">
                  Falar com RH
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 MyndPass. Plataforma de bem-estar corporativo.</p>
        </div>
      </footer>

      <BottomNav />
    </div>
  );
};

export default Index;
