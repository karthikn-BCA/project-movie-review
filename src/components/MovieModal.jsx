import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit2 } from "lucide-react";

export default function MovieModal({ onAddMovie, onUpdateMovie, movie, isEditMode = false }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    posterUrl: "",
    status: "Watching",
    rating: "0",
  });

  useEffect(() => {
    if (open) {
      if (isEditMode && movie) {
        setFormData({
          title: movie.title,
          genre: movie.genre,
          posterUrl: movie.posterUrl || "",
          status: movie.status,
          rating: movie.rating.toString(),
        });
      } else {
        setFormData({
          title: "",
          genre: "",
          posterUrl: "",
          status: "Watching",
          rating: "0",
        });
      }
    }
  }, [open, isEditMode, movie]);

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
    if (isEditMode) {
      await onUpdateMovie(movie.id, {
        ...formData,
        rating: parseInt(formData.rating) || 0,
      });
    } else {
      await onAddMovie({
        ...formData,
        rating: parseInt(formData.rating) || 0,
      });
    }
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditMode ? (
          <button className="flex-1 bg-[#9F915A] hover:opacity-90 text-white font-medium py-1 px-2 rounded text-xs transition-colors shadow-sm flex items-center justify-center gap-1">
            <Edit2 className="w-3 h-3" /> Edit
          </button>
        ) : (
          <button className="flex items-center gap-2 bg-[#9F915A] hover:opacity-90 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm transition-all active:scale-95">
            <Plus className="w-4 h-4" /> Add Movie
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#243E36] text-white border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {isEditMode ? "Edit Movie" : "Add New Movie"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-sm font-semibold text-white">Title *</label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Inception"
              value={formData.title}
              onChange={handleChange}
              className="bg-[#E0EEC6] border-none text-slate-900 placeholder:text-slate-500 focus-visible:ring-[#9F915A] text-sm"
              required
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label htmlFor="genre" className="text-sm font-semibold text-white">Genre *</label>
            <Input
              id="genre"
              name="genre"
              placeholder="e.g. Sci-Fi, Action"
              value={formData.genre}
              onChange={handleChange}
              className="bg-[#E0EEC6] border-none text-slate-900 placeholder:text-slate-500 focus-visible:ring-[#9F915A] text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="posterUrl" className="text-sm font-semibold text-white">Poster URL</label>
            <Input
              id="posterUrl"
              name="posterUrl"
              placeholder="https://..."
              value={formData.posterUrl}
              onChange={handleChange}
              className="bg-[#E0EEC6] border-none text-slate-900 placeholder:text-slate-500 focus-visible:ring-[#9F915A] text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-white">Status</label>
            <Select value={formData.status} onValueChange={(val) => handleSelectChange("status", val)}>
              <SelectTrigger className="bg-[#E0EEC6] border-none text-slate-900 focus:ring-[#9F915A] text-sm">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-[#243E36] border-white/20 text-white">
                <SelectItem value="Watching" className="focus:bg-white/20 cursor-pointer">Watching</SelectItem>
                <SelectItem value="Completed" className="focus:bg-white/20 cursor-pointer">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-white">Rating (0-5)</label>
            <Select value={formData.rating} onValueChange={(val) => handleSelectChange("rating", val)}>
              <SelectTrigger className="bg-[#E0EEC6] border-none text-slate-900 focus:ring-[#9F915A] text-sm">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent className="bg-[#243E36] border-white/20 text-white">
                <SelectItem value="0" className="focus:bg-white/20 cursor-pointer">0 Stars (Unrated)</SelectItem>
                <SelectItem value="1" className="focus:bg-white/20 cursor-pointer">1 Star</SelectItem>
                <SelectItem value="2" className="focus:bg-white/20 cursor-pointer">2 Stars</SelectItem>
                <SelectItem value="3" className="focus:bg-white/20 cursor-pointer">3 Stars</SelectItem>
                <SelectItem value="4" className="focus:bg-white/20 cursor-pointer">4 Stars</SelectItem>
                <SelectItem value="5" className="focus:bg-white/20 cursor-pointer">5 Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-[#9F915A] hover:opacity-90 text-white font-bold py-2.5 px-4 rounded-xl text-sm disabled:opacity-50 transition-all shadow-md active:scale-[0.98]"
          >
            {loading ? "Saving..." : (isEditMode ? "Save Changes" : "Save Movie")}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
