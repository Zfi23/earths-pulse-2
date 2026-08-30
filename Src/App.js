import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [currentEnv, setCurrentEnv] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [isArabic, setIsArabic] = useState(true);
  const [showPanorama, setShowPanorama] = useState(false);
  const [panoramaRotation, setPanoramaRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // ===== بيانات البيئات =====
  const environmentData = {
    forest: {
      name: isArabic ? "الغابة" : "Forest",
      icon: "🌳",
      desc: isArabic ? "الرئة الخضراء للأرض" : "The green lungs of Earth",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
      detail: isArabic ? "الغابات المطيرة تنتج أكثر من 20% من أكسجين الأرض، لكنها تختفي بمعدل ملايين الهكتارات سنويًا بسبب إزالة الأشجار." : "Rainforests produce over 20% of Earth's oxygen, yet they disappear at a rate of millions of hectares yearly due to deforestation.",
      report: isArabic ? "تغطي الغابات المطيرة حوالي 6% من سطح الأرض، لكنها موطن لأكثر من 50% من التنوع البيولوجي العالمي. يتم فقدان حوالي 10 ملايين هكتار من الغابات سنوياً." : "Rainforests cover about 6% of Earth's surface, but are home to over 50% of global biodiversity. Approximately 10 million hectares of forest are lost annually.",
      stats: [
        { label: isArabic ? "المساحة المتبقية" : "Remaining Area", value: "~4 مليار هكتار" },
        { label: isArabic ? "معدل الفقد السنوي" : "Annual Loss Rate", value: "10 ملايين هكتار" },
        { label: isArabic ? "نسبة الأكسجين المنتج" : "Oxygen Produced", value: "20%" },
        { label: isArabic ? "التنوع البيولوجي" : "Biodiversity", value: "50% من الأنواع" }
      ],
      videoUrl: "https://www.youtube.com/embed/JkaxUblCGz0"
    },
    ocean: {
      name: isArabic ? "المحيط" : "Ocean",
      icon: "🌊",
      desc: isArabic ? "قلب الحياة الأزرق" : "The blue heart of life",
      image: "https://images.unsplash.com/photo-1439405326854-014607f694d7?w=1200&q=80",
      detail: isArabic ? "المحيطات تغطي 70% من سطح الأرض وتنتج نصف الأكسجين الذي نتنفسه، لكنها تتعرض لتحمّض متزايد بسبب انبعاثات الكربون." : "Oceans cover 70% of Earth's surface and produce half the oxygen we breathe, yet face growing acidification from carbon emissions.",
      report: isArabic ? "تغطي المحيطات 71% من سطح الأرض وتحتوي على 97% من مياه الكوكب. منذ الثورة الصناعية، زادت حموضة المحيطات بنسبة 30%." : "Oceans cover 71% of Earth's surface and contain 97% of the planet's water. Since the Industrial Revolution, ocean acidity has increased by 30%.",
      stats: [
        { label: isArabic ? "المساحة" : "Area", value: "361 مليون كم²" },
        { label: isArabic ? "نسبة الأكسجين المنتج" : "Oxygen Produced", value: "50%" },
        { label: isArabic ? "ارتفاع الحموضة" : "Acidity Increase", value: "30% منذ 1850" },
        { label: isArabic ? "الشعاب المرجانية المهددة" : "Coral Reefs Threatened", value: "75%" }
      ],
      videoUrl: "https://www.youtube.com/embed/2SVs0R8opGg"
    },
    arctic: {
      name: isArabic ? "القطب" : "Arctic",
      icon: "❄️",
      desc: isArabic ? "حارس التوازن المناخي" : "Guardian of climate balance",
      image: "https://images.unsplash.com/photo-1517783999520-f068d7431a60?w=1200&q=80",
      detail: isArabic ? "الجليد القطبي يعكس أشعة الشمس ويحافظ على استقرار مناخ الأرض، لكنه يذوب بمعدل غير مسبوق بسبب ارتفاع الحرارة." : "Arctic ice reflects sunlight and stabilizes Earth's climate, yet it's melting at an unprecedented rate due to rising temperatures.",
      report: isArabic ? "فقدت القارة القطبية الجنوبية أكثر من 3 تريليون طن من الجليد بين عامي 1992 و2017. إذا ذاب كل الجليد في جرينلاند، سيرتفع مستوى سطح البحر بـ 7 أمتار." : "Antarctica has lost more than 3 trillion tons of ice between 1992 and 2017. If all of Greenland's ice melted, sea levels would rise by 7 meters.",
      stats: [
        { label: isArabic ? "فقدان الجليد" : "Ice Loss", value: "3 تريليون طن" },
        { label: isArabic ? "ارتفاع درجة الحرارة" : "Temperature Rise", value: "+3°C في القطب" },
        { label: isArabic ? "ارتفاع مستوى البحر المتوقع" : "Sea Level Rise", value: "7 أمتار" },
        { label: isArabic ? "ذوبان الجليد السنوي" : "Annual Ice Melt", value: "~280 مليار طن" }
      ],
      videoUrl: "https://www.youtube.com/embed/0vHcV0Fk4eE"
    }
  };

  // ===== دوال التنقل =====
  const goHome = () => {
    setCurrentPage('home');
    setShowPanorama(false);
  };

  const goToEnvironment = (envKey) => {
    setCurrentEnv(envKey);
    setCurrentPage('environment');
    setShowPanorama(false);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };

  // ===== دوال الـ Panorama =====
  const startPanorama = () => {
    setShowPanorama(true);
    setPanoramaRotation(0);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setPanoramaRotation(prev => prev + delta * 0.5);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartX(touch.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const delta = touch.clientX - startX;
    setPanoramaRotation(prev => prev + delta * 0.5);
    setStartX(touch.clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // ===== عرض شاشة التحميل =====
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="pulse-circle"></div>
        <h1 className="loading-title">نبض الأرض</h1>
        <p className="loading-subtitle">EARTH'S PULSE</p>
        <div className="loading-dots"><span></span><span></span><span></span></div>
      </div>
    );
  }

  // ===== الصفحة الرئيسية =====
  if (currentPage === 'home') {
    return (
      <div className={`app ${isDark ? 'dark' : 'light'}`}>
        <nav className="navbar">
          <div className="nav-left">
            <button className="nav-link active">الرئيسية</button>
            <button className="nav-link" onClick={() => setCurrentPage('clock')}>الساعة الكوكبية</button>
            <button className="nav-link" onClick={() => setCurrentPage('help')}>المساعدة</button>
            <button className="nav-link" onClick={() => setCurrentPage('about')}>من نحن</button>
          </div>
          <div className="nav-controls">
            <button className="nav-btn" onClick={toggleTheme}>
              {isDark ? '🌙' : '☀️'}
            </button>
            <button className="nav-btn" onClick={toggleLanguage}>
              {isArabic ? 'EN' : 'AR'}
            </button>
          </div>
        </nav>

        <header className="hero">
          <div className="badge"><span className="dot"></span> {isArabic ? 'مراقبة كوكبية حية' : 'Live planetary monitoring'}</div>
          <h1>{isArabic ? 'نبض الأرض' : 'EARTH\'S PULSE'}</h1>
          <p>{isArabic ? 'منصة لمراقبة نبض كوكبنا — الغابات والمحيطات والقطب' : 'A platform for monitoring the pulse of our planet'}</p>
        </header>

        <section className="cards">
          {['forest', 'ocean', 'arctic'].map((key) => (
            <div key={key} className={`card card-${key}`} onClick={() => goToEnvironment(key)}>
              <div className="card-overlay">
                <h3>{environmentData[key].icon} {environmentData[key].name}</h3>
                <p>{environmentData[key].desc}</p>
                <span className="btn">{isArabic ? 'استكشف →' : 'Explore →'}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  }

  // ===== صفحة الساعة الكوكبية =====
  if (currentPage === 'clock') {
    const boundaries = [
      { name: isArabic ? "التغيّر المناخي" : "Climate Change", status: isArabic ? "تجاوز" : "Exceeded", level: "danger", pct: 85 },
      { name: isArabic ? "فقدان التنوع الحيوي" : "Biodiversity Loss", status: isArabic ? "تجاوز" : "Exceeded", level: "danger", pct: 90 },
      { name: isArabic ? "تغيّر استخدام الأراضي" : "Land-Use Change", status: isArabic ? "قريب من الحد" : "Near Limit", level: "warning", pct: 65 },
      { name: isArabic ? "تحمّض المحيطات" : "Ocean Acidification", status: isArabic ? "ضمن الحد الآمن" : "Within Safe Zone", level: "safe", pct: 35 },
      { name: isArabic ? "المياه العذبة" : "Freshwater Use", status: isArabic ? "ضمن الحد الآمن" : "Within Safe Zone", level: "safe", pct: 40 },
      { name: isArabic ? "النيتروجين والفوسفور" : "Nitrogen & Phosphorus", status: isArabic ? "تجاوز" : "Exceeded", level: "danger", pct: 95 },
      { name: isArabic ? "استنزاف الأوزون" : "Ozone Depletion", status: isArabic ? "ضمن الحد الآمن" : "Within Safe Zone", level: "safe", pct: 20 },
      { name: isArabic ? "الهباء الجوي" : "Atmospheric Aerosols", status: isArabic ? "قيد الدراسة" : "Under Study", level: "warning", pct: 55 },
      { name: isArabic ? "المواد الكيميائية الجديدة" : "Novel Chemicals", status: isArabic ? "تجاوز" : "Exceeded", level: "danger", pct: 88 }
    ];

    return (
      <div className={`app ${isDark ? 'dark' : 'light'}`}>
        <nav className="navbar">
          <div className="nav-left">
            <button className="nav-link" onClick={goHome}>{isArabic ? 'الرئيسية' : 'Home'}</button>
            <button className="nav-link active">{isArabic ? 'الساعة الكوكبية' : 'Planetary Clock'}</button>
            <button className="nav-link" onClick={() => setCurrentPage('help')}>{isArabic ? 'المساعدة' : 'Help'}</button>
            <button className="nav-link" onClick={() => setCurrentPage('about')}>{isArabic ? 'من نحن' : 'About Us'}</button>
          </div>
          <div className="nav-controls">
            <button className="nav-btn" onClick={toggleTheme}>{isDark ? '🌙' : '☀️'}</button>
            <button className="nav-btn" onClick={toggleLanguage}>{isArabic ? 'EN' : 'AR'}</button>
          </div>
        </nav>

        <div className="clock-page">
          <h2>{isArabic ? 'الساعة الكوكبية' : 'Planetary Clock'}</h2>
          <h3 className="clock-subtitle">{isArabic ? 'الحدود التسعة لسلامة الأرض' : 'The Nine Planetary Boundaries'}</h3>
          <p className="clock-desc">{isArabic ? 'مفهوم علمي يوضح الحدود الآمنة التي يجب أن يحافظ عليها البشر لضمان استقرار الحياة على كوكب الأرض.' : 'A scientific concept showing the safe limits humanity must maintain to ensure life remains stable on planet Earth.'}</p>

          <div className="boundaries-grid">
            {boundaries.map((b, i) => (
              <div key={i} className={`boundary-card level-${b.level}`}>
                <div className="boundary-top">
                  <span className="boundary-dot"></span>
                  <div>
                    <div className="boundary-name">{b.name}</div>
                    <div className="boundary-status">{b.status}</div>
                  </div>
                </div>
                <div className="boundary-bar-track">
                  <div className={`boundary-bar-fill level-${b.level}`} style={{ width: `${b.pct}%` }}></div>
                </div>
                <div className="boundary-pct">{b.pct}%</div>
              </div>
            ))}
          </div>

          <button className="back-btn" onClick={goHome} style={{ marginTop: '30px' }}>
            ← {isArabic ? 'العودة للرئيسية' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  // ===== صفحة المساعدة =====
  if (currentPage === 'help') {
    return (
      <div className={`app ${isDark ? 'dark' : 'light'}`}>
        <nav className="navbar">
          <div className="nav-left">
            <button className="nav-link" onClick={goHome}>{isArabic ? 'الرئيسية' : 'Home'}</button>
            <button className="nav-link" onClick={() => setCurrentPage('clock')}>{isArabic ? 'الساعة الكوكبية' : 'Planetary Clock'}</button>
            <button className="nav-link active">{isArabic ? 'المساعدة' : 'Help'}</button>
            <button className="nav-link" onClick={() => setCurrentPage('about')}>{isArabic ? 'من نحن' : 'About Us'}</button>
          </div>
          <div className="nav-controls">
            <button className="nav-btn" onClick={toggleTheme}>{isDark ? '🌙' : '☀️'}</button>
            <button className="nav-btn" onClick={toggleLanguage}>{isArabic ? 'EN' : 'AR'}</button>
          </div>
        </nav>

        <div className="info-page">
          <h2>{isArabic ? 'المساعدة' : 'Help'}</h2>
          <p>{isArabic ? 'نبض الأرض منصة تفاعلية تأخذك في رحلة استكشاف لثلاث بيئات مهددة حول العالم. اختر بيئة من الصفحة الرئيسية لتبدأ رحلتك، واستخدم أزرار اللغة والوضع الليلي/النهاري من الشريط العلوي لتخصيص تجربتك.' : 'Earth\'s Pulse is an interactive platform that takes you on a journey exploring three endangered environments around the world. Choose an environment from the home page to begin, and use the language and theme toggles in the top bar to customize your experience.'}</p>
          <button className="back-btn" onClick={goHome} style={{ marginTop: '30px' }}>
            ← {isArabic ? 'العودة للرئيسية' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  // ===== صفحة من نحن =====
  if (currentPage === 'about') {
    return (
      <div className={`app ${isDark ? 'dark' : 'light'}`}>
        <nav className="navbar">
          <div className="nav-left">
            <button className="nav-link" onClick={goHome}>{isArabic ? 'الرئيسية' : 'Home'}</button>
            <button className="nav-link" onClick={() => setCurrentPage('clock')}>{isArabic ? 'الساعة الكوكبية' : 'Planetary Clock'}</button>
            <button className="nav-link" onClick={() => setCurrentPage('help')}>{isArabic ? 'المساعدة' : 'Help'}</button>
            <button className="nav-link active">{isArabic ? 'من نحن' : 'About Us'}</button>
          </div>
          <div className="nav-controls">
            <button className="nav-btn" onClick={toggleTheme}>{isDark ? '🌙' : '☀️'}</button>
            <button className="nav-btn" onClick={toggleLanguage}>{isArabic ? 'EN' : 'AR'}</button>
          </div>
        </nav>

        <div className="info-page">
          <h2>{isArabic ? 'من نحن' : 'About Us'}</h2>
          <p>{isArabic ? 'نبض الأرض مشروع تعليمي يهدف لتوعية المستخدمين بالتحديات البيئية الحقيقية عبر تجربة بصرية وتفاعلية، بدلاً من عرض بيانات جامدة. صُمم هذا المشروع بشغف لخدمة قضية بيئية عالمية.' : 'Earth\'s Pulse is an educational project aimed at raising awareness about real environmental challenges through a visual, interactive experience instead of static data. This project was built with passion to serve a global environmental cause.'}</p>
          <button className="back-btn" onClick={goHome} style={{ marginTop: '30px' }}>
            ← {isArabic ? 'العودة للرئيسية' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  // ===== صفحة تفاصيل البيئة =====
  if (currentPage === 'environment' && currentEnv && !showPanorama) {
    const env = environmentData[currentEnv];
    return (
      <div className={`app ${isDark ? 'dark' : 'light'}`}>
        <nav className="navbar">
          <div className="nav-left">
            <button className="nav-link" onClick={goHome}>{isArabic ? 'الرئيسية' : 'Home'}</button>
            <button className="nav-link" onClick={() => setCurrentPage('clock')}>{isArabic ? 'الساعة الكوكبية' : 'Planetary Clock'}</button>
            <button className="nav-link" onClick={() => setCurrentPage('help')}>{isArabic ? 'المساعدة' : 'Help'}</button>
            <button className="nav-link" onClick={() => setCurrentPage('about')}>{isArabic ? 'من نحن' : 'About Us'}</button>
          </div>
          <div className="nav-controls">
            <button className="nav-btn" onClick={toggleTheme}>{isDark ? '🌙' : '☀️'}</button>
            <button className="nav-btn" onClick={toggleLanguage}>{isArabic ? 'EN' : 'AR'}</button>
          </div>
        </nav>

        <div className="env-detail">
          <button className="back-btn" onClick={goHome}>← {isArabic ? 'رجوع' : 'Back'}</button>

          <div className="env-hero-image">
            <img src={env.image} alt={env.name} />
            <button className="explore-360-btn" onClick={startPanorama}>
              <span>🔄</span> {isArabic ? 'استكشف البيئة 360°' : 'Explore 360°'}
            </button>
          </div>

          <div className="env-report">
            <h2>{env.icon} {env.name}</h2>
            <p className="env-desc">{env.desc}</p>
            <p className="env-report-text">{env.report}</p>

            <h3 className="stats-title">{isArabic ? 'إحصائيات علمية' : 'Scientific Statistics'}</h3>
            <div className="stats-grid">
              {env.stats.map((stat, i) => (
                <div key={i} className="stat-card">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="video-container">
              <h3>{isArabic ? 'شاهد التقرير' : 'Watch Report'}</h3>
              <iframe src={env.videoUrl} title={env.name} frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== عرض 360 =====
  if (currentPage === 'environment' && currentEnv && showPanorama) {
    const env = environmentData[currentEnv];
    return (
      <div className={`app ${isDark ? 'dark' : 'light'}`}>
        <nav className="navbar">
          <div className="nav-left">
            <button className="nav-link" onClick={goHome}>{isArabic ? 'الرئيسية' : 'Home'}</button>
            <button className="nav-link" onClick={() => setCurrentPage('clock')}>{isArabic ? 'الساعة الكوكبية' : 'Planetary Clock'}</button>
            <button className="nav-link" onClick={() => setCurrentPage('help')}>{isArabic ? 'المساعدة' : 'Help'}</button>
            <button className="nav-link" onClick={() => setCurrentPage('about')}>{isArabic ? 'من نحن' : 'About Us'}</button>
          </div>
          <div className="nav-controls">
            <button className="nav-btn" onClick={toggleTheme}>{isDark ? '🌙' : '☀️'}</button>
            <button className="nav-btn" onClick={toggleLanguage}>{isArabic ? 'EN' : 'AR'}</button>
          </div>
        </nav>

        <div className="panorama-container">
          <button className="back-btn" onClick={() => setShowPanorama(false)}>← {isArabic ? 'رجوع' : 'Back'}</button>
          <h2 className="panorama-title">{env.name} - {isArabic ? 'عرض 360°' : '360° View'}</h2>

          <div className="panorama-viewer"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
            <div className="panorama-image" style={{
              backgroundImage: `url(${env.image})`,
              transform: `rotateY(${panoramaRotation}deg)`
            }}></div>
            <div className="panorama-hint">↔ {isArabic ? 'اسحب للاستكشاف' : 'Drag to explore'}</div>
            <div className="panorama-progress">
              {[0,1,2,3,4,5,6,7].map(i => (
                <span key={i} className={`dot ${Math.round(((panoramaRotation % 360 + 360) % 360) / 45) === i ? 'active' : ''}`}></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>صفحة غير موجودة</div>;
}

export default App;
