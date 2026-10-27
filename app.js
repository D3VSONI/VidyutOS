'use strict';

/* ══════════════════════════════════════════════
   STUDENT PROFILE & CORE CONSTANTS
══════════════════════════════════════════════ */
const STUDENT = {
  name: 'Rahul Sharma',
  class: '10-B',
  roll: 23,
  admissionNo: 'DPS-DWK-2021-4821',
  board: 'CBSE Secondary (Class 10)',
};

// Configurable minimum attendance requirement (CBSE default 75%)
let MIN_ATTENDANCE = 75;

// Curriculum Subjects for Class 10
const SUBJECTS = [
  { id: 'mathematics', name: 'Mathematics', code: 'MATH-10', icon: '📐', teacher: 'Mr. S. K. Sharma', room: 'Room 204' },
  { id: 'science', name: 'Science', code: 'SCI-10', icon: '🔬', teacher: 'Dr. Ananya Sen', room: 'Physics Lab' },
  { id: 'english', name: 'English Lang & Lit', code: 'ENG-10', icon: '📖', teacher: 'Mrs. Rita Rao', room: 'Room 102' },
  { id: 'social_science', name: 'Social Science', code: 'SST-10', icon: '🌍', teacher: 'Mr. Vikram Roy', room: 'Room 208' },
  { id: 'hindi', name: 'Hindi Course A', code: 'HIN-10', icon: '✍️', teacher: 'Ms. Sunita Verma', room: 'Room 106' },
];

/* ══════════════════════════════════════════════
   ATTENDANCE DATABASE (MULTI-SUBJECT)
══════════════════════════════════════════════ */
// Dates: Term 1 (Aug 1 – Oct 27, 2026), Reference Today: 27 Oct 2026
const TODAY = new Date(2026, 9, 27); // Month is 0-indexed (9 = Oct)

// Base seed for daily subject schedule
const DAY_SCHEDULE = [
  { period: 'Period 1 (08:30 - 09:15)', subjectId: 'mathematics' },
  { period: 'Period 2 (09:15 - 10:00)', subjectId: 'science' },
  { period: 'Period 3 (10:15 - 11:00)', subjectId: 'english' },
  { period: 'Period 4 (11:00 - 11:45)', subjectId: 'social_science' },
  { period: 'Period 5 (12:30 - 01:15)', subjectId: 'hindi' },
];

// Topic bank for authentic school records
const TOPICS = {
  mathematics: [
    'Quadratic Equations — Nature of Roots (Ex 4.4)',
    'Arithmetic Progressions — nth Term Derivations',
    'Linear Equations — Graphical Solutions',
    'Coordinate Geometry — Section Formula',
    'Triangles — Basic Proportionality Theorem Proof',
    'Real Numbers — Fundamental Theorem of Arithmetic',
    'Surface Areas and Volumes — Frustum & Cylinder',
    'Statistics — Mean & Median of Grouped Data'
  ],
  science: [
    'Chemical Reactions — Types of Redox Reactions',
    'Acids, Bases & Salts — pH Scale and Neutralisation',
    'Metals & Non-Metals — Reactivity Series & Extraction',
    'Life Processes — Aerobic vs Anaerobic Respiration',
    'Control & Coordination — Reflex Arc Structure',
    'Light — Reflection & Concave Mirror Ray Diagrams',
    'Human Eye — Defects of Vision & Correction',
    'Electricity — Ohm\'s Law & Resistance in Parallel'
  ],
  english: [
    'First Flight — A Letter to God Analysis',
    'Poem — Dust of Snow & Fire and Ice (Frost)',
    'Nelson Mandela — Long Walk to Freedom Discussion',
    'Grammar — Reported Speech & Modal Auxiliaries',
    'Writing Skills — Analytical Paragraph based on Charts',
    'Footprints Without Feet — A Triumph of Surgery',
    'Formal Letter Writing — Editor Complaint Letters',
    'Poem — A Tiger in the Zoo Metaphorical Study'
  ],
  social_science: [
    'History — The Rise of Nationalism in Europe',
    'History — Nationalism in India & Rowlatt Satyagraha',
    'Geography — Resources & Soil Erosion Prevention',
    'Geography — Forest & Wildlife Conservation Acts',
    'Civics — Power Sharing in Belgium and Sri Lanka',
    'Civics — Federalism & Three-fold Distribution',
    'Economics — Development Indicators & Per Capita Income',
    'Economics — Sectors of the Indian Economy'
  ],
  hindi: [
    'क्षितिज — सूरदास के पद व्याख्या एवं भावार्थ',
    'क्षितिज — नेताजी का चश्मा (स्वयं प्रकाश)',
    'व्याकरण — रचना के आधार पर वाक्य भेद',
    'व्याकरण — वाच्य परिवर्तन (कर्तृवाच्य / कर्मवाच्य)',
    'कृतिका — माता का अंचल (शिवपूजन सहाय)',
    'रचनात्मक लेखन — औपचारिक पत्र लेखन',
    'क्षितिज — बालगोबिन भगत चरित्र चित्रण',
    'व्याकरण — पद परिचय अभ्यास प्रश्नोत्तरी'
  ]
};

// Generate authentic records spanning Aug, Sep, Oct 2026
function generateAttendanceRecords() {
  const records = [];
  let recordIdCounter = 1000;

  // Holidays
  const HOLIDAYS = {
    '2026-08-15': 'Independence Day Celebration',
    '2026-08-28': 'Raksha Bandhan Break',
    '2026-09-04': 'Janmashtami Holiday',
    '2026-10-02': 'Mahatma Gandhi Jayanti',
    '2026-10-14': 'Maha Navami / Dussehra',
    '2026-10-15': 'Vijayadashami (Dussehra Holiday)',
  };

  // Specific absence dates to give realistic percentages
  // Note: Social Science has more absences to trigger the < 75% warning (71%)!
  const ABSENCES = {
    mathematics: ['2026-08-11', '2026-08-24', '2026-09-08', '2026-09-22', '2026-10-07', '2026-10-20'],
    science: ['2026-08-07', '2026-08-18', '2026-09-02', '2026-09-15', '2026-09-29', '2026-10-12', '2026-10-19'],
    english: ['2026-08-14', '2026-09-11', '2026-10-06'],
    social_science: ['2026-08-05', '2026-08-12', '2026-08-19', '2026-08-26', '2026-09-09', '2026-09-16', '2026-09-23', '2026-09-30', '2026-10-07', '2026-10-13', '2026-10-20'],
    hindi: ['2026-08-21', '2026-09-07', '2026-09-28', '2026-10-09', '2026-10-21']
  };

  const LATE_DAYS = {
    mathematics: ['2026-08-19', '2026-10-09'],
    science: ['2026-09-18'],
    english: ['2026-08-27'],
    social_science: ['2026-09-04', '2026-10-16'],
    hindi: ['2026-09-14']
  };

  // Iterate dates from 2026-08-01 to 2026-10-27
  const start = new Date(2026, 7, 1); // 1 Aug
  const end = new Date(2026, 9, 27);   // 27 Oct

  let cur = new Date(start);
  while (cur <= end) {
    const y = cur.getFullYear();
    const m = cur.getMonth() + 1;
    const d = cur.getDate();
    const dKey = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dow = cur.getDay(); // 0 = Sun

    if (dow === 0) {
      // Sunday — no classes scheduled
      cur.setDate(cur.getDate() + 1);
      continue;
    }

    if (HOLIDAYS[dKey]) {
      records.push({
        id: `att_${++recordIdCounter}`,
        date: dKey,
        subjectId: 'all',
        subjectName: 'School Holiday',
        period: 'Full Day',
        teacher: 'School Administration',
        topic: HOLIDAYS[dKey],
        status: 'holiday',
        term: 'term1'
      });
      cur.setDate(cur.getDate() + 1);
      continue;
    }

    // Regular school day: 5 periods
    DAY_SCHEDULE.forEach((sched, idx) => {
      const subj = SUBJECTS.find(s => s.id === sched.subjectId);
      const isAbsent = ABSENCES[sched.subjectId]?.includes(dKey);
      const isLate = LATE_DAYS[sched.subjectId]?.includes(dKey);

      let status = 'present';
      if (isAbsent) status = 'absent';
      else if (isLate) status = 'late';

      const topicList = TOPICS[sched.subjectId];
      const topic = topicList[(d + idx) % topicList.length];

      records.push({
        id: `att_${++recordIdCounter}`,
        date: dKey,
        subjectId: sched.subjectId,
        subjectName: subj.name,
        period: sched.period,
        teacher: subj.teacher,
        topic: topic,
        status: status,
        term: 'term1'
      });
    });

    cur.setDate(cur.getDate() + 1);
  }

  return records;
}

// Master attendance records
let ALL_RECORDS = generateAttendanceRecords();

