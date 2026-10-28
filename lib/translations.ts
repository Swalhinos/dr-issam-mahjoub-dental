// Clinic identity for Dr Issam Mahjoub — Msaken, Sousse, Tunisia.
// Phone / WhatsApp everywhere: +216 98 800 749 (wa.me/21698800749).
// Address text is coordinates-based (35.729397, 10.579867) and must be
// confirmed by the client.

export type Lang = 'fr' | 'ar' | 'en'

export const CLINIC = {
  name: 'Dr Issam Mahjoub',
  doctor: 'Chirurgien-Dentiste',
  phoneDisplay: '+216 98 800 749',
  phone: '+21698800749',
  whatsapp: 'https://wa.me/21698800749',
  address: 'Msaken, Sousse — Tunisie',
  mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=35.729397,10.579867',
  mapsEmbed: 'https://www.google.com/maps?q=35.729397,10.579867&z=15&output=embed',
}

const fr = {
  nav: {
    about: 'À propos',
    services: 'Services',
    implants: 'Implants',
    social: 'Réseaux sociaux',
    whyUs: 'Pourquoi nous',
    results: 'Résultats',
    faq: 'FAQ',
    contact: 'Contact',
    book: 'Prendre rendez-vous',
  },
  hero: {
    badge: 'Chirurgie dentaire et implantologie — Msaken, Sousse',
    title: 'Votre sourire parfait commence ici',
    subtitle:
      'Découvrez une expérience dentaire haut de gamme avec le Dr Issam Mahjoub. Technologie moderne, soins en douceur et résultats exceptionnels, à Msaken, Sousse — Tunisie.',
    cta: 'Prendre rendez-vous',
    call: 'Appeler',
    whatsapp: 'WhatsApp',
    directions: 'Itinéraire',
    stats: [
      { value: '10+', label: 'Années d’expérience' },
      { value: '5 000+', label: 'Patients satisfaits' },
      { value: '98%', label: 'Taux de satisfaction' },
    ],
  },
  about: {
    badge: 'À propos du docteur',
    title: 'Dr Issam Mahjoub',
    role: 'Chirurgien-dentiste · Implantologie · Esthétique dentaire',
    p1: 'Le Dr Issam Mahjoub est un chirurgien-dentiste passionné par l’excellence des soins et l’esthétique du sourire. Son cabinet à Msaken, dans la région de Sousse, allie les dernières technologies dentaires à une approche douce et centrée sur le patient.',
    p2: 'Qu’il s’agisse d’un contrôle de routine, d’une transformation esthétique ou d’un traitement complexe, le Dr Mahjoub et son équipe veillent à ce que chaque visite soit confortable, transparente et adaptée à vos besoins.',
    points: [
      'Équipements modernes et stérilisation rigoureuse',
      'Soins en douceur pour adultes et enfants',
      'Équipe multilingue : français, arabe, anglais',
      'Plans de traitement et tarifs transparents',
    ],
  },
  services: {
    badge: 'Nos services',
    title: 'Des soins complets pour chaque sourire',
    subtitle: 'De la prévention aux transformations complètes du sourire, tout est réuni au même endroit.',
    items: [
      {
        title: 'Implants dentaires',
        desc: 'Des remplacements permanents et naturels pour les dents manquantes, posés avec précision.',
      },
      {
        title: 'Orthodontie',
        desc: 'Bagues et aligneurs transparents pour aligner vos dents à tout âge.',
      },
      {
        title: 'Blanchiment dentaire',
        desc: 'Un blanchiment professionnel pour un sourire visiblement plus éclatant dès la première visite.',
      },
      {
        title: 'Prothèses et couronnes',
        desc: 'Couronnes, bridges et prothèses sur mesure pour restaurer forme et fonction.',
      },
      {
        title: 'Soins conservateurs',
        desc: 'Consultations, détartrage, composites et prévention pour garder des dents saines à vie.',
      },
      {
        title: 'Chirurgie et urgences',
        desc: 'Extractions, y compris les dents de sagesse, et prise en charge rapide des urgences dentaires.',
      },
    ],
  },
  implants: {
    badge: 'Implants dentaires',
    title: 'Retrouvez un sourire complet et naturel',
    subtitle: 'L’implant dentaire remplace la racine de la dent manquante par une solution fixe, stable et durable — sans toucher aux dents voisines.',
    benefits: [
      'Aspect et sensation naturels, comme vos propres dents',
      'Stabilité totale pour manger et parler en confiance',
      'Préserve l’os de la mâchoire et la structure du visage',
      'Solution durable, conçue pour durer de nombreuses années',
    ],
    cta: 'Discuter de mon implant sur WhatsApp',
  },
  why: {
    badge: 'Pourquoi nous choisir',
    title: 'La différence que l’on ressent',
    items: [
      {
        title: 'Technologie moderne',
        desc: 'Radiographies numériques, équipements modernes et protocoles de stérilisation avancés.',
      },
      {
        title: 'Approche sans douleur',
        desc: 'Techniques douces et anesthésie efficace pour une expérience sans stress.',
      },
      {
        title: 'Accueil chaleureux',
        desc: 'Des soins adaptés aux adultes, aux enfants et aux seniors, dans une ambiance bienveillante.',
      },
      {
        title: 'Emplacement idéal',
        desc: 'Facilement accessible à Msaken, dans la région de Sousse.',
      },
    ],
  },
  testimonials: {
    badge: 'Témoignages',
    title: 'Ce que disent nos patients',
    items: [
      {
        name: 'Sara M.',
        text: 'La meilleure expérience dentaire que j’aie jamais eue. Le Dr Mahjoub est d’une douceur et d’un professionnalisme remarquables. Mon sourire n’a jamais été aussi beau !',
      },
      {
        name: 'Ahmed K.',
        text: 'J’avais une peur bleue des dentistes avant de venir ici. L’équipe m’a mis totalement à l’aise. Je recommande vivement !',
      },
      {
        name: 'Fatima Z.',
        text: 'J’ai amené mes deux enfants ici et ils aiment désormais aller chez le dentiste. Formidable avec les enfants !',
      },
    ],
  },
  beforeAfter: {
    badge: 'Avant / Après',
    title: 'Des résultats visibles',
    subtitle: 'Faites glisser le curseur pour comparer les deux moitiés de la même photo.',
    labels: { before: 'Avant', after: 'Après' },
    note: 'Exemple illustratif — simulation avant/après, et non un patient du cabinet. Les résultats varient selon chaque cas.',
  },
  social: {
    badge: 'Réseaux sociaux',
    title: 'Suivez-nous',
    subtitle: 'Le Dr Issam Mahjoub partage chaque jour ses cas cliniques, ses conseils et les coulisses du cabinet. Rejoignez la communauté !',
    cta: 'Voir le profil',
    verified: 'Profil vérifié',
    facebookDesc: 'Actualités du cabinet, cas cliniques et conseils dentaires.',
    instagramDesc: 'Photos et vidéos : transformations de sourires et vie du cabinet.',
    tiktokDesc: 'Vidéos courtes : conseils, coulisses et résultats en images.',
    tiktokNote: 'Lien TikTok à confirmer par le cabinet — aucun profil vérifié n’a été trouvé.',
  },
  faq: {
    badge: 'FAQ',
    title: 'Questions fréquentes',
    items: [
      {
        q: 'Comment prendre rendez-vous ?',
        a: 'Vous pouvez réserver via le formulaire de cette page, nous appeler directement ou nous envoyer un message WhatsApp. Nous répondons rapidement pendant les heures d’ouverture.',
      },
      {
        q: 'Proposez-vous des implants dentaires ?',
        a: 'Oui. Le Dr Mahjoub est spécialisé en implantologie : il remplace les dents manquantes par des implants fixes et naturels. Contactez-nous sur WhatsApp pour une première évaluation.',
      },
      {
        q: 'Le blanchiment dentaire est-il sûr ?',
        a: 'Absolument. Le blanchiment professionnel, réalisé sous supervision dentaire, est sûr et offre des résultats supérieurs et plus durables que les kits à domicile.',
      },
      {
        q: 'Quelles langues parlez-vous ?',
        a: 'Notre équipe parle français, arabe et anglais, pour que vous puissiez communiquer confortablement.',
      },
      {
        q: 'Où se situe le cabinet ?',
        a: 'À Msaken, dans la région de Sousse, en Tunisie. Utilisez le bouton « Itinéraire » ci-dessous pour votre position exacte sur Google Maps.',
      },
      {
        q: 'Gérez-vous les urgences dentaires ?',
        a: 'Oui, nous faisons de notre mieux pour recevoir les urgences le jour même. Appelez-nous ou envoyez-nous un message WhatsApp immédiatement si vous avez mal.',
      },
    ],
  },
  appointment: {
    badge: 'Réservez votre visite',
    title: 'Prendre rendez-vous',
    subtitle: 'Remplissez le formulaire et nous confirmerons votre rendez-vous par téléphone ou WhatsApp.',
    name: 'Nom complet',
    namePh: 'Votre nom complet',
    phone: 'Téléphone',
    phonePh: '+216 XX XXX XXX',
    service: 'Service',
    servicePh: 'Choisir un service',
    date: 'Date souhaitée',
    message: 'Message (optionnel)',
    messagePh: 'Parlez-nous de vos besoins…',
    submit: 'Envoyer via WhatsApp',
    note: 'Votre demande s’ouvre dans WhatsApp — nous confirmons pendant les heures d’ouverture.',
  },
  contact: {
    badge: 'Contact et accès',
    title: 'Visitez notre cabinet',
    addressLabel: 'Adresse',
    phoneLabel: 'Téléphone',
    hoursLabel: 'Horaires d’ouverture',
    hours: ['Lundi – Vendredi : 09:00 – 18:00', 'Samedi : 09:00 – 14:00'],
    directions: 'Itinéraire',
  },
  footer: {
    tagline: 'Des soins dentaires haut de gamme à Msaken, dans la région de Sousse.',
    quickLinks: 'Liens rapides',
    contactTitle: 'Contact',
    rights: 'Tous droits réservés.',
  },
}

