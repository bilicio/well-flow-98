import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Smile, Frown, Meh, Heart, Zap, Cloud } from "lucide-react";

const feelings = [
  { label: "Feliz", icon: Smile },
  { label: "Desanimado", icon: Cloud },
  { label: "Triste", icon: Frown },
  { label: "Esperançoso", icon: Heart },
  { label: "Energizado", icon: Zap },
  { label: "Neutro", icon: Meh },
];

const activityTypes = [
  "Yoga",
  "Meditação",
  "Pilates",
  "Atividades ao ar livre",
  "Dança",
  "Arte e pintura",
  "Música",
  "Teatro",
  "Esportes coletivos",
  "Caminhada",
];

const hobbies = [
  "Leitura",
  "Fotografia",
  "Culinária",
  "Jardinagem",
  "Artesanato",
  "Jogos de tabuleiro",
  "Viagens",
  "Cinema",
  "Voluntariado",
  "Escrita criativa",
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const [step, setStep] = useState(1);
  const [feelingsData, setFeelingsData] = useState<Record<string, number>>(
    feelings.reduce((acc, f) => ({ ...acc, [f.label]: 5 }), {})
  );
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

  const handleFeelingChange = (feeling: string, value: number[]) => {
    setFeelingsData({ ...feelingsData, [feeling]: value[0] });
  };

  const toggleActivity = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const toggleHobby = (hobby: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby) ? prev.filter((h) => h !== hobby) : [...prev, hobby]
    );
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      completeOnboarding({
        feelings: feelingsData,
        activities: selectedActivities,
        hobbies: selectedHobbies,
      });
      navigate("/");
    }
  };

  const canProceed = () => {
    if (step === 2) return selectedActivities.length > 0;
    if (step === 3) return selectedHobbies.length > 0;
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 animate-fade-in">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Vamos te conhecer melhor!
            </h1>
            <span className="text-sm text-muted-foreground">
              Etapa {step} de 3
            </span>
          </div>
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Como você está se sentindo?
              </h2>
              <p className="text-muted-foreground mb-6">
                Avalie de 1 a 10 como você se sente em relação a cada emoção
              </p>
            </div>
            {feelings.map(({ label, icon: Icon }) => (
              <div key={label} className="space-y-3">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <Label className="text-lg">{label}</Label>
                  <span className="ml-auto text-2xl font-bold text-primary">
                    {feelingsData[label]}
                  </span>
                </div>
                <Slider
                  value={[feelingsData[label]]}
                  onValueChange={(value) => handleFeelingChange(label, value)}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Quais atividades te interessam?
              </h2>
              <p className="text-muted-foreground mb-6">
                Selecione todas que você gostaria de acompanhar
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activityTypes.map((activity) => (
                <div
                  key={activity}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50 ${
                    selectedActivities.includes(activity)
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                  onClick={() => toggleActivity(activity)}
                >
                  <Checkbox
                    checked={selectedActivities.includes(activity)}
                    onCheckedChange={() => toggleActivity(activity)}
                  />
                  <Label className="cursor-pointer flex-1">{activity}</Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Quais são seus hobbies?
              </h2>
              <p className="text-muted-foreground mb-6">
                Selecione seus hobbies favoritos
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {hobbies.map((hobby) => (
                <div
                  key={hobby}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50 ${
                    selectedHobbies.includes(hobby)
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                  onClick={() => toggleHobby(hobby)}
                >
                  <Checkbox
                    checked={selectedHobbies.includes(hobby)}
                    onCheckedChange={() => toggleHobby(hobby)}
                  />
                  <Label className="cursor-pointer flex-1">{hobby}</Label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="flex-1"
            >
              Voltar
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1"
          >
            {step === 3 ? "Finalizar" : "Próxima"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Onboarding;
