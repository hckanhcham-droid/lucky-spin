/**
 * ========================================================
 * កងបង្វិលសំណាង - LUCKY SPIN WHEEL (app.js)
 * High-performance Canvas Wheel, Web Audio API, Confetti & i18n
 * ========================================================
 */

// ---------------- Translations (i18n) ----------------
const translations = {
  km: {
    appTitle: "កងបង្វិលសំណាង",
    appSubtitle: "បង្វិលឈ្នះរង្វាន់អស្ចារ្យជារៀងរាល់ថ្ងៃ!",
    spinHub: "បង្វិល<br><small>SPIN</small>",
    spinNow: "បង្វិលឥឡូវនេះ (SPIN NOW)",
    spinDuration: "ល្បឿនបង្វិល៖",
    removeWonOption: "លុបរង្វាន់ចេញក្រោយត្រូវ",
    tabPrizes: "បញ្ជីរង្វាន់",
    tabHistory: "ប្រវត្តិអ្នកឈ្នះ",
    presetLabel: "គំរូរង្វាន់រហ័ស (Presets):",
    addNewPrize: "➕ បន្ថែមរង្វាន់ថ្មី",
    addPrizeBtn: "បន្ថែមទៅក្នុងកង",
    prizesListTitle: "រង្វាន់ទាំងអស់លើកង៖",
    shuffle: "ច្របល់",
    reset: "ដើម",
    historyTitle: "ប្រវត្តិបង្វិលឈ្នះរង្វាន់",
    historySub: "រាល់លទ្ធផលដែលបានបង្វិលកន្លងមក",
    export: "ទាញយក",
    clear: "សម្អាត",
    noHistory: "មិនទាន់មានប្រវត្តិបង្វិលនៅឡើយទេ។<br>សូមចុចបង្វិលកងដើម្បីផ្សងសំណាង!",
    congrats: "សូមអបអរសាទរ!",
    youWon: "អ្នកបានឈ្នះរង្វាន់៖",
    spinAgain: "បង្វិលម្តងទៀត (SPIN AGAIN)",
    removeWonPrize: "លុបរង្វាន់នេះចេញពីកង",
    editPrizeTitle: "កែប្រែរង្វាន់",
    labelPrizeName: "ឈ្មោះរង្វាន់៖",
    labelPrizeIcon: "Emoji / រូបតំណាង៖",
    labelPrizeColor: "ពណ៌កង៖",
    labelPrizeWeight: "ទម្ងន់/ឱកាស (1 - 100)៖",
    cancel: "បោះបង់",
    save: "រក្សាទុក",
    footerText: "រចនាឡើងជាមួយ HTML5 Canvas, Web Audio & Vercel Ready",
    weightLabel: "ឱកាស",
    confirmClearHistory: "តើអ្នកប្រាកដជាចង់លុបប្រវត្តិអ្នកឈ្នះទាំងអស់មែនទេ?",
    confirmResetPrizes: "តើអ្នកចង់កំណត់រង្វាន់ទៅតាមដើមវិញមែនទេ?",
    needMinPrizes: "កងត្រូវមានរង្វាន់យ៉ាងតិច ២ ដើម្បីអាចបង្វិលបាន!",
    spinningAlert: "កងកំពុងតែបង្វិល សូមរង់ចាំបន្តិច!"
  },
  en: {
    appTitle: "Lucky Spin Wheel",
    appSubtitle: "Spin to win exciting prizes every day!",
    spinHub: "SPIN<br><small>NOW</small>",
    spinNow: "SPIN NOW",
    spinDuration: "Spin Speed:",
    removeWonOption: "Remove prize after winning",
    tabPrizes: "Prize List",
    tabHistory: "Winners History",
    presetLabel: "Quick Presets:",
    addNewPrize: "➕ Add New Prize",
    addPrizeBtn: "Add to Wheel",
    prizesListTitle: "All Prizes on Wheel:",
    shuffle: "Shuffle",
    reset: "Reset",
    historyTitle: "Spin Winners History",
    historySub: "All prize results from past spins",
    export: "Export",
    clear: "Clear",
    noHistory: "No spin history recorded yet.<br>Click SPIN to test your luck!",
    congrats: "Congratulations!",
    youWon: "You have won:",
    spinAgain: "SPIN AGAIN",
    removeWonPrize: "Remove this prize from wheel",
    editPrizeTitle: "Edit Prize",
    labelPrizeName: "Prize Name:",
    labelPrizeIcon: "Emoji / Icon:",
    labelPrizeColor: "Slice Color:",
    labelPrizeWeight: "Weight / Probability (1 - 100):",
    cancel: "Cancel",
    save: "Save",
    footerText: "Crafted with HTML5 Canvas, Web Audio & Vercel Ready",
    weightLabel: "Weight",
    confirmClearHistory: "Are you sure you want to clear all winning history?",
    confirmResetPrizes: "Reset prizes to default preset?",
    needMinPrizes: "Wheel must have at least 2 prizes to spin!",
    spinningAlert: "The wheel is spinning, please wait!"
  }
};

