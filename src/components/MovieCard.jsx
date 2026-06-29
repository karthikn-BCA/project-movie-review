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
    <Card className="overflow-hidden border-slate-200 bg-white text-slate-900 flex flex-col h-full shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-[2/3] w-full bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={movie.posterUrl || "https://via.placeholder.com/500x750?text=No+Poster"}
          alt={movie.title}
          className="object-cover w-full h-full"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/500x750?text=Image+Not+Found";
          }}
        />
        <div className="absolute top-2 right-2">
          <Badge
            variant={movie.status === "Completed" ? "default" : "secondary"}
            className={`cursor-pointer px-2 py-0.5 text-[10px] font-medium border-0 transition-transform hover:scale-105 shadow-sm ${movie.status === "Completed" ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-slate-200 text-slate-700 hover:bg-slate-300"}`}
            onClick={handleStatusToggle}
            title="Click to toggle status"
          >
            {movie.status}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-sm line-clamp-1 mb-1">{movie.title}</h3>
        <p className="text-xs text-slate-500 mb-4">{movie.genre}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 cursor-pointer transition-colors ${
                  star <= movie.rating ? "fill-slate-900 text-slate-900" : "text-slate-300 hover:text-slate-500"
                }`}
                onClick={() => handleRatingChange(star)}
              />
            ))}
          </div>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
            title="Delete Movie"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
