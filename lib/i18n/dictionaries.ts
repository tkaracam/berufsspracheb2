export type Locale = "de" | "tr" | "en" | "ar" | "uk";

export const defaultLocale: Locale = "de";

export const locales: Locale[] = ["de", "tr", "en", "ar", "uk"];

export const localeLabels: Record<Locale, string> = {
  de: "Deutsch",
  tr: "Türkçe",
  en: "English",
  ar: "العربية",
  uk: "Українська",
};

export const rtlLocales: Locale[] = ["ar"];

export interface Dictionary {
  nav: {
    dashboard: string;
    decks: string;
    trainer: string;
    repetition: string;
    flashcards: string;
    search: string;
    favorites: string;
    profile: string;
    classes: string;
    assignments: string;
    worksheet: string;
    professions: string;
    communication: string;
    examTraining: string;
    learn: string;
    grammar: string;
    redemittel: string;
    writing: string;
    reading: string;
    listening: string;
    speaking: string;
    vocabularyNotebook: string;
    admin: string;
    users: string;
    exercises: string;
    logout: string;
    login: string;
    register: string;
    home: string;
    settings: string;
  };
  common: {
    start: string;
    open: string;
    save: string;
    cancel: string;
    close: string;
    back: string;
    next: string;
    check: string;
    correct: string;
    wrong: string;
    listen: string;
    showSolution: string;
    hideSolution: string;
    answer: string;
    loading: string;
  };
  dashboard: {
    welcomeBack: string;
    subtitle: string;
    todayGoal: string;
    completed: string;
    favorites: string;
    streak: string;
    recentActivity: string;
    quickStart: string;
    openTrainer: string;
    viewFavorites: string;
    discoverProfessions: string;
    deckProgress: string;
    knownOfTotal: string;
  };
  trainer: {
    title: string;
    subtitle: string;
  };
  vocabularyNotebook: {
    title: string;
    subtitle: string;
    term: string;
    meaning: string;
    antonym: string;
    example: string;
    notes: string;
    status: string;
    field: string;
    category: string;
    allFields: string;
    allCategories: string;
    filterByField: string;
    search: string;
    markKnown: string;
    markPractice: string;
    markNew: string;
    enterAntonym: string;
    enterNotes: string;
    antonymPrompt: string;
    practiceMode: string;
    tableMode: string;
    showAnswer: string;
    hideAnswer: string;
    check: string;
    correct: string;
    wrong: string;
    noEntries: string;
    red: string;
    yellow: string;
    green: string;
  };
  classes: {
    myClasses: string;
    joinClass: string;
    classCode: string;
    noClasses: string;
    noAssignments: string;
    assignments: string;
    backToClasses: string;
    joinByCode: string;
    codePlaceholder: string;
    codeHelp: string;
    joinFailed: string;
    invalidCode: string;
    missingCode: string;
  };
  public: {
    startLearning: string;
  };
}

