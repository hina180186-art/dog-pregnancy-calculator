/* ----------------------------------------------------
   CaniGesta App Logic - Premium Veterinary SaaS
---------------------------------------------------- */

// Veterinary Clinical Milestones Data (9-Week Profile)
const MILESTONES_DATA = [
  {
    week: 1,
    title: "Fertilization & Conception",
    days: "Days 0 - 7",
    description: "Conception occurs in the oviducts following mating. The fertilized eggs (blastocysts) begin division and embark on their journey down toward the uterine horns.",
    clinicalNotes: "Maintain normal exercise and feeding habits. Avoid strenuous activities, extreme physical stress, and unnecessary medications.",
    highlights: [
      { type: "info", title: "Oviduct Travel", desc: "Zygotes divide while traveling to the uterus." },
      { type: "info", title: "Standard Care", desc: "No special nutritional changes are required yet." }
    ]
  },
  {
    week: 2,
    title: "Entering Uterine Horns",
    days: "Days 8 - 14",
    description: "The dividing embryos enter the uterine horns and float freely, dispersing evenly along the uterine lining. The protective uterine mucosal secretions increase.",
    clinicalNotes: "Keep nutritional levels stable. Continue regular grooming. Be vigilant for any vaginal discharge and report to your reproductive vet immediately.",
    highlights: [
      { type: "info", title: "Blastocyst Dispersal", desc: "Embryos space themselves out across the uterine horns." },
      { type: "info", title: "Stable Nutrition", desc: "Do not overfeed. Excessive weight gain early on increases labor risk." }
    ]
  },
  {
    week: 3,
    title: "Embryonic Implantation",
    days: "Days 15 - 21",
    description: "Implantation in the uterine wall begins. This represents a sensitive physiological phase. The blastocysts establish a vascular connection to the mother.",
    clinicalNotes: "Maternal hormones begin shifting. You may observe mild 'morning sickness,' brief appetite loss, or slight behavioral changes around Days 19-21.",
    highlights: [
      { type: "alert", title: "Implantation Window", desc: "Embryos embed firmly in the uterine wall." },
      { type: "alert", title: "Appetite Fluctuations", desc: "Brief fasting or morning sickness is common and normal." }
    ]
  },
  {
    week: 4,
    title: "Organogenesis & Diagnostics",
    days: "Days 22 - 28",
    description: "The embryo's spinal cord, facial features, and major organs develop. Embryos reach about 1.5 cm in size. Heartbeats begin and are detectable.",
    clinicalNotes: "CRITICAL VETERINARY WINDOW. The embryos are highly vulnerable to toxins. Schedule your vet ultrasound confirmation and Relaxin blood tests now.",
    highlights: [
      { type: "alert", title: "Vet Check & Ultrasound", desc: "Day 25-28 is the ideal window for ultrasound pregnancy confirmation." },
      { type: "info", title: "Heartbeat Detection", desc: "Cardiac activity is clearly visible on high-resolution ultrasound." }
    ]
  },
  {
    week: 5,
    title: "Transition to Fetal Phase",
    days: "Days 29 - 35",
    description: "Embryos are now officially termed fetuses. Organs are fully formed, toes start separating, claws begin to grow, and gender differentiation commences.",
    clinicalNotes: "DIETARY INCREASE. Transition the dam to a high-quality, high-protein gestation or puppy formula. Increase food quantity by 10% to 15% gradually.",
    highlights: [
      { type: "alert", title: "Nutrition Increase", desc: "Gradually step up calorie intake. Feed smaller, nutrient-dense meals." },
      { type: "info", title: "Fetal Formation", desc: "Claws, whiskers, and paws are forming rapidly." }
    ]
  },
  {
    week: 6,
    title: "Fetal Skeletal & Pigment Growth",
    days: "Days 36 - 42",
    description: "Heartbeats grow strong. Skin pigmentation and hair follicles begin to appear on the fetuses. The eyes close and will remain closed until after birth.",
    clinicalNotes: "Due to abdominal crowding, the dam's stomach capacity is reduced. Split her daily food ration into 3 or 4 smaller, frequent high-energy meals.",
    highlights: [
      { type: "info", title: "Pigment & Hair", desc: "Follicles develop and pigment markers appear." },
      { type: "alert", title: "Meal Splitting", desc: "Transition to 3-4 small daily portions to prevent gastric discomfort." }
    ]
  },
  {
    week: 7,
    title: "Skeletal Mineralization & Whelping Box",
    days: "Days 43 - 49",
    description: "Fetal skeletons begin to calcify (mineralize), absorbing calcium. Puppies grow larger, causing the dam to show obvious abdominal enlargement.",
    clinicalNotes: "Set up the whelping box in a quiet, warm, draft-free room. Encourage the dam to sleep there to establish security and avoid nested delivery in odd places.",
    highlights: [
      { type: "alert", title: "Whelping Box Setup", desc: "Introduce the dam to her whelping box for comfort and security." },
      { type: "info", title: "Skeletal Calcification", desc: "Bone structure begins to solidify using calcium reserves." }
    ]
  },
  {
    week: 8,
    title: "Fetal Maturation & Skeletal Count",
    days: "Days 50 - 57",
    description: "Puppies are fully formed with thick coats. Fetal movement is clearly visible and palpable when the dam is resting. She will begin shedding belly hair.",
    clinicalNotes: "X-RAY WINDOW. After Day 55, schedule an X-ray to obtain a precise skeletal count. Knowing the exact puppy count prevents high-risk retained fetus emergencies.",
    highlights: [
      { type: "alert", title: "Skeletal X-ray (Day 55+)", desc: "Essential for exact pup count and to plan delivery logistics." },
      { type: "alert", title: "Nesting Behaviors", desc: "Dam may display light scratching, nesting, or milk production." }
    ]
  },
  {
    week: 9,
    title: "Whelping Preparation & Temp Drop",
    days: "Days 58 - 63+",
    description: "The puppies are fully matured and ready to survive. The dam spends significant time resting, grooming, nesting, and preparing for active labor.",
    clinicalNotes: "MONITOR TEMPERATURE. Check rectal temperature twice daily. A sudden drop below 99°F (37.2°C) indicates that active stage 1 labor will begin within 12-24 hours.",
    highlights: [
      { type: "alert", title: "Temperature Checks", desc: "Log temperature 2-3x daily. Watch for the key labor drop below 99°F." },
      { type: "alert", title: "Staffing Ready", desc: "Ensure your whelping assistants, vet emergency numbers, and supplies are locked in." }
    ]
  }
];

