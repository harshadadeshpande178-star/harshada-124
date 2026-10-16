/**
 * ========================================================
 * KINETIC // STUDENT CONSISTENCY PLATFORM (app.js)
 * High-performance, reactive, audio-synthesized student OS
 * ========================================================
 */

// ================= GLOBAL STATE =================
const DEFAULT_TASKS = [
  {
    id: 'task-1',
    stepNumber: 1,
    title: 'Core Concept Learning & Theory: Differential Calculus',
    duration: 50,
    category: 'study',
    practiceSuggestion: 'Solve 5-10 practice problems on Chain Rule & Limits',
    status: 'completed', // 'completed' | 'pending' | 'failed'
    completedAt: '08:45 AM',
    excitingEmoji: '🚀',
    stressedEmoji: '😰'
  },
  {
    id: 'task-2',
    stepNumber: 2,
    title: 'Problem Set Drill: Physics Mechanics & Newton Laws',
    duration: 60,
    category: 'study',
    practiceSuggestion: 'Solve textbook questions 12 to 18 with free body diagrams',
    status: 'pending',
    completedAt: null,
    excitingEmoji: '🔥',
    stressedEmoji: '🤯'
  },
  {
    id: 'task-3',
    stepNumber: 3,
    title: 'Organic Chemistry Reaction Mechanisms & Flashcards',
    duration: 45,
    category: 'revision',
    practiceSuggestion: 'Synthesize 5 multi-step reaction pathways from memory',
    status: 'pending',
    completedAt: null,
    excitingEmoji: '🎉',
    stressedEmoji: '⏳'
  },
  {
    id: 'task-4',
    stepNumber: 4,
    title: 'Data Structures / Algorithmic Problem Solving (LeetCode / Math)',
    duration: 55,
    category: 'study',
    practiceSuggestion: 'Implement Binary Search variations & edge cases',
    status: 'pending',
    completedAt: null,
    excitingEmoji: '🥳',
    stressedEmoji: '😬'
  },
  {
    id: 'task-5',
    stepNumber: 5,
    title: 'Active Recall & Comprehensive Daily Revision Sheet',
    duration: 40,
    category: 'revision',
    practiceSuggestion: 'Feynman technique summary for 3 toughest concepts',
    status: 'pending',
    completedAt: null,
    excitingEmoji: '🌟',
    stressedEmoji: '🏃‍♂️💨'
  }
];

const QUIZ_QUESTIONS = [
  {
    question: "1. What is the fundamental derivative of f(x) = sin(x^2) using the Chain Rule?",
    options: [
      "A) 2x · cos(x^2)",
      "B) cos(2x)",
      "C) 2 · sin(x) · cos(x)",
      "D) -cos(x^2)"
    ],
    answer: 0,
    explanation: "By chain rule: d/dx[sin(u)] = cos(u) · u'. Here u = x^2, so u' = 2x, resulting in 2x·cos(x^2)."
  },
  {
    question: "2. When an object accelerates at a constant rate, what does the slope of its Velocity vs. Time graph represent?",
    options: [
      "A) Total Distance Travelled",
      "B) Instantaneous Acceleration",
      "C) Net Kinetic Energy",
      "D) Momentum"
    ],
    answer: 1,
    explanation: "Slope of v-t curve = dv/dt = acceleration. The area under the curve gives displacement."
  },
  {
    question: "3. In an SN2 reaction mechanism, what stereochemical outcome always occurs at the chiral center?",
    options: [
      "A) Retention of configuration",
      "B) Complete racemization",
      "C) Inversion of configuration (Walden Inversion)",
      "D) No reaction at chiral carbons"
    ],
    answer: 2,
    explanation: "SN2 involves backside nucleophilic attack, producing 100% Walden inversion."
  },
  {
    question: "4. What is the worst-case time complexity of standard Binary Search on a sorted array of size N?",
    options: [
      "A) O(1)",
      "B) O(N)",
      "C) O(N log N)",
      "D) O(log N)"
    ],
    answer: 3,
    explanation: "Binary search repeatedly divides the search space in half, resulting in O(log N) operations."
  },
  {
    question: "5. According to circadian neuroscience, which neurotransmitter triggers REM memory consolidation during sleep?",
    options: [
      "A) Acetylcholine & GABA balance",
      "B) Pure Cortisol",
      "C) High Adrenaline",
      "D) Insulin spikes"
    ],
    answer: 0,
    explanation: "REM sleep requires high cholinergic (acetylcholine) activity combined with GABAergic inhibition of motor neurons."
  }
];

const BOOKS_LIST = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    summary: "You do not rise to the level of your goals. You fall to the level of your systems. Tiny 1% changes compound into immense mastery over 365 days."
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    summary: "The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable in our economy."
  },
  {
    title: "Make It Stick: The Science of Successful Learning",
    author: "Peter C. Brown",
    summary: "Rereading and massed practice give an illusion of mastery. Active retrieval, spaced repetition, and interleaving build durable neural pathways."
  },
  {
    title: "Can't Hurt Me",
    author: "David Goggins",
    summary: "When your mind is telling you you're done, that you're exhausted, you're really only 40 percent done. Push beyond self-imposed boundaries."
  }
];

const SOCIAL_PROMPTS = [
  "Ask your parents about a difficult decision they faced at your age and how they overcame it.",
  "Call a close friend and ask what goals they are working on this month, and offer genuine encouragement.",
  "Express gratitude to someone at home who prepared your meals or supported your study space.",
  "Share one fascinating concept you mastered today with a family member in simple non-technical terms."
];