const de: Dictionary = {
  nav: {
    dashboard: "Dashboard",
    decks: "Decks",
    trainer: "Trainer",
    repetition: "Wiederholung",
    flashcards: "Karteikarten",
    search: "Suche",
    favorites: "Favoriten",
    profile: "Profil",
    classes: "Klassen",
    assignments: "Aufgaben",
    worksheet: "Arbeitsblatt",
    professions: "Berufsfelder",
    communication: "Kommunikation",
    examTraining: "Prüfungstraining",
    learn: "Lernen",
    grammar: "Grammatik",
    redemittel: "Redemittel",
    vocabularyNotebook: "Vokabelheft",
    writing: "Schreiben",
    reading: "Lesen",
    listening: "Hören",
    speaking: "Sprechen",
    admin: "Admin",
    users: "Nutzer",
    exercises: "Übungen",
    logout: "Abmelden",
    login: "Anmelden",
    register: "Registrieren",
    home: "Start",
    settings: "Einstellungen",
  },
  common: {
    start: "Starten",
    open: "Öffnen",
    save: "Speichern",
    cancel: "Abbrechen",
    close: "Schließen",
    back: "Zurück",
    next: "Weiter",
    check: "Prüfen",
    correct: "Richtig!",
    wrong: "Leider falsch.",
    listen: "Anhören",
    showSolution: "Lösung anzeigen",
    hideSolution: "Lösung verbergen",
    answer: "Antwort",
    loading: "Laden …",
  },
  dashboard: {
    welcomeBack: "Willkommen zurück",
    subtitle: "Hier sehen Sie Ihren Lernfortschritt und Ihre nächsten Schritte.",
    todayGoal: "Heutiges Ziel",
    completed: "Abgeschlossen",
    favorites: "Favoriten",
    streak: "Lernstreak",
    recentActivity: "Letzte Aktivitäten",
    quickStart: "Schnellstart",
    openTrainer: "Trainer öffnen",
    viewFavorites: "Favoriten ansehen",
    discoverProfessions: "Berufsfelder entdecken",
    deckProgress: "Dein Lernfortschritt",
    knownOfTotal: "{known} von {count} als gewusst markiert",
  },
  trainer: {
    title: "Trainer",
    subtitle: "Wählen Sie einen Modus und starten Sie Ihr Training.",
  },
  vocabularyNotebook: {
    title: "Vokabelheft",
    subtitle: "Behalten Sie den Überblick über Ihren Wortschatz mit Synonymen, Antonymen und eigenen Notizen.",
    term: "Begriff",
    meaning: "Bedeutung / Synonym",
    antonym: "Antonym",
    example: "Beispielsatz",
    notes: "Eigene Notizen",
    status: "Status",
    field: "Berufsfeld",
    category: "Kategorie",
    allFields: "Alle Berufsfelder",
    allCategories: "Alle Kategorien",
    filterByField: "Berufsfeld filtern",
    search: "Begriff suchen …",
    markKnown: "Gewusst",
    markPractice: "Geübt",
    markNew: "Neu",
    enterAntonym: "Antonym eingeben",
    enterNotes: "Notizen eingeben",
    antonymPrompt: "Geben Sie ein passendes Antonym oder Gegenteil ein.",
    practiceMode: "Abfrage-Modus",
    tableMode: "Tabelle",
    showAnswer: "Antwort anzeigen",
    hideAnswer: "Antwort verbergen",
    check: "Prüfen",
    correct: "Richtig!",
    wrong: "Noch nicht ganz. Weiter üben!",
    noEntries: "Keine Vokabeln passen zu Ihren Filtern.",
    red: "Neu",
    yellow: "Geübt",
    green: "Gewusst",
  },
  classes: {
    myClasses: "Meine Klassen",
    joinClass: "Klasse beitreten",
    classCode: "Klassen-Code",
    noClasses: "Sie sind noch keiner Klasse beigetreten.",
    noAssignments: "Noch keine Aufgaben für diese Klasse vorhanden.",
    assignments: "Aufgaben",
    backToClasses: "Meine Klassen",
    joinByCode: "Per Code beitreten",
    codePlaceholder: "z. B. A1B2C3",
    codeHelp: "Den Code erhalten Sie von Ihrer Lehrkraft.",
    joinFailed: "Beitritt ist fehlgeschlagen. Bitte versuchen Sie es erneut.",
    invalidCode: "Keine Klasse mit diesem Code gefunden.",
    missingCode: "Bitte geben Sie einen Klassen-Code ein.",
  },
  public: {
    startLearning: "Lernen starten",
  },
};

