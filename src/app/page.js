"use client";

import { useState, useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import MovieModal from "@/components/MovieModal";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/AuthProvider";

export default function Home() {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // READ: Fetch the list of movies
  const fetchMovies = () => {
    setLoading(true);
    try {
      const storedMovies = localStorage.getItem("movies");
      if (storedMovies) {
        setMovies(JSON.parse(storedMovies));
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Helper to save movies to local storage
  const saveMovies = (updatedMovies) => {
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  };

  // CREATE: Add a new movie
  const handleAddMovie = async (newMovie) => {
    const movieWithId = {
      ...newMovie,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    saveMovies([...movies, movieWithId]);
  };

  // UPDATE: Change status or rating
  const handleUpdateMovie = async (id, updateData) => {
    const updatedMovies = movies.map((movie) =>
      movie.id === id ? { ...movie, ...updateData } : movie
    );
    saveMovies(updatedMovies);
  };

  // DELETE: Remove movie
  const handleDeleteMovie = async (id) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    saveMovies(updatedMovies);
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
            className="pl-9 py-2 bg-slate-100 dark:bg-zinc-800 border-none text-slate-900 placeholder:text-slate-500 focus-visible:ring-slate-900 text-sm shadow-sm transition-colors"
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
        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-slate-200 dark:border-zinc-800/50">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
             <Search className="w-6 h-6 text-white" />
          </div>
          <p className="text-white text-lg font-bold mb-1">No movies found</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Try adjusting your search or add a new movie to your collection.</p>
        </div>
      )}
    </div>
  );
}
