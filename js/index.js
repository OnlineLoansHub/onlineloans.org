document.addEventListener('DOMContentLoaded', function () {
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

  const plusButtons = document.querySelectorAll('.guide-card-plus');
  const collapseBtn = document.querySelector('.guide-cards-collapse');

  collapseBtn.addEventListener('click', () => {
    const cards = document.querySelectorAll('.guide-card');

    cards.forEach((card) => {
      card.classList.remove('active');
    });
  });

  plusButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const card = this.closest('.guide-card');

      card.classList.toggle('active');
    });
  });
});
