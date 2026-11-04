// Instant FAQ engine v2 for the Dr Issam Mahjoub Dental chat assistant.
// Runs 100% in the browser: no API call, no external service, no waiting.
//
// "Training" = three matching layers, in order:
// 1) Precise regex intents (approved clinic facts only, AR/EN/FR +
//    Egyptian dialect, the clinic's own visitor language).
// 2) A keyword-scoring net over normalized text (diacritics stripped,
//    ة/ه and ي/ى unified) that catches rephrasings and small typos the
//    regexes miss — it can only pick an intent, never invent an answer.
// 3) Off-list -> a WhatsApp invitation. Prices are always deflected to
//    WhatsApp and medical questions to the clinic team, by construction.

import type { Lang } from '@/lib/translations'

export type FaqAnswer = { text: string; cards: string[]; answerLang: Lang }

const ARABIC_SCRIPT = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/
const WA = '+216 98 800 749'

type FaqItem = {
  id: string
  cards?: string[]
  match: RegExp
  keywords?: string[]
  answers: Record<Lang, string>
}

const FAQ: FaqItem[] = [
  {
    id: 'emergency',
    cards: ['phone', 'whatsapp'],
    match: /(ألم|وجع|يوجع|توجع|بيوجع|كيضر|طوارئ|ضرني|douleur|mal aux dents|mal de dent|urgence|dental pain|toothache|emergency|hurts|in pain)/i,
    keywords: ['وجع', 'الم شديد', 'ضرسي بيوجعني', 'سناني بتوجعني', 'طوارئ', 'douleur', 'toothache', 'urgence'],
    answers: {
      fr: "Je suis navré pour votre douleur. Je ne peux pas poser de diagnostic ni recommander de médicament : pour une douleur ou une urgence, contactez le cabinet au plus vite sur WhatsApp au +216 98 800 749 ou par téléphone, l'équipe vous prendra en charge rapidement.",
      ar: 'آسف لسماع ذلك. لا أستطيع تقديم تشخيص أو وصف دواء: في حالة الألم أو الطوارئ، تواصل مع العيادة في أقرب وقت عبر واتساب على +216 98 800 749 أو بالهاتف، وسيهتم بكم الفريق بسرعة.',
      en: 'I am sorry you are in pain. I cannot give a diagnosis or recommend medication: for pain or an emergency, please contact the clinic as soon as possible on WhatsApp at +216 98 800 749 or by phone, and the team will take care of you quickly.',
    },
  },
  {
    id: 'bleeding',
    cards: ['phone', 'whatsapp'],
    match: /(نزيف|بينزف|دم من|ورم|انتفاخ|متورم|خراج|خُرّاج|saignement|gonflement|enflé|bleeding|swelling|swollen|abscess)/i,
    keywords: ['نزيف', 'ورم', 'انتفاخ', 'خراج', 'saignement', 'bleeding', 'swelling'],
    answers: {
      fr: "Un saignement, un gonflement ou un abcès doit être vu rapidement par un dentiste. Je ne peux pas poser de diagnostic : contactez le cabinet sans attendre sur WhatsApp au +216 98 800 749 ou par téléphone.",
      ar: 'النزيف أو الانتفاخ أو الخراج يحتاج أن يراه طبيب أسنان بسرعة. لا أستطيع تقديم تشخيص: تواصلوا مع العيادة دون انتظار عبر واتساب على +216 98 800 749 أو بالهاتف.',
      en: 'Bleeding, swelling or an abscess needs to be seen quickly by a dentist. I cannot give a diagnosis: contact the clinic without waiting on WhatsApp at +216 98 800 749 or by phone.',
    },
  },
  {
    id: 'broken',
    cards: ['phone', 'whatsapp'],
    match: /(سن مكسور|ضرس مكسور|اتكسر|مكسورة|كسر في|dent cassée|cassé ma dent|broken tooth|chipped|cracked tooth|broke my tooth)/i,
    keywords: ['سن مكسور', 'ضرس مكسور', 'اتكسر', 'broken tooth', 'dent cassee'],
    answers: {
      fr: "Une dent cassée doit être examinée rapidement pour la sauver si possible. Contactez le cabinet sur WhatsApp au +216 98 800 749 ou par téléphone, l'équipe vous dira quoi faire en attendant.",
      ar: 'السن المكسور يجب فحصه بسرعة لإنقاذه إن أمكن. تواصلوا مع العيادة عبر واتساب على +216 98 800 749 أو بالهاتف، وسيخبركم الفريق بما تفعلونه في الانتظار.',
      en: 'A broken tooth should be examined quickly to save it if possible. Contact the clinic on WhatsApp at +216 98 800 749 or by phone, and the team will tell you what to do meanwhile.',
    },
  },
  {
    id: 'price',
    cards: ['whatsapp'],
    match: /(ثمن|سعر|أسعار|بشحال|بقداش|قداش|بكم|بكام|كم تكلفة|تكلفة|كام سعر|كام تكلف|كام ثمن|prix|tarif|coût|combien|price|cost|how much|fees)/i,
    keywords: ['بكام', 'كام سعر', 'اسعار', 'تكلفه', 'prix', 'tarif', 'price', 'how much', 'combien'],
    answers: {
      fr: "Les tarifs dépendent de votre plan de traitement personnalisé, établi après un examen au cabinet avec le Dr Issam Mahjoub. Pour un devis précis, contactez-nous sur WhatsApp au +216 98 800 749, nous vous répondrons rapidement.",
      ar: 'تختلف الأسعار حسب خطة العلاج الخاصة بكم، والتي تُحدَّد بعد الفحص في العيادة مع الدكتور عصام محجوب. للحصول على ثمن دقيق، تواصلوا معنا عبر واتساب على +216 98 800 749 وسنرد عليكم بسرعة.',
      en: 'Prices depend on your personalised treatment plan, which is set after an examination at the clinic with Dr Issam Mahjoub. For an exact quote, contact us on WhatsApp at +216 98 800 749 and we will reply quickly.',
    },
  },
  {
    id: 'payment',
    cards: ['whatsapp'],
    match: /(تقسيط|أقساط|اقساط|طرق الدفع|وسائل الدفع|كاش|نقداً|بطاقة بنكية|فيزا|paiement|payment|installment|pay in|credit card|cash|visa)/i,
    keywords: ['تقسيط', 'اقساط', 'طرق الدفع', 'فيزا', 'paiement', 'payment', 'installment'],
    answers: {
      fr: "Pour les modalités de paiement, le cabinet vous confirmera les options disponibles directement sur WhatsApp au +216 98 800 749, selon votre plan de traitement.",
      ar: 'بخصوص طرق الدفع، ستؤكد لكم العيادة الخيارات المتاحة مباشرة عبر واتساب على +216 98 800 749، حسب خطة علاجكم.',
      en: 'For payment options, the clinic will confirm what is available directly on WhatsApp at +216 98 800 749, according to your treatment plan.',
    },
  },
  {
    id: 'insurance',
    cards: ['whatsapp'],
    match: /(تأمين|تامين|ضمان صحي|كنام|الكنام|assurance|mutuelle|cnam|insurance|coverage|covered)/i,
    keywords: ['تامين', 'كنام', 'assurance', 'insurance', 'mutuelle', 'cnam'],
    answers: {
      fr: "Je ne peux pas vous confirmer ici la prise en charge par une assurance : posez la question au cabinet sur WhatsApp au +216 98 800 749 avec le nom de votre assurance, l'équipe vous répondra précisément.",
      ar: 'لا أستطيع تأكيد تغطية التأمين هنا: اسألوا العيادة عبر واتساب على +216 98 800 749 مع ذكر اسم التأمين، وسيرد عليكم الفريق بدقة.',
      en: 'I cannot confirm insurance coverage here: ask the clinic on WhatsApp at +216 98 800 749 with the name of your insurer, and the team will answer precisely.',
    },
  },
  {
    id: 'warranty',
    cards: ['whatsapp'],
    match: /(ضمان|ضمانة|garantie|warranty|guarantee)/i,
    keywords: ['ضمان', 'garantie', 'warranty'],
    answers: {
      fr: "Les conditions de garantie dépendent du traitement réalisé : le cabinet vous les expliquera précisément sur WhatsApp au +216 98 800 749 avant de commencer.",
      ar: 'شروط الضمان تختلف حسب العلاج المنفذ: ستشرحها لكم العيادة بدقة عبر واتساب على +216 98 800 749 قبل البدء.',
      en: 'Warranty conditions depend on the treatment performed: the clinic will explain them precisely on WhatsApp at +216 98 800 749 before starting.',
    },
  },
  {
    id: 'hours',
    cards: ['booking'],
    match: /(ساعات العمل|مواعيد|أوقات|وقتاش تفتحو|وقتاش تسكرو|وقتاش كتفتحو|وقتاش كتسكرو|كتساليو|كتسالي|متى تفتح|متى تغلق|فاتحين|فاتحة|فاتحه|بتفتحوا|بتقفلوا|horaire|heures d'ouverture|ouvert|quand ouvrez|opening hours|when.*open|what time)/i,
    keywords: ['مواعيد العياده', 'ساعات العمل', 'اوقات', 'فاتحين امتي', 'horaire', 'opening hours', 'ouvert'],
    answers: {
      fr: 'Le cabinet est ouvert du lundi au vendredi de 09:00 à 18:00 et le samedi de 09:00 à 14:00. Pour réserver, écrivez-nous sur WhatsApp au +216 98 800 749.',
      ar: 'العيادة مفتوحة من الإثنين إلى الجمعة من 09:00 إلى 18:00، ويوم السبت من 09:00 إلى 14:00. للحجز، راسلونا عبر واتساب على +216 98 800 749.',
      en: 'The clinic is open Monday to Friday from 09:00 to 18:00 and Saturday from 09:00 to 14:00. To book, message us on WhatsApp at +216 98 800 749.',
    },
  },
  {
    id: 'reschedule',
    cards: ['whatsapp', 'phone'],
    match: /(تأجيل|تاجيل|إلغاء موعد|الغاء موعد|تغيير الموعد|تغير الموعد|نأجل|ناجل|نبدل|نغير|الغي|إلغاء|مش هقدر|مش حاجي|اجل موعدي|الغي موعدي|annuler|reporter|déplacer mon|reschedule|cancel my|move my appointment)/i,
    keywords: ['تاجيل موعد', 'الغاء موعد', 'تغيير الموعد', 'reschedule', 'annuler'],
    answers: {
      fr: "Aucun souci : pour reporter ou annuler votre rendez-vous, prévenez le cabinet sur WhatsApp au +216 98 800 749 ou par téléphone, et l'équipe vous proposera un autre créneau.",
      ar: 'لا مشكلة: لتأجيل موعدكم أو إلغائه، أخبروا العيادة عبر واتساب على +216 98 800 749 أو بالهاتف، وسيقترح عليكم الفريق موعداً آخر.',
      en: 'No problem: to reschedule or cancel your appointment, let the clinic know on WhatsApp at +216 98 800 749 or by phone, and the team will offer you another slot.',
    },
  },
  {
    id: 'booking',
    cards: ['booking', 'whatsapp'],
    match: /(حجز|احجز|موعد|عايز اجي|عاوز اجي|نبغي نجي|نحب نجي|rendez-vous|rendez vous|réserv|prendre rendez|book|appointment|booking|rdv)/i,
    keywords: ['عايز احجز', 'احجز موعد', 'حجز موعد', 'rendez vous', 'appointment', 'booking'],
    answers: {
      fr: 'Vous pouvez réserver de trois façons : le formulaire de rendez-vous sur ce site, par téléphone, ou sur WhatsApp au +216 98 800 749. Le cabinet confirmera votre rendez-vous par téléphone ou WhatsApp.',
      ar: 'يمكنكم الحجز بثلاث طرق: عبر نموذج المواعيد في هذا الموقع، أو بالهاتف، أو عبر واتساب على +216 98 800 749. وستؤكد لكم العيادة الموعد بالهاتف أو واتساب.',
      en: 'You can book in three ways: the appointment form on this website, by phone, or on WhatsApp at +216 98 800 749. The clinic will confirm your appointment by phone or WhatsApp.',
    },
  },
  {
    id: 'location',
    cards: ['maps'],
    match: /(أين|وين|فين|العنوان|الموقع|تقع|يقع|كاين|كاينة|البلاصة|بلاصة|لوكيشن|كيفاش نوصل|نوصل|ازاي اوصل|اوصل ازاي|باركينج|ركنة|adresse|localisation|emplacement|où se trouve|où êtes-vous|où|comment venir|parking|address|where|location|directions|how to get|position|gps)/i,
    keywords: ['العنوان', 'مكانكم فين', 'ازاي اوصل', 'لوكيشن', 'adresse', 'where are you', 'location', 'directions'],
    answers: {
      fr: 'Le cabinet du Dr Issam Mahjoub se trouve à Msaken, dans la région de Sousse, en Tunisie. Vous trouverez sur ce site une carte et un bouton « Itinéraire » pour vous guider facilement jusqu\'à nous.',
      ar: 'توجد عيادة الدكتور عصام محجوب في مساكن، بجهة سوسة، تونس. ستجدون في هذا الموقع خريطة وزر «Itinéraire» ليدلكم على الطريق بسهولة.',
      en: "Dr Issam Mahjoub's clinic is in Msaken, in the Sousse region of Tunisia. This site has a map and an \"Itinéraire\" (directions) button to guide you to us easily.",
    },
  },
  {
    id: 'doctor',
    cards: ['whatsapp'],
    match: /(من هو الدكتور|شكون هو الدكتور|شكون|مين الدكتور|مين دكتور|خبرة الدكتور|الدكتور حازم|نبذة|qui est le docteur|qui est le dr|le docteur hazem|expérience du|who is the doctor|who is dr|doctor's experience|about the doctor)/i,
    keywords: ['مين الدكتور', 'خبره الدكتور', 'الدكتور حازم', 'who is the doctor'],
    answers: {
      fr: 'Le Dr Issam Mahjoub est chirurgien-dentiste, spécialisé en implantologie et en dentisterie esthétique, à Msaken (région de Sousse). Pour toute question sur votre cas, écrivez-nous sur WhatsApp au +216 98 800 749.',
      ar: 'الدكتور عصام محجوب جراح أسنان، متخصص في زراعة وتجميل الأسنان، بمساكن (جهة سوسة). لأي سؤال عن حالتكم، راسلونا عبر واتساب على +216 98 800 749.',
      en: 'Dr Issam Mahjoub is a dental surgeon specialising in implantology and aesthetic dentistry, in Msaken (Sousse region). For any question about your case, message us on WhatsApp at +216 98 800 749.',
    },
  },
  {
    id: 'duration',
    cards: ['whatsapp'],
    match: /(كم جلسة|كام جلسة|كم مدة|كام مدة|شحال من حصة|شحال د الوقت|شحال غادي ياخد|مدة العلاج|تستغرق الزراعة|تستغرق العملية|بتاخد وقت|combien de séances|combien de temps|how many visits|how long does|how many sessions)/i,
    keywords: ['كام جلسه', 'كم جلسه', 'بتاخد وقت', 'how many visits', 'combien de seances'],
    answers: {
      fr: 'Le nombre de séances dépend de votre cas, établi après examen. Pour un plan précis avec le nombre de séances, écrivez-nous sur WhatsApp au +216 98 800 749.',
      ar: 'عدد الجلسات يعتمد على حالتكم ويُحدَّد بعد الفحص. لخطة دقيقة بعدد الجلسات، راسلونا عبر واتساب على +216 98 800 749.',
      en: 'The number of sessions depends on your case, set after examination. For a precise plan with the number of sessions, message us on WhatsApp at +216 98 800 749.',
    },
  },
  {
    id: 'implants',
    cards: ['whatsapp'],
    match: /(زراعة|زرعه|زرعة|زراعه|غرسة|اغرس|implant)/i,
    keywords: ['زراعه', 'زرعه', 'غرسه', 'implant'],
    answers: {
      fr: "L'implant dentaire remplace la racine d'une dent manquante par une solution fixe, stable et durable, sans toucher aux dents voisines. Pour savoir si c'est adapté à votre cas, le Dr Mahjoub doit vous examiner : écrivez-nous sur WhatsApp au +216 98 800 749.",
      ar: 'زراعة الأسنان تعوّض جذر السن المفقودة بحل ثابت ومستقر ودائم، دون المساس بالأسنان المجاورة. لمعرفة ما إذا كانت مناسبة لحالتكم، يجب أن يفحصكم الدكتور محجوب: راسلونا عبر واتساب على +216 98 800 749.',
      en: 'A dental implant replaces the root of a missing tooth with a fixed, stable and long-lasting solution, without touching the neighbouring teeth. To know if it suits your case, Dr Mahjoub needs to examine you: message us on WhatsApp at +216 98 800 749.',
    },
  },
  {
    id: 'crowns',
    cards: ['whatsapp'],
    match: /(تيجان|تاج السن|تركيبات|تركيبة|فينير|عدسات الأسنان|عدسات الاسنان|قشرة|هوليوود|hollywood|couronne|facette|veneer|crown)/i,
    keywords: ['تركيبات', 'فينير', 'تيجان', 'هوليوود', 'veneer', 'facette', 'crown'],
    answers: {
      fr: 'Le cabinet réalise couronnes, ponts et prothèses, pour restaurer vos dents et embellir votre sourire — les facettes sont aussi la base du « Hollywood smile ». Pour savoir ce qui convient à votre cas, le Dr Mahjoub doit vous examiner : écrivez-nous sur WhatsApp au +216 98 800 749.',
      ar: 'تقدم العيادة التيجان والجسور والتركيبات، لترميم أسنانكم وتجميل ابتسامتكم — والفينير أيضاً أساس «ابتسامة هوليوود». لمعرفة الأنسب لحالتكم، يجب أن يفحصكم الدكتور محجوب: راسلونا عبر واتساب على +216 98 800 749.',
      en: 'The clinic makes crowns, bridges and prostheses, to restore your teeth and beautify your smile — veneers are also the basis of the "Hollywood smile". To know what suits your case, Dr Mahjoub needs to examine you: message us on WhatsApp at +216 98 800 749.',
    },
  },
  {
    id: 'rootcanal',
    cards: ['whatsapp'],
    match: /(علاج جذور|علاج عصب|حشو عصب|عصب السن|traitement de racine|dévitalisation|root canal|endodont)/i,
    keywords: ['علاج جذور', 'حشو عصب', 'عصب', 'root canal'],
    answers: {
      fr: 'Le traitement de racine fait partie des soins du cabinet : le Dr Mahjoub examinera votre dent et vous proposera le soin adapté. Pour un rendez-vous, écrivez-nous sur WhatsApp au +216 98 800 749.',
      ar: 'علاج الجذور جزء من علاجات العيادة: سيفحص الدكتور محجوب سنكم ويقترح العلاج المناسب. لحجز موعد، راسلونا عبر واتساب على +216 98 800 749.',
      en: 'Root canal treatment is part of the clinic\'s care: Dr Mahjoub will examine your tooth and propose the right treatment. To book, message us on WhatsApp at +216 98 800 749.',
    },
  },
  {
    id: 'whitening',
    cards: ['whatsapp'],
    match: /(تبييض|تبيض|بياض|اسناني صفرا|سناني صفرا|صفرين|اصفرار|ابيضها|نبيض|blanchiment|whitening|whiter teeth)/i,
    keywords: ['تبييض', 'تبيض', 'blanchiment', 'whitening'],
    answers: {
      fr: 'Nous proposons un blanchiment dentaire professionnel pour un sourire visiblement plus éclatant dès la première visite. Pour les détails et un rendez-vous, contactez-nous sur WhatsApp au +216 98 800 749.',
      ar: 'نوفر تبييضاً احترافياً للأسنان لابتسامة أكثر إشراقاً بشكل ملحوظ منذ الزيارة الأولى. للتفاصيل وحجز موعد، تواصلوا معنا عبر واتساب على +216 98 800 749.',
      en: 'We offer professional teeth whitening for a visibly brighter smile from the first visit. For details and an appointment, contact us on WhatsApp at +216 98 800 749.',
    },
  },
  {
    id: 'ortho',
    cards: ['whatsapp'],
    match: /(تقويم|أقواس|اقواس|orthodont|appareil dentaire|braces|aligner|aligneur|invisalign)/i,
    keywords: ['تقويم', 'اقواس', 'orthodont', 'braces', 'invisalign'],
    answers: {
      fr: "Le cabinet propose l'orthodontie pour enfants et adultes : appareils classiques et aligneurs transparents pour aligner vos dents à tout âge. Pour une première évaluation, écrivez-nous sur WhatsApp au +216 98 800 749.",
      ar: 'توفر العيادة تقويم الأسنان للأطفال والبالغين: أجهزة تقليدية ومصففات شفافة لتقويم أسنانكم في أي عمر. لتقييم أول، راسلونا عبر واتساب على +216 98 800 749.',
      en: 'The clinic offers orthodontics for children and adults: classic braces and clear aligners to straighten your teeth at any age. For a first assessment, message us on WhatsApp at +216 98 800 749.',
    },
  },
  {
    id: 'kids',
    cards: ['whatsapp'],
    match: /(أطفال|اطفال|طفلي|طفل |ابني|ابنتي|enfants|pour enfant|kids|children|my child|my son|my daughter)/i,
    keywords: ['اطفال', 'طفلي', 'ابني', 'kids', 'children'],
    answers: {
      fr: "Le cabinet accueille les enfants, notamment pour l'orthodontie (appareils et aligneurs adaptés à leur âge). Pour un soin précis pour votre enfant, décrivez-nous le besoin sur WhatsApp au +216 98 800 749, l'équipe vous orientera.",
      ar: 'تستقبل العيادة الأطفال، خاصة في تقويم الأسنان (أجهزة ومصففات مناسبة لأعمارهم). لعلاج محدد لطفلكم، صفوا لنا الحاجة عبر واتساب على +216 98 800 749، وسيرشدكم الفريق.',
      en: 'The clinic welcomes children, especially for orthodontics (braces and aligners suited to their age). For a specific treatment for your child, describe the need on WhatsApp at +216 98 800 749 and the team will guide you.',
    },
  },
  {
    id: 'cleaning',
    cards: ['whatsapp'],
    match: /(تنظيف|تنضيف|إزالة الجير|ازالة الجير|تلميع|كشف|فحص شامل|ديتارتراج|détartrage|detartrage|nettoyage|check-up|checkup|cleaning|scaling|polishing)/i,
    keywords: ['تنظيف', 'تنضيف', 'ازاله الجير', 'كشف', 'detartrage', 'cleaning', 'checkup'],
    answers: {
      fr: 'Le cabinet propose les soins conservateurs : contrôles réguliers, détartrage et prévention pour garder des dents saines. Pour un rendez-vous de contrôle ou de détartrage, écrivez-nous sur WhatsApp au +216 98 800 749.',
      ar: 'تقدم العيادة العلاجات التحفظية: فحوصات دورية، تنظيف وإزالة الجير، ووقاية للحفاظ على أسنان صحية. لحجز فحص أو تنظيف، راسلونا عبر واتساب على +216 98 800 749.',
      en: 'The clinic offers conservative care: regular check-ups, scaling and prevention to keep your teeth healthy. To book a check-up or cleaning, message us on WhatsApp at +216 98 800 749.',
    },
  },
  {
    id: 'filling',
    cards: ['whatsapp'],
    match: /(حشو|حشوه|حشوة|تسوس|مسوس|plombage|filling|cavity|carie|decay)/i,
    keywords: ['حشو', 'تسوس', 'filling', 'cavity'],
    answers: {
      fr: 'Les obturations font partie des soins conservateurs du cabinet : le Dr Mahjoub examinera votre dent et vous proposera le soin adapté. Pour un rendez-vous, écrivez-nous sur WhatsApp au +216 98 800 749.',
      ar: 'الحشوات جزء من العلاجات التحفظية في العيادة: سيفحص الدكتور محجوب سنكم ويقترح العلاج المناسب. لحجز موعد، راسلونا عبر واتساب على +216 98 800 749.',
      en: 'Fillings are part of the clinic\'s conservative care: Dr Mahjoub will examine your tooth and propose the right treatment. To book, message us on WhatsApp at +216 98 800 749.',
    },
  },
  {
    id: 'extraction',
    cards: ['whatsapp'],
    match: /(خلع|نحيد|نحي|نزول|اشيل|اشيل ضرس|اخلع|extraction|extraire|remove a tooth|pull a tooth|take out)/i,
    keywords: ['خلع', 'اخلع', 'extraction'],
    answers: {
      fr: 'Le cabinet assure les extractions, y compris les dents de sagesse, dans le cadre de ses soins de chirurgie dentaire — toujours après un examen. Pour faire examiner votre dent, écrivez-nous sur WhatsApp au +216 98 800 749.',
      ar: 'تقوم العيادة بالخلع، بما فيه ضروس العقل، ضمن علاجات جراحة الأسنان — ودائماً بعد فحص. لفحص سنكم، راسلونا عبر واتساب على +216 98 800 749.',
      en: 'The clinic performs extractions, including wisdom teeth, as part of its dental surgery care — always after an examination. To have your tooth examined, message us on WhatsApp at +216 98 800 749.',
    },
  },
  {
    id: 'dentures',
    cards: ['whatsapp'],
    match: /(طقم|أسنان متحركة|اسنان متحركه|تركيبة متحركة|prothèse|prothese|denture|removable)/i,
    keywords: ['طقم', 'اسنان متحركه', 'denture'],
    answers: {
      fr: 'Le cabinet réalise aussi des prothèses, y compris amovibles, adaptées à chaque cas après examen. Pour les détails, écrivez-nous sur WhatsApp au +216 98 800 749.',
      ar: 'تقدم العيادة أيضاً التركيبات بما فيها المتحركة، مصممة لكل حالة بعد الفحص. للتفاصيل، راسلونا عبر واتساب على +216 98 800 749.',
      en: 'The clinic also makes prostheses, including removable dentures, tailored to each case after examination. For details, message us on WhatsApp at +216 98 800 749.',
    },
  },
  {
    id: 'sensitivity',
    cards: ['whatsapp'],
    match: /(حساسية|حساسيه|حساسة|حساسه|الم مع البارد|الم مع الساقع|الم مع الحلو|sensibilité|sensibilite|sensitivity|sensitive teeth|hurts when I drink cold)/i,
    keywords: ['حساسيه', 'الم مع البارد', 'sensitivity'],
    answers: {
      fr: "La sensibilité peut avoir plusieurs causes, et je ne peux pas poser de diagnostic ici. Le Dr Mahjoub trouvera la cause lors d'un examen : écrivez-nous sur WhatsApp au +216 98 800 749 pour un rendez-vous.",
      ar: 'حساسية الأسنان قد تكون لها أسباب متعددة، ولا أستطيع التشخيص هنا. سيحدد الدكتور محجوب السبب عند الفحص: راسلونا عبر واتساب على +216 98 800 749 لحجز موعد.',
      en: 'Sensitivity can have several causes, and I cannot diagnose here. Dr Mahjoub will find the cause during an examination: message us on WhatsApp at +216 98 800 749 to book.',
    },
  },
  {
    id: 'xray',
    cards: ['whatsapp'],
    match: /(أشعة|اشعه|بانوراما|بانوراميا|راديو|radiographie|panoramique|x-ray|xray)/i,
    keywords: ['اشعه', 'بانوراما', 'xray', 'x-ray'],
    answers: {
      fr: "Pour savoir si une radiographie est nécessaire dans votre cas, le cabinet vous le confirmera lors de l'examen ou directement sur WhatsApp au +216 98 800 749.",
      ar: 'لمعرفة ما إذا كانت الأشعة ضرورية في حالتكم، ستؤكد لكم العيادة ذلك عند الفحص أو مباشرة عبر واتساب على +216 98 800 749.',
      en: 'To know whether an X-ray is needed in your case, the clinic will confirm during the examination or directly on WhatsApp at +216 98 800 749.',
    },
  },
  {
    id: 'languages',
    match: /(بتتكلموا|كتكلمو|كتكلموا|تكلمو|تتكلمون|لغات|انجليزي|فرنساوي|langues|parlez-vous|parlez vous|do you speak|you speak|speak english|speak arabic)/i,
    keywords: ['بتتكلموا', 'لغات', 'do you speak', 'parlez vous'],
    answers: {
      fr: "L'équipe du cabinet parle français, arabe et anglais, et ce site est disponible dans les trois langues. Écrivez-nous dans la langue qui vous convient !",
      ar: 'فريق العيادة يتحدث الفرنسية والعربية والإنجليزية، وهذا الموقع متوفر باللغات الثلاث. راسلونا باللغة التي تناسبكم!',
      en: 'The clinic team speaks French, Arabic and English, and this website is available in all three languages. Write to us in whichever language suits you!',
    },
  },
  {
    id: 'services',
    match: /(خدمات|علاجات|تخصصات|بتعملوا ايه|بتعملو ايه|شنو كتديرو|اش كتديرو|شنوة عندكم|شنو تعملو|services|soins|traitements|spécialités|treatments|what do you (do|offer)|your services)/i,
    keywords: ['خدمات', 'علاجات', 'بتعملوا ايه', 'services', 'treatments'],
    answers: {
      fr: 'Le Dr Issam Mahjoub et son équipe proposent : implants dentaires, orthodontie, blanchiment dentaire, couronnes et prothèses, soins conservateurs (contrôles, détartrage, prévention), ainsi que chirurgie et urgences dentaires. Que puis-je vous expliquer en détail ?',
      ar: 'يقدم الدكتور عصام محجوب وفريقه: زراعة الأسنان، تقويم الأسنان، تبييض الأسنان، التيجان والتركيبات، العلاجات التحفظية (فحوصات، تنظيف، وقاية)، إضافة إلى الجراحة وطوارئ الأسنان. ما الذي تريدون أن أشرحه لكم بالتفصيل؟',
      en: 'Dr Issam Mahjoub and his team offer: dental implants, orthodontics, teeth whitening, crowns and prosthetics, conservative care (check-ups, scaling, prevention), plus surgery and dental emergencies. What would you like me to explain in detail?',
    },
  },
  {
    id: 'social',
    cards: ['facebook', 'instagram'],
    match: /(فيسبوك|انستغرام|انستا|تيك توك|سناب|facebook|instagram|tiktok|snapchat|r[ée]seaux|social|follow)/i,
    keywords: ['فيسبوك', 'انستغرام', 'تيك توك', 'facebook', 'instagram'],
    answers: {
      fr: 'Suivez le Dr Issam Mahjoub sur Facebook et Instagram : il y partage ses cas, ses conseils et les coulisses du cabinet. Touchez une carte ci-dessous pour ouvrir la page.',
      ar: 'تابعوا الدكتور عصام محجوب على فيسبوك وإنستغرام: ينشر هناك حالاته ونصائحه وكواليس العيادة. اضغطوا على إحدى البطاقتين أسفله لفتح الصفحة.',
      en: 'Follow Dr Issam Mahjoub on Facebook and Instagram: he shares his cases, tips and behind-the-scenes of the clinic there. Tap a card below to open the page.',
    },
  },
  {
    id: 'human',
    cards: ['phone', 'whatsapp'],
    match: /(أكلم شخص|اكلم شخص|موظف|شخص حقيقي|بشري|الدكتور نفسه|كلمني|عايز اكلم|parler à quelqu|un humain|une personne|real person|human|talk to someone|speak to the)/i,
    keywords: ['اكلم شخص', 'موظف', 'عايز اكلم', 'real person', 'humain'],
    answers: {
      fr: "Bien sûr ! Je suis l'assistant automatique du cabinet, mais l'équipe vous répond directement sur WhatsApp au +216 98 800 749 ou par téléphone — touchez une carte ci-dessous.",
      ar: 'بالطبع! أنا المساعد الآلي للعيادة، لكن الفريق يرد عليكم مباشرة عبر واتساب على +216 98 800 749 أو بالهاتف — اضغطوا على إحدى البطاقتين أسفله.',
      en: 'Of course! I am the clinic\'s automated assistant, but the team replies to you directly on WhatsApp at +216 98 800 749 or by phone — tap a card below.',
    },
  },
  {
    id: 'thanks',
    match: /(شكرا|شكراً|مشكور|متشكر|تسلم|بارك الله|merci|thank)/i,
    keywords: ['شكرا', 'متشكر', 'تسلم', 'merci', 'thank'],
    answers: {
      fr: "Avec grand plaisir ! N'hésitez pas si vous avez une autre question sur nos services, les horaires ou la réservation. Au plaisir de vous accueillir au cabinet.",
      ar: 'بكل سرور! لا تترددوا إن كان لديكم أي سؤال آخر عن خدماتنا أو أوقات العمل أو الحجز. نتطلع لاستقبالكم في العيادة.',
      en: 'You are very welcome! Do not hesitate if you have another question about our services, hours or booking. We look forward to welcoming you to the clinic.',
    },
  },
  {
    id: 'bye',
    match: /(مع السلامة|مع السلامه|إلى اللقاء|الى اللقاء|باي|تصبح على خير|au revoir|à bientôt|bye|goodbye|see you)/i,
    keywords: ['مع السلامه', 'الي اللقاء', 'au revoir', 'bye'],
    answers: {
      fr: "Au revoir et merci de votre visite ! Pour réserver ou poser une question, le cabinet reste joignable sur WhatsApp au +216 98 800 749.",
      ar: 'إلى اللقاء، وشكراً لزيارتكم! للحجز أو أي سؤال، تبقى العيادة رهن إشارتكم عبر واتساب على +216 98 800 749.',
      en: 'Goodbye and thank you for visiting! To book or ask a question, the clinic stays reachable on WhatsApp at +216 98 800 749.',
    },
  },
  {
    id: 'greeting',
    match: /(^\s*(سلام|السلام عليكم|سلامو عليكم|عسلامة|عسلامه|مرحبا|صباح الخير|مساء الخير|أهلا|اهلا|ازيك|صباح الفل)[\s!.,،]*$)|(^\s*(bonjour|bonsoir|salut|hello|hi|hey)\b)/i,
    answers: {
      fr: 'Bonjour et bienvenue au cabinet du Dr Issam Mahjoub ! Je peux vous renseigner sur nos services, les implants, les horaires ou la prise de rendez-vous. Comment puis-je vous aider ?',
      ar: 'مرحباً بكم في عيادة الدكتور عصام محجوب! يمكنني إخباركم بخدماتنا، زراعة الأسنان، أوقات العمل أو كيفية حجز موعد. كيف يمكنني مساعدتكم؟',
      en: "Hello and welcome to Dr Issam Mahjoub's clinic! I can tell you about our services, implants, opening hours or how to book an appointment. How can I help you?",
    },
  },
]

const OFFLIST: Record<Lang, string> = {
  fr: "Merci pour votre message ! Pour cette question précise, l'équipe du cabinet vous répondra directement et rapidement sur WhatsApp au +216 98 800 749 — touchez la carte ci-dessous. Je peux aussi vous renseigner ici sur nos services, les horaires, l'adresse ou la réservation.",
  ar: 'شكراً لرسالتكم! بخصوص هذا السؤال بالذات، سيرد عليكم فريق العيادة مباشرة وبسرعة عبر واتساب على +216 98 800 749 — اضغطوا على البطاقة أسفله. ويمكنني أيضاً إخباركم هنا بخدماتنا أو أوقات العمل أو العنوان أو كيفية الحجز.',
  en: 'Thank you for your message! For this specific question, the clinic team will reply to you directly and quickly on WhatsApp at +216 98 800 749 — tap the card below. I can also help you here with our services, hours, address or booking.',
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[ً-ٰٟ]/g, '')
    .replace(/ـ/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ئ/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ة/g, 'ه')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function faqAnswer(text: string, siteLang: Lang): FaqAnswer {
  const lang: Lang = ARABIC_SCRIPT.test(text) ? 'ar' : siteLang
  // Layer 1: precise regex intents.
  for (const item of FAQ) {
    if (item.match.test(text)) {
      return { text: item.answers[lang] || item.answers.fr, cards: item.cards || [], answerLang: lang }
    }
  }
  // Layer 2: keyword scoring over normalized text — catches rephrasings
  // and small typos. A single strong keyword (score >= 2 total) wins.
  const norm = ' ' + normalize(text) + ' '
  let best: FaqItem | null = null
  let bestScore = 0
  for (const item of FAQ) {
    if (!item.keywords) continue
    let score = 0
    for (const kw of item.keywords) {
      if (norm.includes(' ' + normalize(kw) + ' ') || norm.includes(normalize(kw))) score += kw.length >= 8 ? 2 : 1
    }
    if (score > bestScore) {
      bestScore = score
      best = item
    }
  }
  if (best && bestScore >= 2) {
    return { text: best.answers[lang] || best.answers.fr, cards: best.cards || [], answerLang: lang }
  }
  // Layer 3: off-list -> WhatsApp invitation.
  return { text: OFFLIST[lang], cards: ['whatsapp'], answerLang: lang }
}
