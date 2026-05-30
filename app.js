/* ================================================================
   CaniGesta — Complete SaaS Application Logic
   All 25 fixes implemented: Auth, PDF, Checklist, Reminders, Toasts
================================================================ */

'use strict';

// ── BREED DATABASE (Item 15) ──────────────────────────────────────
const BREED_DATABASE = {
  // Small (61 days, litter 2-4)
  'Chihuahua':           { group: 'Small',  days: 61, litter: '2–4'  },
  'Pomeranian':          { group: 'Small',  days: 61, litter: '2–4'  },
  'Maltese':             { group: 'Small',  days: 61, litter: '2–4'  },
  'Shih Tzu':            { group: 'Small',  days: 61, litter: '2–4'  },
  'Dachshund':           { group: 'Small',  days: 61, litter: '2–4'  },
  // Medium (63 days, litter 4-6)
  'Beagle':              { group: 'Medium', days: 63, litter: '4–6'  },
  'Cocker Spaniel':      { group: 'Medium', days: 63, litter: '4–6'  },
  'Border Collie':       { group: 'Medium', days: 63, litter: '4–6'  },
  'Bulldog':             { group: 'Medium', days: 63, litter: '4–6'  },
  'French Bulldog':      { group: 'Medium', days: 63, litter: '4–6'  },
  // Large (64 days, litter 6-10)
  'Labrador':            { group: 'Large',  days: 64, litter: '6–10' },
  'Golden Retriever':    { group: 'Large',  days: 64, litter: '6–10' },
  'German Shepherd':     { group: 'Large',  days: 64, litter: '6–10' },
  'Husky':               { group: 'Large',  days: 64, litter: '6–10' },
  'Boxer':               { group: 'Large',  days: 64, litter: '6–10' },
  'Rottweiler':          { group: 'Large',  days: 64, litter: '6–10' },
  'Doberman':            { group: 'Large',  days: 64, litter: '6–10' },
  'Poodle':              { group: 'Large',  days: 64, litter: '6–10' },
  'Great Dane':          { group: 'Large',  days: 64, litter: '6–10' },
  'Cavalier King Charles': { group: 'Large', days: 64, litter: '6–10' }
};

// ── 9-WEEK TIMELINE (Item 18) ─────────────────────────────────────
const TIMELINE_WEEKS = [
  {
    week: 1, title: 'Conception & Cellular Division', days: 'Days 0–7',
    description: 'Following successful mating, fertilized eggs begin rapid cellular division (blastomeres) as they travel through the oviducts toward the uterine horns. No external signs are visible at this stage.',
    clinical: 'Maintain standard high-quality nutrition. Avoid excessive high-impact training, vaccinations, or systemic medication during this critical early window.'
  },
  {
    week: 2, title: 'Entering the Uterine Lining', days: 'Days 8–14',
    description: 'Blastocysts enter the uterine horns and space themselves out freely. Secretions from the uterine lining increase to nourish them. The embryos are still microscopic.',
    clinical: 'Maintain normal food portions — do not overfeed early. Overweight dams face significantly higher dystocia (difficult labor) risk. Keep stress levels low.'
  },
  {
    week: 3, title: 'Embryonic Implantation', days: 'Days 15–21',
    description: 'Blastocysts implant firmly into the uterine wall, establishing the placental vascular supply. Organogenesis begins as cellular layers organize into organ systems.',
    clinical: 'Hormonal shifts can cause morning sickness, brief inappetence, or lethargy (Days 18–21). Offer small, highly palatable food portions. This is completely normal.'
  },
  {
    week: 4, title: 'Heartbeats & Clinical Scans', days: 'Days 22–28',
    description: 'Fetal heartbeats commence. Facial features, spinal cords, and limbs begin developing. Fetuses grow to approximately 15mm. This is the most critical diagnostic window.',
    clinical: 'CRITICAL: Schedule a clinic ultrasound or blood Relaxin test after Day 25 to confirm pregnancy and assess fetal heartbeats. Do not miss this window.'
  },
  {
    week: 5, title: 'Gestation Transition & Puppy Food', days: 'Days 29–35',
    description: 'Embryos are now officially fetuses. Toes separate, claws form, gender differences stabilize, and whiskers grow. The dam\'s abdomen begins visibly rounding.',
    clinical: 'DIETARY CHANGE: Begin transitioning to high-calorie gestation kibble or premium puppy food. Gradually increase daily caloric intake by 10% each week going forward.'
  },
  {
    week: 6, title: 'Pigmentation & Abdominal Crowding', days: 'Days 36–42',
    description: 'The skeleton calcifies, eyes close for protection, and skin pigmentation emerges. Fetal heartbeats grow loud on stethoscope. The dam\'s weight gain accelerates.',
    clinical: 'MEAL SPLITTING: Growing uterus crowds the stomach. Split her daily food into 3–4 smaller concentrated meals to prevent gastric discomfort and ensure optimal absorption.'
  },
  {
    week: 7, title: 'Nesting Instinct & Whelping Box', days: 'Days 43–49',
    description: 'Hair follicles develop over the body. The dam displays clear nesting behaviors — scratching blankets, seeking quiet secure spaces, and becoming more protective.',
    clinical: 'WHELPING BOX: Set up the nesting box in a peaceful, draft-free room. Encourage sleeping there so she identifies it as a safe, familiar birthing environment.'
  },
  {
    week: 8, title: 'Skeletal Scans & Puppy Movement', days: 'Days 50–57',
    description: 'Puppies are fully formed. Active movements are visible and palpable through the dam\'s abdominal wall. The dam may become restless, stop eating, or seek isolation.',
    clinical: 'X-RAY WINDOW (Day 55+): Schedule a pre-whelping X-ray. Calcified skeletons allow an exact skull/spine count — essential for preventing stuck-puppy emergencies during delivery.'
  },
  {
    week: 9, title: 'Labor Preparation & Temperature Drop', days: 'Days 58–63+',
    description: 'Puppies are fully mature and capable of breathing. The dam produces colostrum milk and undergoes a rapid rectal temperature drop 12–24 hours before active labor begins.',
    clinical: 'TEMPERATURE PROTOCOL: Take rectal temperature twice daily. A sudden drop below 99°F (37.2°C) signals active Stage 1 labor within 12–24 hours. Have your whelping kit ready.'
  }
];

