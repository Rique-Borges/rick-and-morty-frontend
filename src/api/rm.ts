import { api } from "./axios";

export interface CharacterCard {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: string;
  location: string;
  image: string;
}

export interface Paginated<T> {
  info: { count: number; pages: number; next: string | null; prev: string | null };
  results: T[];
}

export async function fetchCharacters(page = 1, name = ""): Promise<Paginated<CharacterCard>> {
  const { data } = await api.get("/rm/characters", { params: { page, name } });
  return data;
}

export async function fetchCharacterById(id: number) {
  const { data } = await api.get(`/rm/characters/${id}`);
  return data as CharacterCard & { created?: string };
}
