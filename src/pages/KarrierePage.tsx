import { SEO } from "@/components/SEO";
import { FadeIn } from "@/components/FadeIn";
import { useLanguage } from "@/components/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitApplication, getPositionLabel } from "@/lib/applicationSubmit";

export default function KarrierePage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    submitApplication(formData, isEn ? "en" : "de");

    toast.success(
      isEn
        ? "Application submitted successfully!"
        : "Bewerbung erfolgreich gesendet!",
    );
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const handleWhatsAppDirect = () => {
    const positionLabel = getPositionLabel(
      formData.position,
      isEn ? "en" : "de",
    );
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const msg = isEn
      ? `Hello Pankaj, I'd like to apply:\n\n👤 Name: ${fullName}\n📧 Email: ${formData.email}\n📞 Phone: ${formData.phone}\n💼 Position: ${positionLabel}\n📝 Message: ${formData.message}`
      : `Hallo Pankaj, ich möchte mich bewerben:\n\n👤 Name: ${fullName}\n📧 E-Mail: ${formData.email}\n📞 Telefon: ${formData.phone}\n💼 Position: ${positionLabel}\n📝 Nachricht: ${formData.message}`;
    window.open(
      `https://wa.me/4915207595260?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const benefits = [
    {
      title: isEn ? "Remote Work & Flexibility" : "Remote Work & Flexibilität",
      description: isEn
        ? "Work from anywhere or join us in our modern office."
        : "Arbeite von überall oder in unserem modernen Büro.",
    },
    {
      title: isEn ? "Modern Tech Stack" : "Moderner Tech-Stack",
      description: isEn
        ? "We use the latest AI and web technologies."
        : "Wir nutzen die neuesten KI- und Web-Technologien.",
    },
    {
      title: isEn ? "Growth Opportunities" : "Wachstumschancen",
      description: isEn
        ? "Continuous learning and career progression."
        : "Kontinuierliches Lernen und Karriereentwicklung.",
    },
    {
      title: isEn ? "Team Events" : "Team-Events",
      description: isEn
        ? "Regular meetups, workshops, and celebrations."
        : "Regelmäßige Meetups, Workshops und Feiern.",
    },
  ];

  return (
    <div className="w-full">
      <SEO
        title={
          isEn
            ? "Careers | Join Our Team"
            : "Karriere | Werde Teil unseres Teams"
        }
        description={
          isEn
            ? "Shape the future of AI automation and web design with us."
            : "Gestalte mit uns die Zukunft der KI-Automatisierung und des Webdesigns."
        }
        keywords="Karriere, Jobs, KI, Automatisierung, Webdesign"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-[#153a48] to-[#1e9fae] py-20 lg:py-32">
        <FadeIn
          className="container relative z-10 mx-auto px-4 text-center"
          direction="up"
        >
          <div className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-white mb-6 border border-white/20">
            {isEn ? "We are hiring" : "Wir stellen ein"}
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {isEn
              ? "Shape the future of AI automation"
              : "Gestalte die Zukunft der KI-Automatisierung"}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {isEn
              ? "Join a team of innovators, creators, and problem solvers. We are always looking for talented individuals to join our mission."
              : "Werde Teil eines Teams aus Innovatoren, Kreativen und Problemlösern. Wir suchen ständig nach talentierten Köpfen für unsere Mission."}
          </p>
        </FadeIn>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary md:text-4xl">
              {isEn ? "Why work with us?" : "Warum bei uns arbeiten?"}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <FadeIn key={index} direction="up" delay={index * 100}>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-border h-full flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary font-bold text-xl">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Bonus Section */}
      <section className="py-20 bg-gradient-to-br from-secondary via-[#153a48] to-[#1e9fae] text-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid items-center gap-10 md:gap-12 md:grid-cols-2">
            <FadeIn direction="right" className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-primary mb-6 backdrop-blur-md border border-white/20">
                {isEn ? "Referral Bonus" : "Weiterempfehlungs-Bonus"}
              </div>
              <h2 className="mb-6 text-3xl font-bold md:text-5xl leading-tight">
                {isEn
                  ? "Recommend us & earn €250"
                  : "Empfehle uns weiter & kassiere 250 €"}
              </h2>
              <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed font-medium max-w-xl mx-auto md:mx-0">
                {isEn
                  ? "Know a business owner who could use our help? Send them our way — once they become a client, you receive €250 cash. No limits, no fine print."
                  : "Kennst du einen Unternehmer, der unsere Hilfe gebrauchen könnte? Schick ihn zu uns — sobald er Kunde wird, erhältst du 250 € bar auf die Hand. Keine Grenzen, kein Kleingedrucktes."}
              </p>
              <div className="space-y-3 mb-8">
                {[
                  isEn
                    ? "€250 cash per successful referral"
                    : "250 € bar pro erfolgreicher Weiterempfehlung",
                  isEn
                    ? "No limit — refer as many as you like"
                    : "Keine Grenze — so oft du willst",
                  isEn
                    ? "You don't need to be a client yourself"
                    : "Du musst selbst kein Kunde sein",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-base md:text-lg font-medium bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl"
                  >
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Button
                size="lg"
                className="h-auto min-h-[3.5rem] py-3 px-4 sm:px-8 text-base sm:text-lg font-semibold shadow-xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto whitespace-normal bg-[#25D366] hover:bg-[#1ebe5b] text-white"
                onClick={() =>
                  window.open(
                    "https://wa.me/4915207595260?text=" +
                      encodeURIComponent(
                        isEn
                          ? "Hello Pankaj, I'd like to refer a business and claim the €250 bonus."
                          : "Hallo Pankaj, ich möchte jemanden weiterempfehlen und die 250 € Prämie sichern.",
                      ),
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                {isEn
                  ? "Claim €250 via WhatsApp"
                  : "250 € per WhatsApp sichern"}
              </Button>
            </FadeIn>
            <FadeIn className="flex justify-center" direction="left">
              <a
                href="https://www.instagram.com/p/Dbx8R2otP4R/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-br from-secondary via-[#153a48] to-[#1e9fae]"
              >
                <div className="aspect-[9/16] w-full flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/30">
                    <svg
                      className="w-9 h-9 text-white ml-1"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-white mb-4 backdrop-blur-md border border-white/20">
                    {isEn ? "Watch on Instagram" : "Auf Instagram ansehen"}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {isEn ? "Earn €250 per referral" : "250 € pro Empfehlung"}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed max-w-xs">
                    {isEn
                      ? "Tap to watch the short video and learn how the referral bonus works."
                      : "Tippe, um das kurze Video anzusehen und zu erfahren, wie der Weiterempfehlungs-Bonus funktioniert."}
                  </p>
                </div>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-24 bg-white" id="bewerben">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeIn>
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-border">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-secondary mb-4">
                  {isEn ? "Apply Now" : "Jetzt Bewerben"}
                </h2>
                <p className="text-muted-foreground">
                  {isEn
                    ? "Fill out the form below and we will get back to you shortly."
                    : "Fülle das Formular aus und wir melden uns in Kürze bei dir."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {isEn ? "First Name" : "Vorname"}
                    </label>
                    <Input
                      required
                      placeholder="Max"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {isEn ? "Last Name" : "Nachname"}
                    </label>
                    <Input
                      required
                      placeholder="Mustermann"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="bg-muted/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">E-Mail</label>
                    <Input
                      type="email"
                      required
                      placeholder="max@beispiel.de"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {isEn ? "Phone" : "Telefonnummer"}
                    </label>
                    <Input
                      type="tel"
                      required
                      placeholder="+49 152 0759 5260"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="bg-muted/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {isEn ? "Position" : "Bewerbung als"}
                  </label>
                  <Select
                    required
                    value={formData.position}
                    onValueChange={(val) =>
                      setFormData({ ...formData, position: val })
                    }
                  >
                    <SelectTrigger className="bg-muted/50">
                      <SelectValue
                        placeholder={
                          isEn ? "Select position" : "Position auswählen"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-developer">
                        Web Developer (m/w/d)
                      </SelectItem>
                      <SelectItem value="ai-engineer">
                        AI Automation Engineer (m/w/d)
                      </SelectItem>
                      <SelectItem value="sales">
                        Sales Manager (m/w/d)
                      </SelectItem>
                      <SelectItem value="marketing">
                        Marketing Specialist (m/w/d)
                      </SelectItem>
                      <SelectItem value="initiativ">
                        {isEn ? "Open Application" : "Initiativbewerbung"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {isEn
                      ? "Your Message & Links (LinkedIn, Portfolio, etc.)"
                      : "Deine Nachricht & Links (LinkedIn, Portfolio, etc.)"}
                  </label>
                  <Textarea
                    required
                    rows={5}
                    placeholder={
                      isEn
                        ? "Tell us about yourself..."
                        : "Erzähl uns etwas über dich..."
                    }
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="bg-muted/50 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button
                    type="submit"
                    className="w-full py-6 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? isEn
                        ? "Sending..."
                        : "Wird gesendet..."
                      : isEn
                        ? "Submit Application"
                        : "Bewerbung absenden"}
                  </Button>
                  <Button
                    type="button"
                    className="w-full py-6 text-lg bg-[#25D366] hover:bg-[#1ebe5b] text-white flex items-center justify-center gap-2"
                    onClick={handleWhatsAppDirect}
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    {isEn ? "Apply via WhatsApp" : "Bewerbung via WhatsApp"}
                  </Button>
                </div>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
