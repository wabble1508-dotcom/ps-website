import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/LanguageContext";

const loadContact = () => {
  try {
    const stored = sessionStorage.getItem("bookingData");
    if (stored) return { firstName: "", lastName: "", email: "", phone: "", note: "", ...JSON.parse(stored) };
  } catch {
    // ignorieren
  }
  return { firstName: "", lastName: "", email: "", phone: "", note: "" };
};

export const VielenDankPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [slots, setSlots] = useState<Record<string, { slots: string[] }>>({});
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [contact, setContact] = useState(loadContact);
  const [booking, setBooking] = useState(false);
  const [bookedSlot, setBookedSlot] = useState<string | null>(null);
  const { toast } = useToast();
  const { language } = useLanguage();
  const isEn = language === "en";

  const fetchSlots = useCallback(async () => {
    setLoading(true);
    try {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      let start = startOfMonth(currentMonth);
      if (start < now) start = now;
      const end = endOfMonth(currentMonth);
      const res = await fetch(
        `/api/slots?from=${format(start, "yyyy-MM-dd")}&to=${format(end, "yyyy-MM-dd")}`,
      );
      setSlots(res.ok ? await res.json() : {});
    } catch (error) {
      console.error("Failed to fetch slots", error);
    } finally {
      setLoading(false);
    }
  }, [currentMonth]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const availableTimes = useMemo(() => {
    if (!date) return [];
    return slots[format(date, "yyyy-MM-dd")]?.slots || [];
  }, [date, slots]);

  const formatSlot = (slot: string, withDate = false) =>
    new Date(slot).toLocaleString(isEn ? "en-GB" : "de-DE", {
      timeZone: "Europe/Berlin",
      ...(withDate ? { weekday: "long", day: "2-digit", month: "long" } : {}),
      hour: "2-digit",
      minute: "2-digit",
    });

  const update = (key: keyof typeof contact) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setContact({ ...contact, [key]: e.target.value });

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setBooking(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, slot: selectedSlot }),
      });
      if (res.status === 409) {
        toast({
          title: isEn ? "Time no longer available" : "Termin nicht mehr frei",
          description: isEn
            ? "Someone just booked this time. Please choose another one."
            : "Dieser Termin wurde gerade vergeben. Bitte wählen Sie eine andere Uhrzeit.",
          variant: "destructive",
        });
        setSelectedSlot(null);
        fetchSlots();
        return;
      }
      if (!res.ok) throw new Error(String(res.status));

      toast({
        title: isEn ? "Appointment booked!" : "Termin gebucht!",
        description: isEn
          ? "Your appointment has been successfully confirmed."
          : "Ihr Termin wurde erfolgreich bestätigt.",
      });
      setBookedSlot(selectedSlot);
    } catch (error) {
      toast({
        title: isEn ? "Error" : "Fehler",
        description: isEn
          ? "The appointment could not be booked."
          : "Der Termin konnte nicht gebucht werden.",
        variant: "destructive",
      });
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <SEO
        noIndex
        title={
          isEn
            ? "Thank you! — PS Professional Solutions"
            : "Vielen Dank! — PS Professional Solutions"
        }
        description={
          isEn
            ? "Thank you for your request. Now choose an appointment for your free initial consultation."
            : "Vielen Dank für Ihre Anfrage. Wählen Sie nun einen Termin für Ihr kostenloses Erstgespräch."
        }
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">
          {isEn
            ? "Thank you for your request!"
            : "Vielen Dank für Ihre Anfrage!"}
        </h1>
        <p className="text-xl text-muted-foreground">
          {isEn
            ? "Your data has been successfully submitted. Please select an appointment for your free initial consultation."
            : "Ihre Daten wurden erfolgreich übermittelt. Bitte wählen Sie nun einen Termin für Ihr kostenloses Erstgespräch aus."}
        </p>
      </div>

      <Card className="shadow-xl border-none">
        <CardHeader className="text-center border-b pb-6">
          <CardTitle className="text-2xl">
            {bookedSlot
              ? isEn
                ? "Appointment confirmed"
                : "Termin bestätigt"
              : isEn
                ? "Schedule Appointment"
                : "Termin vereinbaren"}
          </CardTitle>
          {!bookedSlot && (
            <CardDescription>
              {selectedSlot
                ? formatSlot(selectedSlot, true)
                : isEn
                  ? "Choose a suitable date and time for our conversation."
                  : "Wählen Sie ein passendes Datum und eine Uhrzeit für unser Gespräch."}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="pt-6">
          {bookedSlot ? (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {isEn
                  ? "Appointment successfully booked!"
                  : "Termin erfolgreich gebucht!"}
              </h3>
              <p className="font-semibold mb-2">{formatSlot(bookedSlot, true)}</p>
              <p className="text-muted-foreground max-w-md mx-auto">
                {isEn
                  ? "Your appointment has been scheduled. You will shortly receive a confirmation by email with all further details."
                  : "Ihr Termin wurde eingetragen. Sie erhalten in Kürze eine Bestätigung per E-Mail mit allen weiteren Details."}
              </p>
            </div>
          ) : selectedSlot ? (
            <form onSubmit={handleBook} className="max-w-md mx-auto flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <Input required placeholder={isEn ? "First name *" : "Vorname *"} value={contact.firstName} onChange={update("firstName")} />
                <Input placeholder={isEn ? "Last name" : "Nachname"} value={contact.lastName} onChange={update("lastName")} />
              </div>
              <Input required type="email" placeholder={isEn ? "Email *" : "E-Mail *"} value={contact.email} onChange={update("email")} />
              <Input type="tel" placeholder={isEn ? "Phone" : "Telefon"} value={contact.phone} onChange={update("phone")} />
              <Textarea
                placeholder={isEn ? "What would you like to talk about? (optional)" : "Worum geht es? (optional)"}
                value={contact.note}
                onChange={update("note")}
              />
              <Button type="submit" size="lg" disabled={booking}>
                {booking
                  ? isEn ? "Booking …" : "Wird gebucht …"
                  : isEn ? "Book appointment" : "Termin verbindlich buchen"}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setSelectedSlot(null)}>
                {isEn ? "Choose another time" : "Andere Uhrzeit wählen"}
              </Button>
            </form>
          ) : (
            <div className="grid md:grid-cols-2 gap-12">
              <div className="flex justify-center md:justify-end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  onMonthChange={setCurrentMonth}
                  className="rounded-md border shadow"
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const maxDate = new Date(
                      today.getTime() + 31 * 24 * 60 * 60 * 1000,
                    );
                    return (
                      date < today ||
                      date > maxDate ||
                      (!loading && !slots[format(date, "yyyy-MM-dd")])
                    );
                  }}
                />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-lg">
                  {isEn ? "Available Times" : "Verfügbare Uhrzeiten"}
                </h3>
                {date ? (
                  loading ? (
                    <p className="text-muted-foreground text-sm">
                      {isEn ? "Loading appointments..." : "Lade Termine..."}
                    </p>
                  ) : availableTimes.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
                      {availableTimes.map((slot) => (
                        <Button
                          key={slot}
                          variant="outline"
                          className="w-full"
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {formatSlot(slot)}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      {isEn
                        ? "No appointments available on this day."
                        : "Keine Termine an diesem Tag verfügbar."}
                    </p>
                  )
                ) : (
                  <p className="text-muted-foreground text-sm">
                    {isEn
                      ? "Please select a date first."
                      : "Bitte wählen Sie zuerst ein Datum aus."}
                  </p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
