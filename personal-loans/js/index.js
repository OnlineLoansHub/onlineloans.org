document.addEventListener('DOMContentLoaded', function () {
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

  const container = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  let currentIndex = 0;

  function goToSlide(index) {
    container.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'));
      goToSlide(index);
    });
  });

  setInterval(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }, 3000);
});
