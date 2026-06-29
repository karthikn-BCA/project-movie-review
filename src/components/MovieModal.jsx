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
      <DialogTrigger className="flex items-center gap-2 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 px-4 py-2 rounded-full text-sm font-semibold shadow-sm transition-all active:scale-95">
        <Plus className="w-4 h-4" />
        Add Movie
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 shadow-xl transition-colors">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Add New Movie</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Title *</label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Inception"
              value={formData.title}
              onChange={handleChange}
              className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-slate-900 dark:focus-visible:ring-slate-400 text-sm"
              required
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label htmlFor="genre" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Genre *</label>
            <Input
              id="genre"
              name="genre"
              placeholder="e.g. Sci-Fi, Action"
              value={formData.genre}
              onChange={handleChange}
              className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-slate-900 dark:focus-visible:ring-slate-400 text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="posterUrl" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Poster URL</label>
            <Input
              id="posterUrl"
              name="posterUrl"
              placeholder="https://..."
              value={formData.posterUrl}
              onChange={handleChange}
              className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-slate-900 dark:focus-visible:ring-slate-400 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Status</label>
            <Select value={formData.status} onValueChange={(val) => handleSelectChange("status", val)}>
              <SelectTrigger className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-slate-900 dark:focus:ring-slate-400 text-sm">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                <SelectItem value="Watching" className="focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer">Watching</SelectItem>
                <SelectItem value="Completed" className="focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Rating (0-5)</label>
            <Select value={formData.rating} onValueChange={(val) => handleSelectChange("rating", val)}>
              <SelectTrigger className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-slate-900 dark:focus:ring-slate-400 text-sm">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                <SelectItem value="0" className="focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer">0 Stars (Unrated)</SelectItem>
                <SelectItem value="1" className="focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer">1 Star</SelectItem>
                <SelectItem value="2" className="focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer">2 Stars</SelectItem>
                <SelectItem value="3" className="focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer">3 Stars</SelectItem>
                <SelectItem value="4" className="focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer">4 Stars</SelectItem>
                <SelectItem value="5" className="focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer">5 Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold py-2.5 px-4 rounded-xl text-sm disabled:opacity-50 transition-all shadow-sm active:scale-[0.98]"
          >
            {loading ? "Adding..." : "Save Movie"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
