import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { activities } from "@/data/activities";
import { 
  MapPin, 
  Star, 
  Users, 
  Clock, 
  Calendar,
  Heart,
  Share2,
  ChevronLeft,
  CheckCircle2,
  Info
} from "lucide-react";
import { toast } from "sonner";

const ActivityDetail = () => {
  const { id } = useParams();
  const activity = activities.find((a) => a.id === id);

  if (!activity) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Atividade não encontrada</h1>
          <Button asChild>
            <Link to="/catalog">Voltar ao catálogo</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    toast.success("Reserva confirmada!", {
      description: `Você está confirmado para ${activity.title}. QR code enviado por e-mail.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <Button variant="ghost" asChild className="gap-2">
          <Link to="/catalog">
            <ChevronLeft className="w-4 h-4" />
            Voltar ao catálogo
          </Link>
        </Button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-glow animate-scale-in">
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-base px-4 py-2">
                  {activity.category}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="icon" variant="secondary" className="bg-white/90 backdrop-blur-sm">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="secondary" className="bg-white/90 backdrop-blur-sm">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Title and Basic Info */}
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold mb-4">{activity.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-medium">{activity.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{activity.rating}/5</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{activity.duration}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {activity.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-lg leading-relaxed text-muted-foreground">
                {activity.description}
              </p>
            </div>

            {/* Partner Info */}
            <Card className="p-6 animate-fade-in">
              <h3 className="text-xl font-semibold mb-4">Sobre o Parceiro</h3>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {activity.partner[0]}
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{activity.partner}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{activity.address}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{activity.rating} estrelas</span>
                    <span className="text-muted-foreground">· Parceiro verificado</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Schedule */}
            <Card className="p-6 animate-fade-in">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Horários Disponíveis
              </h3>
              <div className="space-y-2">
                {activity.schedule.map((schedule, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gradient-card">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-medium">{schedule}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 shadow-glow border-2 animate-slide-up">
              <div className="mb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {activity.price}
                </div>
                <p className="text-sm text-muted-foreground">
                  Acesso ilimitado com seu plano
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-card">
                  <span className="text-sm font-medium">Nível</span>
                  <span className="text-sm">{activity.level}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-card">
                  <span className="text-sm font-medium">Duração</span>
                  <span className="text-sm">{activity.duration}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-card">
                  <span className="text-sm font-medium">Vagas disponíveis</span>
                  <span className="text-sm font-bold text-primary">
                    {activity.availableSpots}/{activity.capacity}
                  </span>
                </div>
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full mb-3"
                onClick={handleBooking}
              >
                <Calendar className="w-5 h-5" />
                Fazer Reserva
              </Button>

              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link to="/profile">
                  Ver Meus Pontos
                </Link>
              </Button>

              <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Como funciona?</p>
                    <p className="text-muted-foreground">
                      Reserve gratuitamente, compareça no horário e faça check-in com QR code para ganhar +10 pontos!
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
