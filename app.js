/* ----------------------------------------------------
   CaniGesta App Logic - Upgraded B2C SaaS System
---------------------------------------------------- */

// 1. Breed Gestation Map (Small: 61d, Medium: 63d, Large: 64d)
const BREED_DATABASE = {
  "Labrador": { group: "Medium", days: 63 },
  "German Shepherd": { group: "Medium", days: 63 },
  "Chihuahua": { group: "Small", days: 61 },
  "Golden Retriever": { group: "Medium", days: 63 },
  "French Bulldog": { group: "Small", days: 61 },
  "Poodle": { group: "Medium", days: 63 },
  "Beagle": { group: "Medium", days: 63 },
  "Rottweiler": { group: "Large", days: 64 },
  "Bulldog": { group: "Medium", days: 63 },
  "Dachshund": { group: "Small", days: 61 },
  "Husky": { group: "Large", days: 64 },
  "Boxer": { group: "Medium", days: 63 },
  "Pomeranian": { group: "Small", days: 61 },
  "Shih Tzu": { group: "Small", days: 61 },
  "Maltese": { group: "Small", days: 61 },
  "Doberman": { group: "Large", days: 64 },
  "Border Collie": { group: "Medium", days: 63 },
  "Cocker Spaniel": { group: "Medium", days: 63 },
  "Great Dane": { group: "Large", days: 64 },
  "Cavalier King Charles": { group: "Small", days: 61 }
};

// 2. Milestone Template (All 9 Weeks)
const TIMELINE_WEEKS = [
  {
    week: 1,
    title: "Conception & Cellular Division",
    days: "Days 0 - 7",
    description: "Following successful mating, egg fertilization occurs within the oviducts. The zygotes begin rapid cellular division (blastomeres) as they descend towards the uterine horns.",
    clinical: "Maintain standard high-quality nutrition. Avoid excessive high-impact training, direct vaccinations, or systemic medication.",
    highlights: [
      { type: "info", title: "Oviduct Transit", desc: "Zygotes divide while traveling to the uterus." },
      { type: "info", title: "Activity Care", desc: "Keep exercise moderate and stress levels low." }
    ]
  },
  {
    week: 2,
    title: "Entering the Uterine Lining",
    days: "Days 8 - 14",
    description: "The dividing blastocysts enter the uterine horns and space themselves out freely within the uterine fluids. Secretions from the uterine lining increase to nourish them.",
    clinical: "Maintain normal food portions. Do not overfeed early on—overweight dams face significantly higher risks of dystocia (difficult labor).",
    highlights: [
      { type: "info", title: "Blastocyst Spacing", desc: "Embryos arrange themselves evenly inside uterine horns." },
      { type: "info", title: "Stable Nutrition", desc: "Keep dietary calories strictly at pre-breeding maintenance." }
    ]
  },
  {
    week: 3,
    title: "Embryonic Implantation",
    days: "Days 15 - 21",
    description: "Blastocysts implant firmly into the uterine wall, establishing the placental vascular supply. Organogenesis begins as the cellular layers organize.",
    clinical: "Hormonal shifts can cause morning sickness, brief inappetence, or lethargy around Days 18-21. Offer small, highly palatable food portions.",
    highlights: [
      { type: "alert", title: "Placental Implantation", desc: "Conception is complete as embryos bind to the uterus." },
      { type: "alert", title: "Morning Sickness", desc: "Mild nausea and brief food refusal are completely normal." }
    ]
  },
  {
    week: 4,
    title: "Heartbeats & Clinical Scans",
    days: "Days 22 - 28",
    description: "Fetal heartbeats commence. The facial features, spinal cords, and limbs develop. The fetuses grow to about 15mm in length.",
    clinical: "CRITICAL VETERINARY WINDOW. Schedule a clinic ultrasound or blood Relaxin test post Day 25 to confirm pregnancy and assess fetal heartbeats.",
    highlights: [
      { type: "alert", title: "Ultrasound scan (Day 25+)", desc: "Best window to confirm viability and verify active heartbeats." },
      { type: "info", title: "Rapid Development", desc: "Central nervous system and organ systems solidify." }
    ]
  },
  {
    week: 5,
    title: "Gestation Transition & Puppy Food",
    days: "Days 29 - 35",
    description: "The embryos are now officially designated as fetuses. The toes separate, claws form, gender differences stabilize, and whiskers grow.",
    clinical: "DIETARY INCREASE. Gradually transition the dam to high-calorie gestation kibble (e.g. premium puppy food). Increase her daily caloric intake by 10%.",
    highlights: [
      { type: "alert", title: "Calorie Upgrade", desc: "Begin feeding high-energy gestation or premium puppy food." },
      { type: "info", title: "Toes & Claws Form", desc: "Paws develop separate toes and solid claw follicles." }
    ]
  },
  {
    week: 6,
    title: "Pigmentation & Abdominal Crowding",
    days: "Days 36 - 42",
    description: "The skeleton calcifies, eyes close for protection, and skin pigmentation emerges. Fetal heartbeats grow extremely loud on stethoscope.",
    clinical: "MEAL SPLITTING. The growing uterus crowds the stomach. Split her daily food portion into 3 to 4 smaller, highly concentrated meals.",
    highlights: [
      { type: "info", title: "Skeleton Hardening", desc: "Skeletal system absorbs calcium to mineralize bones." },
      { type: "alert", title: "Frequent Small Meals", desc: "Transition to 3-4 portions daily to combat stomach crowding." }
    ]
  },
  {
    week: 7,
    title: "Nesting instinct & Whelping Box",
    days: "Days 43 - 49",
    description: "Hair follicles cover the body. The dam displays obvious nesting behaviors—scratching blankets and seeking quiet, secure shelters.",
    clinical: "WHELPING BOX. Set up the nesting box in a peaceful, draft-free room. Encourage her to sleep there so she recognizes it as a secure birthing nest.",
    highlights: [
      { type: "alert", title: "Whelping Box Setup", desc: "Introduce the nest area. Make it warm, quiet, and familiar." },
      { type: "info", title: "Coat Growth", desc: "Full hair coverage begins over all fetal skin layers." }
    ]
  },
  {
    week: 8,
    title: "Skeletal Scans & Puppy Movement",
    days: "Days 50 - 57",
    description: "Puppies are fully formed. Active movements are visible and palpable through the dam's abdominal wall when she is resting.",
    clinical: "X-RAY WINDOW (Day 55+). Schedule a pre-whelping X-ray. Skeletons are calcified; this lets you get an exact count to prevent stuck puppy emergencies.",
    highlights: [
      { type: "alert", title: "Skeletal X-Ray", desc: "Crucial for counting heads and spines before labor starts." },
      { type: "info", title: "Palpable Movement", desc: "Puppies can be felt moving beneath the dam's skin." }
    ]
  },
  {
    week: 9,
    title: "Labor Preparation & Temp Drop",
    days: "Days 58 - 63+",
    description: "Puppies are fully mature and capable of breathing. The dam produces milk and undergoes a rapid drop in rectal temperature before labor.",
    clinical: "TEMPERATURE PROTOCOL. Take her rectal temperature twice daily. A sudden drop below 99°F (37.2°C) signals active stage 1 labor in 12-24 hours.",
    highlights: [
      { type: "alert", title: "Rectal Temperature Logs", desc: "Monitor 2x daily. Watch for the drop below 99°F." },
      { type: "alert", title: "Breeding Staffing Ready", desc: "Gather towels, dental floss, baby scale, scissors, and vet contacts." }
    ]
  }
];