const en: Dictionary = {
  nav: {
    dashboard: "Dashboard",
    decks: "Decks",
    trainer: "Trainer",
    repetition: "Repetition",
    flashcards: "Flashcards",
    search: "Search",
    favorites: "Favorites",
    profile: "Profile",
    classes: "Classes",
    assignments: "Assignments",
    worksheet: "Worksheet",
    professions: "Professions",
    communication: "Communication",
    examTraining: "Exam Training",
    learn: "Learn",
    grammar: "Grammar",
    redemittel: "Phrases",
    vocabularyNotebook: "Vocabulary notebook",
    writing: "Writing",
    reading: "Reading",
    listening: "Listening",
    speaking: "Speaking",
    admin: "Admin",
    users: "Users",
    exercises: "Exercises",
    logout: "Log out",
    login: "Log in",
    register: "Register",
    home: "Home",
    settings: "Settings",
  },
  common: {
    start: "Start",
    open: "Open",
    save: "Save",
    cancel: "Cancel",
    close: "Close",
    back: "Back",
    next: "Next",
    check: "Check",
    correct: "Correct!",
    wrong: "Incorrect.",
    listen: "Listen",
    showSolution: "Show solution",
    hideSolution: "Hide solution",
    answer: "Answer",
    loading: "Loading …",
  },
  dashboard: {
    welcomeBack: "Welcome back",
    subtitle: "Track your learning progress and next steps.",
    todayGoal: "Today's goal",
    completed: "Completed",
    favorites: "Favorites",
    streak: "Streak",
    recentActivity: "Recent activity",
    quickStart: "Quick start",
    openTrainer: "Open trainer",
    viewFavorites: "View favorites",
    discoverProfessions: "Discover professions",
    deckProgress: "Your learning progress",
    knownOfTotal: "{known} of {count} marked as known",
  },
  trainer: {
    title: "Trainer",
    subtitle: "Choose a mode and start your training.",
  },
  vocabularyNotebook: {
    title: "Vocabulary notebook",
    subtitle: "Keep track of your vocabulary with synonyms, antonyms and personal notes.",
    term: "Term",
    meaning: "Meaning / synonym",
    antonym: "Antonym",
    example: "Example sentence",
    notes: "Personal notes",
    status: "Status",
    field: "Professional field",
    category: "Category",
    allFields: "All professional fields",
    allCategories: "All categories",
    filterByField: "Filter by field",
    search: "Search term …",
    markKnown: "Known",
    markPractice: "Practiced",
    markNew: "New",
    enterAntonym: "Enter antonym",
    enterNotes: "Enter notes",
    antonymPrompt: "Enter a suitable antonym or opposite.",
    practiceMode: "Quiz mode",
    tableMode: "Table",
    showAnswer: "Show answer",
    hideAnswer: "Hide answer",
    check: "Check",
    correct: "Correct!",
    wrong: "Not quite. Keep practicing!",
    noEntries: "No vocabulary matches your filters.",
    red: "New",
    yellow: "Practiced",
    green: "Known",
  },
  classes: {
    myClasses: "My classes",
    joinClass: "Join class",
    classCode: "Class code",
    noClasses: "You have not joined any class yet.",
    noAssignments: "No assignments for this class yet.",
    assignments: "Assignments",
    backToClasses: "My classes",
    joinByCode: "Join by code",
    codePlaceholder: "e.g. A1B2C3",
    codeHelp: "Ask your teacher for the code.",
    joinFailed: "Joining failed. Please try again.",
    invalidCode: "No class found with this code.",
    missingCode: "Please enter a class code.",
  },
  public: {
    startLearning: "Start learning",
  },
};

