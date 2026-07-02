document.addEventListener('DOMContentLoaded', () => {
  setupSparkles();
  setupFeathers();
  setupCountdown();
  setupCarousel();
  setupOracle();
  setupAudioPlayer();
});

/* ==========================================================================
   Sparkle Cursor Trail
   ========================================================================== */
function setupSparkles() {
  const container = document.getElementById('sparkle-container');
  if (!container) return;

  const sparkleSymbols = ['✦', '✧', '★', '❈', '🌸', '✨'];

  window.addEventListener('mousemove', (e) => {
    // Limit sparkle rate slightly to prevent performance issues
    if (Math.random() > 0.15) return;

    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-particle';
    sparkle.textContent = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
    
    // Position at mouse coords
    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;
    
    // Random direction forces for animation
    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 50;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    
    sparkle.style.setProperty('--dx', `${dx}px`);
    sparkle.style.setProperty('--dy', `${dy}px`);
    
    // Random color tints occasionally
    const hue = Math.random() > 0.5 ? 330 : 45; // Pink/purple or gold
    sparkle.style.color = `hsl(${hue}, 100%, 70%)`;
    
    container.appendChild(sparkle);
    
    // Clean up
    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  });
}

/* ==========================================================================
   Feather Rain
   ========================================================================== */
function setupFeathers() {
  const container = document.getElementById('feather-container');
  if (!container) return;

  const featherCount = 15;

  for (let i = 0; i < featherCount; i++) {
    createFeather(container, true);
  }

  // Keep creating feathers occasionally
  setInterval(() => {
    if (container.children.length < 25) {
      createFeather(container, false);
    }
  }, 2000);
}

function createFeather(container, initialRandomY = false) {
  const feather = document.createElement('div');
  feather.className = 'feather';
  
  // Random horizontal position
  feather.style.left = `${Math.random() * 100}vw`;
  
  // Size variation
  const size = 15 + Math.random() * 25;
  feather.style.width = `${size}px`;
  feather.style.height = `${size}px`;
  
  // Animation duration
  const duration = 6 + Math.random() * 8;
  feather.style.animationDuration = `${duration}s`;
  
  // Delay variation
  feather.style.animationDelay = `${Math.random() * 5}s`;
  
  // Initial Y (to scatter them at the start)
  if (initialRandomY) {
    const startY = Math.random() * 100;
    feather.style.top = `${startY}%`;
  }

  container.appendChild(feather);
  
  // Remove after animation finishes
  setTimeout(() => {
    feather.remove();
  }, (duration + 5) * 1000);
}

/* ==========================================================================
   Countdown Clock
   ========================================================================== */
function setupCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  
  if (!daysEl) return;

  // Let's set the target release date to exactly 90 days from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 90);
  targetDate.setHours(0, 0, 0, 0);

  function updateClock() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      document.querySelector('.countdown-title').textContent = "The Prophecy Has Commenced!";
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   Character Carousel
   ========================================================================== */
function setupCarousel() {
  const cards = document.querySelectorAll('.character-card');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  
  if (cards.length === 0) return;

  let currentIndex = 0;

  function showCard(index) {
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    showCard(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    showCard(currentIndex);
  });

  // Autoplay character cycling every 8 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    showCard(currentIndex);
  }, 8000);
}

/* ==========================================================================
   Winged Naming Oracle
   ========================================================================== */
