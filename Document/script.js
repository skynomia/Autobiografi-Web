
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.body.classList.add('dark');
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  const counters = document.querySelectorAll('[data-count]');
  const animateCounter = (el) => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  setTimeout(() => counters.forEach(animateCounter), 900);

  const slideshows = {};

function initSlideshow(id, total, interval) {
  slideshows[id] = { current: 0, total: total, timer: null };
  startAuto(id, interval);
}

function updateSlide(id) {
  const s = slideshows[id];
  document.getElementById('track-' + id).style.transform = `translateX(-${s.current * 100}%)`;
  const dots = document.querySelectorAll('#dots-' + id + ' .slideshow-dot');
  dots.forEach((d, i) => d.classList.toggle('active', i === s.current));
}

function moveSlide(id, dir) {
  const s = slideshows[id];
  s.current = (s.current + dir + s.total) % s.total;
  updateSlide(id);
  resetAuto(id);
}

function goSlide(id, idx) {
  slideshows[id].current = idx;
  updateSlide(id);
  resetAuto(id);
}

function startAuto(id, interval) {
  slideshows[id].timer = setInterval(() => moveSlide(id, 1), interval);
}

function startSite() {
  document.getElementById('audioIntro').style.display = 'none';
  audio.play();
  isPlaying = true;
  audioToggle.textContent = '🎧';
}

function resetAuto(id) {
  clearInterval(slideshows[id].timer);
  startAuto(id, 3500);
}
initSlideshow('1', 5, 3000);
initSlideshow('2', 5, 3700);
initSlideshow('3', 5, 4400);

  const audio = document.getElementById('bgAudio');
  const audioToggle = document.getElementById('audioToggle');
  let isPlaying = false;

  audio.volume = 0.3;

  window.addEventListener('click', function startAudio() {
    if (!isPlaying) {
      audio.play();
      isPlaying = true;
      audioToggle.textContent = '🎧';
      window.removeEventListener('click', startAudio);
    }
  }, { once: true });

  function toggleAudio() {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      audioToggle.textContent = '🔇';
    } else {
      audio.play();
      isPlaying = true;
      audioToggle.textContent = '🎧';
    }
  }