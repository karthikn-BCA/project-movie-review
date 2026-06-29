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
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
          <Plus className="w-5 h-5" />
          Add Movie
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Movie</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium">Title *</label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Inception"
              value={formData.title}
              onChange={handleChange}
              className="bg-slate-800 border-slate-700"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="genre" className="text-sm font-medium">Genre *</label>
            <Input
              id="genre"
              name="genre"
              placeholder="e.g. Sci-Fi, Action"
              value={formData.genre}
              onChange={handleChange}
              className="bg-slate-800 border-slate-700"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="posterUrl" className="text-sm font-medium">Poster URL</label>
            <Input
              id="posterUrl"
              name="posterUrl"
              placeholder="https://..."
              value={formData.posterUrl}
              onChange={handleChange}
              className="bg-slate-800 border-slate-700"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={formData.status} onValueChange={(val) => handleSelectChange("status", val)}>
              <SelectTrigger className="bg-slate-800 border-slate-700">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectItem value="Watching">Watching</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Rating (0-5)</label>
            <Select value={formData.rating} onValueChange={(val) => handleSelectChange("rating", val)}>
              <SelectTrigger className="bg-slate-800 border-slate-700">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectItem value="0">0 Stars (Unrated)</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50 transition-colors"
          >
            {loading ? "Adding..." : "Save Movie"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