// 3. Checklist Protocol (6 Core items)
const CHECKLIST_METRICS = [
  { id: "vet-ultrasound", dayOffset: 28, title: "Diagnostic Ultrasound Scan", desc: "Confirm pregnancy viability, check gestational sacs, and observe active heartbeats." },
  { id: "nutrition-shift", dayOffset: 30, title: "Caloric Transition Phase", desc: "Begin transitioning the dam gradually to high-energy, nutrient-dense puppy/gestation food." },
  { id: "whelping-box", dayOffset: 45, title: "Whelping Box Introduction", desc: "Construct/buy the nesting box in a peaceful room. Get her accustomed to sleeping inside." },
  { id: "skeletal-xray", dayOffset: 55, title: "Canine Skeletal X-Ray Scan", desc: "Perform a reproductive clinic X-ray to count skulls and spines. Essential for safe delivery targets." },
  { id: "supplies-gathering", dayOffset: 58, title: "Whelping Supplies Compilation", desc: "Prepare clean towels, dental floss for tying cords, sterilized scissors, a baby scale, and vet emergency hotlines." },
  { id: "temp-tracking", dayOffset: 58, title: "Rectal Temperature Monitoring", desc: "Begin rectal temperature tracking 2-3 times daily. A drop below 99.0°F indicates labor within 24h." }
];

// --- SaaS Local State Cache ---
let appState = {
  currentTab: "tab-calculator",
  user: null, // Mock Auth Session
  calculator: {
    dogName: "",
    breed: "",
    matingDate: null,
    ovulationDate: null,
    gestationDays: 63,
    calculatedDue: null,
    earliestWhelping: null,
    latestWhelping: null,
    daysElapsed: 0,
    daysRemaining: 0,
    progressPercent: 0,
    currentWeek: 1
  },
  litters: [], // Persisted litters
  budget: {
    expectedPups: 6,
    vetCostVisit: 120,
    vetVisitsCount: 4,
    foodCostMonth: 80,
    suppliesCost: 250,
    totalCost: 0,
    costPerPup: 0
  }
};

// --- DOM Registry ---
const dom = {
  // Navigation
  navLinks: document.querySelectorAll(".nav-link"),
  tabViews: document.querySelectorAll(".tab-view"),
  logo: document.getElementById("btn-logo"),
  navPricing: document.getElementById("nav-btn-pricing"),
  navAbout: document.getElementById("nav-btn-about"),
  navProCta: document.getElementById("nav-pro-cta"),
  authStatusBox: document.getElementById("auth-status-box"),
  themeToggle: document.getElementById("theme-toggle"),
  
  // Modals
  modalPricing: document.getElementById("modal-pricing"),
  modalAuth: document.getElementById("modal-auth"),
  modalCountdown: document.getElementById("modal-countdown"),
  
  btnClosePricing: document.getElementById("btn-close-pricing"),
  btnCloseAuth: document.getElementById("btn-close-auth"),
  btnCloseCountdown: document.getElementById("btn-close-countdown"),
  
  btnCheckoutPro: document.getElementById("btn-checkout-pro"),
  btnCheckoutBreeder: document.getElementById("btn-checkout-breeder"),
  
  // Auth Tab Toggles
  btnAuthTabLogin: document.getElementById("btn-auth-tab-login"),
  btnAuthTabSignup: document.getElementById("btn-auth-tab-signup"),
  panelAuthLogin: document.getElementById("auth-panel-login"),
  panelAuthSignup: document.getElementById("auth-panel-signup"),
  
  formAuthLogin: document.getElementById("form-auth-login"),
  formAuthSignup: document.getElementById("form-auth-signup"),
  
  // Calculator Form
  calcForm: document.getElementById("calculator-form"),
  inputDogName: document.getElementById("dog-name"),
  inputBreed: document.getElementById("breed-select"),
  inputMatingDate: document.getElementById("mating-date"),
  inputOvulationDate: document.getElementById("ovulation-date"),
  inputGestationDays: document.getElementById("gestation-days"),
  gestationBadge: document.getElementById("gestation-days-badge"),
  btnResetForm: document.getElementById("btn-reset-form"),
  
  // Active Dashboard Panel
  resultsEmpty: document.getElementById("calc-empty-state"),
  resultsActive: document.getElementById("calc-active-state"),
  extendedOutputs: document.getElementById("extended-calculator-outputs"),
  
  displayDogTitle: document.getElementById("display-dog-title"),
  displayDogSubtitle: document.getElementById("display-dog-subtitle"),
  displayWeekBadge: document.getElementById("display-week-badge"),
  displayProgressPercent: document.getElementById("display-progress-percent"),
  barFill: document.getElementById("bar-fill"),
  barRunner: document.getElementById("bar-runner"),
  displayTrackStart: document.getElementById("display-track-start"),
  displayTrackDue: document.getElementById("display-track-due"),
  
  displayDueDate: document.getElementById("display-due-date"),
  displayDaysRemaining: document.getElementById("display-days-remaining"),
  displayWhelpingWindow: document.getElementById("display-whelping-window"),
  displayProgressDays: document.getElementById("display-progress-days"),
  displayProgressStatus: document.getElementById("display-progress-status"),
  
  // Active Action triggers
  btnSavePregnancy: document.getElementById("btn-save-pregnancy"),
  btnPrintPdf: document.getElementById("btn-print-pdf"),
  btnShareCountdown: document.getElementById("btn-share-countdown"),
  
  // Email reminders and timelines
  emailForm: document.getElementById("email-reminders-form"),
  emailSuccess: document.getElementById("email-success-message"),
  checklistWrap: document.getElementById("checklist-items-wrap"),
  timelineWrap: document.getElementById("timeline-weeks-wrap"),
  
  // Tab 2: Litters Dashboard
  littersGate: document.getElementById("litters-auth-gate"),
  littersActiveList: document.getElementById("litters-active-list"),
  littersEmptyList: document.getElementById("litters-empty-list"),
  btnAddLitterTab: document.getElementById("btn-add-litter-tab"),
  
  // Tab 3: Cost Estimator
  costForm: document.getElementById("cost-estimator-form"),
  costPupCount: document.getElementById("cost-pup-count"),
  costPupBadge: document.getElementById("cost-pup-badge"),
  costVetVisit: document.getElementById("cost-vet-visit"),
  costVetVisitsCount: document.getElementById("cost-vet-visits-count"),
  costFoodMonth: document.getElementById("cost-food-month"),
  costSupplies: document.getElementById("cost-supplies"),
  
  displayTotalCost: document.getElementById("display-total-cost"),
  displayCostPerPup: document.getElementById("display-cost-per-pup"),
  listCostVet: document.getElementById("list-cost-vet"),
  listCostFood: document.getElementById("list-cost-food"),
  listCostSupplies: document.getElementById("list-cost-supplies"),
  listCostMisc: document.getElementById("list-cost-misc"),
  
  // Countdown widget modal
  countdownWidgetTitle: document.getElementById("countdown-widget-title"),
  countdownWidgetTimer: document.getElementById("countdown-widget-timer"),
  countdownIframeCode: document.getElementById("countdown-iframe-code"),
  btnCopyWidgetCode: document.getElementById("btn-copy-widget-code"),
  copySuccessMessage: document.getElementById("copy-success-message"),
  
  // Mobile bottom triggers
  mobilePricingCta: document.getElementById("btn-mobile-pricing"),
  footerPricing: document.getElementById("footer-btn-pricing"),
  footerLitters: document.getElementById("footer-btn-litters")
};

