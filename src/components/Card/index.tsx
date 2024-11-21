import { Character } from "@/types/types";
import Image from "next/image";

const Card = ({ character }: { character: Character }) => {
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md overflow-hidden flex items-center">
      {/* Görsel */}
      <div className="w-1/3 h-full">
        <Image
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Yazılar */}
      <div className="w-2/3 p-4">
        <h2 className="text-lg font-bold text-orange-400">{character.name}</h2>
        <p className="text-sm text-gray-400 flex items-center">
          <span
            className={`inline-block w-3 h-3 rounded-full mr-2 ${
              character.status === "Alive"
                ? "bg-green-500"
                : character.status === "Dead"
                ? "bg-red-500"
                : "bg-gray-500"
            }`}
          />
          {character.status} - {character.species}
        </p>
        <p className="mt-2">
          <span className="font-semibold">Last known location:</span>{" "}
          {character.location.name}
        </p>
        <p className="mt-2">
          <span className="font-semibold">First seen in:</span>{" "}
          {character.firstEpisode}
        </p>
      </div>
    </div>
  );
};

export default Card;
