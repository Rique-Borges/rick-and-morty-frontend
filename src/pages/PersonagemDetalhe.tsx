import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { fetchCharacterById } from "../api/rm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "../context/AuthContext";

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

  const cameFromLocal = location.state?.from === "meus";
  const originalId = location.state?.originalId;

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
  }

  async function handleDelete() {
    await api.delete(`/characters/${id}`);
    navigate("/meus-personagens");
  }

  if (loading) return <p className="p-8 text-center">Carregando...</p>;
  if (!char) return <p className="p-8 text-center">Personagem não encontrado.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="overflow-hidden">
        <img src={char.image} alt={char.name} className="w-full h-96 object-cover" />
        <CardContent className="p-6 space-y-2">
          <h1 className="text-3xl font-bold">{char.name}</h1>
          <p>ID Original: {cameFromLocal ? char.original_character_id : char.id}</p>
          <p>Espécie: {char.species}</p>
          <p>Gênero: {char.gender}</p>
          <p>Origem: {char.origin}</p>
          <p>Localização: {char.location}</p>
          <p>Status: {char.status}</p>

          {/* Mostrar botões condicionalmente */}
          {user && !cameFromLocal && (
            <Button
              className="w-full mt-4"
              disabled={isSaved}
              onClick={handleSave}
            >
              {isSaved ? "Já salvo" : "Salvar Personagem"}
            </Button>
          )}

          {cameFromLocal && (
            <Button
              variant="destructive"
              className="w-full mt-4"
              onClick={handleDelete}
            >
              Excluir Personagem
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
