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

// function animatedHeader() {
//   const navbar = document.getElementById('navbar');
//   const triggerSection = document.getElementById('trigger-section');

//   const triggerOffset = triggerSection.offsetTop;
//   let wasTriggered = false;

//   function updateNavbar() {
//     const scrollY = window.scrollY;

//     if (scrollY >= triggerOffset && !wasTriggered) {
//       navbar.classList.add('scrolled');
//       // navLogo.src = './images/logo_dark.svg';
//       wasTriggered = true;
//     } else if (scrollY < triggerOffset && wasTriggered) {
//       navbar.classList.remove('scrolled');
//       wasTriggered = false;
//       // navLogo.src = './images/logo.svg';
//     }
//   }

//   updateNavbar();

//   let isScrolling;
//   window.addEventListener('scroll', function () {
//     clearTimeout(isScrolling);
//     isScrolling = setTimeout(updateNavbar, 20);
//   });
// }

document.addEventListener('DOMContentLoaded', function () {
  // animatedHeader();
  reviewsAnimation();
  addSliderAnimation();
});