// App State
let state = {
  credits: 100,
  streak: 4,
  deductionsTotal: 0,
  penaltyActive: false,
  penaltySecondsLeft: 7200, // 2 hours overtime
  tasks: JSON.parse(localStorage.getItem('kinetic_tasks')) || DEFAULT_TASKS,
  taskMode: 'sequential', // 'sequential' | 'flexible'
  waterMl: 1500,
  activity: 'cycling',
  activityDone: false,
  macros: {
    protein: 55,
    carbs: 160,
    fiber: 22,
    fats: 38
  },
  social: {
    parents: false,
    friends: false,
    completed: false
  },
  reading: {
    bookIndex: 0,
    completed: false
  },
  sleepConfirmed: false,
  alarmTime: '06:00',
  alarmActive: false,
  alarmUnlocked: false,
  stepCounter: 0,
  candyCrush: {
    stage: 1, // 1 or 2
    score: 0,
    targetStage1: 500,
    targetStage2: 1000,
    moves: 25,
    grid: [],
    selectedCell: null
  },
  quiz: {
    currentQuestionIndex: 0,
    selectedOption: null,
    score: 0,
    passed: false
  },
  music: {
    unlocked: false,
    playing: false,
    currentTrack: 'lofi',
    secondsLeft: 1800 // 30 minutes
  },
  sfxEnabled: true
};