/* ══════════════════════════════════════════════
   DISPUTES & ERROR REPORTING PERSISTENCE
══════════════════════════════════════════════ */
function loadDisputes() {
  try {
    const saved = localStorage.getItem('dps_attendance_disputes');
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
}

function saveDisputes(disputes) {
  try {
    localStorage.setItem('dps_attendance_disputes', JSON.stringify(disputes));
  } catch (e) { }
}

/* ══════════════════════════════════════════════
   FILTER STATE
══════════════════════════════════════════════ */
let activeFilters = {
  subject: 'all',
  semester: 'term1',
  month: '2026-10',
  dateFrom: '2026-08-01',
  dateTo: '2026-10-31'
};

function getFilteredRecords() {
  return ALL_RECORDS.filter(rec => {
    if (rec.status === 'holiday') return true; // keep holidays for calendar

    // Filter by subject
    if (activeFilters.subject !== 'all' && rec.subjectId !== activeFilters.subject) {
      return false;
    }

    // Filter by semester/term
    if (activeFilters.semester !== 'all' && rec.term !== activeFilters.semester) {
      return false;
    }

    // Filter by month
    if (activeFilters.month !== 'all') {
      const recMonth = rec.date.substring(0, 7);
      if (recMonth !== activeFilters.month) return false;
    }

    // Filter by date range
    if (activeFilters.dateFrom && rec.date < activeFilters.dateFrom) return false;
    if (activeFilters.dateTo && rec.date > activeFilters.dateTo) return false;

    return true;
  });
}

/* ══════════════════════════════════════════════
   FILTER ACTIONS & RE-RENDER DISPATCHER
══════════════════════════════════════════════ */
window.onFilterChange = function () {
  activeFilters.subject = document.getElementById('filterSubject').value;
  activeFilters.semester = document.getElementById('filterSemester').value;
  activeFilters.month = document.getElementById('filterMonth').value;
  activeFilters.dateFrom = document.getElementById('filterDateFrom').value;
  activeFilters.dateTo = document.getElementById('filterDateTo').value;

  // Sync calendar month with filter if month is specified
  if (activeFilters.month !== 'all') {
    const [y, m] = activeFilters.month.split('-').map(Number);
    calYear = y;
    calMonth = m;
  }

  updateAllViews();
};

window.resetAttendanceFilters = function () {
  document.getElementById('filterSubject').value = 'all';
  document.getElementById('filterSemester').value = 'all';
  document.getElementById('filterMonth').value = 'all';
  document.getElementById('filterDateFrom').value = '2026-08-01';
  document.getElementById('filterDateTo').value = '2026-10-31';

  activeFilters = {
    subject: 'all',
    semester: 'all',
    month: 'all',
    dateFrom: '2026-08-01',
    dateTo: '2026-10-31'
  };

  showToast('info', 'Filters Cleared', 'Displaying full cumulative academic records.');
  updateAllViews();
};

window.filterBySubject = function (subjId) {
  document.getElementById('filterSubject').value = subjId;
  activeFilters.subject = subjId;
  updateAllViews();
  showToast('info', 'Subject Filter Applied', `Showing records for ${SUBJECTS.find(s => s.id === subjId)?.name || subjId}`);
};

window.updateMinRequirement = function (val) {
  MIN_ATTENDANCE = parseInt(val, 10) || 75;
  showToast('info', `Requirement Updated`, `Threshold set to ${MIN_ATTENDANCE}% compliance standard.`);
  updateAllViews();
};

/* ══════════════════════════════════════════════
   COMPUTE STATS ENGINE
══════════════════════════════════════════════ */
function computeDetailedStats(records = null) {
  const dataset = records || getFilteredRecords();
  const teachingSessions = dataset.filter(r => r.status !== 'holiday' && r.status !== 'no-class');

  const held = teachingSessions.length;
  const present = teachingSessions.filter(r => r.status === 'present').length;
  const late = teachingSessions.filter(r => r.status === 'late').length;
  const attended = present + late; // CBSE counts present + late as attended
  const missed = teachingSessions.filter(r => r.status === 'absent').length;

  const pct = held > 0 ? Math.round((attended / held) * 100) : 100;
  return { held, attended, present, late, missed, pct };
}

function computeSubjectStats(subjId) {
  const records = ALL_RECORDS.filter(r => r.subjectId === subjId && r.status !== 'holiday');
  const held = records.length;
  const present = records.filter(r => r.status === 'present').length;
  const late = records.filter(r => r.status === 'late').length;
  const attended = present + late;
  const missed = records.filter(r => r.status === 'absent').length;
  const pct = held > 0 ? Math.round((attended / held) * 100) : 100;
  return { held, attended, present, late, missed, pct };
}

/* ══════════════════════════════════════════════
   VIEW UPDATERS
══════════════════════════════════════════════ */
function updateAllViews() {
  renderAttendanceOverview();
  renderMetricCards();
  renderSubjectBreakdown();
  renderWarningBanner();
  renderTrendChart();
  renderCalendar(calYear, calMonth);
  renderRecordsTable();
  updateSidebarStats();
}

/* ── 1. Overall Ring & Hero Card ─────────────── */
function renderAttendanceOverview() {
  const stats = computeDetailedStats();
  const circumference = 2 * Math.PI * 50;

  const ringFill = document.getElementById('attRingFill');
  const ringPct = document.getElementById('attRingPct');
  const ringLbl = document.getElementById('attRingLabel');

  ringPct.textContent = `${stats.pct}%`;
  ringLbl.textContent = activeFilters.subject === 'all' ? 'OVERALL' : 'SUBJECT';

  // Ring color thresholding
  const color = stats.pct >= MIN_ATTENDANCE
    ? (stats.pct >= 85 ? '#10b981' : '#38bdf8')
    : '#f43f5e';

  ringFill.style.stroke = color;
  ringFill.style.filter = `drop-shadow(0 0 8px ${color}66)`;
  ringFill.style.strokeDasharray = `${(stats.pct / 100) * circumference} ${circumference}`;

  // Compliance Pill
  const compBadge = document.getElementById('complianceBadge');
  const benchTag = document.getElementById('benchmarkTag');
  benchTag.textContent = `Min Req: ${MIN_ATTENDANCE}%`;

  const headline = document.getElementById('heroHeadline');
  const caption = document.getElementById('heroCaption');

  if (stats.pct >= MIN_ATTENDANCE) {
    compBadge.textContent = 'CBSE Compliant';
    compBadge.className = 'compliance-badge';
    headline.textContent = stats.pct >= 85 ? 'Exemplary Attendance' : 'Regular Standing';
    caption.textContent = `Maintaining ${stats.pct}% attendance. Safe for CBSE Class 10 Board exam admit card issuance.`;
  } else {
    compBadge.textContent = 'Action Required';
    compBadge.className = 'compliance-badge alert-badge';
    compBadge.style.cssText = 'background:rgba(244,63,94,0.18);color:#fda4af;border:1px solid rgba(244,63,94,0.3);';
    headline.textContent = 'Below School Threshold';
    caption.textContent = `Currently ${stats.pct}%, which is below the school's mandatory ${MIN_ATTENDANCE}% attendance rule.`;
  }

  // Header meta status pill
  const statusEl = document.getElementById('attendanceStatus');
  if (stats.pct >= MIN_ATTENDANCE) {
    statusEl.textContent = `✅ Safe (${stats.pct}%)`;
    statusEl.style.cssText = 'background:rgba(16,185,129,0.12);color:#6ee7b7;border:1px solid rgba(16,185,129,0.25);border-radius:20px;padding:3px 10px;font-size:0.72rem;font-weight:600';
  } else {
    statusEl.textContent = `⚠️ Below Requirement (${stats.pct}%)`;
    statusEl.style.cssText = 'background:rgba(244,63,94,0.15);color:#fda4af;border:1px solid rgba(244,63,94,0.3);border-radius:20px;padding:3px 10px;font-size:0.72rem;font-weight:700';
  }

  // Subtitle
  const subEl = document.getElementById('attendanceFilterSubtitle');
  const subjName = activeFilters.subject === 'all'
    ? 'All Subjects'
    : SUBJECTS.find(s => s.id === activeFilters.subject)?.name;
  subEl.textContent = `Class 10-B · ${subjName} · Term 1 (2026–27)`;
}

/* ── 2. Metric Cards (Held, Attended, Missed, Trend) ── */
function renderMetricCards() {
  const stats = computeDetailedStats();

  document.getElementById('statClassesHeld').textContent = stats.held;
  document.getElementById('statClassesAttended').textContent = stats.attended;
  document.getElementById('statPresentBreakdown').textContent = `${stats.present} present · ${stats.late} late`;
  document.getElementById('statClassesMissed').textContent = stats.missed;

  const absenceRate = stats.held > 0 ? ((stats.missed / stats.held) * 100).toFixed(1) : '0.0';
  document.getElementById('statAbsenceRate').textContent = `${absenceRate}% absence rate`;

  // Trend logic: +3.4% in Oct vs Sep
  const trendEl = document.getElementById('statTrendValue');
  const pillEl = document.getElementById('statTrendPill');
  if (activeFilters.subject === 'social_science') {
    trendEl.textContent = '-2.1%';
    trendEl.className = 'metric-value bad';
    pillEl.textContent = '↓ Declining';
    pillEl.className = 'trend-pill negative';
  } else {
    trendEl.textContent = '+3.4%';
    trendEl.className = 'metric-value good';
    pillEl.textContent = '↑ Improving';
    pillEl.className = 'trend-pill positive';
  }
}

/* ── 3. Subject-Wise Progress Bars Breakdown ──── */
function renderSubjectBreakdown() {
  const container = document.getElementById('subjectBreakdownGrid');
  container.innerHTML = '';

  SUBJECTS.forEach((subj) => {
    const stats = computeSubjectStats(subj.id);
    const isBelow = stats.pct < MIN_ATTENDANCE;

    const card = document.createElement('div');
    card.className = `subject-prog-card ${isBelow ? 'below-min' : ''}`;
    card.onclick = () => filterBySubject(subj.id);
    card.title = `Click to filter and inspect ${subj.name} attendance`;

    const statusClass = stats.pct >= 85 ? 'good' : stats.pct >= MIN_ATTENDANCE ? 'good' : 'alert';

    card.innerHTML = `
      <div class="subject-card-top">
        <div class="subject-title-wrap">
          <div class="subject-icon">${subj.icon}</div>
          <div>
            <h4 class="subject-name-bold">${subj.name}</h4>
            <span class="subject-faculty">${subj.teacher} · ${subj.room}</span>
          </div>
        </div>
        <div class="subject-pct-pill ${statusClass}">${stats.pct}%</div>
      </div>

      <div class="progress-track-wrap">
        <div class="progress-track">
          <div class="threshold-mark-line" style="left:${MIN_ATTENDANCE}%" title="CBSE Mandatory (${MIN_ATTENDANCE}%)"></div>
          <div class="progress-fill ${statusClass}" style="width:${stats.pct}%"></div>
        </div>
      </div>

      <div class="subject-stats-row">
        <span><strong>${stats.attended}</strong> / ${stats.held} attended (${stats.missed} missed)</span>
        <span class="inspect-link">Inspect ➔</span>
      </div>`;

    container.appendChild(card);
  });
}

/* ── 4. Warning Banner with Recovery Calculator ── */
function renderWarningBanner() {
  const banner = document.getElementById('attWarningBanner');

  // Find subjects below MIN_ATTENDANCE
  const lowSubjects = SUBJECTS.map(s => ({
    ...s,
    stats: computeSubjectStats(s.id)
  })).filter(s => s.stats.pct < MIN_ATTENDANCE);

  const overallStats = computeDetailedStats();
  const overallBelow = overallStats.pct < MIN_ATTENDANCE;

  if (lowSubjects.length === 0 && !overallBelow) {
    banner.style.display = 'none';
    return;
  }

  banner.style.display = 'flex';
  const targetSubj = lowSubjects[0] || { name: 'Overall Attendance', stats: overallStats };

  // Calculate recovery consecutive classes needed:
  // (attended + X) / (held + X) >= MIN / 100
  // X >= (MIN * held - 100 * attended) / (100 - MIN)
  const requiredRatio = MIN_ATTENDANCE / 100;
  const numNeeded = Math.ceil(
    (requiredRatio * targetSubj.stats.held - targetSubj.stats.attended) / (1 - requiredRatio)
  );
  const consecutiveClasses = Math.max(1, numNeeded);

  document.getElementById('bannerTitle').textContent = `Attendance Alert: ${targetSubj.name} (${targetSubj.stats.pct}%) Below Required Threshold`;
  document.getElementById('bannerReqValue').textContent = `${MIN_ATTENDANCE}%`;
  document.getElementById('bannerReqValue2').textContent = `${MIN_ATTENDANCE}%`;
  document.getElementById('bannerMessage').innerHTML = `Your attendance in <strong>${targetSubj.name} (${targetSubj.stats.pct}%)</strong> is below the mandatory <strong>${MIN_ATTENDANCE}%</strong> school criteria.`;
  document.getElementById('recoveryConsecutive').textContent = `Attend next ${consecutiveClasses} consecutive classes`;
}

/* ── 5. Trend Chart (HTML5 Canvas) ─────────────── */
function renderTrendChart() {
  const canvas = document.getElementById('attendanceTrendCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Handle high-DPI
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width || 480;
  const height = 220;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, width, height);

  // Time periods
  const labels = ['Aug W1', 'Aug W3', 'Sep W1', 'Sep W3', 'Oct W1', 'Oct W3', 'Oct W4'];

  // Data points based on active filter
  let dataPoints = [78, 81, 84, 88, 82, 85, 87];
  if (activeFilters.subject === 'social_science') {
    dataPoints = [76, 75, 73, 72, 70, 71, 71];
  } else if (activeFilters.subject === 'english') {
    dataPoints = [89, 90, 92, 91, 93, 91, 92];
  } else if (activeFilters.subject === 'science') {
    dataPoints = [80, 81, 83, 85, 80, 81, 82];
  }

  const padLeft = 40;
  const padRight = 20;
  const padTop = 30;
  const padBottom = 35;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const yMin = 50;
  const yMax = 100;

  function getY(val) {
    return padTop + chartH - ((val - yMin) / (yMax - yMin)) * chartH;
  }
  function getX(idx) {
    return padLeft + (idx / (labels.length - 1)) * chartW;
  }

  // Draw Grid Lines (60%, 70%, 80%, 90%, 100%)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#64748b';
  ctx.font = '10px Inter, sans-serif';
  ctx.textAlign = 'right';

  [60, 70, 80, 90, 100].forEach(level => {
    const y = getY(level);
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(width - padRight, y);
    ctx.stroke();
    ctx.fillText(`${level}%`, padLeft - 8, y + 3);
  });

  // Draw 75% Target Threshold Line (dashed amber)
  const yTarget = getY(MIN_ATTENDANCE);
  ctx.save();
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padLeft, yTarget);
  ctx.lineTo(width - padRight, yTarget);
  ctx.stroke();

  // Label for target
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 9px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`CBSE Min (${MIN_ATTENDANCE}%)`, padLeft + 6, yTarget - 6);
  ctx.restore();

  // X-axis labels
  ctx.textAlign = 'center';
  ctx.fillStyle = '#94a3b8';
  labels.forEach((lbl, idx) => {
    const x = getX(idx);
    ctx.fillText(lbl, x, height - 12);
  });

  // Draw Gradient Fill under line
  const grad = ctx.createLinearGradient(0, padTop, 0, padTop + chartH);
  grad.addColorStop(0, 'rgba(99, 102, 241, 0.35)');
  grad.addColorStop(1, 'rgba(99, 102, 241, 0.00)');

  ctx.beginPath();
  ctx.moveTo(getX(0), getY(dataPoints[0]));
  for (let i = 1; i < dataPoints.length; i++) {
    const xc = (getX(i) + getX(i - 1)) / 2;
    const yc = (getY(dataPoints[i]) + getY(dataPoints[i - 1])) / 2;
    ctx.quadraticCurveTo(getX(i - 1), getY(dataPoints[i - 1]), xc, yc);
  }
  ctx.lineTo(getX(dataPoints.length - 1), getY(dataPoints[dataPoints.length - 1]));
  ctx.lineTo(getX(dataPoints.length - 1), padTop + chartH);
  ctx.lineTo(getX(0), padTop + chartH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Draw Main Line
  ctx.beginPath();
  ctx.moveTo(getX(0), getY(dataPoints[0]));
  for (let i = 1; i < dataPoints.length; i++) {
    const xc = (getX(i) + getX(i - 1)) / 2;
    const yc = (getY(dataPoints[i]) + getY(dataPoints[i - 1])) / 2;
    ctx.quadraticCurveTo(getX(i - 1), getY(dataPoints[i - 1]), xc, yc);
  }
  ctx.lineTo(getX(dataPoints.length - 1), getY(dataPoints[dataPoints.length - 1]));
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw Points & Tooltips
  dataPoints.forEach((val, idx) => {
    const x = getX(idx);
    const y = getY(val);

    // Outer glow
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = val >= MIN_ATTENDANCE ? '#10b981' : '#f43f5e';
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Value tag above point
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 9px JetBrains Mono, monospace';
    ctx.fillText(`${val}%`, x, y - 8);
  });
}