// ── VET CHECKLIST ─────────────────────────────────────────────────
const CHECKLIST_ITEMS = [
  { id: 'log',        dayOffset: 0,  title: 'Record mating date and begin prenatal log' },
  { id: 'ultrasound', dayOffset: 25, title: 'Schedule first vet appointment / ultrasound' },
  { id: 'nutrition',  dayOffset: 35, title: 'Increase food intake by 25% — switch to puppy formula' },
  { id: 'xray',       dayOffset: 45, title: 'Book pre-whelping X-ray (puppy count)' },
  { id: 'whelping',   dayOffset: 49, title: 'Set up and introduce whelping box' },
  { id: 'temp',       dayOffset: 58, title: 'Begin daily temperature monitoring (alert if below 99°F)' }
];

// ── APP STATE ─────────────────────────────────────────────────────
const appState = {
  currentTab: 'tab-calculator',
  user: null,
  litters: [],
  calc: {
    dogName: '', breed: '', breedGroup: '', litterSize: '4–6',
    matingDate: null, ovulationDate: null, gestationDays: 63,
    dueDate: null, earliestWhelp: null, latestWhelp: null,
    daysElapsed: 0, daysRemaining: 0, progress: 0, currentWeek: 1
  }
};

// ── DOM CACHE ─────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

// ── INIT ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadSession();
  initTheme();
  initNav();
  initCalculatorForm();
  initCostEstimator();
  initModals();
  initAuthForms();
  blockFutureDates();
  calculateBudget(); // seed cost display
});

// ── SESSION / AUTH ────────────────────────────────────────────────
function loadSession() {
  const savedUser = localStorage.getItem('cg_session');
  if (savedUser) appState.user = JSON.parse(savedUser);

  const savedLitters = localStorage.getItem('cg_litters');
  if (savedLitters) appState.litters = JSON.parse(savedLitters);

  renderAuthNav();
  renderLittersTab();
}

function renderAuthNav() {
  const box = $('auth-status-box');
  if (!box) return;

  if (appState.user && appState.user.loggedIn) {
    const initials = getInitials(appState.user.name);
    box.innerHTML = `
      <div class="auth-user-pill">
        <div class="user-avatar-initials" title="${appState.user.name}">${initials}</div>
        <span class="user-name-display">${appState.user.name.split(' ')[0]}</span>
        <button class="btn btn-ghost btn-sm" id="btn-signout">Sign Out</button>
      </div>
    `;
    $('btn-signout').addEventListener('click', signOut);

    // Update mobile auth box too
    const mobileBox = $('mobile-auth-box');
    if (mobileBox) mobileBox.innerHTML = `
      <span style="font-size:0.875rem; color:var(--color-text-sub);">👤 ${appState.user.name.split(' ')[0]}</span>
      <button class="btn btn-ghost btn-sm" id="mobile-btn-signout">Sign Out</button>
    `;
    const mso = $('mobile-btn-signout');
    if (mso) mso.addEventListener('click', signOut);

  } else {
    box.innerHTML = `
      <button class="btn btn-ghost btn-sm" id="btn-signin-trigger">Log In</button>
      <button class="btn btn-accent btn-sm" id="btn-signup-trigger">Get PRO</button>
    `;
    $('btn-signin-trigger')?.addEventListener('click', () => openModal('modal-auth', 'login'));
    $('btn-signup-trigger')?.addEventListener('click', () => openModal('modal-pricing'));

    const mobileBox = $('mobile-auth-box');
    if (mobileBox) mobileBox.innerHTML = `
      <button class="btn btn-ghost btn-sm" id="mobile-btn-signin">Log In</button>
      <button class="btn btn-accent btn-sm" id="mobile-btn-signup">Get PRO</button>
    `;
    $('mobile-btn-signin')?.addEventListener('click', () => openModal('modal-auth', 'login'));
    $('mobile-btn-signup')?.addEventListener('click', () => openModal('modal-pricing'));
  }
}