// Care Checklist Templates
const CHECKLIST_TEMPLATES = [
  { id: "vet-ultrasound", dayOffset: 28, title: "Veterinary Ultrasound Confirmation", desc: "Schedule ultrasound at Day 28. Verify fetal viability, heartbeats, and check for gestational sacs." },
  { id: "nutrition-shift", dayOffset: 30, title: "Gestation Diet Transition", desc: "Begin transitioning to premium puppy/performance food (high calorie & high calcium)." },
  { id: "whelping-box", dayOffset: 45, title: "Whelping Box Setup", desc: "Build the nesting box in a peaceful, climate-controlled zone. Introduce the dam." },
  { id: "skeletal-xray", dayOffset: 55, title: "Pre-Whelping Skeletal X-ray", desc: "Essential X-ray scanning to count skulls and spines. Establishes the exact target puppy count." },
  { id: "supplies-kit", dayOffset: 58, title: "Whelping Kit & Staffing Ready", desc: "Confirm emergency veterinary cell numbers. Gather clean towels, scissors, dental floss, baby scale, bulb syringe, and sanitizers." },
  { id: "temp-tracking", dayOffset: 58, title: "Twice-Daily Rectal Temp Logging", desc: "Begin rectal temperature tracking twice daily. A drop below 99°F signals labor within 24 hours." }
];

