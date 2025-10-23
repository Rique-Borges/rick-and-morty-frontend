import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Eye, MapPin, User } from "lucide-react";

interface CharacterCardProps {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: string;
  location: string;
  showButton?: boolean; // opcional (para esconder o botão na Home)
}

export function CharacterCard({
  id,
  name,
  image,
  status,
  species,
  gender,
  origin,
  location,
  showButton = true,
}: CharacterCardProps) {
  const navigate = useNavigate();

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Alive":
        return "status-alive";
      case "Dead":
        return "status-dead";
      default:
        return "status-unknown";
    }
  };

  return (
    <Card className="character-card group overflow-hidden hover-lift animate-scale-in">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3">
          <span className={`text-xs px-3 py-1 rounded-full font-medium shadow-lg ${getStatusClass(status)}`}>
            {status}
          </span>
        </div>
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
            {name}
          </h2>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>{species} • {gender}</span>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span className="truncate">Origem: {origin}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span className="truncate">Local: {location}</span>
            </div>
          </div>
        </div>

        {showButton && (
          <Button
            className="w-full gradient-rm hover:shadow-lg hover:scale-105 transition-all duration-200 group/btn"
            onClick={() => navigate(`/personagens/${id}`)}
          >
            <Eye className="w-4 h-4 mr-2 group-hover/btn:animate-bounce-gentle" />
            Ver detalhes
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