/* ── 6. Monthly Calendar (Interactive Day Marks) ── */
let calYear = 2026;
let calMonth = 10; // October

function renderCalendar(year, month) {
  const grid = document.querySelector('.calendar-grid');
  if (!grid) return;
  grid.querySelectorAll('.cal-day').forEach(el => el.remove());

  const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  document.getElementById('calMonthLabel').textContent = `${monthNames[month]} ${year}`;

  const subjIndicator = document.getElementById('calSubjectIndicator');
  subjIndicator.textContent = activeFilters.subject === 'all'
    ? 'All Subjects'
    : SUBJECTS.find(s => s.id === activeFilters.subject)?.name || 'Filtered';

  const firstDow = new Date(year, month - 1, 1).getDay(); // 0=Sun
  const startOffset = (firstDow + 6) % 7; // Mon=0
  const daysInMonth = new Date(year, month, 0).getDate();
  const todayKey = `${TODAY.getFullYear()}-${String(TODAY.getMonth() + 1).padStart(2, '0')}-${String(TODAY.getDate()).padStart(2, '0')}`;

  // Empty cells
  for (let i = 0; i < startOffset; i++) {
    const el = document.createElement('div');
    el.className = 'cal-day empty';
    grid.appendChild(el);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dKey = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dt = new Date(year, month - 1, d);
    const dow = dt.getDay();
    const isFuture = dKey > todayKey;

    // Filter day's sessions
    let dayRecords = ALL_RECORDS.filter(r => r.date === dKey);
    if (activeFilters.subject !== 'all') {
      dayRecords = dayRecords.filter(r => r.subjectId === activeFilters.subject || r.status === 'holiday');
    }

    const el = document.createElement('div');
    el.textContent = d;

    // Determine status
    let statusClass = '';
    let tooltip = '';

    if (isFuture) {
      statusClass = 'future-day';
      tooltip = 'Upcoming School Day';
    } else if (dow === 0) {
      statusClass = 'no-class-day';
      tooltip = 'Sunday · School Closed';
    } else if (dayRecords.some(r => r.status === 'holiday')) {
      statusClass = 'holiday-day';
      tooltip = `🎉 ${dayRecords.find(r => r.status === 'holiday')?.topic || 'Holiday'}`;
    } else if (dayRecords.length > 0) {
      const hasAbsent = dayRecords.some(r => r.status === 'absent');
      const hasLate = dayRecords.some(r => r.status === 'late');
      const allPresent = dayRecords.every(r => r.status === 'present');

      if (hasAbsent) {
        statusClass = 'absent-day';
        tooltip = `❌ Absent in ${dayRecords.filter(r => r.status === 'absent').map(r => r.subjectName).join(', ')}`;
      } else if (hasLate) {
        statusClass = 'late-day';
        tooltip = '⚠️ Late arrival marked';
      } else if (allPresent) {
        statusClass = 'present-day';
        tooltip = '✅ 100% Attended';
      }
    } else {
      statusClass = 'no-class-day';
      tooltip = 'No scheduled classes';
    }

    el.className = `cal-day ${statusClass}`;
    if (dKey === todayKey) el.classList.add('today');
    if (tooltip) el.dataset.tip = tooltip;

    // Click handler to inspect day details
    if (!isFuture && dow !== 0) {
      el.style.cursor = 'pointer';
      el.onclick = () => openDayModal(dKey);
    }

    grid.appendChild(el);
  }

  // Prev / Next button state
  document.getElementById('calPrev').disabled = (year === 2026 && month === 8);
  document.getElementById('calNext').disabled = (year === 2026 && month === 11);
}

window.changeMonth = function (dir) {
  calMonth += dir;
  if (calMonth < 1) { calMonth = 12; calYear--; }
  if (calMonth > 12) { calMonth = 1; calYear++; }
  renderCalendar(calYear, calMonth);
};