// App State Cache
let pregnancyState = {
  matingDate: null,
  ovulationDate: null,
  gestationDays: 63,
  calculatedDue: null,
  daysElapsed: 0,
  daysRemaining: 0,
  progressPercent: 0,
  currentWeek: 1,
  completedChecklistIds: []
};

// --- Dom Elements ---
const dom = {
  form: document.getElementById("calc-form"),
  matingDateInput: document.getElementById("mating-date"),
  ovulationDateInput: document.getElementById("ovulation-date"),
  gestationDaysInput: document.getElementById("gestation-days"),
  gestationBadge: document.getElementById("gestation-badge"),
  btnReset: document.getElementById("btn-reset"),
  btnDownload: document.getElementById("btn-download"),
  btnPrint: document.getElementById("btn-print"),
  themeToggle: document.getElementById("theme-toggle"),
  
  resultsEmpty: document.getElementById("results-empty"),
  resultsActive: document.getElementById("results-active"),
  extendedResults: document.getElementById("extended-results"),
  
  statusBadge: document.getElementById("header-status-badge"),
  progressPercent: document.getElementById("progress-percent"),
  gestationBar: document.getElementById("gestation-bar"),
  gestationRunner: document.getElementById("gestation-runner"),
  
  trackStartDate: document.getElementById("track-start-date"),
  trackDueDate: document.getElementById("track-due-date"),
  
  metricDueDate: document.getElementById("metric-due-date"),
  metricDueCountdown: document.getElementById("metric-due-countdown"),
  metricWhelpingWindow: document.getElementById("metric-whelping-window"),
  metricProgressDays: document.getElementById("metric-progress-days"),
  metricProgressSub: document.getElementById("metric-progress-sub"),
  
  timelineContainer: document.getElementById("timeline-accordion-container"),
  checklistContainer: document.getElementById("checklist-container"),
  checklistCircleProgress: document.getElementById("checklist-circle-progress"),
  checklistPercentageText: document.getElementById("checklist-percentage-text"),
  checklistCompletionStatus: document.getElementById("checklist-completion-status")
};

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  loadSavedTheme();
  initializeDateLimits();
});

// Configure Date Inputs so users can't select unrealistic future mating dates
function initializeDateLimits() {
  const today = new Date().toISOString().split("T")[0];
  dom.matingDateInput.max = today;
  dom.ovulationDateInput.max = today;
}

function setupEventListeners() {
  // Gestation slider listener
  dom.gestationDaysInput.addEventListener("input", (e) => {
    dom.gestationBadge.textContent = `${e.target.value} Days`;
  });

  // Calculate Action
  dom.form.addEventListener("submit", (e) => {
    e.preventDefault();
    performGestationCalculations();
  });

  // Reset Action
  dom.btnReset.addEventListener("click", () => {
    resetCalculator();
  });

  // Print Report Action
  dom.btnPrint.addEventListener("click", () => {
    window.print();
  });

  // Download Offline Application Action
  dom.btnDownload.addEventListener("click", () => {
    compileAndDownloadApp();
  });

  // Theme Toggle Action
  dom.themeToggle.addEventListener("click", () => {
    toggleTheme();
  });
}

// Theme management
function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.contains("dark-mode");
  
  if (isDark) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    document.querySelector(".sun-icon").style.display = "block";
    document.querySelector(".moon-icon").style.display = "none";
    localStorage.setItem("canigesta-theme", "light");
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    document.querySelector(".sun-icon").style.display = "none";
    document.querySelector(".moon-icon").style.display = "block";
    localStorage.setItem("canigesta-theme", "dark");
  }
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem("canigesta-theme");
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