// --- Initialization Loader ---
document.addEventListener("DOMContentLoaded", () => {
  loadStoredSessions();
  setupNavTabs();
  setupEventListeners();
  loadSavedTheme();
  initFormDateLimits();
  calculateBudgetExpenses(); // Init cost estimates
});

// Avoid unrealistic dates (block future matings)
function initFormDateLimits() {
  const today = new Date().toISOString().split("T")[0];
  dom.inputMatingDate.max = today;
  dom.inputOvulationDate.max = today;
}

// ----------------------------------------------------
// MOCK AUTHENTICATION SYSTEM (localStorage)
// ----------------------------------------------------
function loadStoredSessions() {
  // Load session
  const storedUser = localStorage.getItem("canigesta_session");
  if (storedUser) {
    appState.user = JSON.parse(storedUser);
  }
  
  // Load saved litters
  const storedLitters = localStorage.getItem("canigesta_litters");
  if (storedLitters) {
    appState.litters = JSON.parse(storedLitters);
  }
  
  syncAuthHeaderUI();
  syncLittersDashboard();
}

function syncAuthHeaderUI() {
  if (appState.user) {
    dom.authStatusBox.innerHTML = `
      <div class="auth-user-dropdown">
        <span class="user-greeting">👤 <strong>${appState.user.name}</strong></span>
        <button class="btn btn-secondary btn-sm" id="btn-logout" style="margin-left:8px;">Logout</button>
      </div>
    `;
    document.getElementById("btn-logout").addEventListener("click", performUserLogout);
  } else {
    dom.authStatusBox.innerHTML = `
      <button class="btn btn-secondary btn-sm" id="btn-login-trigger">Log In</button>
    `;
    document.getElementById("btn-login-trigger").addEventListener("click", () => openModal(dom.modalAuth));
  }
}

function performUserLogout() {
  appState.user = null;
  localStorage.removeItem("canigesta_session");
  syncAuthHeaderUI();
  syncLittersDashboard();
}

function handleUserSignup(name, email, pass) {
  // Create simple account
  const newUser = { name, email };
  appState.user = newUser;
  localStorage.setItem("canigesta_session", JSON.stringify(newUser));
  
  closeModal(dom.modalAuth);
  syncAuthHeaderUI();
  syncLittersDashboard();
}

function handleUserLogin(email, pass) {
  // Direct mock success
  const user = { name: email.split("@")[0].toUpperCase(), email };
  appState.user = user;
  localStorage.setItem("canigesta_session", JSON.stringify(user));
  
  closeModal(dom.modalAuth);
  syncAuthHeaderUI();
  syncLittersDashboard();
}

// ----------------------------------------------------
// MULTI-TAB CONTROLLER
// ----------------------------------------------------
function setupNavTabs() {
  const switchTab = (tabId) => {
    // Sync nav active tags
    dom.navLinks.forEach(link => {
      if (link.getAttribute("data-tab") === tabId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
    
    // Sync Tab visibility
    dom.tabViews.forEach(view => {
      if (view.id === tabId) {
        view.classList.add("active");
      } else {
        view.classList.remove("active");
      }
    });

    appState.currentTab = tabId;
  };

  dom.navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const tabId = e.target.getAttribute("data-tab");
      if (tabId) switchTab(tabId);
    });
  });

  // Footer tab listeners
  if (dom.footerLitters) {
    dom.footerLitters.addEventListener("click", () => switchTab("tab-litters"));
  }
  
  document.querySelectorAll("[data-tab]").forEach(el => {
    el.addEventListener("click", (e) => {
      const tabId = el.getAttribute("data-tab");
      if (tabId) switchTab(tabId);
    });
  });
}

