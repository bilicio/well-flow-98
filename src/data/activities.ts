import yogaImg from "@/assets/activity-yoga.jpg";
import artImg from "@/assets/activity-art.jpg";
import meditationImg from "@/assets/activity-meditation.jpg";
import danceImg from "@/assets/activity-dance.jpg";

export interface Activity {
  id: string;
  title: string;
  category: string;
  description: string;
  partner: string;
  image: string;
  location: string;
  address: string;
  distance: string;
  rating: number;
  tags: string[];
  duration: string;
  capacity: number;
  availableSpots: number;
  schedule: string[];
  price: string;
  level: string;
}

export const activities: Activity[] = [
  {
    id: "1",
    title: "Hatha Yoga para Iniciantes",
    category: "Movimento",
    description: "Aula de yoga focada em posturas básicas, respiração e relaxamento. Perfeita para quem está começando a jornada de bem-estar físico e mental. Inclui técnicas de mindfulness.",
    partner: "Espaço Zen Wellness",
    image: yogaImg,
    location: "Pinheiros, São Paulo",
    address: "Rua dos Pinheiros, 1234",
    distance: "1.2 km",
    rating: 4.8,
    tags: ["relaxamento", "movimento", "iniciante", "anti-stress"],
    duration: "60 min",
    capacity: 15,
    availableSpots: 8,
    schedule: ["Seg, Qua, Sex - 18h", "Ter, Qui - 7h"],
    price: "Incluído no plano",
    level: "Iniciante",
  },
  {
    id: "2",
    title: "Arteterapia: Pintura Intuitiva",
    category: "Arte",
    description: "Sessão de arteterapia onde você expressa emoções através da pintura. Não é necessário ter experiência. Materiais inclusos. Foco em autoconhecimento e liberação emocional.",
    partner: "Atelier Cores da Alma",
    image: artImg,
    location: "Vila Madalena, São Paulo",
    address: "Rua Harmonia, 567",
    distance: "2.5 km",
    rating: 4.9,
    tags: ["criatividade", "arte", "expressão", "burnout-prevention"],
    duration: "90 min",
    capacity: 12,
    availableSpots: 5,
    schedule: ["Sábados - 10h", "Quartas - 19h"],
    price: "Incluído no plano",
    level: "Todos os níveis",
  },
  {
    id: "3",
    title: "Meditação Guiada e Mindfulness",
    category: "Mente",
    description: "Práticas de meditação guiada para redução de estresse e ansiedade. Técnicas de mindfulness aplicáveis no dia a dia corporativo. Ambiente acolhedor e silencioso.",
    partner: "Centro de Mindfulness SP",
    image: meditationImg,
    location: "Jardins, São Paulo",
    address: "Alameda Santos, 890",
    distance: "3.1 km",
    rating: 5.0,
    tags: ["relaxamento", "mindfulness", "anti-stress", "saúde mental"],
    duration: "45 min",
    capacity: 20,
    availableSpots: 12,
    schedule: ["Seg a Sex - 12h30", "Ter e Qui - 18h30"],
    price: "Incluído no plano",
    level: "Todos os níveis",
  },
  {
    id: "4",
    title: "Dança Livre e Expressão Corporal",
    category: "Movimento",
    description: "Libere tensões através da dança livre! Não tem coreografia, apenas movimento autêntico e conexão com seu corpo. Música ambiente e facilitação profissional.",
    partner: "Studio Movimento Livre",
    image: danceImg,
    location: "Bela Vista, São Paulo",
    address: "Rua Augusta, 2345",
    distance: "1.8 km",
    rating: 4.7,
    tags: ["movimento", "expressão", "energia", "social"],
    duration: "75 min",
    capacity: 18,
    availableSpots: 10,
    schedule: ["Quartas - 19h", "Sábados - 11h"],
    price: "Incluído no plano",
    level: "Todos os níveis",
  },
  {
    id: "5",
    title: "Yoga Restaurativa",
    category: "Movimento",
    description: "Prática suave de yoga focada em restauração profunda do sistema nervoso. Posturas passivas com apoio de props. Ideal para combater burnout e estresse crônico.",
    partner: "Espaço Zen Wellness",
    image: yogaImg,
    location: "Pinheiros, São Paulo",
    address: "Rua dos Pinheiros, 1234",
    distance: "1.2 km",
    rating: 4.9,
    tags: ["relaxamento", "restauração", "burnout-prevention", "sono"],
    duration: "75 min",
    capacity: 12,
    availableSpots: 6,
    schedule: ["Domingos - 16h", "Quintas - 20h"],
    price: "Incluído no plano",
    level: "Todos os níveis",
  },
  {
    id: "6",
    title: "Oficina de Escrita Criativa",
    category: "Arte",
    description: "Explore sua criatividade através da escrita. Técnicas para destravar bloqueios criativos e expressar pensamentos. Ambiente acolhedor para compartilhamento.",
    partner: "Coletivo Literário",
    image: artImg,
    location: "Vila Madalena, São Paulo",
    address: "Rua Aspicuelta, 456",
    distance: "2.3 km",
    rating: 4.6,
    tags: ["criatividade", "expressão", "arte", "introspecção"],
    duration: "120 min",
    capacity: 15,
    availableSpots: 9,
    schedule: ["Sábados - 14h"],
    price: "Incluído no plano",
    level: "Todos os níveis",
  },
];

export const categories = [
  { id: "all", name: "Todas", icon: "🌟" },
  { id: "movimento", name: "Movimento", icon: "🧘" },
  { id: "arte", name: "Arte", icon: "🎨" },
  { id: "mente", name: "Mente", icon: "🧠" },
  { id: "social", name: "Social", icon: "👥" },
];
