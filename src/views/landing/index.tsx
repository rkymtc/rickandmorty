"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Search from "@/components/Search";
import { Character } from "@/types/types";

const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const searchParams = useSearchParams();

  const status = searchParams.get("status");
  const gender = searchParams.get("gender");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_BASEURL;
        const [characterRes, locationRes, episodeRes] = await Promise.all([
          fetch(`${apiBaseUrl}/character`),
          fetch(`${apiBaseUrl}/location`),
          fetch(`${apiBaseUrl}/episode`),
        ]);

        const charactersData = await characterRes.json();
        const locationsData = await locationRes.json();
        const episodesData = await episodeRes.json();

        const enrichedCharacters = charactersData.results.map((character: Character) => {
          return {
            ...character,
            location: locationsData.results.find(
              (loc: any) => loc.name === character.location.name
            ) || character.location,
            firstEpisode: episodesData.results.find((ep: any) =>
              character.episode.includes(ep.url)
            )?.name || "Unknown Episode",
          };
        });

        setCharacters(enrichedCharacters);
        setFilteredCharacters(enrichedCharacters);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    let filtered = characters;

    if (status) {
      filtered = filtered.filter((character) => character.status === status);
    }

    if (gender) {
      filtered = filtered.filter((character) => character.gender === gender);
    }

    setFilteredCharacters(filtered);
  }, [status, gender, characters]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-bold text-center py-6">
        Rick and Morty Characters
      </h1>

      {/* Search Component */}
      <Search status={status} gender={gender} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8">
        {filteredCharacters.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

export default Home;
