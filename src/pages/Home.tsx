import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [counters, setCounters] = useState<any>(null);

  useEffect(() => {
    api.get("/rm/stats").then(res => setStats(res.data));
    api.get("/me/home-counters").then(res => setCounters(res.data)).catch(() => {});
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Bem-vindo, {user?.name}</h1>
      {stats && (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg shadow">Personagens: {stats.totalCharacters}</div>
          <div className="p-4 bg-white rounded-lg shadow">Episódios: {stats.totalEpisodes}</div>
          <div className="p-4 bg-white rounded-lg shadow">Localizações: {stats.totalLocations}</div>
        </div>
      )}
      {counters && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Últimos salvos:</h2>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {counters.last3Saved.map((ch: any) => (
              <div key={ch.id} className="p-3 border rounded-lg text-center">
                <img src={ch.image} alt={ch.name} className="w-full h-48 object-cover rounded" />
                <h3 className="font-medium mt-2">{ch.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
