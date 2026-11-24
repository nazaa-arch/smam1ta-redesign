/* ==========================================================================
   SMA Muhammadiyah 1 Taman (SMAM1TA) — Interactive Redesign Logic
   ========================================================================== */

(function () {
  'use strict';

  /* 1. Sticky Header Elevation & Scroll-Reveal Floating Pitch Pill */
  const header = document.getElementById('siteHeader');
  const floatingPitch = document.querySelector('.floating-pitch');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
    if (floatingPitch) floatingPitch.classList.toggle('is-visible', window.scrollY > 420);
  }, { passive: true });

  /* 2. Mobile Drawer */
  const drawer = document.getElementById('mobileDrawer');
  const openDrawerBtn = document.getElementById('openDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawer');

  function toggleDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  openDrawerBtn?.addEventListener('click', () => toggleDrawer(true));
  closeDrawerBtn?.addEventListener('click', () => toggleDrawer(false));
  drawer?.addEventListener('click', (e) => {
    if (e.target === drawer) toggleDrawer(false);
  });
  document.querySelectorAll('.drawer-link').forEach((link) => {
    link.addEventListener('click', () => toggleDrawer(false));
  });

  /* 3. Program Unggulan Interactive Explorer */
  const PROGRAMS = {
    excellent: {
      badge: 'Bidang Kurikulum • Jalur Reguler Unggulan',
      title: 'Excellent Class',
      desc: 'Program pembelajaran berbasis Kurikulum Merdeka dengan integrasi teknologi digital, pendalaman riset ilmiah, literasi-numerasi, serta pembentukan karakter Islami #RESPECT School.',
      bullets: [
        'Pembelajaran proyek (Project-Based Learning) di ruang kelas ber-AC & proyektor interaktif.',
        'Penguatan literasi, numerasi, pembinaan olimpiade, serta program Study Research.',
        'Pendampingan studi lanjut PTN/PTS favorit melalui Study Campus & konseling karier.'
      ],
      img: 'https://smam1ta.sch.id/wp-content/uploads/2025/08/Website-Banner-1.png',
      statLabel: 'SPP Bulanan (Juli 2026)',
      statValue: 'Rp 800.000 / bulan'
    },
    mico: {
      badge: 'Bidang Kurikulum • Muhammadiyah International Class Orientation',
      title: 'M-ICO International Class',
      desc: 'Kelas berorientasi internasional dengan pengantar bilingual, proyek kolaborasi lintas budaya, ujian sertifikasi TOEFL ITP di Universitas Airlangga, dan peluang Edu Exchange luar negeri.',
      bullets: [
        'Pembelajaran bilingual aktif dengan kurikulum penguatan komunikasi Bahasa Inggris.',
        'Ujian resmi TOEFL ITP di Pusat Bahasa Universitas Airlangga (UNAIR).',
        'Kemitraan global & kunjungan kampus internasional (NUS Singapore, University of Malaya, IIUM).'
      ],
      img: 'https://smam1ta.sch.id/wp-content/uploads/2025/08/Website-Banner-2.png',
      statLabel: 'SPP Bulanan (Juli 2026)',
      statValue: 'Rp 1.200.000 / bulan'
    },
    tahfidz: {
      badge: 'Bidang ISMUBA • Program Khusus Tahfidzul Qur’an',
      title: 'Tahfidz Class',
      desc: 'Jalur khusus penghafal Al-Qur’an yang menyeimbangkan target hafalan terukur dengan capaian akademik unggul, pendalaman Al-Islam, Kemuhammadiyahan, dan Bahasa Arab.',
      bullets: [
        'Target hafalan Al-Qur’an minimal 3 Juz dengan bimbingan ustadz/ustadzah bersanad & berpengalaman.',
        'Integrasi kurikulum ISMUBA (Al-Islam, Kemuhammadiyahan, dan Bahasa Arab) secara mendalam.',
        'Lingkungan pembiasaan ibadah harian, muroja’ah terjadwal, dan kesiapan jalur prestasi Tahfidz PTN.'
      ],
      img: 'https://smam1ta.sch.id/wp-content/uploads/2025/08/Website-Banner-3.png',
      statLabel: 'Target Hafalan & SPP',
      statValue: 'Min. 3 Juz • Rp 1.000.000/bln'
    }
  };

  let activeProgram = 'excellent';
  const progTabs = document.querySelectorAll('.program-tab');
  const progBadge = document.getElementById('progBadge');
  const progTitle = document.getElementById('progTitle');
  const progDesc = document.getElementById('progDesc');
  const progBullets = document.getElementById('progBullets');
  const progImg = document.getElementById('progImg');
  const progStatLabel = document.getElementById('progStatLabel');
  const progStatValue = document.getElementById('progStatValue');

  function renderProgram(key) {
    const data = PROGRAMS[key];
    if (!data) return;
    activeProgram = key;
    progBadge.textContent = data.badge;
    progTitle.textContent = data.title;
    progDesc.textContent = data.desc;
    progBullets.innerHTML = data.bullets
      .map((item) => `<li><span class="check-icon">✓</span><span>${item}</span></li>`)
      .join('');
    progImg.src = data.img;
    progImg.alt = data.title + ' SMA Muhammadiyah 1 Taman';
    progStatLabel.textContent = data.statLabel;
    progStatValue.textContent = data.statValue;

    progTabs.forEach((tab) => {
      const isMatch = tab.dataset.program === key;
      tab.classList.toggle('is-active', isMatch);
      tab.setAttribute('aria-selected', String(isMatch));
    });
  }

  progTabs.forEach((tab) => {
    tab.addEventListener('click', () => renderProgram(tab.dataset.program));
  });

  /* 4. Interactive SPMB 2026/2027 Fee Calculator (Official SMAM1TA Data) */
  const FEES = {
    excellent: { label: 'Excellent Class', pangkal: 10000000, spp: 800000, kegiatan: 4250000 },
    mico: { label: 'M-ICO International', pangkal: 10000000, spp: 1200000, kegiatan: 6750000 },
    tahfidz: { label: 'Tahfidz Class', pangkal: 10000000, spp: 1000000, kegiatan: 4250000 }
  };
  const SERAGAM = { putra: 1800000, putri: 2100000 };

  let calcTrack = 'excellent';
  let calcGender = 'putra';

  const formatRupiah = (n) => 'Rp ' + n.toLocaleString('id-ID');

  function updateCalculator() {
    const item = FEES[calcTrack];
    const seragam = SERAGAM[calcGender];
    const total = item.pangkal + item.spp + item.kegiatan + seragam;

    document.getElementById('feePangkal').textContent = formatRupiah(item.pangkal);
    document.getElementById('feeSpp').textContent = formatRupiah(item.spp);
    document.getElementById('feeKegiatan').textContent = formatRupiah(item.kegiatan);
    document.getElementById('feeSeragam').textContent = formatRupiah(seragam);
    document.getElementById('feeTotal').textContent = formatRupiah(total);

    const genderLabel = calcGender === 'putra' ? 'Putra' : 'Putri';
    const waText = encodeURIComponent(
      `Assalamu'alaikum Wr. Wb. Saya tertarik mendaftar SPMB SMAM1TA TA 2026/2027 untuk jalur ${item.label} (${genderLabel}) dengan estimasi total ${formatRupiah(total)}. Mohon informasi jadwal tes & pendaftaran.`
    );
    document.getElementById('calcWaBtn').href = `https://wa.me/6281319457080?text=${waText}`;

    document.querySelectorAll('#calcTrackGroup .seg-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.track === calcTrack);
    });
    document.querySelectorAll('#calcGenderGroup .seg-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.gender === calcGender);
    });
  }

  document.querySelectorAll('#calcTrackGroup .seg-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      calcTrack = btn.dataset.track;
      updateCalculator();
    });
  });

  document.querySelectorAll('#calcGenderGroup .seg-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      calcGender = btn.dataset.gender;
      updateCalculator();
    });
  });

  document.getElementById('progCalcJump')?.addEventListener('click', () => {
    calcTrack = activeProgram;
    updateCalculator();
    document.getElementById('spmb')?.scrollIntoView({ behavior: 'smooth' });
  });

  updateCalculator();

  /* 5. Filterable Prestasi Grid */
  document.querySelectorAll('#awardFilters .filter-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      const filter = pill.dataset.filter;
      document.querySelectorAll('#awardFilters .filter-pill').forEach((b) => b.classList.remove('is-active'));
      pill.classList.add('is-active');

      document.querySelectorAll('#awardsGrid .award-card').forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? 'flex' : 'none';
      });
    });
  });

  /* 6. Filterable News Grid + Modal Reader */
  document.querySelectorAll('#newsFilters .filter-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      const cat = pill.dataset.news;
      document.querySelectorAll('#newsFilters .filter-pill').forEach((b) => b.classList.remove('is-active'));
      pill.classList.add('is-active');

      document.querySelectorAll('#newsGrid .news-card').forEach((card) => {
        const show = cat === 'all' || card.dataset.newsCat === cat;
        card.style.display = show ? 'flex' : 'none';
      });
    });
  });

  const ARTICLES = [
    {
      title: 'Ukur Kemampuan Bahasa Inggris Berstandar Internasional, Siswa M-ICO Smamita Jalani TOEFL ITP di Unair',
      date: '24 November 2026 • Akademik & M-ICO',
      body: `<p style="margin-bottom:14px;">Siswa kelas <strong>Muhammadiyah International Class Orientation (M-ICO)</strong> SMA Muhammadiyah 1 Taman mengikuti ujian sertifikasi bahasa Inggris berstandar internasional <strong>TOEFL ITP</strong> di Pusat Bahasa Universitas Airlangga (UNAIR).</p>
      <p style="margin-bottom:14px;">Kegiatan ini merupakan bagian dari komitmen SMAM1TA dalam memastikan lulusan M-ICO memiliki kompetensi bahasa Inggris terukur sebagai bekal melanjutkan pendidikan ke perguruan tinggi bergengsi di dalam maupun luar negeri.</p>
      <p>Selain TOEFL ITP, siswa M-ICO juga aktif dalam pembelajaran berbasis proyek internasional dan program <em>Edu Exchange</em> bersama institusi mitra di kawasan Asia Tenggara.</p>`
    },
    {
      title: 'Dua Ribu Gelas Es Teh Gratis dari Smamita, Hangatkan Kebersamaan Milad ke-114 Muhammadiyah',
      date: '18 November 2026 • Kegiatan Sekolah',
      body: `<p style="margin-bottom:14px;">Dalam rangka menyemarakkan <strong>Milad ke-114 Muhammadiyah</strong>, keluarga besar SMA Muhammadiyah 1 Taman menggelar aksi sosial dengan membagikan <strong>2.000 gelas es teh gratis</strong> kepada peserta jalan sehat dan masyarakat sekitar.</p>
      <p>Kegiatan ini melatih kepekaan sosial, semangat gotong royong, serta nilai <em>Positive</em> dalam budaya <strong>#RESPECT School</strong> yang terus ditanamkan kepada seluruh siswa SMAM1TA.</p>`
    },
    {
      title: 'Tak Cukup Sekadar Baik, AMM Sepanjang Tantang Generasi Muda Hadirkan Manfaat Nyata bagi Sesama',
      date: '18 November 2026 • Keagamaan & Kepemudaan',
      body: `<p style="margin-bottom:14px;">Angkatan Muda Muhammadiyah (AMM) Sepanjang mengajak para pelajar dan generasi muda untuk tidak berhenti pada kesalehan personal semata, melainkan menghadirkan kontribusi nyata bagi lingkungan dan umat.</p>
      <p>Nilai ini sejalan dengan visi SMA Muhammadiyah 1 Taman dalam mencetak peserta didik yang sholeh dalam perilaku, unggul dalam mutu, dan berdaya saing global.</p>`
    }
  ];

  const videoModal = document.getElementById('videoModal');
  const videoContainer = document.getElementById('videoContainer');
  const articleModal = document.getElementById('articleModal');

  function closeAllModals() {
    [videoModal, articleModal].forEach((m) => {
      if (!m) return;
      m.classList.remove('is-open');
      m.setAttribute('aria-hidden', 'true');
    });
    if (videoContainer) videoContainer.innerHTML = '';
    document.body.style.overflow = '';
  }

  document.getElementById('openVideoBtn')?.addEventListener('click', () => {
    videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/QwZ0nYHb6vk?autoplay=1&rel=0" title="Profil SMA Muhammadiyah 1 Taman" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    videoModal.classList.add('is-open');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });

  document.querySelectorAll('[data-article]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const art = ARTICLES[Number(btn.dataset.article)];
      if (!art) return;
      document.getElementById('articleModalTitle').textContent = art.title;
      document.getElementById('articleModalBody').innerHTML =
        `<div style="font-size:0.82rem; color:var(--emerald-700); font-weight:700; margin-bottom:14px;">${art.date}</div>` +
        `<div style="color:var(--ink-700); line-height:1.75; font-size:0.96rem;">${art.body}</div>`;
      articleModal.classList.add('is-open');
      articleModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', closeAllModals);
  });
  [videoModal, articleModal].forEach((m) => {
    m?.addEventListener('click', (e) => {
      if (e.target === m) closeAllModals();
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  /* 7. Working Bilingual Switcher (ID / EN) */
  const I18N = {
    id: {
      topbar_text: '<strong>SPMB TA 2026/2027 Dibuka:</strong> Gelombang 1 (Desember – Maret)',
      topbar_cta: 'Simulasi Biaya & Daftar →',
      nav_profile: 'Profil',
      nav_programs: 'Program Unggulan',
      nav_facilities: 'Fasilitas',
      nav_awards: 'Prestasi',
      nav_news: 'Berita',
      nav_contact: 'Kontak',
      nav_spmb: 'Daftar SPMB',
      hero_title: 'Sholeh dalam Perilaku, <span class="highlight">Unggul dalam Mutu,</span> Berdaya Saing <span class="serif-accent">Global.</span>',
      hero_desc: '<strong>SMA Muhammadiyah 1 Taman (SMAM1TA)</strong> — <em>The Excellent School</em> yang memadukan karakter Islami, Kurikulum Merdeka berbasis riset digital, serta jaringan kemitraan universitas nasional dan internasional.',
      hero_cta_primary: 'Daftar SPMB 2026/2027 →',
      hero_cta_secondary: 'Eksplor Program Kelas'
    },
    en: {
      topbar_text: '<strong>2026/2027 Admissions Open:</strong> Wave 1 (December – March)',
      topbar_cta: 'Fee Simulator & Apply →',
      nav_profile: 'About',
      nav_programs: 'Programs',
      nav_facilities: 'Facilities',
      nav_awards: 'Achievements',
      nav_news: 'News',
      nav_contact: 'Contact',
      nav_spmb: 'Apply Now',
      hero_title: 'Pious in Character, <span class="highlight">Excellent in Quality</span>, Ready to Compete <span class="serif-accent">Globally</span>.',
      hero_desc: '<strong>SMA Muhammadiyah 1 Taman (SMAM1TA)</strong> — <em>The Excellent School</em> combining Islamic values, digital research-driven curriculum, and national–international university partnerships since 1968.',
      hero_cta_primary: 'Apply for 2026/2027 →',
      hero_cta_secondary: 'Explore Programs'
    }
  };

  document.querySelectorAll('.lang-switch button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      const dict = I18N[lang];
      if (!dict) return;

      document.querySelectorAll('.lang-switch button').forEach((b) => {
        b.classList.toggle('is-active', b.dataset.lang === lang);
      });

      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.dataset.i18n;
        if (dict[key]) el.innerHTML = dict[key];
      });
    });
  });
})();
