import type { FeatureTextContent, LanguageCode } from "./types";

export const terminAutomation: Record<string, FeatureTextContent> = {
  de: {
    seo: {
      title: "Intelligente Termin-Automation — PS Professional Solutions",
      description:
        "Schluss mit dem Hin-und-Her-Schreiben. Ihr Kalender füllt sich von alleine, inklusive automatischer Erinnerung für Ihre Kunden.",
    },
    hero: {
      title: "Termine buchen, während Sie schlafen.",
      highlight: "100% ohne Telefon-Ping-Pong",
      subtitle:
        "Schluss mit dem Hin-und-Her-Schreiben. Ihr Kalender füllt sich von alleine, inklusive automatischer Erinnerung für Ihre Kunden.",
    },
    problem: {
      items: [
        {
          title: "Termin-Ping-Pong:",
          description:
            "Stundenlange Absprachen per E-Mail oder Telefon verschwenden wertvolle Arbeitszeit.",
        },
        {
          title: "Teure Ausfälle:",
          description:
            "Ohne automatisierte Erinnerungen riskieren Sie unbezahlte 'No-Shows' und leere Zeitslots.",
        },
        {
          title: "Umsatzverlust:",
          description:
            "Kunden, die nicht sofort online buchen können, wechseln frustriert zur Konkurrenz.",
        },
      ],
      buttonText: "Jetzt Strategie-Check Buchen",
    },
    solution: {
      title: "Die intelligente KI-Automatisierung für Ihr Unternehmen",
      checkmarks: [
        { text: "Echte Zeitersparnis" },
        { text: "Ausfall-Schutz" },
        { text: "Direkt-Umsatz" },
      ],
      cards: [
        {
          title: "Zeitoptimierung",
          description:
            "Sagt 'Hin-und-Her' ade. Wir automatisieren alles – von der ersten Anfrage bis zur Bestätigung per SMS.",
        },
        {
          title: "Verbindliche Buchung",
          description:
            "Automatische Anzahlungen und Reminder minimieren unbezahlte 'No-Shows'.",
        },
        {
          title: "Volle Klassen",
          description:
            "Ihr Kalender füllt sich von allein, während Sie sich auf Ihre Arbeit konzentrieren.",
        },
      ],
    },
    einsatzgebiete: [
      { title: "Handwerk & Bau" },
      { title: "Beauty & Wellness" },
      { title: "Gesundheitswesen & Praxen" },
      { title: "Studios & Fitness" },
    ],
    videoTestimonial: {
      title: "Erfahrungsbericht Handwerk",
      description:
        "Wie wir für diesen Betrieb die Anfragen und Termine verdoppelt haben.",
    },
    faqs: [
      {
        question: "Wie synchronisiert sich das System mit meinem Kalender?",
        answer:
          "Unser System bietet eine nahtlose Live-Synchronisation mit Google Calendar, Outlook und Apple iCloud. Sobald ein Kunde online bucht, wird der Termin automatisch blockiert, sodass keine Doppelbuchungen entstehen können.",
      },
      {
        question: "Was passiert, wenn ein Kunde seinen Termin vergisst?",
        answer:
          "Um teure Terminausfälle (No-Shows) zu vermeiden, verschickt unser System automatisierte SMS-Erinnerungen und WhatsApp-Notifications. Das steigert die Verbindlichkeit und reduziert Ausfälle um bis zu 80%.",
      },
      {
        question: "Kann ich für Buchungen direkt eine Anzahlung verlangen?",
        answer:
          "Ja, absolut. Sie können eine integrierte Anzahlungsfunktion aktivieren. Kunden zahlen eine Reservierungsgebühr direkt bei der Buchung via Stripe oder PayPal. Das sichert Ihren Umsatz und minimiert das Risiko unbezahlter Ausfallzeiten.",
      },
      {
        question: "Muss ich meine bestehende Webseite dafür aufgeben?",
        answer:
          "Nein. Das Online-Buchungsportal lässt sich ganz einfach als Button oder Widget in Ihre vorhandene Webseite einbauen oder als eigenständige Landingpage nutzen. Wir von PS Professional Solutions kümmern uns um die komplette technische Einbindung.",
      },
    ],
  },
  en: {
    seo: {
      title: "Intelligent Appointment Automation — PS Professional Solutions",
      description:
        "No more back-and-forth writing. Your calendar fills up on its own, including automatic reminders for your customers.",
    },
    hero: {
      title: "Book appointments while you sleep.",
      highlight: "100% without phone ping-pong",
      subtitle:
        "No more back-and-forth writing. Your calendar fills up on its own, including automatic reminders for your customers.",
    },
    problem: {
      items: [
        {
          title: "Appointment Ping-Pong:",
          description:
            "Hours of arrangements via email or phone waste valuable working time.",
        },
        {
          title: "Expensive Cancellations:",
          description:
            "Without automated reminders, you risk unpaid 'no-shows' and empty time slots.",
        },
        {
          title: "Loss of Revenue:",
          description:
            "Customers who cannot book online immediately switch to the competition in frustration.",
        },
      ],
      buttonText: "Book Strategy Check Now",
    },
    solution: {
      title: "The intelligent AI automation for your business",
      checkmarks: [
        { text: "Real Time Savings" },
        { text: "Failure Protection" },
        { text: "Direct Revenue" },
      ],
      cards: [
        {
          title: "Time Optimization",
          description:
            "Say goodbye to 'back-and-forth'. We automate everything – from the first inquiry to confirmation via SMS.",
        },
        {
          title: "Binding Booking",
          description:
            "Automatic deposits and reminders minimize unpaid 'no-shows'.",
        },
        {
          title: "Full Classes",
          description:
            "Your calendar fills up on its own while you concentrate on your work.",
        },
      ],
    },
    einsatzgebiete: [
      { title: "Crafts & Construction" },
      { title: "Beauty & Wellness" },
      { title: "Healthcare & Practices" },
      { title: "Studios & Fitness" },
    ],
    videoTestimonial: {
      title: "Customer Testimonial Craftsmen",
      description:
        "How we doubled inquiries and appointments for this company.",
    },
    faqs: [
      {
        question: "How does the system synchronize with my calendar?",
        answer:
          "Our system offers seamless live synchronization with Google Calendar, Outlook, and Apple iCloud. As soon as a customer books online, the appointment is automatically blocked so that no double bookings can occur.",
      },
      {
        question: "What happens if a customer forgets their appointment?",
        answer:
          "To avoid expensive appointment cancellations (no-shows), our system sends automated SMS reminders and WhatsApp notifications. This increases commitment and reduces cancellations by up to 80%.",
      },
      {
        question: "Can I directly request a deposit for bookings?",
        answer:
          "Yes, absolutely. You can activate an integrated deposit function. Customers pay a reservation fee directly upon booking via Stripe or PayPal. This secures your revenue and minimizes the risk of unpaid downtime.",
      },
      {
        question: "Do I have to give up my existing website for this?",
        answer:
          "No. The online booking portal can easily be integrated as a button or widget into your existing website or used as an independent landing page. We at PS Professional Solutions take care of the complete technical integration.",
      },
    ],
  },
  es: {
    seo: {
      title: "Automatización Inteligente de Citas — PS Professional Solutions",
      description:
        "Se acabó el ir y venir. Su calendario se llena solo, incluyendo recordatorios automáticos para sus clientes.",
    },
    hero: {
      title: "Reserve citas mientras duerme.",
      highlight: "100% sin ping-pong telefónico",
      subtitle:
        "Se acabó el ir y venir. Su calendario se llena solo, incluyendo recordatorios automáticos para sus clientes.",
    },
    problem: {
      items: [
        {
          title: "Ping-pong de citas:",
          description:
            "Horas de arreglos por email o teléfono desperdician valioso tiempo de trabajo.",
        },
        {
          title: "Cancelaciones costosas:",
          description:
            "Sin recordatorios automáticos, arriesga 'no-shows' no pagados y huecos vacíos.",
        },
        {
          title: "Pérdida de ingresos:",
          description:
            "Los clientes que no pueden reservar online inmediatamente cambian a la competencia frustrados.",
        },
      ],
      buttonText: "Reservar revisión de estrategia ahora",
    },
    solution: {
      title: "La automatización de IA inteligente para su empresa",
      checkmarks: [
        { text: "Ahorro real de tiempo" },
        { text: "Protección contra fallos" },
        { text: "Ingresos directos" },
      ],
      cards: [
        {
          title: "Optimización de tiempo",
          description:
            "Adiós al 'ir y venir'. Automatizamos todo – desde la primera consulta hasta la confirmación por SMS.",
        },
        {
          title: "Reserva vinculante",
          description:
            "Depósitos y recordatorios automáticos minimizan los 'no-shows' no pagados.",
        },
        {
          title: "Clases llenas",
          description:
            "Su calendario se llena solo mientras se concentra en su trabajo.",
        },
      ],
    },
    einsatzgebiete: [
      { title: "Artesanía y Construcción" },
      { title: "Belleza y Bienestar" },
      { title: "Salud y Consultorios" },
      { title: "Estudios y Fitness" },
    ],
    videoTestimonial: {
      title: "Testimonio de cliente – Artesano",
      description: "Cómo duplicamos consultas y citas para esta empresa.",
    },
    faqs: [
      {
        question: "¿Cómo se sincroniza el sistema con mi calendario?",
        answer:
          "Nuestro sistema ofrece sincronización en vivo perfecta con Google Calendar, Outlook y Apple iCloud. En cuanto un cliente reserva online, la cita se bloquea automáticamente, evitando dobles reservas.",
      },
      {
        question: "¿Qué pasa si un cliente olvida su cita?",
        answer:
          "Para evitar cancelaciones costosas (no-shows), nuestro sistema envía recordatorios automáticos por SMS y notificaciones de WhatsApp. Esto aumenta el compromiso y reduce las cancelaciones hasta un 80%.",
      },
      {
        question: "¿Puedo exigir un depósito directamente al reservar?",
        answer:
          "Sí, absolutamente. Puede activar una función de depósito integrada. Los clientes pagan una tarifa de reserva al reservar vía Stripe o PayPal. Esto asegura sus ingresos y minimiza el riesgo de tiempo no pagado.",
      },
      {
        question: "¿Tengo que renunciar a mi sitio web actual para esto?",
        answer:
          "No. El portal de reservas online se puede integrar fácilmente como botón o widget en su sitio web actual o usarse como landing page independiente. En PS Professional Solutions nos encargamos de la integración técnica completa.",
      },
    ],
  },
  fr: {
    seo: {
      title:
        "Automatisation Intelligente des Rendez-vous — PS Professional Solutions",
      description:
        "Fini les allers-retours. Votre calendrier se remplit tout seul, y compris des rappels automatiques pour vos clients.",
    },
    hero: {
      title: "Prenez des rendez-vous pendant que vous dormez.",
      highlight: "100% sans ping-pong téléphonique",
      subtitle:
        "Fini les allers-retours. Votre calendrier se remplit tout seul, y compris des rappels automatiques pour vos clients.",
    },
    problem: {
      items: [
        {
          title: "Ping-pong de rendez-vous :",
          description:
            "Des heures d'arrangements par email ou téléphone gaspillent un temps de travail précieux.",
        },
        {
          title: "Annulations coûteuses :",
          description:
            "Sans rappels automatiques, vous risquez des 'no-shows' non payés et des créneaux vides.",
        },
        {
          title: "Perte de revenu :",
          description:
            "Les clients qui ne peuvent pas réserver en ligne immédiatement vont chez la concurrence par frustration.",
        },
      ],
      buttonText: "Réserver la vérification de stratégie maintenant",
    },
    solution: {
      title: "L'automatisation IA intelligente pour votre entreprise",
      checkmarks: [
        { text: "Vraie économie de temps" },
        { text: "Protection contre les pannes" },
        { text: "Revenu direct" },
      ],
      cards: [
        {
          title: "Optimisation du temps",
          description:
            "Adieu les 'allers-retours'. Nous automatisons tout – de la première demande à la confirmation par SMS.",
        },
        {
          title: "Réservation engageante",
          description:
            "Les dépôts et rappels automatiques minimisent les 'no-shows' non payés.",
        },
        {
          title: "Classes pleines",
          description:
            "Votre calendrier se remplit tout seul pendant que vous vous concentrez sur votre travail.",
        },
      ],
    },
    einsatzgebiete: [
      { title: "Artisanat et Construction" },
      { title: "Beauté et Bien-être" },
      { title: "Santé et Cabinets" },
      { title: "Studios et Fitness" },
    ],
    videoTestimonial: {
      title: "Témoignage client – Artisan",
      description:
        "Comment nous avons doublé les demandes et rendez-vous pour cette entreprise.",
    },
    faqs: [
      {
        question:
          "Comment le système se synchronise-t-il avec mon calendrier ?",
        answer:
          "Notre système offre une synchronisation en direct fluide avec Google Agenda, Outlook et Apple iCloud. Dès qu'un client réserve en ligne, le rendez-vous est automatiquement bloqué, évitant les doubles réservations.",
      },
      {
        question: "Que se passe-t-il si un client oublie son rendez-vous ?",
        answer:
          "Pour éviter les annulations coûteuses (no-shows), notre système envoie des rappels SMS automatiques et des notifications WhatsApp. Cela augmente l'engagement et réduit les annulations jusqu'à 80%.",
      },
      {
        question:
          "Puis-je exiger un acompte directement lors de la réservation ?",
        answer:
          "Oui, absolument. Vous pouvez activer une fonction d'acompte intégrée. Les clients paient des frais de réservation lors de la réservation via Stripe ou PayPal. Cela sécurise vos revenus et minimise le risque de temps mort non payé.",
      },
      {
        question: "Dois-je abandonner mon site web actuel pour cela ?",
        answer:
          "Non. Le portail de réservation en ligne peut être facilement intégré comme bouton ou widget sur votre site web actuel ou utilisé comme landing page indépendante. Nous chez PS Professional Solutions nous occupons de l'intégration technique complète.",
      },
    ],
  },
  it: {
    seo: {
      title:
        "Automazione Intelligente degli Appuntamenti — PS Professional Solutions",
      description:
        "Basta andirivieni. Il tuo calendario si riempie da solo, inclusi promemoria automatici per i clienti.",
    },
    hero: {
      title: "Prenota appuntamenti mentre dormi.",
      highlight: "100% senza ping-pong telefonico",
      subtitle:
        "Basta andirivieni. Il tuo calendario si riempie da solo, inclusi promemoria automatici per i clienti.",
    },
    problem: {
      items: [
        {
          title: "Ping-pong di appuntamenti:",
          description:
            "Ore di accordi via email o telefono sprecano tempo di lavoro prezioso.",
        },
        {
          title: "Cancellazioni costose:",
          description:
            "Senza promemoria automatici, rischi 'no-show' non pagati e slot vuoti.",
        },
        {
          title: "Perdita di ricavo:",
          description:
            "I clienti che non possono prenotare online immediatamente passano alla concorrenza per frustrazione.",
        },
      ],
      buttonText: "Prenota verifica strategica ora",
    },
    solution: {
      title: "L'automazione IA intelligente per la tua azienda",
      checkmarks: [
        { text: "Vero risparmio di tempo" },
        { text: "Protezione da guasti" },
        { text: "Ricavo diretto" },
      ],
      cards: [
        {
          title: "Ottimizzazione del tempo",
          description:
            "Addio 'andirivieni'. Automatizziamo tutto – dalla prima richiesta alla conferma via SMS.",
        },
        {
          title: "Prenotazione vincolante",
          description:
            "Depositi e promemoria automatici minimizzano i 'no-show' non pagati.",
        },
        {
          title: "Classi piene",
          description:
            "Il tuo calendario si riempie da solo mentre ti concentri sul lavoro.",
        },
      ],
    },
    einsatzgebiete: [
      { title: "Artigianato e Costruzioni" },
      { title: "Bellezza e Benessere" },
      { title: "Sanità e Studi" },
      { title: "Studi e Fitness" },
    ],
    videoTestimonial: {
      title: "Testimonianza cliente – Artigiano",
      description:
        "Come abbiamo raddoppiato richieste e appuntamenti per questa azienda.",
    },
    faqs: [
      {
        question: "Come si sincronizza il sistema con il mio calendario?",
        answer:
          "Il nostro sistema offre sincronizzazione live perfetta con Google Calendar, Outlook e Apple iCloud. Appena un cliente prenota online, l'appuntamento viene bloccato automaticamente, evitando doppie prenotazioni.",
      },
      {
        question: "Cosa succede se un cliente dimentica l'appuntamento?",
        answer:
          "Per evitare cancellazioni costose (no-show), il nostro sistema invia promemoria SMS automatici e notifiche WhatsApp. Questo aumenta l'impegno e riduce le cancellazioni fino all'80%.",
      },
      {
        question:
          "Posso richiedere un deposito direttamente alla prenotazione?",
        answer:
          "Sì, assolutamente. Puoi attivare una funzione di deposito integrata. I clienti pagano una tariffa di prenotazione al momento della prenotazione tramite Stripe o PayPal. Questo protegge i tuoi ricavi e minimizza il rischio di tempo morto non pagato.",
      },
      {
        question: "Devo rinunciare al mio sito web attuale per questo?",
        answer:
          "No. Il portale di prenotazione online può essere facilmente integrato come pulsante o widget nel tuo sito web attuale o usato come landing page indipendente. Noi di PS Professional Solutions ci occupiamo della completa integrazione tecnica.",
      },
    ],
  },
  pt: {
    seo: {
      title: "Automação Inteligente de Agendamento — PS Professional Solutions",
      description:
        "Chega de troca de mensagens. Sua agenda se preenche sozinha, incluindo lembretes automáticos para seus clientes.",
    },
    hero: {
      title: "Agende compromissos enquanto dorme.",
      highlight: "100% sem ping-pong telefônico",
      subtitle:
        "Chega de troca de mensagens. Sua agenda se preenche sozinha, incluindo lembretes automáticos para seus clientes.",
    },
    problem: {
      items: [
        {
          title: "Ping-Pong de Agendamento:",
          description:
            "Horas de arranjos por email ou telefone desperdiçam tempo de trabalho valioso.",
        },
        {
          title: "Cancelamentos Caros:",
          description:
            "Sem lembretes automáticos, você arrisca 'no-shows' não pagos e horários vazios.",
        },
        {
          title: "Perda de Receita:",
          description:
            "Clientes que não podem agendar online imediatamente mudam para a concorrência frustrados.",
        },
      ],
      buttonText: "Reserve verificação de estratégia agora",
    },
    solution: {
      title: "A automação de IA inteligente para sua empresa",
      checkmarks: [
        { text: "Economia real de tempo" },
        { text: "Proteção contra falhas" },
        { text: "Receita direta" },
      ],
      cards: [
        {
          title: "Otimização de Tempo",
          description:
            "Adeus à 'troca de mensagens'. Automatizamos tudo – da primeira consulta à confirmação por SMS.",
        },
        {
          title: "Agendamento Vinculativo",
          description:
            "Depósitos e lembretes automáticos minimizam 'no-shows' não pagos.",
        },
        {
          title: "Turmas Lotadas",
          description:
            "Sua agenda se preenche sozinha enquanto você se concentra no trabalho.",
        },
      ],
    },
    einsatzgebiete: [
      { title: "Artesanato e Construção" },
      { title: "Beleza e Bem-estar" },
      { title: "Saúde e Consultórios" },
      { title: "Estúdios e Fitness" },
    ],
    videoTestimonial: {
      title: "Depoimento de Cliente – Artesão",
      description: "Como dobramos consultas e agendamentos para esta empresa.",
    },
    faqs: [
      {
        question: "Como o sistema sincroniza com minha agenda?",
        answer:
          "Nosso sistema oferece sincronização ao vivo perfeita com Google Agenda, Outlook e Apple iCloud. Assim que um cliente agenda online, o compromisso é bloqueado automaticamente, evitando agendamentos duplos.",
      },
      {
        question: "O que acontece se um cliente esquecer o compromisso?",
        answer:
          "Para evitar cancelamentos caros (no-shows), nosso sistema envia lembretes automáticos por SMS e notificações por WhatsApp. Isso aumenta o comprometimento e reduz cancelamentos em até 80%.",
      },
      {
        question: "Posso exigir um depósito diretamente ao agendar?",
        answer:
          "Sim, absolutamente. Você pode ativar uma função de depósito integrada. Os clientes pagam uma taxa de reserva ao agendar via Stripe ou PayPal. Isso protege sua receita e minimiza o risco de tempo ocioso não pago.",
      },
      {
        question: "Preciso abrir mão do meu site atual para isso?",
        answer:
          "Não. O portal de agendamento online pode ser facilmente integrado como um botão ou widget ao seu site atual ou usado como uma landing page independente. Nós da PS Professional Solutions cuidamos da integração técnica completa.",
      },
    ],
  },
  pl: {
    seo: {
      title: "Inteligentna automatyzacja terminów — PS Professional Solutions",
      description:
        "Koniec z pisaniem w obie strony. Twój kalendarz wypełnia się sam, w tym automatyczne przypomnienia dla klientów.",
    },
    hero: {
      title: "Umawiaj terminy, gdy śpisz.",
      highlight: "100% bez telefonicznego ping-ponga",
      subtitle:
        "Koniec z pisaniem w obie strony. Twój kalendarz wypełnia się sam, w tym automatyczne przypomnienia dla klientów.",
    },
    problem: {
      items: [
        {
          title: "Ping-pong terminów:",
          description:
            "Godziny ustaleń przez e-mail lub telefon marnują cenny czas pracy.",
        },
        {
          title: "Koszowne anulowania:",
          description:
            "Bez automatycznych przypomnień ryzykujesz niezapłacone 'nieobecności' i puste sloty.",
        },
        {
          title: "Utrata przychodu:",
          description:
            "Klienci, którzy nie mogą od razu umówić się online, z frustracją przechodzą do konkurencji.",
        },
      ],
      buttonText: "Zarezerwuj sprawdzenie strategii teraz",
    },
    solution: {
      title: "Inteligentna automatyzacja AI dla Twojej firmy",
      checkmarks: [
        { text: "Prawdziwa oszczędność czasu" },
        { text: "Ochrona przed awariami" },
        { text: "Bezpośredni przychód" },
      ],
      cards: [
        {
          title: "Optymalizacja czasu",
          description:
            "Żegnaj 'w obie strony'. Automatyzujemy wszystko – od pierwszego zapytania po potwierdzenie SMS.",
        },
        {
          title: "Wiążąca rezerwacja",
          description:
            "Automatyczne depozyty i przypomnienia minimalizują niezapłacone 'nieobecności'.",
        },
        {
          title: "Pełne klasy",
          description:
            "Twój kalendarz wypełnia się sam, gdy skupiasz się na pracy.",
        },
      ],
    },
    einsatzgebiete: [
      { title: "Rzemiosło i budownictwo" },
      { title: "Uroda i wellness" },
      { title: "Ochrona zdrowia i gabinety" },
      { title: "Studia i fitness" },
    ],
    videoTestimonial: {
      title: "Opinia klienta – rzemieślnik",
      description: "Jak podwoiliśmy zapytania i terminy dla tej firmy.",
    },
    faqs: [
      {
        question: "Jak system synchronizuje się z moim kalendarzem?",
        answer:
          "Nasz system oferuje bezproblemową synchronizację na żywo z Google Calendar, Outlook i Apple iCloud. Gdy klient rezerwuje online, termin jest automatycznie blokowany, zapobiegając podwójnym rezerwacjom.",
      },
      {
        question: "Co się dzieje, gdy klient zapomni o terminie?",
        answer:
          "Aby uniknąć kosztownych anulacji (nieobecności), nasz system wysyła automatyczne przypomnienia SMS i powiadomienia WhatsApp. To zwiększa zaangażowanie i redukuje anulacje do 80%.",
      },
      {
        question: "Czy mogę żądać depozytu bezpośrednio przy rezerwacji?",
        answer:
          "Tak, absolutnie. Możesz aktywować zintegrowaną funkcję depozytu. Klienci płacą opłatę rezerwacyjną przy rezerwacji przez Stripe lub PayPal. To zabezpiecza Twój przychód i minimalizuje ryzyko niezapłaconego przestoju.",
      },
      {
        question: "Czy muszę zrezygnować z obecnej strony dla tego?",
        answer:
          "Nie. Portal rezerwacji online można łatwo zintegrować jako przycisk lub widget z Twoją obecną stroną lub używać jako niezależnej strony docelowej. My w PS Professional Solutions zajmujemy się pełną integracją techniczną.",
      },
    ],
  },
  tr: {
    seo: {
      title: "Akıllı Randevu Otomasyonu — PS Professional Solutions",
      description:
        "İleri-geri yazışmalara son. Takviminiz kendi kendine dolar, müşterileriniz için otomatik hatırlatma dahil.",
    },
    hero: {
      title: "Siz uyurken randevuları ayarlayın.",
      highlight: "%100 telefon ping-pongsuz",
      subtitle:
        "İleri-geri yazışmalara son. Takviminiz kendi kendine dolar, müşterileriniz için otomatik hatırlatma dahil.",
    },
    problem: {
      items: [
        {
          title: "Randevu Ping-Pongu:",
          description:
            "E-posta veya telefonla saatlerce anlaşmalar değerli çalışma zamanını boşa harcar.",
        },
        {
          title: "Pahalı İptaller:",
          description:
            "Otomatik hatırlatmalar olmadan, ödenmemiş 'gelmeyenler' ve boş zaman dilimleri riski taşırsınız.",
        },
        {
          title: "Gelir Kaybı:",
          description:
            "Hemen online randevu alamayan müşteriler hayal kırıklığıyla rakibe geçer.",
        },
      ],
      buttonText: "Strateji kontrolünü şimdi ayırın",
    },
    solution: {
      title: "İşletmeniz için akıllı yapay zeka otomasyonu",
      checkmarks: [
        { text: "Gerçek Zaman Tasarrufu" },
        { text: "Kesinti Koruması" },
        { text: "Doğrudan Gelir" },
      ],
      cards: [
        {
          title: "Zaman Optimizasyonu",
          description:
            "'İleri-geri'ye veda edin. Her şeyi otomatikleştiriyoruz – ilk talepten SMS ile onaya kadar.",
        },
        {
          title: "Bağlayıcı Rezervasyon",
          description:
            "Otomatik depozitolar ve hatırlatmalar ödenmemiş 'gelmeyenleri' en aza indirir.",
        },
        {
          title: "Dolu Sınıflar",
          description:
            "Siz çalışmanıza odaklanırken takviminiz kendi kendine dolar.",
        },
      ],
    },
    einsatzgebiete: [
      { title: "Zanaatkârlık & İnşaat" },
      { title: "Güzellik & Wellness" },
      { title: "Sağlık & Muayenehaneler" },
      { title: "Stüdyolar & Fitness" },
    ],
    videoTestimonial: {
      title: "Zanaatkârlar Müşteri Görüşü",
      description:
        "Bu şirket için talepleri ve randevuları nasıl ikiye katladık.",
    },
    faqs: [
      {
        question: "Sistem takvimimle nasıl senkronize olur?",
        answer:
          "Sistemimiz Google Calendar, Outlook ve Apple iCloud ile sorunsuz canlı senkronizasyon sunar. Müşteri online rezervasyon yaptığında randevu otomatik olarak bloke edilir, böylece çift rezervasyon oluşamaz.",
      },
      {
        question: "Müşteri randevusunu unutursa ne olur?",
        answer:
          "Pahalı randevu iptallerini (gelmemeler) önlemek için sistemimiz otomatik SMS hatırlatmaları ve WhatsApp bildirimleri gönderir. Bu, bağlılığı artırır ve iptalleri %80'e kadar azaltır.",
      },
      {
        question: "Rezervasyonlar için doğrudan depozito isteyebilir miyim?",
        answer:
          "Evet, kesinlikle. Entegre bir depozito fonksiyonunu etkinleştirebilirsiniz. Müşteriler rezervasyon sırasında Stripe veya PayPal ile rezervasyon ücretini öder. Bu, gelirinizi güvence altına alır ve ödenmemiş boş zaman riskini en aza indirir.",
      },
      {
        question: "Bunun için mevcut web sitemden vazgeçmem gerekiyor mu?",
        answer:
          "Hayır. Online rezervasyon portalı mevcut web sitenize bir buton veya widget olarak kolayca entegre edilebilir veya bağımsız bir açılış sayfası olarak kullanılabilir. PS Professional Solutions olarak teknik entegrasyonun tamamını üstleniyoruz.",
      },
    ],
  },
  ro: {
    seo: {
      title:
        "Automatizare Inteligentă a Programărilor — PS Professional Solutions",
      description:
        "Gata cu corespondența dus-întors. Calendarul tău se umple singur, inclusiv memento-uri automate pentru clienți.",
    },
    hero: {
      title: "Programează clienții în timp ce dormi.",
      highlight: "100% fără ping-pong telefonic",
      subtitle:
        "Gata cu corespondența dus-întors. Calendarul tău se umple singur, inclusiv memento-uri automate pentru clienți.",
    },
    problem: {
      items: [
        {
          title: "Ping-Pong de programări:",
          description:
            "Ore de aranjamente prin email sau telefon irosește timp de lucru valoros.",
        },
        {
          title: "Anulări costisitoare:",
          description:
            "Fără memento-uri automate, riscați 'absențe' neplătite și sloturi goale.",
        },
        {
          title: "Pierdere de venit:",
          description:
            "Clienții care nu pot programa online imediat trec la concurență din frustrare.",
        },
      ],
      buttonText: "Rezervă verificarea strategiei acum",
    },
    solution: {
      title: "Automatizarea AI inteligentă pentru afacerea ta",
      checkmarks: [
        { text: "Economisire reală de timp" },
        { text: "Protecție împotriva întreruperilor" },
        { text: "Venit direct" },
      ],
      cards: [
        {
          title: "Optimizarea timpului",
          description:
            "Spune adio 'dus-întors'. Automatizăm totul – de la prima solicitare până la confirmarea prin SMS.",
        },
        {
          title: "Rezervare obligatorie",
          description:
            "Avansurile și memento-urile automate minimizează 'absențele' neplătite.",
        },
        {
          title: "Clase pline",
          description:
            "Calendarul tău se umple singur în timp ce te concentrezi pe muncă.",
        },
      ],
    },
    einsatzgebiete: [
      { title: "Meserii & Construcții" },
      { title: "Beauty & Wellness" },
      { title: "Sănătate & Cabinete" },
      { title: "Studii & Fitness" },
    ],
    videoTestimonial: {
      title: "Mărturie Client Meseriaș",
      description:
        "Cum am dublat solicitările și programările pentru această companie.",
    },
    faqs: [
      {
        question: "Cum se sincronizează sistemul cu calendarul meu?",
        answer:
          "Sistemul nostru oferă sincronizare live perfectă cu Google Calendar, Outlook și Apple iCloud. De îndată ce un client programează online, programarea este blocată automat, astfel încât nu pot apărea dubluri.",
      },
      {
        question: "Ce se întâmplă dacă un client își uită programarea?",
        answer:
          "Pentru a evita anulările costisitoare (absențe), sistemul nostru trimite memento-uri SMS automate și notificări WhatsApp. Asta crește angajamentul și reduce anulările cu până la 80%.",
      },
      {
        question: "Pot cere direct un avans pentru rezervări?",
        answer:
          "Da, absolut. Poți activa o funcție de avans integrată. Clienții plătesc o taxă de rezervare direct la programare prin Stripe sau PayPal. Asta îți securizează venitul și minimizează riscul timpului neplătit.",
      },
      {
        question: "Trebuie să renunț la site-ul meu existent pentru asta?",
        answer:
          "Nu. Portalul de programare online poate fi integrat ușor ca buton sau widget în site-ul tău existent sau folosit ca pagină de destinație independentă. Noi la PS Professional Solutions ne ocupăm de întreaga integrare tehnică.",
      },
    ],
  },
  ru: {
    seo: {
      title:
        "Интеллектуальная автоматизация записи — PS Professional Solutions",
      description:
        "Конец переписке туда-сюда. Ваш календарь заполняется сам, включая автоматические напоминания для клиентов.",
    },
    hero: {
      title: "Записывайте клиентов, пока спите.",
      highlight: "100% без телефонного пинг-понга",
      subtitle:
        "Конец переписке туда-сюда. Ваш календарь заполняется сам, включая автоматические напоминания для клиентов.",
    },
    problem: {
      items: [
        {
          title: "Пинг-понг записей:",
          description:
            "Часы согласований по email или телефону тратят ценное рабочее время.",
        },
        {
          title: "Дорогие отмены:",
          description:
            "Без автоматических напоминаний вы рискуете неоплаченными 'неявками' и пустыми слотами.",
        },
        {
          title: "Потеря дохода:",
          description:
            "Клиенты, которые не могут записаться онлайн немедленно, разочарованно уходят к конкурентам.",
        },
      ],
      buttonText: "Записаться на стратегическую проверку",
    },
    solution: {
      title: "Интеллектуальная ИИ-автоматизация для вашего бизнеса",
      checkmarks: [
        { text: "Реальная экономия времени" },
        { text: "Защита от сбоев" },
        { text: "Прямой доход" },
      ],
      cards: [
        {
          title: "Оптимизация времени",
          description:
            "Прощайте с «туда-сюда». Мы автоматизируем всё — от первого запроса до подтверждения по SMS.",
        },
        {
          title: "Обязательная запись",
          description:
            "Автоматические депозиты и напоминания минимизируют неоплаченные 'неявки'.",
        },
        {
          title: "Полные классы",
          description:
            "Ваш календарь заполняется сам, пока вы сосредоточены на работе.",
        },
      ],
    },
    einsatzgebiete: [
      { title: "Ремесло и строительство" },
      { title: "Красота и велнес" },
      { title: "Здравоохранение и клиники" },
      { title: "Студии и фитнес" },
    ],
    videoTestimonial: {
      title: "Отзыв клиента — ремесленник",
      description: "Как мы удвоили запросы и записи для этой компании.",
    },
    faqs: [
      {
        question: "Как система синхронизируется с моим календарём?",
        answer:
          "Наша система предлагает бесшовную живую синхронизацию с Google Calendar, Outlook и Apple iCloud. Как только клиент записывается онлайн, время автоматически блокируется, исключая двойные записи.",
      },
      {
        question: "Что происходит, если клиент забывает о записи?",
        answer:
          "Чтобы избежать дорогостоящих отмен (неявок), наша система отправляет автоматические SMS-напоминания и уведомления WhatsApp. Это повышает обязательность и снижает отмены до 80%.",
      },
      {
        question: "Могу ли я требовать депозит при записи?",
        answer:
          "Да, абсолютно. Вы можете активировать встроенную функцию депозита. Клиенты платят сбор за бронирование при записи через Stripe или PayPal. Это защищает ваш доход и минимизирует риск неоплаченного простоя.",
      },
      {
        question: "Нужно ли отказываться от существующего сайта?",
        answer:
          "Нет. Онлайн-портал записи легко интегрируется как кнопка или виджет на ваш существующий сайт или используется как самостоятельная лендинговая страница. Мы в PS Professional Solutions берём на себя полную техническую интеграцию.",
      },
    ],
  },
  bg: {
    seo: {
      title:
        "Интелигентна автоматизация на часовете — PS Professional Solutions",
      description:
        "Край на преписката натам-нататък. Календарът ви се запълва сам, включително автоматични напомняния за клиентите.",
    },
    hero: {
      title: "Записвайте клиенти, докато спите.",
      highlight: "100% без телефонен пинг-понг",
      subtitle:
        "Край на преписката натам-нататък. Календарът ви се запълва сам, включително автоматични напомняния за клиентите.",
    },
    problem: {
      items: [
        {
          title: "Пинг-понг на часовете:",
          description:
            "Часове уговорки по имейл или телефон губят ценно работно време.",
        },
        {
          title: "Скъпи отменяния:",
          description:
            "Без автоматични напомняния рискувате неплатени 'неявки' и празни часове.",
        },
        {
          title: "Загуба на приходи:",
          description:
            "Клиенти, които не могат да запишат веднага онлайн, разочаровани преминават към конкуренцията.",
        },
      ],
      buttonText: "Резервирайте стратегическа проверка сега",
    },
    solution: {
      title: "Интелигентната AI автоматизация за вашия бизнес",
      checkmarks: [
        { text: "Истинско спестяване на време" },
        { text: "Защита при прекъсвания" },
        { text: "Директен приход" },
      ],
      cards: [
        {
          title: "Оптимизация на времето",
          description:
            "Сбогом на 'натам-нататък'. Автоматизираме всичко – от първата заявка до потвърждение по SMS.",
        },
        {
          title: "Задължителна резервация",
          description:
            "Автоматичните депозити и напомняния минимизират неплатените 'неявки'.",
        },
        {
          title: "Пълни класове",
          description:
            "Календарът ви се запълва сам, докато се фокусирате върху работата си.",
        },
      ],
    },
    einsatzgebiete: [
      { title: "Занаяти и строителство" },
      { title: "Красота и уелнес" },
      { title: "Здравеопазване и кабинети" },
      { title: "Студиа и фитнес" },
    ],
    videoTestimonial: {
      title: "Отзив на клиент – занаятчия",
      description: "Как удвоихме заявките и часовете за тази компания.",
    },
    faqs: [
      {
        question: "Как системата се синхронизира с календара ми?",
        answer:
          "Нашата система предлага безпроблемна синхронизация на живо с Google Calendar, Outlook и Apple iCloud. Щом клиент запише час онлайн, той автоматично се блокира, така че не могат да възникнат двойни записи.",
      },
      {
        question: "Какво става, ако клиент забрави часа си?",
        answer:
          "За да избегнем скъпи отменяния (неявки), системата ни изпраща автоматични SMS напомняния и WhatsApp известия. Това увеличава ангажираността и намалява отменянията с до 80%.",
      },
      {
        question: "Мога ли да искам депозит директно при записване?",
        answer:
          "Да, абсолютно. Можете да активирате интегрирана функция за депозит. Клиентите плащат такса за резервация при записване чрез Stripe или PayPal. Това осигурява приходите ви и минимизира риска от неплатено време.",
      },
      {
        question: "Трябва ли да се откажа от съществуващия си сайт за това?",
        answer:
          "Не. Онлайн порталът за записване може лесно да се интегрира като бутон или widget във вашия съществуващ сайт или да се използва като самостоятелна landing страница. Ние в PS Professional Solutions се грижим за пълната техническа интеграция.",
      },
    ],
  },
  ar: {
    seo: {
      title: "أتمتة المواعيد الذكية — PS Professional Solutions",
      description:
        "وداعاً للمراسلات ذهاباً وإياباً. يملأ تقويمك نفسه، بما في ذلك التذكيرات التلقائية لعملائك.",
    },
    hero: {
      title: "احجز المواعيد بينما تنام.",
      highlight: "100% بدون تردد هاتفي",
      subtitle:
        "وداعاً للمراسلات ذهاباً وإياباً. يملأ تقويمك نفسه، بما في ذلك التذكيرات التلقائية لعملائك.",
    },
    problem: {
      items: [
        {
          title: "تنسلق المواعيد:",
          description:
            "ساعات من الترتيبات عبر البريد الإلكتروني أو الهاتف تهدر وقت عمل قيماً.",
        },
        {
          title: "إلغاءات مكلفة:",
          description:
            "بدون تذكيرات تلقائية، تخاطر بـ'عدم الحضور' غير المدفوع ومواعيد فارغة.",
        },
        {
          title: "خسارة الإيرادات:",
          description:
            "العملاء الذين لا يستطيعون الحجز فوراً عبر الإنترنت ينتقلون إلى المنافسين بإحباط.",
        },
      ],
      buttonText: "احجز فحص الاستراتيجية الآن",
    },
    solution: {
      title: "أتمتة الذكاء الاصطناعي الذكية لشركتك",
      checkmarks: [
        { text: "توفير حقيقي للوقت" },
        { text: "حماية من الانقطاعات" },
        { text: "دخل مباشر" },
      ],
      cards: [
        {
          title: "تحسين الوقت",
          description:
            "وداعاً لـ'الذهاب والإياب'. نؤتمت كل شيء – من أول استفسار إلى التأكيد عبر الرسائل القصيرة.",
        },
        {
          title: "حجز ملزم",
          description:
            "تقلل الودائع والتذكيرات التلقائية من 'عدم الحضور' غير المدفوع.",
        },
        {
          title: "فصول ممتلئة",
          description: "يملأ تقويمك نفسه بينما تركز على عملك.",
        },
      ],
    },
    einsatzgebiete: [
      { title: "الحرف والبناء" },
      { title: "الجمال والعافية" },
      { title: "الرعاية الصحية والعيادات" },
      { title: "الاستوديوهات واللياقة" },
    ],
    videoTestimonial: {
      title: "رأي عميل – حرفي",
      description: "كيف ضاعفنا الاستفسارات والمواعيد لهذه الشركة.",
    },
    faqs: [
      {
        question: "كيف يتزامن النظام مع تقويمي؟",
        answer:
          "يقدم نظامنا مزامنة حية سلسة مع Google Calendar وOutlook وApple iCloud. بمجرد حجز العميل عبر الإنترنت، يُحجب الموعد تلقائياً، مما يمنع الحجز المزدوج.",
      },
      {
        question: "ماذا يحدث إذا نسي العميل موعده؟",
        answer:
          "لتجنب الإلغاءات المكلفة (عدم الحضور)، يرسل نظامنا تذكيرات SMS تلقائية وإشعارات WhatsApp. هذا يزيد الالتزام ويقلل الإلغاءات بنسبة تصل إلى 80%.",
      },
      {
        question: "هل يمكنني طلب عربون مباشرة عند الحجز؟",
        answer:
          "نعم، بالتأكيد. يمكنك تفعيل وظيفة عربون مدمجة. يدفع العملاء رسوم حجز عند الحجز عبر Stripe أو PayPal. هذا يضمن إيراداتك ويقلل مخاطر الوقت غير المدفوع.",
      },
      {
        question: "هل يجب التخلي عن موقعي الحالي لهذا؟",
        answer:
          "لا. يمكن دمج بوابة الحجز عبر الإنترنت بسهولة كزر أو أداة في موقعك الحالي أو استخدامها كصفحة هبوط مستقلة. نحن في PS Professional Solutions نتكفل بالتكامل التقني الكامل.",
      },
    ],
  },
  hi: {
    seo: {
      title: "बुद्धिमान अपॉइंटमेंट स्वचालन — PS Professional Solutions",
      description:
        "आगे-पीछे लिखने का अंत। आपका कैलेंडर अपने आप भर जाता है, ग्राहकों के लिए स्वचालित रिमाइंडर सहित।",
    },
    hero: {
      title: "सोते समय अपॉइंटमेंट बुक करें।",
      highlight: "100% बिना फोन पिंग-पोंग",
      subtitle:
        "आगे-पीछे लिखने का अंत। आपका कैलेंडर अपने आप भर जाता है, ग्राहकों के लिए स्वचालित रिमाइंडर सहित।",
    },
    problem: {
      items: [
        {
          title: "अपॉइंटमेंट पिंग-पोंग:",
          description:
            "ईमेल या फोन से घंटों तक व्यवस्था करना कीमती कार्य समय बर्बाद करता है।",
        },
        {
          title: "महंगे रद्दीकरण:",
          description:
            "स्वचालित रिमाइंडर के बिना, आप अनपेड 'नो-शो' और खाली समय स्लॉट का जोखिम उठाते हैं।",
        },
        {
          title: "राजस्व हानि:",
          description:
            "जो ग्राहक तुरंत ऑनलाइन बुक नहीं कर सकते, वे निराश होकर प्रतिस्पर्धी के पास चले जाते हैं।",
        },
      ],
      buttonText: "अभी स्ट्रेटेजी चेक बुक करें",
    },
    solution: {
      title: "आपके व्यवसाय के लिए बुद्धिमान एआई स्वचालन",
      checkmarks: [
        { text: "असली समय बचत" },
        { text: "विफलता सुरक्षा" },
        { text: "प्रत्यक्ष राजस्व" },
      ],
      cards: [
        {
          title: "समय अनुकूलन",
          description:
            "'आगे-पीछे' को अलविदा कहें। हम सब कुछ स्वचालित करते हैं – पहली पूछताछ से लेकर SMS द्वारा पुष्टि तक।",
        },
        {
          title: "बाध्यकारी बुकिंग",
          description: "स्वचालित जमा और रिमाइंडर अनपेड 'नो-शो' को कम करते हैं।",
        },
        {
          title: "भरी कक्षाएं",
          description:
            "आप काम पर ध्यान केंद्रित करते हुए आपका कैलेंडर अपने आप भर जाता है।",
        },
      ],
    },
    einsatzgebiete: [
      { title: "शिल्प और निर्माण" },
      { title: "ब्यूटी और वेलनेस" },
      { title: "स्वास्थ्य और क्लीनिक" },
      { title: "स्टूडियो और फिटनेस" },
    ],
    videoTestimonial: {
      title: "ग्राहक प्रशंसा – शिल्पकार",
      description: "हमने इस कंपनी के लिए पूछताच और अपॉइंटमेंट कैसे दोगुने किए।",
    },
    faqs: [
      {
        question: "सिस्टम मेरे कैलेंडर से कैसे सिंक होता है?",
        answer:
          "हमारा सिस्टम Google Calendar, Outlook और Apple iCloud के साथ निर्बाध लाइव सिंक्रनाइज़ेशन प्रदान करता है। जैसे ही ग्राहक ऑनलाइन बुक करता है, अपॉइंटमेंट स्वचालित रूप से ब्लॉक हो जाता है, ताकि डबल बुकिंग न हो।",
      },
      {
        question: "अगर ग्राहक अपना अपॉइंटमेंट भूल जाए तो क्या होगा?",
        answer:
          "महंगे अपॉइंटमेंट रद्दीकरण (नो-शो) से बचने के लिए, हमारा सिस्टम स्वचालित SMS रिमाइंडर और WhatsApp सूचनाएँ भेजता है। इससे प्रतिबद्धता बढ़ती है और रद्दीकरण 80% तक कम होते हैं।",
      },
      {
        question: "क्या मैं बुकिंग के लिए सीधे एडवांस मांग सकता हूँ?",
        answer:
          "हाँ, बिल्कुल। आप एक एकीकृत एडवांस फ़ंक्शन सक्रिय कर सकते हैं। ग्राहक बुकिंग के समय Stripe या PayPal से आरक्षण शुल्क चुकाते हैं। इससे आपका राजस्व सुरक्षित होता है और अनपेड डाउनटाइम का जोखिम कम होता है।",
      },
      {
        question: "क्या मुझे इसके लिए अपनी मौजूदा वेबसाइट छोड़नी होगी?",
        answer:
          "नहीं। ऑनलाइन बुकिंग पोर्टल को आसानी से आपकी मौजूदा वेबसाइट में बटन या विजेट के रूप में एकीकृत किया जा सकता है या स्वतंत्र लैंडिंग पेज के रूप में उपयोग किया जा सकता है। हम PS Professional Solutions में पूर्ण तकनीकी एकीकरण का ध्यान रखते हैं।",
      },
    ],
  },
  zh: {
    seo: {
      title: "智能预约自动化 — PS Professional Solutions",
      description: "告别来回沟通。您的日历自动填满，包括为客户自动发送提醒。",
    },
    hero: {
      title: "睡觉时也能预约客户。",
      highlight: "100%无需电话来回沟通",
      subtitle: "告别来回沟通。您的日历自动填满，包括为客户自动发送提醒。",
    },
    problem: {
      items: [
        {
          title: "预约来回沟通：",
          description: "通过邮件或电话数小时的安排浪费宝贵的工作时间。",
        },
        {
          title: "昂贵的取消：",
          description: "没有自动提醒，您面临未付'爽约'和空置时段的风险。",
        },
        {
          title: "收入损失：",
          description: "无法立即在线预约的客户会沮丧地转向竞争对手。",
        },
      ],
      buttonText: "立即预约策略检查",
    },
    solution: {
      title: "为您企业打造的智能AI自动化",
      checkmarks: [
        { text: "真正节省时间" },
        { text: "故障保护" },
        { text: "直接收入" },
      ],
      cards: [
        {
          title: "时间优化",
          description: "告别'来回沟通'。我们自动化一切——从首次咨询到短信确认。",
        },
        {
          title: "约束性预订",
          description: "自动押金和提醒最大限度减少未付'爽约'。",
        },
        { title: "满员课程", description: "您专注于工作时，日历自动填满。" },
      ],
    },
    einsatzgebiete: [
      { title: "工艺与建筑" },
      { title: "美容与养生" },
      { title: "医疗与诊所" },
      { title: "工作室与健身" },
    ],
    videoTestimonial: {
      title: "客户评价 – 工匠",
      description: "我们如何为这家公司翻倍了咨询和预约。",
    },
    faqs: [
      {
        question: "系统如何与我的日历同步？",
        answer:
          "我们的系统提供与Google日历、Outlook和Apple iCloud的无缝实时同步。客户在线预约后，时间会自动锁定，避免重复预订。",
      },
      {
        question: "如果客户忘记预约怎么办？",
        answer:
          "为避免昂贵的取消（爽约），我们的系统会发送自动短信提醒和WhatsApp通知。这提高了履约率，减少取消高达80%。",
      },
      {
        question: "我可以要求预订时直接付押金吗？",
        answer:
          "是的，完全可以。您可以激活内置押金功能。客户在预订时通过Stripe或PayPal支付预订费。这保障了您的收入并最大限度减少未付空档的风险。",
      },
      {
        question: "我需要为此放弃现有网站吗？",
        answer:
          "不需要。在线预订门户可以轻松作为按钮或小部件集成到您现有网站中，或作为独立的落地页使用。我们PS Professional Solutions负责全部技术集成。",
      },
    ],
  },
  ja: {
    seo: {
      title: "スマート予約自動化 — PS Professional Solutions",
      description:
        "やり取りの終わり。カレンダーが自動的に埋まり、顧客への自動リマインダーも含まれます。",
    },
    hero: {
      title: "寝ている間に予約を取る。",
      highlight: "100%電話のピンポンなし",
      subtitle:
        "やり取りの終わり。カレンダーが自動的に埋まり、顧客への自動リマインダーも含まれます。",
    },
    problem: {
      items: [
        {
          title: "予約ピンポン：",
          description:
            "メールや電話での何時間もの調整が貴重な就業時間を無駄にします。",
        },
        {
          title: "高額なキャンセル：",
          description:
            "自動リマインダーがないと、未払いの「無断欠席」や空き枠のリスクがあります。",
        },
        {
          title: "収益の損失：",
          description:
            "すぐにオンライン予約できない顧客は不満を持って競合に移ります。",
        },
      ],
      buttonText: "今すぐ戦略チェックを予約",
    },
    solution: {
      title: "あなたのビジネスのためのスマートAI自動化",
      checkmarks: [
        { text: "本当の時間節約" },
        { text: "障害保護" },
        { text: "直接収入" },
      ],
      cards: [
        {
          title: "時間最適化",
          description:
            "「やり取り」にさよなら。最初の問い合わせからSMS確認まで、すべてを自動化します。",
        },
        {
          title: "拘束力のある予約",
          description:
            "自動デポジットとリマインダーが未払いの「無断欠席」を最小限にします。",
        },
        {
          title: "満員のクラス",
          description: "仕事に集中している間、カレンダーが自動的に埋まります。",
        },
      ],
    },
    einsatzgebiete: [
      { title: "職人と建設" },
      { title: "美容とウェルネス" },
      { title: "医療と診療所" },
      { title: "スタジオとフィットネス" },
    ],
    videoTestimonial: {
      title: "お客様の声 – 職人",
      description: "この会社の問い合わせと予約をどのように倍増させたか。",
    },
    faqs: [
      {
        question: "システムは私のカレンダーとどう同期しますか？",
        answer:
          "当社のシステムはGoogleカレンダー、Outlook、Apple iCloudとシームレスなライブ同期を提供します。顧客がオンライン予約すると、予約が自動的にブロックされ、二重予約を防ぎます。",
      },
      {
        question: "顧客が予約を忘れた場合はどうなりますか？",
        answer:
          "高額なキャンセル（無断欠席）を避けるため、当社のシステムは自動SMSリマインダーとWhatsApp通知を送信します。これにより約束率が上がり、キャンセルを最大80%削減します。",
      },
      {
        question: "予約時に直接デポジットを要求できますか？",
        answer:
          "はい、もちろんです。統合デポジット機能を有効化できます。顧客は予約時にStripeまたはPayPalで予約料を支払います。これにより収益を確保し、未払いのダウンタイムのリスクを最小限にします。",
      },
      {
        question: "このために既存のウェブサイトを諦める必要がありますか？",
        answer:
          "いいえ。オンライン予約ポータルは、既存のウェブサイトにボタンやウィジェットとして簡単に統合できるか、独立したランディングページとして使用できます。PS Professional Solutionsが完全な技術統合を担当します。",
      },
    ],
  },
  vi: {
    seo: {
      title: "Tự động hóa lịch hẹn thông minh — PS Professional Solutions",
      description:
        "Chấm dứt qua lại. Lịch của bạn tự lấp đầy, bao gồm nhắc nhở tự động cho khách hàng.",
    },
    hero: {
      title: "Đặt lịch hẹn trong khi bạn ngủ.",
      highlight: "100% không qua lại điện thoại",
      subtitle:
        "Chấm dứt qua lại. Lịch của bạn tự lấp đầy, bao gồm nhắc nhở tự động cho khách hàng.",
    },
    problem: {
      items: [
        {
          title: "Qua lại lịch hẹn:",
          description:
            "Giờ đồng hồ sắp xếp qua email hoặc điện thoại lãng phí thời gian làm việc quý báu.",
        },
        {
          title: "Hủy đắt đỏ:",
          description:
            "Không có nhắc nhở tự động, bạn rủi ro 'không đến' không được trả và khung giờ trống.",
        },
        {
          title: "Mất doanh thu:",
          description:
            "Khách không thể đặt lịch ngay trực tuyến chuyển sang đối thủ trong sự thất vọng.",
        },
      ],
      buttonText: "Đặt kiểm tra chiến lược ngay",
    },
    solution: {
      title: "Tự động hóa AI thông minh cho doanh nghiệp của bạn",
      checkmarks: [
        { text: "Tiết kiệm thời gian thực" },
        { text: "Bảo vệ gián đoạn" },
        { text: "Doanh thu trực tiếp" },
      ],
      cards: [
        {
          title: "Tối ưu thời gian",
          description:
            "Tạm biệt 'qua lại'. Chúng tôi tự động hóa mọi thứ – từ yêu cầu đầu tiên đến xác nhận qua SMS.",
        },
        {
          title: "Đặt lịch ràng buộc",
          description:
            "Tiền cọc và nhắc nhở tự động giảm thiểu 'không đến' không được trả.",
        },
        {
          title: "Lớp đầy",
          description:
            "Lịch của bạn tự lấp đầy trong khi bạn tập trung vào công việc.",
        },
      ],
    },
    einsatzgebiete: [
      { title: "Thợ thủ công & Xây dựng" },
      { title: "Thẩm mỹ & Chăm sóc sức khỏe" },
      { title: "Y tế & Phòng khám" },
      { title: "Studio & Thể hình" },
    ],
    videoTestimonial: {
      title: "Phản hồi khách hàng – Thợ thủ công",
      description:
        "Chúng tôi đã nhân đôi yêu cầu và lịch hẹn cho công ty này như thế nào.",
    },
    faqs: [
      {
        question: "Hệ thống đồng bộ với lịch của tôi như thế nào?",
        answer:
          "Hệ thống của chúng tôi cung cấp đồng bộ trực tiếp liền mạch với Google Calendar, Outlook và Apple iCloud. Ngay khi khách hàng đặt lịch trực tuyến, lịch hẹn được tự động khóa, ngăn đặt trùng.",
      },
      {
        question: "Điều gì xảy ra nếu khách hàng quên lịch hẹn?",
        answer:
          "Để tránh hủy đắt đỏ (không đến), hệ thống của chúng tôi gửi nhắc nhở SMS tự động và thông báo WhatsApp. Điều này tăng cam kết và giảm hủy lên đến 80%.",
      },
      {
        question: "Tôi có thể yêu cầu tiền cọc trực tiếp khi đặt lịch không?",
        answer:
          "Có, hoàn toàn. Bạn có thể kích hoạt chức năng tiền cọc tích hợp. Khách hàng trả phí đặt lịch khi đặt qua Stripe hoặc PayPal. Điều này bảo vệ doanh thu và giảm thiểu rủi ro thời gian chết không được trả.",
      },
      {
        question: "Tôi có phải từ bỏ trang web hiện tại cho việc này không?",
        answer:
          "Không. Cổng đặt lịch trực tuyến có thể dễ dàng tích hợp như nút hoặc widget vào trang web hiện có hoặc sử dụng như trang đích độc lập. Chúng tôi tại PS Professional Solutions đảm nhận toàn bộ tích hợp kỹ thuật.",
      },
    ],
  },
  fa: {
    seo: {
      title: "اتوماسیون هوشمند نوبت‌دهی — PS Professional Solutions",
      description:
        "خداحافظی با مکاتبات رفت‌وبرگشتی. تقویم شما خودش پر می‌شود، شامل یادآوری‌های خودکار برای مشتریان.",
    },
    hero: {
      title: "در حالی که خواب هستید نوبت‌ها را رزرو کنید.",
      highlight: "۱۰۰٪ بدون پینگ‌پونگ تلفنی",
      subtitle:
        "خداحافظی با مکاتبات رفت‌وبرگشتی. تقویم شما خودش پر می‌شود، شامل یادآوری‌های خودکار برای مشتریان.",
    },
    problem: {
      items: [
        {
          title: "پینگ‌پونگ نوبت:",
          description:
            "ساعت‌ها تنظیم از طریق ایمیل یا تلفن زمان کار ارزشمند را تلف می‌کند.",
        },
        {
          title: "لغو‌های پرهزینه:",
          description:
            "بدون یادآوری‌های خودکار، با 'عدم حضور' پرداخت‌نشده و زمان‌های خالی ریسک می‌کنید.",
        },
        {
          title: "ضرر درآمد:",
          description:
            "مشتریانی که نمی‌توانند بلافاصله آنلاین رزرو کنند با ناامیدی به رقیب می‌روند.",
        },
      ],
      buttonText: "همین حالا بررسی استراتژی رزرو کنید",
    },
    solution: {
      title: "اتوماسیون هوش مصنوعی هوشمند برای کسب‌وکار شما",
      checkmarks: [
        { text: "صرفه‌جویی واقعی زمان" },
        { text: "محافظت در برابر قطعی" },
        { text: "درآمد مستقیم" },
      ],
      cards: [
        {
          title: "بهینه‌سازی زمان",
          description:
            "خداحافظی با 'رفت‌وبرگشت'. همه چیز را اتوماتیک می‌کنیم – از اولین درخواست تا تأیید با SMS.",
        },
        {
          title: "رزرو الزام‌آور",
          description:
            "سپرده‌ها و یادآوری‌های خودکار 'عدم حضور' پرداخت‌نشده را به حداقل می‌رسانند.",
        },
        {
          title: "کلاس‌های پر",
          description:
            "تقویم شما خودش پر می‌شود در حالی که روی کارتان تمرکز می‌کنید.",
        },
      ],
    },
    einsatzgebiete: [
      { title: "صنایع دستی و ساخت‌وساز" },
      { title: "زیبایی و سلامت" },
      { title: "بهداشت و مطب‌ها" },
      { title: "استودیوها و تناسب اندام" },
    ],
    videoTestimonial: {
      title: "نظر مشتری – صنعتگر",
      description:
        "چگونه درخواست‌ها و نوبت‌ها را برای این شرکت دو برابر کردیم.",
    },
    faqs: [
      {
        question: "سیستم چگونه با تقویم من همگام می‌شود؟",
        answer:
          "سیستم ما همگام‌سازی زنده بی‌وقفه با Google Calendar، Outlook و Apple iCloud ارائه می‌دهد. به محض رزرو آنلاین مشتری، نوبت به‌طور خودکار مسدود می‌شود تا از رزرو مضاعف جلوگیری شود.",
      },
      {
        question: "اگر مشتری نوبت خود را فراموش کند چه می‌شود؟",
        answer:
          "برای جلوگیری از لغو‌های پرهزینه (عدم حضور)، سیستم ما یادآوری‌های SMS خودکار و اعلان‌های WhatsApp می‌فرستد. این تعهد را افزایش می‌دهد و لغو‌ها را تا ۸۰٪ کاهش می‌دهد.",
      },
      {
        question: "آیا می‌توانم هنگام رزرو مستقیماً سپرده درخواست کنم؟",
        answer:
          "بله، کاملاً. می‌توانید یک عملکرد سپرده یکپارچه را فعال کنید. مشتریان هنگام رزرو از طریق Stripe یا PayPal هزینه رزرو را می‌پردازند. این درآمد شما را تضمین می‌کند و ریسک زمان خالی پرداخت‌نشده را به حداقل می‌رساند.",
      },
      {
        question: "آیا باید برای این کار از وب‌سایت فعلی‌ام صرف‌نظر کنم؟",
        answer:
          "خیر. پورتال رزرو آنلاین می‌تواند به‌راحتی به‌عنوان دکمه یا ویجت در وب‌سایت فعلی شما ادغام شود یا به‌عنوان صفحه فرود مستقل استفاده شود. ما در PS Professional Solutions از ادغام فنی کامل مراقبت می‌کنیم.",
      },
    ],
  },
  ps: {
    seo: {
      title: "د هوښیار ناستې اتومات کول — PS Professional Solutions",
      description:
        "د راکړې ورکړې پای. ستاسو جنتیز پخپله ډکیږي، د پیرودونکو لپاره اتومات یادونو په شمول.",
    },
    hero: {
      title: "په داسې حال کې چې ویده یاست ناستې ونیسئ.",
      highlight: "۱۰۰٪ پرته د تلیفون پینګ پونګ",
      subtitle:
        "د راکړې ورکړې پای. ستاسو جنتیز پخپله ډکیږي، د پیرودونکو لپاره اتومات یادونو په شمول.",
    },
    problem: {
      items: [
        {
          title: "د ناستې پینګ پونګ:",
          description:
            "د بریښنالیک یا تلیفون له لارې ساعتونه ترتیب ارزښتناک د کار وخت ضایع کوي.",
        },
        {
          title: "ګران لغوه کول:",
          description:
            "پرته له اتومات یادونو، تاسو د 'نه راتګ' ناڅاپه او خالي وختونه خطروئ.",
        },
        {
          title: "د عاید ضرر:",
          description:
            "پیرودونکي چې سمدستي آنلاین نشي نیولی، په خفه کیدو سره سیال ته ځي.",
        },
      ],
      buttonText: "همدا اوس ستراتیژیک کتنه ونیسئ",
    },
    solution: {
      title: "ستاسو د سوداګرۍ لپاره هوښیار AIS اتومات کول",
      checkmarks: [
        { text: "ریښتینی د وخت سپمول" },
        { text: "د خنډ خوندیتوب" },
        { text: "مستقیم عاید" },
      ],
      cards: [
        {
          title: "د وخت سمون",
          description:
            "د 'راکړې ورکړې' خدای پاماني. هر څه اتومات کوو – له لومړۍ غوښتنې څخه تر SMS تایید پورې.",
        },
        {
          title: "اړین رزرویشن",
          description: "اتومات ډیپوزیټونه او یادونې 'نه راتګ' ناڅاپه کموي.",
        },
        {
          title: "ډکې ټولګۍ",
          description:
            "ستاسو جنتیز پخپله ډکیږي په داسې حال کې چې تاسو خپل کار ته توجه کوئ.",
        },
      ],
    },
    einsatzgebiete: [
      { title: "لاسي صنعتونه او جوړونې" },
      { title: "ښکلا او روغتیا" },
      { title: "روغتیا پالنه او کلینیکونه" },
      { title: "سټوډیوګانې او فټنس" },
    ],
    videoTestimonial: {
      title: "د پیرودونکي نظر – لاسي کار",
      description: "موږ څنګه د دې شرکت لپاره غوښتنې او ناستې دوچنده کړې.",
    },
    faqs: [
      {
        question: "سیستم زما د جنتیز سره څنګه همغږی کیږي؟",
        answer:
          "زموږ سیستم د Google Calendar، Outlook او Apple iCloud سره بې درګه ژوندۍ همغږي وړاندې کوي. له هغه چې پیرودونکی آنلاین ناسته ونیسي، ناسته په اتومات ډول بنډوله کیږي، ترڅو دوه ځله نیونه رامینځته نشي.",
      },
      {
        question: "که پیرودونکی خپله ناسته هیره کړي څه پیښیږي؟",
        answer:
          "د ګرانو لغوه کولو (نه راتګ) د مخنیوي لپاره، زموږ سیستم اتومات SMS یادونې او WhatsApp خبرتونې لېږي. دا ژمنتیا زیاتوي او لغوه کول تر ۸۰٪ پورې کموي.",
      },
      {
        question: "ایا کولی شم د نیولو لپاره مستقیم ډیپوزیټ وغواړم؟",
        answer:
          "هو، په بشپړ ډول. تاسو کولی شئ یوه یوځای شوي ډیپوزیټ فعالیت فعال کړئ. پیرودونکي د نیولو پر مهال د Stripe یا PayPal له لارې د رزرویشن فیس ورکوي. دا ستاسو عاید تضمینوي او د ناڅاپه وخت خطرونه کموي.",
      },
      {
        question: "ایا باید د دې لپاره خپله اوسنۍ ویبپاڼه پرېږدم؟",
        answer:
          "نه. آنلاین نیولو پورټال کولی شي په اسانۍ سره ستاسو په اوسنۍ ویبپاڼه کې د تڼۍ یا ویجټ په توګه یوځای شي یا د خپلواکې لینډینګ پاڼې په توګه وکارول شي. موږ په PS Professional Solutions کې له بشپړ تخنیکي یوځای کیدو څخه خبر یو.",
      },
    ],
  },
};
