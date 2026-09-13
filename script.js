
(function () {
  'use strict';

  // --- CONFIG ---
  const UNLOCK_DATE = new Date('2026-09-17T00:00:00+05:30');
  const SONGS = [
    { title: 'Kaise Mujhe Tum Mil Gayi', src: 'assets/audio/kaise-mujhe-tum-mil-gayi.mp3' },
    { title: 'Happy Birthday', src: 'assets/audio/happy-birthday.mp3' },
    { title: 'Woh Din', src: 'assets/audio/woh-din.mp3' },
    { title: 'Gilehriyaan', src: 'assets/audio/gilehriyaan.mp3' },
  ];

  // Which song plays when you scroll to each section
  // Index matches the SONGS array above
  const SECTION_SONGS = {
    'hero': 1,     // Happy Birthday
    'gallery': 3,  // Gilehriyaan
    'letter': 0,   // Kaise Mujhe Tum Mil Gayi
    'wishes': 2,   // Woh Din
  };

  const GALLERY_SRCS = [];

  // --- DOM REFS ---
  const lockScreen = document.getElementById('lock-screen');
  const mainSite = document.getElementById('main-site');
  const confettiCanvas = document.getElementById('confetti-canvas');

  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMinutes = document.getElementById('cd-minutes');
  const cdSeconds = document.getElementById('cd-seconds');

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  const giftBox = document.getElementById('gift-box');
  const giftBoxIcon = document.getElementById('gift-box-icon');
  const giftContent = document.getElementById('gift-content');

  const musicPlayer = document.getElementById('music-player');
  const playerPlayBtn = document.getElementById('player-play');
  const playerTrackName = document.getElementById('player-track-name');
  const playerProgressBar = document.getElementById('player-progress-bar');
  const playerProgressFill = document.getElementById('player-progress-fill');
  const playerSkipBtn = document.getElementById('player-skip');

  const scrollHealthBar = document.getElementById('scroll-health-bar');

  // --- STATE ---
  let isUnlocked = false;
  let lightboxIndex = 0;
  let currentTrack = 0;
  let audio = null;
  let isPlaying = false;
  let giftOpened = false;
  let userPaused = false;

  // Collect gallery image sources
  document.querySelectorAll('#gallery-grid .gallery-item img').forEach(img => {
    GALLERY_SRCS.push(img.src);
  });

  // ============================================================
  // COUNTDOWN & UNLOCK
  // ============================================================
  function updateCountdown() {
    const now = new Date();
    const diff = UNLOCK_DATE - now;

    if (diff <= 0) {
      if (!isUnlocked) triggerUnlock();
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    cdDays.textContent = String(days).padStart(2, '0');
    cdHours.textContent = String(hours).padStart(2, '0');
    cdMinutes.textContent = String(minutes).padStart(2, '0');
    cdSeconds.textContent = String(seconds).padStart(2, '0');
  }

  function triggerUnlock() {
    isUnlocked = true;

    // Fire confetti
    launchConfetti();

    // Fade out lock screen
    setTimeout(() => {
      lockScreen.classList.add('unlocked');
      mainSite.classList.add('revealed');
    }, 300);

    // Remove lock screen from DOM after animation
    setTimeout(() => {
      lockScreen.style.display = 'none';
      musicPlayer.classList.add('visible');
      // Auto-start Happy Birthday
      startMusic(1);
      // Watch sections for song switching
      initSectionObserver();
    }, 1200);

    // Stop countdown interval
    if (countdownInterval) clearInterval(countdownInterval);
  }

  // Initialize
  let countdownInterval = null;

  function initCountdown() {
    const now = new Date();
    if (now >= UNLOCK_DATE) {
      // Already past unlock — skip lock screen, show main site directly
      lockScreen.style.display = 'none';
      mainSite.classList.add('revealed');
      musicPlayer.classList.add('visible');
      isUnlocked = true;

      // Still play a welcome confetti burst
      setTimeout(launchConfetti, 500);

      // Auto-start Happy Birthday + section observer
      setTimeout(() => {
        startMusic(1);
        initSectionObserver();
      }, 800);
    } else {
      // Start countdown
      updateCountdown();
      countdownInterval = setInterval(updateCountdown, 1000);
    }
  }

  // ============================================================
  // CONFETTI (Custom Canvas — no library)
  // ============================================================
  function launchConfetti() {
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const particles = [];
    const colors = ['#F4C531', '#E8412C', '#3E7CB1', '#FFF7DE', '#FFD700', '#FF6B6B'];
    const PARTICLE_COUNT = 150;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height - confettiCanvas.height,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        opacity: 1,
      });
    }

    let frame = 0;
    const maxFrames = 180; // ~3 seconds at 60fps

    function animate() {
      frame++;
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

      if (frame > maxFrames) {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        return;
      }

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.rotation += p.rotationSpeed;

        // Fade out in last 60 frames
        if (frame > maxFrames - 60) {
          p.opacity = Math.max(0, 1 - (frame - (maxFrames - 60)) / 60);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  // ============================================================
  // GALLERY LIGHTBOX
  // ============================================================
  function openLightbox(index) {
    lightboxIndex = index;
    lightboxImg.src = GALLERY_SRCS[index];
    lightboxImg.alt = document.querySelectorAll('#gallery-grid .gallery-item img')[index].alt;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function prevLightbox() {
    lightboxIndex = (lightboxIndex - 1 + GALLERY_SRCS.length) % GALLERY_SRCS.length;
    lightboxImg.src = GALLERY_SRCS[lightboxIndex];
    lightboxImg.alt = document.querySelectorAll('#gallery-grid .gallery-item img')[lightboxIndex].alt;
  }

  function nextLightbox() {
    lightboxIndex = (lightboxIndex + 1) % GALLERY_SRCS.length;
    lightboxImg.src = GALLERY_SRCS[lightboxIndex];
    lightboxImg.alt = document.querySelectorAll('#gallery-grid .gallery-item img')[lightboxIndex].alt;
  }

  // Lightbox events
  document.querySelectorAll('#gallery-grid .gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      openLightbox(parseInt(item.dataset.index, 10));
    });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(parseInt(item.dataset.index, 10));
      }
    });
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'View photo in lightbox');
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', prevLightbox);
  lightboxNext.addEventListener('click', nextLightbox);

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
  });

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // ============================================================
  // GIFT BOX
  // ============================================================
  function toggleGift() {
    if (!giftOpened) {
      giftOpened = true;
      giftBoxIcon.textContent = '🎉';
      giftBox.querySelector('.gift-box-text').textContent = 'Surprise! 🥳';
      giftContent.classList.add('opened');
    } else {
      giftOpened = false;
      giftBoxIcon.textContent = '🎁';
      giftBox.querySelector('.gift-box-text').textContent = 'Tap to unwrap your surprise!';
      giftContent.classList.remove('opened');
    }
  }

  giftBox.addEventListener('click', toggleGift);
  giftBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleGift();
    }
  });

  // ============================================================
  // MUSIC PLAYER
  // ============================================================
  function initAudio() {
    if (!audio) {
      audio = new Audio();
      audio.addEventListener('ended', () => {
        nextTrack();
      });
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('error', () => {
        playerTrackName.textContent = '⚠️ Could not load: ' + SONGS[currentTrack].title;
      });
    }
  }

  function loadTrack(index) {
    initAudio();
    currentTrack = index;
    audio.src = SONGS[index].src;
    playerTrackName.textContent = SONGS[index].title;
    playerProgressFill.style.width = '0%';
  }

  // Called on unlock — tries to auto-play, falls back to tap prompt
  function startMusic(index) {
    loadTrack(index);
    audio.play().then(() => {
      isPlaying = true;
      playerPlayBtn.textContent = '⏸';
    }).catch(() => {
      // Browser blocked autoplay — prompt user
      playerTrackName.textContent = '🎵 Tap ▶ to play: ' + SONGS[index].title;
      // Start playing on first tap/click anywhere
      function onFirstInteraction() {
        if (!isPlaying && !userPaused) {
          audio.play().then(() => {
            isPlaying = true;
            playerPlayBtn.textContent = '⏸';
            playerTrackName.textContent = SONGS[currentTrack].title;
          }).catch(() => { });
        }
        document.removeEventListener('click', onFirstInteraction);
        document.removeEventListener('touchstart', onFirstInteraction);
      }
      document.addEventListener('click', onFirstInteraction);
      document.addEventListener('touchstart', onFirstInteraction);
    });
  }

  function playPause() {
    initAudio();
    if (!audio.src || audio.src === window.location.href) {
      loadTrack(currentTrack);
    }
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      userPaused = true;
      playerPlayBtn.textContent = '▶';
    } else {
      userPaused = false;
      audio.play().then(() => {
        isPlaying = true;
        playerPlayBtn.textContent = '⏸';
      }).catch(() => {
        playerTrackName.textContent = '⚠️ Could not load: ' + SONGS[currentTrack].title;
      });
    }
  }

  function nextTrack() {
    currentTrack = (currentTrack + 1) % SONGS.length;
    loadTrack(currentTrack);
    if (isPlaying) {
      audio.play().then(() => {
        playerPlayBtn.textContent = '⏸';
      }).catch(() => { });
    }
  }

  // Switch track when scrolling to a mapped section
  function switchToSectionTrack(index) {
    if (currentTrack === index) return;
    if (userPaused) return; // don't force music if user paused
    loadTrack(index);
    audio.play().then(() => {
      isPlaying = true;
      playerPlayBtn.textContent = '⏸';
    }).catch(() => { });
  }

  function updateProgress() {
    if (audio && audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      playerProgressFill.style.width = pct + '%';
    }
  }

  // --- Section Observer: auto-switch songs as you scroll ---
  function initSectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && SECTION_SONGS.hasOwnProperty(entry.target.id)) {
          switchToSectionTrack(SECTION_SONGS[entry.target.id]);
        }
      });
    }, { threshold: 0.35 });

    Object.keys(SECTION_SONGS).forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  // Click on progress bar to seek
  playerProgressBar.addEventListener('click', (e) => {
    if (!audio || !audio.duration) return;
    const rect = playerProgressBar.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  });

  playerPlayBtn.addEventListener('click', playPause);
  playerSkipBtn.addEventListener('click', nextTrack);

  // ============================================================
  // SCROLL HEALTH BAR
  // ============================================================
  function updateScrollBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.min((scrollTop / docHeight) * 100, 100);
    scrollHealthBar.style.width = pct + '%';
  }

  window.addEventListener('scroll', updateScrollBar, { passive: true });

  // ============================================================
  // RESIZE HANDLER
  // ============================================================
  window.addEventListener('resize', () => {
    if (confettiCanvas) {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
  });

  // ============================================================
  // INIT
  // ============================================================
  initCountdown();

})();