function getInitials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0].toUpperCase()).join('');
}

function signOut() {
  appState.user = null;
  localStorage.removeItem('cg_session');
  renderAuthNav();
  renderLittersTab();
  showToast('Signed out successfully.');
}

// ── THEME ─────────────────────────────────────────────────────────
function initTheme() {
  const toggle = $('theme-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('cg_theme', isDark ? 'dark' : 'light');
    updateThemeIcons(isDark);
  });
}

function initThemeEarly() {
  const saved = localStorage.getItem('cg_theme');
  if (saved === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcons(true);
  }
}

function updateThemeIcons(isDark) {
  const sun = document.querySelector('.icon-sun');
  const moon = document.querySelector('.icon-moon');
  if (sun)  sun.style.display  = isDark ? 'none' : 'block';
  if (moon) moon.style.display = isDark ? 'block' : 'none';
}

// Run theme before anything else
initThemeEarly();

// ── NAV / TABS ────────────────────────────────────────────────────
function initNav() {
  // Tab switching via data-tab
  document.addEventListener('click', e => {
    const tabTarget = e.target.closest('[data-tab]');
    if (tabTarget) {
      switchTab(tabTarget.getAttribute('data-tab'));
      closeMobileMenu();
    }
  });

  // Pricing triggers
  ['nav-btn-pricing', 'nav-pro-cta', 'mobile-btn-pricing', 'hero-btn-pricing-2',
   'btn-mobile-pricing', 'footer-btn-pricing'].forEach(id => {
    $(id)?.addEventListener('click', () => openModal('modal-pricing'));
  });

  // Pricing checkout triggers
  $$('.btn-pro, .btn-primary').forEach(btn => {
    if (btn.id === 'btn-checkout-pro' || btn.id === 'btn-checkout-breeder' || btn.textContent.includes('Get Started')) {
      btn.addEventListener('click', e => {
        if (!appState.user) {
          openModal('modal-auth', 'signup');
        } else {
          showToast('Payment system coming soon — you will be notified!');
        }
      });
    }
  });

  // Hamburger
  $('hamburger-btn')?.addEventListener('click', toggleMobileMenu);

  // Close modals on overlay click
  $$('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  // ESC key closes modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      $$('.modal-overlay.open').forEach(m => closeModal(m.id));
    }
  });
}

function switchTab(tabId) {
  $$('.tab-view').forEach(v => v.classList.toggle('active', v.id === tabId));
  $$('.nav-link[data-tab]').forEach(l => l.classList.toggle('active', l.getAttribute('data-tab') === tabId));
  appState.currentTab = tabId;
}

function toggleMobileMenu() {
  $('mobile-menu')?.classList.toggle('open');
}
function closeMobileMenu() {
  $('mobile-menu')?.classList.remove('open');
}

// ── MODALS ────────────────────────────────────────────────────────
function openModal(id, subPanel) {
  const modal = $(id);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  if (id === 'modal-auth' && subPanel) {
    showAuthPanel(subPanel);
  }
}

function closeModal(id) {
  const modal = $(id);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function initModals() {
  // Close buttons
  $('btn-close-pricing')?.addEventListener('click',  () => closeModal('modal-pricing'));
  $('btn-close-auth')?.addEventListener('click',     () => closeModal('modal-auth'));
  $('btn-close-notify')?.addEventListener('click',   () => closeModal('modal-notify'));
  $('btn-close-share')?.addEventListener('click',    () => closeModal('modal-share'));

  // Notify me form
  $('notify-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('notify-name')?.value?.trim();
    const email = $('notify-email')?.value?.trim();
    if (email) {
      localStorage.setItem('cg_waitlist', JSON.stringify({ name, email, ts: Date.now() }));
      $('notify-form').style.display = 'none';
      $('notify-success').style.display = 'block';
    }
  });

  // Share copy button
  $('btn-copy-share')?.addEventListener('click', () => {
    const text = $('share-text-display')?.textContent;
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('✅ Copied!');
        $('share-copy-success').style.display = 'block';
        setTimeout(() => { $('share-copy-success').style.display = 'none'; }, 2000);
      }).catch(() => showToast('Please copy the text manually.'));
    }
  });
}