// ---------------- Preset Collections ----------------
const PRESETS = {
  mega: [
    { id: "1", name: "iPhone 16 Pro Max", icon: "📱", color: "#EF4444", weight: 1 },
    { id: "2", name: "លុយសុទ្ធ $1,000", icon: "💵", color: "#F59E0B", weight: 1 },
    { id: "3", name: "Honda Dream 2025", icon: "🏍️", color: "#10B981", weight: 1 },
    { id: "4", name: "Smart TV 55 inch", icon: "📺", color: "#3B82F6", weight: 2 },
    { id: "5", name: "AirPods Pro 2", icon: "🎧", color: "#8B5CF6", weight: 3 },
    { id: "6", name: "វ៉ូឆ័រទិញទំនិញ $100", icon: "🎟️", color: "#EC4899", weight: 4 },
    { id: "7", name: "អាវយឺត VIP Lucky", icon: "👕", color: "#14B8A6", weight: 6 },
    { id: "8", name: "ព្យាយាមម្តងទៀត", icon: "🍀", color: "#64748B", weight: 8 }
  ],
  discount: [
    { id: "d1", name: "បញ្ចុះតម្លៃ 50%", icon: "🔥", color: "#EF4444", weight: 1 },
    { id: "d2", name: "បញ្ចុះតម្លៃ 30%", icon: "🎉", color: "#F97316", weight: 2 },
    { id: "d3", name: "បញ្ចុះតម្លៃ 20%", icon: "🏷️", color: "#F59E0B", weight: 4 },
    { id: "d4", name: "បញ្ចុះតម្លៃ 10%", icon: "✨", color: "#10B981", weight: 8 },
    { id: "d5", name: "ហ្វ្រីដឹកជញ្ជូន (Free Ship)", icon: "🚚", color: "#3B82F6", weight: 10 },
    { id: "d6", name: "ទិញ 1 ថែម 1", icon: "🎁", color: "#8B5CF6", weight: 3 },
    { id: "d7", name: "Gift Card $10", icon: "💳", color: "#EC4899", weight: 5 },
    { id: "d8", name: "សូមអរគុណ (Thank you)", icon: "🙏", color: "#64748B", weight: 10 }
  ],
  party: [
    { id: "p1", name: "ផឹក 1 កែវពេញ", icon: "🍺", color: "#EF4444", weight: 1 },
    { id: "p2", name: "ច្រៀង 1 បទពេញ", icon: "🎤", color: "#F59E0B", weight: 1 },
    { id: "p3", name: "រាំក្បាច់ពិសេស 1 នាទី", icon: "💃", color: "#10B981", weight: 1 },
    { id: "p4", name: "ឆ្លងផុតដោយសុវត្ថិភាព", icon: "🛡️", color: "#3B82F6", weight: 2 },
    { id: "p5", name: "ផឹកកន្លះកែវ", icon: "🍻", color: "#8B5CF6", weight: 2 },
    { id: "p6", name: "ឱ្យអ្នកអង្គុយខាងឆ្វេងផឹក", icon: "👈", color: "#EC4899", weight: 1 },
    { id: "p7", name: "ឱ្យអ្នកអង្គុយខាងស្តាំផឹក", icon: "👉", color: "#14B8A6", weight: 1 },
    { id: "p8", name: "លើកដាច់ទាំងអស់គ្នា!", icon: "🥂", color: "#F43F5E", weight: 1 }
  ],
  lucky: [
    { id: "l1", name: "លេខសំណាង 01", icon: "⭐", color: "#E11D48", weight: 1 },
    { id: "l2", name: "លេខសំណាង 02", icon: "🌟", color: "#D97706", weight: 1 },
    { id: "l3", name: "លេខសំណាង 03", icon: "✨", color: "#059669", weight: 1 },
    { id: "l4", name: "លេខសំណាង 04", icon: "💫", color: "#2563EB", weight: 1 },
    { id: "l5", name: "លេខសំណាង 05", icon: "🔮", color: "#7C3AED", weight: 1 },
    { id: "l6", name: "លេខសំណាង 06", icon: "🎯", color: "#DB2777", weight: 1 },
    { id: "l7", name: "លេខសំណាង 07", icon: "💎", color: "#0D9488", weight: 1 },
    { id: "l8", name: "លេខសំណាង 08", icon: "👑", color: "#EA580C", weight: 1 }
  ]
};

