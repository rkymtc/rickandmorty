"use client";

import { useRouter } from "next/navigation";

type SearchProps = {
  status: string | null;
  gender: string | null;
};

const Search: React.FC<SearchProps> = ({ status, gender }) => {
  const router = useRouter();

  const handleFilterChange = (key: "status" | "gender", value: string | null) => {
    const queryParams = new URLSearchParams(window.location.search);

    if (value) {
      queryParams.set(key, value);
    } else {
      queryParams.delete(key);
    }

    router.push(`?${queryParams.toString()}`); 
  };

  return (
    <div className="flex justify-center space-x-4 mb-6">
      {/* Status Filter */}
      <select
        value={status || ""}
        onChange={(e) => handleFilterChange("status", e.target.value || null)}
        className="bg-gray-700 text-white px-4 py-2 rounded"
      >
        <option value="">All Status</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      {/* Gender Filter */}
      <select
        value={gender || ""}
        onChange={(e) => handleFilterChange("gender", e.target.value || null)}
        className="bg-gray-700 text-white px-4 py-2 rounded"
      >
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>
  );
};

export default Search;