// ================= WEB AUDIO API SOUND SYNTHESIZER =================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.musicInterval = null;
  }

  init() {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch (e) {
      console.warn("AudioContext not supported or blocked:", e);
    }
  }

  playPop() {
    if (!state.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  playMatch() {
    if (!state.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
      freqs.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = f;
        const t = this.ctx.currentTime + i * 0.06;
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.15);
      });
    } catch (e) {}
  }

  playChime() {
    if (!state.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [587.33, 739.99, 880.00, 1174.66]; // D Major celebration
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const startTime = this.ctx.currentTime + idx * 0.08;
        gain.gain.setValueAtTime(0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch (e) {}
  }

  playBuzzer() {
    if (!state.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.setValueAtTime(110, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {}
  }

  playAlarmSiren() {
    if (!this.alarmLoop && state.alarmActive) {
      this.init();
      if (!this.ctx) return;
      try {
        this.alarmOsc = this.ctx.createOscillator();
        this.alarmGain = this.ctx.createGain();
        this.alarmOsc.type = 'sawtooth';
        
        const now = this.ctx.currentTime;
        this.alarmOsc.frequency.setValueAtTime(800, now);
        
        // Siren wobble
        this.alarmMod = this.ctx.createOscillator();
        this.alarmMod.frequency.value = 4; // 4 Hz wobble
        const modGain = this.ctx.createGain();
        modGain.gain.value = 250;
        this.alarmMod.connect(this.alarmOsc.frequency);
        
        this.alarmGain.gain.setValueAtTime(0.25, now);
        this.alarmOsc.connect(this.alarmGain);
        this.alarmGain.connect(this.ctx.destination);

        this.alarmOsc.start();
        this.alarmMod.start();
        this.alarmLoop = true;
      } catch (e) {}
    }
  }

  stopAlarmSiren() {
    if (this.alarmLoop) {
      try {
        this.alarmOsc.stop();
        this.alarmMod.stop();
        this.alarmOsc.disconnect();
      } catch (e) {}
      this.alarmLoop = false;
      this.alarmOsc = null;
    }
  }

  startSynthesizedLofi() {
    this.init();
    if (!this.ctx) return;
    if (this.musicInterval) clearInterval(this.musicInterval);

    // Warm chords in F Minor / Ab Major
    const chords = [
      [174.61, 220.00, 261.63, 329.63], // F Maj7
      [130.81, 164.81, 196.00, 246.94], // C Maj7
      [146.83, 174.61, 220.00, 261.63], // D min7
      [164.81, 196.00, 246.94, 293.66]  // E min7
    ];
    let chordIdx = 0;

    const playChord = () => {
      if (!state.music.playing || !this.ctx) return;
      try {
        const currentChord = chords[chordIdx % chords.length];
        chordIdx++;

        currentChord.forEach((noteFreq) => {
          const osc = this.ctx.createOscillator();
          const filter = this.ctx.createBiquadFilter();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.value = noteFreq;

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(600, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.4);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 3.2);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc.stop(this.ctx.currentTime + 3.3);
        });
      } catch (e) {}
    };

    playChord();
    this.musicInterval = setInterval(playChord, 3400);
  }

  stopSynthesizedLofi() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

const sound = new SoundEngine();

// ================= DOM ELEMENT REFERENCES =================
const liveClockEl = document.getElementById('liveClock');
const userCreditsEl = document.getElementById('userCredits');
const streakCountEl = document.getElementById('streakCount');
const overallPercentageEl = document.getElementById('overallPercentage');
const overallProgressBarEl = document.getElementById('overallProgressBar');
const tasksPercentageDisplayEl = document.getElementById('tasksPercentageDisplay');
const tasksStepperContainerEl = document.getElementById('tasksStepperContainer');
const stepCounterBadgeEl = document.getElementById('stepCounterBadge');
const currentActiveTaskNameEl = document.getElementById('currentActiveTaskName');
const penaltyBannerEl = document.getElementById('penaltyBanner');
const penaltyTimerDisplayEl = document.getElementById('penaltyTimerDisplay');
const alarmModalEl = document.getElementById('alarmModal');
const addTaskModalEl = document.getElementById('addTaskModal');
const dietModalEl = document.getElementById('dietModal');
const toastContainerEl = document.getElementById('toastContainer');
const musicRewardCardEl = document.getElementById('musicRewardCard');
const musicUnlockedBannerEl = document.getElementById('musicUnlockedBanner');
const musicPlayBtnEl = document.getElementById('musicPlayBtn');
const musicSessionTimerEl = document.getElementById('musicSessionTimer');
const audioVisualizerEl = document.getElementById('audioVisualizer');
const trackArtworkEl = document.querySelector('.track-artwork');

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  loadPersistedState();
  initClock();
  initNavTabs();
  renderStepperTasks();
  initCandyCrushGrid();
  loadQuizQuestion(0);
  updateWellnessUI();
  updateProgressMetrics();
  initPenaltyLoop();
  checkMusicRewardUnlock();
});

// Save / Load LocalStorage
function saveState() {
  localStorage.setItem('kinetic_tasks', JSON.stringify(state.tasks));
  localStorage.setItem('kinetic_credits', state.credits);
  localStorage.setItem('kinetic_streak', state.streak);
  localStorage.setItem('kinetic_deductions', state.deductionsTotal);
  localStorage.setItem('kinetic_water', state.waterMl);
}

function loadPersistedState() {
  const savedCredits = localStorage.getItem('kinetic_credits');
  if (savedCredits !== null) state.credits = parseInt(savedCredits, 10);
  const savedStreak = localStorage.getItem('kinetic_streak');
  if (savedStreak !== null) state.streak = parseInt(savedStreak, 10);
  const savedDeductions = localStorage.getItem('kinetic_deductions');
  if (savedDeductions !== null) state.deductionsTotal = parseInt(savedDeductions, 10);
  const savedWater = localStorage.getItem('kinetic_water');
  if (savedWater !== null) state.waterMl = parseInt(savedWater, 10);

  userCreditsEl.textContent = state.credits;
  streakCountEl.textContent = state.streak;
  checkPenaltyThreshold();
}

// Clock updates
function initClock() {
  function tick() {
    const now = new Date();
    liveClockEl.textContent = now.toLocaleTimeString('en-US', { hour12: true });

    // Check if alarm time matches current hour & minute
    const currentHM = now.toTimeString().substring(0, 5);
    if (state.alarmTime === currentHM && !state.alarmActive && !state.alarmUnlocked) {
      triggerAlarmModal();
    }
  }
  tick();
  setInterval(tick, 1000);
}

// ================= TAB NAVIGATION =================
function initNavTabs() {
  const navBtns = document.querySelectorAll('.nav-item');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.view-panel').forEach(panel => panel.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });
  const target = document.getElementById(`tab-${tabId}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ================= STEP-BY-STEP TO-DO ROADMAP ENGINE =================
// Completed tasks: BLUE color + EXCITING emoji (🎉, 🚀, 🔥, 🥳)
// Pending tasks: YELLOW color + STRESSED emoji (😰, ⏳, 🤯, 😬)

function renderStepperTasks() {
  tasksStepperContainerEl.innerHTML = '';
  let completedCount = 0;
  let activeStepFound = false;

  state.tasks.forEach((task, index) => {
    const isCompleted = task.status === 'completed';
    const isPending = task.status === 'pending';
    const isFailed = task.status === 'failed';

    if (isCompleted) completedCount++;

    // In sequential mode, lock steps after current pending step
    let isLocked = false;
    let isActiveStep = false;

    if (state.taskMode === 'sequential') {
      if (!isCompleted && !activeStepFound) {
        isActiveStep = true;
        activeStepFound = true;
        currentActiveTaskNameEl.textContent = task.title;
        stepCounterBadgeEl.textContent = `Step ${task.stepNumber} of ${state.tasks.length}`;
      } else if (!isCompleted && activeStepFound) {
        isLocked = true;
      }
    } else {
      // In flexible mode, everything unlocked
      if (!isCompleted && !activeStepFound) {
        isActiveStep = true;
        activeStepFound = true;
        currentActiveTaskNameEl.textContent = task.title;
        stepCounterBadgeEl.textContent = `Step ${task.stepNumber} of ${state.tasks.length}`;
      }
    }

    const card = document.createElement('div');
    card.className = `task-step-card ${isCompleted ? 'completed' : ''} ${isPending && !isLocked ? 'pending' : ''} ${isLocked ? 'locked' : ''} ${isFailed ? 'failed' : ''}`;
    
    // Select appropriate emoji
    const displayEmoji = isCompleted 
      ? task.excitingEmoji 
      : (isFailed ? '❌' : task.stressedEmoji);

    card.innerHTML = `
      <div class="task-step-left">
        <div class="step-number-tag">
          ${isCompleted ? '<i class="fa-solid fa-check"></i> Step ' + task.stepNumber : 'Step ' + task.stepNumber}
        </div>
        <div class="task-details">
          <div class="task-title-row">
            <span class="task-title">${task.title}</span>
            <span class="status-pill">${isCompleted ? 'Completed 🎉' : (isFailed ? 'Failed (-10pts) ❌' : 'Pending & Stressed 😰')}</span>
            <span class="task-state-emoji" title="${isCompleted ? 'Exciting state!' : 'Stressed pending state'}">${displayEmoji}</span>
          </div>
          <div class="task-meta-row">
            <span class="task-meta-pill"><i class="fa-regular fa-clock"></i> ${task.duration} mins</span>
            <span class="task-meta-pill"><i class="fa-solid fa-lightbulb"></i> ${task.practiceSuggestion}</span>
            ${task.completedAt ? `<span class="task-meta-pill"><i class="fa-solid fa-calendar-check"></i> Done at ${task.completedAt}</span>` : ''}
          </div>
        </div>
      </div>

      <div class="task-actions">
        ${!isCompleted && !isFailed ? `
          <button class="btn-task-done" onclick="completeTask('${task.id}')" ${isLocked ? 'disabled title="Complete previous step first"' : ''}>
            <i class="fa-solid fa-check"></i> Complete (+5 Pts)
          </button>
          <button class="btn-task-fail" onclick="failTask('${task.id}')" ${isLocked ? 'disabled' : ''}>
            <i class="fa-solid fa-xmark"></i> Fail (-10 Pts)
          </button>
          ${state.taskMode === 'sequential' ? `
            <button class="btn-task-defer" onclick="setTaskMode('flexible')">
              Complete Later
            </button>
          ` : ''}
        ` : `
          <button class="btn-task-defer" onclick="reopenTask('${task.id}')">
            <i class="fa-solid fa-rotate-left"></i> Redo Step
          </button>
        `}
      </div>
    `;

    tasksStepperContainerEl.appendChild(card);
  });

  if (!activeStepFound && state.tasks.length > 0) {
    currentActiveTaskNameEl.textContent = 'All Steps Mastered for Today! 🏆';
    stepCounterBadgeEl.textContent = 'Completed 100%';
  }

  updateProgressMetrics();
}

// Complete Task (+5 Credits)
function completeTask(taskId) {
  // Check milestone quiz gate
  if (!state.quiz.passed) {
    showToast('⚠️ Milestone Quiz Gate: Answer the 5-question mastery quiz below to advance!', 'danger');
    const quizSection = document.getElementById('quizGatingContainer');
    if (quizSection) quizSection.scrollIntoView({ behavior: 'smooth' });
    sound.playBuzzer();
    return;
  }

  const task = state.tasks.find(t => t.id === taskId);
  if (task) {
    task.status = 'completed';
    const now = new Date();
    task.completedAt = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Award +5 points
    state.credits += 5;
    userCreditsEl.textContent = state.credits;
    sound.playChime();
    showToast(`🎉 Step ${task.stepNumber} Completed! Earned +5 Credits!`, 'success');

    saveState();
    renderStepperTasks();
    checkMusicRewardUnlock();
  }
}

// Fail Task (-10 Credits & Accumulate Deductions toward -50 pt penalty)
function failTask(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (task) {
    task.status = 'failed';
    
    // Deduct 10 points
    state.credits = Math.max(0, state.credits - 10);
    state.deductionsTotal += 10;
    userCreditsEl.textContent = state.credits;
    sound.playBuzzer();
    showToast(`⚠️ Task Failed! 10 Points Deducted! (Total Deductions: ${state.deductionsTotal} pts)`, 'danger');

    checkPenaltyThreshold();
    saveState();
    renderStepperTasks();
  }
}

// Reopen / Reset Task
function reopenTask(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (task) {
    task.status = 'pending';
    task.completedAt = null;
    sound.playPop();
    saveState();
    renderStepperTasks();
  }
}

// Penalty Protocol: -50 points deduction triggers 2 hours extra study
function checkPenaltyThreshold() {
  if (state.deductionsTotal >= 50) {
    state.penaltyActive = true;
    penaltyBannerEl.classList.remove('hidden');
  } else {
    state.penaltyActive = false;
    penaltyBannerEl.classList.add('hidden');
  }
}

function initPenaltyLoop() {
  setInterval(() => {
    if (state.penaltyActive && state.penaltySecondsLeft > 0) {
      state.penaltySecondsLeft--;
      const hrs = String(Math.floor(state.penaltySecondsLeft / 3600)).padStart(2, '0');
      const mins = String(Math.floor((state.penaltySecondsLeft % 3600) / 60)).padStart(2, '0');
      const secs = String(state.penaltySecondsLeft % 60).padStart(2, '0');
      penaltyTimerDisplayEl.textContent = `${hrs}:${mins}:${secs}`;

      if (state.penaltySecondsLeft === 0) {
        state.penaltyActive = false;
        state.deductionsTotal = 0; // Cleared penalty
        penaltyBannerEl.classList.add('hidden');
        showToast('✅ 2-Hour Overtime Study Completed! Penalty Cleared.', 'success');
        saveState();
      }
    }
  }, 1000);
}

// Stepper Mode Switching (Sequential vs Flexible)
function setTaskMode(mode) {
  state.taskMode = mode;
  document.getElementById('btnModeSequential').classList.toggle('active', mode === 'sequential');
  document.getElementById('btnModeFlexible').classList.toggle('active', mode === 'flexible');
  sound.playPop();
  renderStepperTasks();
  showToast(mode === 'sequential' 
    ? 'Sequential Stepper Mode: Tasks must be done step-by-step!' 
    : 'Flexible Mode: Complete remaining tasks afterwards!', 'info');
}

// Calculate Percentages
function updateProgressMetrics() {
  const total = state.tasks.length;
  if (total === 0) return;
  const completed = state.tasks.filter(t => t.status === 'completed').length;
  const pct = Math.round((completed / total) * 100);

  overallPercentageEl.textContent = `${pct}%`;
  overallProgressBarEl.style.width = `${pct}%`;
  tasksPercentageDisplayEl.textContent = `${pct}%`;

  // Check if 100% completed today
  if (pct === 100) {
    unlockMusicReward();
  }
}

// Practice questions collapsible
function togglePracticeQuestions() {
  const body = document.getElementById('practiceQuestionsList');
  const chevron = document.getElementById('practiceChevron');
  const isShown = body.classList.toggle('show');
  chevron.style.transform = isShown ? 'rotate(180deg)' : 'rotate(0deg)';
  sound.playPop();
}

// Add New Task Modal Handling
function openAddTaskModal() {
  addTaskModalEl.classList.remove('hidden');
}
function closeAddTaskModal() {
  addTaskModalEl.classList.add('hidden');
}
function handleAddTask(e) {
  e.preventDefault();
  const title = document.getElementById('taskTitleInput').value.trim();
  const duration = parseInt(document.getElementById('taskEstimatedTime').value, 10);
  const category = document.getElementById('taskCategorySelect').value;
  const practice = document.getElementById('taskPracticeSuggest').value.trim() || 'Solve 5-10 practice questions for deep retention';

  if (!title) return;

  const excitingEmojis = ['🎉', '🚀', '🔥', '🥳', '⭐', '⚡'];
  const stressedEmojis = ['😰', '⏳', '🤯', '😬', '🏃‍♂️💨'];
  const randExc = excitingEmojis[Math.floor(Math.random() * excitingEmojis.length)];
  const randStr = stressedEmojis[Math.floor(Math.random() * stressedEmojis.length)];

  const newTask = {
    id: 'task-' + Date.now(),
    stepNumber: state.tasks.length + 1,
    title,
    duration,
    category,
    practiceSuggestion: practice,
    status: 'pending',
    completedAt: null,
    excitingEmoji: randExc,
    stressedEmoji: randStr
  };

  state.tasks.push(newTask);
  saveState();
  renderStepperTasks();
  closeAddTaskModal();
  document.getElementById('addTaskForm').reset();
  showToast(`Step ${newTask.stepNumber} Added to Journey!`, 'success');
  sound.playPop();
}

// ================= 5-QUESTION CONCEPT QUIZ GATE =================
function loadQuizQuestion(index) {
  state.quiz.currentQuestionIndex = index;
  state.quiz.selectedOption = null;

  const q = QUIZ_QUESTIONS[index];
  document.getElementById('quizQuestionTracker').textContent = `Question ${index + 1} of 5`;
  document.getElementById('quizScoreBadge').textContent = `Score: ${state.quiz.score} / 5`;
  document.getElementById('quizQuestionText').textContent = q.question;
  document.getElementById('submitQuizAnswerBtn').disabled = true;
  document.getElementById('quizFeedbackMessage').textContent = '';

  const grid = document.getElementById('quizOptionsGrid');
  grid.innerHTML = '';

  q.options.forEach((optText, optIdx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-btn';
    btn.textContent = optText;
    btn.onclick = () => selectQuizOption(optIdx, btn);
    grid.appendChild(btn);
  });
}

function selectQuizOption(optIdx, buttonEl) {
  state.quiz.selectedOption = optIdx;
  document.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('selected'));
  buttonEl.classList.add('selected');
  document.getElementById('submitQuizAnswerBtn').disabled = false;
  sound.playPop();
}

function submitCurrentQuizAnswer() {
  if (state.quiz.selectedOption === null) return;

  const q = QUIZ_QUESTIONS[state.quiz.currentQuestionIndex];
  const buttons = document.querySelectorAll('.quiz-option-btn');
  const isCorrect = state.quiz.selectedOption === q.answer;
  const feedback = document.getElementById('quizFeedbackMessage');

  if (isCorrect) {
    state.quiz.score++;
    buttons[state.quiz.selectedOption].classList.add('correct');
    feedback.textContent = `Correct! 🎉 ${q.explanation}`;
    feedback.style.color = '#10b981';
    sound.playMatch();
  } else {
    buttons[state.quiz.selectedOption].classList.add('incorrect');
    buttons[q.answer].classList.add('correct');
    feedback.textContent = `Incorrect. 💡 Note: ${q.explanation}`;
    feedback.style.color = '#ef4444';
    sound.playBuzzer();
  }

  document.getElementById('submitQuizAnswerBtn').disabled = true;

  // Move to next question or complete quiz
  setTimeout(() => {
    if (state.quiz.currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      loadQuizQuestion(state.quiz.currentQuestionIndex + 1);
    } else {
      // Quiz completed
      state.quiz.passed = true;
      document.querySelector('.quiz-badge').innerHTML = '<i class="fa-solid fa-lock-open"></i> MILESTONE QUIZ PASSED! (GATE UNLOCKED)';
      document.querySelector('.quiz-badge').style.background = 'rgba(16, 185, 129, 0.2)';
      document.querySelector('.quiz-badge').style.color = '#34d399';
      feedback.textContent = `🏆 Milestone Quiz Finished! Final Score: ${state.quiz.score}/5. You can now advance through to-do steps!`;
      sound.playChime();
      showToast('🎉 Quiz Gate Conquered! Next steps unlocked!', 'success');
      renderStepperTasks();
    }
  }, 1800);
}

// ================= MORNING ALARM & DISCIPLINE CHALLENGE =================
function triggerAlarmModal(defaultTab = 'steps') {
  state.alarmActive = true;
  state.alarmUnlocked = false;
  alarmModalEl.classList.remove('hidden');
  sound.playAlarmSiren();
  switchAlarmChallengeTab(defaultTab);
  document.getElementById('alarmShutdownStatus').innerHTML = '<i class="fa-solid fa-lock"></i> Alarm Dismissal Locked: Fulfill Requirements Above';
}

function switchAlarmChallengeTab(tab) {
  document.getElementById('modalTabSteps').classList.toggle('active', tab === 'steps');
  document.getElementById('modalTabCandy').classList.toggle('active', tab === 'candy');
  document.getElementById('alarmChallengeSteps').classList.toggle('active', tab === 'steps');
  document.getElementById('alarmChallengeCandy').classList.toggle('active', tab === 'candy');
  sound.playPop();
}

function saveAlarmTime() {
  const val = document.getElementById('alarmTimeInput').value;
  if (val) {
    state.alarmTime = val;
    document.getElementById('alarmTimePreview').textContent = `${val} AM`;
    document.getElementById('targetWakeDisplay').textContent = `${val} AM`;
    showToast(`Alarm set for ${val}! Prepare for tomorrow's challenge!`, 'info');
    sound.playPop();
  }
}

// Method 1: Walk 100 Steps
function recordWalkingStep(count = 1) {
  if (state.alarmUnlocked) return;
  state.stepCounter = Math.min(100, state.stepCounter + count);
  
  document.getElementById('liveStepCounter').textContent = state.stepCounter;
  document.getElementById('previewStepCount').textContent = state.stepCounter;
  const pct = (state.stepCounter / 100) * 100;
  document.getElementById('liveStepBar').style.width = `${pct}%`;

  sound.playPop();

  if (state.stepCounter >= 100) {
    handleAlarmSuccess("Physical Awakening Complete! 100 Steps Mastered!");
  }
}

// Method 2: Candy Crush Match-3 Game Engine (2 Complete Stages)
const CANDY_TYPES = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠'];
const BOARD_SIZE = 8;

function initCandyCrushGrid() {
  const grid = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    const row = [];
    for (let c = 0; c < BOARD_SIZE; c++) {
      row.push(CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)]);
    }
    grid.push(row);
  }
  state.candyCrush.grid = grid;
  state.candyCrush.score = 0;
  state.candyCrush.stage = 1;
  state.candyCrush.moves = 25;
  renderCandyBoard();
}

