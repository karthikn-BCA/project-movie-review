"use client";

import { useState, useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import MovieModal from "@/components/MovieModal";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // READ: Fetch the list of movies
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/movies", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchMovies();
  }, []);

  // CREATE: Add a new movie
  const handleAddMovie = async (newMovie) => {
    try {
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });
      if (res.ok) {
        fetchMovies(); // Re-fetch to get the new list with DB-generated IDs
      }
    } catch (err) {
      console.error("Failed to add movie:", err);
    }
  };

  // UPDATE: Change status or rating
  const handleUpdateMovie = async (id, updateData) => {
    // Optimistic UI update
    setMovies((prev) =>
      prev.map((movie) => (movie.id === id ? { ...movie, ...updateData } : movie))
    );
    
    try {
      await fetch(`/api/movies/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
    } catch (err) {
      console.error("Failed to update movie:", err);
      fetchMovies(); // Revert on failure
    }
  };

  // DELETE: Remove movie
  const handleDeleteMovie = async (id) => {
    // Optimistic UI update
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
    
    try {
      await fetch(`/api/movies/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Failed to delete movie:", err);
      fetchMovies(); // Revert on failure
    }
  };

  // Filter movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search movies by title..."
            className="pl-9 py-2 bg-[#E0EEC6] border-none text-slate-900 placeholder:text-slate-500 focus-visible:ring-slate-900 text-sm shadow-sm transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <MovieModal onAddMovie={handleAddMovie} />
      </div>

      {loading ? (
        <div className="text-center py-16">
          <p className="text-slate-700 text-sm font-medium animate-pulse">Loading your watchlist...</p>
        </div>
      ) : filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onUpdate={handleUpdateMovie}
              onDelete={handleDeleteMovie}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#243E36] rounded-2xl shadow-lg border border-[#243E36]/50">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
             <Search className="w-6 h-6 text-white" />
          </div>
          <p className="text-white text-lg font-bold mb-1">No movies found</p>
          <p className="text-white/80 text-sm">Try adjusting your search or add a new movie to your collection.</p>
        </div>
      )}
    </div>
  );
}