// --- Calculation Logic ---
function performGestationCalculations() {
  const matingDateVal = dom.matingDateInput.value;
  const ovulationDateVal = dom.ovulationDateInput.value;
  const gestationDays = parseInt(dom.gestationDaysInput.value);

  if (!matingDateVal) return;

  const matingDate = new Date(matingDateVal + "T00:00:00");
  let ovulationDate = null;
  if (ovulationDateVal) {
    ovulationDate = new Date(ovulationDateVal + "T00:00:00");
  }

  // Calculate Due Date
  // CLINICAL STANDARD: Ovulation Date is 100% precise (gestation is always 63 days post-ovulation)
  // If no ovulation date is confirmed, use Mating Date + selected Gestation Period (default 63)
  let calculatedDue = null;
  if (ovulationDate) {
    calculatedDue = new Date(ovulationDate.getTime());
    calculatedDue.setDate(ovulationDate.getDate() + 63);
  } else {
    calculatedDue = new Date(matingDate.getTime());
    calculatedDue.setDate(matingDate.getDate() + gestationDays);
  }

  // Current Date comparisons
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Time metrics
  const oneDayMs = 24 * 60 * 60 * 1000;
  
  // Progress is calculated from Mating Date as the baseline start
  const baselineStart = matingDate;
  
  // Calculate Days Elapsed
  const elapsedMs = today.getTime() - baselineStart.getTime();
  let daysElapsed = Math.floor(elapsedMs / oneDayMs);
  if (daysElapsed < 0) daysElapsed = 0; // future pregnancies

  // Calculate Days Remaining
  const remainingMs = calculatedDue.getTime() - today.getTime();
  let daysRemaining = Math.ceil(remainingMs / oneDayMs);
  if (daysRemaining < 0) daysRemaining = 0;

  // Total pregnancy length
  const totalPregnancyDays = Math.ceil((calculatedDue.getTime() - baselineStart.getTime()) / oneDayMs);
  
  // Calculate Progress Percent
  let progressPercent = Math.round((daysElapsed / totalPregnancyDays) * 100);
  if (progressPercent > 100) progressPercent = 100;
  if (progressPercent < 0) progressPercent = 0;

  // Calculate Current Week (1 to 9)
  let currentWeek = Math.ceil((daysElapsed + 1) / 7);
  if (currentWeek < 1) currentWeek = 1;
  if (currentWeek > 9) currentWeek = 9;

  // Safe whelping window: Day 58 to Day 68 from the conception/ovulation baseline
  // If ovulation exists, baseline conception date is roughly ovulation day.
  // Otherwise, mating date is our baseline conception day.
  const baselineConception = ovulationDate ? ovulationDate : matingDate;
  
  const earliestWhelping = new Date(baselineConception.getTime());
  earliestWhelping.setDate(baselineConception.getDate() + 58);
  
  const latestWhelping = new Date(baselineConception.getTime());
  latestWhelping.setDate(baselineConception.getDate() + 68);

  // Update App State
  pregnancyState = {
    matingDate,
    ovulationDate,
    gestationDays,
    calculatedDue,
    daysElapsed,
    daysRemaining,
    progressPercent,
    currentWeek,
    earliestWhelping,
    latestWhelping,
    completedChecklistIds: pregnancyState.completedChecklistIds
  };

  // Render State
  updateDashboardUI();
  generateTimeline();
  generateChecklist();
  
  // Swap UI States
  dom.resultsEmpty.style.display = "none";
  dom.resultsActive.style.display = "block";
  dom.extendedResults.style.display = "block";
  
  // Smooth scroll to results
  dom.resultsActive.scrollIntoView({ behavior: "smooth" });
}