const en = {
  nav: {
    about: 'About',
    services: 'Services',
    implants: 'Implants',
    social: 'Social media',
    whyUs: 'Why Us',
    results: 'Results',
    faq: 'FAQ',
    contact: 'Contact',
    book: 'Book Appointment',
  },
  hero: {
    badge: 'Dental surgery and implantology — Msaken, Sousse',
    title: 'Your Perfect Smile Starts Here',
    subtitle:
      'Experience premium dental care with Dr Issam Mahjoub. Modern technology, gentle treatment and outstanding results in Msaken, Sousse — Tunisia.',
    cta: 'Book Appointment',
    call: 'Call Now',
    whatsapp: 'WhatsApp',
    directions: 'Get Directions',
    stats: [
      { value: '10+', label: 'Years of Experience' },
      { value: '5,000+', label: 'Happy Patients' },
      { value: '98%', label: 'Satisfaction Rate' },
    ],
  },
  about: {
    badge: 'About the Doctor',
    title: 'Dr Issam Mahjoub',
    role: 'Dental Surgeon · Implantology · Smile Design',
    p1: 'Dr Issam Mahjoub is a dental surgeon passionate about excellent care and smile aesthetics. His clinic in Msaken, in the Sousse region, combines the latest dental technology with a gentle, patient-centred approach.',
    p2: 'Whether you need a routine check-up, a smile transformation or complex treatment, Dr Mahjoub and his team make sure every visit is comfortable, transparent and tailored to your needs.',
    points: [
      'Modern equipment and rigorous sterilization',
      'Gentle care for adults and children',
      'Multilingual team: French, Arabic, English',
      'Transparent treatment plans and pricing',
    ],
  },
  services: {
    badge: 'Our Services',
    title: 'Complete Care for Every Smile',
    subtitle: 'From prevention to full smile transformations, everything is in one place.',
    items: [
      {
        title: 'Dental Implants',
        desc: 'Permanent, natural-looking replacements for missing teeth, placed with precision.',
      },
      {
        title: 'Orthodontics',
        desc: 'Braces and clear aligners to align your teeth at any age.',
      },
      {
        title: 'Teeth Whitening',
        desc: 'Professional whitening for a visibly brighter smile in a single visit.',
      },
      {
        title: 'Crowns and Prosthetics',
        desc: 'Custom crowns, bridges and prosthetics to restore shape and function.',
      },
      {
        title: 'Conservative Care',
        desc: 'Check-ups, scaling, fillings and prevention to keep your teeth healthy for life.',
      },
      {
        title: 'Surgery and Emergencies',
        desc: 'Extractions, including wisdom teeth, and fast care for dental emergencies.',
      },
    ],
  },
  implants: {
    badge: 'Dental Implants',
    title: 'A Complete, Natural-Looking Smile Again',
    subtitle: 'A dental implant replaces the root of a missing tooth with a fixed, stable and long-lasting solution — without touching neighbouring teeth.',
    benefits: [
      'Natural look and feel, just like your own teeth',
      'Full stability to eat and speak with confidence',
      'Preserves the jawbone and facial structure',
      'A durable solution built to last for many years',
    ],
    cta: 'Discuss My Implant on WhatsApp',
  },
  why: {
    badge: 'Why Choose Us',
    title: 'The Difference You Can Feel',
    items: [
      {
        title: 'Modern Technology',
        desc: 'Digital X-rays, modern equipment, and advanced sterilization protocols.',
      },
      {
        title: 'Pain-Free Approach',
        desc: 'Gentle techniques and effective anesthesia for a stress-free experience.',
      },
      {
        title: 'Warm Welcome',
        desc: 'Tailored care for adults, children, and seniors in a warm atmosphere.',
      },
      {
        title: 'Prime Location',
        desc: 'Easily accessible in Msaken, in the Sousse region.',
      },
    ],
  },
  testimonials: {
    badge: 'Patient Testimonials',
    title: 'What Our Patients Say',
    items: [
      {
        name: 'Sara M.',
        text: 'The best dental experience I have ever had. Dr Mahjoub is incredibly gentle and professional. My smile has never looked better!',
      },
      {
        name: 'Ahmed K.',
        text: 'I was terrified of dentists until I came here. The team made me feel completely at ease. Highly recommended!',
      },
      {
        name: 'Fatima Z.',
        text: 'Brought my two children here and they actually enjoy going to the dentist now. Wonderful with kids!',
      },
    ],
  },
  beforeAfter: {
    badge: 'Before and After',
    title: 'Visible Results',
    subtitle: 'Drag the slider to compare the two halves of the same photo.',
    labels: { before: 'Before', after: 'After' },
    note: 'Illustrative example — before/after simulation, not a patient of this clinic. Results vary from case to case.',
  },
  social: {
    badge: 'Social Media',
    title: 'Follow Us',
    subtitle: 'Dr Issam Mahjoub shares clinical cases, tips and behind-the-scenes moments from the clinic every day. Join the community!',
    cta: 'View Profile',
    verified: 'Verified profile',
    facebookDesc: 'Clinic news, clinical cases and dental tips.',
    instagramDesc: 'Photos and videos: smile transformations and clinic life.',
    tiktokDesc: 'Short videos: tips, behind the scenes and results in pictures.',
    tiktokNote: 'TikTok link to be confirmed by the clinic — no verified profile was found.',
  },
  faq: {
    badge: 'FAQ',
    title: 'Frequently Asked Questions',
    items: [
      {
        q: 'How do I book an appointment?',
        a: 'You can book via the form on this page, by calling us directly, or by sending a WhatsApp message. We respond quickly during working hours.',
      },
      {
        q: 'Do you offer dental implants?',
        a: 'Yes. Dr Mahjoub specializes in implantology: he replaces missing teeth with fixed, natural-looking implants. Contact us on WhatsApp for an initial assessment.',
      },
      {
        q: 'Is teeth whitening safe?',
        a: 'Absolutely. Professional whitening under dental supervision is safe and delivers superior, longer-lasting results compared to home kits.',
      },
      {
        q: 'What languages do you speak?',
        a: 'Our team speaks French, Arabic, and English so you can communicate comfortably.',
      },
      {
        q: 'Where is the clinic located?',
        a: 'In Msaken, in the Sousse region of Tunisia — use the Get Directions button below for our exact location on Google Maps.',
      },
      {
        q: 'Do you handle dental emergencies?',
        a: 'Yes, we do our best to see emergency cases the same day. Call or WhatsApp us immediately if you are in pain.',
      },
    ],
  },
  appointment: {
    badge: 'Book Your Visit',
    title: 'Request an Appointment',
    subtitle: 'Fill in the form and we will confirm your appointment by phone or WhatsApp.',
    name: 'Full Name',
    namePh: 'Your full name',
    phone: 'Phone Number',
    phonePh: '+216 XX XXX XXX',
    service: 'Service',
    servicePh: 'Select a service',
    date: 'Preferred Date',
    message: 'Message (optional)',
    messagePh: 'Tell us about your needs…',
    submit: 'Send via WhatsApp',
    note: 'Your request opens in WhatsApp — we confirm within working hours.',
  },
  contact: {
    badge: 'Contact and Location',
    title: 'Visit Our Clinic',
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    hoursLabel: 'Opening Hours',
    hours: ['Monday – Friday: 09:00 – 18:00', 'Saturday: 09:00 – 14:00'],
    directions: 'Get Directions',
  },
  footer: {
    tagline: 'Premium dental care in Msaken, in the Sousse region.',
    quickLinks: 'Quick Links',
    contactTitle: 'Contact',
    rights: 'All rights reserved.',
  },
}

