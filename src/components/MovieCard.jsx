import { useState } from "react";
import { Star, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MovieCard({ movie, onUpdate, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusToggle = async () => {
    const newStatus = movie.status === "Watching" ? "Completed" : "Watching";
    await onUpdate(movie.id, { status: newStatus });
  };

  const handleRatingChange = async (newRating) => {
    await onUpdate(movie.id, { rating: newRating });
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this movie?")) {
      setIsDeleting(true);
      await onDelete(movie.id);
    }
  };

  return (
    <Card className="overflow-hidden bg-[#E0EEC6] border-none text-slate-900 flex flex-row h-40 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="relative w-28 shrink-0 bg-white/40 h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={movie.posterUrl || "https://via.placeholder.com/200x300?text=No+Poster"}
          alt={movie.title}
          className="object-cover w-full h-full"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/200x300?text=Not+Found";
          }}
        />
        <div className="absolute top-1 left-1">
          <Badge
            variant={movie.status === "Completed" ? "default" : "secondary"}
            className={`cursor-pointer px-1.5 py-0.5 text-[9px] font-medium border-0 shadow-sm transition-transform hover:scale-105 ${movie.status === "Completed" ? "bg-[#9F915A] text-white" : "bg-white/80 text-slate-800"}`}
            onClick={handleStatusToggle}
            title="Click to toggle status"
          >
            {movie.status}
          </Badge>
        </div>
      </div>
      <CardContent className="p-3 flex flex-col flex-grow min-w-0">
        <h3 className="font-bold text-sm line-clamp-1 mb-0.5" title={movie.title}>{movie.title}</h3>
        <p className="text-xs text-slate-800/80 mb-2 truncate">{movie.genre}</p>
        
        <div className="flex items-center gap-1 mb-auto">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3.5 h-3.5 cursor-pointer transition-colors ${
                star <= movie.rating ? "fill-[#9F915A] text-[#9F915A]" : "text-slate-800/20 hover:text-[#9F915A]/50"
              }`}
              onClick={() => handleRatingChange(star)}
            />
          ))}
        </div>
        
        <div className="flex gap-2 mt-2 pt-2 border-t border-slate-800/10">
          <button
            onClick={() => onUpdate(movie.id)}
            className="flex-1 bg-[#9F915A] hover:opacity-90 text-white font-medium py-1 px-2 rounded text-xs transition-colors shadow-sm"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1 text-slate-800/50 hover:text-[#9F915A] hover:bg-white/50 rounded transition-colors disabled:opacity-50"
            title="Delete Movie"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