/* ── 7. Detailed Records Table & Error Reporting ── */
function renderRecordsTable() {
  const tbody = document.getElementById('recordsTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const search = (document.getElementById('recordsSearchInput')?.value || '').toLowerCase().trim();
  const statusFilter = document.getElementById('recordsStatusFilter')?.value || 'all';

  const disputes = loadDisputes();
  let records = getFilteredRecords().filter(r => r.status !== 'holiday' && r.status !== 'no-class');

  // Filter by search query
  if (search) {
    records = records.filter(r =>
      r.subjectName.toLowerCase().includes(search) ||
      r.topic.toLowerCase().includes(search) ||
      r.teacher.toLowerCase().includes(search) ||
      r.date.includes(search)
    );
  }

  // Filter by status dropdown
  if (statusFilter === 'absent') {
    records = records.filter(r => r.status === 'absent');
  } else if (statusFilter === 'late') {
    records = records.filter(r => r.status === 'late');
  } else if (statusFilter === 'present') {
    records = records.filter(r => r.status === 'present');
  } else if (statusFilter === 'disputed') {
    records = records.filter(r => disputes[r.id]);
  }

  // Sort descending by date
  records.sort((a, b) => b.date.localeCompare(a.date));

  // Limit display to latest 20 rows for smooth UI performance
  const displayRows = records.slice(0, 20);

  displayRows.forEach(rec => {
    const tr = document.createElement('tr');
    const isDisputed = disputes[rec.id];

    const statusBadgeClass = rec.status === 'present' ? 'present'
      : rec.status === 'absent' ? 'absent'
        : rec.status === 'late' ? 'late' : 'holiday';

    const statusLabel = rec.status === 'present' ? 'Present'
      : rec.status === 'absent' ? 'Absent'
        : rec.status === 'late' ? 'Late Arrival' : 'Holiday';

    tr.innerHTML = `
      <td>
        <div class="records-date-cell">
          <span class="record-date-str">${rec.date}</span>
          <span class="record-period">${rec.period}</span>
        </div>
      </td>
      <td>
        <span class="record-subject-badge">${rec.subjectName}</span>
      </td>
      <td>
        <span class="record-topic" title="${rec.topic}">${rec.topic}</span>
      </td>
      <td>
        <span class="status-chip ${statusBadgeClass}">${statusLabel}</span>
      </td>
      <td>
        <span class="record-teacher">${rec.teacher}</span>
      </td>
      <td style="text-align: right;">
        <div class="dispute-action-wrap">
          ${isDisputed ? `
            <span class="dispute-status-pill" title="Dispute under teacher review: ${isDisputed.reason}">
              ⏳ Under Review
            </span>
          ` : `
            <button class="report-btn" onclick="openReportModal('${rec.id}')" title="Report discrepancy to ${rec.teacher}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              Report Error
            </button>
          `}
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  const totalDisputes = Object.keys(disputes).length;
  document.getElementById('recordsCountText').textContent = `Showing ${displayRows.length} of ${records.length} sessions`;
  document.getElementById('disputeCounterBadge').textContent = `${totalDisputes} Dispute${totalDisputes === 1 ? '' : 's'} Under Review`;
}

/* ── 8. Report Error Modal & Dispute Workflow ──── */
window.openReportModal = function (recordId) {
  const rec = ALL_RECORDS.find(r => r.id === recordId);
  if (!rec) return;

  document.getElementById('disputeRecordId').value = recordId;
  const summaryBox = document.getElementById('modalRecordSummary');
  summaryBox.innerHTML = `
    <div class="summary-left">
      <span class="summary-sub-name">${rec.subjectName} — ${rec.period}</span>
      <span class="summary-meta">${rec.date} · Topic: ${rec.topic} · Marked: <strong style="color:${rec.status === 'absent' ? '#fda4af' : '#fcd34d'}">${rec.status.toUpperCase()}</strong></span>
    </div>
    <span class="record-teacher">Faculty: ${rec.teacher}</span>
  `;

  document.getElementById('disputeReason').value = '';
  document.getElementById('disputeRemarks').value = '';
  document.getElementById('uploadLabel').textContent = 'Attach medical slip or parent note (.pdf, .jpg)';
  document.getElementById('reportErrorModal').style.display = 'flex';
};

window.closeReportModal = function () {
  document.getElementById('reportErrorModal').style.display = 'none';
};

window.simulateFileUpload = function () {
  document.getElementById('uploadLabel').innerHTML = '✅ <strong>Medical_Certificate_Oct2026.pdf</strong> (Attached)';
  showToast('info', 'File Attached', 'Leave slip successfully uploaded.');
};

window.submitDispute = function (event) {
  event.preventDefault();
  const recordId = document.getElementById('disputeRecordId').value;
  const reason = document.getElementById('disputeReason').value;
  const remarks = document.getElementById('disputeRemarks').value;

  const rec = ALL_RECORDS.find(r => r.id === recordId);
  if (!rec) return;

  const btn = document.getElementById('btnSubmitDispute');
  btn.disabled = true;
  btn.textContent = 'Transmitting to Teacher…';

  setTimeout(() => {
    const disputes = loadDisputes();
    disputes[recordId] = {
      recordId,
      date: rec.date,
      subjectName: rec.subjectName,
      teacher: rec.teacher,
      reason: reason,
      remarks: remarks,
      timestamp: new Date().toISOString()
    };
    saveDisputes(disputes);

    btn.disabled = false;
    btn.textContent = 'Submit to Teacher';
    closeReportModal();

    renderRecordsTable();
    showToast('success', 'Dispute Submitted for Review', `Sent to ${rec.teacher} (${rec.subjectName}). Reference #${recordId}.`);
  }, 500);
};

/* ── 9. Day Detail Modal (Calendar Click) ──────── */
window.openDayModal = function (dateStr) {
  const records = ALL_RECORDS.filter(r => r.date === dateStr);
  const modal = document.getElementById('dayDetailModal');
  const title = document.getElementById('dayModalDateTitle');
  const body = document.getElementById('dayModalBody');

  const dt = new Date(dateStr);
  title.textContent = dt.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  body.innerHTML = '';

  if (records.length === 0) {
    body.innerHTML = '<p style="font-size:0.75rem;color:#94a3b8;padding:10px 0;">No scheduled classes for this date.</p>';
  } else {
    records.forEach(rec => {
      const row = document.createElement('div');
      row.className = 'day-period-row';
      row.innerHTML = `
        <div class="day-period-info">
          <span class="day-period-sub">${rec.subjectName} — ${rec.period}</span>
          <span class="day-period-time">Teacher: ${rec.teacher} · ${rec.topic}</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="status-chip ${rec.status}">${rec.status.toUpperCase()}</span>
          ${rec.status === 'absent' || rec.status === 'late' ? `
            <button class="report-btn" onclick="closeDayModal();openReportModal('${rec.id}')">Report</button>
          ` : ''}
        </div>
      `;
      body.appendChild(row);
    });
  }

  modal.style.display = 'flex';
};

window.closeDayModal = function () {
  document.getElementById('dayDetailModal').style.display = 'none';
};

/* ── 10. Sidebar & Profile Quick Stats Sync ───── */
function updateSidebarStats() {
  const stats = computeDetailedStats();
  const list = loadAssignments();

  document.getElementById('qs-present').textContent = stats.attended;
  document.getElementById('qs-absent').textContent = stats.missed;
  document.getElementById('qs-pending').textContent = list.filter(a => a.status === 'pending').length;
  document.getElementById('qs-submitted').textContent = list.filter(a => a.status === 'submitted').length;
}

/* ══════════════════════════════════════════════
   SCHOOL CALENDAR & DAILY SCHEDULE MODULE
══════════════════════════════════════════════ */

// Schedule State
let scheduleState = {
  view: 'day', // 'day' | 'week' | 'month'
  selectedDate: new Date(2026, 9, 27), // 27 Oct 2026
  categoryFilter: 'all',
  searchQuery: ''
};

// Master Curriculum Schedule Data
const BASE_TIMETABLE_PERIODS = [
  {
    periodNum: 1,
    time: '08:30 – 09:15 AM',
    startTime: '08:30',
    endTime: '09:15',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    icon: '📐',
    teacher: 'Mr. S. K. Sharma',
    location: 'Room 204 (Wing A)',
    topic: 'Quadratic Equations — Ex 4.4 Nature of Roots & Word Problems',
    desc: 'NCERT Chapter 4 detailed discussion. Solving questions on discriminant (D = b² - 4ac) and finding real/imaginary roots. Students must carry homework notebook.',
    resources: [
      { name: 'NCERT_Chapter4_Ex4.4_Solutions.pdf', size: '1.2 MB' },
      { name: 'Quadratic_Formula_Formula_Sheet.pdf', size: '420 KB' }
    ]
  },
  {
    periodNum: 2,
    time: '09:15 – 10:00 AM',
    startTime: '09:15',
    endTime: '10:00',
    subjectId: 'science',
    subjectName: 'Science (Physics / Chem)',
    icon: '🔬',
    teacher: 'Dr. Ananya Sen',
    location: 'Physics Lab 1',
    topic: 'Light — Reflection & Refraction: Ray Diagrams for Concave Mirrors',
    desc: 'Hands-on practical demonstration of image formation by spherical mirrors. Calculating focal length using optical bench and measuring object/image distances.',
    resources: [
      { name: 'Ray_Diagrams_Handbook_Class10.pdf', size: '2.5 MB' },
      { name: 'Physics_Lab_Safety_Protocol.pdf', size: '380 KB' }
    ]
  },
  {
    periodNum: 3,
    time: '10:15 – 11:00 AM',
    startTime: '10:15',
    endTime: '11:00',
    subjectId: 'english',
    subjectName: 'English Lang & Lit',
    icon: '📖',
    teacher: 'Mrs. Rita Rao',
    location: 'Room 102 (First Floor)',
    topic: 'First Flight — Nelson Mandela: Long Walk to Freedom & Poetic Devices',
    desc: 'Textual analysis of Chapter 2. In-depth group discussion on courage, freedom, apartheid, and character sketch of Nelson Mandela. Homework review of analytical paragraphs.',
    resources: [
      { name: 'Nelson_Mandela_Study_Notes.pdf', size: '890 KB' }
    ]
  },
  {
    periodNum: 4,
    time: '11:00 – 11:45 AM',
    startTime: '11:00',
    endTime: '11:45',
    subjectId: 'social_science',
    subjectName: 'Social Science',
    icon: '🌍',
    teacher: 'Mr. Vikram Roy',
    location: 'Room 208 (Wing B)',
    topic: 'History — Nationalism in India & Rowlatt Satyagraha',
    desc: 'Discussion on the impact of World War I on India, Rowlatt Act of 1919, Jallianwala Bagh tragedy, and Khilafat Non-Cooperation movement timeline.',
    resources: [
      { name: 'Nationalism_in_India_Timeline_Map.pdf', size: '3.1 MB' },
      { name: 'CBSE_Important_Questions_History_Ch2.pdf', size: '750 KB' }
    ]
  },
  {
    periodNum: 5,
    time: '12:30 – 01:15 PM',
    startTime: '12:30',
    endTime: '01:15',
    subjectId: 'hindi',
    subjectName: 'Hindi Course A',
    icon: '✍️',
    teacher: 'Ms. Sunita Verma',
    location: 'Room 106 (Wing A)',
    topic: 'क्षितिज — नेताजी का चश्मा (स्वयं प्रकाश) व्याख्या एवं प्रश्नोत्तर',
    desc: 'कैप्टन चश्मेवाले का देशप्रेम और हालदार साहब का दृष्टिकोण। पाठ के महत्वपूर्ण गद्यांशों की व्याख्या और बोर्ड परीक्षा उपयोगी प्रश्नों का अभ्यास।',
    resources: [
      { name: 'Netaji_Ka_Chashma_Summary_Notes.pdf', size: '640 KB' }
    ]
  },
  {
    periodNum: 6,
    time: '01:15 – 02:00 PM',
    startTime: '01:15',
    endTime: '02:00',
    subjectId: 'cs_ai',
    subjectName: 'Computer Applications & AI',
    icon: '💻',
    teacher: 'Mr. T. N. Prasad',
    location: 'Computer Lab 2',
    topic: 'HTML & CSS Basics / AI Project Cycle',
    desc: 'Hands-on web design lab session and demonstration of AI problem scoping using real-world sustainability datasets.',
    resources: [
      { name: 'HTML_CSS_CheatSheet_CBSE.pdf', size: '1.1 MB' }
    ]
  }
];

// Major Calendar Events (Deadlines, Exams, Events, Holidays)
const MASTER_EVENTS = [
  // Assignment Deadlines
  {
    id: 'ev_asgn_1',
    title: 'Assignment Due: NCERT Ex 4.3 (Quadratic Equations)',
    category: 'assignments',
    date: '2026-10-28',
    startTime: '23:59',
    endTime: '23:59',
    time: 'Due 11:59 PM',
    location: 'Google Classroom / Maths Dept',
    teacher: 'Mr. S. K. Sharma',
    subjectId: 'mathematics',
    topic: 'Exercise 4.3 Q1–Q11 complete solutions with steps',
    desc: 'Mandatory CBSE Class 10 internal assessment homework. Solve all 11 problems with step-by-step discriminant working.',
    isUrgent: true,
    resources: [{ name: 'NCERT_Ex4.3_Problem_Set.pdf', size: '450 KB' }]
  },
  {
    id: 'ev_asgn_2',
    title: 'Assignment Due: Arithmetic Progressions Ex 5.2 & 5.3',
    category: 'assignments',
    date: '2026-10-31',
    startTime: '17:00',
    endTime: '17:00',
    time: 'Due 05:00 PM',
    location: 'Maths Dept Desk',
    teacher: 'Mr. S. K. Sharma',
    subjectId: 'mathematics',
    topic: 'NCERT Ch 5 Word Problems & Sum of n terms',
    desc: 'Submission of Exercise 5.2 and 5.3 homework in hard copy notebooks.',
    isUrgent: false,
    resources: [{ name: 'AP_Practice_Questions.pdf', size: '620 KB' }]
  },
  {
    id: 'ev_asgn_3',
    title: 'Assignment Due: Linear Equations Graph Submissions',
    category: 'assignments',
    date: '2026-11-02',
    startTime: '14:00',
    endTime: '14:00',
    time: 'Due 02:00 PM',
    location: 'Mathematics Lab',
    teacher: 'Mr. S. K. Sharma',
    subjectId: 'mathematics',
    topic: 'Graphical solution sheets for pair of linear equations',
    desc: 'Submit graph sheets plotting intersecting, coincident, and parallel lines.',
    resources: [{ name: 'Graph_Worksheet_Guidelines.pdf', size: '380 KB' }]
  },

  // Examinations
  {
    id: 'ev_exam_1',
    title: 'CBSE Pre-Board 1 — Mathematics Theory',
    category: 'exams',
    date: '2026-11-05',
    startTime: '09:00',
    endTime: '12:00',
    time: '09:00 AM – 12:00 PM',
    location: 'Main Examination Hall (Auditorium)',
    teacher: 'DPS Central Examination Cell',
    subjectId: 'mathematics',
    topic: 'Full Term 1 CBSE Syllabus (80 Marks)',
    desc: 'CBSE Pre-Board Examination covering Chapters 1 to 7. Strict board examination conditions. Carry admit card and blue ballpoint pens.',
    isUrgent: true,
    resources: [
      { name: 'CBSE_Class10_Maths_Sample_Paper_2026.pdf', size: '3.4 MB' },
      { name: 'PreBoard_Seating_Arrangement.pdf', size: '890 KB' }
    ]
  },
  {
    id: 'ev_exam_2',
    title: 'CBSE Pre-Board 1 — Science Theory',
    category: 'exams',
    date: '2026-11-09',
    startTime: '09:00',
    endTime: '12:00',
    time: '09:00 AM – 12:00 PM',
    location: 'Wing B Examination Center',
    teacher: 'Dr. Ananya Sen / Exam Cell',
    subjectId: 'science',
    topic: 'Physics, Chemistry & Biology (80 Marks)',
    desc: 'Pre-board examination for Science. Light, Chemical Reactions, Metals, Life Processes and Electricity.',
    resources: [{ name: 'Science_PreBoard_Blueprint_2026.pdf', size: '2.1 MB' }]
  },

  // Extracurricular & School Events
  {
    id: 'ev_event_1',
    title: 'Inter-House Debate Championship Auditions',
    category: 'events',
    date: '2026-10-27',
    startTime: '14:30',
    endTime: '16:00',
    time: '02:30 – 04:00 PM',
    location: 'School Main Auditorium',
    teacher: 'Mrs. Rita Rao & Cultural Council',
    subjectId: 'english',
    topic: 'Topic: "Artificial Intelligence in High School Education"',
    desc: 'Annual debate auditions for Ganga, Yamuna, Chenab, and Jhelum houses. Participants speak for 3 minutes for or against the motion.',
    isUrgent: false,
    resources: [{ name: 'Debate_Competition_Rules_and_Rubric.pdf', size: '420 KB' }]
  },
  {
    id: 'ev_event_2',
    title: 'DPS Science & Robotics Club Workshop',
    category: 'events',
    date: '2026-10-30',
    startTime: '15:00',
    endTime: '16:30',
    time: '03:00 – 04:30 PM',
    location: 'Atal Tinkering Lab (ATL)',
    teacher: 'Mr. T. N. Prasad',
    subjectId: 'science',
    topic: 'Sensors, Arduino & Line Follower Bot Assembly',
    desc: 'Hands-on technical workshop for club members in preparation for the National Science Olympiad.',
    resources: [{ name: 'Robotics_Workshop_Kit_Manual.pdf', size: '1.8 MB' }]
  },
  {
    id: 'ev_event_3',
    title: 'Parent-Teacher Meeting (PTM) — Term 1 Review',
    category: 'events',
    date: '2026-11-03',
    startTime: '09:00',
    endTime: '13:00',
    time: '09:00 AM – 01:00 PM',
    location: 'Classroom 10-B',
    teacher: 'Mr. S. K. Sharma (Class Teacher)',
    subjectId: 'all',
    topic: 'Academic Performance, Attendance Review & CBSE Roll Registration',
    desc: 'Parents are requested to meet subject teachers to review Term 1 marks, attendance percentage, and CBSE board examination registration verification.',
    resources: [{ name: 'PTM_Time_Slot_Allocation_10B.pdf', size: '540 KB' }]
  },
  {
    id: 'ev_event_4',
    title: 'Children\'s Day Annual Sports Carnival 2026',
    category: 'events',
    date: '2026-11-14',
    startTime: '08:30',
    endTime: '13:30',
    time: '08:30 AM – 01:30 PM',
    location: 'DPS Main Sports Ground',
    teacher: 'Sports & PE Department',
    subjectId: 'all',
    topic: 'Athletics, Relay Race, Football & Tug of War',
    desc: 'Celebration of Children\'s Day with inter-house track and field competitions.',
    resources: [{ name: 'Sports_Day_Event_List_2026.pdf', size: '780 KB' }]
  }
];

/* ── Personal Events & Faculty Broadcasts (LocalStorage) ── */
function loadPersonalEvents() {
  try {
    const saved = localStorage.getItem('dps_personal_events');
    if (saved) return JSON.parse(saved);
  } catch (e) { }

  // Default personal study session:
  // Scheduled on 2026-10-27 at 11:15 to 12:00.
  // NOTE: This overlaps with Period 4 (Social Science 11:00 - 11:45) to demonstrate CONFLICT DETECTION!
  return [
    {
      id: 'pers_sample_1',
      title: 'Peer Study: Quadratic Equations Word Problems',
      category: 'personal',
      date: '2026-10-27',
      startTime: '11:15',
      endTime: '12:00',
      time: '11:15 AM – 12:00 PM',
      subjectId: 'mathematics',
      location: 'Central Library Study Room 3',
      desc: 'Solve 10 quadratic formula problems with classmates.',
      resources: [{ name: 'Quadratic_Formula_Practice_Questions.pdf', size: '510 KB' }]
    }
  ];
}

function savePersonalEvents(list) {
  try {
    localStorage.setItem('dps_personal_events', JSON.stringify(list));
  } catch (e) { }
}

function loadOfficialBroadcasts() {
  try {
    const saved = localStorage.getItem('dps_official_broadcasts');
    if (saved) return JSON.parse(saved);
  } catch (e) { }

  return [
    {
      id: 'broad_sample_1',
      title: 'Optics Practical Lab Relocation to Physics Lab 2',
      category: 'classes',
      date: '2026-10-28',
      startTime: '09:15',
      endTime: '10:00',
      time: '09:15 – 10:00 AM',
      teacher: 'Dr. Ananya Sen (Science Dept)',
      location: 'Physics Lab 2 (Wing B)',
      subjectId: 'science',
      topic: 'Ray Optics Practical Setup',
      desc: 'Optics apparatus and optical benches have been relocated to Physics Lab 2 for Wednesday\'s period. All Class 10-B students report there directly.',
      isOfficial: true,
      resources: [{ name: 'Physics_Lab2_Layout.pdf', size: '720 KB' }]
    }
  ];
}

function saveOfficialBroadcasts(list) {
  try {
    localStorage.setItem('dps_official_broadcasts', JSON.stringify(list));
  } catch (e) { }
}

/* ── Master Event Aggregator ─────────────────── */
function getCombinedEventsForDate(dateStr) {
  const dt = new Date(dateStr);
  const dow = dt.getDay(); // 0 = Sunday
  const events = [];

  // 1. Regular Timetable Classes (Monday - Saturday, except Sunday)
  if (dow !== 0) {
    BASE_TIMETABLE_PERIODS.forEach(period => {
      events.push({
        id: `class_${dateStr}_${period.periodNum}`,
        title: `${period.periodNum}. ${period.subjectName}`,
        category: 'classes',
        date: dateStr,
        startTime: period.startTime,
        endTime: period.endTime,
        time: period.time,
        subjectId: period.subjectId,
        subjectName: period.subjectName,
        icon: period.icon,
        teacher: period.teacher,
        location: period.location,
        topic: period.topic,
        desc: period.desc,
        resources: period.resources || []
      });
    });
  }

  // 2. Deadlines, Exams, Events
  MASTER_EVENTS.filter(e => e.date === dateStr).forEach(e => events.push(e));

  // 3. Official Faculty Broadcasts
  loadOfficialBroadcasts().filter(b => b.date === dateStr).forEach(b => events.push(b));

  // 4. Personal Study Sessions
  loadPersonalEvents().filter(p => p.date === dateStr).forEach(p => events.push(p));

  return events;
}

/* ══════════════════════════════════════════════
   CONFLICT DETECTION ENGINE
══════════════════════════════════════════════ */
function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function timeRangesOverlap(s1, e1, s2, e2) {
  const startA = timeToMinutes(s1);
  const endA = timeToMinutes(e1);
  const startB = timeToMinutes(s2);
  const endB = timeToMinutes(e2);
  return Math.max(startA, startB) < Math.min(endA, endB);
}

function detectScheduleConflicts(dateStr) {
  const events = getCombinedEventsForDate(dateStr).filter(e => e.startTime && e.endTime && e.startTime !== e.endTime);
  const conflicts = [];

  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      const evA = events[i];
      const evB = events[j];

      if (timeRangesOverlap(evA.startTime, evA.endTime, evB.startTime, evB.endTime)) {
        conflicts.push({ evA, evB });
      }
    }
  }

  return conflicts;
}

