import type { Service } from "./index";

/**
 * Онлайн записване: свободни часове по график, потвърждение и напомняне по имейл или SMS, Google Calendar.
 * Без измислени резултати и срокове; цената се казва след разговор.
 */
export const bookingService: Service = {
  id: "booking",
  key: "booking",
  visual: { vignette: "booking" },
  caseIcons: ["CalendarCheck", "Bell", "Users", "MapPin", "MessageCircle", "Workflow"],
  tag: null,
  accent: "#22D3EE",
  relatedPosts: [],
  includeIcons: [],
  forWhomIcons: [],
  content: {
    bg: {
      slug: "onlain-zapisvane",
      metaTitle: "Онлайн записване на часове за сайта ви | Rafetov.com",
      metaDescription:
        "Клиентът избира ден и час в сайта ви, получава потвърждение и напомняне по имейл или SMS, а вие виждате графика в Google Calendar. За салони, сервизи и лекари.",
      title: "Записване без телефонни обаждания",
      intro:
        "Клиентът избира свободен ден и час в сайта ви, получава потвърждение и напомняне, а вие виждате записа в календара си. Часовете следват вашия график и почивните ви дни. За салони, сервизи, лекари, огледи и консултации.",
      priceLine: "",
      cases: [
        { title: "Свободни часове по вашия график", text: "Задавате работно време, продължителност на всяка услуга и почивки. Клиентът вижда само часовете, които наистина са свободни." },
        { title: "Потвърждение и напомняне", text: "Клиентът получава потвърждение веднага и напомняне преди часа по имейл или SMS. По-малко пропуснати часове, без да звъните вие." },
        { title: "Няколко служители или места", text: "Всеки майстор, лекар или стол има свой график. Клиентът избира при кого да отиде или взема първия свободен." },
        { title: "Огледи на адрес", text: "Клиентът записва оглед и въвежда адреса и какво му трябва. Вие виждате в календара къде отивате и за какво." },
        { title: "Промяна и отказ от клиента", text: "Клиентът сам мести или отказва часа от линка в потвърждението. Часът се освобождава веднага за друг." },
        { title: "Синхронизация с Google Calendar", text: "Записите влизат в календара на телефона ви, а заетите часове от него се скриват в сайта. Един график, без двойни записвания." },
      ],
      includes: [],
      forWhom: [
        "Салони, студиа и фризьори с часове по цял ден",
        "Сервизи и автомивки с ограничени места",
        "Лекари, зъболекари, консултанти и терапевти",
        "Майстори и фирми, които правят огледи на адрес",
      ],
      steps: [
        { title: "Разговор за графика", text: "Разказвате ни как записвате сега: кои услуги, колко траят, кой ги извършва и кога почивате. Казваме ви кое може да се автоматизира и кое е по-добре да остане на телефона." },
        { title: "Настройка на услуги и екип", text: "Въвеждаме услугите, продължителността, служителите и работното време. Настройваме текстовете на потвърждението и напомнянето на вашия език." },
        { title: "Пускане на сайта и в Google", text: "Добавяме записването в сайта ви, в Google Business профила и като линк за Instagram и Facebook. Пробваме го с реални записвания." },
        { title: "Наблюдение и настройки", text: "След първите седмици гледаме кои часове се търсят и дали напомнянията стигат. Поправяме графика и текстовете според това, което виждате." },
      ],
      faq: [
        {
          q: "Може ли двама клиенти да запишат един и същи час?",
          a: "Не. Щом един час е зает, той изчезва от сайта за другите. Ако имате няколко служители, часът се затваря само при човека, който е зает.",
        },
        {
          q: "Какво става с клиентите, които звънят по телефона?",
          a: "Записвате ги сами в същия календар от телефона си. Сайтът веднага вижда, че часът е зает. Така хартиеният тефтер и онлайн записването не се разминават.",
        },
        {
          q: "Трябва ли ми нов сайт?",
          a: "Не. Записването се добавя към съществуващ сайт, а при нужда работи и само като отделна страница с линк за Google профила и социалните мрежи.",
        },
        {
          q: "Колко струва?",
          a: "Зависи от броя на услугите и служителите и от това дали искате SMS напомняния. Казваме ви фиксирана цена след безплатен разговор по телефон или Google Meet. Изпращането на SMS се плаща отделно на доставчика и го знаете предварително.",
        },
      ],
    },
    en: {
      slug: "online-booking-system",
      metaTitle: "Online booking system for your website | Rafetov.com",
      metaDescription:
        "The client picks a day and time on your site, gets a confirmation and reminder by email or SMS, and you see it in Google Calendar. For salons, workshops and clinics.",
      title: "Bookings without phone calls",
      intro:
        "The client picks a free day and time on your website, gets a confirmation and a reminder, and you see the booking in your calendar. The slots follow your schedule and your days off. For salons, workshops, clinics, site visits and consultations.",
      priceLine: "",
      cases: [
        { title: "Free slots based on your schedule", text: "You set opening hours, the duration of each service and breaks. The client sees only the slots that are really free." },
        { title: "Confirmation and reminder", text: "The client gets a confirmation straight away and a reminder before the appointment by email or SMS. Fewer missed appointments, without you making the calls." },
        { title: "Several staff or stations", text: "Each technician, practitioner or chair has its own schedule. The client chooses who to see or takes the first free slot." },
        { title: "Site visits at an address", text: "The client books a visit and enters the address and what they need. You see in your calendar where you are going and why." },
        { title: "Changes and cancellations by the client", text: "The client moves or cancels the appointment from the link in the confirmation. The slot is freed up straight away for someone else." },
        { title: "Sync with Google Calendar", text: "Bookings go into the calendar on your phone, and busy times from it are hidden on the site. One schedule, no double bookings." },
      ],
      includes: [],
      forWhom: [
        "Salons, studios and barbers with appointments all day",
        "Workshops and car washes with limited bays",
        "Doctors, dentists, consultants and therapists",
        "Tradespeople and companies that do site visits",
      ],
      steps: [
        { title: "A call about your schedule", text: "You tell us how you take bookings now: which services, how long they take, who does them and when you are closed. We tell you what can be automated and what is better left to the phone." },
        { title: "Setting up services and staff", text: "We enter the services, durations, staff and opening hours. We set the wording of the confirmation and reminder in your language." },
        { title: "Going live on your site and in Google", text: "We add the booking to your website, your Google Business Profile and as a link for Instagram and Facebook. We test it with real bookings." },
        { title: "Monitoring and adjustments", text: "After the first weeks we look at which slots are in demand and whether the reminders arrive. We adjust the schedule and the wording based on what you see." },
      ],
      faq: [
        {
          q: "Can two clients book the same slot?",
          a: "No. Once a slot is taken, it disappears from the site for everyone else. If you have several staff, the slot closes only for the person who is busy.",
        },
        {
          q: "What about clients who call by phone?",
          a: "You enter them yourself in the same calendar from your phone. The site sees straight away that the slot is taken. That way the paper diary and the online booking never drift apart.",
        },
        {
          q: "Do I need a new website?",
          a: "No. The booking is added to your existing website, and if needed it also works as a standalone page with a link for your Google profile and social media.",
        },
        {
          q: "How much does it cost?",
          a: "It depends on the number of services and staff and whether you want SMS reminders. We give you a fixed price after a free call by phone or Google Meet. SMS sending is paid separately to the provider, and you know it in advance.",
        },
      ],
    },
    de: {
      slug: "online-terminbuchung",
      metaTitle: "Online-Terminbuchung für Ihre Website | Rafetov.com",
      metaDescription:
        "Der Kunde wählt Tag und Uhrzeit auf Ihrer Website, bekommt Bestätigung und Erinnerung per E-Mail oder SMS, Sie sehen alles in Google Kalender. Für Salons und Praxen.",
      title: "Termine ohne Telefonate",
      intro:
        "Der Kunde wählt einen freien Tag und eine Uhrzeit auf Ihrer Website, bekommt Bestätigung und Erinnerung, und Sie sehen den Termin in Ihrem Kalender. Die Zeiten folgen Ihrem Plan und Ihren freien Tagen. Für Salons, Werkstätten, Praxen, Besichtigungen und Beratungen.",
      priceLine: "",
      cases: [
        { title: "Freie Zeiten nach Ihrem Plan", text: "Sie legen Öffnungszeiten, Dauer jeder Leistung und Pausen fest. Der Kunde sieht nur die Zeiten, die wirklich frei sind." },
        { title: "Bestätigung und Erinnerung", text: "Der Kunde bekommt sofort eine Bestätigung und vor dem Termin eine Erinnerung per E-Mail oder SMS. Weniger verpasste Termine, ohne dass Sie anrufen müssen." },
        { title: "Mehrere Mitarbeiter oder Plätze", text: "Jeder Mitarbeiter, Behandler oder Platz hat seinen eigenen Plan. Der Kunde wählt, zu wem er möchte, oder nimmt den ersten freien Termin." },
        { title: "Besichtigungen vor Ort", text: "Der Kunde bucht eine Besichtigung und gibt Adresse und Anliegen an. Sie sehen im Kalender, wohin Sie fahren und worum es geht." },
        { title: "Verschieben und Absagen durch den Kunden", text: "Der Kunde verschiebt oder sagt den Termin selbst über den Link in der Bestätigung ab. Die Zeit wird sofort für jemand anderen frei." },
        { title: "Abgleich mit Google Kalender", text: "Termine landen im Kalender auf Ihrem Handy, und belegte Zeiten daraus werden auf der Website ausgeblendet. Ein Plan, keine Doppelbuchungen." },
      ],
      includes: [],
      forWhom: [
        "Salons, Studios und Friseure mit Terminen den ganzen Tag",
        "Werkstätten und Waschanlagen mit begrenzten Plätzen",
        "Ärzte, Zahnärzte, Berater und Therapeuten",
        "Handwerker und Betriebe, die Besichtigungen vor Ort machen",
      ],
      steps: [
        { title: "Gespräch über Ihren Plan", text: "Sie erzählen uns, wie Sie heute Termine vergeben: welche Leistungen, wie lange sie dauern, wer sie ausführt und wann Sie geschlossen haben. Wir sagen Ihnen, was sich automatisieren lässt und was besser am Telefon bleibt." },
        { title: "Einrichtung von Leistungen und Team", text: "Wir tragen Leistungen, Dauer, Mitarbeiter und Öffnungszeiten ein. Die Texte für Bestätigung und Erinnerung richten wir in Ihrer Sprache ein." },
        { title: "Start auf der Website und bei Google", text: "Wir binden die Buchung in Ihre Website, Ihr Google-Unternehmensprofil und als Link für Instagram und Facebook ein. Wir testen sie mit echten Buchungen." },
        { title: "Begleitung und Feinschliff", text: "Nach den ersten Wochen sehen wir, welche Zeiten gefragt sind und ob die Erinnerungen ankommen. Wir passen Plan und Texte an das an, was Sie beobachten." },
      ],
      faq: [
        {
          q: "Können zwei Kunden denselben Termin buchen?",
          a: "Nein. Sobald ein Termin vergeben ist, verschwindet er für alle anderen von der Website. Bei mehreren Mitarbeitern wird die Zeit nur bei der Person gesperrt, die belegt ist.",
        },
        {
          q: "Was ist mit Kunden, die anrufen?",
          a: "Die tragen Sie selbst in denselben Kalender auf Ihrem Handy ein. Die Website sieht sofort, dass der Termin belegt ist. So laufen Terminbuch und Online-Buchung nie auseinander.",
        },
        {
          q: "Brauche ich eine neue Website?",
          a: "Nein. Die Buchung wird in Ihre bestehende Website eingebaut und funktioniert bei Bedarf auch als eigene Seite mit Link für Google-Profil und soziale Netzwerke.",
        },
        {
          q: "Was kostet das?",
          a: "Das hängt von der Zahl der Leistungen und Mitarbeiter ab und davon, ob Sie SMS-Erinnerungen möchten. Sie bekommen nach einem kostenlosen Gespräch per Telefon oder Google Meet einen Festpreis. Der SMS-Versand wird separat an den Anbieter gezahlt, und Sie kennen ihn vorab.",
        },
      ],
    },
    nl: {
      slug: "online-afspraken",
      metaTitle: "Online afspraken maken via uw website | Rafetov.com",
      metaDescription:
        "De klant kiest dag en uur op uw website, krijgt een bevestiging en herinnering per e-mail of sms, en u ziet alles in Google Agenda. Voor salons, garages en praktijken.",
      title: "Afspraken zonder telefoontjes",
      intro:
        "De klant kiest een vrije dag en een uur op uw website, krijgt een bevestiging en een herinnering, en u ziet de afspraak in uw agenda. De uren volgen uw planning en uw sluitingsdagen. Voor salons, garages, praktijken, plaatsbezoeken en consultaties.",
      priceLine: "",
      cases: [
        { title: "Vrije uren volgens uw planning", text: "U stelt openingsuren, de duur van elke dienst en pauzes in. De klant ziet alleen de uren die echt vrij zijn." },
        { title: "Bevestiging en herinnering", text: "De klant krijgt meteen een bevestiging en voor de afspraak een herinnering per e-mail of sms. Minder gemiste afspraken, zonder dat u moet bellen." },
        { title: "Meerdere medewerkers of plaatsen", text: "Elke medewerker, behandelaar of stoel heeft een eigen planning. De klant kiest bij wie hij wil of neemt het eerste vrije uur." },
        { title: "Plaatsbezoeken op adres", text: "De klant boekt een plaatsbezoek en geeft het adres en zijn vraag in. U ziet in uw agenda waar u naartoe gaat en waarvoor." },
        { title: "Verplaatsen en annuleren door de klant", text: "De klant verplaatst of annuleert de afspraak zelf via de link in de bevestiging. Het uur komt meteen vrij voor iemand anders." },
        { title: "Synchronisatie met Google Agenda", text: "Afspraken komen in de agenda op uw gsm, en bezette uren daaruit worden op de website verborgen. Eén planning, geen dubbele boekingen." },
      ],
      includes: [],
      forWhom: [
        "Salons, studio's en kappers met de hele dag afspraken",
        "Garages en carwashes met een beperkt aantal plaatsen",
        "Artsen, tandartsen, consultants en therapeuten",
        "Vakmensen en bedrijven die plaatsbezoeken doen",
      ],
      steps: [
        { title: "Gesprek over uw planning", text: "U vertelt ons hoe u nu afspraken maakt: welke diensten, hoelang ze duren, wie ze uitvoert en wanneer u gesloten bent. We zeggen u wat geautomatiseerd kan worden en wat beter via de telefoon blijft." },
        { title: "Instellen van diensten en team", text: "We geven de diensten, de duur, de medewerkers en de openingsuren in. De teksten van de bevestiging en de herinnering stellen we in uw taal op." },
        { title: "Live op uw website en in Google", text: "We voegen het boeken toe aan uw website, uw Google Bedrijfsprofiel en als link voor Instagram en Facebook. We testen het met echte afspraken." },
        { title: "Opvolging en bijsturing", text: "Na de eerste weken bekijken we welke uren gevraagd zijn en of de herinneringen aankomen. We passen de planning en de teksten aan op basis van wat u ziet." },
      ],
      faq: [
        {
          q: "Kunnen twee klanten hetzelfde uur boeken?",
          a: "Nee. Zodra een uur bezet is, verdwijnt het van de website voor alle anderen. Hebt u meerdere medewerkers, dan sluit het uur alleen bij de persoon die bezet is.",
        },
        {
          q: "Wat met klanten die bellen?",
          a: "Die zet u zelf in dezelfde agenda vanop uw gsm. De website ziet meteen dat het uur bezet is. Zo lopen het papieren boekje en het online boeken nooit uit elkaar.",
        },
        {
          q: "Heb ik een nieuwe website nodig?",
          a: "Nee. Het boeken wordt toegevoegd aan uw bestaande website en werkt indien nodig ook als aparte pagina met een link voor uw Google-profiel en sociale media.",
        },
        {
          q: "Wat kost het?",
          a: "Dat hangt af van het aantal diensten en medewerkers en of u sms-herinneringen wilt. U krijgt een vaste prijs na een gratis gesprek via telefoon of Google Meet. Het versturen van sms'en betaalt u apart aan de provider, en u kent die kost vooraf.",
        },
      ],
    },
  },
};
