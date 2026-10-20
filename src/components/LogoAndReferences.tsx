import { FadeIn } from "@/components/FadeIn";
import { useLanguage } from "@/components/LanguageContext";
import { useContactForm } from "@/components/ContactFormDialog";

const logos = [
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/443224bc-320d-45db-82d3-43c4deb617dd.png",
    alt: "Alawy Autos Dortmund",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/ec2cff87-208b-4d77-8bad-7d349fc9f8f1.png",
    alt: "Juicy Flame Burger & Steaks",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/5ec2ed97-535c-4ec2-8c6b-c5b459c2f643.jpg",
    alt: "Barber Gökho Friseur",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/c0d2d99f-a3ec-4b6e-b299-599a3a899844.png",
    alt: "Café Sis Coffee Kitchen Vibes",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/033385ce-5c4d-42dc-bb95-0348615e3827.png",
    alt: "Steinofen Pizza La Roma",
  },
  {
    src: "/media/vibe.filesafe.space/1779266194699726281/attachments/f908adde-363b-424a-9efa-c58282ea44bb.jpg",
    alt: "Matou Kfz Schilder Express",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/646d589d-652a-498d-9fc3-afbe9e891029.png",
    alt: "Zulassungsdienst Bolat",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/9c691161-716a-42f9-b6c3-a345f56e8321.png",
    alt: "Physiotherapie Rossa Dortmund",
  },
  // Neue Kundenlogos
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/1581d816-62fb-42c0-934a-b764b6c059a5.png",
    alt: "KRL. Skinart",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/80f19b88-7fa1-4837-9517-08c9f6c75a4a.png",
    alt: "madebyanu.de",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/3423422e-ec0c-467f-9228-ed1b436fd416.jpg",
    alt: "SME MONDE",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/f1fa5753-7795-41c3-8095-0debdcb83dcd.png",
    alt: "L&M Diamond & Hijabs - Moroccan Beldi Jewelry",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/ad223435-ce05-4d8e-9385-3bef60069238.png",
    alt: "GSA Creation of Bondings",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/b8943ca4-7beb-4f04-9a19-6a27cb624eb0.jpg",
    alt: "Istanbul Barbershop",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/679d3f78-3acb-4ba2-ae74-6d056734ab5f.jpg",
    alt: "Caracalla",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/285a343c-7317-4c26-9fa3-fb7c908c1cb3.jpg",
    alt: "Madani Automobil",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/226c0d5e-9320-468d-86ac-3982e166fb49.jpg",
    alt: "Omar Call Shop",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/e700f885-1544-4be2-9bca-4e79902904a7.png",
    alt: "Mein Handy",
    customClass: "h-16 md:h-24 w-auto object-contain",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/99f38e0d-ce8b-4958-b3c9-7f6452069919.png",
    alt: "Sunset Sounds Fest",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/df4a8ce7-e403-44cc-be92-abcd7a24fd43.png",
    alt: "XL Schilder Online Zulassungen",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/cbfcce06-b294-4a66-a5c9-ed86dcce69a5.png",
    alt: "Cohedo",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/26ab2136-d794-47ac-bc6d-879c27dc36e8.png",
    alt: "Textil & Fashion Partner",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/0aed8fdd-4881-47a3-be5c-3df062f0d503.jpg",
    alt: "PAKUMO",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/9ad3b078-d54a-4b51-8362-4747e5f662f4.png",
    alt: "Do Not Draw This",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/b644a54f-e4a4-4718-846c-d73a3ab96bb2.png",
    alt: "Professional Hair Style",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/3c0772b0-8ceb-4ebb-84cd-f7152044fa7c.png",
    alt: "Marc Mustache",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/36aa3eed-d489-42d6-b968-05cf870092c3.png",
    alt: "New Client",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/2ffe9c2a-bd0d-4ad8-a0f9-cdde2678adf3.png",
    alt: "Delphin Feinkost",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/e537852e-63c5-4073-b66d-82ce11df5233.png",
    alt: "Arvené",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/d290e9e6-da6c-4e4c-9522-a24ec18ef546.png",
    alt: "Arvené A",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/d6882ce2-4b5e-46f6-b8d9-80581a6e4199.png",
    alt: "KSDill",
  },
  // Neue Partnerlogos
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/0971c453-1edb-4d41-914e-ce6617284f00.png",
    alt: "G.T. Car-Service Kfz-Meisterbetrieb",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/7e339685-d4ee-4857-9086-a0b4ce811d29.png",
    alt: "AcOD e.V. Verein",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/b9526442-40fd-4557-8b49-fecebcca6fad.png",
    alt: "Öz Urfa Deluxe Café & Restaurant",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/c3fedf79-deb1-401a-b8a9-f94a12346b8c.png",
    alt: "AM Hähnchenbuderei Grillhähnchen Restaurant",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/4f435173-f042-494b-b3d6-35817d23a103.png",
    alt: "S&D Nachhilfe Zentrum",
  },
  // Neue Kundenlogos (Lilyum Cosmetics, PureSkin Bochum, Burek Bar, Änderungsatelier Eving, Münster Nähstube)
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/b0d176a1-eb5e-4139-953f-f6ebd8af6d1a.png",
    alt: "Lilyum Cosmetics Parfum",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/e109f0da-e936-4668-955f-5484b6b3917e.png",
    alt: "PureSkin Bochum Kosmetikstudio",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/5adb3919-af67-49d1-905d-22aac3fc8cf2.png",
    alt: "Burek Bar Café & Restaurant",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/e11423c1-e8bd-44f9-bee0-46c49c534364.jpg",
    alt: "Änderungsatelier Eving",
  },
  {
    src: "/media/vibe.filesafe.space/1778931020193405557/attachments/d6ff2edc-916e-4727-a8ff-cab993f944ee.jpg",
    alt: "Münster Nähstube Änderungsschneiderei",
  },
];