// ---------------- Sound Synthesizer (Web Audio API) ----------------
class SoundController {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = localStorage.getItem("soundEnabled") !== "false";
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  playTick(velocity = 1) {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      const freq = 650 + Math.random() * 150 + velocity * 100;
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch (e) {
      console.warn("Audio tick error:", e);
    }
  }

  playWinFanfare() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 chords
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.12 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.8);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.85);
      });
    } catch (e) {
      console.warn("Fanfare error:", e);
    }
  }

  toggle() {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem("soundEnabled", this.soundEnabled);
    return this.soundEnabled;
  }
}

// ---------------- Confetti Particles ----------------
class ConfettiEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.animId = null;
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth * window.devicePixelRatio;
    this.canvas.height = this.canvas.offsetHeight * window.devicePixelRatio;
  }

  blast(count = 120) {
    this.resize();
    this.particles = [];
    const colors = ["#F59E0B", "#EF4444", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899", "#FCD34D", "#FFFFFF"];
    const w = this.canvas.width;
    const h = this.canvas.height;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: w / 2,
        y: h * 0.45,
        vx: (Math.random() - 0.5) * 22 * window.devicePixelRatio,
        vy: (Math.random() - 1.2) * 20 * window.devicePixelRatio,
        size: (Math.random() * 8 + 6) * window.devicePixelRatio,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        gravity: 0.45 * window.devicePixelRatio,
        drag: 0.96,
        alpha: 1,
        decay: Math.random() * 0.008 + 0.004,
        shape: Math.random() > 0.4 ? "rect" : "circle"
      });
    }

    if (this.animId) cancelAnimationFrame(this.animId);
    this.render();
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let activeCount = 0;

    for (let p of this.particles) {
      if (p.alpha <= 0.01) continue;
      activeCount++;

      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.alpha = Math.max(0, p.alpha - p.decay);

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;

      if (p.shape === "rect") {
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    if (activeCount > 0) {
      this.animId = requestAnimationFrame(() => this.render());
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  clear() {
    if (this.animId) cancelAnimationFrame(this.animId);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

// ---------------- Main Application Controller ----------------
class LuckyWheelApp {
  constructor() {
    this.lang = localStorage.getItem("luckyWheelLang") || "km";
    this.sound = new SoundController();
    
    // Canvas & Stage
    this.canvas = document.getElementById("wheelCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.pointerEl = document.getElementById("tickerPointer");
    this.lightsRing = document.getElementById("lightsRing");
    
    // Confetti
    this.confetti = new ConfettiEngine(document.getElementById("confettiCanvas"));

    // State
    this.prizes = this.loadPrizes();
    this.history = this.loadHistory();
    this.isSpinning = false;
    this.currentAngle = 0; // in radians
    this.lastTickIndex = -1;
    this.lastWonPrize = null;

    this.initLights();
    this.initEventListeners();
    this.updateLanguageUI();
    this.renderPrizeList();
    this.renderHistory();
    this.drawWheel();

    // Auto resize
    window.addEventListener("resize", () => this.drawWheel());
  }

  // ---------------- Lights Marquee ----------------
  initLights() {
    const totalBulbs = 28;
    this.lightsRing.innerHTML = "";
    this.bulbs = [];

    for (let i = 0; i < totalBulbs; i++) {
      const angle = (i / totalBulbs) * (Math.PI * 2);
      const bulb = document.createElement("div");
      bulb.className = `light-bulb ${i % 2 === 0 ? "alt" : ""}`;
      
      // Radius percentage from center
      const r = 50; // percentage
      const x = 50 + r * Math.cos(angle);
      const y = 50 + r * Math.sin(angle);
      bulb.style.left = `${x}%`;
      bulb.style.top = `${y}%`;

      this.lightsRing.appendChild(bulb);
      this.bulbs.push(bulb);
    }

    this.lightsInterval = setInterval(() => {
      if (!this.isSpinning) {
        this.bulbs.forEach((b) => b.classList.toggle("off"));
      }
    }, 700);
  }

  // ---------------- Storage ----------------
  loadPrizes() {
    try {
      const stored = localStorage.getItem("luckyWheelPrizes");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= 2) return parsed;
      }
    } catch (e) {
      console.warn("Error parsing prizes from storage:", e);
    }
    return [...PRESETS.mega];
  }

  savePrizes() {
    localStorage.setItem("luckyWheelPrizes", JSON.stringify(this.prizes));
    this.renderPrizeList();
    this.drawWheel();
  }

  loadHistory() {
    try {
      const stored = localStorage.getItem("luckyWheelHistory");
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Error loading history:", e);
    }
    return [];
  }

  saveHistory() {
    localStorage.setItem("luckyWheelHistory", JSON.stringify(this.history));
    this.renderHistory();
  }

  // ---------------- Wheel Math & Drawing ----------------
  getTotalWeight() {
    return this.prizes.reduce((sum, p) => sum + (Number(p.weight) || 1), 0);
  }

  drawWheel() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height) || 600;

    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;
    this.ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 14;

    this.ctx.clearRect(0, 0, size, size);

    const totalWeight = this.getTotalWeight();
    const sliceCount = this.prizes.length;

    if (sliceCount === 0) return;

    // Draw Wheel Outer Rim
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius + 8, 0, Math.PI * 2);
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = "#F59E0B";
    this.ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
    this.ctx.shadowBlur = 15;
    this.ctx.stroke();
    this.ctx.restore();

    let startAngle = this.currentAngle;

    for (let i = 0; i < sliceCount; i++) {
      const prize = this.prizes[i];
      const sliceAngle = ((Number(prize.weight) || 1) / totalWeight) * (Math.PI * 2);
      const endAngle = startAngle + sliceAngle;

      // Draw Slice Sector
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.moveTo(cx, cy);
      this.ctx.arc(cx, cy, radius, startAngle, endAngle);
      this.ctx.closePath();

      // Radial slice gradient for metallic 3D depth
      const grad = this.ctx.createRadialGradient(cx, cy, radius * 0.15, cx, cy, radius);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.2, prize.color || "#F59E0B");
      grad.addColorStop(1, this.darkenColor(prize.color || "#F59E0B", 30));

      this.ctx.fillStyle = grad;
      this.ctx.fill();

      // Slice separator lines
      this.ctx.lineWidth = 2.5;
      this.ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      this.ctx.stroke();
      this.ctx.restore();

      // Outer Rim Pegs / Brass Pins
      const pegX = cx + (radius - 4) * Math.cos(startAngle);
      const pegY = cy + (radius - 4) * Math.sin(startAngle);
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(pegX, pegY, 5, 0, Math.PI * 2);
      this.ctx.fillStyle = "#FEF08A";
      this.ctx.shadowColor = "#F59E0B";
      this.ctx.shadowBlur = 6;
      this.ctx.fill();
      this.ctx.lineWidth = 1.5;
      this.ctx.strokeStyle = "#78350F";
      this.ctx.stroke();
      this.ctx.restore();

      // Prize Text & Emoji Drawing
      this.ctx.save();
      this.ctx.translate(cx, cy);
      this.ctx.rotate(startAngle + sliceAngle / 2);

      // Emoji/Icon
      const iconDist = radius * 0.82;
      this.ctx.font = `${Math.max(14, radius * 0.09)}px sans-serif`;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(prize.icon || "🎁", iconDist, 0);

      // Label Text
      const textDist = radius * 0.52;
      const fontSize = Math.max(12, Math.min(18, (radius * 0.08) * (8 / Math.max(6, sliceCount))));
      this.ctx.font = `bold ${fontSize}px 'Kantumruy Pro', sans-serif`;
      this.ctx.fillStyle = "#FFFFFF";
      this.ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
      this.ctx.shadowBlur = 5;
      this.ctx.shadowOffsetX = 1;
      this.ctx.shadowOffsetY = 1;

      // Truncate text if long
      let text = prize.name;
      if (text.length > 16) text = text.slice(0, 15) + "…";
      this.ctx.fillText(text, textDist, 0);

      this.ctx.restore();

      startAngle = endAngle;
    }

    // Inner Center Metallic Ring
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius * 0.22, 0, Math.PI * 2);
    this.ctx.fillStyle = "rgba(15, 17, 26, 0.85)";
    this.ctx.fill();
    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = "#F59E0B";
    this.ctx.stroke();
    this.ctx.restore();
  }

  darkenColor(hex, percent) {
    let num = parseInt(hex.replace("#", ""), 16);
    let amt = Math.round(2.55 * percent);
    let R = (num >> 16) - amt;
    let G = ((num >> 8) & 0x00ff) - amt;
    let B = (num & 0x0000ff) - amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 0 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

  // ---------------- Spinning Engine ----------------
  spin() {
    if (this.isSpinning) return;
    if (this.prizes.length < 2) {
      alert(translations[this.lang].needMinPrizes);
      return;
    }

    this.isSpinning = true;
    document.getElementById("mainSpinBtn").disabled = true;
    document.getElementById("centerSpinBtn").disabled = true;
    this.sound.init();

    // Determine winning slice based on weighted random
    const totalWeight = this.getTotalWeight();
    let randomWeight = Math.random() * totalWeight;
    let winningIndex = 0;
    let accumulatedWeight = 0;

    for (let i = 0; i < this.prizes.length; i++) {
      accumulatedWeight += Number(this.prizes[i].weight) || 1;
      if (randomWeight <= accumulatedWeight) {
        winningIndex = i;
        break;
      }
    }

    const wonPrize = this.prizes[winningIndex];
    this.lastWonPrize = wonPrize;

    // Calculate angle where winning slice rests under pointer (12 o'clock = -PI/2)
    const pointerAngle = -Math.PI / 2;
    let currentSliceStart = 0;
    for (let i = 0; i < winningIndex; i++) {
      currentSliceStart += ((Number(this.prizes[i].weight) || 1) / totalWeight) * (Math.PI * 2);
    }
    const currentSliceSize = ((Number(wonPrize.weight) || 1) / totalWeight) * (Math.PI * 2);
    
    // Land randomly within the middle 70% of the slice for realism
    const randomOffsetInSlice = currentSliceSize * (0.15 + Math.random() * 0.7);
    const targetSliceAngle = currentSliceStart + randomOffsetInSlice;

    // We want: (currentAngle_end + targetSliceAngle) % (2PI) = pointerAngle % (2PI)
    // Normalize angles:
    const durationSeconds = parseFloat(document.getElementById("spinDurationSelect").value) || 5;
    const durationMs = durationSeconds * 1000;
    const fullRevolutions = 5 + Math.floor(durationSeconds * 1.5); // 5 to 15 full spins
    
    // Compute total target angle:
    const twoPi = Math.PI * 2;
    const currentNorm = ((this.currentAngle % twoPi) + twoPi) % twoPi;
    const targetNorm = ((pointerAngle - targetSliceAngle) % twoPi + twoPi) % twoPi;
    let delta = targetNorm - currentNorm;
    if (delta < 0) delta += twoPi;
    const totalRotation = fullRevolutions * twoPi + delta;

    const startAngle = this.currentAngle;
    const finalAngle = startAngle + totalRotation;
    const startTime = performance.now();

    // Fast light chasing during spin
    let lightStep = 0;
    const lightInterval = setInterval(() => {
      if (!this.isSpinning) {
        clearInterval(lightInterval);
        return;
      }
      this.bulbs.forEach((b, idx) => {
        b.classList.toggle("off", (idx + lightStep) % 3 === 0);
      });
      lightStep++;
    }, 60);

    // Animation loop using ease-out cubic-bezier
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      // Ease-out quintic / cubic formula for ultra-smooth realistic deceleration
      const ease = 1 - Math.pow(1 - progress, 3.8);
      this.currentAngle = startAngle + totalRotation * ease;

      // Detect slice pins crossing top pointer needle
      const normalizedPointer = (pointerAngle - this.currentAngle) % twoPi;
      const angleUnderPointer = (normalizedPointer + twoPi) % twoPi;
      
      let cursor = 0;
      let activeIndex = 0;
      for (let i = 0; i < this.prizes.length; i++) {
        const sliceSize = ((Number(this.prizes[i].weight) || 1) / totalWeight) * twoPi;
        if (angleUnderPointer >= cursor && angleUnderPointer < cursor + sliceSize) {
          activeIndex = i;
          break;
        }
        cursor += sliceSize;
      }

      if (activeIndex !== this.lastTickIndex) {
        this.lastTickIndex = activeIndex;
        // Pointer flick animation
        this.pointerEl.classList.remove("tick");
        void this.pointerEl.offsetWidth; // trigger reflow
        this.pointerEl.classList.add("tick");
        // Audio tick sound
        this.sound.playTick(1 - progress);
      }

      this.drawWheel();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        clearInterval(lightInterval);
        this.currentAngle = finalAngle;
        this.drawWheel();
        this.pointerEl.classList.remove("tick");
        this.onSpinComplete(wonPrize);
      }
    };

    requestAnimationFrame(animate);
  }

  onSpinComplete(prize) {
    this.isSpinning = false;
    document.getElementById("mainSpinBtn").disabled = false;
    document.getElementById("centerSpinBtn").disabled = false;

    // Sound fanfare
    this.sound.playWinFanfare();

    // Record winner in history
    const now = new Date();
    const winRecord = {
      id: Date.now().toString(),
      prizeId: prize.id,
      name: prize.name,
      icon: prize.icon || "🎁",
      color: prize.color,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: now.toLocaleDateString()
    };
    this.history.unshift(winRecord);
    this.saveHistory();

    // Show Winner Celebration Modal
    this.showWinnerModal(prize, winRecord);

    // If auto-remove option enabled
    const removeWonToggle = document.getElementById("removeWonToggle");
    if (removeWonToggle.checked && this.prizes.length > 2) {
      this.removePrize(prize.id, false);
    }
  }

  // ---------------- Winner Modal & Confetti ----------------
  showWinnerModal(prize, record) {
    const modal = document.getElementById("winnerModal");
    document.getElementById("wonPrizeIcon").textContent = prize.icon || "🎉";
    document.getElementById("wonPrizeTitle").textContent = prize.name;
    document.getElementById("wonPrizeTime").textContent = `${record.date} • ${record.time}`;

    modal.classList.add("active");
    this.confetti.blast(150);
  }

  closeWinnerModal() {
    const modal = document.getElementById("winnerModal");
    modal.classList.remove("active");
    this.confetti.clear();
  }

  // ---------------- UI & Prize List Management ----------------
  renderPrizeList() {
    const container = document.getElementById("prizeItemsContainer");
    const countBadge = document.getElementById("prizeCountBadge");
    container.innerHTML = "";
    countBadge.textContent = this.prizes.length;

    const totalWeight = this.getTotalWeight();

    this.prizes.forEach((prize) => {
      const percentage = Math.round(((Number(prize.weight) || 1) / totalWeight) * 100);
      const item = document.createElement("div");
      item.className = "prize-item";
      item.style.borderLeftColor = prize.color || "#F59E0B";

      item.innerHTML = `
        <div class="prize-info">
          <span class="prize-emoji">${prize.icon || "🎁"}</span>
          <span class="prize-name" title="${prize.name}">${prize.name}</span>
        </div>
        <div class="prize-meta">
          <span class="prize-chance" title="${translations[this.lang].weightLabel}: ${prize.weight}">${percentage}%</span>
          <button class="item-btn edit-btn" data-id="${prize.id}" title="Edit">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button class="item-btn delete-btn" data-id="${prize.id}" title="Delete">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      `;

      // Item edit & delete clicks
      item.querySelector(".edit-btn").addEventListener("click", () => this.openEditModal(prize.id));
      item.querySelector(".delete-btn").addEventListener("click", () => this.removePrize(prize.id));

      container.appendChild(item);
    });
  }

  addPrize(name, icon, color, weight) {
    if (!name.trim()) return;
    const newPrize = {
      id: Date.now().toString(),
      name: name.trim(),
      icon: icon.trim() || "🎁",
      color: color || "#F59E0B",
      weight: Math.max(1, parseInt(weight) || 1)
    };
    this.prizes.push(newPrize);
    this.savePrizes();
  }

  removePrize(id, confirmUser = true) {
    if (this.prizes.length <= 2) {
      alert(translations[this.lang].needMinPrizes);
      return;
    }
    this.prizes = this.prizes.filter((p) => p.id !== id);
    this.savePrizes();
  }

  shufflePrizes() {
    for (let i = this.prizes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.prizes[i], this.prizes[j]] = [this.prizes[j], this.prizes[i]];
    }
    this.savePrizes();
  }

  applyPreset(presetKey) {
    if (PRESETS[presetKey]) {
      this.prizes = JSON.parse(JSON.stringify(PRESETS[presetKey]));
      this.savePrizes();
      document.querySelectorAll(".btn-preset").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.preset === presetKey);
      });
    }
  }

  // ---------------- Edit Prize Modal ----------------
  openEditModal(id) {
    const prize = this.prizes.find((p) => p.id === id);
    if (!prize) return;

    document.getElementById("editPrizeId").value = prize.id;
    document.getElementById("editPrizeName").value = prize.name;
    document.getElementById("editPrizeIcon").value = prize.icon || "🎁";
    document.getElementById("editPrizeColor").value = prize.color || "#F59E0B";
    document.getElementById("editPrizeWeight").value = prize.weight || 1;

    document.getElementById("editPrizeModal").classList.add("active");
  }

  closeEditModal() {
    document.getElementById("editPrizeModal").classList.remove("active");
  }

  // ---------------- History Management ----------------
  renderHistory() {
    const container = document.getElementById("historyContainer");
    const countBadge = document.getElementById("historyCountBadge");
    countBadge.textContent = this.history.length;

    if (this.history.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🎯</div>
          <p>${translations[this.lang].noHistory}</p>
        </div>
      `;
      return;
    }

    container.innerHTML = "";
    this.history.forEach((h) => {
      const el = document.createElement("div");
      el.className = "history-item";
      el.innerHTML = `
        <div class="history-main">
          <span style="font-size: 1.3rem;">${h.icon || "🎁"}</span>
          <div>
            <div class="history-name">${h.name}</div>
            <div class="history-time">${h.date} • ${h.time}</div>
          </div>
        </div>
      `;
      container.appendChild(el);
    });
  }

  exportHistoryCSV() {
    if (this.history.length === 0) return;
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += "Index,Prize,Date,Time\n";

    this.history.forEach((h, index) => {
      csvContent += `"${index + 1}","${h.name}","${h.date}","${h.time}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `lucky_wheel_winners_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  clearHistory() {
    if (confirm(translations[this.lang].confirmClearHistory)) {
      this.history = [];
      this.saveHistory();
    }
  }

  // ---------------- Language & i18n ----------------
  toggleLanguage() {
    this.lang = this.lang === "km" ? "en" : "km";
    localStorage.setItem("luckyWheelLang", this.lang);
    this.updateLanguageUI();
  }

  updateLanguageUI() {
    const t = translations[this.lang];
    document.getElementById("langLabel").textContent = this.lang === "km" ? "ខ្មែរ" : "English";
    document.querySelector(".lang-flag").textContent = this.lang === "km" ? "🇰🇭" : "🇺🇸";

    // Text translations
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (t[key]) {
        el.innerHTML = t[key];
      }
    });

    this.renderPrizeList();
    this.renderHistory();
    this.drawWheel();
  }

  // ---------------- Event Listeners ----------------
  initEventListeners() {
    // Spin Buttons
    document.getElementById("mainSpinBtn").addEventListener("click", () => this.spin());
    document.getElementById("centerSpinBtn").addEventListener("click", () => this.spin());

    // Sound Toggle Button
    const soundBtn = document.getElementById("soundToggleBtn");
    const soundOn = document.getElementById("soundIconOn");
    const soundOff = document.getElementById("soundIconOff");

    const updateSoundIcons = (enabled) => {
      soundOn.classList.toggle("hidden", !enabled);
      soundOff.classList.toggle("hidden", enabled);
    };
    updateSoundIcons(this.sound.soundEnabled);

    soundBtn.addEventListener("click", () => {
      const enabled = this.sound.toggle();
      updateSoundIcons(enabled);
    });

    // Fullscreen Toggle
    document.getElementById("fullscreenBtn").addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Language Toggle
    document.getElementById("langToggleBtn").addEventListener("click", () => this.toggleLanguage());

    // Panel Tabs
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));

        btn.classList.add("active");
        const targetTab = document.getElementById(btn.dataset.tab);
        if (targetTab) targetTab.classList.add("active");
      });
    });

    // Preset Buttons
    document.querySelectorAll(".btn-preset").forEach((btn) => {
      btn.addEventListener("click", () => this.applyPreset(btn.dataset.preset));
    });

    // Add Prize Form
    document.getElementById("addPrizeForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("prizeNameInput").value;
      const icon = document.getElementById("prizeIconInput").value;
      const color = document.getElementById("prizeColorInput").value;
      const weight = document.getElementById("prizeWeightInput").value;

      this.addPrize(name, icon, color, weight);

      // Reset form fields
      document.getElementById("prizeNameInput").value = "";
      document.getElementById("prizeIconInput").value = "🎁";
      // Pick random next color
      const palette = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899", "#14B8A6"];
      document.getElementById("prizeColorInput").value = palette[Math.floor(Math.random() * palette.length)];
    });

    // Shuffle & Reset buttons
    document.getElementById("shufflePrizesBtn").addEventListener("click", () => this.shufflePrizes());
    document.getElementById("resetPrizesBtn").addEventListener("click", () => {
      if (confirm(translations[this.lang].confirmResetPrizes)) {
        this.applyPreset("mega");
      }
    });

    // History Buttons
    document.getElementById("exportCsvBtn").addEventListener("click", () => this.exportHistoryCSV());
    document.getElementById("clearHistoryBtn").addEventListener("click", () => this.clearHistory());

    // Winner Modal Buttons
    document.getElementById("closeModalBtn").addEventListener("click", () => this.closeWinnerModal());
    document.getElementById("removeThisPrizeBtn").addEventListener("click", () => {
      if (this.lastWonPrize) {
        this.removePrize(this.lastWonPrize.id);
      }
      this.closeWinnerModal();
    });

    // Edit Prize Modal
    document.getElementById("closeEditModalBtn").addEventListener("click", () => this.closeEditModal());
    document.getElementById("cancelEditBtn").addEventListener("click", () => this.closeEditModal());
    document.getElementById("editPrizeForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("editPrizeId").value;
      const prize = this.prizes.find((p) => p.id === id);
      if (prize) {
        prize.name = document.getElementById("editPrizeName").value.trim();
        prize.icon = document.getElementById("editPrizeIcon").value.trim() || "🎁";
        prize.color = document.getElementById("editPrizeColor").value;
        prize.weight = Math.max(1, parseInt(document.getElementById("editPrizeWeight").value) || 1);
        this.savePrizes();
      }
      this.closeEditModal();
    });

    // Keyboard Space to Spin
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space" && e.target.tagName !== "INPUT" && !this.isSpinning) {
        e.preventDefault();
        this.spin();
      }
    });
  }
}

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  window.app = new LuckyWheelApp();
});
