import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import {
  createInspiration,
  updateInspiration,
} from "../../../services/inspiration.service";
import { getImageUrl } from "../../../../utils/imageUrl";

const AddInspDialog = ({
  isOpen,
  onClose,
  onInspirationSaved,
  inspiration,
}) => {
  const [title, setTitle] = useState(inspiration ? inspiration.title : "");
  const [description, setDescription] = useState(
    inspiration ? inspiration.description : "",
  );
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    inspiration ? getImageUrl(inspiration.imageUrl) : null,
  );
  const [imgError, setImgError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      if (inspiration) {
        await updateInspiration(inspiration._id, formData);
      } else {
        const today = new Date().toISOString().split("T")[0];
        formData.append("date", today);
        await createInspiration(formData);
      }

      onInspirationSaved?.();
      onClose();
    } catch (error) {
      console.error("Error saving inspiration:", error);
      alert("Failed to save inspiration.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setImgError(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md transition-all duration-300 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl my-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xl transition-all max-h-[90vh] flex flex-col overflow-hidden text-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10 shrink-0">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-slate-950 dark:text-white">
              {inspiration ? "Edit Inspiration" : "Add New Inspiration"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {inspiration
                ? "Update inspiration details"
                : "Create a new inspiration entry"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Title *
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Modern Architecture Concept"
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition shadow-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what inspires this piece..."
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition shadow-xs resize-y"
            />
          </div>

          {/* Image Upload & Preview */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Inspiration Image {inspiration && <span className="normal-case text-slate-400 font-normal">(Leave empty to keep current)</span>}
            </label>

            {preview && !imgError && (
              <div className="relative mb-3 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800 group">
                <img
                  src={preview}
                  alt="Preview"
                  onError={() => setImgError(true)}
                  className="w-full max-h-48 object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setImage(null);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition cursor-pointer"
                  title="Remove image"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer active:scale-95">
                <Upload size={14} />
                <span>{preview ? "Change Image" : "Upload Image"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {image && (
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs">
                  {image.name}
                </span>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 mt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold shadow-md shadow-teal-500/20 transition cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {loading ? "Saving..." : inspiration ? "Update Inspiration" : "Create Inspiration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInspDialog;
