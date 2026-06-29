export interface ManagedGalleryImage {
  id: string;
  url: string;
  alt: string;
}

export interface ManagedEvent {
  id: string;
  title_en: string;
  title_te: string;
  date: string;
  time: string;
  location_en: string;
  location_te: string;
  description_en: string;
  description_te: string;
  category: string;
  gallery: ManagedGalleryImage[];
}

export const DEFAULT_ADMIN_USER_ID = "admin";
export const DEFAULT_ADMIN_PASSWORD = "admin@316G";
export const ADMIN_SESSION_KEY = "lions316g-admin-session";

const EVENTS_STORAGE_KEY = "lions316g-managed-events";
const EVENTS_CHANGED_EVENT = "lions316g-events-changed";

const seededImages = import.meta.glob<{ default: string }>(
  "../../assets/images/*.{jpeg,jpg,png}",
  {
    eager: true,
  },
);

const seedGalleryImages = Object.entries(seededImages)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([path, image], index) => ({
    id: `seed-image-${index + 1}`,
    url: image.default,
    alt: path
      .split("/")
      .pop()
      ?.replace(/\.[^.]+$/, "")
      .replaceAll("-", " ")
      .replaceAll("_", " ") || "Community event photo",
  }));

export const defaultEvents: ManagedEvent[] = [
  {
    id: "event-blood-donation",
    title_en: "Mega Blood Donation Camp",
    title_te: "Mega Blood Donation Camp",
    date: "2026-06-15",
    time: "09:00 AM - 02:00 PM",
    location_en: "Lions Community Hall, Visakhapatnam",
    location_te: "Lions Community Hall, Visakhapatnam",
    description_en:
      "Join us for a district-wide blood donation drive to help local hospitals.",
    description_te:
      "Join us for a district-wide blood donation drive to help local hospitals.",
    category: "Health",
    gallery: seedGalleryImages.slice(0, 8),
  },
  {
    id: "event-eye-screening",
    title_en: "Eye Screening Workshop",
    title_te: "Eye Screening Workshop",
    date: "2026-06-22",
    time: "10:00 AM - 04:00 PM",
    location_en: "Govt School, Rajahmundry",
    location_te: "Govt School, Rajahmundry",
    description_en:
      "Free eye screening and glasses distribution for school children.",
    description_te:
      "Free eye screening and glasses distribution for school children.",
    category: "Health",
    gallery: seedGalleryImages.slice(8, 16),
  },
  {
    id: "event-tree-plantation",
    title_en: "Tree Plantation Drive",
    title_te: "Tree Plantation Drive",
    date: "2026-07-05",
    time: "08:00 AM - 12:00 PM",
    location_en: "City Park, Kakinada",
    location_te: "City Park, Kakinada",
    description_en:
      "Environmental initiative to plant 1000 saplings across the city.",
    description_te:
      "Environmental initiative to plant 1000 saplings across the city.",
    category: "Environment",
    gallery: seedGalleryImages.slice(16, 24),
  },
  {
    id: "event-youth-leadership",
    title_en: "Youth Leadership Seminar",
    title_te: "Youth Leadership Seminar",
    date: "2026-07-18",
    time: "09:30 AM - 05:00 PM",
    location_en: "Grand Hotel, Vijayawada",
    location_te: "Grand Hotel, Vijayawada",
    description_en:
      "Empowering the next generation of leaders through interactive workshops.",
    description_te:
      "Empowering the next generation of leaders through interactive workshops.",
    category: "Education",
    gallery: seedGalleryImages.slice(24, 32),
  },
];

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeEvents(events: ManagedEvent[]) {
  return events.map((event) => ({
    ...event,
    id: event.id || crypto.randomUUID(),
    title_te: event.title_te || event.title_en,
    location_te: event.location_te || event.location_en,
    description_te: event.description_te || event.description_en,
    gallery: Array.isArray(event.gallery) ? event.gallery : [],
  }));
}

export function readManagedEvents(): ManagedEvent[] {
  if (!isBrowser()) {
    return defaultEvents;
  }

  const storedEvents = window.localStorage.getItem(EVENTS_STORAGE_KEY);
  if (!storedEvents) {
    return defaultEvents;
  }

  try {
    const parsedEvents = JSON.parse(storedEvents) as ManagedEvent[];
    if (!Array.isArray(parsedEvents)) {
      return defaultEvents;
    }

    return normalizeEvents(parsedEvents);
  } catch {
    return defaultEvents;
  }
}

export function writeManagedEvents(events: ManagedEvent[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
  window.dispatchEvent(new CustomEvent(EVENTS_CHANGED_EVENT, { detail: events }));
}

export function subscribeToManagedEvents(callback: () => void) {
  if (!isBrowser()) {
    return () => {};
  }

  const handleEventsChanged = () => callback();
  const handleStorage = (event: StorageEvent) => {
    if (event.key === EVENTS_STORAGE_KEY) {
      callback();
    }
  };

  window.addEventListener(EVENTS_CHANGED_EVENT, handleEventsChanged);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(EVENTS_CHANGED_EVENT, handleEventsChanged);
    window.removeEventListener("storage", handleStorage);
  };
}

