import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, Star } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useContactForm } from "@/components/ContactFormDialog";

export const GenericPage = ({
  title,
  description,
  features = [],
  videoTestimonial,
}: {
  title: string;
  description: string;
  features?: string[];
  videoTestimonial?: { url: string; title: string; description?: string };
}) => {
  const { openForm } = useContactForm();

  return (
    <div className="w-full">
      <SEO
        title={`${title} — PS Professional Solutions`}
        description={description}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-[#153a48] to-primary py-24 lg:py-32 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/media/vibe.filesafe.space/1778931020193405557/assets/3aa56928-eb78-4c15-8d46-5a14bf858bc8.png')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">
              Top bewertete Automatisierungslösung
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            {title}
          </h1>
          <p
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            {description}
          </p>
          <div
            className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              size="lg"
              className="h-auto min-h-[3.5rem] py-3 px-4 sm:px-8 text-base sm:text-lg rounded-full shadow-xl hover:scale-105 transition-transform bg-white text-secondary hover:bg-white/90 w-full sm:w-auto whitespace-normal"
              onClick={() => openForm("contact", `Generic Page: ${title}`)}
            >
              Jetzt Strategie-Check buchen{" "}
              <ChevronRight className="ml-2 h-5 w-5 shrink-0" />
            </Button>
          </div>
        </div>
      </section>

      {/* Logo Slider Section */}
      <section className="py-12 overflow-hidden bg-white border-b border-muted/50">
        <div className="container mx-auto px-4 mb-8 text-center">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
            Vertraut von innovativen Unternehmen
          </p>
        </div>
        <div className="flex w-full overflow-hidden whitespace-nowrap relative">
          <div className="flex animate-marquee min-w-full shrink-0 items-center justify-around gap-8 md:gap-16 px-4 md:px-8">
            <img
              src="/media/vibe.filesafe.space/1778931020193405557/attachments/0aed8fdd-4881-47a3-be5c-3df062f0d503.jpg"
              alt="PAKUMO"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="/media/vibe.filesafe.space/1778931020193405557/attachments/13ef37d7-4c1d-41ec-81ce-a10efeb84752.jpg"
              alt="Matou"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="/media/vibe.filesafe.space/1778931020193405557/attachments/9ad3b078-d54a-4b51-8362-4747e5f662f4.png"
              alt="Do Not Draw This"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="/media/vibe.filesafe.space/1778931020193405557/attachments/b644a54f-e4a4-4718-846c-d73a3ab96bb2.png"
              alt="Professional Hair Style"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="/media/vibe.filesafe.space/1778931020193405557/attachments/3c0772b0-8ceb-4ebb-84cd-f7152044fa7c.png"
              alt="Marc Mustache"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="/media/vibe.filesafe.space/1778931020193405557/attachments/36aa3eed-d489-42d6-b968-05cf870092c3.png"
              alt="New Client"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="/media/vibe.filesafe.space/1778931020193405557/attachments/2ffe9c2a-bd0d-4ad8-a0f9-cdde2678adf3.png"
              alt="Delphin Feinkost"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="/media/vibe.filesafe.space/1778931020193405557/attachments/e537852e-63c5-4073-b66d-82ce11df5233.png"
              alt="Arvené"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="/media/vibe.filesafe.space/1778931020193405557/attachments/d290e9e6-da6c-4e4c-9522-a24ec18ef546.png"
              alt="Arvené A"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />

            <img
              src="https://vibe.filesafe.space/1778931020193405557/attachments/4bba15ce-4830-4e84-a2fd-e00d8d63585b.png"
              alt="Client 5"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="https://vibe.filesafe.space/1778931020193405557/attachments/c95c8de4-4adf-4957-8a49-81ee042c3630.png"
              alt="Client 6"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div
            className="flex animate-marquee min-w-full shrink-0 items-center justify-around gap-8 md:gap-16 px-4 md:px-8"
            aria-hidden="true"
          >
            <img
              src="/media/vibe.filesafe.space/1778931020193405557/attachments/0aed8fdd-4881-47a3-be5c-3df062f0d503.jpg"
              alt="PAKUMO"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="/media/vibe.filesafe.space/1778931020193405557/attachments/13ef37d7-4c1d-41ec-81ce-a10efeb84752.jpg"
              alt="Matou"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="/media/vibe.filesafe.space/1778931020193405557/attachments/9ad3b078-d54a-4b51-8362-4747e5f662f4.png"
              alt="Do Not Draw This"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="/media/vibe.filesafe.space/1778931020193405557/attachments/b644a54f-e4a4-4718-846c-d73a3ab96bb2.png"
              alt="Professional Hair Style"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="/media/vibe.filesafe.space/1778931020193405557/attachments/3c0772b0-8ceb-4ebb-84cd-f7152044fa7c.png"
              alt="Marc Mustache"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="/media/vibe.filesafe.space/1778931020193405557/attachments/36aa3eed-d489-42d6-b968-05cf870092c3.png"
              alt="New Client"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="/media/vibe.filesafe.space/1778931020193405557/attachments/2ffe9c2a-bd0d-4ad8-a0f9-cdde2678adf3.png"
              alt="Delphin Feinkost"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="/media/vibe.filesafe.space/1778931020193405557/attachments/e537852e-63c5-4073-b66d-82ce11df5233.png"
              alt="Arvené"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="/media/vibe.filesafe.space/1778931020193405557/attachments/d290e9e6-da6c-4e4c-9522-a24ec18ef546.png"
              alt="Arvené A"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />

            <img
              src="https://vibe.filesafe.space/1778931020193405557/attachments/4bba15ce-4830-4e84-a2fd-e00d8d63585b.png"
              alt="Client 5"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="https://vibe.filesafe.space/1778931020193405557/attachments/c95c8de4-4adf-4957-8a49-81ee042c3630.png"
              alt="Client 6"
              className="h-16 md:h-32 w-auto object-contain max-w-none rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      {features.length > 0 && (
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-secondary">
                Ihre Vorteile im Überblick
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Entdecken Sie, wie unsere Lösung Ihren Arbeitsalltag
                revolutioniert und Ihnen mehr Zeit für das Wesentliche
                verschafft.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="group flex items-start gap-6 p-8 bg-white rounded-3xl shadow-lg border border-border/50 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <CheckCircle2 className="h-6 w-6 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feat}</h3>
                    <p className="text-muted-foreground">
                      Profitieren Sie von maximaler Effizienz und nahtloser
                      Integration in Ihre bestehenden Prozesse.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Testimonial Section */}
      {videoTestimonial && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl text-primary">
                {videoTestimonial.title}
              </h2>
              {videoTestimonial.description && (
                <p className="text-lg text-muted-foreground font-semibold">
                  {videoTestimonial.description}
                </p>
              )}
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white border-4 border-primary">
              <div className="aspect-video bg-black relative flex items-center justify-center">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={videoTestimonial.url}
                  title={videoTestimonial.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Bereit für den nächsten Schritt?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Lassen Sie uns gemeinsam herausfinden, wie wir diese Lösung für Ihr
            Unternehmen optimal einsetzen können. Kostenlos und unverbindlich.
          </p>
          <Button
            size="lg"
            className="h-auto min-h-[4rem] py-3 px-6 sm:px-10 text-lg sm:text-xl rounded-full shadow-2xl hover:scale-105 transition-transform bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto whitespace-normal"
            onClick={() => openForm("contact", `Generic Page: ${title} - CTA`)}
          >
            Kostenloses Erstgespräch vereinbaren
          </Button>
        </div>
      </section>
    </div>
  );
};