export const LogoSliderSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 overflow-hidden bg-background border-t border-border">
      <div className="container mx-auto px-4 mb-10 text-center">
        <h3 className="text-2xl font-bold text-primary">
          {t("home", "partnersTitle")}
        </h3>
      </div>
      <div className="flex w-full overflow-hidden whitespace-nowrap relative">
        <div
          className="flex animate-marquee min-w-full shrink-0 items-center justify-around gap-8 md:gap-16 px-4 md:px-8"
          style={{ animationDuration: "50s" }}
        >
          {logos.map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className={`w-auto object-contain max-w-none rounded-xl shadow-sm hover:scale-105 transition-transform duration-300 ${
                (logo as { customClass?: string }).customClass || "h-24 md:h-40"
              }`}
            />
          ))}
        </div>
        <div
          className="flex animate-marquee min-w-full shrink-0 items-center justify-around gap-8 md:gap-16 px-4 md:px-8"
          style={{ animationDuration: "50s" }}
          aria-hidden="true"
        >
          {logos.map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className={`w-auto object-contain max-w-none rounded-xl shadow-sm hover:scale-105 transition-transform duration-300 ${
                (logo as { customClass?: string }).customClass || "h-24 md:h-40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const ReferencesSection = () => {
  const { t, language } = useLanguage();
  const { openForm } = useContactForm();

  const matouTitle = "Matou Kfz Schilder Express";
  const matouDesc =
    language === "en"
      ? "We developed a high-performance e-commerce and registration platform for Matou Kfz Schilder Express that digitizes the entire vehicle registration process nationwide. Customers enter their custom license plate, the system checks live availability at the local registration office and redirects them directly to the right authority. With secure document upload (eID, eVB, vehicle registration) and an integrated DIN plate shop including 24h express shipping, the entire process is completed in under five minutes – without a single minute of waiting at the counter. The result: significantly more online orders and a fully automated customer journey that runs 24/7."
      : language === "tr"
        ? "Matou Kfz Schilder Express için araç tescil sürecini ülke genelinde dijitalleştiren yüksek performanslı bir e-ticaret ve tescil platformu geliştirdik. Müşteriler istedikleri plakayı girer, sistem yerel tescil dairesindeki müsaitliği canlı kontrol eder ve doğrudan ilgili daireye yönlendirir. Güvenli belge yükleme (eID, eVB, araç ruhsatı) ve 24 saat hızlı kargo dahil entegre DIN plaka mağazası ile tüm süreç beş dakikadan kısa sürede tamamlanır – dairede tek dakika bile beklemeden. Sonuç: önemli ölçüde daha fazla online sipariş ve 7/24 çalışan tam otomatik müşteri yolculuğu."
        : "Wir haben für Matou Kfz Schilder Express eine leistungsstarke E-Commerce- und Zulassungsplattform entwickelt, die den gesamten Kfz-Zulassungsprozess bundesweit digitalisiert. Kunden geben ihr Wunschkennzeichen ein, das System prüft live die Verfügbarkeit bei der lokalen Zulassungsstelle und leitet sie direkt zur zuständigen Behörde weiter. Mit sicherem Dokumenten-Upload (eID, eVB, Fahrzeugschein) und integriertem DIN-Schilder-Shop inklusive 24h-Blitzversand läuft der gesamte Prozess in unter fünf Minuten ab – ohne eine einzige Minute Wartezeit im Amt. Das Ergebnis: deutlich mehr Online-Bestellungen und eine vollautomatisierte Customer Journey, die 24/7 läuft.";

  return (
    <section id="referenzen" className="py-20 bg-muted/30">
      <FadeIn className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 max-w-6xl mx-auto">
          <div
            className="flex flex-col items-center text-center group cursor-pointer hover:bg-card p-8 rounded-3xl transition-all duration-500 hover:shadow-xl"
            onClick={() => openForm("contact", "Startseite - Referenz 1")}
          >
            <h3 className="mb-6 text-2xl font-bold md:text-4xl text-secondary group-hover:text-primary transition-colors">
              {t("home", "refTitle1")}
            </h3>
            <p className="mb-8 text-muted-foreground text-lg leading-relaxed max-w-lg">
              {t("home", "refDesc1")}
            </p>
            <div className="mt-auto group-hover:scale-105 transition-transform duration-500">
              <img
                src="/media/vibe.filesafe.space/1778931020193405557/attachments/12ea5c34-dace-4303-8cf4-f21c47723265.png"
                alt="Arvené"
                className="h-48 md:h-64 w-auto object-contain drop-shadow-xl"
              />
            </div>
          </div>

          <div
            className="flex flex-col items-center text-center group cursor-pointer hover:bg-card p-8 rounded-3xl transition-all duration-500 hover:shadow-xl"
            onClick={() =>
              window.open("https://matou-kfz-express.de/", "_blank")
            }
          >
            <h3 className="mb-6 text-2xl font-bold md:text-4xl text-secondary group-hover:text-primary transition-colors">
              {matouTitle}
            </h3>
            <p className="mb-8 text-muted-foreground text-lg leading-relaxed max-w-lg">
              {matouDesc}
            </p>
            <div className="mt-auto group-hover:scale-105 transition-transform duration-500">
              <img
                src="/media/vibe.filesafe.space/1779266194699726281/attachments/f908adde-363b-424a-9efa-c58282ea44bb.jpg"
                alt="Matou Kfz Schilder Express"
                className="h-36 md:h-48 w-auto object-contain drop-shadow-xl rounded-2xl"
              />
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};