function renderCandyBoard() {
  const boardEl = document.getElementById('candyBoard');
  if (!boardEl) return;
  boardEl.innerHTML = '';

  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const cell = document.createElement('div');
      cell.className = 'candy-cell';
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.textContent = state.candyCrush.grid[r][c];

      if (state.candyCrush.selectedCell && 
          state.candyCrush.selectedCell.r === r && 
          state.candyCrush.selectedCell.c === c) {
        cell.classList.add('selected');
      }

      cell.onclick = () => onCandyClick(r, c);
      boardEl.appendChild(cell);
    }
  }

  document.getElementById('candyLiveScore').textContent = state.candyCrush.score;
  document.getElementById('candyMovesLeft').textContent = state.candyCrush.moves;
}

function onCandyClick(r, c) {
  if (state.alarmUnlocked) return;
  const selected = state.candyCrush.selectedCell;

  if (!selected) {
    state.candyCrush.selectedCell = { r, c };
    renderCandyBoard();
    sound.playPop();
  } else {
    // Check adjacency
    const dist = Math.abs(selected.r - r) + Math.abs(selected.c - c);
    if (dist === 1) {
      swapCandies(selected.r, selected.c, r, c);
      state.candyCrush.moves = Math.max(0, state.candyCrush.moves - 1);
      state.candyCrush.selectedCell = null;
      checkMatchesAndCascade();
    } else {
      // Pick new selection
      state.candyCrush.selectedCell = { r, c };
      renderCandyBoard();
      sound.playPop();
    }
  }
}