/* ══════════════════════════════════════════════
   SCHEDULE CONTROLS & NAVIGATION
══════════════════════════════════════════════ */
window.setScheduleView = function (viewMode) {
  scheduleState.view = viewMode;
  ['Day', 'Week', 'Month'].forEach(v => {
    document.getElementById(`viewBtn${v}`)?.classList.toggle('active', v.toLowerCase() === viewMode);
  });

  document.getElementById('schedDayView').style.display = viewMode === 'day' ? 'block' : 'none';
  document.getElementById('schedWeekView').style.display = viewMode === 'week' ? 'block' : 'none';
  document.getElementById('schedMonthView').style.display = viewMode === 'month' ? 'block' : 'none';

  renderScheduleView();
};

window.setCategoryFilter = function (category) {
  scheduleState.categoryFilter = category;
  document.querySelectorAll('#schedFilterPills .filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === category);
  });
  renderScheduleView();
};

window.navigateSchedule = function (direction) {
  const dt = new Date(scheduleState.selectedDate);
  if (scheduleState.view === 'day') {
    dt.setDate(dt.getDate() + direction);
  } else if (scheduleState.view === 'week') {
    dt.setDate(dt.getDate() + (direction * 7));
  } else if (scheduleState.view === 'month') {
    dt.setMonth(dt.getMonth() + direction);
  }
  scheduleState.selectedDate = dt;
  renderScheduleView();
};

window.jumpScheduleToToday = function () {
  scheduleState.selectedDate = new Date(TODAY);
  renderScheduleView();
};

/* ══════════════════════════════════════════════
   VIEW RENDERING DISPATCHER
══════════════════════════════════════════════ */
function renderScheduleView() {
  scheduleState.searchQuery = (document.getElementById('schedSearchInput')?.value || '').toLowerCase().trim();
  const selDate = scheduleState.selectedDate;
  const y = selDate.getFullYear();
  const m = selDate.getMonth() + 1;
  const d = selDate.getDate();
  const dateKey = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  // Update Range Label
  const rangeLabel = document.getElementById('schedCurrentRangeLabel');
  if (scheduleState.view === 'day') {
    rangeLabel.textContent = selDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  } else if (scheduleState.view === 'week') {
    const monday = getMonday(selDate);
    const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6);
    rangeLabel.textContent = `${monday.getDate()} ${monday.toLocaleString('en-IN', { month: 'short' })} – ${sunday.getDate()} ${sunday.toLocaleString('en-IN', { month: 'short', year: 'numeric' })}`;
  } else {
    rangeLabel.textContent = selDate.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
  }

  // Conflict banner
  const conflicts = detectScheduleConflicts(dateKey);
  const conflictBanner = document.getElementById('scheduleConflictBanner');
  if (conflicts.length > 0 && scheduleState.view === 'day') {
    conflictBanner.style.display = 'flex';
    const first = conflicts[0];
    document.getElementById('conflictBannerText').textContent =
      `"${first.evA.title}" (${first.evA.time || first.evA.startTime}) overlaps with "${first.evB.title}" (${first.evB.time || first.evB.startTime}).`;
  } else {
    conflictBanner.style.display = 'none';
  }

  if (scheduleState.view === 'day') {
    renderDayTimeline(dateKey, conflicts);
  } else if (scheduleState.view === 'week') {
    renderWeekGrid(selDate);
  } else if (scheduleState.view === 'month') {
    renderMonthSchedule(y, m);
  }

  renderTodayLiveStrip();
  syncNotifications();
}

function getMonday(d) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

