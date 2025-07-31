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

  mainTimer = setTimeout(startAnimation, 3000);
}

function animatedHeader() {
  const navbar = document.getElementById('navbar');
  const navLogo = document.querySelector('.nav-logo');
  const triggerSection = document.getElementById('trigger-section');

  const triggerOffset = triggerSection.offsetTop;
  let wasTriggered = false;

  function updateNavbar() {
    const scrollY = window.scrollY;

    if (scrollY >= triggerOffset && !wasTriggered) {
      navbar.classList.add('scrolled');
      navLogo.src = './images/logo_dark.svg';
      wasTriggered = true;
    } else if (scrollY < triggerOffset && wasTriggered) {
      navbar.classList.remove('scrolled');
      wasTriggered = false;
      navLogo.src = './images/logo.svg';
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

document.addEventListener('DOMContentLoaded', function () {
  animatedHeader();
  addHeaderCardsAnimation();
  addTabSwitcher();
  addSliderAnimation();
  collapseAllBlocks();
  collapseOneBlock();
});