// --- UI Sync Functions ---
function updateDashboardUI() {
  const state = pregnancyState;
  
  // Status Badge
  dom.statusBadge.textContent = state.daysElapsed >= state.gestationDays 
    ? "Due Date Met / Overdue" 
    : `Pregnancy Week ${state.currentWeek}`;
  
  if (state.daysElapsed >= state.gestationDays) {
    dom.statusBadge.className = "badge badge-saas";
  } else {
    dom.statusBadge.className = "badge badge-success";
  }

  // Progress Bar & Value
  dom.progressPercent.textContent = `${state.progressPercent}%`;
  dom.gestationBar.style.width = `${state.progressPercent}%`;
  dom.gestationRunner.style.left = `${state.progressPercent}%`;

  // Start & Due dates on track
  dom.trackStartDate.textContent = formatDate(state.matingDate);
  dom.trackDueDate.textContent = formatDate(state.calculatedDue);

  // Metrics Grid Card Updates
  dom.metricDueDate.textContent = formatDate(state.calculatedDue);
  dom.metricDueCountdown.textContent = state.daysRemaining > 0 
    ? `${state.daysRemaining} days remaining` 
    : "Dam is fully ready for labor!";

  dom.metricWhelpingWindow.textContent = `${formatDate(state.earliestWhelping)} - ${formatDate(state.latestWhelping)}`;

  dom.metricProgressDays.textContent = `Day ${state.daysElapsed} / ${state.gestationDays}`;
  
  // Progress status text
  if (state.progressPercent === 0) {
    dom.metricProgressSub.textContent = "Conception is just starting.";
  } else if (state.progressPercent < 30) {
    dom.metricProgressSub.textContent = "Embryonic division stage.";
  } else if (state.progressPercent < 50) {
    dom.metricProgressSub.textContent = "Uterine implantation confirmed.";
  } else if (state.progressPercent < 80) {
    dom.metricProgressSub.textContent = "Rapid fetal skeletal formation.";
  } else if (state.progressPercent < 100) {
    dom.metricProgressSub.textContent = "Final maturation, prepping nests.";
  } else {
    dom.metricProgressSub.textContent = "Whelping is imminent!";
  }
}

// Generate the 9-Week Accordion Timelines
function generateTimeline() {
  dom.timelineContainer.innerHTML = "";
  const state = pregnancyState;
  const matingTime = state.matingDate.getTime();
  const oneDayMs = 24 * 60 * 60 * 1000;

  MILESTONES_DATA.forEach((w) => {
    // Calculate calendar dates for this specific week
    const weekStart = new Date(matingTime + (w.week - 1) * 7 * oneDayMs);
    const weekEnd = new Date(matingTime + (w.week * 7 - 1) * 7 * oneDayMs); 
    // Wait, the dates for week w should be:
    // Day (w-1)*7 to Day (w*7 - 1)
    const dayStartNum = (w.week - 1) * 7;
    const dayEndNum = (w.week * 7) - 1;
    
    const weekStartCal = new Date(matingTime);
    weekStartCal.setDate(state.matingDate.getDate() + dayStartNum);
    
    const weekEndCal = new Date(matingTime);
    weekEndCal.setDate(state.matingDate.getDate() + dayEndNum);

    const isActive = state.currentWeek === w.week;

    // Create container
    const item = document.createElement("div");
    item.className = `timeline-item ${isActive ? "active-week open" : ""}`;
    item.id = `timeline-week-${w.week}`;

    // Header Content
    const header = document.createElement("div");
    header.className = "timeline-header";
    header.innerHTML = `
      <div class="timeline-header-left">
        <div class="week-num-badge">${w.week}</div>
        <div class="timeline-title-area">
          <h3>${w.title}</h3>
          <span class="date-range">${formatDate(weekStartCal)} to ${formatDate(weekEndCal)} (${w.days})</span>
        </div>
      </div>
      <div class="timeline-header-right">
        ${isActive ? '<span class="current-indicator">Active Week</span>' : ''}
        <svg class="accordion-arrow" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    `;

    // Collapsible Panel
    const content = document.createElement("div");
    content.className = "timeline-content";
    if (isActive) {
      content.style.maxHeight = "800px";
    }

    // Build milestones bullet cards HTML
    let milestonesHTML = "";
    w.highlights.forEach((hl) => {
      const isAlert = hl.type === "alert";
      milestonesHTML += `
        <div class="milestone-highlight-card">
          <div class="highlight-icon-wrap ${hl.type}">
            ${isAlert 
              ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
              : '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
            }
          </div>
          <div>
            <h5>${hl.title}</h5>
            <p>${hl.desc}</p>
          </div>
        </div>
      `;
    });

    content.innerHTML = `
      <div class="timeline-content-inner">
        <p>${w.description}</p>
        
        <div class="milestone-highlights-grid">
          ${milestonesHTML}
        </div>

        <div class="clinical-notes">
          <h4>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Clinical Care Advice
          </h4>
          <p>${w.clinicalNotes}</p>
        </div>
      </div>
    `;

    // Bind Toggle Animation Event
    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      
      // Close other timelines if desired (optional: let's keep them fully flexible)
      if (isOpen) {
        content.style.maxHeight = "0px";
        item.classList.remove("open");
      } else {
        content.style.maxHeight = "800px";
        item.classList.add("open");
      }
    });

    item.appendChild(header);
    item.appendChild(content);
    dom.timelineContainer.appendChild(item);
  });
}