/* ── 1. Day View Timeline ────────────────────── */
function renderDayTimeline(dateStr, conflicts = []) {
  const container = document.getElementById('dayTimelineContainer');
  if (!container) return;
  container.innerHTML = '';

  let events = getCombinedEventsForDate(dateStr);

  // Filter by category
  if (scheduleState.categoryFilter !== 'all') {
    events = events.filter(e => e.category === scheduleState.categoryFilter);
  }

  // Filter by search
  if (scheduleState.searchQuery) {
    const q = scheduleState.searchQuery;
    events = events.filter(e =>
      (e.title && e.title.toLowerCase().includes(q)) ||
      (e.topic && e.topic.toLowerCase().includes(q)) ||
      (e.teacher && e.teacher.toLowerCase().includes(q)) ||
      (e.location && e.location.toLowerCase().includes(q))
    );
  }

  // Sort by start time
  events.sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

  if (events.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px 20px;color:#94a3b8;">
        <span style="font-size:2rem;display:block;margin-bottom:8px;">🏖️</span>
        <h4 style="font-weight:700;color:#f1f5f9;">No Scheduled Events Found</h4>
        <p style="font-size:0.75rem;margin-top:4px;">No sessions match your filter criteria for this date.</p>
      </div>`;
    return;
  }

  const conflictingEventIds = new Set();
  conflicts.forEach(c => {
    conflictingEventIds.add(c.evA.id);
    conflictingEventIds.add(c.evB.id);
  });

  const todayKey = '2026-10-27';
  const isToday = (dateStr === todayKey);

  events.forEach(ev => {
    const hasConflict = conflictingEventIds.has(ev.id);
    const card = document.createElement('div');
    card.className = `timeline-period-card ${hasConflict ? 'conflict-hazard' : ''}`;

    // Highlight Period 4 if today
    if (isToday && ev.title.includes('Social Science')) {
      card.classList.add('current-active-period');
    }

    // HTML5 Drag & Drop on schedule cards
    let cardDragOccurred = false;
    card.setAttribute('draggable', 'true');
    card.title = '🖐️ Drag to reschedule or swap with another time slot';

    card.addEventListener('dragstart', (e) => {
      cardDragOccurred = true;
      window.__draggedScheduleId = ev.id;
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'schedule', id: ev.id, date: dateStr }));
      }
      card.classList.add('dragging');
      document.body.classList.add('is-dragging-slot');
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      document.body.classList.remove('is-dragging-slot');
      document.querySelectorAll('.timeline-period-card').forEach(c => c.classList.remove('drag-over-slot'));
      setTimeout(() => { cardDragOccurred = false; }, 150);
    });

    // Drop target to reschedule into this slot
    card.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
      card.classList.add('drag-over-slot');
    });

    card.addEventListener('dragleave', () => {
      card.classList.remove('drag-over-slot');
    });

    card.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      card.classList.remove('drag-over-slot');

      let draggedId = window.__draggedScheduleId;
      try {
        const raw = e.dataTransfer.getData('text/plain');
        if (raw && raw.startsWith('{')) {
          const parsed = JSON.parse(raw);
          if (parsed.id) draggedId = parsed.id;
        }
      } catch (err) { }

      if (draggedId && draggedId !== ev.id) {
        handleScheduleReschedule(draggedId, dateStr, ev.startTime, ev.endTime);
      }
    });

    card.onclick = (e) => {
      if (cardDragOccurred) return;
      openEventDetailModal(ev.id, dateStr);
    };

    const icon = ev.icon || (ev.category === 'exams' ? '🏆' : ev.category === 'assignments' ? '📝' : ev.category === 'events' ? '🎪' : '💡');

    card.innerHTML = `
      <div class="period-time-block">
        <span class="period-time-range">${ev.time || (ev.startTime + ' – ' + ev.endTime)}</span>
        <span class="period-duration-tag">${ev.category === 'assignments' ? 'Submission Deadline' : '45 mins session'}</span>
      </div>

      <div class="period-main-block">
        <div class="period-subj-icon">${icon}</div>
        <div class="period-info-wrap">
          <div class="period-title-row">
            <span class="period-name">${ev.title}</span>
            <span class="period-cat-chip ${ev.category}">${ev.category.toUpperCase()}</span>
            ${hasConflict ? `<span class="conflict-flag-badge">⚠️ Time Conflict</span>` : ''}
            ${ev.isOfficial ? `<span style="font-size:0.58rem;font-weight:800;background:rgba(139,92,246,0.2);color:#c4b5fd;padding:2px 6px;border-radius:4px;">📢 OFFICIAL</span>` : ''}
            ${ev.category === 'personal' ? `<span style="font-size:0.62rem;color:#7dd3fc;font-weight:700;">🖐️ Drag to Move</span>` : ''}
          </div>
          <p class="period-topic-text">${ev.topic || ev.desc || ''}</p>
          <span class="period-faculty-note">${ev.teacher ? `Faculty: ${ev.teacher}` : 'Personal Session'}</span>
        </div>
      </div>

      <div class="period-side-block">
        <span class="period-room-badge">📍 ${ev.location || 'Class 10-B'}</span>
        ${ev.resources && ev.resources.length > 0 ? `<span style="font-size:0.62rem;color:#a5b4fc;font-weight:600;">📎 ${ev.resources.length} Resource${ev.resources.length > 1 ? 's' : ''}</span>` : ''}
      </div>
    `;

    container.appendChild(card);
  });
}

/* ── 2. Week View Grid (with Day Drag and Drop) ── */
function renderWeekGrid(referenceDate) {
  const container = document.getElementById('weekGridContainer');
  if (!container) return;
  container.innerHTML = '';

  const monday = getMonday(referenceDate);
  const todayKey = '2026-10-27';

  for (let i = 0; i < 7; i++) {
    const curDate = new Date(monday);
    curDate.setDate(monday.getDate() + i);

    const y = curDate.getFullYear();
    const m = curDate.getMonth() + 1;
    const d = curDate.getDate();
    const dKey = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dowNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const col = document.createElement('div');
    col.className = `week-day-col ${dKey === todayKey ? 'today-col' : ''}`;

    // Enable drop onto this day column
    col.ondragover = (e) => {
      e.preventDefault();
      col.classList.add('drag-over-col');
    };
    col.ondragleave = () => col.classList.remove('drag-over-col');
    col.ondrop = (e) => {
      e.preventDefault();
      col.classList.remove('drag-over-col');
      try {
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        if (data.type === 'schedule') {
          handleScheduleRescheduleDay(data.id, dKey);
        }
      } catch (err) { }
    };

    col.innerHTML = `
      <div class="week-col-header">
        <span class="week-col-dow">${dowNames[curDate.getDay()]}</span>
        <span class="week-col-dom">${d}</span>
      </div>
      <div class="week-col-cards" id="weekColCards_${dKey}"></div>
    `;
    container.appendChild(col);

    const cardsWrap = col.querySelector(`#weekColCards_${dKey}`);
    let dayEvents = getCombinedEventsForDate(dKey);

    if (scheduleState.categoryFilter !== 'all') {
      dayEvents = dayEvents.filter(e => e.category === scheduleState.categoryFilter);
    }
    if (scheduleState.searchQuery) {
      const q = scheduleState.searchQuery;
      dayEvents = dayEvents.filter(e =>
        (e.title && e.title.toLowerCase().includes(q)) ||
        (e.topic && e.topic.toLowerCase().includes(q))
      );
    }

    const conflicts = detectScheduleConflicts(dKey);
    const conflictIds = new Set();
    conflicts.forEach(c => { conflictIds.add(c.evA.id); conflictIds.add(c.evB.id); });

    if (dayEvents.length === 0) {
      cardsWrap.innerHTML = `<span style="font-size:0.65rem;color:#475569;text-align:center;padding:20px 0;">No sessions</span>`;
    } else {
      dayEvents.forEach(ev => {
        const item = document.createElement('div');
        const hasConflict = conflictIds.has(ev.id);
        item.className = `week-event-card ${hasConflict ? 'conflict-hazard' : ''}`;

        // Personal events are draggable in week view
        if (ev.category === 'personal') {
          item.setAttribute('draggable', 'true');
          item.title = '🖐️ Drag to another day column';
          item.ondragstart = (e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'schedule', id: ev.id, date: dKey }));
            item.classList.add('dragging');
          };
          item.ondragend = () => item.classList.remove('dragging');
        }

        item.onclick = () => openEventDetailModal(ev.id, dKey);

        item.innerHTML = `
          <span class="week-card-time">${ev.startTime || ev.time || ''}</span>
          <span class="week-card-title">${ev.title}</span>
          <span class="week-card-meta">📍 ${ev.location || 'Room 10-B'}</span>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:2px;">
            <span class="period-cat-chip ${ev.category}">${ev.category}</span>
            ${ev.category === 'personal' ? `<span style="font-size:0.55rem;color:#7dd3fc;font-weight:700;">🖐️</span>` : ''}
          </div>
        `;
        cardsWrap.appendChild(item);
      });
    }
  }
}

// Drag & Drop Reschedule Handlers
function handleScheduleReschedule(id, targetDate, newStart, newEnd) {
  let list = loadPersonalEvents();
  const ev = list.find(e => e.id === id);
  if (ev) {
    ev.date = targetDate;
    ev.startTime = newStart;
    ev.endTime = newEnd;
    ev.time = `${newStart} – ${newEnd}`;
    savePersonalEvents(list);
    renderScheduleView();
    showToast('success', 'Study Session Rescheduled ⏱️', `Moved "${ev.title}" to ${newStart} – ${newEnd}.`);
    return;
  }

  const official = DAILY_TIMETABLE_2026_10_27.find(e => e.id === id);
  if (official) {
    showToast('info', 'Timetable Preference Saved ⏱️', `Swapped preferred slot for "${official.title}" to ${newStart} – ${newEnd}.`);
  }
}

function handleScheduleRescheduleDay(id, targetDate) {
  let list = loadPersonalEvents();
  const ev = list.find(e => e.id === id);
  if (!ev) return;

  ev.date = targetDate;
  savePersonalEvents(list);

  renderScheduleView();
  showToast('success', 'Session Moved to New Day', `Moved "${ev.title}" to ${targetDate}.`);
}

/* ── 3. Month View Calendar ──────────────────── */
function renderMonthSchedule(year, month) {
  const grid = document.getElementById('schedMonthGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const dayHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  dayHeaders.forEach(dh => {
    const el = document.createElement('div');
    el.className = 'sched-month-hdr';
    el.textContent = dh;
    grid.appendChild(el);
  });

  const firstDow = new Date(year, month - 1, 1).getDay();
  const startOffset = (firstDow + 6) % 7;
  const daysInMonth = new Date(year, month, 0).getDate();
  const todayKey = '2026-10-27';

  for (let i = 0; i < startOffset; i++) {
    const el = document.createElement('div');
    el.className = 'sched-month-cell empty';
    grid.appendChild(el);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dKey = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dt = new Date(year, month - 1, d);
    const dow = dt.getDay();

    const cell = document.createElement('div');
    cell.className = `sched-month-cell ${dKey === todayKey ? 'today-cell' : ''}`;
    cell.onclick = () => {
      scheduleState.selectedDate = new Date(year, month - 1, d);
      setScheduleView('day');
    };

    let events = getCombinedEventsForDate(dKey);
    if (scheduleState.categoryFilter !== 'all') {
      events = events.filter(e => e.category === scheduleState.categoryFilter);
    }

    const displayEvents = events.slice(0, 3);
    const moreCount = events.length - displayEvents.length;

    let chipsHtml = displayEvents.map(e => `
      <div class="sched-chip ${e.category}" title="${e.title}">
        ${e.startTime ? e.startTime + ' ' : ''}${e.title}
      </div>
    `).join('');

    if (moreCount > 0) {
      chipsHtml += `<span class="sched-chip-more">+${moreCount} more</span>`;
    }

    cell.innerHTML = `
      <div class="sched-cell-top">
        <span class="sched-cell-num">${d}</span>
        ${events.some(e => e.category === 'exams') ? `<span title="Exam on this day">🏆</span>` : ''}
      </div>
      <div class="sched-cell-chips">${chipsHtml}</div>
    `;

    grid.appendChild(cell);
  }
}

/* ── 4. Live Today Strip ─────────────────────── */
function renderTodayLiveStrip() {
  const container = document.getElementById('liveDeadlinesMini');
  if (!container) return;
  container.innerHTML = '';

  const upcomingDeadlines = [
    { title: 'Ch. 4 Quadratic Equations Ex 4.3', due: 'Tomorrow 11:59 PM', color: '#f59e0b' },
    { title: 'Inter-House Debate Audition', due: 'Today 02:30 PM', color: '#8b5cf6' },
    { title: 'Ch. 5 Arithmetic Progressions', due: '31 Oct 05:00 PM', color: '#38bdf8' }
  ];

  upcomingDeadlines.forEach(item => {
    const row = document.createElement('div');
    row.className = 'mini-deadline-row';
    row.innerHTML = `
      <span class="mini-dl-title">${item.title}</span>
      <span class="mini-dl-due" style="border-left:2px solid ${item.color};">${item.due}</span>
    `;
    container.appendChild(row);
  });
}

window.inspectCurrentPeriod = function () {
  scheduleState.selectedDate = new Date(TODAY);
  setScheduleView('day');
  openEventDetailModal('class_2026-10-27_4', '2026-10-27');
};

window.inspectNextPeriod = function () {
  scheduleState.selectedDate = new Date(TODAY);
  setScheduleView('day');
  openEventDetailModal('class_2026-10-27_5', '2026-10-27');
};

window.resolveFirstConflict = function () {
  scheduleState.selectedDate = new Date(TODAY);
  setScheduleView('day');
  const conflicts = detectScheduleConflicts('2026-10-27');
  if (conflicts.length > 0) {
    openEventDetailModal(conflicts[0].evB.id, '2026-10-27');
  }
};

/* ── 5. Event Details Modal ──────────────────── */
window.openEventDetailModal = function (eventId, dateStr = '2026-10-27') {
  const events = getCombinedEventsForDate(dateStr);
  let ev = events.find(e => e.id === eventId);
  if (!ev) {
    ev = MASTER_EVENTS.find(e => e.id === eventId) ||
      loadPersonalEvents().find(e => e.id === eventId) ||
      loadOfficialBroadcasts().find(e => e.id === eventId);
  }
  if (!ev) return;

  const modal = document.getElementById('eventDetailModal');
  document.getElementById('eventModalTitle').textContent = ev.title;
  document.getElementById('eventModalIcon').textContent = ev.icon || (ev.category === 'exams' ? '🏆' : ev.category === 'assignments' ? '📝' : ev.category === 'events' ? '🎪' : '💡');

  const catBadge = document.getElementById('eventModalCatBadge');
  catBadge.textContent = ev.category.toUpperCase();
  catBadge.className = `status-chip ${ev.category}`;

  document.getElementById('eventModalTime').textContent = ev.time || `${ev.startTime} – ${ev.endTime}`;
  document.getElementById('eventModalLocation').textContent = ev.location || 'Classroom 10-B';
  document.getElementById('eventModalTeacher').textContent = ev.teacher || 'Class Teacher';
  document.getElementById('eventModalDate').textContent = new Date(ev.date || dateStr).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  document.getElementById('eventModalDesc').textContent = ev.desc || ev.topic || 'No further description provided.';

  // Conflict warning inside modal
  const conflicts = detectScheduleConflicts(ev.date || dateStr);
  const isConflicting = conflicts.some(c => c.evA.id === ev.id || c.evB.id === ev.id);
  document.getElementById('eventModalConflictWarning').style.display = isConflicting ? 'block' : 'none';

  // Resources list
  const resContainer = document.getElementById('eventModalResources');
  resContainer.innerHTML = '';
  const resources = ev.resources || [
    { name: 'Syllabus_Coverage_Document.pdf', size: '1.2 MB' },
    { name: 'Teacher_Session_Notes.pdf', size: '640 KB' }
  ];

  resources.forEach(r => {
    const item = document.createElement('div');
    item.className = 'resource-link-item';
    item.innerHTML = `
      <span style="display:flex;align-items:center;gap:6px;">📄 <strong>${r.name}</strong> <span style="font-size:0.62rem;color:#64748b;">(${r.size})</span></span>
      <button class="resource-btn" onclick="downloadMockResource('${r.name}')">Download ⬇</button>
    `;
    resContainer.appendChild(item);
  });

  // Show delete button only if personal event
  const deleteBtn = document.getElementById('btnDeletePersonalEvent');
  if (ev.category === 'personal') {
    deleteBtn.style.display = 'inline-block';
    deleteBtn.onclick = () => deletePersonalEvent(ev.id);
  } else {
    deleteBtn.style.display = 'none';
  }

  modal.style.display = 'flex';
};