function swapCandies(r1, c1, r2, c2) {
  const temp = state.candyCrush.grid[r1][c1];
  state.candyCrush.grid[r1][c1] = state.candyCrush.grid[r2][c2];
  state.candyCrush.grid[r2][c2] = temp;
  renderCandyBoard();
}

function checkMatchesAndCascade() {
  const grid = state.candyCrush.grid;
  const matched = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(false));
  let matchCount = 0;

  // Horizontal match check
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE - 2; c++) {
      const type = grid[r][c];
      if (type && type === grid[r][c + 1] && type === grid[r][c + 2]) {
        matched[r][c] = true;
        matched[r][c + 1] = true;
        matched[r][c + 2] = true;
        matchCount += 3;
      }
    }
  }

  // Vertical match check
  for (let c = 0; c < BOARD_SIZE; c++) {
    for (let r = 0; r < BOARD_SIZE - 2; r++) {
      const type = grid[r][c];
      if (type && type === grid[r + 1][c] && type === grid[r + 2][c]) {
        matched[r][c] = true;
        matched[r + 1][c] = true;
        matched[r + 2][c] = true;
        matchCount += 3;
      }
    }
  }

  if (matchCount > 0) {
    sound.playMatch();
    const pointsGained = matchCount * 30;
    state.candyCrush.score += pointsGained;

    // Drop candies down (gravity)
    for (let c = 0; c < BOARD_SIZE; c++) {
      let emptyRow = BOARD_SIZE - 1;
      for (let r = BOARD_SIZE - 1; r >= 0; r--) {
        if (!matched[r][c]) {
          grid[emptyRow][c] = grid[r][c];
          if (emptyRow !== r) grid[r][c] = null;
          emptyRow--;
        }
      }
      for (let r = emptyRow; r >= 0; r--) {
        grid[r][c] = CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)];
      }
    }

    renderCandyBoard();
    evaluateCandyStageProgress();

    // Check if new matches formed after cascade
    setTimeout(() => {
      checkMatchesAndCascade();
    }, 250);
  } else {
    renderCandyBoard();
  }
}

