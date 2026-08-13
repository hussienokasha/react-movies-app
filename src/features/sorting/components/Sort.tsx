import { Select, type SelectValueChangeEvent } from "@primereact/ui/select";
import type { MovieCategory } from "../../movies/types/movies.types";

import { ChevronDown } from "@primeicons/react";
import { useState } from "react";

const categories: { label: string; value: MovieCategory }[] = [
  { label: "Now Playing", value: "now_playing" },
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

export default function Sort({
  onChange,
}: {
  onChange: (value: MovieCategory) => void;
}) {
  const [category, setCategory] = useState<MovieCategory>("popular");

  return (
    <Select.Root
      options={categories}
      onValueChange={(e: SelectValueChangeEvent) => {
        onChange(e.value as MovieCategory);
        setCategory(e.value as MovieCategory);
      }}
      optionLabel="label"
      optionValue="value"
      value={category}
      className="w-full md:w-56"
    >
      <Select.Trigger>
        <Select.Value placeholder="Select a category" />
        <Select.Indicator>
          <ChevronDown />
        </Select.Indicator>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.List />
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
