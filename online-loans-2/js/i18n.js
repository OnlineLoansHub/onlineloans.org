class Navigation {
  constructor() {
    this.initDesktopMenu();
    this.initMobileMenu();
    this.initLanguageSwitcher();
  }

  initDesktopMenu() {
    // Десктопные выпадающие меню
    document.querySelectorAll('.navbar-link-item').forEach((item) => {
      item.addEventListener('mouseenter', () => {
        const menu = item.querySelector('.dropdown-menu');
        const arrow = item.querySelector('.dropdown-arrow');
        if (menu) {
          menu.style.opacity = '1';
          menu.style.visibility = 'visible';
          menu.style.transform = 'translateY(0)';
          if (arrow) arrow.style.transform = 'rotate(180deg)';
        }
      });

      item.addEventListener('mouseleave', () => {
        const menu = item.querySelector('.dropdown-menu');
        const arrow = item.querySelector('.dropdown-arrow');
        if (menu) {
          menu.style.opacity = '0';
          menu.style.visibility = 'hidden';
          menu.style.transform = 'translateY(10px)';
          if (arrow) arrow.style.transform = 'rotate(0)';
        }
      });
    });
  }

  initMobileMenu() {
    this.burgerBtn = document.querySelector('.burger-btn');
    this.mobileMenu = document.querySelector('.mobile-menu-content');

    this.burgerBtn.addEventListener('click', () => this.toggleMenu());

    document.querySelectorAll('.mobile-nav-item.has-dropdown').forEach((item) => {
      const header = item.querySelector('.mobile-dropdown-header');
      header.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    });
  }

  toggleMenu(forceClose = false) {
    const isOpen = this.burgerBtn.classList.contains('active');

    if (forceClose) {
      // Принудительное закрытие
      if (isOpen) {
        this.burgerBtn.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    } else {
      // Обычное переключение
      if (!isOpen) {
        this.burgerBtn.classList.add('active');
        this.mobileMenu.classList.add('active');
        document.body.classList.add('menu-open');
      } else {
        this.burgerBtn.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    }
  }

  initLanguageSwitcher() {
    // Обработка выбора языка
    document.querySelectorAll('.lang-option, .mobile-lang-option').forEach((option) => {
      option.addEventListener('click', async (e) => {
        e.stopPropagation();
        const lang = option.getAttribute('data-lang');

        // Закрываем меню (передаем true для принудительного закрытия)
        this.toggleMenu(true);

        await i18n.loadTranslations(lang);
        i18n.changeLanguage(lang);

        // Обновляем отображение
        document.querySelectorAll('.lang, .mobile-lang').forEach((el) => {
          el.textContent = lang.toUpperCase();
        });

        // Закрываем языковое меню
        document.querySelectorAll('.lang-menu, .mobile-lang-menu').forEach((menu) => {
          menu.classList.remove('active');
        });
      });
    });

    // Открытие языкового меню в мобильной версии
    const mobileLangHeader = document.querySelector('.mobile-lang-header');
    if (mobileLangHeader) {
      mobileLangHeader.addEventListener('click', (e) => {
        e.stopPropagation();
        const menu = document.querySelector('.mobile-lang-menu');
        menu.classList.toggle('active');
      });
    }
  }
}

const i18n = {
  translations: {},
  currentLanguage: 'en',

  async init() {
    await this.loadTranslations('en');
    this.changeLanguage('en');
    this.setupLanguageSwitcher();
    this.setupDropdownToggle();
  },

  async loadTranslations(lang) {
    const path = `./locales/${lang}.json`;

    try {
      const response = await fetch(path, {
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        console.warn(`no file: ${path}`);
      }

      const text = await response.text();
      if (!text.trim()) {
        console.error(`file is empty: ${path}`);
      }

      this.translations[lang] = JSON.parse(text);
      console.log(`success: ${path}`);
      return;
    } catch (e) {
      console.error(`error в ${path}:`, e.message);
    }

    this.translations[lang] = {};
  },

  changeLanguage(lang) {
    if (!this.translations[lang]) {
      console.warn(`language "${lang}" not loaded`);
      return;
    }
    this.currentLanguage = lang;
    document.documentElement.lang = lang;
    this.updateContent();
    this.updateLanguageSwitcher();
  },

  updateLanguageSwitcher() {
    const langElement = document.querySelector('.lang');
    if (langElement) {
      langElement.textContent = this.currentLanguage.toUpperCase();
    }
  },

  setupLanguageSwitcher() {
    document.querySelectorAll('.lang-option').forEach((item) => {
      item.addEventListener('click', async (e) => {
        e.stopPropagation();
        const lang = item.getAttribute('data-lang');
        if (lang !== this.currentLanguage) {
          await this.loadTranslations(lang);
          this.changeLanguage(lang);
          document.querySelector('.lang-menu').classList.remove('active'); // Закрыть после выбора
        }
      });
    });
  },

  setupDropdownToggle() {
    const langHeader = document.querySelector('.lang-header');
    const langMenu = document.querySelector('.lang-menu');

    if (langHeader && langMenu) {
      langHeader.addEventListener('click', (e) => {
        e.stopPropagation();
        langMenu.classList.toggle('active');
      });

      document.addEventListener('click', () => {
        langMenu.classList.remove('active');
      });
    }
  },

  updateContent() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });
  },

  t(key) {
    const lang = document.documentElement.lang;
    const keys = key.split('.');
    let value = this.translations[lang];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return `[${key}]`;
    }

    return value;
  },
};

window.addEventListener('DOMContentLoaded', () => {
  new Navigation();
  i18n.init();
});
