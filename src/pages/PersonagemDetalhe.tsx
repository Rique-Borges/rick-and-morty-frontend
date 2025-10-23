import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { fetchCharacterById } from "../api/rm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Heart, Trash2, User, MapPin, Zap, Loader2, Star } from "lucide-react";

interface Character {
  id: number;
  original_character_id?: number;
  name: string;
  species: string;
  gender: string;
  origin: string;
  location: string;
  image: string;
  status: string;
}

export default function PersonagemDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [char, setChar] = useState<Character | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const cameFromLocal = location.state?.from === "meus";

  useEffect(() => {
    async function load() {
      try {
        if (cameFromLocal) {
          // Buscar do banco local
          const { data } = await api.get(`/characters/${id}`);
          setChar(data);
          setIsSaved(true);
        } else {
          // Buscar da API pública
          const data = await fetchCharacterById(Number(id));
          setChar(data);

          if (user) {
            try {
              const { data: myChars } = await api.get("/characters");
              const exists = myChars.some(
                (c: any) => c.original_character_id === data.id
              );
              setIsSaved(exists);
            } catch {}
          }
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, cameFromLocal, user]);

  async function handleSave() {
    if (!user) return navigate("/login");
    
    setActionLoading(true);
    try {
      await api.post("/characters", {
        original_character_id: char?.id,
        name: char?.name,
        species: char?.species,
        gender: char?.gender,
        origin: char?.origin,
        location: char?.location,
        image: char?.image,
        status: char?.status,
      });
      setIsSaved(true);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDelete() {
    setActionLoading(true);
    try {
      await api.delete(`/characters/${id}`);
      navigate("/meus-personagens");
    } finally {
      setActionLoading(false);
    }
  }

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-xl text-muted-foreground">Carregando personagem...</span>
        </div>
      </div>
    );
  }

  if (!char) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto border-destructive">
          <CardContent className="p-8 text-center">
            <p className="text-destructive font-medium text-lg">Personagem não encontrado</p>
            <Button 
              onClick={() => navigate("/personagens")}
              className="mt-4 gradient-rm"
            >
              Voltar aos Personagens
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 animate-fade-in">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="hover-glow"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Character Image */}
          <div className="space-y-6">
            <Card className="overflow-hidden hover-lift">
              <div className="relative">
                <img 
                  src={char.image} 
                  alt={char.name} 
                  className="w-full h-96 lg:h-[500px] object-cover" 
                />
                <div className="absolute top-4 right-4">
                  <span className={`text-sm px-4 py-2 rounded-full font-medium shadow-lg ${getStatusClass(char.status)}`}>
                    {char.status}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Card>
          </div>

          {/* Character Details */}
          <div className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-3xl font-bold gradient-rm-text">
                  {char.name}
                </CardTitle>
                <p className="text-muted-foreground">
                  ID Original: {cameFromLocal ? char.original_character_id : char.id}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Character Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{char.species}</p>
                      <p className="text-sm text-muted-foreground">Espécie</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Zap className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{char.gender}</p>
                      <p className="text-sm text-muted-foreground">Gênero</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{char.origin}</p>
                      <p className="text-sm text-muted-foreground">Origem</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{char.location}</p>
                      <p className="text-sm text-muted-foreground">Localização Atual</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  {user && !cameFromLocal && (
                    <Button
                      className="w-full gradient-rm hover:shadow-lg hover:scale-105 transition-all duration-200"
                      disabled={isSaved || actionLoading}
                      onClick={handleSave}
                    >
                      {actionLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Heart className="w-4 h-4 mr-2" />
                      )}
                      {isSaved ? "Já salvo nos favoritos" : "Salvar nos Favoritos"}
                    </Button>
                  )}

                  {cameFromLocal && (
                    <Button
                      variant="destructive"
                      className="w-full hover:shadow-lg hover:scale-105 transition-all duration-200"
                      onClick={handleDelete}
                      disabled={actionLoading}
                    >
                      {actionLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 mr-2" />
                      )}
                      Remover dos Favoritos
                    </Button>
                  )}

                  {!user && (
                    <Card className="border-primary/20 bg-primary/5">
                      <CardContent className="p-4 text-center">
                        <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-3">
                          Faça login para salvar seus personagens favoritos
                        </p>
                        <Button 
                          onClick={() => navigate("/login")}
                          className="gradient-rm"
                        >
                          Fazer Login
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
