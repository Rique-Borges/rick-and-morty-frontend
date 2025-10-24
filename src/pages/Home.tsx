import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, Play, MapPin, Heart, ArrowRight, Sparkles } from "lucide-react";
import { CharacterCard } from "@/components/charactercard";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [counters, setCounters] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsRes, countersRes] = await Promise.allSettled([
          api.get("/rm/stats"),
          api.get("/me/home-counters")
        ]);
        
        if (statsRes.status === 'fulfilled') {
          setStats(statsRes.value.data);
        }
        
        if (countersRes.status === 'fulfilled') {
          setCounters(countersRes.value.data);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-8 h-8 text-primary animate-bounce-gentle" />
          <h1 className="text-5xl font-bold gradient-rm-text">
            Bem-vindo ao mundo {user?.name || 'de Rick and Morty'}!
          </h1>
          <Sparkles className="w-8 h-8 text-primary animate-bounce-gentle" />
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore o multiverso de Rick and Morty e descubra personagens incríveis de todas as dimensões
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover-lift animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Personagens
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold gradient-rm-text">{stats.totalCharacters}</div>
              <p className="text-xs text-muted-foreground">
                Personagens únicos no multiverso
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Episódios
              </CardTitle>
              <Play className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold gradient-rm-text">{stats.totalEpisodes}</div>
              <p className="text-xs text-muted-foreground">
                Aventuras épicas disponíveis
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Localizações
              </CardTitle>
              <MapPin className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold gradient-rm-text">{stats.totalLocations}</div>
              <p className="text-xs text-muted-foreground">
                Planetas e dimensões exploradas
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Characters Section */}
      {counters && counters.last3Saved && counters.last3Saved.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold gradient-rm-text">Seus Personagens Favoritos</h2>
            </div>
            <Button 
              onClick={() => navigate("/meus-personagens")}
              className="gradient-rm hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Ver todos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {counters.last3Saved.map((ch: any, index: number) => (
              <div 
                key={ch.id} 
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CharacterCard
                  id={ch.id}
                  name={ch.name}
                  image={ch.image}
                  status={ch.status}
                  species={ch.species}
                  gender={ch.gender}
                  origin={ch.origin}
                  location={ch.location}
                  showButton={false}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center py-12">
        <Card className="max-w-2xl mx-auto glass hover-lift">
          <CardContent className="p-8 space-y-4">
            <h3 className="text-2xl font-bold gradient-rm-text">
              Pronto para uma nova aventura?
            </h3>
            <p className="text-muted-foreground">
              Explore todos os personagens do multiverso e descubra histórias incríveis
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate("/personagens")}
                className="gradient-rm hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Explorar Personagens
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              {user && (
                <Button 
                  variant="outline"
                  onClick={() => navigate("/meus-personagens")}
                  className="hover-glow"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Meus Favoritos
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