window.closeEventDetailModal = function () {
  document.getElementById('eventDetailModal').style.display = 'none';
};

window.downloadMockResource = function (fileName) {
  showToast('success', 'Resource Downloaded', `Saved ${fileName} to Downloads folder.`);
};

window.setEventReminder = function (mins) {
  showToast('info', 'Reminder Set', `You will receive a notification ${mins} minutes before this session.`);
  closeEventDetailModal();
};

/* ── 6. Add Personal Study Session & Live Conflict Detector ── */
window.openAddPersonalModal = function () {
  document.getElementById('personalTitle').value = '';
  document.getElementById('personalDate').value = '2026-10-27';
  document.getElementById('personalStart').value = '16:00';
  document.getElementById('personalEnd').value = '17:00';
  document.getElementById('personalDesc').value = '';
  document.getElementById('formConflictFeedback').style.display = 'none';
  document.getElementById('addPersonalEventModal').style.display = 'flex';
  checkLiveConflict();
};

window.closeAddPersonalModal = function () {
  document.getElementById('addPersonalEventModal').style.display = 'none';
};

window.checkLiveConflict = function () {
  const dateStr = document.getElementById('personalDate').value;
  const start = document.getElementById('personalStart').value;
  const end = document.getElementById('personalEnd').value;
  const feedback = document.getElementById('formConflictFeedback');

  if (!dateStr || !start || !end) return;

  const existingEvents = getCombinedEventsForDate(dateStr).filter(e => e.startTime && e.endTime);
  const clashed = existingEvents.filter(e => timeRangesOverlap(start, end, e.startTime, e.endTime));

  if (clashed.length > 0) {
    feedback.style.display = 'block';
    const firstClash = clashed[0];
    feedback.innerHTML = `⚠️ <strong>Schedule Conflict Detected:</strong> This slot overlaps with <strong>${firstClash.title}</strong> (${firstClash.time || firstClash.startTime}). You can still save it, but it will be flagged on your timeline.`;
  } else {
    feedback.style.display = 'none';
  }
};

window.savePersonalEvent = function (event) {
  event.preventDefault();
  const title = document.getElementById('personalTitle').value;
  const category = document.getElementById('personalCategory').value;
  const subjectId = document.getElementById('personalSubject').value;
  const dateStr = document.getElementById('personalDate').value;
  const start = document.getElementById('personalStart').value;
  const end = document.getElementById('personalEnd').value;
  const location = document.getElementById('personalLocation').value || 'Self Study';
  const desc = document.getElementById('personalDesc').value;

  const newEvent = {
    id: `pers_${Date.now()}`,
    title: title,
    category: 'personal',
    date: dateStr,
    startTime: start,
    endTime: end,
    time: `${start} – ${end}`,
    subjectId: subjectId,
    location: location,
    desc: desc,
    resources: [{ name: 'Self_Study_Planner_Checklist.pdf', size: '280 KB' }]
  };

  const list = loadPersonalEvents();
  list.push(newEvent);
  savePersonalEvents(list);

  closeAddPersonalModal();
  renderScheduleView();
  showToast('success', 'Study Session Scheduled', `Added "${title}" on ${dateStr}.`);
};

window.deletePersonalEvent = function (id) {
  let list = loadPersonalEvents();
  list = list.filter(e => e.id !== id);
  savePersonalEvents(list);
  closeEventDetailModal();
  renderScheduleView();
  showToast('info', 'Study Session Removed', 'The session has been deleted from your personal schedule.');
};

/* ── 7. Teacher / Admin Broadcast Publisher ───── */
window.openAdminPublishModal = function () {
  document.getElementById('adminTitle').value = '';
  document.getElementById('adminDate').value = '2026-10-28';
  document.getElementById('adminStart').value = '09:15';
  document.getElementById('adminEnd').value = '10:00';
  document.getElementById('adminMessage').value = '';
  document.getElementById('adminPublishModal').style.display = 'flex';
};

window.closeAdminPublishModal = function () {
  document.getElementById('adminPublishModal').style.display = 'none';
};

window.publishOfficialSchedule = function (event) {
  event.preventDefault();
  const author = document.getElementById('adminAuthor').value;
  const updateType = document.getElementById('adminUpdateType').value;
  const title = document.getElementById('adminTitle').value;
  const dateStr = document.getElementById('adminDate').value;
  const start = document.getElementById('adminStart').value;
  const end = document.getElementById('adminEnd').value;
  const venue = document.getElementById('adminVenue').value || 'Classroom 10-B';
  const message = document.getElementById('adminMessage').value;

  const category = updateType === 'exam' ? 'exams' : updateType === 'event' ? 'events' : 'classes';

  const newBroadcast = {
    id: `broad_${Date.now()}`,
    title: title,
    category: category,
    date: dateStr,
    startTime: start,
    endTime: end,
    time: `${start} – ${end}`,
    teacher: author,
    location: venue,
    desc: message,
    isOfficial: true,
    resources: [{ name: 'Official_Notice_Signed.pdf', size: '820 KB' }]
  };

  const broadcasts = loadOfficialBroadcasts();
  broadcasts.push(newBroadcast);
  saveOfficialBroadcasts(broadcasts);

  closeAdminPublishModal();
  renderScheduleView();
  showToast('success', 'Official Update Broadcasted', `Sent to Class 10-B students by ${author}.`);
};

/* ── 8. Notification Center Synchronization ───── */
window.toggleNotificationPopover = function () {
  const popover = document.getElementById('notificationPopover');
  if (!popover) return;
  const isShown = popover.style.display === 'block';
  popover.style.display = isShown ? 'none' : 'block';
  if (!isShown) syncNotifications();
};

window.syncNotifications = function () {
  const container = document.getElementById('notificationList');
  if (!container) return;
  container.innerHTML = '';

  const broadcasts = loadOfficialBroadcasts();
  const personal = loadPersonalEvents();
  const conflicts = detectScheduleConflicts('2026-10-27');

  const notifs = [
    ...broadcasts.map(b => ({
      title: `📢 ${b.title}`,
      desc: `Published by ${b.teacher} for ${b.date}`,
      time: 'Official Notice',
      unread: true,
      color: '#8b5cf6',
      action: () => openEventDetailModal(b.id, b.date)
    })),
    {
      title: '📝 Due Tomorrow: Quadratic Equations Ex 4.3',
      desc: 'NCERT Chapter 4 homework due at 11:59 PM.',
      time: 'Due in 24h',
      unread: true,
      color: '#f59e0b',
      action: () => scrollToSection('assignments')
    },
    {
      title: '🏆 CBSE Pre-Board 1 Starts in 8 Days',
      desc: 'Mathematics Theory Exam scheduled for 05 Nov 2026.',
      time: 'Exam Cell Alert',
      unread: true,
      color: '#f43f5e',
      action: () => openEventDetailModal('ev_exam_1', '2026-11-05')
    }
  ];

  if (conflicts.length > 0) {
    notifs.unshift({
      title: '⚠️ Schedule Conflict Detected',
      desc: `Overlapping events found on Tuesday 27 Oct schedule.`,
      time: 'Action Required',
      unread: true,
      color: '#f43f5e',
      action: () => resolveFirstConflict()
    });
  }

  document.getElementById('notificationBadge').textContent = notifs.length;
  document.getElementById('notifLastSync').textContent = `Live Sync · ${notifs.length} Active Alerts`;

  notifs.forEach(n => {
    const item = document.createElement('div');
    item.className = `notif-item ${n.unread ? 'unread' : ''}`;
    item.onclick = () => {
      document.getElementById('notificationPopover').style.display = 'none';
      if (n.action) n.action();
    };

    item.innerHTML = `
      <div class="notif-dot" style="background:${n.color};"></div>
      <div class="notif-item-body">
        <p class="notif-item-title">${n.title}</p>
        <p class="notif-item-desc">${n.desc}</p>
        <span class="notif-item-time">${n.time}</span>
      </div>
    `;
    container.appendChild(item);
  });
};

/* ══════════════════════════════════════════════
   ASSIGNMENTS MODULE (PRESERVED)
══════════════════════════════════════════════ */
const DEFAULT_ASSIGNMENTS = [
  {
    id: 'a1',
    title: 'Chapter 4 — Quadratic Equations',
    desc: 'Solve NCERT Exercise 4.3 (Q1–Q11). Show all working.',
    due: '2026-10-28',
    status: 'pending',
  },
  {
    id: 'a2',
    title: 'Chapter 5 — Arithmetic Progressions',
    desc: 'Complete NCERT Exercise 5.2 and 5.3. Word problems mandatory.',
    due: '2026-10-31',
    status: 'submitted',
  },
  {
    id: 'a3',
    title: 'Chapter 3 — Pair of Linear Equations',
    desc: 'Graphical method problems from NCERT Exercise 3.2.',
    due: '2026-11-02',
    status: 'pending',
  },
  {
    id: 'a4',
    title: 'Chapter 6 — Triangles',
    desc: 'Theorems: BPT and its converse with proofs.',
    due: '2026-11-07',
    status: 'pending',
  },
];

function loadAssignments() {
  try {
    const saved = localStorage.getItem('dps_assignments');
    return saved ? JSON.parse(saved) : DEFAULT_ASSIGNMENTS;
  } catch (e) {
    return DEFAULT_ASSIGNMENTS;
  }
}

function saveAssignments(list) {
  try {
    localStorage.setItem('dps_assignments', JSON.stringify(list));
  } catch (e) { }
}

function formatDate(dateStr) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dt = new Date(dateStr);
  const diff = Math.ceil((dt - TODAY) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  if (diff < 0) return `${Math.abs(diff)}d overdue`;
  return `${dt.getDate()} ${months[dt.getMonth()]}`;
}

function isUrgent(dateStr) {
  const dt = new Date(dateStr);
  const diff = Math.ceil((dt - TODAY) / 86400000);
  return diff <= 1;
}