const tr: Dictionary = {
  nav: {
    dashboard: "Panel",
    decks: "Desteler",
    trainer: "Eğitim",
    repetition: "Tekrar",
    flashcards: "Kartlar",
    search: "Ara",
    favorites: "Favoriler",
    profile: "Profil",
    classes: "Sınıflar",
    assignments: "Görevler",
    worksheet: "Çalışma Kağıdı",
    professions: "Meslek Alanları",
    communication: "İletişim",
    examTraining: "Sınav Hazırlığı",
    learn: "Öğren",
    grammar: "Dilbilgisi",
    redemittel: "İfadeler",
    vocabularyNotebook: "Kelime defteri",
    writing: "Yazma",
    reading: "Okuma",
    listening: "Dinleme",
    speaking: "Konuşma",
    admin: "Yönetici",
    users: "Kullanıcılar",
    exercises: "Alıştırmalar",
    logout: "Çıkış Yap",
    login: "Giriş Yap",
    register: "Kaydol",
    home: "Ana Sayfa",
    settings: "Ayarlar",
  },
  common: {
    start: "Başla",
    open: "Aç",
    save: "Kaydet",
    cancel: "İptal",
    close: "Kapat",
    back: "Geri",
    next: "İleri",
    check: "Kontrol Et",
    correct: "Doğru!",
    wrong: "Yanlış.",
    listen: "Dinle",
    showSolution: "Cevabı Göster",
    hideSolution: "Cevabı Gizle",
    answer: "Cevap",
    loading: "Yükleniyor …",
  },
  dashboard: {
    welcomeBack: "Tekrar hoş geldiniz",
    subtitle: "Öğrenme ilerlemenizi ve sonraki adımları buradan takip edin.",
    todayGoal: "Günlük Hedef",
    completed: "Tamamlanan",
    favorites: "Favoriler",
    streak: "Seri",
    recentActivity: "Son Etkinlikler",
    quickStart: "Hızlı Başlangıç",
    openTrainer: "Eğitimi Aç",
    viewFavorites: "Favorileri Gör",
    discoverProfessions: "Meslek Alanlarını Keşfet",
    deckProgress: "Öğrenme ilerlemeniz",
    knownOfTotal: "{count} üzerinden {known} bilindi olarak işaretlendi",
  },
  trainer: {
    title: "Eğitim",
    subtitle: "Bir mod seçin ve eğitiminize başlayın.",
  },
  vocabularyNotebook: {
    title: "Kelime defteri",
    subtitle: "Eşanlamlı, zıt anlamlı kelimeler ve kişisel notlarla kelime dağarcığınızı takip edin.",
    term: "Kelime",
    meaning: "Anlam / eşanlam",
    antonym: "Zıt anlam",
    example: "Örnek cümle",
    notes: "Kişisel notlar",
    status: "Durum",
    field: "Meslek alanı",
    category: "Kategori",
    allFields: "Tüm meslek alanları",
    allCategories: "Tüm kategoriler",
    filterByField: "Alana göre filtrele",
    search: "Kelime ara …",
    markKnown: "Biliyorum",
    markPractice: "Çalıştım",
    markNew: "Yeni",
    enterAntonym: "Zıt anlam girin",
    enterNotes: "Not girin",
    antonymPrompt: "Uygun bir zıt anlam veya karşıt kelime girin.",
    practiceMode: "Soru modu",
    tableMode: "Tablo",
    showAnswer: "Cevabı göster",
    hideAnswer: "Cevabı gizle",
    check: "Kontrol et",
    correct: "Doğru!",
    wrong: "Tam değil. Pratik yapmaya devam edin!",
    noEntries: "Filtrelerinize uygun kelime bulunamadı.",
    red: "Yeni",
    yellow: "Çalışıldı",
    green: "Bilinen",
  },
  classes: {
    myClasses: "Sınıflarım",
    joinClass: "Sınıfa katıl",
    classCode: "Sınıf kodu",
    noClasses: "Henüz bir sınıfa katılmadınız.",
    noAssignments: "Bu sınıf için henüz görev yok.",
    assignments: "Görevler",
    backToClasses: "Sınıflarım",
    joinByCode: "Kod ile katıl",
    codePlaceholder: "örn. A1B2C3",
    codeHelp: "Kodu öğretmeninizden alın.",
    joinFailed: "Katılım başarısız oldu. Lütfen tekrar deneyin.",
    invalidCode: "Bu kodla bir sınıf bulunamadı.",
    missingCode: "Lütfen bir sınıf kodu girin.",
  },
  public: {
    startLearning: "Öğrenmeye Başla",
  },
};

