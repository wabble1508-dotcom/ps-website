// Automatische Antwort-Mail an Kunden nach dem Kontaktformular – passend zum gewählten Anliegen.
// Texte auf Deutsch, Englisch und Türkisch (alle anderen Sprachen bekommen Englisch).
// Hier können Texte, Links und nächste Schritte je Anliegen angepasst werden.

const SITE = "https://ps-professional-solutions.de";
const WHATSAPP = "https://wa.me/4915207595260";

type Lang = "de" | "en" | "tr";
type T = Record<Lang, string>;

type Topic = { label: T; intro: T; steps: T[]; link: string; linkLabel: T };

export const TOPICS: Record<string, Topic> = {
  website: {
    label: { de: "Website", en: "Website", tr: "Web sitesi" },
    intro: {
      de: "schön, dass Sie sich für eine neue Website interessieren! Unsere Websites sind programmiert statt aus dem Baukasten – schnell, für Google vorbereitet und perfekt auf dem Smartphone. Los geht es ab 49 € im Monat mit 0 € Einrichtung, monatlich kündbar.",
      en: "great to hear you're interested in a new website! Our websites are hand-coded rather than built with a site builder – fast, ready for Google and perfect on smartphones. Prices start at €49 a month with €0 setup, cancellable monthly.",
      tr: "yeni bir web sitesiyle ilgilenmenize çok sevindik! Sitelerimiz site oluşturucuyla değil, kodlanarak yapılır – hızlı, Google'a hazır ve akıllı telefonda kusursuz. Fiyatlar aylık 49 €'dan başlar, kurulum 0 €, aylık iptal edilebilir.",
    },
    steps: [
      { de: "Wir schauen uns Ihre Anfrage an und melden uns innerhalb von 24 Stunden (werktags).", en: "We'll review your request and get back to you within 24 hours (on working days).", tr: "Talebinizi inceleyip iş günlerinde 24 saat içinde size döneceğiz." },
      { de: "Halten Sie gern Logo, ein paar Fotos und Ihre wichtigsten Infos (Leistungen, Öffnungszeiten) bereit.", en: "Feel free to have your logo, a few photos and your key information (services, opening hours) ready.", tr: "Logonuzu, birkaç fotoğrafı ve temel bilgilerinizi (hizmetler, çalışma saatleri) hazır tutabilirsiniz." },
      { de: "Danach erhalten Sie ein verbindliches Angebot – erst dann entstehen Kosten.", en: "You'll then receive a binding quote – costs only arise after that.", tr: "Ardından bağlayıcı bir teklif alırsınız – maliyet ancak bundan sonra oluşur." },
    ],
    link: "/guenstige-website",
    linkLabel: { de: "Website-Pakete ansehen", en: "View website packages", tr: "Web sitesi paketlerini gör" },
  },
  app: {
    label: { de: "App-Entwicklung", en: "App development", tr: "Uygulama geliştirme" },
    intro: {
      de: "vielen Dank für Ihr Interesse an einer eigenen App! Wir entwickeln Web-Apps sowie iOS- und Android-Apps – vom klickbaren Prototyp bis zur Veröffentlichung im App Store. Beispiele sind die App SkyJoin und die Plattform WebsiteNova.",
      en: "thank you for your interest in your own app! We develop web apps as well as iOS and Android apps – from a clickable prototype to publishing in the app stores. Examples include the SkyJoin app and the WebsiteNova platform.",
      tr: "kendi uygulamanıza gösterdiğiniz ilgi için teşekkürler! Web uygulamaları ile iOS ve Android uygulamaları geliştiriyoruz – tıklanabilir prototipten mağazada yayına kadar. Örnekler: SkyJoin uygulaması ve WebsiteNova platformu.",
    },
    steps: [
      { de: "Wir melden uns innerhalb von 24 Stunden (werktags) für ein kostenloses Erstgespräch.", en: "We'll contact you within 24 hours (on working days) for a free initial consultation.", tr: "Ücretsiz ilk görüşme için iş günlerinde 24 saat içinde size ulaşacağız." },
      { de: "Notieren Sie gern die wichtigsten Funktionen und für wen die App gedacht ist.", en: "Feel free to note down the key features and who the app is for.", tr: "Temel özellikleri ve uygulamanın kimin için olduğunu not edebilirsiniz." },
      { de: "Sie erhalten ein verbindliches Festpreis-Angebot. Projekte starten ab 4.900 €.", en: "You'll receive a binding fixed-price quote. Projects start at €4,900.", tr: "Bağlayıcı sabit fiyat teklifi alırsınız. Projeler 4.900 €'dan başlar." },
    ],
    link: "/app-entwicklung",
    linkLabel: { de: "Mehr zur App-Entwicklung", en: "More about app development", tr: "Uygulama geliştirme hakkında" },
  },
  software: {
    label: { de: "Software-Entwicklung", en: "Software development", tr: "Yazılım geliştirme" },
    intro: {
      de: "vielen Dank für Ihre Anfrage zur Software-Entwicklung! Ob Kundenportal, internes Tool, Schnittstelle oder KI-Automatisierung – wir entwickeln Software, die genau zu Ihren Abläufen passt.",
      en: "thank you for your software development enquiry! Whether a customer portal, internal tool, integration or AI automation – we build software that fits your processes exactly.",
      tr: "yazılım geliştirme talebiniz için teşekkürler! Müşteri portalı, dahili araç, entegrasyon veya AI otomasyonu – süreçlerinize tam uyan yazılımlar geliştiriyoruz.",
    },
    steps: [
      { de: "Wir melden uns innerhalb von 24 Stunden (werktags) für ein kostenloses Erstgespräch.", en: "We'll contact you within 24 hours (on working days) for a free initial consultation.", tr: "Ücretsiz ilk görüşme için iş günlerinde 24 saat içinde size ulaşacağız." },
      { de: "Beschreiben Sie gern kurz, welche Abläufe heute von Hand laufen und welche Programme Sie nutzen.", en: "Feel free to briefly describe which processes are done by hand today and which programs you use.", tr: "Bugün hangi işlerin elle yapıldığını ve hangi programları kullandığınızı kısaca anlatabilirsiniz." },
      { de: "Sie erhalten ein verbindliches Angebot – kleine Automatisierungen nach Aufwand, Projekte ab 4.900 €.", en: "You'll receive a binding quote – small automations based on effort, projects from €4,900.", tr: "Bağlayıcı bir teklif alırsınız – küçük otomasyonlar emeğe göre, projeler 4.900 €'dan." },
    ],
    link: "/software-entwicklung",
    linkLabel: { de: "Mehr zur Software-Entwicklung", en: "More about software development", tr: "Yazılım geliştirme hakkında" },
  },
  chat: {
    label: { de: "KI-Live-Chat", en: "AI live chat", tr: "AI canlı sohbet" },
    intro: {
      de: "danke für Ihr Interesse am KI-Live-Chat! Er beantwortet die Fragen Ihrer Website-Besucher rund um die Uhr, sammelt Anfragen und kann Termine buchen – trainiert mit den Informationen Ihres Betriebs. Testen Sie ihn gern direkt auf unserer Website (Sprechblase unten rechts).",
      en: "thanks for your interest in the AI live chat! It answers your website visitors' questions around the clock, collects enquiries and can book appointments – trained on your business information. Feel free to try it on our website (chat bubble at the bottom right).",
      tr: "AI canlı sohbete ilginiz için teşekkürler! Sitenizin ziyaretçilerinin sorularını 7/24 yanıtlar, talepleri toplar ve randevu alabilir – işletmenizin bilgileriyle eğitilir. Sitemizde hemen deneyebilirsiniz (sağ alttaki sohbet balonu).",
    },
    steps: [
      { de: "Wir melden uns innerhalb von 24 Stunden (werktags).", en: "We'll get back to you within 24 hours (on working days).", tr: "İş günlerinde 24 saat içinde size döneceğiz." },
      { de: "Der KI-Chat ist im Business-Paket ab 129 € im Monat enthalten.", en: "The AI chat is included in the Business package from €129 a month.", tr: "AI sohbet aylık 129 €'dan başlayan Business paketine dahildir." },
    ],
    link: "/ki-live-chat",
    linkLabel: { de: "Mehr zum KI-Live-Chat", en: "More about the AI live chat", tr: "AI canlı sohbet hakkında" },
  },
  telefon: {
    label: { de: "KI-Telefonassistent", en: "AI phone assistant", tr: "AI telefon asistanı" },
    intro: {
      de: "danke für Ihr Interesse am KI-Telefonassistenten! Er nimmt Anrufe rund um die Uhr an, beantwortet Fragen und bucht Termine direkt in Ihren Kalender – damit kein Anruf und kein Auftrag mehr verloren geht.",
      en: "thanks for your interest in the AI phone assistant! It answers calls around the clock, handles questions and books appointments straight into your calendar – so you never miss a call or a job again.",
      tr: "AI telefon asistanına ilginiz için teşekkürler! Aramaları 7/24 yanıtlar, soruları cevaplar ve randevuları doğrudan takviminize kaydeder – böylece hiçbir arama ve iş kaçmaz.",
    },
    steps: [
      { de: "Wir melden uns innerhalb von 24 Stunden (werktags) und zeigen Ihnen gern eine Demo.", en: "We'll get back to you within 24 hours (on working days) and are happy to show you a demo.", tr: "İş günlerinde 24 saat içinde size dönüp memnuniyetle bir demo gösteririz." },
      { de: "Das Paket „Business + KI-Telefon“ startet bei 249 € im Monat inkl. 300 Telefonminuten.", en: "The \"Business + AI phone\" package starts at €249 a month incl. 300 call minutes.", tr: "\"Business + AI Telefon\" paketi aylık 249 €'dan başlar, 300 dakika dahil." },
    ],
    link: "/ki-telefon-assistent",
    linkLabel: { de: "Mehr zum KI-Telefonassistenten", en: "More about the AI phone assistant", tr: "AI telefon asistanı hakkında" },
  },
  termine: {
    label: { de: "Online-Terminbuchung", en: "Online booking", tr: "Online randevu" },
    intro: {
      de: "danke für Ihr Interesse an der Online-Terminbuchung! Ihre Kunden buchen rund um die Uhr selbst, bekommen automatisch eine Erinnerung – und Sie haben weniger Ausfälle und weniger Telefonate.",
      en: "thanks for your interest in online booking! Your customers book around the clock, get automatic reminders – and you have fewer no-shows and fewer calls.",
      tr: "online randevuya ilginiz için teşekkürler! Müşterileriniz 7/24 kendileri randevu alır, otomatik hatırlatma alır – siz de daha az iptal ve daha az telefonla uğraşırsınız.",
    },
    steps: [
      { de: "Wir melden uns innerhalb von 24 Stunden (werktags).", en: "We'll get back to you within 24 hours (on working days).", tr: "İş günlerinde 24 saat içinde size döneceğiz." },
      { de: "Die Online-Terminbuchung ist im Business-Paket ab 129 € im Monat enthalten.", en: "Online booking is included in the Business package from €129 a month.", tr: "Online randevu aylık 129 €'dan başlayan Business paketine dahildir." },
    ],
    link: "/intelligente-termin-automation",
    linkLabel: { de: "Mehr zur Terminbuchung", en: "More about online booking", tr: "Online randevu hakkında" },
  },
  google: {
    label: { de: "Google & SEO", en: "Google & SEO", tr: "Google ve SEO" },
    intro: {
      de: "danke für Ihre Anfrage zu Google und SEO! Mit einem vollständigen Google-Unternehmensprofil, einer technisch sauberen Website und echten Bewertungen werden Sie in Ihrer Region besser gefunden.",
      en: "thanks for your Google and SEO enquiry! With a complete Google Business Profile, a technically clean website and genuine reviews, you'll be found more easily in your area.",
      tr: "Google ve SEO talebiniz için teşekkürler! Eksiksiz bir Google İşletme Profili, teknik olarak temiz bir site ve gerçek yorumlarla bölgenizde daha kolay bulunursunuz.",
    },
    steps: [
      { de: "Wir melden uns innerhalb von 24 Stunden (werktags).", en: "We'll get back to you within 24 hours (on working days).", tr: "İş günlerinde 24 saat içinde size döneceğiz." },
      { de: "Schicken Sie uns gern den Link zu Ihrem Google-Eintrag oder Ihrer Website, dann schauen wir vorab drauf.", en: "Feel free to send us the link to your Google listing or website so we can take a look in advance.", tr: "Google kaydınızın veya sitenizin bağlantısını gönderirseniz önceden göz atabiliriz." },
    ],
    link: "/google-business-optimierung",
    linkLabel: { de: "Mehr zur Google-Optimierung", en: "More about Google optimisation", tr: "Google optimizasyonu hakkında" },
  },
  design: {
    label: { de: "Design, Druck & NFC-Karten", en: "Design, print & NFC cards", tr: "Tasarım, baskı ve NFC kartları" },
    intro: {
      de: "danke für Ihre Anfrage zu Design und Druck! Ob Visitenkarten, Flyer, Banner, Speisekarten oder NFC-Bewertungskarten – Sie bekommen Design und Druck aus einer Hand.",
      en: "thanks for your design and print enquiry! Whether business cards, flyers, banners, menus or NFC review cards – you get design and printing from one source.",
      tr: "tasarım ve baskı talebiniz için teşekkürler! Kartvizit, el ilanı, afiş, menü veya NFC değerlendirme kartı – tasarım ve baskı tek elden.",
    },
    steps: [
      { de: "Wir melden uns innerhalb von 24 Stunden (werktags) mit Rückfragen zu Menge und Format.", en: "We'll get back to you within 24 hours (on working days) with questions about quantity and format.", tr: "İş günlerinde 24 saat içinde adet ve format sorularıyla size döneceğiz." },
      { de: "Wenn vorhanden, schicken Sie uns gern Ihr Logo als Antwort auf diese E-Mail.", en: "If you have one, feel free to send us your logo in reply to this email.", tr: "Varsa logonuzu bu e-postaya yanıt olarak gönderebilirsiniz." },
    ],
    link: "/design-druck",
    linkLabel: { de: "Mehr zu Design & Druck", en: "More about design & print", tr: "Tasarım ve baskı hakkında" },
  },
  crm: {
    label: { de: "CRM & Automatisierung", en: "CRM & automation", tr: "CRM ve otomasyon" },
    intro: {
      de: "danke für Ihr Interesse an CRM und Automatisierung! Gemeinsam mit unserem Partner Une Solutions bringen wir Kontakte, Anfragen und Termine an einen Ort – mit automatischen Erinnerungen und Follow-ups.",
      en: "thanks for your interest in CRM and automation! Together with our partner Une Solutions we bring contacts, enquiries and appointments into one place – with automatic reminders and follow-ups.",
      tr: "CRM ve otomasyona ilginiz için teşekkürler! Ortağımız Une Solutions ile kişileri, talepleri ve randevuları tek yerde topluyoruz – otomatik hatırlatmalar ve takiplerle.",
    },
    steps: [
      { de: "Wir melden uns innerhalb von 24 Stunden (werktags) für ein kostenloses Erstgespräch.", en: "We'll contact you within 24 hours (on working days) for a free initial consultation.", tr: "Ücretsiz ilk görüşme için iş günlerinde 24 saat içinde size ulaşacağız." },
    ],
    link: "/all-in-one-dashboard",
    linkLabel: { de: "Mehr zum CRM", en: "More about the CRM", tr: "CRM hakkında" },
  },
  sonstiges: {
    label: { de: "Allgemeine Anfrage", en: "General enquiry", tr: "Genel talep" },
    intro: {
      de: "vielen Dank für Ihre Nachricht! Wir haben sie erhalten und kümmern uns persönlich darum.",
      en: "thank you for your message! We have received it and will take care of it personally.",
      tr: "mesajınız için çok teşekkürler! Aldık ve kişisel olarak ilgileneceğiz.",
    },
    steps: [{ de: "Wir melden uns innerhalb von 24 Stunden (werktags).", en: "We'll get back to you within 24 hours (on working days).", tr: "İş günlerinde 24 saat içinde size döneceğiz." }],
    link: "/preise",
    linkLabel: { de: "Unsere Leistungen & Preise", en: "Our services & prices", tr: "Hizmetlerimiz ve fiyatlar" },
  },
};

