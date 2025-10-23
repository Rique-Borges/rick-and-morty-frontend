import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export default function MeusPersonagens() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/characters")
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6 text-center">Carregando...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Meus Personagens</h1>

      {items.length === 0 ? (
        <p>Nenhum personagem salvo ainda.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((c) => (
            <Card
              key={c.id}
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() =>
                navigate(`/personagens/${c.id}`, {
                  state: { from: "meus", originalId: c.original_character_id },
                })
              }
            >
              <img src={c.image} alt={c.name} className="w-full h-56 object-cover" />
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">{c.name}</h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      c.status === "Alive"
                        ? "bg-green-100 text-green-700"
                        : c.status === "Dead"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {c.species} • {c.gender}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Origem: {c.origin}
                </p>
                <p className="text-xs text-muted-foreground">
                  Local: {c.location}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="text-center pt-4">
        <Button onClick={() => navigate("/personagens")}>
          Adicionar mais personagens
        </Button>
      </div>
    </div>
  );
}
