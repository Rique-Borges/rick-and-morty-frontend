import { useEffect, useMemo, useState } from "react";
import { fetchCharacters, type CharacterCard as CharacterType } from "../api/rm";
import { useDebounce } from "@/lib/Usedebounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CharacterCard } from "@/components/charactercard";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ChevronLeft, ChevronRight, Users, Loader2 } from "lucide-react";

export default function Personagens() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const debouncedName = useDebounce(name, 500);

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<CharacterType[]>([]);
  const [pages, setPages] = useState(1);
  const [count, setCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const canPrev = useMemo(() => page > 1, [page]);
  const canNext = useMemo(() => page < pages, [page, pages]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCharacters(page, debouncedName);
        if (!mounted) return;
        setItems(data.results);
        setPages(data.info.pages);
        setCount(data.info.count);
      } catch (e: any) {
        setError(e?.response?.data?.message ?? "Falha ao carregar personagens");
        setItems([]);
        setPages(1);
        setCount(0);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [page, debouncedName]);

  function goPrev() {
    if (canPrev) setPage((p) => p - 1);
  }
  function goNext() {
    if (canNext) setPage((p) => p + 1);
  }

  return (
    <div className="min-h-screen p-6 space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="text-center space-y-6 py-8">
        <div className="flex items-center justify-center gap-3">
          <Users className="w-8 h-8 text-primary animate-bounce-gentle" />
          <h1 className="text-4xl font-bold gradient-rm-text">Personagens</h1>
          <Users className="w-8 h-8 text-primary animate-bounce-gentle" />
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore todos os personagens do multiverso de Rick and Morty
        </p>
      </div>

      {/* Search Section */}
      <Card className="max-w-2xl mx-auto glass hover-lift">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar personagens por nome..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setPage(1);
              }}
              className="pl-10 text-lg py-6 hover-glow"
            />
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="text-lg text-muted-foreground">Carregando personagens...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="max-w-md mx-auto border-destructive">
          <CardContent className="p-6 text-center">
            <p className="text-destructive font-medium">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {!loading && !error && (
        <>
          {/* Results Info */}
          <div className="text-center">
            <Card className="max-w-md mx-auto glass">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">{count}</span> personagens encontrados
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Página {page} de {pages}
                </p>
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
                <CharacterCard {...character} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 pt-8">
            <Button 
              variant="outline" 
              onClick={goPrev} 
              disabled={!canPrev}
              className="hover-glow"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(pages - 4, page - 2)) + i;
                if (pageNum > pages) return null;
                
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPage(pageNum)}
                    className={pageNum === page ? "gradient-rm" : "hover-glow"}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button 
              onClick={goNext} 
              disabled={!canNext}
              className="gradient-rm hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Próxima
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
