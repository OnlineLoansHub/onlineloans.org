function collapseAllBlocks() {
  const collapseBtn = document.querySelector('.guide-cards-collapse');

  collapseBtn.addEventListener('click', () => {
    const cards = document.querySelectorAll('.guide-card');

    cards.forEach((card) => {
      card.classList.remove('active');
    });
  });
}

function collapseOneBlock() {
  const plusButtons = document.querySelectorAll('.guide-card-plus');

  plusButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const card = this.closest('.guide-card');

      card.classList.toggle('active');
    });
  });
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

function addHeaderCardsAnimation() {
  let showTimers = [];
  let hideTimers = [];
  let mainTimer = null;

  const items = [
    //here we can setup order
    document.querySelector('.header-card-1 .header-card-list-item-4'),
    document.querySelector('.header-card-1 .header-card-list-item-3'),
    document.querySelector('.header-card-1 .header-card-list-item-2'),
    document.querySelector('.header-card-1 .header-card-list-item-1'),

    document.querySelector('.header-card-2 .header-card-list-item-4'),
    document.querySelector('.header-card-2 .header-card-list-item-3'),
    document.querySelector('.header-card-2 .header-card-list-item-2'),
    document.querySelector('.header-card-2 .header-card-list-item-1'),

    document.querySelector('.header-card-3 .header-card-list-item-4'),
    document.querySelector('.header-card-3 .header-card-list-item-3'),
    document.querySelector('.header-card-3 .header-card-list-item-2'),
    document.querySelector('.header-card-3 .header-card-list-item-1'),
  ].filter((item) => item !== null);

  const clearAllTimers = () => {
    showTimers.forEach((timer) => clearTimeout(timer));
    hideTimers.forEach((timer) => clearTimeout(timer));
    if (mainTimer) clearTimeout(mainTimer);
    showTimers = [];
    hideTimers = [];
  };

  const animateShowItems = (items) => {
    items.forEach((item, index) => {
      const timer = setTimeout(() => {
        item.classList.add('animate-step');
      }, index * 100);

      showTimers.push(timer);
    });
  };

  const animateHideItems = (items) => {
    items.forEach((item, index) => {
      const timer = setTimeout(() => {
        item.classList.remove('animate-step');
      }, index * 100);

      hideTimers.push(timer);
    });
  };

  const startAnimation = () => {
    clearAllTimers();
    animateShowItems(items);

    setTimeout(() => {
      animateHideItems(items);
    }, items.length * 200); //total time
  };

  mainTimer = setTimeout(startAnimation, 500);
}

function animatedHeader() {
  const navbar = document.getElementById('navbar');
  const triggerSection = document.getElementById('trigger-section');

  const triggerOffset = triggerSection.offsetTop;
  let wasTriggered = false;

  function updateNavbar() {
    const scrollY = window.scrollY;

    if (scrollY >= triggerOffset && !wasTriggered) {
      navbar.classList.add('scrolled');
      // navLogo.src = './images/logo_dark.svg';
      wasTriggered = true;
    } else if (scrollY < triggerOffset && wasTriggered) {
      navbar.classList.remove('scrolled');
      wasTriggered = false;
      // navLogo.src = './images/logo.svg';
    }
  }

  updateNavbar();

  let isScrolling;
  window.addEventListener('scroll', function () {
    clearTimeout(isScrolling);
    isScrolling = setTimeout(updateNavbar, 20);
  });
}

function addTabSwitcher() {
  const btns = document.querySelectorAll('.guide-btn');
  const articleGrids = document.querySelectorAll('.guide-article-grid');

  btns.forEach((button) => {
    button.addEventListener('click', function () {
      btns.forEach((btn) => btn.classList.remove('active'));

      this.classList.add('active');

      const tabNumber = this.getAttribute('data-guide-btn');

      articleGrids.forEach((grid) => grid.classList.remove('active'));

      const activeGrid = document.querySelector(`.guide-article-grid-${tabNumber}`);
      if (activeGrid) {
        activeGrid.classList.add('active');
      }
    });
  });
}

function headerCardAnimation() {
  const container = document.querySelector('.carousel-container');
  const cardsWrapper = document.querySelector('.header-cards');
  const cards = document.querySelectorAll('.header-card');
  const indicators = document.querySelectorAll('.carousel-indicator');

  if (window.innerWidth <= 768) {
    let startX = 0;
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth;

    const goToSlide = (index) => {
      currentIndex = Math.max(0, Math.min(index, cards.length - 1));
      const maxOffset = (cards.length - 1) * cardWidth;
      const offset = Math.min(currentIndex * cardWidth, maxOffset);
      cardsWrapper.style.transform = `translateX(-${offset}px)`;

      indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === currentIndex);
      });
    };

    container.addEventListener(
      'touchstart',
      (e) => {
        startX = e.touches[0].clientX;
      },
      { passive: true }
    );

    container.addEventListener(
      'touchmove',
      (e) => {
        if (!startX) return;
        const x = e.touches[0].clientX;
        const diff = startX - x;
        cardsWrapper.style.transform = `translateX(calc(-${
          currentIndex * cardWidth
        }px - ${diff}px))`;
      },
      { passive: true }
    );

    container.addEventListener('touchend', (e) => {
      if (!startX) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (diff > 50 && currentIndex < cards.length - 1) {
        goToSlide(currentIndex + 1); // left swipe
      } else if (diff < -50 && currentIndex > 0) {
        goToSlide(currentIndex - 1); // right swipe
      } else {
        goToSlide(currentIndex);
      }
      startX = 0;
    });

    indicators.forEach((ind) => {
      ind.addEventListener('click', () => {
        goToSlide(parseInt(ind.dataset.index));
      });
    });
  }
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    document.querySelector('.header-cards').style.transform = 'translateX(0)';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  animatedHeader();
  addHeaderCardsAnimation();
  addTabSwitcher();
  addSliderAnimation();
  collapseAllBlocks();
  collapseOneBlock();
  headerCardAnimation();
});
