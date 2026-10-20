import { Star } from "lucide-react";
import { FadeIn } from "./FadeIn";
import { useLanguage } from "./LanguageContext";

const reviewsDe = [
  {
    name: "Michael K.",
    role: "Geschäftsführer Handwerk",
    content:
      "Seit wir den KI-Assistenten nutzen, haben wir 40% mehr Anfragen und das Telefon klingelt nicht mehr ununterbrochen. Ein Segen für unseren Betrieb!",
    rating: 5,
    initial: "M",
  },
  {
    name: "Sarah L.",
    role: "Inhaberin Beautysalon",
    content:
      "Die automatisierten Terminerinnerungen haben unsere No-Show-Rate auf fast null gesenkt. Das System bezahlt sich von selbst.",
    rating: 5,
    initial: "S",
  },
  {
    name: "Dr. Thomas W.",
    role: "Praxisinhaber",
    content:
      "Unsere Anmeldung ist endlich entlastet. Patienten buchen online und der KI-Chat klärt die häufigsten Fragen direkt auf der Website.",
    rating: 5,
    initial: "T",
  },
  {
    name: "Elena M.",
    role: "Kosmetikstudio",
    content:
      "Ich war skeptisch, ob KI zu uns passt. Aber die Einrichtung war super einfach und meine Kundinnen lieben die schnelle Terminbuchung!",
    rating: 5,
    initial: "E",
  },
  {
    name: "Andreas B.",
    role: "Sanitärbetrieb",
    content:
      "Das Dashboard ist genial. Ich sehe sofort, welche Leads neu sind und wer noch angerufen werden muss. Nichts geht mehr verloren.",
    rating: 5,
    initial: "A",
  },
  {
    name: "Julia S.",
    role: "Steuerberaterin",
    content:
      "Hochprofessioneller Auftritt dank der neuen Website und dem integrierten Chat. Wir gewinnen genau die Mandanten, die wir wollen.",
    rating: 5,
    initial: "J",
  },
];

const reviewsEn = [
  {
    name: "Michael K.",
    role: "Crafts Business Owner",
    content:
      "Since using the AI assistant, inquiries are up 40% and the phone isn't ringing constantly anymore. A blessing for our business!",
    rating: 5,
    initial: "M",
  },
  {
    name: "Sarah L.",
    role: "Beauty Salon Owner",
    content:
      "Automated appointment reminders have reduced our no-show rate to almost zero. The system pays for itself.",
    rating: 5,
    initial: "S",
  },
  {
    name: "Dr. Thomas W.",
    role: "Clinic Owner",
    content:
      "Our reception is finally relieved. Patients book online and the AI chat answers common questions directly on the website.",
    rating: 5,
    initial: "T",
  },
  {
    name: "Elena M.",
    role: "Cosmetics Studio",
    content:
      "I was skeptical if AI fits us. But setup was super easy and my clients love the fast appointment booking!",
    rating: 5,
    initial: "E",
  },
  {
    name: "Andreas B.",
    role: "Plumbing Service",
    content:
      "The dashboard is brilliant. I immediately see which leads are new and who needs to be called. Nothing gets lost anymore.",
    rating: 5,
    initial: "A",
  },
  {
    name: "Julia S.",
    role: "Tax Consultant",
    content:
      "Highly professional presence thanks to the new website and integrated chat. We attract exactly the clients we want.",
    rating: 5,
    initial: "J",
  },
];

const reviewsTr = [
  {
    name: "Michael K.",
    role: "İnşaat İşletme Sahibi",
    content:
      "Yapay zeka asistanını kullanmaya başladığımızdan beri talepler %40 arttı ve telefon artık sürekli çalmıyor. İşletmemiz için bir lütuf!",
    rating: 5,
    initial: "M",
  },
  {
    name: "Sarah L.",
    role: "Güzellik Salonu Sahibi",
    content:
      "Otomatik randevu hatırlatmaları gelmeme oranını sıfıra indirdi. Sistem kendi masrafını karşılıyor.",
    rating: 5,
    initial: "S",
  },
  {
    name: "Dr. Thomas W.",
    role: "Muayenehane Sahibi",
    content:
      "Resepsiyonumuz sonunda rahatladı. Hastalar online randevu alıyor ve yapay zeka sohbeti en sık soruları doğrudan web sitesinde yanıtlıyor.",
    rating: 5,
    initial: "T",
  },
  {
    name: "Elena M.",
    role: "Kozmetik Stüdyosu",
    content:
      "Yapay zeka bize uygun mu diye şüpheliydim. Ama kurulum çok kolaydı ve müşterilerim hızlı randevu sistemini seviyor!",
    rating: 5,
    initial: "E",
  },
  {
    name: "Andreas B.",
    role: "Tesisat Hizmetleri",
    content:
      "Panel harika. Hangi müşterilerin yeni olduğunu ve kimin aranması gerektiğini hemen görüyorum. Artık hiçbir şey kaybolmuyor.",
    rating: 5,
    initial: "A",
  },
  {
    name: "Julia S.",
    role: "Mali Müşavir",
    content:
      "Yeni web sitesi ve entegre sohbet sayesinde yüksek profesyonel görünüm. Tam istediğimiz müşterileri kazanıyoruz.",
    rating: 5,
    initial: "J",
  },
];

const reviewsMap: Record<string, typeof reviewsDe> = {
  de: reviewsDe,
  en: reviewsEn,
  tr: reviewsTr,
};

const pick = (lang: string, obj: { de: string; en: string; tr: string }) =>
  (obj as Record<string, string>)[lang] || obj.de;

export function WallOfLove() {
  const { language } = useLanguage();
  const reviews = reviewsMap[language] || reviewsDe;

  return (
    <section className="py-24 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-6">
            Wall of Love
          </div>
          <h2 className="text-3xl font-bold md:text-5xl text-secondary mb-6">
            {pick(language, {
              de: "Das sagen unsere Kunden",
              en: "What our clients say",
              tr: "Müşterilerimiz ne diyor",
            })}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {pick(language, {
              de: "Echte Ergebnisse von echten Unternehmen. Sehen Sie selbst, wie KI-Automation den Alltag unserer Kunden verändert hat.",
              en: "Real results from real businesses. See how AI automation has transformed our clients' daily operations.",
              tr: "Gerçek işletmelerden gerçek sonuçlar. Yapay zeka otomasyonunun müşterilerimizin günlük yaşantısını nasıl değiştirdiğini görün.",
            })}
          </p>
        </FadeIn>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">
          {reviews.map((review, i) => (
            <FadeIn
              key={i}
              direction="up"
              delay={i * 100}
              className="break-inside-avoid"
            >
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-secondary font-medium text-lg leading-relaxed mb-6">
                  "{review.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                    {review.initial}
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary">{review.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