function evaluateCandyStageProgress() {
  const score = state.candyCrush.score;

  // Stage 1 check (500 pts)
  if (state.candyCrush.stage === 1 && score >= state.candyCrush.targetStage1) {
    state.candyCrush.stage = 2;
    document.getElementById('candyStageIndicator1').classList.add('cleared');
    document.getElementById('candyStageIndicator1').textContent = 'Stage 1: Conquered! (500 Pts)';
    document.getElementById('candyStageIndicator2').classList.add('active');
    document.getElementById('candyStage1Badge').classList.add('done');
    showToast('🍬 STAGE 1 CLEARED! Now conquer Stage 2 (Goal: 1000 Pts)!', 'success');
    sound.playChime();
  }

  // Stage 2 check (1000 pts)
  if (state.candyCrush.stage === 2 && score >= state.candyCrush.targetStage2) {
    document.getElementById('candyStageIndicator2').classList.add('cleared');
    document.getElementById('candyStageIndicator2').textContent = 'Stage 2: Mastered! (1000 Pts)';
    document.getElementById('candyStage2Badge').classList.add('done');
    handleAlarmSuccess("Candy Crush 2 Stages Mastered! Cognitive Awakening Achieved!");
  }
}

// Alarm Dismissal Victory
function handleAlarmSuccess(reason) {
  state.alarmUnlocked = true;
  state.alarmActive = false;
  sound.stopAlarmSiren();
  sound.playChime();

  const footer = document.getElementById('alarmShutdownStatus');
  footer.innerHTML = `<span style="color: #10b981"><i class="fa-solid fa-lock-open"></i> DISMISSED: ${reason}</span>`;
  showToast(`☀️ ${reason} Good Morning, Scholar!`, 'success');

  // Auto-close modal after 2 seconds
  setTimeout(() => {
    alarmModalEl.classList.add('hidden');
  }, 2200);
}

// ================= WELLNESS, HYDRATION & NUTRITION =================
function addWater(amount) {
  state.waterMl = Math.min(3500, state.waterMl + amount);
  sound.playPop();
  updateWellnessUI();
  saveState();
  showToast(`💧 Added ${amount} ml of clean water! Total: ${state.waterMl} ml`, 'info');
}

function resetWater() {
  state.waterMl = 0;
  updateWellnessUI();
  saveState();
}

