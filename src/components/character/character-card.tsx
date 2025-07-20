import Link from "next/link";
import { Star } from "lucide-react";
import { getRatingColor, getRatingText } from "@/lib/rating-utils";
import { CharacterImage } from "@/components/ui/character-image";

interface Character {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  overallRating: number;
  totalRatings: number;
  universe: {
    name: string;
    type: string;
  };
  _count: {
    ratings: number;
    reviews: number;
  };
}

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link
      href={`/characters/${character.slug}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group border border-slate-200"
    >
      {/* Character Image */}
      <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
        <CharacterImage
          character={{
            name: character.name,
            imageUrl: character.imageUrl,
            universe: character.universe.name,
          }}
          size="md"
          showAttribution={false}
          className="w-full h-full object-cover"
        />

        {/* Rating overlay */}
        <div className="absolute top-3 right-3">
          <div
            className={`px-2 py-1 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm ${getRatingColor(
              character.overallRating
            )}`}
          >
            ⭐ {character.overallRating.toFixed(1)}
          </div>
        </div>

        {/* Universe Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full">
            {character.universe.name}
          </span>
        </div>
      </div>

      {/* Character Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
          {character.name}
        </h3>

        <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
          <span>{getRatingText(character.overallRating)}</span>
          <div className="flex items-center">
            <Star className="h-3 w-3 mr-1" />
            {character._count.ratings} ratings
          </div>
        </div>

        {/* Rating Categories Preview */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-600">
            <span>Community Score</span>
            <span className="font-medium">
              {character.overallRating.toFixed(1)}/10
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5">
            <div
              className="bg-purple-600 h-1.5 rounded-full transition-all"
              style={{ width: `${(character.overallRating / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Reviews count */}
        {character._count.reviews > 0 && (
          <div className="mt-3 text-xs text-slate-500">
            {character._count.reviews} review
            {character._count.reviews !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </Link>
  );
}
