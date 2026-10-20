import { getStore } from "@netlify/blobs";

// Alle Daten liegen in Netlify Blobs (im Netlify-Konto enthalten, keine extra Datenbank nötig).
export const leads = () => getStore({ name: "leads", consistency: "strong" });
export const bookings = () => getStore({ name: "bookings", consistency: "strong" });
export const chats = () => getStore({ name: "chats", consistency: "strong" });

export type Lead = {
  id: string;
  form: string;
  fields: Record<string, string>;
  page: string;
  createdAt: string;
};

export type Booking = {
  id: string; // = Startzeit in ISO (UTC), dadurch keine Doppelbuchung möglich
  slot: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string;
  createdAt: string;
};

export type ChatLog = {
  id: string;
  page: string;
  messages: { role: "user" | "assistant"; content: string }[];
  createdAt: string;
  updatedAt: string;
};

export const newId = () => `${new Date().toISOString()}_${crypto.randomUUID().slice(0, 8)}`;

export const readAll = async <T>(store: ReturnType<typeof getStore>): Promise<T[]> => {
  const { blobs } = await store.list();
  const items = await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" })));
  return items.filter(Boolean) as T[];
};