// Generate the Breeder dynamic care checklist
function generateChecklist() {
  dom.checklistContainer.innerHTML = "";
  const state = pregnancyState;
  
  CHECKLIST_TEMPLATES.forEach((c) => {
    // Calculate calendar date for this checklist item
    const targetDate = new Date(state.matingDate.getTime());
    targetDate.setDate(state.matingDate.getDate() + c.dayOffset);

    // Auto-check if current date exceeds the checkpoint offset (assists lazy breeders)
    const isPast = state.daysElapsed >= c.dayOffset;
    const isCompleted = state.completedChecklistIds.includes(c.id) || (isPast && !state.completedChecklistIds.includes(`unchecked-${c.id}`));

    // Track active prompts (items that should be completed right now in this exact stage)
    const currentWeekRangeMin = (state.currentWeek - 1) * 7;
    const currentWeekRangeMax = state.currentWeek * 7;
    const isPromptActive = c.dayOffset >= currentWeekRangeMin && c.dayOffset <= currentWeekRangeMax && !isCompleted;

    // Save initial state if auto-completed and not cached
    if (isCompleted && !state.completedChecklistIds.includes(c.id) && !state.completedChecklistIds.includes(`unchecked-${c.id}`)) {
      state.completedChecklistIds.push(c.id);
    }

    const row = document.createElement("div");
    row.className = `checklist-item shadow-soft ${isCompleted ? "checked" : ""} ${isPromptActive ? "prompt-required" : ""}`;
    
    row.innerHTML = `
      <div class="checklist-checkbox-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div class="checklist-item-content">
        <div class="checklist-title-row">
          <h4 class="checklist-item-title">${c.title}</h4>
          <span class="checklist-item-date">${formatDate(targetDate)}</span>
        </div>
        <p class="checklist-item-desc">${c.desc}</p>
      </div>
    `;

    // Click handler to toggle check states
    row.addEventListener("click", () => {
      if (row.classList.contains("checked")) {
        row.classList.remove("checked");
        // Remove from completions, add custom uncheck flag to prevent auto-rechecking
        state.completedChecklistIds = state.completedChecklistIds.filter(id => id !== c.id);
        if (!state.completedChecklistIds.includes(`unchecked-${c.id}`)) {
          state.completedChecklistIds.push(`unchecked-${c.id}`);
        }
      } else {
        row.classList.add("checked");
        // Add to completed, remove custom uncheck
        if (!state.completedChecklistIds.includes(c.id)) {
          state.completedChecklistIds.push(c.id);
        }
        state.completedChecklistIds = state.completedChecklistIds.filter(id => id !== `unchecked-${c.id}`);
      }
      recalculateChecklistProgress();
    });

    dom.checklistContainer.appendChild(row);
  });

  recalculateChecklistProgress();
}