function setupOracle() {
  const form = document.getElementById('oracle-form');
  const resultDiv = document.getElementById('oracle-result');
  const resultName = document.getElementById('result-name');
  const resultFate = document.getElementById('result-fate');

  if (!form) return;

  const prefixes = [
    "Aurelia", "Malakor", "Seraphina", "Luminara", "Valerius", "Zephyra", 
    "Ignis", "Celestia", "Sanguis", "Aethelgard", "Vespera", "Obsidian"
  ];
  
  const middleNames = [
    "Silver-Breast", "Void-Wing", "Gold-Feather", "Night-Whisper", "Silk-Nectar", 
    "Blood-Healer", "Star-Feeder", "Shadow-Suckler", "Moon-Mother", "Dawn-Keeper", 
    "Nipple-Shield", "Velvet-Touch"
  ];

  const fates = [
    "You are destined to nurse the fledgling Phoenix in the embers of Mt. Pyre. Your heart will burn with forbidden passion.",
    "A dark wing-clipped Shadow Lord will find shelter in your warm embrace, sucking nectar and secrets from your magical chalice.",
    "The High Council of Winged Elders will outlaw your love, but your silver plumage shall shield your beloved in the Darklands.",
    "You shall inherit the sacred Golden Chalice of the Sky Realm, feeding the celestial infants and reigning in pure, velvet ecstasy.",
    "Your wings shall turn obsidian, your milk to venom, as you avenge your clipped brethren. Yet a tender rogue prince shall soothe your broken soul.",
    "You are the chosen wet-nurse of the Dragon-Rider Dynasty, destined to feed the spark of the galaxy while flying through meteor storms."
  ];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('userName').value.trim();
    const monthSelect = document.getElementById('birthMonth').value;

    if (!nameInput) return;

    // A simple hash function to make the result deterministic for the name/month combo
    let sum = 0;
    for (let i = 0; i < nameInput.length; i++) {
      sum += nameInput.charCodeAt(i);
    }
    sum += parseInt(monthSelect) || 0;

    const prefix = prefixes[sum % prefixes.length];
    const middle = middleNames[(sum + 3) % middleNames.length];
    const fate = fates[(sum + 7) % fates.length];

    resultName.textContent = `✦ Lady/Lord ${prefix} ${middle} ✦`;
    resultFate.textContent = fate;
    
    // Show results
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

/* ==========================================================================
   Web Audio Synthesizer (Fantasy Music Loop)
   ========================================================================== */
function setupAudioPlayer() {
  const widget = document.querySelector('.audio-player-widget');
  const btn = document.getElementById('music-toggle-btn');
  
  if (!btn) return;

  let audioCtx = null;
  let isPlaying = false;
  let intervalId = null;
  let noteIndex = 0;

  // Romantic fantasy chord progression (arpeggios)
  // Am9 - Fmaj7 - Cmaj7 - G6
  const arpeggio = [
    // Am9 (A, C, E, G, B)
    220.00, 261.63, 329.63, 392.00, 493.88,
    // Fmaj7 (F, A, C, E)
    174.61, 220.00, 261.63, 329.63,
    // Cmaj7 (C, E, G, B)
    130.81, 164.81, 196.00, 246.94,
    // G6 (G, B, D, E)
    196.00, 246.94, 293.66, 329.63
  ];

  function playNote(freq, time) {
    if (!audioCtx) return;

    // Create oscillator
    const osc = audioCtx.createOscillator();
    // Create gain node for envelope
    const gainNode = audioCtx.createGain();
    
    // Triangle wave for a flute/harp-like gentle tone
    osc.type = 'triangle';
    osc.frequency.value = freq;
    
    // Envelope: quick attack, long decay
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(0.12, time + 0.05); // low volume
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1.2);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start(time);
    osc.stop(time + 1.3);
  }

  function startMusic() {
    // Initialise audio context on user interaction
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    isPlaying = true;
    widget.classList.add('audio-playing');
    btn.innerHTML = '⏸️';

    // Rhythm speed: a note every 300ms
    intervalId = setInterval(() => {
      const nextFreq = arpeggio[noteIndex];
      playNote(nextFreq, audioCtx.currentTime);
      noteIndex = (noteIndex + 1) % arpeggio.length;
    }, 320);
  }

  function stopMusic() {
    isPlaying = false;
    widget.classList.remove('audio-playing');
    btn.innerHTML = '▶️';
    
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  btn.addEventListener('click', () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  });
}
