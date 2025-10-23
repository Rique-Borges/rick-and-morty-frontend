import { useEffect, useMemo, useState } from "react";
import { fetchCharacters, type CharacterCard as CharacterType } from "../api/rm";
import { useDebounce } from "@/lib/Usedebounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CharacterCard } from "@/components/charactercard";

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
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <h1 className="text-2xl font-bold">Personagens</h1>
        <div className="w-full sm:w-80">
          <Input
            placeholder="Filtrar por nome..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {loading && <p className="text-muted-foreground">Carregando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <p className="text-sm text-muted-foreground">
            {count} resultados • Página {page} de {pages}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((c) => (
              <CharacterCard key={c.id} {...c} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <Button variant="outline" onClick={goPrev} disabled={!canPrev}>
              Anterior
            </Button>
            <span className="text-sm">Página {page} / {pages}</span>
            <Button onClick={goNext} disabled={!canNext}>
              Próxima
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