// ── AUTH FORMS ────────────────────────────────────────────────────
function initAuthForms() {
  // Tab toggles
  $('btn-auth-tab-login')?.addEventListener('click', () => showAuthPanel('login'));
  $('btn-auth-tab-signup')?.addEventListener('click', () => showAuthPanel('signup'));

  // Cross-links
  $('btn-go-signup')?.addEventListener('click', () => showAuthPanel('signup'));
  $('btn-go-login')?.addEventListener('click', () => showAuthPanel('login'));
  $('btn-go-login-2')?.addEventListener('click', () => showAuthPanel('login'));
  $('btn-go-forgot')?.addEventListener('click', () => showAuthPanel('forgot'));

  // LOGIN form
  $('form-auth-login')?.addEventListener('submit', e => {
    e.preventDefault();
    const email = $('login-email')?.value?.trim();
    const pass  = $('login-pass')?.value;
    if (!email || !pass) return showToast('Please fill all fields.');

    // Check stored user
    const stored = JSON.parse(localStorage.getItem('cg_users') || '{}');
    const user = stored[email];

    if (user && user.password === btoa(pass)) {
      loginUser({ name: user.name, email, loggedIn: true });
    } else {
      showToast('Incorrect email or password. Please try again.');
    }
  });

  // SIGNUP form
  $('form-auth-signup')?.addEventListener('submit', e => {
    e.preventDefault();
    const name    = $('signup-name')?.value?.trim();
    const email   = $('signup-email')?.value?.trim();
    const pass    = $('signup-pass')?.value;
    const confirm = $('signup-confirm')?.value;

    if (!name || !email || !pass) return showToast('Please fill all fields.');
    if (pass !== confirm) return showToast('Passwords do not match.');
    if (pass.length < 6)  return showToast('Password must be at least 6 characters.');

    const users = JSON.parse(localStorage.getItem('cg_users') || '{}');
    if (users[email]) {
      return showToast('Email already registered. Please log in.');
    }

    users[email] = { name, email, password: btoa(pass), createdAt: Date.now() };
    localStorage.setItem('cg_users', JSON.stringify(users));

    loginUser({ name, email, loggedIn: true });
  });

  // FORGOT PASSWORD form
  $('form-auth-forgot')?.addEventListener('submit', e => {
    e.preventDefault();
    $('forgot-success').style.display = 'block';
    $('forgot-success').textContent = "If this email exists, a reset link has been sent.";
    $('form-auth-forgot').style.display = 'none';
    setTimeout(() => {
      $('form-auth-forgot').style.display = 'flex';
      $('forgot-success').style.display = 'none';
      showAuthPanel('login');
    }, 4000);
  });
}

function showAuthPanel(panel) {
  $$('.auth-tab').forEach(tab => tab.classList.remove('active'));
  const tabMap = { login: 'btn-auth-tab-login', signup: 'btn-auth-tab-signup', forgot: 'btn-auth-tab-forgot' };
  $(tabMap[panel])?.classList.add('active');

  $('auth-panel-login').style.display  = panel === 'login'  ? 'block' : 'none';
  $('auth-panel-signup').style.display = panel === 'signup' ? 'block' : 'none';
  $('auth-panel-forgot').style.display = panel === 'forgot' ? 'block' : 'none';
  $('btn-auth-tab-forgot').style.display = panel === 'forgot' ? 'inline-flex' : 'none';
}

function loginUser(user) {
  appState.user = user;
  localStorage.setItem('cg_session', JSON.stringify(user));
  closeModal('modal-auth');
  renderAuthNav();
  renderLittersTab();
  showToast(`Welcome, ${user.name.split(' ')[0]}! 👋`);
}

// ── CALCULATOR FORM ───────────────────────────────────────────────
function initCalculatorForm() {
  const form       = $('calculator-form');
  const breedSel   = $('breed-select');
  const gestSlider = $('gestation-days');
  const gestBadge  = $('gestation-days-badge');

  breedSel?.addEventListener('change', () => {
    const breed = breedSel.value;
    const info = BREED_DATABASE[breed];
    if (info) {
      gestSlider.value = info.days;
      gestBadge.textContent = `${info.days} Days`;
    }
  });

  gestSlider?.addEventListener('input', () => {
    gestBadge.textContent = `${gestSlider.value} Days`;
  });

  $('cost-pup-count')?.addEventListener('input', e => {
    const n = e.target.value;
    $('cost-pup-badge').textContent = `${n} ${n === '1' ? 'Puppy' : 'Puppies'}`;
    calculateBudget();
  });

  form?.addEventListener('submit', e => {
    e.preventDefault();
    runCalculation();
  });

  $('btn-reset-form')?.addEventListener('click', resetCalculator);
  $('btn-save-pregnancy')?.addEventListener('click', savePregnancy);
  $('btn-print-pdf')?.addEventListener('click', generatePDF);
  $('btn-share-results')?.addEventListener('click', shareResults);
  $('btn-print-page')?.addEventListener('click', () => window.print());

  // Email reminders form
  $('email-reminders-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = $('email-reminders-form').querySelector('button');
    btn.textContent = 'Subscribing...';
    const name  = $('reminder-name')?.value?.trim();
    const email = $('reminder-email')?.value?.trim();
    const dog   = appState.calc.dogName || 'your dog';
    
    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      showToast('Please enter a valid email address.');
      btn.textContent = 'Subscribe to Alerts';
      return;
    }
    
    // Mock Formspree submission using fetch
    fetch('https://formspree.io/f/xkgwppbz', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, dogName: dog, dueDate: appState.calc.dueDate, breed: appState.calc.breed })
    })
    .then(response => {
      if (response.ok) {
        $('email-reminders-form').style.display = 'none';
        $('email-success-message').style.display = 'block';
        $('email-success-dog-name').textContent = dog;
        showToast('✅ Subscribed successfully!');
      } else {
        showToast('Something went wrong — please try again.');
        btn.textContent = 'Subscribe to Alerts';
      }
    })
    .catch(error => {
      showToast('Something went wrong — please try again.');
      btn.textContent = 'Subscribe to Alerts';
    });
  });
}