const ar = {
  nav: {
    about: 'من نحن',
    services: 'خدماتنا',
    implants: 'زراعة الأسنان',
    social: 'تابعنا',
    whyUs: 'لماذا نحن',
    results: 'النتائج',
    faq: 'الأسئلة الشائعة',
    contact: 'اتصل بنا',
    book: 'حجز موعد',
  },
  hero: {
    badge: 'جراحة الأسنان وزراعة الأسنان — مساكن، سوسة',
    title: 'ابتسامتك المثالية تبدأ هنا',
    subtitle: 'اكتشف تجربة طب أسنان راقية مع الدكتور عصام محجوب. تقنيات حديثة، علاج لطيف ونتائج استثنائية في مساكن، سوسة — تونس.',
    cta: 'حجز موعد',
    call: 'اتصل الآن',
    whatsapp: 'واتساب',
    directions: 'الاتجاهات',
    stats: [
      { value: '+10', label: 'سنوات من الخبرة' },
      { value: '+5,000', label: 'مريض سعيد' },
      { value: '98%', label: 'نسبة الرضا' },
    ],
  },
  about: {
    badge: 'عن الطبيب',
    title: 'الدكتور عصام محجوب',
    role: 'جرّاح أسنان · زراعة الأسنان · تجميل الابتسامة',
    p1: 'الدكتور عصام محجوب جرّاح أسنان شغوف بالتميّز في الرعاية وجماليات الابتسامة. تجمع عيادته في مساكن، بجهة سوسة، بين أحدث تقنيات طب الأسنان ونهج لطيف يركّز على المريض.',
    p2: 'سواء أكنت بحاجة إلى فحص روتيني أو تحويل تجميلي للابتسامة أو علاج معقّد، يحرص الدكتور محجوب وفريقه على أن تكون كل زيارة مريحة وشفافة ومصمّمة وفق احتياجاتك.',
    points: [
      'معدّات حديثة وتعقيم صارم',
      'رعاية لطيفة للبالغين والأطفال',
      'فريق متعدد اللغات: الفرنسية والعربية والإنجليزية',
      'خطط علاج وأسعار شفافة',
    ],
  },
  services: {
    badge: 'خدماتنا',
    title: 'رعاية متكاملة لكل ابتسامة',
    subtitle: 'من الوقاية إلى التحويل الكامل للابتسامة، كل شيء متوفر في مكان واحد.',
    items: [
      {
        title: 'زراعة الأسنان',
        desc: 'بدائل دائمة وطبيعية المظهر للأسنان المفقودة، تُزرع بدقّة.',
      },
      {
        title: 'تقويم الأسنان',
        desc: 'أجهزة تقويم ومصفّفات شفافة لمحاذاة أسنانك في أي عمر.',
      },
      {
        title: 'تبييض الأسنان',
        desc: 'تبييض احترافي لابتسامة أكثر إشراقًا بشكل واضح من الزيارة الأولى.',
      },
      {
        title: 'التيجان والتركيبات',
        desc: 'تيجان وجسور وتركيبات مصمّمة خصيصًا لاستعادة الشكل والوظيفة.',
      },
      {
        title: 'العلاجات المحافظة',
        desc: 'فحوصات وتنظيف وحشوات ووقاية للحفاظ على أسنان سليمة مدى الحياة.',
      },
      {
        title: 'الجراحة والطوارئ',
        desc: 'قلع الأسنان، بما في ذلك ضروس العقل، ورعاية سريعة لطوارئ الأسنان.',
      },
    ],
  },
  implants: {
    badge: 'زراعة الأسنان',
    title: 'ابتسامة كاملة وطبيعية من جديد',
    subtitle: 'تُعوّض زرعة الأسنان جذر السنّ المفقود بحلّ ثابت ومستقرّ وطويل الأمد — دون المساس بالأسنان المجاورة.',
    benefits: [
      'مظهر وإحساس طبيعيان، مثل أسنانك تمامًا',
      'ثبات كامل للأكل والتحدث بثقة',
      'تحافظ على عظم الفك وبنية الوجه',
      'حلّ متين مصمّم ليدوم سنوات عديدة',
    ],
    cta: 'ناقش زرعتك عبر واتساب',
  },
  why: {
    badge: 'لماذا تختارنا',
    title: 'الفرق الذي تشعر به',
    items: [
      {
        title: 'تقنيات حديثة',
        desc: 'أشعة رقمية ومعدّات حديثة وبروتوكولات تعقيم متقدّمة.',
      },
      {
        title: 'نهج بلا ألم',
        desc: 'تقنيات لطيفة وتخدير فعّال لتجربة خالية من التوتر.',
      },
      {
        title: 'استقبال دافئ',
        desc: 'رعاية مصمّمة للبالغين والأطفال وكبار السن في أجواء دافئة.',
      },
      {
        title: 'موقع مثالي',
        desc: 'يسهل الوصول إليها في مساكن، بجهة سوسة.',
      },
    ],
  },
  testimonials: {
    badge: 'شهادات المرضى',
    title: 'ماذا يقول مرضانا',
    items: [
      {
        name: 'سارة م.',
        text: 'أفضل تجربة طب أسنان مررت بها على الإطلاق. الدكتور محجوب لطيف ومحترف بشكل لا يصدّق. ابتسامتي لم تبدُ أجمل من قبل!',
      },
      {
        name: 'أحمد ك.',
        text: 'كنت أخاف أطباء الأسنان كثيرًا حتى جئت إلى هنا. جعلني الفريق أشعر براحة تامة. أنصح به بشدّة!',
      },
      {
        name: 'فاطمة ز.',
        text: 'أحضرت طفليّ إلى هنا وأصبحا يستمتعان فعلًا بالذهاب إلى طبيب الأسنان. رائع مع الأطفال!',
      },
    ],
  },
  beforeAfter: {
    badge: 'قبل وبعد',
    title: 'نتائج مرئية',
    subtitle: 'اسحب المؤشر لمقارنة نصفي الصورة نفسها.',
    labels: { before: 'قبل', after: 'بعد' },
    note: 'مثال توضيحي — محاكاة قبل/بعد، وليس مريضًا في العيادة. النتائج تختلف من حالة إلى أخرى.',
  },
  social: {
    badge: 'وسائل التواصل الاجتماعي',
    title: 'تابعنا',
    subtitle: 'يشارك الدكتور عصام محجوب يوميًا حالاته السريرية ونصائحه وكواليس العيادة. انضم إلى المجتمع!',
    cta: 'عرض الملف الشخصي',
    verified: 'ملف موثّق',
    facebookDesc: 'أخبار العيادة وحالات سريرية ونصائح للأسنان.',
    instagramDesc: 'صور وفيديوهات: تحويلات الابتسامة وحياة العيادة.',
    tiktokDesc: 'فيديوهات قصيرة: نصائح وكواليس ونتائج بالصور.',
    tiktokNote: 'رابط تيك توك بانتظار تأكيد العيادة — لم يتم العثور على ملف موثّق.',
  },
  faq: {
    badge: 'الأسئلة الشائعة',
    title: 'الأسئلة الأكثر شيوعًا',
    items: [
      {
        q: 'كيف أحجز موعدًا؟',
        a: 'يمكنك الحجز عبر نموذج هذه الصفحة، أو بالاتصال بنا مباشرة، أو بإرسال رسالة واتساب. نردّ بسرعة خلال ساعات العمل.',
      },
      {
        q: 'هل تقدّمون زراعة الأسنان؟',
        a: 'نعم. يتخصص الدكتور محجوب في زراعة الأسنان: فهو يعوّض الأسنان المفقودة بزرعات ثابتة وطبيعية المظهر. تواصل معنا عبر واتساب لتقييم أولي.',
      },
      {
        q: 'هل تبييض الأسنان آمن؟',
        a: 'بالتأكيد. التبييض الاحترافي تحت إشراف طبيب الأسنان آمن ويعطي نتائج أفضل وتدوم أطول مقارنة بالمنتجات المنزلية.',
      },
      {
        q: 'ما اللغات التي تتحدثونها؟',
        a: 'يتحدث فريقنا الفرنسية والعربية والإنجليزية لتتواصل براحة.',
      },
      {
        q: 'أين تقع العيادة؟',
        a: 'في مساكن، بجهة سوسة في تونس — استخدم زر الاتجاهات أدناه لموقعنا الدقيق على خرائط غوغل.',
      },
      {
        q: 'هل تعالجون طوارئ الأسنان؟',
        a: 'نعم، نبذل قصارى جهدنا لاستقبال حالات الطوارئ في اليوم نفسه. اتصل بنا أو راسلنا عبر واتساب فورًا إذا كنت تشعر بالألم.',
      },
    ],
  },
  appointment: {
    badge: 'احجز زيارتك',
    title: 'طلب موعد',
    subtitle: 'املأ النموذج وسنؤكد موعدك عبر الهاتف أو واتساب.',
    name: 'الاسم الكامل',
    namePh: 'اسمك الكامل',
    phone: 'رقم الهاتف',
    phonePh: '+216 XX XXX XXX',
    service: 'الخدمة',
    servicePh: 'اختر خدمة',
    date: 'التاريخ المفضّل',
    message: 'رسالة (اختياري)',
    messagePh: 'أخبرنا عن احتياجاتك…',
    submit: 'إرسال عبر واتساب',
    note: 'يُفتح طلبك في واتساب — نؤكد خلال ساعات العمل.',
  },
  contact: {
    badge: 'اتصل بنا والموقع',
    title: 'زوروا عيادتنا',
    addressLabel: 'العنوان',
    phoneLabel: 'الهاتف',
    hoursLabel: 'ساعات العمل',
    hours: ['الاثنين – الجمعة: 09:00 – 18:00', 'السبت: 09:00 – 14:00'],
    directions: 'الاتجاهات',
  },
  footer: {
    tagline: 'رعاية أسنان راقية في مساكن، بجهة سوسة.',
    quickLinks: 'روابط سريعة',
    contactTitle: 'اتصل بنا',
    rights: 'جميع الحقوق محفوظة.',
  },
}

export const translations = { fr, ar, en }

export type Translation = typeof translations.fr