const uk: Dictionary = {
  nav: {
    dashboard: "Панель керування",
    decks: "Колоди",
    trainer: "Тренажер",
    repetition: "Повторення",
    flashcards: "Картки",
    search: "Пошук",
    favorites: "Обране",
    profile: "Профіль",
    classes: "Класи",
    assignments: "Завдання",
    worksheet: "Робочий аркуш",
    professions: "Професійні галузі",
    communication: "Спілкування",
    examTraining: "Підготовка до іспиту",
    learn: "Навчання",
    grammar: "Граматика",
    redemittel: "Мовні зразки",
    vocabularyNotebook: "Словник",
    writing: "Письмо",
    reading: "Читання",
    listening: "Слухання",
    speaking: "Говоріння",
    admin: "Адмін",
    users: "Користувачі",
    exercises: "Вправи",
    logout: "Вийти",
    login: "Увійти",
    register: "Зареєструватися",
    home: "Головна",
    settings: "Налаштування",
  },
  common: {
    start: "Почати",
    open: "Відкрити",
    save: "Зберегти",
    cancel: "Скасувати",
    close: "Закрити",
    back: "Назад",
    next: "Далі",
    check: "Перевірити",
    correct: "Правильно!",
    wrong: "Неправильно.",
    listen: "Слухати",
    showSolution: "Показати розв'язок",
    hideSolution: "Приховати розв'язок",
    answer: "Відповідь",
    loading: "Завантаження …",
  },
  dashboard: {
    welcomeBack: "Ласкаво просимо",
    subtitle: "Тут ви бачите свій прогрес і наступні кроки.",
    todayGoal: "Ціль на сьогодні",
    completed: "Завершено",
    favorites: "Обране",
    streak: "Серія",
    recentActivity: "Остання активність",
    quickStart: "Швидкий старт",
    openTrainer: "Відкрити тренажер",
    viewFavorites: "Переглянути обране",
    discoverProfessions: "Дослідити професії",
    deckProgress: "Ваш прогрес у навчанні",
    knownOfTotal: "{known} з {count} позначено як вивчене",
  },
  classes: {
    myClasses: "Мої класи",
    joinClass: "Приєднатися до класу",
    classCode: "Код класу",
    noClasses: "Ви ще не приєдналися до жодного класу.",
    noAssignments: "Для цього класу ще немає завдань.",
    assignments: "Завдання",
    backToClasses: "Мої класи",
    joinByCode: "Приєднатися за кодом",
    codePlaceholder: "напр. A1B2C3",
    codeHelp: "Отримайте код від викладача.",
    joinFailed: "Не вдалося приєднатися. Спробуйте ще раз.",
    invalidCode: "Клас із таким кодом не знайдено.",
    missingCode: "Будь ласка, введіть код класу.",
  },
  trainer: {
    title: "Тренажер",
    subtitle: "Оберіть режим і розпочніть тренування.",
  },
  vocabularyNotebook: {
    title: "Словник",
    subtitle: "Слідкуйте за своїм словниковим запасом: синоніми, антоніми та особисті нотатки.",
    term: "Слово",
    meaning: "Значення / синонім",
    antonym: "Антонім",
    example: "Приклад речення",
    notes: "Особисті нотатки",
    status: "Статус",
    field: "Галузь",
    category: "Категорія",
    allFields: "Усі галузі",
    allCategories: "Усі категорії",
    filterByField: "Фільтр за галуззю",
    search: "Шукати слово …",
    markKnown: "Знаю",
    markPractice: "Практикував",
    markNew: "Нове",
    enterAntonym: "Введіть антонім",
    enterNotes: "Введіть нотатки",
    antonymPrompt: "Введіть відповідний антонім або протилежне слово.",
    practiceMode: "Режим запитань",
    tableMode: "Таблиця",
    showAnswer: "Показати відповідь",
    hideAnswer: "Приховати відповідь",
    check: "Перевірити",
    correct: "Правильно!",
    wrong: "Не зовсім. Продовжуйте практикуватися!",
    noEntries: "Немає слів, що відповідають вашим фільтрам.",
    red: "Нове",
    yellow: "Практиковане",
    green: "Відоме",
  },
  public: {
    startLearning: "Почати навчання",
  },
};