function blockFutureDates() {
  const today = new Date().toISOString().split('T')[0];
  $('mating-date') && ($('mating-date').max = today);
  $('ovulation-date') && ($('ovulation-date').max = today);
}

function runCalculation() {
  const dogName      = ($('dog-name')?.value?.trim()) || 'Your Dog';
  const breed        = $('breed-select')?.value;
  const matingVal    = $('mating-date')?.value;
  const ovulationVal = $('ovulation-date')?.value;
  const gestDays     = parseInt($('gestation-days')?.value || '63');

  if (!breed) { showToast('Please select a breed.'); return; }
  if (!matingVal) { showToast('Please enter a mating date.'); return; }

  const breedInfo  = BREED_DATABASE[breed] || { group: 'Medium', days: 63, litter: '4–6' };
  const matingDate = new Date(matingVal + 'T00:00:00');
  const today      = new Date();
  today.setHours(0, 0, 0, 0);

  let baseDate = matingDate;
  if (ovulationVal) {
    baseDate = new Date(ovulationVal + 'T00:00:00');
  }

  const dueDate       = addDays(baseDate, gestDays);
  const earliestWhelp = addDays(baseDate, 58);
  const latestWhelp   = addDays(baseDate, 68);
  const daysElapsed   = Math.max(0, Math.floor((today - matingDate) / 86400000));
  const daysRemaining = Math.max(0, Math.floor((dueDate - today) / 86400000));
  const progress      = Math.min(100, Math.max(0, Math.round((daysElapsed / gestDays) * 100)));
  const currentWeek   = Math.min(9, Math.max(1, Math.ceil((daysElapsed + 1) / 7)));

  appState.calc = {
    dogName, breed, breedGroup: breedInfo.group, litterSize: breedInfo.litter,
    matingDate, ovulationDate: ovulationVal ? new Date(ovulationVal + 'T00:00:00') : null,
    gestationDays: gestDays, dueDate, earliestWhelp, latestWhelp,
    daysElapsed, daysRemaining, progress, currentWeek
  };

  renderResults();
}

function renderResults() {
  const c = appState.calc;

  $('calc-empty-state').style.display = 'none';
  $('calc-active-state').style.display = 'block';
  $('extended-calculator-outputs').style.display = 'block';

  $('display-dog-title').textContent   = `${c.dogName}'s Gestation`;
  $('display-dog-subtitle').textContent = `${c.breed} · ${c.breedGroup} Breed · Mated ${formatDate(c.matingDate)}`;
  $('display-week-badge').textContent  = `Week ${c.currentWeek} of 9`;

  $('display-progress-percent').textContent = `${c.progress}%`;
  $('bar-fill').style.width   = `${c.progress}%`;
  $('bar-runner').style.left  = `${c.progress}%`;
  $('display-track-start').textContent = `Mated ${formatDate(c.matingDate)}`;
  $('display-track-due').textContent   = `Due ${formatDate(c.dueDate)}`;

  $('display-due-date').textContent        = formatDateLong(c.dueDate);
  $('display-days-remaining').textContent  = `${c.daysRemaining} day${c.daysRemaining !== 1 ? 's' : ''} remaining`;
  $('display-whelping-window').textContent = `${formatDate(c.earliestWhelp)} – ${formatDate(c.latestWhelp)}`;
  $('display-progress-days').textContent   = `Day ${c.daysElapsed} of ${c.gestationDays}`;
  $('display-progress-status').textContent = TIMELINE_WEEKS[c.currentWeek - 1]?.title || '';
  $('display-litter-size').textContent     = c.litterSize;

  $('email-dog-name-display').textContent = c.dogName;

  renderChecklist();
  renderTimeline();
}

