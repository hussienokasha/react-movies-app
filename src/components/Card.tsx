import { getImageUrl } from "../lib/tmdb";

export default function Card({
  image,
  title,
  releaseDate,
}: {
  image: string;
  title: string;
  releaseDate: string;
}) {
  return (
    <div className="cursor-pointer rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300">
      <img
        src={getImageUrl(image)??""}
        alt={title}
        className="aspect-3/5 object-cover"
      />
      <div className="p-2">
        <h3 title={title} className="text-lg font-semibold line-clamp-1">{title}</h3>
        <p className="text-gray-600">{releaseDate}</p>
      </div>
    </div>
  );
}
