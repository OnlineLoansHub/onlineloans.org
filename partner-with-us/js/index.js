function reviewsAnimation() {
  const container = document.querySelector('.reviews-list');
  const items = document.querySelectorAll('.reviews-list-item');
  const prevBtn = document.querySelector('.review-btn-prev');
  const nextBtn = document.querySelector('.review-btn-next');

  let currentIndex = 0;
  let intervalId;
  const slideDuration = 3000;

  // Инициализация
  function init() {
    updatePosition();
    updateButtons();
    startAutoSlide();

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updatePosition();
      }
      resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < items.length - 1) {
        currentIndex++;
        updatePosition();
      }
      resetAutoSlide();
    });

    container.addEventListener('mouseenter', stopAutoSlide);
    container.addEventListener('mouseleave', startAutoSlide);
  }

  function updatePosition() {
    const offset = -currentIndex * 100;
    items.forEach((item) => {
      item.style.transform = `translateX(${offset}%)`;
    });
    updateButtons();
  }

  function updateButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === items.length - 1;
  }

  function startAutoSlide() {
    stopAutoSlide();
    intervalId = setInterval(() => {
      if (currentIndex < items.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updatePosition();
    }, slideDuration);
  }

  function stopAutoSlide() {
    if (intervalId) {
      clearInterval(intervalId);
    }
  }

  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  init();
}

function addSliderAnimation() {
  const slidesContainer = document.querySelector('.slides-container');
  const slideBlocks = document.querySelectorAll('.slide-block');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const dots = document.querySelectorAll('.slider-dots button');

  let currentIndex = 0;
  const totalBlocks = slideBlocks.length;

  function updateArrows() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalBlocks - 1;

    prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
    prevBtn.style.cursor = prevBtn.disabled ? 'not-allowed' : 'pointer';
    nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    nextBtn.style.cursor = nextBtn.disabled ? 'not-allowed' : 'pointer';
  }

  function goToBlock(index) {
    if (index < 0 || index >= totalBlocks) return;

    currentIndex = index;
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    updateArrows();
  }

  goToBlock(0);

  prevBtn.addEventListener('click', () => {
    if (!prevBtn.disabled) goToBlock(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    if (!nextBtn.disabled) goToBlock(currentIndex + 1);
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'));
      goToBlock(index);
    });
  });
}

function saveDataToGoogleForm() {
  document.querySelector('.header-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = {
      name: document.querySelector('[data-i18n="header.form.name"]').value,
      email: document.querySelector('[data-i18n="header.form.email"]').value,
      phone: document.querySelector('[data-i18n="header.form.phone"]').value,
      site: document.querySelector('[data-i18n="header.form.site"]').value,
      company: document.querySelector('[data-i18n="header.form.company"]').value,
    };

    await fetch(
      `https://script.google.com/macros/s/AKfycbwATv2Pfnoqx5m4sXuZHbR1HbJ1RMTNvUJtv_LCM2-bD_MFagFQju2A5UvRJpc8eQOI/exec`,
      {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );

    e.target.reset();
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // animatedHeader();
  reviewsAnimation();
  addSliderAnimation();
  saveDataToGoogleForm();
});

window.addEventListener('load', () => {
  const container = document.querySelector('.header-cards-wrapper-mobile');
  const cards = container.querySelectorAll('.header-card');

  if (cards.length >= 2) {
    const secondCard = cards[1];
    const offset = secondCard.offsetLeft - container.clientWidth / 2 + secondCard.clientWidth / 2;
    container.scrollLeft = offset;
  }
});
