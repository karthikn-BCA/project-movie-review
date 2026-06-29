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
    <Card className="overflow-hidden border-slate-700 bg-slate-800 text-slate-100 flex flex-col h-full shadow-lg transition-transform hover:scale-[1.02]">
      <div className="relative aspect-[2/3] w-full bg-slate-900">
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
            className={`cursor-pointer ${movie.status === "Completed" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            onClick={handleStatusToggle}
            title="Click to toggle status"
          >
            {movie.status}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg line-clamp-1 mb-1">{movie.title}</h3>
        <p className="text-sm text-slate-400 mb-3">{movie.genre}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 cursor-pointer transition-colors ${
                  star <= movie.rating ? "fill-yellow-500 text-yellow-500" : "text-slate-600 hover:text-yellow-500"
                }`}
                onClick={() => handleRatingChange(star)}
              />
            ))}
          </div>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-700 rounded-full transition-colors disabled:opacity-50"
            title="Delete Movie"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