function updateWellnessUI() {
  const goal = 3000;
  const pct = Math.min(100, Math.round((state.waterMl / goal) * 100));

  document.getElementById('waterTotalText').textContent = state.waterMl.toLocaleString();
  document.getElementById('waterSummaryBadge').textContent = `${state.waterMl.toLocaleString()} / 3,000 ml`;
  document.getElementById('waterMainFill').style.height = `${pct}%`;
  document.getElementById('waterMiniLevel').style.height = `${pct}%`;
  document.getElementById('waterPctOverlay').textContent = `${pct}%`;

  // Update macros
  document.getElementById('macroProteinVal').textContent = `${state.macros.protein} / 75g (${Math.round((state.macros.protein/75)*100)}%)`;
  document.getElementById('macroProteinBar').style.width = `${Math.min(100, (state.macros.protein/75)*100)}%`;

  document.getElementById('macroCarbsVal').textContent = `${state.macros.carbs} / 220g (${Math.round((state.macros.carbs/220)*100)}%)`;
  document.getElementById('macroCarbsBar').style.width = `${Math.min(100, (state.macros.carbs/220)*100)}%`;

  document.getElementById('macroFiberVal').textContent = `${state.macros.fiber} / 30g (${Math.round((state.macros.fiber/30)*100)}%)`;
  document.getElementById('macroFiberBar').style.width = `${Math.min(100, (state.macros.fiber/30)*100)}%`;

  document.getElementById('macroFatsVal').textContent = `${state.macros.fats} / 50g (${Math.round((state.macros.fats/50)*100)}%)`;
  document.getElementById('macroFatsBar').style.width = `${Math.min(100, (state.macros.fats/50)*100)}%`;
}

function addMacro(macroKey, amount) {
  if (state.macros[macroKey] !== undefined) {
    state.macros[macroKey] += amount;
    sound.playPop();
    updateWellnessUI();
    saveState();
    showToast(`Nutritional target updated: +${amount}g ${macroKey}!`, 'info');
  }
}

// Activity Switcher
const ACTIVITY_DETAILS = {
  cycling: {
    title: '🚴 Outdoor / Stationary Cycling',
    desc: 'Rhythmic pedaling stimulates BDNF (Brain-Derived Neurotrophic Factor), boosting neuron growth and memory consolidation.',
    time: '40-45 Minutes',
    badge: 'Scheduled 4:30 PM'
  },
  running: {
    title: '🏃 High-Cadence Outdoor Running',
    desc: 'Releases endorphins and improves cardiovascular oxygen supply to frontal cortex. 30 mins provides 6 hours of enhanced attention span.',
    time: '30-35 Minutes',
    badge: 'Scheduled 5:00 PM'
  },
  swimming: {
    title: '🏊 Full-Body Resistance Swimming',
    desc: 'Zero-joint-impact aerobic workout. Deep rhythmic breathing regulates vagus nerve and eliminates academic stress hormones.',
    time: '40 Minutes',
    badge: 'Scheduled 6:00 PM'
  },
  yoga: {
    title: '🧘 Vinyasa Yoga & Deep Pranayama',
    desc: 'Corrects desk-study spine posture and activates the parasympathetic nervous system to lower resting heart rate.',
    time: '35 Minutes',
    badge: 'Scheduled 6:30 PM'
  }
};

function selectDailyActivity(actKey) {
  state.activity = actKey;
  const detail = ACTIVITY_DETAILS[actKey];
  document.querySelectorAll('.act-tab').forEach(t => t.classList.toggle('active', t.dataset.act === actKey));
  document.getElementById('actSelectedTitle').textContent = detail.title;
  document.getElementById('actSelectedDesc').textContent = detail.desc;
  document.getElementById('workoutName').textContent = detail.title;
  document.getElementById('workoutBadge').textContent = detail.badge;
  sound.playPop();
}

function markActivityComplete() {
  if (!state.activityDone) {
    state.activityDone = true;
    state.credits += 5;
    userCreditsEl.textContent = state.credits;
    document.getElementById('activityDoneStatus').textContent = 'Completed (+5 Pts) ✅';
    document.getElementById('activityDoneStatus').style.color = '#10b981';
    document.getElementById('btnCompleteActivity').classList.add('btn-disabled');
    sound.playChime();
    showToast('🚴 Physical activity recorded! Earned +5 Credits!', 'success');
    saveState();
    checkMusicRewardUnlock();
  }
}

function startActivityTimer() {
  showToast('⏱️ 45-Minute Workout Timer Started! Give it your all!', 'info');
  sound.playPop();
}

// Diet Modal
function openDietModal() {
  dietModalEl.classList.remove('hidden');
}
function closeDietModal() {
  dietModalEl.classList.add('hidden');
}

// ================= SOCIAL WELLBEING & READING =================
function updateSocialProgress() {
  state.social.parents = document.getElementById('checkParents').checked;
  state.social.friends = document.getElementById('checkFriends').checked;
  sound.playPop();
}

function cycleSocialPrompt() {
  const rand = SOCIAL_PROMPTS[Math.floor(Math.random() * SOCIAL_PROMPTS.length)];
  document.getElementById('socialStarterText').textContent = `"${rand}"`;
  sound.playPop();
}

function completeSocialRoutine() {
  if (!state.social.completed) {
    state.social.completed = true;
    state.credits += 5;
    userCreditsEl.textContent = state.credits;
    document.getElementById('btnCompleteSocial').classList.add('btn-disabled');
    document.getElementById('btnCompleteSocial').innerHTML = '<i class="fa-solid fa-check-double"></i> Completed Today (+5 Pts)';
    sound.playChime();
    showToast('❤️ Quality time with family & friends completed! +5 Credits!', 'success');
    saveState();
    checkMusicRewardUnlock();
  }
}

function cycleReadingBook() {
  state.reading.bookIndex = (state.reading.bookIndex + 1) % BOOKS_LIST.length;
  const b = BOOKS_LIST[state.reading.bookIndex];
  document.getElementById('bookTitle').textContent = b.title;
  document.getElementById('bookAuthor').textContent = `By ${b.author}`;
  document.getElementById('bookSummary').textContent = `"${b.summary}"`;
  sound.playPop();
}

function completeReadingRoutine() {
  if (!state.reading.completed) {
    state.reading.completed = true;
    state.credits += 5;
    userCreditsEl.textContent = state.credits;
    document.getElementById('btnCompleteReading').classList.add('btn-disabled');
    sound.playChime();
    showToast('📚 Daily personal growth reading finished! +5 Credits!', 'success');
    saveState();
  }
}

