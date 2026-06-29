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
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:max-w-md shadow-lg shadow-black/20 rounded-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search movies by title..."
            className="pl-12 py-6 rounded-full bg-white/5 backdrop-blur-md border-white/10 text-white placeholder:text-slate-400 focus-visible:ring-pink-500 text-lg shadow-inner"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <MovieModal onAddMovie={handleAddMovie} />
      </div>

      {loading ? (
        <div className="text-center py-20">
          <p className="text-pink-400 text-xl font-medium animate-pulse">Loading your watchlist...</p>
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
        <div className="text-center py-24 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl">
          <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
             <Search className="w-10 h-10 text-pink-400 opacity-80" />
          </div>
          <p className="text-white text-2xl font-bold mb-2">No movies found</p>
          <p className="text-slate-400 text-lg">Try adjusting your search or add a new movie to your collection.</p>
        </div>
      )}
    </div>
  );
}
