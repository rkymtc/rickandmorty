export type Character = {
    id: number;
    name: string;
    status: "Alive" | "Dead" | "unknown"; 
    gender: "Male" | "Female" | "Genderless" | "unknown"; 
    species: string;
    image: string;
    location: { name: string };
    origin: { name: string };
    episode: string[];
    firstEpisode?:any;
  };
  
  export type Filters = {
    status: "Alive" | "Dead" | "unknown" | null;
    gender: "Male" | "Female" | "Genderless" | "unknown" | null;
  };
  