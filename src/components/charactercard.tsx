import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <img src={image} alt={name} className="w-full h-56 object-cover" />
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">{name}</h2>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              status === "Alive"
                ? "bg-green-100 text-green-700"
                : status === "Dead"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {status}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {species} • {gender}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Origem: {origin}
        </p>
        <p className="text-xs text-muted-foreground">
          Local: {location}
        </p>

        {showButton && (
          <Button
            className="w-full mt-3"
            onClick={() => navigate(`/personagens/${id}`)}
          >
            Ver detalhes
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
