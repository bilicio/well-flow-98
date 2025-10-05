import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Star, Clock, Users, Sparkles } from "lucide-react";

const Favorites = () => {
  // Mock favorited activities
  const favorites = [
    {
      id: "1",
      title: "Hatha Yoga para Iniciantes",
      category: "Movimento",
      image: "/placeholder.svg",
      location: "Pinheiros, São Paulo",
      distance: "1.2 km",
      rating: 4.8,
      duration: "60 min",
      availableSpots: 8,
    },
    {
      id: "3",
      title: "Meditação Guiada e Mindfulness",
      category: "Mente",
      image: "/placeholder.svg",
      location: "Jardins, São Paulo",
      distance: "3.1 km",
      rating: 5.0,
      duration: "45 min",
      availableSpots: 12,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />

      <section className="bg-gradient-card border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
            <Heart className="w-10 h-10 text-primary fill-primary" />
            Meus <span className="bg-gradient-hero bg-clip-text text-transparent">Favoritos</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Suas atividades favoritas em um só lugar
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          <Card className="p-12 text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-bold mb-2">Nenhum favorito ainda</h3>
            <p className="text-muted-foreground mb-6">
              Comece a adicionar atividades que você ama aos seus favoritos
            </p>
            <Button variant="hero" asChild>
              <Link to="/catalog">
                <Sparkles className="w-4 h-4" />
                Explorar Atividades
              </Link>
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((activity, index) => (
              <Card
                key={activity.id}
                className="overflow-hidden hover:shadow-glow transition-all duration-300 border-2 hover:border-primary/50 group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link to={`/activity/${activity.id}`}>
                  <div className="relative overflow-hidden">
                    <div className="w-full h-48 bg-gradient-card flex items-center justify-center">
                      <Heart className="w-16 h-16 text-primary/20" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                        {activity.category}
                      </Badge>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="bg-white/90 backdrop-blur-sm"
                      >
                        <Heart className="w-4 h-4 fill-primary text-primary" />
                      </Button>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg text-sm">
                      <MapPin className="w-3 h-3" />
                      {activity.distance}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {activity.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{activity.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{activity.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{activity.availableSpots} vagas</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {activity.location}
                    </p>

                    <Button
                      size="sm"
                      variant="hero"
                      className="w-full"
                    >
                      Ver detalhes
                    </Button>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Favorites;
