import { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation as NavigationIcon, Key } from "lucide-react";
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
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationPermission, setLocationPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [apiKeyInput, setApiKeyInput] = useState<string>('');
  const [showApiKeyForm, setShowApiKeyForm] = useState<boolean>(false);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [hasMapError, setHasMapError] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedApiKey = localStorage.getItem('google_maps_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiKeyForm(true);
    }

    // Listen for Google Maps API errors
    const handleMapError = () => {
      setHasMapError(true);
      setIsMapLoaded(false);
      toast({
        title: "Erro ao carregar o mapa",
        description: "Verifique sua chave da API do Google Maps.",
        variant: "destructive",
      });
    };

    window.addEventListener('error', (e) => {
      if (e.message && (e.message.includes('Google Maps') || e.message.includes('AuthFailure'))) {
        handleMapError();
      }
    });

    return () => {
      window.removeEventListener('error', handleMapError);
    };
  }, []);

  const handleSaveApiKey = () => {
    if (!apiKeyInput.trim()) {
      toast({
        title: "Chave inválida",
        description: "Por favor, insira uma chave de API válida.",
        variant: "destructive",
      });
      return;
    }
    localStorage.setItem('google_maps_api_key', apiKeyInput.trim());
    setApiKey(apiKeyInput.trim());
    setShowApiKeyForm(false);
    setHasMapError(false);
    setIsMapLoaded(false);
    toast({
      title: "Chave salva",
      description: "Sua chave do Google Maps foi salva no navegador.",
    });
  };

  const handleChangeApiKey = () => {
    setShowApiKeyForm(true);
    setApiKey('');
    setHasMapError(false);
    localStorage.removeItem('google_maps_api_key');
  };

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
        setUserLocation({ lat: latitude, lng: longitude });
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

  const defaultCenter = { lat: -23.5505, lng: -46.6333 };
  const center = userLocation || defaultCenter;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Perto de Mim</h1>
          <p className="text-muted-foreground">
            Descubra estabelecimentos de bem-estar próximos a você
          </p>
        </div>

        {showApiKeyForm && (
          <Card className="mb-6 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Key className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Configure sua Chave do Google Maps</h3>
                  <p className="text-muted-foreground mb-4">
                    Para usar o mapa, você precisa inserir sua chave da API do Google Maps. A chave será salva no seu navegador.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg mb-4 text-sm">
                    <p className="font-medium mb-2">Requisitos da chave da API:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Habilite a <strong>Maps JavaScript API</strong> no Google Cloud Console</li>
                      <li>Habilite a <strong>Places API</strong> (opcional, para funcionalidades futuras)</li>
                      <li>Configure as restrições de URL para incluir seu domínio</li>
                    </ul>
                    <a 
                      href="https://developers.google.com/maps/documentation/javascript/get-api-key" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline mt-2 inline-block"
                    >
                      Como obter uma chave da API do Google Maps →
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Cole sua chave da API do Google Maps"
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleSaveApiKey}>
                      Salvar Chave
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {hasMapError && !showApiKeyForm && (
          <Card className="mb-6 border-destructive/20 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Key className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 text-destructive">Erro de Autenticação do Google Maps</h3>
                  <p className="text-muted-foreground mb-4">
                    Há um problema com sua chave da API. Verifique se:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mb-4">
                    <li>A chave da API está correta</li>
                    <li>A <strong>Maps JavaScript API</strong> está habilitada no seu projeto do Google Cloud</li>
                    <li>As restrições de domínio estão configuradas corretamente</li>
                    <li>A cobrança está ativada no Google Cloud (necessário para produção)</li>
                  </ul>
                  <Button onClick={handleChangeApiKey} variant="destructive">
                    Alterar Chave da API
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {locationPermission === 'prompt' && (
          <Card className="mb-6 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Permitir acesso à localização</h3>
                  <p className="text-muted-foreground mb-4">
                    Para mostrar estabelecimentos próximos a você, precisamos acessar sua localização.
                  </p>
                  <Button onClick={requestLocation} className="gap-2">
                    <NavigationIcon className="w-4 h-4" />
                    Ativar Localização
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {apiKey && !showApiKeyForm && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="h-[500px] rounded-lg overflow-hidden border">
              <APIProvider 
                apiKey={apiKey}
                onLoad={() => setHasMapError(false)}
              >
              <Map
                defaultCenter={center}
                defaultZoom={userLocation ? 14 : 12}
                mapId="wellness-map"
                gestureHandling="greedy"
                disableDefaultUI={false}
                onTilesLoaded={() => setIsMapLoaded(true)}
              >
                {isMapLoaded && userLocation && (
                  <AdvancedMarker position={userLocation}>
                    <Pin
                      background={'#2dd4bf'}
                      borderColor={'#14b8a6'}
                      glyphColor={'#fff'}
                      scale={1.2}
                    />
                  </AdvancedMarker>
                )}

                {isMapLoaded && establishments.map((establishment) => (
                  <AdvancedMarker
                    key={establishment.id}
                    position={{ lat: establishment.lat, lng: establishment.lng }}
                    onClick={() => setSelectedMarker(establishment.id)}
                  >
                    <Pin
                      background={'#9333ea'}
                      borderColor={'#7c3aed'}
                      glyphColor={'#fff'}
                    />
                  </AdvancedMarker>
                ))}

                {selectedMarker && (
                  <InfoWindow
                    position={{
                      lat: establishments.find(e => e.id === selectedMarker)!.lat,
                      lng: establishments.find(e => e.id === selectedMarker)!.lng,
                    }}
                    onCloseClick={() => setSelectedMarker(null)}
                  >
                    <div className="p-2">
                      <h4 className="font-semibold text-gray-900">
                        {establishments.find(e => e.id === selectedMarker)!.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {establishments.find(e => e.id === selectedMarker)!.category}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {establishments.find(e => e.id === selectedMarker)!.address}
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </APIProvider>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Estabelecimentos Próximos
            </h2>
            {establishments.map((establishment) => (
              <Card key={establishment.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{establishment.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{establishment.category}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {establishment.address}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedMarker(establishment.id)}
                    >
                      Ver no Mapa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default NearMe;
