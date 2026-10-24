import { json } from "../../server/http";

// Stadt des Besuchers für „Jetzt auch für Unternehmen in …“. Cloudflare kennt sie ohnehin
// aus der Verbindung – so muss keine IP an einen Fremddienst geschickt werden. Nichts wird gespeichert.
export const onRequestGet = ({ request }: { request: Request & { cf?: { city?: string } } }) => {
  const res = json({ city: request.cf?.city || null });
  res.headers.set("Cache-Control", "private, no-store");
  return res;
};