// ----------------------------------------------------
// CORE EVENT BINDINGS
// ----------------------------------------------------
function setupEventListeners() {
  // Breed select triggers dynamic gestation period default updates
  dom.inputBreed.addEventListener("change", (e) => {
    const breed = e.target.value;
    if (BREED_DATABASE[breed]) {
      const defaultGestation = BREED_DATABASE[breed].days;
      dom.inputGestationDays.value = defaultGestation;
      dom.gestationBadge.textContent = `${defaultGestation} Days`;
    }
  });

  // Slider change trigger
  dom.inputGestationDays.addEventListener("input", (e) => {
    dom.gestationBadge.textContent = `${e.target.value} Days`;
  });

  // Calculator submit
  dom.calcForm.addEventListener("submit", (e) => {
    e.preventDefault();
    calculateCaninePregnancy();
  });

  // Reset Form
  dom.btnResetForm.addEventListener("click", () => {
    resetCalculatorForm();
  });

  // Modal show & close listeners
  dom.navPricing.addEventListener("click", () => openModal(dom.modalPricing));
  dom.navProCta.addEventListener("click", () => openModal(dom.modalPricing));
  dom.navAbout.addEventListener("click", () => {
    document.getElementById("about-section").scrollIntoView({ behavior: "smooth" });
  });
  if (dom.footerPricing) {
    dom.footerPricing.addEventListener("click", () => openModal(dom.modalPricing));
  }
  if (dom.mobilePricingCta) {
    dom.mobilePricingCta.addEventListener("click", () => openModal(dom.modalPricing));
  }

  dom.btnClosePricing.addEventListener("click", () => closeModal(dom.modalPricing));
  dom.btnCloseAuth.addEventListener("click", () => closeModal(dom.modalAuth));
  dom.btnCloseCountdown.addEventListener("click", () => closeModal(dom.modalCountdown));
  
  // Checkout buttons click triggers check
  dom.btnCheckoutPro.addEventListener("click", () => {
    alert("Subscription checkout flows are simulated. Upgrade complete!");
    closeModal(dom.modalPricing);
  });
  dom.btnCheckoutBreeder.addEventListener("click", () => {
    alert("Enterprise billing options successfully activated!");
    closeModal(dom.modalPricing);
  });

  // Click outside to close modals
  window.addEventListener("click", (e) => {
    if (e.target === dom.modalPricing) closeModal(dom.modalPricing);
    if (e.target === dom.modalAuth) closeModal(dom.modalAuth);
    if (e.target === dom.modalCountdown) closeModal(dom.modalCountdown);
  });

  // Auth Modal Toggles
  dom.btnAuthTabLogin.addEventListener("click", () => toggleAuthTabs("login"));
  dom.btnAuthTabSignup.addEventListener("click", () => toggleAuthTabs("signup"));

  dom.formAuthLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-pass").value;
    handleUserLogin(email, pass);
  });

  dom.formAuthSignup.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const pass = document.getElementById("signup-pass").value;
    handleUserSignup(name, email, pass);
  });

  // Action Buttons
  dom.btnSavePregnancy.addEventListener("click", saveLitterProfile);
  dom.btnPrintPdf.addEventListener("click", generatePrintablePdfReport);
  dom.btnShareCountdown.addEventListener("click", openShareCountdownWidget);
  dom.btnCopyWidgetCode.addEventListener("click", copyCountdownEmbedCode);

  // Email Alerts submit
  dom.emailForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("reminder-name").value;
    const email = document.getElementById("reminder-email").value;
    
    // Success trigger
    dom.emailForm.style.display = "none";
    dom.emailSuccess.style.display = "block";
  });

  // Litter Cost Estimator slider & inputs
  dom.costPupCount.addEventListener("input", (e) => {
    dom.costPupBadge.textContent = `${e.target.value} Puppies`;
    calculateBudgetExpenses();
  });
  dom.costVetVisit.addEventListener("input", calculateBudgetExpenses);
  dom.costVetVisitsCount.addEventListener("input", calculateBudgetExpenses);
  dom.costFoodMonth.addEventListener("input", calculateBudgetExpenses);
  dom.costSupplies.addEventListener("input", calculateBudgetExpenses);
  
  dom.btnAddLitterTab.addEventListener("click", () => {
    // Switch to calculator tab and scroll to form
    document.querySelector("[data-tab='tab-calculator']").click();
    dom.inputDogName.focus();
  });

  // Theme switch
  dom.themeToggle.addEventListener("click", toggleThemeMode);
}

// ----------------------------------------------------
// UI MODAL UTILS
// ----------------------------------------------------
function openModal(modalEl) {
  modalEl.classList.add("active");
  document.body.style.overflow = "hidden"; // Block page scrolling
}

function closeModal(modalEl) {
  modalEl.classList.remove("active");
  document.body.style.overflow = "auto";
}

function toggleAuthTabs(mode) {
  if (mode === "login") {
    dom.btnAuthTabLogin.classList.add("active");
    dom.btnAuthTabSignup.classList.remove("active");
    dom.panelAuthLogin.style.display = "block";
    dom.panelAuthSignup.style.display = "none";
  } else {
    dom.btnAuthTabSignup.classList.add("active");
    dom.btnAuthTabLogin.classList.remove("active");
    dom.panelAuthSignup.style.display = "block";
    dom.panelAuthLogin.style.display = "none";
  }
}

// ----------------------------------------------------
// THEME CONTROLLER
// ----------------------------------------------------
function toggleThemeMode() {
  const body = document.body;
  const isDark = body.classList.contains("dark-mode");
  
  if (isDark) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    document.querySelector(".sun-icon").style.display = "block";
    document.querySelector(".moon-icon").style.display = "none";
    localStorage.setItem("canigesta_theme_v2", "light");
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    document.querySelector(".sun-icon").style.display = "none";
    document.querySelector(".moon-icon").style.display = "block";
    localStorage.setItem("canigesta_theme_v2", "dark");
  }
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem("canigesta_theme_v2");
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");
  
  if (savedTheme === "dark") {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    if (sunIcon) sunIcon.style.display = "none";
    if (moonIcon) moonIcon.style.display = "block";
  } else {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    if (sunIcon) sunIcon.style.display = "block";
    if (moonIcon) moonIcon.style.display = "none";
  }
}

