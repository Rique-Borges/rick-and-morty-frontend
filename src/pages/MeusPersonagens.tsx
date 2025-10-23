import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { CharacterCard } from "@/components/charactercard";
import { Heart, Plus, Loader2, Users } from "lucide-react";

export default function MeusPersonagens() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/characters")
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-xl text-muted-foreground">Carregando seus favoritos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="text-center space-y-6 py-8">
        <div className="flex items-center justify-center gap-3">
          <Heart className="w-8 h-8 text-primary animate-bounce-gentle" />
          <h1 className="text-4xl font-bold gradient-rm-text">Meus Personagens</h1>
          <Heart className="w-8 h-8 text-primary animate-bounce-gentle" />
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Seus personagens favoritos do multiverso
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <Card className="max-w-md mx-auto glass hover-lift">
            <CardContent className="p-8 space-y-6">
              <div className="w-16 h-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Nenhum favorito ainda</h3>
                <p className="text-muted-foreground">
                  Comece explorando personagens e salvando seus favoritos
                </p>
              </div>
              <Button 
                onClick={() => navigate("/personagens")}
                className="gradient-rm hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Explorar Personagens
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="text-center">
            <Card className="max-w-md mx-auto glass">
              <CardContent className="p-4">
                <div className="flex items-center justify-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-lg font-semibold">{items.length}</span>
                  <span className="text-muted-foreground">
                    {items.length === 1 ? 'personagem favorito' : 'personagens favoritos'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Characters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((character, index) => (
              <div 
                key={character.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div 
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(`/personagens/${character.id}`, {
                      state: { from: "meus", originalId: character.original_character_id },
                    })
                  }
                >
                  <CharacterCard {...character} />
                </div>
              </div>
            ))}
          </div>

          {/* Add More Button */}
          <div className="text-center pt-8">
            <Button 
              onClick={() => navigate("/personagens")}
              className="gradient-rm hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar mais personagens
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
