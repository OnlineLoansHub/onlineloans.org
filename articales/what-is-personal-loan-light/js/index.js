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

function showActiveArticleItem() {
  const articles = document.querySelectorAll('.loan-article');
  const menuItems = document.querySelectorAll('.loan-contents-list-item');
  let currentActiveIndex = 0;

  if (menuItems.length > 0) {
    menuItems[0].classList.add('active');
  }

  menuItems.forEach((item, index) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.textContent.trim();
      const targetArticle = Array.from(articles).find(
        (article) => article.querySelector('.loan-article-title').textContent.trim() === targetId
      );

      if (targetArticle) {
        targetArticle.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        setActiveMenuItem(index);
      }
    });
  });

  function setActiveMenuItem(index) {
    menuItems.forEach((item) => item.classList.remove('active'));
    menuItems[index].classList.add('active');
    currentActiveIndex = index;
  }

  function highlightMenuOnScroll() {
    let fromTop = window.scrollY + 100;
    let foundActive = false;

    for (let i = articles.length - 1; i >= 0; i--) {
      const article = articles[i];
      const articleTop = article.offsetTop;

      if (fromTop >= articleTop && !foundActive) {
        if (currentActiveIndex !== i) {
          setActiveMenuItem(i);
        }
        foundActive = true;
      }
    }

    if (!foundActive && currentActiveIndex !== 0) {
      setActiveMenuItem(0);
    }
  }

  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  window.addEventListener('scroll', debounce(highlightMenuOnScroll, 20));
  highlightMenuOnScroll();
}

document.addEventListener('DOMContentLoaded', function () {
  addSliderAnimation();
  showActiveArticleItem();
});