const ar: Dictionary = {
  nav: {
    dashboard: "لوحة التحكم",
    decks: "الرُزم",
    trainer: "التدريب",
    repetition: "التكرار",
    flashcards: "البطاقات",
    search: "بحث",
    favorites: "المفضلة",
    profile: "الملف الشخصي",
    classes: "الفصول",
    assignments: "التمارين",
    worksheet: "ورقة العمل",
    professions: "المجالات المهنية",
    communication: "التواصل",
    examTraining: "التدريب على الامتحان",
    learn: "تعلم",
    grammar: "القواعد",
    redemittel: "العبارات",
    vocabularyNotebook: "دفتر المفردات",
    writing: "الكتابة",
    reading: "القراءة",
    listening: "الاستماع",
    speaking: "التحدث",
    admin: "الإدارة",
    users: "المستخدمون",
    exercises: "التمارين",
    logout: "تسجيل الخروج",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    home: "الرئيسية",
    settings: "الإعدادات",
  },
  common: {
    start: "ابدأ",
    open: "فتح",
    save: "حفظ",
    cancel: "إلغاء",
    close: "إغلاق",
    back: "رجوع",
    next: "التالي",
    check: "تحقق",
    correct: "صحيح!",
    wrong: "خطأ.",
    listen: "استمع",
    showSolution: "إظهار الحل",
    hideSolution: "إخفاء الحل",
    answer: "إجابة",
    loading: "جارٍ التحميل …",
  },
  dashboard: {
    welcomeBack: "مرحبًا بعودتك",
    subtitle: "تتبع تقدمك في التعلم وخطواتك التالية.",
    todayGoal: "هدف اليوم",
    completed: "مكتمل",
    favorites: "المفضلة",
    streak: "السلسلة",
    recentActivity: "النشاط الأخير",
    quickStart: "بدء سريع",
    openTrainer: "فتح التدريب",
    viewFavorites: "عرض المفضلة",
    discoverProfessions: "استكشف المجالات المهنية",
    deckProgress: "تقدمك في التعلم",
    knownOfTotal: "تم تمييز {known} من أصل {count} كمُتعلم",
  },
  trainer: {
    title: "التدريب",
    subtitle: "اختر وضعًا وابدأ تدريبك.",
  },
  vocabularyNotebook: {
    title: "دفتر المفردات",
    subtitle: "تتبع مفرداتك مع المرادفات والأضداد وملاحظاتك الشخصية.",
    term: "المصطلح",
    meaning: "المعنى / المرادف",
    antonym: "الضد",
    example: "جملة مثال",
    notes: "ملاحظات شخصية",
    status: "الحالة",
    field: "المجال المهني",
    category: "الفئة",
    allFields: "جميع المجالات المهنية",
    allCategories: "جميع الفئات",
    filterByField: "تصفية حسب المجال",
    search: "البحث عن مصطلح …",
    markKnown: "مُحفوظ",
    markPractice: "تم التدريب",
    markNew: "جديد",
    enterAntonym: "أدخل الضد",
    enterNotes: "أدخل الملاحظات",
    antonymPrompt: "أدخل ضدًا مناسبًا أو كلمة معاكسة.",
    practiceMode: "وضع الاختبار",
    tableMode: "الجدول",
    showAnswer: "إظهار الإجابة",
    hideAnswer: "إخفاء الإجابة",
    check: "تحقق",
    correct: "صحيح!",
    wrong: "ليس تمامًا. واصل الممارسة!",
    noEntries: "لا توجد مفردات تطابق عوامل التصفية الخاصة بك.",
    red: "جديد",
    yellow: "تم التدريب",
    green: "مُحفوظ",
  },
  classes: {
    myClasses: "فصولي",
    joinClass: "الانضمام إلى فصل",
    classCode: "رمز الفصل",
    noClasses: "لم تنضم إلى أي فصل بعد.",
    noAssignments: "لا توجد تمارين لهذا الفصل بعد.",
    assignments: "التمارين",
    backToClasses: "فصولي",
    joinByCode: "الانضمام عبر الرمز",
    codePlaceholder: "مثال A1B2C3",
    codeHelp: "احصل على الرمز من معلمك.",
    joinFailed: "فشل الانضمام. يرجى المحاولة مرة أخرى.",
    invalidCode: "لم يتم العثور على فصل بهذا الرمز.",
    missingCode: "يرجى إدخال رمز الفصل.",
  },
  public: {
    startLearning: "ابدأ التعلم",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { de, en, tr, ar, uk };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? de;
}
