/// <reference types="vite/client" />
import { useState, useMemo } from "react";
import { X, Grid3x3, List } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { motion, AnimatePresence } from "motion/react";
import { useManagedEvents } from "../hooks/useManagedEvents";

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [displayMode, setDisplayMode] = useState<"grid" | "list">("grid");
  const [selectedEventId, setSelectedEventId] = useState("all");
  const { lang } = useLanguage();
  const { events } = useManagedEvents();

  const sortedEvents = useMemo(
    () =>
      [...events].sort(
        (firstEvent, secondEvent) =>
          new Date(firstEvent.date).getTime() -
          new Date(secondEvent.date).getTime(),
      ),
    [events],
  );

  const galleryImages = useMemo(
    () =>
      sortedEvents.flatMap((event) =>
        event.gallery.map((image) => ({
          ...image,
          eventId: event.id,
          eventTitle: lang === "en" ? event.title_en : event.title_te,
          eventDate: event.date,
        })),
      ),
    [lang, sortedEvents],
  );

  const filteredImages = useMemo(
    () =>
      selectedEventId === "all"
        ? galleryImages
        : galleryImages.filter((image) => image.eventId === selectedEventId),
    [galleryImages, selectedEventId],
  );

  // Close lightbox on escape key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setSelectedImage(null);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-white scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
            {lang === "en" ? "Impact in Action" : "కార్యాచరణలో ప్రభావం"}
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
            {lang === "en"
              ? "Glimpses from our recent medical camps, volunteer drives, and community events across the district."
              : "మన ఇటీవలి వైద్య శిబిరాలు, స్వచ్ఛంద కార్యక్రమాలు మరియు కమ్యూనిటీ ఈవెంట్‌ల దృశ్యాలు."}
          </p>

          <div className="mb-5 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedEventId("all")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                selectedEventId === "all"
                  ? "bg-accent text-primary shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}>
              {lang === "en" ? "All Events" : "అన్ని ఈవెంట్లు"}
            </button>
            {sortedEvents.map((event) => (
              <button
                key={event.id}
                onClick={() => setSelectedEventId(event.id)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                  selectedEventId === event.id
                    ? "bg-accent text-primary shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}>
                {lang === "en" ? event.title_en : event.title_te}
              </button>
            ))}
          </div>

          {/* Layout Toggle Buttons */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setDisplayMode("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                displayMode === "grid"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              aria-label="Grid view">
              <Grid3x3 className="w-5 h-5" />
              {lang === "en" ? "Grid" : "గ్రిడ్"}
            </button>
            <button
              onClick={() => setDisplayMode("list")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                displayMode === "list"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              aria-label="List view">
              <List className="w-5 h-5" />
              {lang === "en" ? "List" : "జాబితా"}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className={
            displayMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
              : "grid grid-cols-1 gap-4"
          }>
          {filteredImages.map((img: GalleryImage, i: number) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 },
              }}
              key={`${img.eventId}-${img.id}`}
              className={
                displayMode === "grid"
                  ? "relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all"
                  : "flex gap-4 p-4 rounded-lg overflow-hidden cursor-pointer group shadow-sm hover:shadow-lg transition-all bg-gray-50 hover:bg-gray-100"
              }
              onClick={() => setSelectedImage(img.url)}>
              <img
                src={img.url}
                alt={img.alt}
                className={
                  displayMode === "grid"
                    ? "object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    : "w-48 h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-700 flex-shrink-0"
                }
              />
              {displayMode === "list" && (
                <div className="flex-1 flex flex-col justify-center py-2">
                  <p className="text-gray-700 font-medium">{img.eventTitle}</p>
                  <p className="text-gray-500 text-sm">
                    {img.eventDate} | Image {i + 1}
                  </p>
                </div>
              )}
              {displayMode === "grid" && (
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="text-white bg-primary/90 px-6 py-2 text-sm font-bold tracking-widest uppercase rounded shadow-lg border border-white/20">
                    {lang === "en" ? "Expand" : "విస్తరించండి"}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {filteredImages.length === 0 && (
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-12 text-center">
            <p className="text-lg font-semibold text-gray-600">
              {lang === "en"
                ? "No gallery images for this event yet."
                : "ఈ ఈవెంట్ కోసం ఇంకా చిత్రాలు లేవు."}
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-8 backdrop-blur-sm transition-opacity cursor-pointer"
            onClick={() => setSelectedImage(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}>
            <button
              className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/50 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all focus:outline-none cursor-pointer"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Close lightbox">
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage || ""}
              alt="Expanded gallery view"
              className="max-w-full max-h-[90vh] object-contain rounded shadow-2xl border border-white/10"
              onClick={(e: React.MouseEvent<HTMLImageElement>) =>
                e.stopPropagation()
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
