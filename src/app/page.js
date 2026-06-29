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
      const res = await fetch("/api/movies");
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
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search movies by title..."
            className="pl-10 bg-slate-900 border-slate-700 text-slate-100 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <MovieModal onAddMovie={handleAddMovie} />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">Loading your watchlist...</p>
        </div>
      ) : filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
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
        <div className="text-center py-16 bg-slate-900 rounded-lg border border-slate-800 mt-4">
          <p className="text-slate-400 text-xl">No movies found.</p>
          <p className="text-slate-500 mt-2">Try adjusting your search or add a new movie.</p>
        </div>
      )}
    </div>
  );
}