const UI = {
  subject: { de: "Ihre Anfrage: {topic} – PS Professional Solutions", en: "Your enquiry: {topic} – PS Professional Solutions", tr: "Talebiniz: {topic} – PS Professional Solutions" },
  hello: { de: "Hallo {name},", en: "Hello {name},", tr: "Merhaba {name}," },
  next: { de: "So geht es weiter", en: "What happens next", tr: "Sonraki adımlar" },
  book: { de: "Gleich einen Termin wählen", en: "Pick an appointment now", tr: "Hemen randevu seç" },
  bookText: {
    de: "Sie möchten nicht warten? Wählen Sie direkt einen Termin für Ihr kostenloses Erstgespräch:",
    en: "Don't want to wait? Choose a time for your free initial consultation right away:",
    tr: "Beklemek istemiyor musunuz? Ücretsiz ilk görüşmeniz için hemen bir zaman seçin:",
  },
  whatsapp: { de: "Oder schreiben Sie uns per WhatsApp:", en: "Or message us on WhatsApp:", tr: "Ya da bize WhatsApp'tan yazın:" },
  regards: { de: "Viele Grüße\nPankaj Mondjal\nPS Professional Solutions", en: "Best regards\nPankaj Mondjal\nPS Professional Solutions", tr: "Saygılarımızla\nPankaj Mondjal\nPS Professional Solutions" },
  footer: {
    de: "Diese E-Mail wurde automatisch versendet, weil Sie das Kontaktformular auf ps-professional-solutions.de ausgefüllt haben. Sie können einfach auf diese E-Mail antworten.",
    en: "This email was sent automatically because you filled in the contact form on ps-professional-solutions.de. You can simply reply to this email.",
    tr: "Bu e-posta, ps-professional-solutions.de üzerindeki iletişim formunu doldurduğunuz için otomatik olarak gönderildi. Bu e-postayı yanıtlayabilirsiniz.",
  },
};

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const autoReply = (topicId: string, language: string, name: string) => {
  const lang: Lang = !language || language === "de" ? "de" : language === "tr" ? "tr" : "en";
  const topic = TOPICS[topicId] || TOPICS.sonstiges;
  const t = (x: T) => x[lang];
  const subject = t(UI.subject).replace("{topic}", t(topic.label));
  const hello = t(UI.hello).replace("{name}", name);
  const link = `${SITE}${topic.link}`;
  const bookLink = `${SITE}/analyse-bestaetigungen`;

  const text = [
    hello,
    "",
    t(topic.intro),
    "",
    `${t(UI.next)}:`,
    ...topic.steps.map((s) => `– ${t(s)}`),
    "",
    `${t(topic.linkLabel)}: ${link}`,
    `${t(UI.bookText)} ${bookLink}`,
    `${t(UI.whatsapp)} ${WHATSAPP}`,
    "",
    t(UI.regards),
    "",
    "—",
    t(UI.footer),
  ].join("\n");

  const button = (href: string, label: string, color: string) =>
    `<a href="${href}" style="display:inline-block;background:${color};color:#ffffff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:999px;margin:4px 6px 4px 0">${esc(label)}</a>`;

  const html = `<!doctype html><html><body style="margin:0;background:#f4f8f9;font-family:Arial,Helvetica,sans-serif;color:#143642">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f8f9;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden">
<tr><td style="background:linear-gradient(135deg,#143642,#1e9fae);background-color:#143642;padding:28px 32px;color:#ffffff">
<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#7ee3ee;font-weight:700">${esc(t(topic.label))}</div>
<div style="font-size:22px;font-weight:700;margin-top:6px">PS Professional Solutions</div></td></tr>
<tr><td style="padding:28px 32px;font-size:15px;line-height:1.6">
<p style="margin:0 0 14px">${esc(hello)}</p>
<p style="margin:0 0 18px">${esc(t(topic.intro))}</p>
<p style="margin:0 0 8px;font-weight:700">${esc(t(UI.next))}</p>
<ul style="margin:0 0 20px;padding-left:20px">${topic.steps.map((s) => `<li style="margin-bottom:6px">${esc(t(s))}</li>`).join("")}</ul>
<p style="margin:0 0 10px">${esc(t(UI.bookText))}</p>
<p style="margin:0 0 20px">${button(bookLink, t(UI.book), "#1e9fae")}${button(link, t(topic.linkLabel), "#143642")}</p>
<p style="margin:0 0 20px">${esc(t(UI.whatsapp))} <a href="${WHATSAPP}" style="color:#1e9fae;font-weight:700">WhatsApp</a></p>
<p style="margin:0;white-space:pre-line">${esc(t(UI.regards))}</p>
</td></tr>
<tr><td style="padding:16px 32px;background:#f4f8f9;font-size:12px;color:#5b7480;line-height:1.5">${esc(t(UI.footer))}<br>PS Professional Solutions · Lindenhorster Str. 185 · 44339 Dortmund · <a href="${SITE}" style="color:#5b7480">ps-professional-solutions.de</a></td></tr>
</table></td></tr></table></body></html>`;

  return { subject, text, html };
};
