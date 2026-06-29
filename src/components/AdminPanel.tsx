import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Download,
  ImagePlus,
  Link as LinkIcon,
  Lock,
  LogOut,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import {
  ADMIN_SESSION_KEY,
  DEFAULT_ADMIN_PASSWORD,
  DEFAULT_ADMIN_USER_ID,
  ManagedEvent,
  ManagedGalleryImage,
  defaultEvents,
} from "../data/managedEvents";
import { useManagedEvents } from "../hooks/useManagedEvents";
import { Member, readMembers, subscribeToMembers } from "../data/members";

const emptyEvent: ManagedEvent = {
  id: "",
  title_en: "",
  title_te: "",
  date: "",
  time: "",
  location_en: "",
  location_te: "",
  description_en: "",
  description_te: "",
  category: "",
  gallery: [],
};

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}`;
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function escapeCsvValue(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

export default function AdminPanel() {
  const { events, setEvents } = useManagedEvents();
  const [adminView, setAdminView] = useState<"events" | "members">("events");
  const [members, setMembers] = useState<Member[]>(() => readMembers());
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return window.localStorage.getItem(ADMIN_SESSION_KEY) === "true";
  });
  const [credentials, setCredentials] = useState({
    userId: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || "new");
  const [formEvent, setFormEvent] = useState<ManagedEvent>(events[0] || emptyEvent);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    return () => {
      window.localStorage.removeItem(ADMIN_SESSION_KEY);
    };
  }, []);

  useEffect(() => {
    return subscribeToMembers(() => {
      setMembers(readMembers());
    });
  }, []);

  const sortedEvents = useMemo(
    () =>
      [...events].sort(
        (firstEvent, secondEvent) =>
          new Date(firstEvent.date).getTime() -
          new Date(secondEvent.date).getTime(),
      ),
    [events],
  );

  useEffect(() => {
    if (selectedEventId === "new") {
      setFormEvent(emptyEvent);
      return;
    }

    const selectedEvent = events.find((event) => event.id === selectedEventId);
    if (selectedEvent) {
      setFormEvent(selectedEvent);
    } else if (events.length > 0) {
      setSelectedEventId(events[0].id);
    } else {
      setSelectedEventId("new");
    }
  }, [events, selectedEventId]);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      credentials.userId === DEFAULT_ADMIN_USER_ID &&
      credentials.password === DEFAULT_ADMIN_PASSWORD
    ) {
      window.localStorage.setItem(ADMIN_SESSION_KEY, "true");
      setIsAuthenticated(true);
      setLoginError("");
      return;
    }

    setLoginError("Invalid user id or password.");
  };

  const handleLogout = () => {
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
  };

  const updateField = (field: keyof ManagedEvent, value: string) => {
    setFormEvent((currentEvent) => ({
      ...currentEvent,
      [field]: value,
    }));
  };

  const saveEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formEvent.title_en.trim() || !formEvent.date) {
      setStatusMessage("Event title and date are required.");
      return;
    }

    const eventToSave: ManagedEvent = {
      ...formEvent,
      id: formEvent.id || createId("event"),
      title_te: formEvent.title_te || formEvent.title_en,
      location_te: formEvent.location_te || formEvent.location_en,
      description_te: formEvent.description_te || formEvent.description_en,
      category: formEvent.category || "General",
    };

    setEvents((currentEvents) => {
      const eventExists = currentEvents.some((item) => item.id === eventToSave.id);
      const nextEvents = eventExists
        ? currentEvents.map((item) => (item.id === eventToSave.id ? eventToSave : item))
        : [...currentEvents, eventToSave];

      return nextEvents.sort(
        (firstEvent, secondEvent) =>
          new Date(firstEvent.date).getTime() -
          new Date(secondEvent.date).getTime(),
      );
    });

    setSelectedEventId(eventToSave.id);
    setStatusMessage("Event saved.");
  };

  const deleteEvent = () => {
    if (!formEvent.id || !window.confirm("Delete this event and its gallery?")) {
      return;
    }

    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== formEvent.id),
    );
    setSelectedEventId("new");
    setStatusMessage("Event deleted.");
  };

  const resetEvents = () => {
    if (!window.confirm("Reset all events and galleries to the default data?")) {
      return;
    }

    setEvents(defaultEvents);
    setSelectedEventId(defaultEvents[0]?.id || "new");
    setStatusMessage("Default data restored.");
  };

  const exportMembers = () => {
    const csvHeader = ["Name", "Phone", "Date of Birth", "Address", "Registered On"];
    const csvRows = members.map((member) => [
      member.name,
      member.phone,
      member.dob,
      member.address,
      member.date,
    ]);
    const csvContent = [csvHeader, ...csvRows]
      .map((row) => row.map((value) => escapeCsvValue(value || "")).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `lions-members-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const addGalleryImage = (image: ManagedGalleryImage) => {
    setFormEvent((currentEvent) => ({
      ...currentEvent,
      gallery: [...currentEvent.gallery, image],
    }));
  };

  const addImageUrl = () => {
    if (!newImageUrl.trim()) {
      return;
    }

    addGalleryImage({
      id: createId("image"),
      url: newImageUrl.trim(),
      alt: newImageAlt.trim() || formEvent.title_en || "Event gallery image",
    });
    setNewImageUrl("");
    setNewImageAlt("");
    setStatusMessage("Image added. Save the event to publish it.");
  };

  const uploadImages = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) {
      return;
    }

    const uploadedImages = await Promise.all(
      files.map(async (file) => ({
        id: createId("image"),
        url: await readFileAsDataUrl(file),
        alt: file.name.replace(/\.[^.]+$/, ""),
      })),
    );

    setFormEvent((currentEvent) => ({
      ...currentEvent,
      gallery: [...currentEvent.gallery, ...uploadedImages],
    }));
    event.target.value = "";
    setStatusMessage("Images uploaded. Save the event to publish them.");
  };

  const removeGalleryImage = (imageId: string) => {
    setFormEvent((currentEvent) => ({
      ...currentEvent,
      gallery: currentEvent.gallery.filter((image) => image.id !== imageId),
    }));
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gray-100 px-4 py-12 text-gray-800">
        <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <a
            href="#home"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent">
            <ArrowLeft className="h-4 w-4" />
            Back to website
          </a>

          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
              <p className="text-sm text-gray-500">Manage events and galleries</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-700">
                User ID
              </span>
              <input
                value={credentials.userId}
                onChange={(event) =>
                  setCredentials((currentCredentials) => ({
                    ...currentCredentials,
                    userId: event.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                autoComplete="username"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </span>
              <input
                type="password"
                value={credentials.password}
                onChange={(event) =>
                  setCredentials((currentCredentials) => ({
                    ...currentCredentials,
                    password: event.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                autoComplete="current-password"
              />
            </label>

            {loginError && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {loginError}
              </p>
            )}

            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-bold text-white transition hover:bg-primary/90">
              <Lock className="h-4 w-4" />
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <a
              href="#home"
              className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent">
              <ArrowLeft className="h-4 w-4" />
              Back to website
            </a>
            <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setAdminView("events")}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${
                adminView === "events"
                  ? "bg-primary text-white"
                  : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}>
              <CalendarDays className="h-4 w-4" />
              Events
            </button>
            <button
              onClick={() => setAdminView("members")}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${
                adminView === "members"
                  ? "bg-primary text-white"
                  : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}>
              <Users className="h-4 w-4" />
              Members
            </button>
            {adminView === "events" && (
              <button
              onClick={() => {
                setSelectedEventId("new");
                setStatusMessage("");
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-primary transition hover:bg-accent-hover">
                <Plus className="h-4 w-4" />
                New Event
              </button>
            )}
            {adminView === "events" && (
              <button
                onClick={resetEvents}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-700 transition hover:bg-gray-50">
                <RotateCcw className="h-4 w-4" />
                Restore Defaults
              </button>
            )}
            {adminView === "members" && (
              <button
                onClick={exportMembers}
                disabled={members.length === 0}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-primary transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50">
                <Download className="h-4 w-4" />
                Export Members
              </button>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-primary/90">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {adminView === "events" ? (
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-8">
        <aside className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <CalendarDays className="h-5 w-5" />
            <h2 className="font-bold">Events</h2>
          </div>

          <div className="space-y-2">
            {sortedEvents.map((event) => (
              <button
                key={event.id}
                onClick={() => {
                  setSelectedEventId(event.id);
                  setStatusMessage("");
                }}
                className={`w-full rounded-lg border px-4 py-3 text-left transition ${
                  selectedEventId === event.id
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 bg-white hover:border-primary/40 hover:bg-gray-50"
                }`}>
                <span className="block text-sm font-bold">{event.title_en}</span>
                <span
                  className={`mt-1 block text-xs ${
                    selectedEventId === event.id
                      ? "text-white/70"
                      : "text-gray-500"
                  }`}>
                  {event.date} | {event.gallery.length} images
                </span>
              </button>
            ))}

            {sortedEvents.length === 0 && (
              <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
                No events yet.
              </p>
            )}
          </div>
        </aside>

        <form
          onSubmit={saveEvent}
          className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex flex-col gap-3 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Pencil className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">
                  {formEvent.id ? "Edit Event" : "Create Event"}
                </h2>
                <p className="text-sm text-gray-500">
                  Gallery images stay attached to this event.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              {formEvent.id && (
                <button
                  type="button"
                  onClick={deleteEvent}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-100">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              )}
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-primary/90">
                <Save className="h-4 w-4" />
                Save Event
              </button>
            </div>
          </div>

          {statusMessage && (
            <p className="mb-5 rounded-lg bg-accent/20 px-4 py-3 text-sm font-semibold text-primary">
              {statusMessage}
            </p>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-700">
                Event Title
              </span>
              <input
                required
                value={formEvent.title_en}
                onChange={(event) => updateField("title_en", event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-700">
                Telugu Title
              </span>
              <input
                value={formEvent.title_te}
                onChange={(event) => updateField("title_te", event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-700">
                Date
              </span>
              <input
                required
                type="date"
                value={formEvent.date}
                onChange={(event) => updateField("date", event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-700">
                Time
              </span>
              <input
                value={formEvent.time}
                onChange={(event) => updateField("time", event.target.value)}
                placeholder="09:00 AM - 02:00 PM"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-700">
                Category
              </span>
              <input
                value={formEvent.category}
                onChange={(event) => updateField("category", event.target.value)}
                placeholder="Health"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-700">
                Location
              </span>
              <input
                value={formEvent.location_en}
                onChange={(event) => updateField("location_en", event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-gray-700">
                Telugu Location
              </span>
              <input
                value={formEvent.location_te}
                onChange={(event) => updateField("location_te", event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-gray-700">
                Description
              </span>
              <textarea
                rows={4}
                value={formEvent.description_en}
                onChange={(event) =>
                  updateField("description_en", event.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-gray-700">
                Telugu Description
              </span>
              <textarea
                rows={4}
                value={formEvent.description_te}
                onChange={(event) =>
                  updateField("description_te", event.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </label>
          </div>

          <section className="mt-8 border-t border-gray-200 pt-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/30 text-primary">
                <ImagePlus className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary">Event Gallery</h3>
                <p className="text-sm text-gray-500">
                  {formEvent.gallery.length} images attached
                </p>
              </div>
            </div>

            <div className="grid gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 md:grid-cols-[1fr_1fr_auto]">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-gray-700">
                  Image URL
                </span>
                <input
                  value={newImageUrl}
                  onChange={(event) => setNewImageUrl(event.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-gray-700">
                  Alt Text
                </span>
                <input
                  value={newImageAlt}
                  onChange={(event) => setNewImageAlt(event.target.value)}
                  placeholder="Event photo"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primary/90">
                  <LinkIcon className="h-4 w-4" />
                  Add URL
                </button>
              </div>
            </div>

            <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white px-4 py-8 text-center transition hover:border-primary hover:bg-primary/5">
              <Upload className="mb-3 h-7 w-7 text-primary" />
              <span className="font-bold text-primary">Upload gallery photos</span>
              <span className="mt-1 text-sm text-gray-500">
                JPG, PNG, or WebP images
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={uploadImages}
                className="sr-only"
              />
            </label>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {formEvent.gallery.map((image) => (
                <div
                  key={image.id}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="flex items-center justify-between gap-3 p-3">
                    <span className="min-w-0 truncate text-sm font-semibold text-gray-700">
                      {image.alt}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(image.id)}
                      className="rounded-lg bg-red-50 p-2 text-red-700 transition hover:bg-red-100"
                      aria-label="Remove image">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              {formEvent.gallery.length === 0 && (
                <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
                  No gallery images attached to this event.
                </p>
              )}
            </div>
          </section>
        </form>
      </div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex flex-col gap-3 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">Registered Members</h2>
                  <p className="text-sm text-gray-500">
                    View submitted member profiles and export them as CSV.
                  </p>
                </div>
              </div>
              <button
                onClick={exportMembers}
                disabled={members.length === 0}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50">
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            </div>

            {members.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                      <th className="px-4 py-3 font-bold">Name</th>
                      <th className="px-4 py-3 font-bold">Phone</th>
                      <th className="px-4 py-3 font-bold">Date of Birth</th>
                      <th className="px-4 py-3 font-bold">Address</th>
                      <th className="px-4 py-3 font-bold">Registered On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {members.map((member) => (
                      <tr key={member.id} className="align-top hover:bg-gray-50">
                        <td className="px-4 py-4 font-semibold text-primary">
                          {member.name}
                        </td>
                        <td className="px-4 py-4 text-gray-700">{member.phone}</td>
                        <td className="px-4 py-4 text-gray-700">{member.dob || "-"}</td>
                        <td className="px-4 py-4 text-gray-700">{member.address}</td>
                        <td className="px-4 py-4 text-gray-700">{member.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded-lg bg-gray-50 p-10 text-center">
                <Users className="mx-auto mb-4 h-10 w-10 text-gray-300" />
                <p className="font-semibold text-gray-600">
                  No member profiles have been submitted yet.
                </p>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
