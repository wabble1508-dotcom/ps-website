import { useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/components/LanguageContext";
import { SEO } from "@/components/SEO";
import { Search, Clock, User, ArrowRight, BookOpen } from "lucide-react";

export default function BlogPage() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Alle");

  const categories = isEn
    ? [
        "All",
        "AI Automation",
        "Web Design",
        "Lead Generation",
        "SEO",
        "Social Media",
      ]
    : [
        "Alle",
        "KI-Automation",
        "Webdesign",
        "Leadgenerierung",
        "SEO",
        "Social Media",
      ];

  const blogPosts = [
    {
      id: 1,
      title: isEn
        ? "How AI Telephone Assistants are Revolutionizing Crafts"
        : "Wie KI-Telefon-Assistenten das Handwerk revolutionieren",
      excerpt: isEn
        ? "Never miss a customer call while on the construction site. Read how automated systems save time and increase revenue."
        : "Nie wieder Kundenanrufe verpassen, während man auf der Baustelle ist. Lesen Sie, wie automatisierte Systeme Zeit sparen und den Umsatz steigern.",
      category: isEn ? "AI Automation" : "KI-Automation",
      readTime: "5 min",
      author: "PS Solutions",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/4d0a0e7d-3e36-4239-b90d-3c52d1c72a30.png",
      featured: true,
    },
    {
      id: 2,
      title: isEn
        ? "Local SEO: How to Dominate Google in Your City"
        : "Lokales SEO: So dominieren Sie Google in Ihrer Stadt",
      excerpt: isEn
        ? "The best strategies for Google Business Profiles and local search queries to organically attract new customers."
        : "Die besten Strategien für Google Business Profile und lokale Suchanfragen, um organisch Neukunden zu gewinnen.",
      category: "SEO",
      readTime: "7 min",
      author: "PS Solutions",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/5545baec-5613-4c23-bba1-7b1e5b1bbca9.png",
      featured: false,
    },
    {
      id: 3,
      title: isEn
        ? "The Perfect Appointment Automation for Salons"
        : "Die perfekte Termin-Automation für Beauty-Salons",
      excerpt: isEn
        ? "Reduce no-shows by up to 80% with smart SMS reminders and automated booking workflows."
        : "Reduzieren Sie Terminausfälle um bis zu 80% durch smarte SMS-Erinnerungen und automatisierte Buchungs-Workflows.",
      category: isEn ? "Lead Generation" : "Leadgenerierung",
      readTime: "4 min",
      author: "PS Solutions",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/d2954749-7bd7-45e0-828b-1e2482d8b79b.png",
      featured: false,
    },
    {
      id: 4,
      title: isEn
        ? "AI in Healthcare: Relieving the Reception"
        : "KI im Gesundheitswesen: Entlastung für die Praxis-Anmeldung",
      excerpt: isEn
        ? "How digital assistants and smart booking systems reduce phone stress in medical practices and give time back to patients."
        : "Wie digitale Assistenten und smarte Buchungssysteme den Telefon-Stress in Praxen reduzieren und Zeit für Patienten zurückgeben.",
      category: isEn ? "AI Automation" : "KI-Automation",
      readTime: "6 min",
      author: "PS Solutions",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/19a5d2a4-7892-4b4d-a9c8-bd1da3e22eaa.jpg",
      featured: false,
    },
    {
      id: 5,
      title: isEn
        ? "Why Your Website Needs to be a Sales Machine"
        : "Warum Ihre Website eine Verkaufsmaschine sein muss",
      excerpt: isEn
        ? "A digital business card is no longer enough. Learn how to turn your website into an active lead generator."
        : "Eine digitale Visitenkarte reicht nicht mehr. Erfahren Sie, wie Sie Ihre Website in einen aktiven Lead-Generator verwandeln.",
      category: isEn ? "Web Design" : "Webdesign",
      readTime: "6 min",
      author: "PS Solutions",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/06c9e651-82c0-4909-9398-39cfc88af722.jpg",
      featured: false,
    },
    {
      id: 6,
      title: isEn
        ? "Social Media for Local Businesses: What Really Works"
        : "Social Media für lokale Unternehmen: Was wirklich funktioniert",
      excerpt: isEn
        ? "Stop wasting time on dances. Here are the 3 content pillars that actually bring customers to your store."
        : "Hören Sie auf, Zeit mit Tänzen zu verschwenden. Hier sind die 3 Content-Säulen, die wirklich Kunden in Ihr Geschäft bringen.",
      category: "Social Media",
      readTime: "5 min",
      author: "PS Solutions",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/e672104f-6d1a-43fa-aa15-f711ac4aa99a.png",
      featured: false,
    },
    {
      id: 7,
      title: isEn
        ? "Automating Customer Support with AI Chatbots"
        : "Kundensupport mit KI-Chatbots automatisieren",
      excerpt: isEn
        ? "How to answer 90% of customer inquiries instantly without hiring additional staff."
        : "Wie Sie 90% der Kundenanfragen sofort beantworten, ohne zusätzliches Personal einzustellen.",
      category: isEn ? "AI Automation" : "KI-Automation",
      readTime: "8 min",
      author: "PS Solutions",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/assets/19a5d2a4-7892-4b4d-a9c8-bd1da3e22eaa.jpg",
      featured: false,
    },
  ];

  const featuredPost = blogPosts.find((post) => post.featured);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "Alle" ||
      activeCategory === "All" ||
      post.category === activeCategory;
    return (
      matchesSearch &&
      matchesCategory &&
      (!post.featured ||
        searchQuery ||
        activeCategory !== (isEn ? "All" : "Alle"))
    );
  });

  return (
    <div className="w-full">
      <SEO
        title={
          isEn
            ? "Magazine & Knowledge | PS Professional Solutions"
            : "Magazin & Wissen | PS Professional Solutions"
        }
        description={
          isEn
            ? "Expert articles on AI automation, web design, and local lead generation."
            : "Expertenartikel rund um KI-Automatisierung, Webdesign und lokale Leadgenerierung."
        }
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('/media/vibe.filesafe.space/1778931020193405557/assets/cfe4e59e-209b-42b1-8f9e-ddd5079f51b4.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <FadeIn className="container relative z-10 mx-auto px-4 text-center">
          <BookOpen className="w-12 h-12 text-primary mx-auto mb-6" />
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
            {isEn ? "Magazine & Knowledge" : "Magazin & Expertenwissen"}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            {isEn
              ? "Insights, strategies, and case studies for your digital success."
              : "Einblicke, Strategien und Fallstudien für Ihren digitalen Erfolg."}
          </p>
        </FadeIn>
      </section>

      {/* Search & Filter Section */}
      <section className="py-12 bg-white border-b border-muted">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder={
                  isEn ? "Search articles..." : "Artikel durchsuchen..."
                }
                className="pl-10 h-12 bg-muted/50 border-none rounded-full text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-primary text-white shadow-md"
                      : "bg-muted text-secondary hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post (Only show when no search/filter is active) */}
      {!searchQuery &&
        (activeCategory === "Alle" || activeCategory === "All") &&
        featuredPost && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-2xl font-bold text-secondary mb-8">
                {isEn ? "Featured Article" : "Im Fokus"}
              </h2>
              <FadeIn>
                <Card className="overflow-hidden border-none shadow-xl group hover:shadow-2xl transition-all duration-500 bg-white cursor-pointer">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {featuredPost.category}
                      </div>
                    </div>
                    <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {featuredPost.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" /> {featuredPost.author}
                        </span>
                      </div>
                      <h3 className="mb-4 text-3xl md:text-4xl font-bold text-secondary group-hover:text-primary transition-colors leading-tight">
                        {featuredPost.title}
                      </h3>
                      <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <Button
                        className="w-fit group-hover:bg-primary group-hover:text-white transition-colors"
                        size="lg"
                      >
                        {isEn ? "Read Full Article" : "Ganzen Artikel lesen"}{" "}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </FadeIn>
            </div>
          </section>
        )}

      {/* Blog Grid */}
      <section className="py-20 bg-muted/20 min-h-[50vh]">
        <div className="container mx-auto px-4 max-w-6xl">
          {!searchQuery &&
            (activeCategory === "Alle" || activeCategory === "All") && (
              <h2 className="text-2xl font-bold text-secondary mb-8">
                {isEn ? "Latest Articles" : "Neueste Artikel"}
              </h2>
            )}
          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, i) => (
                <FadeIn key={post.id} delay={i * 100}>
                  <Card className="overflow-hidden border-none shadow-lg group hover:-translate-y-2 transition-transform duration-500 h-full flex flex-col bg-white">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {post.category}
                      </div>
                    </div>
                    <CardContent className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {post.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" /> {post.author}
                        </span>
                      </div>
                      <h3 className="mb-4 text-2xl font-bold text-secondary group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <Button
                        variant="ghost"
                        className="w-fit group-hover:bg-primary group-hover:text-white transition-colors mt-auto"
                      >
                        {isEn ? "Read more" : "Weiterlesen"}{" "}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-secondary mb-2">
                {isEn ? "No articles found" : "Keine Artikel gefunden"}
              </h3>
              <p className="text-muted-foreground">
                {isEn
                  ? "Try a different search term or category."
                  : "Versuchen Sie einen anderen Suchbegriff oder eine andere Kategorie."}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
