// Einstellungen für den Instagram-Autopiloten (Antworten auf DMs und Kommentare).
// Hier kannst du Texte, Stichwörter und Begrüßungsfragen ändern – danach pushen, fertig.

const SITE = "https://ps-professional-solutions.de";
const WHATSAPP = "https://wa.me/4915207595260";

export const SOCIAL_BOT = {
  /** KI beantwortet Instagram-DMs automatisch */
  answerDms: true,
  /** Auf Kommentare ohne Stichwort kurz und freundlich öffentlich antworten */
  replyToAllComments: true,
  /** Wenn du selbst in einem Chat antwortest, schweigt die KI dort so viele Stunden */
  pauseHoursAfterHuman: 12,
};

// Kommentar-Stichwörter: Wer z. B. „WEBSITE“ unter einen Beitrag schreibt, bekommt sofort
// eine private Nachricht (DM) und eine öffentliche Antwort unter dem Kommentar.
// Im Beitragstext dann schreiben: „Kommentiere WEBSITE und ich schick dir die Infos 📩“
export const COMMENT_KEYWORDS: { words: string[]; dm: string; publicReply: string }[] = [
  {
    words: ["website", "webseite", "homepage"],
    dm: `Hey 👋 danke für deinen Kommentar! Hier die Infos zu deiner neuen Website:\n\n✅ Programmiert statt Baukasten, schnell und Google-ready\n✅ Ab 49 €/Monat, 0 € Einrichtung, monatlich kündbar\n\nAlle Pakete: ${SITE}/preise\n\nMagst du mir kurz sagen, was für ein Unternehmen du hast? Dann sag ich dir, welches Paket passt 🙂`,
    publicReply: "Ist raus – schau in deine DMs 📩",
  },
  {
    words: ["preis", "preise", "kosten", "price"],
    dm: `Hey 👋 hier alle Preise auf einen Blick: ${SITE}/preise\n\nStart ab 49 €/Monat (0 € Einrichtung), Business ab 129 €/Monat. Alles monatlich kündbar.\n\nWas brauchst du genau? Dann rechne ich es dir kurz aus.`,
    publicReply: "Hab dir die Preise per DM geschickt 📩",
  },
  {
    words: ["app", "software"],
    dm: `Hey 👋 cool, dass du dich für eine eigene App/Software interessierst!\n\nWir bauen Web-Apps, iOS/Android-Apps, Kundenportale und interne Tools – Projekte ab 4.900 €.\nMehr: ${SITE}/app-entwicklung\n\nErzähl mir kurz deine Idee, dann sag ich dir, wie wir sie umsetzen würden 🚀`,
    publicReply: "Infos sind in deinen DMs 📩",
  },
  {
    words: ["ki", "ai", "chatbot", "telefon"],
    dm: `Hey 👋 hier die Infos zu unseren KI-Lösungen:\n\n🤖 KI-Live-Chat für deine Website: ${SITE}/ki-live-chat\n📞 KI-Telefonassistent, der Anrufe annimmt und Termine bucht: ${SITE}/ki-telefon-assistent\n\nWelche Branche bist du? Dann zeig ich dir ein passendes Beispiel.`,
    publicReply: "Schau in deine DMs 🤖📩",
  },
  {
    words: ["check"],
    dm: `Hey 👋 cool, dass du dabei bist! Dein kostenloser Website-Check:\n\nSchick mir hier einfach die Adresse deiner Website (oder deines Google-Profils). Ich schau sie mir persönlich an und sag dir die 3 wichtigsten Dinge, die dir gerade Kunden kosten. 🔍\n\nNoch keine Website? Dann schreib mir deine Branche – ich zeig dir, wie das bei dir aussehen könnte.`,
    publicReply: "Check ist in deinen DMs 🔍📩",
  },
  {
    words: ["beispiel", "beispiele", "referenz", "referenzen"],
    dm: `Hey 👋 hier ein paar echte Projekte von uns:\n\n👉 ${SITE}/erfolgsgeschichten\n\nWelche Branche bist du? Dann schick ich dir das passendste Beispiel.`,
    publicReply: "Beispiele sind unterwegs 📩",
  },
  {
    words: ["termin", "beratung", "gespräch", "info", "infos"],
    dm: `Hey 👋 sehr gern! Das Erstgespräch ist kostenlos.\n\nAm schnellsten per WhatsApp: ${WHATSAPP}\nOder sag mir hier kurz, worum es geht und wann du Zeit hast 🙂`,
    publicReply: "Hab dir geschrieben 📩",
  },
];