// ================= SLEEP TRACKER =================
function logSleepConfirmation() {
  state.sleepConfirmed = true;
  sound.playChime();
  showToast('🌙 Bedtime confirmed! Circadian Night Guard active. Rest well!', 'success');
}

// ================= REWARDS: 30-MIN MUSIC PLAYER & 7-DAY FREE DAY =================
function checkMusicRewardUnlock() {
  const allTasksDone = state.tasks.every(t => t.status === 'completed');
  if (allTasksDone && !state.music.unlocked) {
    unlockMusicReward();
  }
}

function unlockMusicReward() {
  state.music.unlocked = true;
  musicUnlockedBannerEl.classList.add('unlocked');
  musicUnlockedBannerEl.innerHTML = '<i class="fa-solid fa-lock-open"></i> 100% COMPLETED! 30-MIN MUSIC SESSION UNLOCKED!';
  
  const openBtn = document.getElementById('openMusicPlayerBtn');
  if (openBtn) {
    openBtn.classList.remove('btn-disabled');
    openBtn.classList.add('btn-primary');
    openBtn.innerHTML = '<i class="fa-solid fa-headphones"></i> Play 30-Min Victory Songs';
  }
  document.getElementById('musicStatusBadge').textContent = 'UNLOCKED! 🎧';
  document.getElementById('musicStatusBadge').style.color = '#10b981';

  showToast('🎉 AMAZING DISCIPLINE! All day activities complete! 30-Min Music Player Unlocked!', 'success');
  sound.playChime();
}

function forceUnlockMusicDemo() {
  unlockMusicReward();
  switchTab('rewards-hub');
}

function toggleMusicPlayback() {
  if (!state.music.unlocked) {
    showToast('🔒 Complete all step tasks and daily routines to unlock your 30-min music reward!', 'danger');
    sound.playBuzzer();
    return;
  }

  state.music.playing = !state.music.playing;
  const icon = musicPlayBtnEl.querySelector('i');

  if (state.music.playing) {
    icon.className = 'fa-solid fa-pause';
    trackArtworkEl.classList.add('playing');
    document.querySelectorAll('.v-bar').forEach(b => b.classList.add('active'));
    sound.startSynthesizedLofi();
    startMusicCountdown();
    showToast('🎵 30-Minute Victory Music Session Playing!', 'info');
  } else {
    icon.className = 'fa-solid fa-play';
    trackArtworkEl.classList.remove('playing');
    document.querySelectorAll('.v-bar').forEach(b => b.classList.remove('active'));
    sound.stopSynthesizedLofi();
  }
}

function startMusicCountdown() {
  if (state.musicTimerInterval) clearInterval(state.musicTimerInterval);

  state.musicTimerInterval = setInterval(() => {
    if (state.music.playing && state.music.secondsLeft > 0) {
      state.music.secondsLeft--;
      const m = String(Math.floor(state.music.secondsLeft / 60)).padStart(2, '0');
      const s = String(state.music.secondsLeft % 60).padStart(2, '0');
      musicSessionTimerEl.textContent = `${m}:${s}`;

      if (state.music.secondsLeft === 0) {
        toggleMusicPlayback();
        showToast('🏁 30-Minute Victory Music Session Complete! Time for restorative sleep.', 'info');
      }
    }
  }, 1000);
}

const TRACK_NAMES = {
  lofi: { title: 'Chill Lofi Study Sunset', artist: 'KINETIC Victory Synthesizer' },
  synthwave: { title: 'Cyber Focus Synthwave', artist: 'Neon Scholar Beats' },
  ambient: { title: 'Deep Zen Ambient Flow', artist: 'Alpha Brainwave Sanctuary' },
  victory: { title: 'Champion Victory Beats', artist: 'Consistency Mastery Anthem' }
};

function changeTrack(key) {
  state.music.currentTrack = key;
  const meta = TRACK_NAMES[key];
  document.getElementById('currentTrackTitle').textContent = meta.title;
  document.getElementById('currentTrackArtist').textContent = meta.artist;
  sound.playPop();
}

function nextTrack() {
  const keys = Object.keys(TRACK_NAMES);
  let idx = keys.indexOf(state.music.currentTrack);
  idx = (idx + 1) % keys.length;
  document.getElementById('trackPresetSelect').value = keys[idx];
  changeTrack(keys[idx]);
}

function prevTrack() {
  const keys = Object.keys(TRACK_NAMES);
  let idx = keys.indexOf(state.music.currentTrack);
  idx = (idx - 1 + keys.length) % keys.length;
  document.getElementById('trackPresetSelect').value = keys[idx];
  changeTrack(keys[idx]);
}

// 7-Day Consistency Streak & Free Day Award
function simulateFullWeekStreak() {
  state.streak = 7;
  streakCountEl.textContent = '7';
  
  // Highlight all 7 days
  const dots = document.querySelectorAll('.day-dot');
  dots.forEach(d => {
    d.className = 'day-dot done';
    d.innerHTML = '<span class="day-name">Done</span><i class="fa-solid fa-check"></i>';
  });

  document.getElementById('freeDayStatusBox').style.borderColor = '#10b981';
  document.getElementById('freeDayStatusBox').style.background = 'rgba(16, 185, 129, 0.12)';
  document.getElementById('freeDayTitle').textContent = '🎉 FREE DAY UNLOCKED! (7-DAY STREAK CONQUERED)';
  document.getElementById('freeDayDesc').textContent = 'You have maintained 100% daily discipline for a full week. Take tomorrow completely off guilt-free and recharge!';
  
  sound.playChime();
  showToast('👑 7-DAY UNBROKEN STREAK! "FREE DAY" PASS UNLOCKED!', 'success');
  saveState();
}

// Sound FX toggle
document.getElementById('sfxToggleBtn').addEventListener('click', () => {
  state.sfxEnabled = !state.sfxEnabled;
  const icon = document.querySelector('#sfxToggleBtn i');
  icon.className = state.sfxEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
  showToast(state.sfxEnabled ? 'Audio Sound FX: Enabled' : 'Audio Sound FX: Muted', 'info');
});

// Toast notification helper
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  toastContainerEl.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