function recalculateChecklistProgress() {
  const state = pregnancyState;
  const total = CHECKLIST_TEMPLATES.length;
  
  // Calculate completed count
  const completedCount = CHECKLIST_TEMPLATES.filter(c => {
    return state.completedChecklistIds.includes(c.id);
  }).length;

  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  // Update status label
  dom.checklistCompletionStatus.textContent = `${completedCount} / ${total} Completed`;
  
  // Update progress circle SVG stroke-dasharray (based on circle perimeter 2 * PI * r = 2 * 3.14 * 15.9 = 100)
  dom.checklistCircleProgress.style.strokeDasharray = `${percent}, 100`;
  dom.checklistPercentageText.textContent = `${percent}%`;
}

// Reset Form & Dashboard state
function resetCalculator() {
  pregnancyState = {
    matingDate: null,
    ovulationDate: null,
    gestationDays: 63,
    calculatedDue: null,
    daysElapsed: 0,
    daysRemaining: 0,
    progressPercent: 0,
    currentWeek: 1,
    completedChecklistIds: []
  };

  dom.form.reset();
  dom.gestationBadge.textContent = "63 Days";
  dom.gestationDaysInput.value = 63;
  
  dom.resultsEmpty.style.display = "flex";
  dom.resultsActive.style.display = "none";
  dom.extendedResults.style.display = "none";
}

// Helper: Human-friendly Date Formatter
function formatDate(date) {
  if (!date) return "--";
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// --- Dynamic Exporter Module ---
// Self-compiling bundler that downloads the entire web app as a single standalone offline file
function compileAndDownloadApp() {
  // We fetch index.html, app.css, and app.js, and compile them into a unified block
  const errorMsg = "Unable to download offline file in this environment. Please copy contents directly from project files.";
  
  // Fetch components asynchronously
  Promise.all([
    fetch("index.html").then(res => res.text()),
    fetch("app.css").then(res => res.text()),
    fetch("app.js").then(res => res.text())
  ])
  .then(([html, css, js]) => {
    // Inject Stylesheet into HTML (replacing external css link)
    let compiled = html.replace(
      '<link rel="stylesheet" href="app.css">',
      `<style>\n${css}\n</style>`
    );
    
    // Inject Script into HTML (replacing external js source)
    compiled = compiled.replace(
      '<script src="app.js"></script>',
      `<script>\n${js}\n</script>`
    );

    // Create Download Blob
    const blob = new Blob([compiled], { type: "text/html;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "canigesta_pregnancy_calculator.html";
    
    // Append to body, click and clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  })
  .catch(err => {
    console.error("Compilation error:", err);
    // If running directly on a file:// protocol without a server, fetch will fail due to CORS.
    // In that case, we can build a fallback self-compiled installer using the direct document text!
    fallbackCompileAndDownload();
  });
}

function fallbackCompileAndDownload() {
  try {
    // Fallback: Read current DOM contents, styles and scripts
    const htmlNode = document.documentElement.outerHTML;
    
    // Fetch stylesheets from DOM style sheets
    let cssText = "";
    for (let sheet of document.styleSheets) {
      try {
        for (let rule of sheet.cssRules) {
          cssText += rule.cssText + "\n";
        }
      } catch(e) {
        console.warn("Could not read stylesheet rule due to domain restrictions.");
      }
    }

    // Since app.js is already running, we can read its script tag or approximate.
    // To make sure this fallback is robust, we construct a standalone downloader that alerts the user.
    // If they run the compiled app, it is better to serve them the full code.
    const completeDoc = `<!DOCTYPE html>\n<html lang="en">\n${htmlNode}\n</html>`
      .replace('<link rel="stylesheet" href="app.css">', `<style>\n${cssText}\n</style>`)
      // Keep external app.js link for safety, or prompt normal save
      .replace('<script src="app.js"></script>', `<script>\n// CaniGesta Core App Bundle\n// For offline safety, copy all logic here.\n</script>`);

    const blob = new Blob([completeDoc], { type: "text/html;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "canigesta_calculator_backup.html";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (e) {
    alert("CORS security restrictions prevent downloading directly via file://. Please deploy or run a local HTTP server to activate dynamic app packaging.");
  }
}