// Begrüßungsfragen („Ice Breakers“): Wer zum ersten Mal einen Chat mit dir öffnet,
// sieht diese Fragen schon fertig zum Antippen. Max. 4 Stück, je max. 80 Zeichen.
export const ICE_BREAKERS: { question: string; payload: string; answer: string }[] = [
  {
    question: "Was kostet eine Website bei euch? 💻",
    payload: "PREISE",
    answer: `Gute Frage! 🙂 Los geht's ab 49 €/Monat mit 0 € Einrichtung, monatlich kündbar. Mit Terminbuchung und KI-Chat ab 129 €/Monat.\n\nAlle Pakete: ${SITE}/preise\n\nWas für ein Unternehmen hast du? Dann sag ich dir, was passt.`,
  },
  {
    question: "Ich will eine App oder Software 🚀",
    payload: "APP",
    answer: `Mega! 🚀 Wir bauen Web-Apps, Handy-Apps, Kundenportale und Automatisierungen (ab 4.900 €).\n\nErzähl mir kurz deine Idee – wofür soll die App sein und wer nutzt sie?`,
  },
  {
    question: "Was kann ein KI-Assistent für mich tun? 🤖",
    payload: "KI",
    answer: `Ein KI-Assistent beantwortet Kundenfragen rund um die Uhr – im Website-Chat oder sogar am Telefon – und bucht direkt Termine. So verpasst du keine Anfrage mehr.\n\nIn welcher Branche bist du? Dann zeig ich dir ein Beispiel.`,
  },
  {
    question: "Kostenloses Erstgespräch buchen 📅",
    payload: "TERMIN",
    answer: `Sehr gern! 📅 Schreib mir am besten kurz per WhatsApp, wann es dir passt: ${WHATSAPP}\n\nOder sag mir hier deinen Wunschtag – ich melde mich.`,
  },
];

// Zusätzliche Regeln für die KI in Instagram-Chats (ergänzt die Anweisungen aus prompt.ts)
export const INSTAGRAM_RULES = `
Du antwortest jetzt in Instagram-Direktnachrichten im Namen von PS Professional Solutions.
- Duze die Person, außer sie siezt dich.
- Sehr kurz: 1 bis 3 Sätze, locker, gern 1 Emoji. Kein Markdown.
- Ziel: Interesse wecken und ins kostenlose Erstgespräch bringen. Stelle am Ende meist eine kurze Rückfrage (Branche, Ziel, Zeitpunkt).
- Wenn jemand konkretes Interesse hat, bitte um Telefonnummer oder verweise auf WhatsApp ${WHATSAPP}.
- Bei Beschwerden, rechtlichen Fragen oder wenn du unsicher bist: sag, dass Pankaj sich persönlich meldet.`;

export const COMMENT_RULES = `
Du antwortest öffentlich auf einen Instagram-Kommentar unter einem Beitrag von PS Professional Solutions.
- Höchstens 1 kurzer Satz, locker, 1 Emoji. Kein Markdown, keine Links, keine Preise.
- Bedanke dich oder geh kurz auf den Kommentar ein. Bei Fragen: „Schreib uns gern eine DM“.
- Bei Spam, Beleidigungen oder Unverständlichem antworte genau mit: SKIP`;