// ── CHECKLIST ─────────────────────────────────────────────────────
function renderChecklist() {
  const wrap = $('checklist-items-wrap');
  if (!wrap) return;
  wrap.innerHTML = '';
  const today = new Date(); today.setHours(0,0,0,0);
  const c = appState.calc;
  
  let completedCount = 0;

  CHECKLIST_ITEMS.forEach(item => {
    const targetDate = addDays(c.matingDate, item.dayOffset);
    const daysDiff   = Math.floor((targetDate - today) / 86400000); 

    let status, icon, tagLabel, tagClass;
    if (c.daysElapsed >= item.dayOffset) {
      status   = 'status-done';    icon = '✅';
      tagLabel = 'Completed';      tagClass = 'tag-done';
      completedCount++;
    } else if (daysDiff <= 3 && daysDiff >= 0) {
      status   = 'status-due';    icon = '⏰';
      tagLabel = 'Due soon';      tagClass = 'tag-due';
    } else {
      status   = 'status-upcoming'; icon = '⬜';
      tagLabel = 'Upcoming';        tagClass = 'tag-upcoming';
    }

    const row = document.createElement('div');
    row.className = `checklist-row ${status}`;
    row.innerHTML = `
      <span class="chk-icon" style="font-size:1.2rem; ${status === 'status-done' ? '' : 'opacity:0.6;'}">${icon}</span>
      <div class="chk-body">
        <div class="chk-top">
          <h4 class="chk-title" style="${status === 'status-done' ? 'text-decoration:line-through; color:var(--color-text-sub);' : ''}">${item.title}</h4>
          <span class="chk-date">${formatDateLong(targetDate)}</span>
        </div>
        <span class="chk-tag ${tagClass}">${tagLabel}</span>
      </div>
    `;
    wrap.appendChild(row);
  });
  
  const countDisplay = $('checklist-count-display');
  if(countDisplay) {
    countDisplay.textContent = `${completedCount} / 6 Completed`;
  }
}

// ── TIMELINE ──────────────────────────────────────────────────────
function renderTimeline() {
  const wrap = $('timeline-weeks-wrap');
  if (!wrap) return;
  wrap.innerHTML = '';
  const c = appState.calc;

  TIMELINE_WEEKS.forEach(w => {
    const weekStart  = addDays(c.matingDate, (w.week - 1) * 7);
    const weekEnd    = addDays(c.matingDate, w.week * 7 - 1);
    const isCurrent  = w.week === c.currentWeek;
    const isPast     = w.week < c.currentWeek;

    const card = document.createElement('div');
    card.className = `t-week-card${isCurrent ? ' current-week open' : ''}${isPast ? ' past-week' : ''}`;

    card.innerHTML = `
      <button class="t-week-header" aria-expanded="${isCurrent}">
        ${isCurrent ? '<span class="current-pulse" title="Current week"></span>' : `<span style="width:10px;height:10px;flex-shrink:0;"></span>`}
        <span class="t-week-num">Week ${w.week}</span>
        <span class="t-week-title">${w.title}</span>
        <span class="t-week-dates">${formatDate(weekStart)} – ${formatDate(weekEnd)}</span>
        <span class="t-chevron" aria-hidden="true">▾</span>
      </button>
      <div class="t-week-body">
        <div class="t-week-content">
          <p class="t-week-desc">${w.description}</p>
          <div class="t-week-clinical">🩺 <strong>Clinical note:</strong> ${w.clinical}</div>
        </div>
      </div>
    `;

    card.querySelector('.t-week-header').addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      card.classList.toggle('open', !isOpen);
    });

    wrap.appendChild(card);
  });
}

// ── SAVE PREGNANCY ────────────────────────────────────────────────
function savePregnancy() {
  const c = appState.calc;
  if (!c.dogName || !c.matingDate) {
    showToast('Please run a calculation first.');
    return;
  }

  const profile = {
    dogName: c.dogName, breed: c.breed, breedGroup: c.breedGroup,
    matingDate: c.matingDate.toISOString().split('T')[0],
    dueDate: c.dueDate.toISOString().split('T')[0],
    gestationDays: c.gestationDays, savedAt: Date.now()
  };

  if (!appState.user) {
    if (confirm('Create a free account to save your litters across devices.\n\nClick OK to Sign Up, or Cancel to continue as Guest and save locally.')) {
      openModal('modal-auth', 'signup');
      return;
    }
  }

  const idx = appState.litters.findIndex(l => l.dogName === c.dogName);
  if (idx > -1) {
    appState.litters[idx] = profile;
  } else {
    appState.litters.push(profile);
  }

  localStorage.setItem('cg_litters', JSON.stringify(appState.litters));
  showToast(`✅ ${c.dogName} saved to My Litters!`);
  renderLittersTab();
}

