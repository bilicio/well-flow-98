import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { activities, categories } from "@/data/activities";
import { Search, MapPin, Star, Users, Clock, SlidersHorizontal } from "lucide-react";

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredActivities = activities.filter((activity) => {
    const matchesCategory = selectedCategory === "all" || 
      activity.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-card border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Descubra <span className="bg-gradient-hero bg-clip-text text-transparent">Atividades</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Encontre experiências de bem-estar perto de você. Todas incluídas no seu plano.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por atividade, tag ou local..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
            </Button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="gap-2"
              >
                <span>{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredActivities.length} atividade{filteredActivities.length !== 1 ? 's' : ''} encontrada{filteredActivities.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Activity Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredActivities.map((activity, index) => (
            <Card
              key={activity.id}
              className="overflow-hidden hover:shadow-glow transition-all duration-300 border-2 hover:border-primary/50 group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link to={`/activity/${activity.id}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                      {activity.category}
                    </Badge>
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

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {activity.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">
                      {activity.price}
                    </span>
                    <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                      Ver detalhes
                    </Button>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              Nenhuma atividade encontrada para os filtros selecionados.
            </p>
            <Button onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}>
              Limpar filtros
            </Button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Catalog;
