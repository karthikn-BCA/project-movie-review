import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // Standard shadcn button or native button if not installed
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

export default function MovieModal({ onAddMovie }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    posterUrl: "",
    status: "Watching",
    rating: "0",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.genre) return;
    
    setLoading(true);
    await onAddMovie({
      ...formData,
      rating: parseInt(formData.rating) || 0,
    });
    setLoading(false);
    setOpen(false);
    
    // Reset form
    setFormData({
      title: "",
      genre: "",
      posterUrl: "",
      status: "Watching",
      rating: "0",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 text-white px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-pink-500/25 transition-all hover:scale-105 active:scale-95">
          <Plus className="w-5 h-5" />
          Add Movie
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-900/90 backdrop-blur-xl text-white border-white/10 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-400">Add New Movie</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-semibold text-slate-300">Title *</label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Inception"
              value={formData.title}
              onChange={handleChange}
              className="bg-black/20 border-white/10 focus-visible:ring-pink-500"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="genre" className="text-sm font-semibold text-slate-300">Genre *</label>
            <Input
              id="genre"
              name="genre"
              placeholder="e.g. Sci-Fi, Action"
              value={formData.genre}
              onChange={handleChange}
              className="bg-black/20 border-white/10 focus-visible:ring-pink-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="posterUrl" className="text-sm font-semibold text-slate-300">Poster URL</label>
            <Input
              id="posterUrl"
              name="posterUrl"
              placeholder="https://..."
              value={formData.posterUrl}
              onChange={handleChange}
              className="bg-black/20 border-white/10 focus-visible:ring-pink-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-300">Status</label>
            <Select value={formData.status} onValueChange={(val) => handleSelectChange("status", val)}>
              <SelectTrigger className="bg-black/20 border-white/10 focus:ring-pink-500">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/10 text-white">
                <SelectItem value="Watching" className="focus:bg-pink-500/20">Watching</SelectItem>
                <SelectItem value="Completed" className="focus:bg-pink-500/20">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-300">Rating (0-5)</label>
            <Select value={formData.rating} onValueChange={(val) => handleSelectChange("rating", val)}>
              <SelectTrigger className="bg-black/20 border-white/10 focus:ring-pink-500">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/10 text-white">
                <SelectItem value="0" className="focus:bg-pink-500/20">0 Stars (Unrated)</SelectItem>
                <SelectItem value="1" className="focus:bg-pink-500/20">1 Star</SelectItem>
                <SelectItem value="2" className="focus:bg-pink-500/20">2 Stars</SelectItem>
                <SelectItem value="3" className="focus:bg-pink-500/20">3 Stars</SelectItem>
                <SelectItem value="4" className="focus:bg-pink-500/20">4 Stars</SelectItem>
                <SelectItem value="5" className="focus:bg-pink-500/20">5 Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 text-white font-bold py-3 px-4 rounded-xl disabled:opacity-50 transition-all shadow-lg shadow-pink-500/20 active:scale-[0.98]"
          >
            {loading ? "Adding..." : "Save Movie"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