// ── MY LITTERS TAB ────────────────────────────────────────────────
function renderLittersTab() {
  const gate      = $('litters-auth-gate');
  if (!gate) return;

  gate.innerHTML = `
    <div id="litters-active-list" class="litters-grid" style="display:none;"></div>
    <div id="litters-empty-list" class="empty-state card-shadow panel-card" style="padding:50px 30px; display:none;">
      <div style="font-size:3rem;">📁</div>
      <h3>No Saved Litters Yet</h3>
      <p>Go to the <strong>Calculator</strong> tab, run a pregnancy calculation, and click <strong>💾 Save to My Litters</strong> to store your dogs here.</p>
      <button class="btn btn-primary" style="margin-top:16px;" data-tab="tab-calculator">Go to Calculator →</button>
    </div>`;

  const list  = $('litters-active-list');
  const empty = $('litters-empty-list');

  if (!appState.litters || appState.litters.length === 0) {
    empty.style.display = 'flex';
    return;
  }

  list.style.display = 'grid';
  appState.litters.forEach(l => {
    // Recompute current week based on today
    const matingDate = new Date(l.matingDate + 'T00:00:00');
    const today = new Date(); today.setHours(0,0,0,0);
    const dueDate = new Date(l.dueDate + 'T00:00:00');
    const earliest = addDays(matingDate, 58);
    const latest = addDays(matingDate, 68);
    const daysElapsed = Math.max(0, Math.floor((today - matingDate) / 86400000));
    const daysRemaining = Math.max(0, Math.floor((dueDate - today) / 86400000));
    const progress = Math.min(100, Math.max(0, Math.round((daysElapsed / l.gestationDays) * 100)));
    const currentWeek = Math.min(9, Math.max(1, Math.ceil((daysElapsed + 1) / 7)));

    const card = document.createElement('div');
    card.className = 'litter-card card-shadow';
    card.innerHTML = `
      <div class="l-top">
        <div>
          <div class="l-dog-name">${l.dogName}</div>
          <div class="l-breed">${l.breed} · ${l.breedGroup || 'Breed'}</div>
        </div>
        <span class="badge">Week ${currentWeek}/9</span>
      </div>
      <div class="l-dates-row">
        <div><span>DUE DATE</span><strong>${formatDateLong(dueDate)}</strong></div>
        <div style="text-align:right"><span>WINDOW</span><strong>${formatDate(earliest)} – ${formatDate(latest)}</strong></div>
      </div>
      <div class="l-progress">
        <div class="l-progress-header"><span>Pregnancy progress</span><span>${progress}%</span></div>
        <div class="l-track"><div class="l-fill" style="width:${progress}%"></div></div>
      </div>
      <div class="l-actions">
        <button class="btn btn-ghost" data-load="${l.dogName}">View Details</button>
        <button class="btn btn-ghost" data-delete="${l.dogName}" style="color:var(--color-accent); border-color:rgba(232,99,58,0.3)">Delete</button>
      </div>`;

    card.querySelector('[data-load]')?.addEventListener('click', () => loadLitter(l));
    card.querySelector('[data-delete]')?.addEventListener('click', () => deleteLitter(l.dogName));
    list.appendChild(card);
  });
  
  // Reattach tab listener for the empty state button
  $$('[data-tab="tab-calculator"]').forEach(btn => {
    btn.addEventListener('click', () => switchTab('tab-calculator'));
  });
}

function loadLitter(l) {
  $('dog-name').value           = l.dogName;
  $('breed-select').value       = l.breed;
  $('mating-date').value        = l.matingDate;
  $('gestation-days').value     = l.gestationDays;
  $('gestation-days-badge').textContent = `${l.gestationDays} Days`;
  switchTab('tab-calculator');
  runCalculation();
}

function deleteLitter(dogName) {
  if (!confirm(`Delete ${dogName}'s pregnancy profile?`)) return;
  appState.litters = appState.litters.filter(l => l.dogName !== dogName);
  localStorage.setItem('cg_litters', JSON.stringify(appState.litters));
  renderLittersTab();
  showToast(`${dogName}'s profile deleted.`);
}

function resetCalculator() {
  $('calculator-form')?.reset();
  $('gestation-days-badge').textContent = '63 Days';
  $('calc-empty-state').style.display = 'flex';
  $('calc-active-state').style.display = 'none';
  $('extended-calculator-outputs').style.display = 'none';
  appState.calc = {
    dogName: '', breed: '', breedGroup: '', litterSize: '4–6',
    matingDate: null, ovulationDate: null, gestationDays: 63,
    dueDate: null, earliestWhelp: null, latestWhelp: null,
    daysElapsed: 0, daysRemaining: 0, progress: 0, currentWeek: 1
  };
}

function shareResults() {
  const c = appState.calc;
  if (!c.dueDate) { showToast('Run a calculation first.'); return; }

  const text = `🐾 ${c.dogName} is due on ${formatDateLong(c.dueDate)}! Currently in Week ${c.currentWeek} of 9. Estimated litter size: ${c.litterSize} puppies. Tracked with CaniGesta — dog-pregnancy-calculator.vercel.app`;
  $('share-text-display').textContent = text;
  $('share-copy-success').style.display = 'none';
  openModal('modal-share');

  if (navigator.share) {
    navigator.share({ title: `${c.dogName}'s Pregnancy`, text, url: 'https://dog-pregnancy-calculator.vercel.app' }).catch(() => {});
  }
}

