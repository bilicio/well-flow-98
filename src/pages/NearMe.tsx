import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation as NavigationIcon, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample establishments near user
const establishments = [
  { id: 1, name: "Studio de Yoga Harmonia", lat: -23.5505, lng: -46.6333, category: "Yoga", address: "Av. Paulista, 1000" },
  { id: 2, name: "Espaço de Meditação Zen", lat: -23.5515, lng: -46.6343, category: "Meditação", address: "Rua Augusta, 2500" },
  { id: 3, name: "Atelier de Arte Criativa", lat: -23.5495, lng: -46.6323, category: "Arte", address: "Rua Oscar Freire, 500" },
  { id: 4, name: "Centro de Dança Movimento", lat: -23.5525, lng: -46.6353, category: "Dança", address: "Av. Rebouças, 800" },
  { id: 5, name: "Parque Bem-Estar", lat: -23.5485, lng: -46.6313, category: "Atividades ao ar livre", address: "Rua Estados Unidos, 1500" },
];

const NearMe = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [tokenSubmitted, setTokenSubmitted] = useState(false);
  const [locationPermission, setLocationPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const { toast } = useToast();

  const requestLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocalização não suportada",
        description: "Seu navegador não suporta geolocalização.",
        variant: "destructive",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([longitude, latitude]);
        setLocationPermission('granted');
        toast({
          title: "Localização ativada",
          description: "Mostrando estabelecimentos próximos a você.",
        });
      },
      (error) => {
        setLocationPermission('denied');
        toast({
          title: "Permissão negada",
          description: "Não foi possível acessar sua localização. Por favor, habilite nas configurações do navegador.",
          variant: "destructive",
        });
      }
    );
  };

  useEffect(() => {
    if (!mapContainer.current || !tokenSubmitted || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    const initialCenter: [number, number] = userLocation || [-46.6333, -23.5505];
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: initialCenter,
      zoom: userLocation ? 14 : 12,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add user location marker if available
    if (userLocation) {
      new mapboxgl.Marker({ color: '#2dd4bf', scale: 1.2 })
        .setLngLat(userLocation)
        .setPopup(new mapboxgl.Popup().setHTML('<strong>Você está aqui</strong>'))
        .addTo(map.current);
    }

    // Add establishment markers
    establishments.forEach((establishment) => {
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.backgroundImage = 'url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)';
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.backgroundSize = '100%';
      el.style.cursor = 'pointer';

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div class="p-2">
          <h3 class="font-semibold text-sm mb-1">${establishment.name}</h3>
          <p class="text-xs text-muted-foreground mb-1">${establishment.category}</p>
          <p class="text-xs">${establishment.address}</p>
        </div>`
      );

      new mapboxgl.Marker(el)
        .setLngLat([establishment.lng, establishment.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, [userLocation, tokenSubmitted, mapboxToken]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      setTokenSubmitted(true);
      toast({
        title: "Token configurado",
        description: "Carregando mapa...",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Perto de Mim
            </h1>
            <p className="text-muted-foreground">
              Encontre estabelecimentos de bem-estar próximos à sua localização
            </p>
          </div>

          {/* Mapbox Token Input */}
          {!tokenSubmitted && (
            <Card className="border-2 border-primary/20 bg-gradient-card">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold">Configure seu token Mapbox</h3>
                      <p className="text-sm text-muted-foreground">
                        Para visualizar o mapa, você precisa de um token público do Mapbox. 
                        Crie uma conta gratuita em{" "}
                        <a 
                          href="https://mapbox.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          mapbox.com
                        </a>
                        {" "}e cole seu token público abaixo.
                      </p>
                      <form onSubmit={handleTokenSubmit} className="flex gap-2 mt-4">
                        <Input
                          type="text"
                          placeholder="pk.eyJ1IjoiZXhhbXBsZS..."
                          value={mapboxToken}
                          onChange={(e) => setMapboxToken(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit">
                          Confirmar
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Location Permission Card */}
          {tokenSubmitted && locationPermission === 'prompt' && (
            <Card className="border-2 border-primary/20 bg-gradient-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Ativar Localização
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Permita o acesso à sua localização para encontrar estabelecimentos próximos
                    </p>
                  </div>
                  <Button onClick={requestLocation} className="ml-4">
                    <NavigationIcon className="w-4 h-4 mr-2" />
                    Ativar GPS
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Map Container */}
          {tokenSubmitted && (
            <Card className="overflow-hidden">
              <div ref={mapContainer} className="w-full h-[600px] rounded-lg" />
            </Card>
          )}

          {/* Establishments List */}
          {tokenSubmitted && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Estabelecimentos Próximos</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {establishments.map((establishment) => (
                  <Card key={establishment.id} className="hover:shadow-glow transition-shadow">
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <h3 className="font-semibold">{establishment.name}</h3>
                        <p className="text-sm text-primary">{establishment.category}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {establishment.address}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default NearMe;