// ----------------------------------------------------
// CALCULATOR CORE ENGINE
// ----------------------------------------------------
function calculateCaninePregnancy() {
  const dogName = dom.inputDogName.value;
  const breed = dom.inputBreed.value;
  const matingDateVal = dom.inputMatingDate.value;
  const ovulationDateVal = dom.inputOvulationDate.value;
  const gestationDays = parseInt(dom.inputGestationDays.value);

  if (!matingDateVal || !dogName || !breed) return;

  const matingDate = new Date(matingDateVal + "T00:00:00");
  let ovulationDate = null;
  if (ovulationDateVal) {
    ovulationDate = new Date(ovulationDateVal + "T00:00:00");
  }

  // Due Date Math (Ovulation is 63 days post-ovulation, Mating uses custom slider)
  let calculatedDue = null;
  if (ovulationDate) {
    calculatedDue = new Date(ovulationDate.getTime());
    calculatedDue.setDate(ovulationDate.getDate() + 63);
  } else {
    calculatedDue = new Date(matingDate.getTime());
    calculatedDue.setDate(matingDate.getDate() + gestationDays);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const oneDayMs = 24 * 60 * 60 * 1000;
  
  // Elapsed days calculations
  const elapsedMs = today.getTime() - matingDate.getTime();
  let daysElapsed = Math.floor(elapsedMs / oneDayMs);
  if (daysElapsed < 0) daysElapsed = 0;

  // Remaining days calculations
  const remainingMs = calculatedDue.getTime() - today.getTime();
  let daysRemaining = Math.ceil(remainingMs / oneDayMs);
  if (daysRemaining < 0) daysRemaining = 0;

  // Progress metrics
  const totalPregnancyDays = Math.ceil((calculatedDue.getTime() - matingDate.getTime()) / oneDayMs);
  let progressPercent = Math.round((daysElapsed / totalPregnancyDays) * 100);
  if (progressPercent > 100) progressPercent = 100;
  if (progressPercent < 0) progressPercent = 0;

  // Current pregnancy Week index
  let currentWeek = Math.ceil((daysElapsed + 1) / 7);
  if (currentWeek < 1) currentWeek = 1;
  if (currentWeek > 9) currentWeek = 9;

  // Earliest/Latest safe Whelping window (Days 58 to 68 from conception baseline)
  const baselineConception = ovulationDate ? ovulationDate : matingDate;
  
  const earliestWhelping = new Date(baselineConception.getTime());
  earliestWhelping.setDate(baselineConception.getDate() + 58);
  
  const latestWhelping = new Date(baselineConception.getTime());
  latestWhelping.setDate(baselineConception.getDate() + 68);

  // Update App State Calculator
  appState.calculator = {
    dogName,
    breed,
    matingDate,
    ovulationDate,
    gestationDays,
    calculatedDue,
    earliestWhelping,
    latestWhelping,
    daysElapsed,
    daysRemaining,
    progressPercent,
    currentWeek
  };

  // Sync Active UIs
  renderActiveDashboardUI();
  populateMilestonesTimeline();
  populateChecklistPanel();

  // Reset Subscriptions success window
  dom.emailForm.style.display = "flex";
  dom.emailSuccess.style.display = "none";

  // Swap empty and active state containers
  dom.resultsEmpty.style.display = "none";
  dom.resultsActive.style.display = "block";
  dom.extendedOutputs.style.display = "block";

  // Scroll smoothly to results
  dom.resultsActive.scrollIntoView({ behavior: "smooth" });
}

function renderActiveDashboardUI() {
  const calc = appState.calculator;
  
  dom.displayDogTitle.textContent = `${calc.dogName}'s Gestation`;
  
  const formattedMating = formatDateHuman(calc.matingDate);
  dom.displayDogSubtitle.textContent = `${calc.breed} · Mated on ${formattedMating}`;
  
  dom.displayWeekBadge.textContent = calc.daysElapsed >= calc.gestationDays ? "Overdue / Whelping" : `Week ${calc.currentWeek} of 9`;
  
  // Progress Bar updates
  dom.displayProgressPercent.textContent = `${calc.progressPercent}%`;
  dom.barFill.style.width = `${calc.progressPercent}%`;
  dom.barRunner.style.left = `${calc.progressPercent}%`;
  
  dom.displayTrackStart.textContent = formatDateHuman(calc.matingDate);
  dom.displayTrackDue.textContent = formatDateHuman(calc.calculatedDue);
  
  // Metric Cards
  dom.displayDueDate.textContent = formatDateHuman(calc.calculatedDue);
  dom.displayDaysRemaining.textContent = calc.daysRemaining > 0 
    ? `${calc.daysRemaining} days until whelping` 
    : "Dam is fully ready to deliver!";
    
  dom.displayWhelpingWindow.textContent = `${formatDateHuman(calc.earliestWhelping)} - ${formatDateHuman(calc.latestWhelping)}`;
  
  dom.displayProgressDays.textContent = `Day ${calc.daysElapsed} / ${calc.gestationDays}`;
  
  // Descriptive captions
  if (calc.progressPercent === 0) {
    dom.displayProgressStatus.textContent = "Conception is just commencing.";
  } else if (calc.progressPercent < 30) {
    dom.displayProgressStatus.textContent = "Blastomere division and travel down oviducts.";
  } else if (calc.progressPercent < 50) {
    dom.displayProgressStatus.textContent = "Successful uterine wall implantation.";
  } else if (calc.progressPercent < 85) {
    dom.displayProgressStatus.textContent = "Rapid fetal bone calcification and skeleton setup.";
  } else if (calc.progressPercent < 100) {
    dom.displayProgressStatus.textContent = "Final coat coverage, milk prep, nesting instincts.";
  } else {
    dom.displayProgressStatus.textContent = "Labor is highly imminent!";
  }
}

// ----------------------------------------------------
// DYNAMIC 9-WEEK TIMELINE ACCORDIONS
// ----------------------------------------------------
function populateMilestonesTimeline() {
  dom.timelineWrap.innerHTML = "";
  const calc = appState.calculator;
  const matingTime = calc.matingDate.getTime();
  const oneDayMs = 24 * 60 * 60 * 1000;

  TIMELINE_WEEKS.forEach((w) => {
    const dayStartNum = (w.week - 1) * 7;
    const dayEndNum = (w.week * 7) - 1;
    
    const weekStartCal = new Date(calc.matingDate.getTime());
    weekStartCal.setDate(calc.matingDate.getDate() + dayStartNum);
    
    const weekEndCal = new Date(calc.matingDate.getTime());
    weekEndCal.setDate(calc.matingDate.getDate() + dayEndNum);

    const isActive = calc.currentWeek === w.week;

    const weekCard = document.createElement("div");
    weekCard.className = `t-week-card ${isActive ? "active-week open" : ""}`;
    weekCard.id = `t-card-week-${w.week}`;

    // Highlights bullets
    let hlHtml = "";
    w.highlights.forEach(h => {
      const icon = h.type === "alert" ? "⚠️" : "ℹ️";
      hlHtml += `
        <div class="t-hl-card">
          <span class="hl-icon">${icon}</span>
          <div>
            <h5>${h.title}</h5>
            <p>${h.desc}</p>
          </div>
        </div>
      `;
    });

    weekCard.innerHTML = `
      <div class="t-week-header">
        <div class="t-left">
          <div class="t-circle">${w.week}</div>
          <div class="t-title-area">
            <h3>${w.title}</h3>
            <span class="t-dates">${formatDateHuman(weekStartCal)} to ${formatDateHuman(weekEndCal)} (${w.days})</span>
          </div>
        </div>
        <div class="t-right">
          ${isActive ? '<span class="badge-accent">Active Now</span>' : ''}
          <svg class="arrow-svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>
      <div class="t-content" style="${isActive ? 'max-height:800px;' : 'max-height:0px;'}">
        <div class="t-content-inner">
          <p>${w.description}</p>
          <div class="t-highlights">
            ${hlHtml}
          </div>
          <div class="t-clinical">
            <h4>Veterinary Reproductive Guidance</h4>
            <p>${w.clinical}</p>
          </div>
        </div>
      </div>
    `;

    // Click handler to open/close accordion
    weekCard.querySelector(".t-week-header").addEventListener("click", () => {
      const isOpen = weekCard.classList.contains("open");
      const content = weekCard.querySelector(".t-content");
      if (isOpen) {
        content.style.maxHeight = "0px";
        weekCard.classList.remove("open");
      } else {
        content.style.maxHeight = "800px";
        weekCard.classList.add("open");
      }
    });

    dom.timelineWrap.appendChild(weekCard);
  });
}

// ----------------------------------------------------
// DYNAMIC AUTO-TICKING CHECKLIST
// ----------------------------------------------------
function populateChecklistPanel() {
  dom.checklistWrap.innerHTML = "";
  const calc = appState.calculator;

  CHECKLIST_METRICS.forEach((item) => {
    const targetDate = new Date(calc.matingDate.getTime());
    targetDate.setDate(calc.matingDate.getDate() + item.dayOffset);

    // Calculate Status logic (Done, Due Soon, Upcoming)
    let statusClass = "status-upcoming";
    let statusTag = `<span class="checklist-tag tag-upcoming">Upcoming</span>`;
    let icon = "⏳";

    const daysDiff = calc.daysElapsed - item.dayOffset;

    if (calc.daysElapsed >= item.dayOffset) {
      statusClass = "status-done";
      statusTag = `<span class="checklist-tag tag-done">Done</span>`;
      icon = "✅";
    } else if (Math.abs(daysDiff) <= 3 || (item.dayOffset >= (calc.currentWeek - 1) * 7 && item.dayOffset < calc.currentWeek * 7)) {
      statusClass = "status-due";
      statusTag = `<span class="checklist-tag tag-due">Due Soon</span>`;
      icon = "🔔";
    }

    const row = document.createElement("div");
    row.className = `checklist-row ${statusClass}`;
    row.innerHTML = `
      <span class="checklist-icon">${icon}</span>
      <div class="chk-content">
        <div class="chk-top">
          <h4 class="chk-title">${item.title}</h4>
          <span class="chk-date">Due: ${formatDateHuman(targetDate)}</span>
        </div>
        <p class="chk-desc">${item.desc}</p>
        ${statusTag}
      </div>
    `;

    dom.checklistWrap.appendChild(row);
  });
}

// ----------------------------------------------------
// MULTI-DOG LITTER MANAGER DATABASE
// ----------------------------------------------------
function saveLitterProfile() {
  // If not logged in, prompt Auth Modal!
  if (!appState.user) {
    alert("Please sign up or log in to access the Multi-Dog Litter Dashboard.");
    openModal(dom.modalAuth);
    return;
  }

  const calc = appState.calculator;
  if (!calc.dogName) return;

  // Check if profile already exists, if so overwrite
  const existsIndex = appState.litters.findIndex(l => l.dogName === calc.dogName);
  
  const litterProfile = {
    dogName: calc.dogName,
    breed: calc.breed,
    matingDate: calc.matingDate.toISOString().split("T")[0],
    ovulationDate: calc.ovulationDate ? calc.ovulationDate.toISOString().split("T")[0] : null,
    gestationDays: calc.gestationDays,
    calculatedDue: calc.calculatedDue.toISOString().split("T")[0],
    progressPercent: calc.progressPercent,
    currentWeek: calc.currentWeek,
    daysElapsed: calc.daysElapsed,
    daysRemaining: calc.daysRemaining
  };

  if (existsIndex > -1) {
    appState.litters[existsIndex] = litterProfile;
    alert(`Updated ${calc.dogName}'s litter details successfully!`);
  } else {
    appState.litters.push(litterProfile);
    alert(`Saved ${calc.dogName}'s pregnancy profile in My Litters!`);
  }

  // Persist to local storage
  localStorage.setItem("canigesta_litters", JSON.stringify(appState.litters));
  
  syncLittersDashboard();
  
  // Open Tab 2 (My Litters) automatically
  document.getElementById("nav-litters-link").click();
}

function syncLittersDashboard() {
  // Clear lists
  dom.littersActiveList.innerHTML = "";
  
  if (!appState.user) {
    dom.littersGate.innerHTML = `
      <div class="empty-state card-shadow" style="padding: 50px 30px;">
        <div class="empty-icon">🔒</div>
        <h3>Account Required</h3>
        <p>Log in or sign up to store and manage multiple active dog litters inside your personal breeder dashboard.</p>
        <button class="btn btn-primary" id="btn-dashboard-login" style="margin-top:15px;">Authenticate Free</button>
      </div>
    `;
    document.getElementById("btn-dashboard-login").addEventListener("click", () => openModal(dom.modalAuth));
    dom.littersActiveList.style.display = "none";
    dom.littersEmptyList.style.display = "none";
    return;
  }

  // Restore core container
  dom.littersGate.innerHTML = `
    <div id="litters-active-list" class="litters-grid"></div>
    <div id="litters-empty-list" class="empty-state card-shadow" style="padding: 50px 30px; display:none;">
      <div class="empty-icon">📁</div>
      <h3>No Saved Litters</h3>
      <p>You haven't saved any dog pregnancies yet. Go to the **Calculator** tab, calculate a profile, and click **"Save to My Litters"** to store your dogs here!</p>
    </div>
  `;
  
  const activeList = document.getElementById("litters-active-list");
  const emptyList = document.getElementById("litters-empty-list");

  if (appState.litters.length === 0) {
    activeList.style.display = "none";
    emptyList.style.display = "block";
    return;
  }

  activeList.style.display = "grid";
  emptyList.style.display = "none";

  appState.litters.forEach((l) => {
    const card = document.createElement("div");
    card.className = "litter-card card-shadow";
    card.innerHTML = `
      <div class="l-top">
        <div>
          <h3 class="l-dog-name">${l.dogName}</h3>
          <span class="l-breed">${l.breed}</span>
        </div>
        <span class="badge">Week ${l.currentWeek}</span>
      </div>
      
      <div class="l-dates-row">
        <div>
          <span style="display:block; font-size:0.7rem; color:var(--color-text-sub);">DUE DATE</span>
          <strong>${formatDateString(l.calculatedDue)}</strong>
        </div>
        <div style="text-align:right;">
          <span style="display:block; font-size:0.7rem; color:var(--color-text-sub);">REMAINING</span>
          <strong>${l.daysRemaining} Days</strong>
        </div>
      </div>
      
      <div class="l-progress-box">
        <div class="l-progress-txt">
          <span>Pregnancy progress</span>
          <span>${l.progressPercent}%</span>
        </div>
        <div class="l-track">
          <div class="l-fill" style="width:${l.progressPercent}%;"></div>
        </div>
      </div>

      <div class="l-actions">
        <button class="btn btn-secondary btn-sm btn-view-litter" data-dog="${l.dogName}">View Details</button>
        <button class="btn btn-secondary btn-sm btn-delete-litter" data-dog="${l.dogName}" style="color:var(--color-orange); border-color:rgba(232,99,58,0.3)">Delete</button>
      </div>
    `;

    // Bind item buttons
    card.querySelector(".btn-view-litter").addEventListener("click", () => reloadSavedLitter(l));
    card.querySelector(".btn-delete-litter").addEventListener("click", () => deleteSavedLitter(l.dogName));

    activeList.appendChild(card);
  });
}

function reloadSavedLitter(litter) {
  // Push inputs back to Form
  dom.inputDogName.value = litter.dogName;
  dom.inputBreed.value = litter.breed;
  dom.inputMatingDate.value = litter.matingDate;
  dom.inputOvulationDate.value = litter.ovulationDate ? litter.ovulationDate : "";
  dom.inputGestationDays.value = litter.gestationDays;
  dom.gestationBadge.textContent = `${litter.gestationDays} Days`;

  // Submit form calculation
  document.querySelector("[data-tab='tab-calculator']").click();
  calculateCaninePregnancy();
}

function deleteSavedLitter(dogName) {
  if (confirm(`Are you sure you want to delete ${dogName}'s pregnancy logs?`)) {
    appState.litters = appState.litters.filter(l => l.dogName !== dogName);
    localStorage.setItem("canigesta_litters", JSON.stringify(appState.litters));
    syncLittersDashboard();
  }
}

// ----------------------------------------------------
// FINANCIAL LITTER COST ESTIMATOR
// ----------------------------------------------------
function calculateBudgetExpenses() {
  const pupCount = parseInt(dom.costPupCount.value);
  const costPerVisit = parseFloat(dom.costVetVisit.value) || 0;
  const visits = parseInt(dom.costVetVisitsCount.value) || 0;
  const foodPerMonth = parseFloat(dom.costFoodMonth.value) || 0;
  const supplies = parseFloat(dom.costSupplies.value) || 0;

  // Calculative sections
  const totalVet = costPerVisit * visits;
  const totalFood = foodPerMonth * 2; // Gestation is ~2 months
  const miscellaneous = (totalVet + totalFood + supplies) * 0.10; // 10% Cushion

  const grandTotal = totalVet + totalFood + supplies + miscellaneous;
  const costPerPup = pupCount > 0 ? (grandTotal / pupCount) : 0;

  // Render to DOM
  dom.displayTotalCost.textContent = `$${grandTotal.toFixed(2)}`;
  dom.displayCostPerPup.textContent = `$${costPerPup.toFixed(2)}`;
  
  dom.listCostVet.textContent = `$${totalVet.toFixed(2)}`;
  dom.listCostFood.textContent = `$${totalFood.toFixed(2)}`;
  dom.listCostSupplies.textContent = `$${supplies.toFixed(2)}`;
  dom.listCostMisc.textContent = `$${miscellaneous.toFixed(2)}`;
}

// ----------------------------------------------------
// EMBEDDABLE COUNTDOWN WIDGET
// ----------------------------------------------------
function openShareCountdownWidget() {
  const calc = appState.calculator;
  if (!calc.dogName) return;

  dom.countdownWidgetTitle.textContent = `${calc.dogName}'s Puppies Countdown`;
  dom.countdownWidgetTimer.textContent = `${calc.daysRemaining} Days Until Whelping!`;

  // HTML iframe compiler
  const embedCode = `<iframe src="https://dog-pregnancy-calculator.vercel.app/widget?dog=${encodeURIComponent(calc.dogName)}&due=${calc.calculatedDue.toISOString().split("T")[0]}" width="100%" height="220" style="border:1.5px solid #E8633A; border-radius:12px; max-width:460px;" scrolling="no"></iframe>`;
  
  dom.countdownIframeCode.value = embedCode;
  dom.copySuccessMessage.style.display = "none";

  openModal(dom.modalCountdown);
}

function copyCountdownEmbedCode() {
  dom.countdownIframeCode.select();
  dom.countdownIframeCode.setSelectionRange(0, 99999); // Mobile compatibility
  
  navigator.clipboard.writeText(dom.countdownIframeCode.value)
    .then(() => {
      dom.copySuccessMessage.style.display = "block";
      setTimeout(() => {
        dom.copySuccessMessage.style.display = "none";
      }, 3000);
    })
    .catch(err => {
      alert("Failed to copy embed code. Please copy manually.");
    });
}

// ----------------------------------------------------
// PDF REPORT EXPORTER (jsPDF + fallbacks)
// ----------------------------------------------------
function generatePrintablePdfReport() {
  const calc = appState.calculator;
  if (!calc.dogName) return;

  const { jsPDF } = window.jspdf ? window.jspdf : {};

  // Check if jsPDF CDN is loaded successfully
  if (jsPDF) {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      // 1. Header Branded Banner
      doc.setFillColor(27, 67, 50); // Deep Forest Green (#1B4332)
      doc.rect(0, 0, 210, 35, "F");
      
      doc.setTextColor(253, 248, 243); // Warm Cream (#FDF8F3)
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(22);
      doc.text("CaniGesta", 15, 18);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Canine Pregnancy & Reproduction Diagnostics", 15, 25);
      
      doc.setFontSize(8);
      doc.text("GENERATED BY CANIGESTA.COM", 160, 25);

      // 2. Dog Information Grid Box
      doc.setFillColor(250, 245, 239); // Warm Interior Card
      doc.rect(15, 45, 180, 32, "F");
      doc.setDrawColor(232, 223, 215);
      doc.rect(15, 45, 180, 32, "S");

      doc.setTextColor(27, 67, 50);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(14);
      doc.text(`${calc.dogName.toUpperCase()} - GESTATION CARD`, 20, 52);

      doc.setTextColor(94, 109, 98); // Sub text
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`Breed: ${calc.breed}`, 20, 59);
      doc.text(`Mating Date: ${formatDateHuman(calc.matingDate)}`, 20, 65);
      if (calc.ovulationDate) {
        doc.text(`Ovulation: ${formatDateHuman(calc.ovulationDate)}`, 20, 71);
      } else {
        doc.text("Ovulation Date: Not Confirmed (Standard Slider)", 20, 71);
      }

      doc.setFont("Helvetica", "bold");
      doc.setTextColor(232, 99, 58); // Burnt Orange Accent (#E8633A)
      doc.text(`DUE DATE: ${formatDateHuman(calc.calculatedDue)}`, 105, 59);
      
      doc.setTextColor(27, 67, 50);
      doc.text(`WHELP WINDOW: ${formatDateHuman(calc.earliestWhelping)} - ${formatDateHuman(calc.latestWhelping)}`, 105, 65);
      doc.text(`Current Status: Week ${calc.currentWeek} (Day ${calc.daysElapsed} of ${calc.gestationDays})`, 105, 71);

      // 3. Veterinary Checklist
      doc.setTextColor(27, 67, 50);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.text("VETERINARY PRENATAL PROTOCOL", 15, 87);
      
      doc.setLineWidth(0.3);
      doc.setDrawColor(27, 67, 50);
      doc.line(15, 89, 195, 89);

      let checklistY = 96;
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(29, 42, 34);

      CHECKLIST_METRICS.forEach((item) => {
        const itemDate = new Date(calc.matingDate.getTime());
        itemDate.setDate(calc.matingDate.getDate() + item.dayOffset);

        // Render checkbox
        doc.rect(15, checklistY - 3, 3, 3);
        
        // Is checked? (Auto-tick if past)
        if (calc.daysElapsed >= item.dayOffset) {
          doc.line(15, checklistY - 1.5, 16.5, checklistY - 0.5);
          doc.line(16.5, checklistY - 0.5, 18, checklistY - 3);
        }

        doc.setFont("Helvetica", "bold");
        doc.text(`${item.title} (Due: ${formatDateHuman(itemDate)})`, 21, checklistY);
        
        doc.setFont("Helvetica", "normal");
        const lines = doc.splitTextToSize(item.desc, 170);
        doc.text(lines, 21, checklistY + 4.5);

        checklistY += 12;
      });

      // 4. Milestone Timeline (Add New Page)
      doc.addPage();
      
      // Page 2 Brand header
      doc.setFillColor(27, 67, 50);
      doc.rect(0, 0, 210, 15, "F");
      doc.setTextColor(253, 248, 243);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10);
      doc.text("CaniGesta Precision Gestation Milestones", 15, 10);

      doc.setTextColor(27, 67, 50);
      doc.setFontSize(12);
      doc.text("9-WEEK CLINICAL PREGNANCY TABLE", 15, 26);
      
      doc.line(15, 28, 195, 28);

      let weekY = 36;
      TIMELINE_WEEKS.forEach((w) => {
        const dayStartNum = (w.week - 1) * 7;
        const dayEndNum = (w.week * 7) - 1;
        
        const weekStartCal = new Date(calc.matingDate.getTime());
        weekStartCal.setDate(calc.matingDate.getDate() + dayStartNum);
        
        const weekEndCal = new Date(calc.matingDate.getTime());
        weekEndCal.setDate(calc.matingDate.getDate() + dayEndNum);

        doc.setFont("Helvetica", "bold");
        doc.setTextColor(27, 67, 50);
        doc.setFontSize(10);
        doc.text(`WEEK ${w.week}: ${w.title}`, 15, weekY);

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(143, 163, 150);
        doc.text(`${formatDateHuman(weekStartCal)} to ${formatDateHuman(weekEndCal)} (${w.days})`, 140, weekY);

        doc.setFontSize(8.5);
        doc.setTextColor(29, 42, 34);
        const descLines = doc.splitTextToSize(w.description, 180);
        doc.text(descLines, 15, weekY + 4);

        weekY += 18;
      });

      // Footer disclaimer on Page 2
      doc.setFillColor(250, 245, 239);
      doc.rect(15, 235, 180, 25, "F");
      doc.setDrawColor(245, 166, 35);
      doc.setLineWidth(0.5);
      doc.rect(15, 235, 180, 25, "S");

      doc.setTextColor(27, 67, 50);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8);
      doc.text("CLINICAL DISCLAIMER:", 20, 241);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(7.5);
      const disclaimerTxt = "This report is generated for schedule estimations based on veterinary canine gestation metrics. Breeding ranges vary depending on litter size and maternal health. Never modify diet, schedules, or medical diagnostics without direct reproductive vet supervision.";
      const discLines = doc.splitTextToSize(disclaimerTxt, 170);
      doc.text(discLines, 20, 245);

      // Save PDF
      doc.save(`canigesta_gestation_report_${calc.dogName.toLowerCase()}.pdf`);

    } catch (error) {
      console.error("jsPDF failed, fallback to print:", error);
      window.print();
    }
  } else {
    // Redundant printing fallback
    window.print();
  }
}

// ----------------------------------------------------
// HELPERS
// ----------------------------------------------------
function formatDateHuman(date) {
  if (!date) return "--";
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function formatDateString(dateStr) {
  if (!dateStr) return "--";
  const date = new Date(dateStr + "T00:00:00");
  return formatDateHuman(date);
}

function resetCalculatorForm() {
  dom.calcForm.reset();
  dom.gestationBadge.textContent = "63 Days";
  dom.inputGestationDays.value = 63;
  
  // Wipe state
  appState.calculator = {
    dogName: "",
    breed: "",
    matingDate: null,
    ovulationDate: null,
    gestationDays: 63,
    calculatedDue: null,
    earliestWhelping: null,
    latestWhelping: null,
    daysElapsed: 0,
    daysRemaining: 0,
    progressPercent: 0,
    currentWeek: 1
  };
  
  dom.resultsEmpty.style.display = "flex";
  dom.resultsActive.style.display = "none";
  dom.extendedOutputs.style.display = "none";
}