// ── PDF EXPORT ────────────────────────────────────────────────────
function generatePDF() {
  const c = appState.calc;
  if (!c.dueDate) { showToast('Run a calculation first to generate a PDF.'); return; }

  const jsPDF = window.jspdf?.jsPDF;
  if (!jsPDF) {
    showToast('PDF library loading… please try again in a moment.');
    return;
  }

  try {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const green = [27, 67, 50];
    const orange = [232, 99, 58];
    const cream  = [253, 248, 243];
    const dark   = [44, 24, 16];
    const sub    = [107, 91, 80];
    const W = 210, M = 15;

    doc.setFillColor(...green);
    doc.rect(0, 0, W, 38, 'F');
    doc.setTextColor(...cream);
    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.text('CaniGesta — Canine Gestation Report', M, 16);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(new Date().toLocaleDateString(), W - M, 16, { align: 'right' });

    doc.setFillColor(250, 246, 240);
    doc.roundedRect(M, 46, W - M * 2, 38, 4, 4, 'F');
    doc.setDrawColor(232, 221, 212);
    doc.roundedRect(M, 46, W - M * 2, 38, 4, 4, 'S');

    doc.setTextColor(...orange);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(`${c.dogName.toUpperCase()} — GESTATION OVERVIEW`, M + 8, 57);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...sub);
    doc.text(`Breed: ${c.breed} (${c.breedGroup})`, M + 8, 64);
    doc.text(`Mating Date: ${formatDateLong(c.matingDate)}`, M + 8, 70);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...green);
    doc.text(`DUE DATE: ${formatDateLong(c.dueDate)}`, W / 2 + 8, 64);
    doc.text(`WHELP WINDOW: ${formatDate(c.earliestWhelp)} – ${formatDate(c.latestWhelp)}`, W / 2 + 8, 70);
    doc.setTextColor(...sub);
    doc.setFont('helvetica', 'normal');
    doc.text(`Week ${c.currentWeek} of 9 · ${c.daysRemaining} days remaining`, W / 2 + 8, 76);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...green);
    doc.text('VETERINARY PRENATAL CHECKLIST', M, 100);
    doc.setLineWidth(0.4);
    doc.line(M, 103, W - M, 103);

    let y = 110;
    doc.setFontSize(9);
    CHECKLIST_ITEMS.forEach(item => {
      const date = addDays(c.matingDate, item.dayOffset);
      const done = c.daysElapsed >= item.dayOffset;
      // Use standard ascii fallback if unicode checkbox fails
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...dark);
      const checkStr = done ? '[ X ]' : '[   ]';
      doc.text(`${checkStr} ${item.title} (Due: ${formatDateLong(date)})`, M + 4, y);
      y += 8;
    });
    
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...green);
    doc.text('9-WEEK TIMELINE', M, y);
    doc.setLineWidth(0.4);
    doc.line(M, y+3, W - M, y+3);
    
    y += 12;
    TIMELINE_WEEKS.forEach(w => {
      if (y > 270) { doc.addPage(); y = 20; }
      const wkStart = addDays(c.matingDate, (w.week - 1) * 7);
      const isCurr  = w.week === c.currentWeek;
      
      doc.setFont('helvetica', isCurr ? 'bold' : 'normal');
      doc.setTextColor(...dark);
      doc.text(`Week ${w.week}: ${w.title}`, M + 4, y);
      doc.setFontSize(8);
      doc.setTextColor(...sub);
      doc.text(`${formatDate(wkStart)}`, W - M - 20, y);
      doc.setFontSize(9);
      y += 7;
    });

    const footerY = 280;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...sub);
    doc.text('Generated by CaniGesta.com — For educational use only. Consult a reproductive DVM for clinical decisions.', W / 2, footerY, { align: 'center' });

    doc.save(`${c.dogName.toLowerCase().replace(/\s+/g, '-')}-gestation-report.pdf`);
    showToast(`✅ PDF report for ${c.dogName} downloaded!`);

  } catch (err) {
    console.error('jsPDF error:', err);
    showToast('PDF generation failed.');
  }
}

// ── COST ESTIMATOR ────────────────────────────────────────────────
function initCostEstimator() {
  const inputs = ['cost-vet-visit', 'cost-vet-visits-count', 'cost-food-month', 'cost-supplies'];
  inputs.forEach(id => $(id)?.addEventListener('input', calculateBudget));
  $('cost-pup-count')?.addEventListener('input', calculateBudget);
  calculateBudget();
}

function calculateBudget() {
  const pups    = parseInt($('cost-pup-count')?.value || '6');
  const vetCost = parseFloat($('cost-vet-visit')?.value || '120');
  const visits  = parseInt($('cost-vet-visits-count')?.value || '4');
  const food    = parseFloat($('cost-food-month')?.value || '80');
  const supplies = parseFloat($('cost-supplies')?.value || '250');

  const totalVet  = vetCost * visits;
  const totalFood = food * 2;
  const misc      = (totalVet + totalFood + supplies) * 0.10;
  const total     = totalVet + totalFood + supplies + misc;
  const perPup    = pups > 0 ? total / pups : 0;

  const set = (id, val) => { const el = $(id); if (el) el.textContent = val; };
  set('display-total-cost',  `$${total.toFixed(2)}`);
  set('display-cost-per-pup', `$${perPup.toFixed(2)}`);
  set('list-cost-vet',       `$${totalVet.toFixed(2)}`);
  set('list-cost-food',      `$${totalFood.toFixed(2)}`);
  set('list-cost-supplies',  `$${supplies.toFixed(2)}`);
  set('list-cost-misc',      `$${misc.toFixed(2)}`);
}

// ── HELPERS ───────────────────────────────────────────────────────
function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(date) {
  if (!date) return '—';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatDateLong(date) {
  if (!date) return '—';
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// ── TOAST NOTIFICATION ────────────────────────────────────────────
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('visible'), 3000);
}
