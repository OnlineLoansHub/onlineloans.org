class Navigation {
  constructor() {
    this.initDesktopMenu();
    this.initMobileMenu();
    this.initLanguageSwitcher();
  }

  initDesktopMenu() {
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
      if (isOpen) {
        this.burgerBtn.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    } else {
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
    const updateActiveLanguage = (lang) => {
      document.querySelectorAll('.lang-option, .mobile-lang-option').forEach((option) => {
        option.classList.toggle('activeLang', option.dataset.lang === lang);
      });
    };

    document.querySelectorAll('.lang-option, .mobile-lang-option').forEach((option) => {
      option.addEventListener('click', async (e) => {
        e.stopPropagation();
        const lang = option.getAttribute('data-lang');

        this.toggleMenu(true);

        await i18n.loadTranslations(lang);
        i18n.changeLanguage(lang);

        document.querySelectorAll('.lang, .mobile-lang').forEach((el) => {
          el.textContent = lang.toUpperCase();
        });

        document.querySelectorAll('.lang-menu, .mobile-lang-menu').forEach((menu) => {
          menu.classList.remove('active');
        });

        updateActiveLanguage(lang);
      });
    });

    const mobileLangHeader = document.querySelector('.mobile-lang-header');
    if (mobileLangHeader) {
      mobileLangHeader.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelector('.mobile-lang-menu').classList.toggle('active');
      });
    }

    updateActiveLanguage(i18n.currentLanguage);
  }
}

const i18n = {
  translations: {},
  currentLanguage: 'en',

  async init() {
    await this.loadTranslations('en');
    this.changeLanguage('en');
  },

  async loadTranslations(lang) {
    try {
      const response = await fetch(`./locales/${lang}.json`);
      if (!response.ok) throw new Error('Failed to load translations');
      this.translations[lang] = await response.json();
    } catch (e) {
      console.error(`Error loading ${lang} translations:`, e);
     
    }
  },

  changeLanguage(lang) {
    if (!this.translations[lang]) {
      console.warn(`Translations for "${lang}" not loaded`);
      return;
    }

    this.currentLanguage = lang;
    document.documentElement.lang = lang;
    this.updateContent();

    document.querySelectorAll('.lang, .mobile-lang').forEach((el) => {
      el.textContent = lang.toUpperCase();
    });
  },

  updateContent() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });
  },

  t(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLanguage];

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