function isPast(dateStr) {
  return new Date(dateStr) < TODAY;
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

let assignmentViewMode = 'kanban'; // default 'kanban' for drag-and-drop

window.setAssignmentView = function (mode) {
  assignmentViewMode = mode;
  document.getElementById('asgnViewBtnList')?.classList.toggle('active', mode === 'list');
  document.getElementById('asgnViewBtnKanban')?.classList.toggle('active', mode === 'kanban');

  document.getElementById('assignmentsList').style.display = mode === 'list' ? 'flex' : 'none';
  document.getElementById('assignmentsKanbanBoard').style.display = mode === 'kanban' ? 'grid' : 'none';

  renderAssignments();
};

function renderAssignments() {
  const list = loadAssignments();

  // 1. Classic List View
  const listContainer = document.getElementById('assignmentsList');
  if (listContainer) {
    listContainer.innerHTML = '';
    const pending = list.filter(a => a.status === 'pending' || a.status === 'overdue' || a.status === 'in_progress').length;
    document.getElementById('pendingBadge').textContent = `${pending} pending`;

    list.forEach((asgn, idx) => {
      let status = asgn.status;
      if (status === 'pending' && isPast(asgn.due)) status = 'overdue';

      const card = document.createElement('div');
      card.className = `assignment-card ${status} fade-up`;
      card.style.animationDelay = `${idx * 0.08}s`;

      const iconMap = { pending: '📝', in_progress: '⏳', submitted: '✅', overdue: '🔴', graded: '⭐' };
      const dueCls = isUrgent(asgn.due) ? 'urgent' : 'normal';
      const dueStr = formatDate(asgn.due);

      card.innerHTML = `
        <div class="asgn-icon">${iconMap[status] || '📝'}</div>
        <div class="asgn-body">
          <p class="asgn-title">${asgn.title}</p>
          <div class="asgn-meta">
            <span class="asgn-due ${dueCls}">📅 Due: ${dueStr}</span>
          </div>
        </div>
        <div class="asgn-right">
          <span class="status-badge ${status}">${status === 'in_progress' ? 'In Progress' : capitalize(status)}</span>
          ${status !== 'submitted'
          ? `<button class="submit-btn" id="submit-${asgn.id}" onclick="submitAssignment('${asgn.id}')">Submit</button>`
          : ''}
        </div>`;
      listContainer.appendChild(card);
    });
  }

  // 2. Drag & Drop Kanban Columns
  renderKanbanBoard(list);
  renderUpcoming(list);
}

function renderKanbanBoard(list) {
  const pendingWrap = document.getElementById('kanbanPending');
  const inProgressWrap = document.getElementById('kanbanInProgress');
  const submittedWrap = document.getElementById('kanbanSubmitted');
  if (!pendingWrap || !inProgressWrap || !submittedWrap) return;

  pendingWrap.innerHTML = '';
  inProgressWrap.innerHTML = '';
  submittedWrap.innerHTML = '';

  const pendingItems = list.filter(a => a.status === 'pending' || a.status === 'overdue');
  const inProgressItems = list.filter(a => a.status === 'in_progress');
  const submittedItems = list.filter(a => a.status === 'submitted');

  document.getElementById('countPending').textContent = pendingItems.length;
  document.getElementById('countInProgress').textContent = inProgressItems.length;
  document.getElementById('countSubmitted').textContent = submittedItems.length;

  function createKanbanCard(asgn) {
    const card = document.createElement('div');
    card.className = `kanban-card ${asgn.status}`;
    card.setAttribute('draggable', 'true');
    card.id = `kanban-card-${asgn.id}`;

    // HTML5 Drag handlers
    card.ondragstart = (e) => {
      e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'assignment', id: asgn.id }));
      card.classList.add('dragging');
    };
    card.ondragend = () => {
      card.classList.remove('dragging');
    };

    const dueStr = formatDate(asgn.due);
    const urgent = isUrgent(asgn.due) && asgn.status !== 'submitted';

    card.innerHTML = `
      <div class="kanban-card-top">
        <span class="status-badge ${asgn.status}">${asgn.status === 'in_progress' ? 'In Progress' : capitalize(asgn.status)}</span>
        <span class="kanban-drag-handle" title="Drag to move card">⠿</span>
      </div>
      <h5 class="kanban-card-title">${asgn.title}</h5>
      <p class="kanban-card-desc">${asgn.desc || ''}</p>
      <div class="kanban-card-footer">
        <span class="kanban-due ${urgent ? 'urgent' : ''}">📅 ${dueStr}</span>
        ${asgn.status !== 'submitted' ? `
          <span class="kanban-submit-link" onclick="submitAssignment('${asgn.id}')">Submit ➔</span>
        ` : `
          <span style="font-size:0.65rem;color:#10b981;font-weight:700;">✓ Graded</span>
        `}
      </div>
    `;

    return card;
  }

  pendingItems.forEach(a => pendingWrap.appendChild(createKanbanCard(a)));
  inProgressItems.forEach(a => inProgressWrap.appendChild(createKanbanCard(a)));
  submittedItems.forEach(a => submittedWrap.appendChild(createKanbanCard(a)));
}

// Drag & Drop Event Listeners for Kanban Columns
window.allowDrop = function (e) {
  e.preventDefault();
  const col = e.currentTarget;
  col.classList.add('drag-over');
};

window.dragLeave = function (e) {
  const col = e.currentTarget;
  col.classList.remove('drag-over');
};

window.handleKanbanDrop = function (e, targetStatus) {
  e.preventDefault();
  const col = e.currentTarget;
  col.classList.remove('drag-over');

  try {
    const rawData = e.dataTransfer.getData('text/plain');
    const data = JSON.parse(rawData);
    if (data.type !== 'assignment') return;

    const list = loadAssignments();
    const asgn = list.find(a => a.id === data.id);
    if (!asgn) return;

    if (asgn.status === targetStatus) return; // unchanged

    asgn.status = targetStatus;
    saveAssignments(list);
    renderAssignments();
    updateSidebarStats();

    const statusNames = {
      pending: 'To-Do / Pending',
      in_progress: 'In Progress',
      submitted: 'Submitted & Completed'
    };

    if (targetStatus === 'submitted') {
      showToast('success', 'Assignment Submitted! 🎉', `Moved "${asgn.title}" to Submitted.`);
    } else {
      showToast('info', 'Status Updated', `Moved to ${statusNames[targetStatus]}.`);
    }
  } catch (err) { }
};

window.submitAssignment = function (id) {
  const list = loadAssignments();
  const asgn = list.find(a => a.id === id);
  if (!asgn) return;

  const btn = document.getElementById(`submit-${id}`);
  if (btn) { btn.disabled = true; btn.textContent = 'Submitting…'; }

  setTimeout(() => {
    asgn.status = 'submitted';
    saveAssignments(list);
    renderAssignments();
    updateSidebarStats();
    showToast('success', 'Assignment Submitted! 🎉', asgn.title);
  }, 400);
};

/* ══════════════════════════════════════════════
   RIGHT PANEL WIDGETS
══════════════════════════════════════════════ */
function renderUpcoming(list) {
  const container = document.getElementById('upcomingList');
  if (!container) return;
  container.innerHTML = '';

  const upcoming = list
    .filter(a => a.status !== 'submitted' && a.status !== 'graded')
    .sort((a, b) => a.due.localeCompare(b.due))
    .slice(0, 4);

  const events = [
    ...upcoming.map(a => ({
      title: a.title.replace('Chapter ', 'Ch.'),
      date: a.due,
      color: '#f59e0b',
      tag: 'Assignment',
      tagColor: 'rgba(245,158,11,0.15)',
      tagText: '#fcd34d',
    })),
    {
      title: 'CBSE Pre-Board Exam 1',
      date: '2026-11-05',
      color: '#f43f5e',
      tag: 'Exam',
      tagColor: 'rgba(244,63,94,0.15)',
      tagText: '#fda4af',
    },
  ].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 5);

  events.forEach(ev => {
    const item = document.createElement('div');
    item.className = 'upcoming-item';
    item.innerHTML = `
      <div class="upcoming-dot" style="background:${ev.color}"></div>
      <div class="upcoming-body">
        <p class="upcoming-title">${ev.title}</p>
        <p class="upcoming-date">${formatDate(ev.date)}</p>
      </div>
      <span class="upcoming-tag" style="background:${ev.tagColor};color:${ev.tagText}">${ev.tag}</span>`;
    container.appendChild(item);
  });
}

function renderMiniCal() {
  const mc = document.getElementById('miniCal');
  if (!mc) return;
  mc.innerHTML = '';

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  days.forEach(d => {
    const h = document.createElement('div');
    h.className = 'mini-cal-hdr'; h.textContent = d; mc.appendChild(h);
  });

  const year = 2026, month = 10;
  const firstDow = new Date(year, month - 1, 1).getDay();
  const startOffset = (firstDow + 6) % 7;
  const daysInMonth = 31;
  const todayKey = '2026-10-27';

  for (let i = 0; i < startOffset; i++) {
    const el = document.createElement('div'); el.className = 'mini-day me'; mc.appendChild(el);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const key = `2026-10-${String(d).padStart(2, '0')}`;
    const dayRecords = ALL_RECORDS.filter(r => r.date === key);
    const el = document.createElement('div');
    el.textContent = d;

    let cls = '';
    if (key === todayKey) cls = 'mt';
    else if (dayRecords.some(r => r.status === 'holiday')) cls = 'mh';
    else if (dayRecords.some(r => r.status === 'absent')) cls = 'ma';
    else if (dayRecords.some(r => r.status === 'late')) cls = 'ml';
    else if (dayRecords.length > 0) cls = 'mp';

    el.className = `mini-day ${cls}`;
    mc.appendChild(el);
  }
}

function renderWeekStrip() {
  const container = document.getElementById('weekStrip');
  if (!container) return;
  container.innerHTML = '';

  const week = [
    { label: 'Mon', key: '2026-10-26', status: 'present' },
    { label: 'Tue', key: '2026-10-27', status: 'present' }, // today
    { label: 'Wed', key: '2026-10-28', status: 'future' },
    { label: 'Thu', key: '2026-10-29', status: 'future' },
    { label: 'Fri', key: '2026-10-30', status: 'future' },
    { label: 'Sat', key: '2026-10-31', status: 'no-class' },
    { label: 'Sun', key: '2026-11-01', status: 'no-class' },
  ];

  week.forEach(({ label, key, status }) => {
    const cls = status === 'present' ? 'p' : status === 'absent' ? 'a' : 'f';
    const icon = cls === 'p' ? '✓' : cls === 'a' ? '✗' : '·';

    const el = document.createElement('div');
    el.className = 'ws-day';
    el.innerHTML = `<span class="ws-label">${label}</span><div class="ws-dot ${cls}">${icon}</div>`;
    container.appendChild(el);
  });
}

/* ══════════════════════════════════════════════
   TOAST NOTIFICATIONS
══════════════════════════════════════════════ */
function showToast(type, title, sub = '') {
  const icons = { success: '✅', info: '💡', warning: '⚠️' };
  const stack = document.getElementById('toastStack');
  if (!stack) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `
    <span class="toast-icon">${icons[type] || '💬'}</span>
    <div class="toast-text">
      <p class="toast-title">${title}</p>
      ${sub ? `<p class="toast-sub">${sub}</p>` : ''}
    </div>`;
  stack.appendChild(t);

  setTimeout(() => {
    t.style.transition = 'opacity 0.3s, transform 0.3s';
    t.style.opacity = '0'; t.style.transform = 'translateX(40px)';
    setTimeout(() => t.remove(), 320);
  }, 3500);
}

/* ══════════════════════════════════════════════
   GREETING & TOPBAR
══════════════════════════════════════════════ */
function renderGreeting() {
  const h = new Date().getHours();
  const time = h < 12 ? 'Morning' : h < 17 ? 'Afternoon' : 'Evening';
  const greetEl = document.getElementById('greeting');
  if (greetEl) greetEl.textContent = `Good ${time}, Rahul 👋`;

  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateEl = document.getElementById('topbarDate');
  if (dateEl) dateEl.textContent = TODAY.toLocaleDateString('en-IN', opts);
}

/* ══════════════════════════════════════════════
   NAVIGATION & SCROLL
══════════════════════════════════════════════ */
window.scrollToSection = function (section) {
  const el = document.getElementById(`section-${section}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(`nav-${section}`)?.classList.add('active');
  }
};

// Update active navigation state on workspace scroll
// Update active navigation state on workspace scroll
const workspaceEl = document.querySelector('.workspace');
if (workspaceEl) {
  workspaceEl.addEventListener('scroll', () => {
    const attTop = document.getElementById('section-attendance')?.offsetTop ?? 0;
    const schedTop = document.getElementById('section-schedule')?.offsetTop ?? 0;
    const asgnTop = document.getElementById('section-assignments')?.offsetTop ?? 0;
    const scrollY = workspaceEl.scrollTop + 120;

    if (scrollY >= asgnTop) {
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      document.getElementById('nav-assignments')?.classList.add('active');
    } else if (scrollY >= schedTop) {
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      document.getElementById('nav-schedule')?.classList.add('active');
    } else if (scrollY >= attTop) {
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      document.getElementById('nav-attendance')?.classList.add('active');
    }
  }, { passive: true });
}

/* ══════════════════════════════════════════════
   INITIALIZATION
══════════════════════════════════════════════ */
function init() {
  renderGreeting();
  updateAllViews();
  renderScheduleView();
  syncNotifications();
  renderAssignments();
  renderMiniCal();
  renderWeekStrip();
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('resize', () => {
  renderTrendChart();
});

