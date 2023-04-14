/* Menu */

const header = document.querySelector('.main-header');
const navToggle = document.querySelector('.main-header__toggle');

header.classList.remove('main-header--no-js');

navToggle.addEventListener('click', () => {
  if (header.classList.contains('main-header--opened')) {
    header.classList.remove('main-header--opened');
  } else {
    header.classList.add('main-header--opened');
  }
});

/* Header */

document.addEventListener('DOMContentLoaded', () => {
  const onScrollHeader = () => {
    const header = document.querySelector('.main-header');

    let prevScroll = window.pageYOffset;
    let currentScroll;

    window.addEventListener('scroll', () => {
      currentScroll = window.pageYOffset;

      const headerHidden = () => header.classList.contains('main-header--hidden');

      if (currentScroll > prevScroll && !headerHidden()) {
        header.classList.add('main-header--hidden');
      }
      if (currentScroll < prevScroll && headerHidden()) {
        header.classList.remove('main-header--hidden');
      }

      prevScroll = currentScroll;
    });
  }

  if (document.documentElement.clientWidth < 768) {
    onScrollHeader();
  }
});

/* Lookbook slider with destroy */

const lookbookSlider = document.querySelector('.lookbook__slider');
const breakpoint = window.matchMedia('(min-width: 880px)');

const initLookbookSlider = () => {
  let sliderLookbookInit;

  const getSlider = () => {
    if (lookbookSlider) {
      sliderLookbookInit = new Swiper(lookbookSlider, {
        slidesPerView: 'auto',
        slideToClickedSlide: true,
        spaceBetween: 8,
      });
    }
  }

  const breakpointChecker = () => {
    let resizeTimeout;
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null;
        resizeHandlerTablet();
      }, 100);
    }
  };

  const resizeHandlerTablet = () => {
    if (breakpoint.matches === true) {
      if (sliderLookbookInit !== undefined) {
        sliderLookbookInit.destroy(true, true);
      }
    } else if (breakpoint.matches === false) {
      getSlider();
    }
  };

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
};

initLookbookSlider();

/* Reviews slider */

const sliderReviews = new Swiper('.reviews__slider', {
  slidesPerView: 'auto',
  autoHeight: true,
  slideToClickedSlide: true,
  spaceBetween: 8,
  speed: 1000,
  pagination: {
    el: '.reviews__pagination',
    type: 'bullets',
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 16,
    }
  }
});

/* Promo slider */

const sliderPromo = new Swiper('.promo__slider', {
  loop: true,
  slidesPerView: 1,
  autoHeight: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  speed: 1500,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: '.promo__pagination',
    type: 'bullets',
    clickable: true,
  },
});

/* Faq slider with destroy */

const faqSlider = document.querySelector('.faq__links');
const breakpointTablet = window.matchMedia('(min-width: 768px)');

const initFaqSlider = () => {
  let sliderFaqInit;

  const getSlider = () => {
    if (faqSlider) {
      sliderFaqInit = new Swiper(faqSlider, {
        slidesPerView: 'auto',
        slideToClickedSlide: true,
        spaceBetween: 8,
      });
    }
  }

  const breakpointChecker = () => {
    let resizeTimeout;
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null;
        resizeHandlerTablet();
      }, 100);
    }
  };

  const resizeHandlerTablet = () => {
    if (breakpointTablet.matches === true) {
      if (sliderFaqInit !== undefined) {
        sliderFaqInit.destroy(true, true);
      }
    } else if (breakpointTablet.matches === false) {
      getSlider();
    }
  };

  breakpointTablet.addListener(breakpointChecker);
  breakpointChecker();
};

initFaqSlider();

/* Tabs */

class Tabs {
  constructor() {
    this._windowWidth = window.innerWidth;
    this._documentClickHandler = this._documentClickHandler.bind(this);
    this._init();
  }

  _init() {
    this._initAllTabs();
    document.addEventListener('click', this._documentClickHandler);
  }

  _resizeObserver() {
    return new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target.classList.contains('is-active')) {
          this._updateTabHeight();
        }
      }
    });
  }

  _documentClickHandler(evt) {
    const target = evt.target;
    if (!target.closest('[data-tabs="control"]')) {
      return;
    }
    evt.preventDefault();
    const control = target.closest('[data-tabs="control"]');
    this.openTab(control);
  }

  _initAllTabs() {
    const tabs = document.querySelectorAll('[data-tabs="parent"]');
    const forLoadTabs = document.querySelectorAll('[data-tabs="element"].for-load');
    tabs.forEach((tab) => {
      this._initTab(tab);
    });
    forLoadTabs.forEach((tab) => {
      tab.classList.remove('for-load');
    });
  }

  _removeAllActiveClasses(tabControlElements, tabElements) {
    tabElements.forEach((tab) => {
      tab.classList.remove('is-active');
    });

    tabControlElements.forEach((element, index) => {
      element.classList.remove('is-active');
      element.setAttribute('data-index', index);
    });
  }

  _setTabStartState(tab, dataHeight, tabElements, tabContentElement, tabControlElements, dataDelay) {
    const activeIndex = this._returnActiveIndex(tabControlElements);
    const blockHeight = dataHeight === 'max' ? this._returnMaxHeight(tabElements) : tabElements[activeIndex].offsetHeight;
    this._removeAllActiveClasses(tabControlElements, tabElements);
    tab.classList.add('no-transition');
    tabControlElements[activeIndex].classList.add('is-active');
    tabElements[activeIndex].classList.add('is-active');
    if (dataHeight !== 'unset') {
      tabContentElement.style.height = `${blockHeight}px`;
    }
    setTimeout(() => {
      if (dataDelay) {
        tab.classList.remove('no-transition');
      }
    }, dataDelay);
  }

  _returnActiveIndex(tabControlElements) {
    let activeIndex = 0;
    let flag = true;
    tabControlElements.forEach((control, index) => {
      if (control.classList.contains('is-active') && flag) {
        activeIndex = index;
        flag = false;
      }
    });
    return activeIndex;
  }

  _returnMaxHeight(tabElements) {
    let height = [];
    tabElements.forEach((element) => {
      height.push(element.offsetHeight);
    });
    height.sort((a, b) => a - b);
    return height[height.length - 1];
  }

  _returnScopeList(nodeList, parent) {
    const array = [];
    nodeList.forEach((element) => {
      const elementParent = element.closest('[data-tabs="parent"]');
      if (elementParent === parent) {
        array.push(element);
      }
    });

    return array;
  }

  _returnScopeChild(nodeList, parent) {
    let currentChild;
    nodeList.forEach((element) => {
      const elementParent = element.closest('[data-tabs="parent"]');
      if (elementParent === parent) {
        currentChild = element;
      }
    });

    return currentChild;
  }

  _updateTabHeight() {
    const activeElements = document.querySelectorAll('[data-tabs="element"].is-active');
    activeElements.forEach((element) => {
      let transition = false;
      const parent = element.closest('[data-tabs="parent"]');
      if (parent.closest('[data-tabs="element"]')) {
        transition = true;
      }
      this._setTabElementHeight(element, transition);
    });
  }

  _setTabElementHeight(element, transition) {
    const parentElement = element.closest('[data-tabs="parent"]');
    const dataHeight = parentElement.dataset.height;
    const contentElement = this._returnScopeChild(parentElement.querySelectorAll('[data-tabs="content"]'), parentElement);
    const tabElements = this._returnScopeList(parentElement.querySelectorAll('[data-tabs="element"]'), parentElement);

    if (!transition) {
      parentElement.classList.add('no-transition');
    }

    if (dataHeight === 'max') {
      contentElement.style.height = `${this._returnMaxHeight(tabElements)}px`;
    } else if (dataHeight === 'unset') {
      contentElement.style.height = null;
    } else {
      contentElement.style.height = `${this._returnScopeChild(parentElement.querySelectorAll('[data-tabs="element"].is-active'), parentElement).offsetHeight}px`;
    }

    setTimeout(() => parentElement.classList.remove('no-transition'));
  }

  _initTab(tab) {
    const dataHeight = tab.dataset.height;
    const dataDelay = tab.dataset.delay ? tab.dataset.delay : 0;
    const tabContentElement = tab.querySelector('[data-tabs="content"]');
    const tabControlElements = this._returnScopeList(tab.querySelectorAll('[data-tabs="control"]'), tab);
    const tabElements = this._returnScopeList(tab.querySelectorAll('[data-tabs="element"]'), tab);
    this._setTabStartState(tab, dataHeight, tabElements, tabContentElement, tabControlElements, dataDelay);
    if (dataHeight !== 'unset') {
      tabElements.forEach((element) => {
        this._resizeObserver().observe(element);
      });
    }
    setTimeout(() => {
      tab.classList.remove('no-transition-global');
    });
  }

  reInit() {
    this._initAllTabs();
  }

  openTab(control) {
    const currentIndex = control.dataset.index;
    const parentElement = control.closest('[data-tabs="parent"]');

    if (control.classList.contains('is-active') || parentElement.classList.contains('no-action')) {
      return;
    }

    const dataDelay = parentElement.dataset.delay ? parentElement.dataset.delay : 0;
    const dataHeight = parentElement.dataset.height;
    const contentElement = parentElement.querySelector('[data-tabs="content"]');
    const tabElements = this._returnScopeList(parentElement.querySelectorAll('[data-tabs="element"]'), parentElement);

    const activeControl = this._returnScopeChild(parentElement.querySelectorAll('[data-tabs="control"].is-active'), parentElement);
    const activeElement = this._returnScopeChild(parentElement.querySelectorAll('[data-tabs="element"].is-active'), parentElement);
    const currentHeight = contentElement.offsetHeight;
    const newHeight = tabElements[currentIndex].offsetHeight;

    parentElement.classList.add('no-action');
    document.activeElement.blur();

    if (activeControl) {
      activeControl.classList.remove('is-active');
    }

    if (activeElement) {
      activeElement.classList.remove('is-active');
    }

    if (currentHeight > newHeight) {
      setTimeout(() => {
        if (dataHeight !== 'max' && dataHeight !== 'unset') {
          contentElement.style.height = newHeight + 'px';
        }
        control.classList.add('is-active');
        tabElements[currentIndex].classList.add('is-active');
        parentElement.classList.remove('no-action');
      }, dataDelay);
    } else {
      if (dataHeight !== 'max' && dataHeight !== 'unset') {
        contentElement.style.height = newHeight + 'px';
      }
      setTimeout(() => {
        control.classList.add('is-active');
        tabElements[currentIndex].classList.add('is-active');
        parentElement.classList.remove('no-action');
      }, dataDelay);
    }
  }
}

let tabs;

const initTabs = () => {
  tabs = new Tabs();
  window.tabs = tabs;
};

const control = document.querySelector('.faq__link');

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    initTabs();
  });
});

/* Accordion */

class Accordions {
  constructor() {
    this._openHeight = 0;
    this._windowWidth = window.innerWidth;
    this._documentClickHandler = this._documentClickHandler.bind(this);
    this._windowResizeHandler = this._windowResizeHandler.bind(this);
    this._init();
  }

  _init() {
    this.fullUpdate();
    document.addEventListener('click', this._documentClickHandler);
    window.addEventListener('resize', this._windowResizeHandler);
  }

  _documentClickHandler(evt) {
    const target = evt.target;
    if (!target.closest('[data-accordion="button"]')) {
      return;
    }

    evt.preventDefault();
    const parent = target.closest('[data-accordion="parent"]');

    if (parent.dataset.destroy && !window.matchMedia(parent.dataset.destroy).matches) {
      return;
    }

    const element = target.closest('[data-accordion="element"]');
    if (element.classList.contains('is-active')) {
      this.closeAccordion(element);
      return;
    }
    this.openAccordion(element);
  }

  _windowResizeHandler() {
    if (this._windowWidth === window.innerWidth) {
      return;
    }
    this._windowWidth = window.innerWidth;
    this.updateAccordionsHeight();
  }

  closeAllAccordion(parent) {
    const elements = parent.querySelectorAll('[data-accordion="element"]');
    elements.forEach((element) => {
      const currentParent = element.closest('[data-accordion="parent"]');
      if (currentParent === parent) {
        this.closeAccordion(element);
      }
    });
  }

  updateAccordionsHeight(element = null) {
    if (element) {
      const content = element.querySelector('[data-accordion="content"]');
      content.style.transition = 'none';
      content.style.maxHeight = `${content.scrollHeight}px`;
      setTimeout(() => {
        content.style.transition = null;
      });
      return;
    }

    const closeElements = document.querySelectorAll('[data-accordion="element"]:not(.is-active)');

    closeElements.forEach((closeElement) => {
      const parent = closeElement.closest('[data-accordion="parent"]');
      const content = closeElement.querySelector('[data-accordion="content"]');
      if (parent.dataset.destroy && !window.matchMedia(parent.dataset.destroy).matches) {
        content.style.maxHeight = '100%';
        return;
      }
      content.style.maxHeight = null;
    });

    const openElements = document.querySelectorAll('[data-accordion="element"].is-active');
    openElements.forEach((openElement) => {
      const content = openElement.querySelector('[data-accordion="content"]');
      const parent = openElement.closest('[data-accordion="parent"]');
      if (parent.dataset.destroy && !window.matchMedia(parent.dataset.destroy).matches) {
        content.style.maxHeight = '100%';
        return;
      }
      content.style.transition = 'none';
      content.style.maxHeight = `${content.scrollHeight}px`;
      setTimeout(() => {
        content.style.transition = null;
      });
    });
  }

  fullUpdate(parent = null, transition = false) {
    let openElements;
    if (parent) {
      openElements = parent.querySelectorAll('[data-accordion="element"].is-active');
    } else {
      openElements = document.querySelectorAll('[data-accordion="element"].is-active');
    }
    openElements.forEach((openElement) => {
      const innerParent = openElement.querySelector('[data-accordion="parent"]');
      if (innerParent) {
        return;
      }
      this.openAccordion(openElement, transition);
    });
    this.updateAccordionsHeight();
  }

  openAccordion(element, transition = true) {
    const parentElement = element.closest('[data-accordion="parent"]');
    const contentElement = element.querySelector('[data-accordion="content"]');
    this._openHeight += contentElement.scrollHeight;

    if (parentElement.hasAttribute('data-single')) {
      this.closeAllAccordion(parentElement);
    }

    element.classList.add('is-active');
    if (transition) {
      contentElement.style.maxHeight = `${this._openHeight}px`;
    } else {
      contentElement.style.transition = 'none';
      contentElement.style.maxHeight = `${this._openHeight}px`;
      setTimeout(() => {
        contentElement.style.transition = null;
      });
    }

    if (parentElement.closest('[data-accordion="element"]')) {
      this.openAccordion(parentElement.closest('[data-accordion="element"]'), transition);
      return;
    }

    this._openHeight = 0;
  }

  closeAccordion(element, transition = true) {
    const contentElement = element.querySelector('[data-accordion="content"]');
    if (!contentElement) {
      return;
    }
    element.classList.remove('is-active');
    if (transition) {
      contentElement.style.maxHeight = '0';
    } else {
      contentElement.style.transition = 'none';
      contentElement.style.maxHeight = '0';
      setTimeout(() => {
        contentElement.style.transition = null;
      });
    }
  }
}

let accordions;

const initAccordions = () => {
  accordions = new Accordions();
  window.accordions = accordions;
};

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    initAccordions();
  });
});

/* Modal */

const iosChecker = () => {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
};

const SELECTORS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  'select:not([disabled]):not([aria-hidden])',
  'textarea:not([disabled]):not([aria-hidden])',
  'button:not([disabled]):not([aria-hidden])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])'
];

class FocusLock {
  constructor() {
    this._lockedSelector = null;
    this._focusableElements = null;
    this._endElement = null;
    this._selectors = SELECTORS;

    this._documentKeydownHandler = this._documentKeydownHandler.bind(this);
  }

  _documentKeydownHandler(evt) {
    const activeElement = document.activeElement;
    if (evt.key === 'Tab') {
      if (!this._focusableElements.length) {
        evt.preventDefault();
        activeElement.blur();
        return;
      }
      if (this._focusableElements.length === 1) {
        evt.preventDefault();
        this._focusableElements[0].focus();
        return;
      }
      if (this._focusableElements.length > 1 && !activeElement.closest(this._lockedSelector)) {
        evt.preventDefault();
        this._focusableElements[0].focus();
        return;
      }
    }
    if (evt.key === 'Tab' && !evt.shiftKey && activeElement === this._focusableElements[this._focusableElements.length - 1]) {
      evt.preventDefault();
      this._focusableElements[0].focus();
    }
    if (evt.key === 'Tab' && evt.shiftKey && activeElement === this._focusableElements[0]) {
      evt.preventDefault();
      this._focusableElements[this._focusableElements.length - 1].focus();
    }
  }

  lock(lockedSelector, startFocus = true) {
    this.unlock();
    this._lockedSelector = lockedSelector;
    const lockedElement = document.querySelector(this._lockedSelector);
    if (!lockedElement) {
      return;
    }
    this._focusableElements = lockedElement.querySelectorAll(this._selectors);
    this._endElement = document.activeElement;
    const startElement = lockedElement.querySelector('[data-focus]') || this._focusableElements[0];
    if (this._endElement) {
      this._endElement.blur();
    }
    if (startElement && startFocus) {
      startElement.focus();
    }
    document.addEventListener('keydown', this._documentKeydownHandler);
  }

  unlock(returnFocus = true) {
    if (this._endElement && returnFocus) {
      this._endElement.focus();
    }
    this._lockedSelector = null;
    this._focusableElements = null;
    this._endElement = null;
    document.removeEventListener('keydown', this._documentKeydownHandler);
  }
}

window.focusLock = new FocusLock();

class ScrollLock {
  constructor() {
    this._iosChecker = iosChecker;
    this._lockClass = this._iosChecker() ? 'scroll-lock-ios' : 'scroll-lock';
    this._scrollTop = null;
    this._fixedBlockElements = document.querySelectorAll('[data-fix-block]');
  }

  _getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  _getBodyScrollTop() {
    return (
      self.pageYOffset ||
      (document.documentElement && document.documentElement.ScrollTop) ||
      (document.body && document.body.scrollTop)
    );
  }

  disableScrolling() {
    this._scrollTop = document.body.dataset.scroll = document.body.dataset.scroll ? document.body.dataset.scroll : this._getBodyScrollTop();
    if (this._getScrollbarWidth()) {
      document.body.style.paddingRight = `${this._getScrollbarWidth()}px`;
      this._fixedBlockElements.forEach((block) => {
        block.style.paddingRight = `${this._getScrollbarWidth()}px`;
      });
    }
    document.body.style.top = `-${this._scrollTop}px`;
    document.body.classList.add(this._lockClass);
  }

  enableScrolling() {
    document.body.classList.remove(this._lockClass);
    window.scrollTo(0, +document.body.dataset.scroll);
    document.body.style.paddingRight = null;
    document.body.style.top = null;
    this._fixedBlockElements.forEach((block) => {
      block.style.paddingRight = null;
    });
    document.body.removeAttribute('data-scroll');
    this._scrollTop = null;
  }
}

window.scrollLock = new ScrollLock();

class Modals {
  constructor(settings = {}) {
    this._scrollLock = new ScrollLock();
    this._focusLock = new FocusLock();

    this._modalOpenElements = document.querySelectorAll('[data-open-modal]');
    this._stackModalElements = [];
    this._openedModalElement = null;
    this._modalName = null;
    this._enableScrolling = true;
    this._settingKey = 'default';

    this._settings = settings;
    this._preventDefault = this._settings[this._settingKey].preventDefault;
    this._stopPlay = this._settings[this._settingKey].stopPlay;
    this._lockFocus = this._settings[this._settingKey].lockFocus;
    this._startFocus = this._settings[this._settingKey].startFocus;
    this._focusBack = this._settings[this._settingKey].focusBack;
    this._eventTimeout = this._settings[this._settingKey].eventTimeout;
    this._resetScrollPos = this._settings[this._settingKey].resetScrollPos;
    this._openCallback = this._settings[this._settingKey].openCallback;
    this._closeCallback = this._settings[this._settingKey].closeCallback;

    this._documentKeydownHandler = this._documentKeydownHandler.bind(this);
    this._documentClickHandler = this._documentClickHandler.bind(this);
    this._modalClickHandler = this._modalClickHandler.bind(this);

    this._init();
  }

  _init() {
    if (this._modalOpenElements.length) {
      document.addEventListener('click', this._documentClickHandler);
    }
  }

  _setSettings(settingKey = this._settingKey) {
    if (!this._settings[settingKey]) {
      return;
    }

    this._preventDefault =
      typeof this._settings[settingKey].preventDefault === 'boolean'
        ? this._settings[settingKey].preventDefault
        : this._settings[this._settingKey].preventDefault;
    this._stopPlay =
      typeof this._settings[settingKey].stopPlay === 'boolean'
        ? this._settings[settingKey].stopPlay
        : this._settings[this._settingKey].stopPlay;
    this._lockFocus =
      typeof this._settings[settingKey].lockFocus === 'boolean'
        ? this._settings[settingKey].lockFocus
        : this._settings[this._settingKey].lockFocus;
    this._startFocus =
      typeof this._settings[settingKey].startFocus === 'boolean'
        ? this._settings[settingKey].startFocus
        : this._settings[this._settingKey].startFocus;
    this._focusBack =
      typeof this._settings[settingKey].lockFocus === 'boolean'
        ? this._settings[settingKey].focusBack
        : this._settings[this._settingKey].focusBack;
    this._resetScrollPos =
      typeof this._settings[settingKey].resetScrollPos === 'boolean'
        ? this._settings[settingKey].resetScrollPos
        : this._settings[this._settingKey].resetScrollPos;
    this._eventTimeout =
      typeof this._settings[settingKey].eventTimeout === 'number'
        ? this._settings[settingKey].eventTimeout
        : this._settings[this._settingKey].eventTimeout;
    this._openCallback = this._settings[settingKey].openCallback || this._settings[this._settingKey].openCallback;
    this._closeCallback = this._settings[settingKey].closeCallback || this._settings[this._settingKey].closeCallback;
  }

  _documentClickHandler(evt) {
    const target = evt.target;

    if (!target.closest('[data-open-modal]')) {
      return;
    }

    evt.preventDefault();

    this._modalName = target.closest('[data-open-modal]').dataset.openModal;

    if (!this._modalName) {
      return;
    }

    this.open();
  }

  _documentKeydownHandler(evt) {
    const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

    if (isEscKey) {
      evt.preventDefault();
      this.close(document.querySelector('.modal.is-active').dataset.modal);
    }
  }

  _modalClickHandler(evt) {
    const target = evt.target;

    if (!target.closest('[data-close-modal]')) {
      return;
    }

    if (target.closest('[data-close-modal="back"]')) {
      this.back();
    } else {
      this.close(target.closest('[data-modal]').dataset.modal);
      this._stackModalElements = [];
    }
  }

  _addListeners(modal) {
    modal.addEventListener('click', this._modalClickHandler);
    document.addEventListener('keydown', this._documentKeydownHandler);
  }

  _removeListeners(modal) {
    modal.removeEventListener('click', this._modalClickHandler);
    document.removeEventListener('keydown', this._documentKeydownHandler);
  }

  _stopInteractive(modal) {
    if (this._stopPlay) {
      modal.querySelectorAll('video, audio').forEach((el) => el.pause());
      modal.querySelectorAll('[data-iframe]').forEach((el) => {
        el.querySelector('iframe').contentWindow.postMessage('{"event": "command", "func": "pauseVideo", "args": ""}', '*');
      });
    }
  }

  _autoPlay(modal) {
    modal.querySelectorAll('[data-iframe]').forEach((el) => {
      const autoPlay = el.closest('[data-auto-play]');
      if (autoPlay) {
        el.querySelector('iframe').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
    });
  }

  open(modalName = this._modalName) {
    const modal = document.querySelector(`[data-modal="${modalName}"]`);

    if (!modal || modal.classList.contains('is-active')) {
      return;
    }

    document.removeEventListener('click', this._documentClickHandler);

    this._openedModalElement = document.querySelector('.modal.is-active');

    if (this._openedModalElement) {
      this._enableScrolling = false;
      this.close(this._openedModalElement.dataset.modal);
    }

    this._setSettings(modalName);
    modal.classList.add('is-active');

    if (modalName !== this._stackModalElements[this._stackModalElements.length - 1]) {
      this._stackModalElements.push(modalName);
    }

    if (!this._openedModalElement) {
      this._scrollLock.disableScrolling();
    }

    if (this._openCallback) {
      this._openCallback();
    }

    if (this._lockFocus) {
      this._focusLock.lock('.modal.is-active', this._startFocus);
    }

    if (this._resetScrollPos) {
      modal.scrollTo(0, 0);
    }

    setTimeout(() => {
      this._addListeners(modal);
      this._autoPlay(modal);
      document.addEventListener('click', this._documentClickHandler);
    }, this._eventTimeout);
  }

  back() {
    if (!this._stackModalElements.length) {
      return;
    }

    const activeModal = this._stackModalElements[this._stackModalElements.length - 1];
    const prevModal = this._stackModalElements[this._stackModalElements.length - 2];

    if (this._stackModalElements.length === 1) {
      this._stackModalElements = [];
    }

    if (prevModal) {
      this._stackModalElements.pop();
      this.open(prevModal);
    }

    this.close(activeModal);
  }

  close(modalName = this._modalName) {
    const modal = document.querySelector(`[data-modal="${modalName}"]`);
    document.removeEventListener('click', this._documentClickHandler);

    if (!modal || !modal.classList.contains('is-active')) {
      return;
    }

    if (this._lockFocus) {
      this._focusLock.unlock(this._focusBack);
    }

    modal.classList.remove('is-active');
    this._removeListeners(modal);
    this._stopInteractive(modal);

    if (this._closeCallback) {
      this._closeCallback();
    }

    if (this._enableScrolling) {
      setTimeout(() => {
        this._scrollLock.enableScrolling();
      }, this._eventTimeout);
    }

    setTimeout(() => {
      document.addEventListener('click', this._documentClickHandler);
    }, this._eventTimeout);

    this._setSettings('default');
    this._enableScrolling = true;
  }
}

let modals;

const settings = {
  'default': {
    preventDefault: true,
    stopPlay: true,
    lockFocus: true,
    startFocus: true,
    focusBack: true,
    resetScrollPos: false,
    eventTimeout: 400,
    openCallback: false,
    closeCallback: false,
  },
};

const initModals = () => {
  const modalElements = document.querySelectorAll('.modal');
  if (modalElements.length) {
    modalElements.forEach((el) => {
      setTimeout(() => {
        el.classList.remove('modal--preload');
      }, 100);
    });
  }

  modals = new Modals(settings);
  window.modals = modals;
};

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    initModals();
  });
});

/* Validation */


const baseSuccessCallback = (event) => {
  event.preventDefault();
  // Нужно убрать, когда будет реализован бэкенд
  modals.open('modal-success');
};

const baseErrorCallback = (event) => {
  event.preventDefault();
};

const callbacks = {
  base: {
    reset: true,
    resetTimeout: 500,
    successCallback: baseSuccessCallback,
    errorCallback: baseErrorCallback,
  },
};

class Message {
  constructor() {
    this._baseErrorText = 'This field is required';
  }

  _messageTemplate(message, state) {
    const cssClass = state === 'valid' ? 'is-valid' : 'is-invalid';
    return `<span class="input-message ${cssClass}">${message}</span>`;
  }

  removeMessage(parent) {
    const parentMessage = parent.querySelector('.input-message');
    if (parentMessage) {
      parentMessage.remove();
    }
  }

  renderMessage(parent, message, state) {
    this.removeMessage(parent);
    parent.insertAdjacentHTML('beforeend', this._messageTemplate(message, state));
  }
}

const setLimitationError = (limitation) => {
  // eslint-disable-next-line no-console
  console.error(`Переданный формат ограничения(data-limitation="${limitation}") - не поддерживается. Проверьте корректность введённых значений.`);
};

const getLimitationsRegEx = (limitation) => {
  switch (limitation) {
    case 'digit':
      return /[^\d]/g;
    case 'name':
      return /[^a-zA-Zа-яёА-ЯЁ\-\s]/g;
    case 'letters':
      return /[^a-zA-Zа-яёА-ЯЁ\s]/g;
    case 'letters-and-digit':
      return /[^a-zA-Zа-яёА-ЯЁ\s\d]/g;
    case 'cyrillic':
      return /[^а-яёА-ЯЁ\s]/g;
    case 'latin':
      return /[^a-zA-Z\s]/g;
    default:
      return setLimitationError(limitation);
  }
};

const getMatrixLimitationsRegEx = (matrix) => {
  switch (matrix) {
    case 'digit':
      return /[^\d]/g;
    case 'name':
      return /[^\а-яё\А-ЯЁ\a-z\A-Z\-]]/g;
    case 'letters':
      return /[^\а-яё\А-ЯЁ\a-z\A-Z]/g;
    case 'letters-and-digit':
      return /[^\а-яё\А-ЯЁ\a-z\A-Z\d]/g;
    case 'cyrillic':
      return /[^\а-яё\А-ЯЁ]/g;
    case 'latin':
      return /[^\a-z\A-Z]/g;
    default:
      return false;
  }
};

const matrixReplace = (item, matrix, RegEx) => {
  if (!matrix) {
    // eslint-disable-next-line no-console
    console.error('При валидации по матрице обязательно указывать формат матрицы: data-matrix=""');
    item.value = '';
    return;
  }

  if (!RegEx) {
    // eslint-disable-next-line no-console
    console.error('При валидации по матрице обязательно указывать формат ограничений: data-matrix-limitations=""');
    item.value = '';
    return;
  }

  const def = matrix.replace(RegEx, '');
  let val = item.value.replace(RegEx, '');
  let i = 0;

  if (def.length >= val.length) {
    val = def;
  }

  item.value = matrix.replace(/./g, (a) => {
    if (/[_\^]/.test(a) && i < val.length) {
      return val.charAt(i++);
    } else if (i >= val.length) {
      return '';
    } else {
      return a;
    }
  });
};


const getMailRegEx = () => /[a-zA-Zа-яёА-ЯЁ0-9]{1}([a-zA-Zа-яёА-ЯЁ0-9\-_\.]{1,})?@[a-zA-Zа-яёА-ЯЁ0-9\-]{1}([a-zA-Zа-яёА-ЯЁ0-9.\-]{1,})?[a-zA-Zа-яёА-ЯЁ0-9\-]{1}\.[a-zA-Zа-яёА-ЯЁ]{2,6}/;

const baseCountryCode = '+';
const baseMatrix = '_(___) ___ __ __';
const phoneLength = baseCountryCode.length + baseMatrix.length;

const onPhoneInputInput = (e) => {
  const matrix = `${baseCountryCode}${baseMatrix}`;
  const def = matrix.replace(/\D/g, '');
  let i = 0;
  let val = e.target.value.replace(/\D/g, '');
  if (def.length >= val.length) {
    val = def;
  }
  e.target.value = matrix.replace(/./g, (a) => {
    if (/[_\d]/.test(a) && i < val.length) {
      return val.charAt(i++);
    } else if (i >= val.length) {
      return '';
    } else {
      return a;
    }
  });
};

const onPhoneInputFocus = ({ target }) => {
  if (!target.value) {
    target.value = baseCountryCode;
  }
  target.addEventListener('input', onPhoneInputInput);
  target.addEventListener('blur', onPhoneInputBlur);
  target.addEventListener('keydown', onPhoneInputKeydown);
  target.addEventListener('paste', onPhoneInputPaste);
  target.addEventListener('click', onPhoneInputClick);
};

const onPhoneInputClick = (e) => {
  if (e.target.selectionStart < 4) {
    e.preventDefault();
    e.target.setSelectionRange(3, 3);
  }
};

const onPhoneInputPaste = (e) => {
  e.target.setSelectionRange(0, 0);
  if (!e.target.selectionStart) {
    setTimeout(() => {
      if (e.target.value.startsWith('+7')) {
        return;
      }
      if (e.target.value.startsWith('+8')) {
        e.target.value = `+7 ${e.target.value.slice(3)}`;
        return;
      }
      e.target.value = '';
    });
  }
};

const onPhoneInputKeydown = (e) => {
  if (e.target.selectionStart < 4 && (e.keyCode === 37 || e.keyCode === 13)) {
    e.preventDefault();
    e.target.setSelectionRange(3, 3);
  }
};

const onPhoneInputBlur = ({ target }) => {
  if (target.value === baseCountryCode) {
    const parent = target.closest('[data-validate-type="phone"]');
    target.value = '';
    if (!parent.hasAttribute('data-required')) {
      parent.classList.remove('is-valid');
      parent.classList.remove('is-invalid');
      const parentMessage = parent.querySelector('.input-message');
      if (parentMessage) {
        parentMessage.remove();
      }
    }
    parent.classList.remove('not-empty');
    target.removeEventListener('input', onPhoneInputInput);
    target.removeEventListener('blur', onPhoneInputBlur);
    target.removeEventListener('keydown', onPhoneInputKeydown);
    target.removeEventListener('paste', onPhoneInputPaste);
    target.removeEventListener('click', onPhoneInputClick);
  }
};

const initPhoneInput = (parent) => {
  const input = parent.querySelector('input');
  parent.dataset.phoneLength = phoneLength;
  input.addEventListener('focus', onPhoneInputFocus);
};

class Validator {
  constructor() {
    this._getLimitationsRegEx = getLimitationsRegEx;
    this._getMatrixLimitationsRegEx = getMatrixLimitationsRegEx;
    this._getMailRegEx = getMailRegEx;
    this._matrixReplace = matrixReplace;
    this._message = new Message();
  }

  _renderMessage(trigger, parent, input) {
    if (!parent.hasAttribute('data-required') && !input.value) {
      return;
    }
    if (!trigger) {
      parent.classList.add('is-invalid');
      if (parent.hasAttribute('data-message-base') && !input.value) {
        this._message.renderMessage(parent, parent.dataset.messageBase, 'invalid');
      } else if (parent.hasAttribute('data-message-extra') && input.value) {
        this._message.renderMessage(parent, parent.dataset.messageExtra, 'invalid');
      } else if (!parent.hasAttribute('data-message-extra') && parent.hasAttribute('data-message-base') && input.value) {
        this._message.renderMessage(parent, parent.dataset.messageBase, 'invalid');
      } else {
        this._message.removeMessage(parent);
      }
    } else {
      if (parent.hasAttribute('data-message-success')) {
        this._message.renderMessage(parent, parent.dataset.messageSuccess, 'valid');
      } else {
        this._message.removeMessage(parent);
      }
    }
  }

  _setItemValidState(parent, input) {
    if (!parent.hasAttribute('data-required') && !input.value) {
      return;
    }
    parent.classList.add('is-valid');
    parent.classList.remove('is-invalid');
    input.setAttribute('aria-invalid', 'false');
    this._message.removeMessage(parent);
  }

  _setItemInvalidState(parent, input) {
    if (!parent.hasAttribute('data-required') && !input.value) {
      return;
    }
    parent.classList.remove('is-valid');
    input.setAttribute('aria-invalid', 'true');
  }

  _simpleLimitation(item, limitation) {
    item.value = item.value.replace(this._getLimitationsRegEx(limitation), '');
  }

  _matrixLimitation(item, matrix, limitation) {
    this._matrixReplace(item, matrix, limitation);
  }

  _validateTextInput(parent, input) {
    let flag = true;
    if (input.value.length >= (+input.getAttribute('minlength') || 1)) {
      this._setItemValidState(parent, input);
    } else {
      this._setItemInvalidState(parent, input);
      flag = false;
    }
    return flag;
  }

  _validateMatrixInput(parent, input) {
    let flag = true;
    if (input.value.length === input.closest('[data-matrix]').dataset.matrix.length) {
      this._setItemValidState(parent, input);
    } else {
      this._setItemInvalidState(parent, input);
      flag = false;
    }
    return flag;
  }

  _validateEmailInput(parent, input) {
    let flag = true;
    if (new RegExp(this._getMailRegEx(), '').test(input.value)) {
      this._setItemValidState(parent, input);
    } else {
      this._setItemInvalidState(parent, input);
      flag = false;
    }
    return flag;
  }

  _validatePhoneInput(parent, input) {
    let flag = true;
    if (input.value.length >= +parent.dataset.phoneLength) {
      this._setItemValidState(parent, input);
    } else {
      this._setItemInvalidState(parent, input);
      flag = false;
    }
    return flag;
  }

  _validateCheckbox(parent, input) {
    let flag = true;
    if (input.checked) {
      this._setItemValidState(parent, input);
    } else {
      this._setItemInvalidState(parent, input);
      flag = false;
    }
    return flag;
  }

  _findSelectedOption(options) {
    let flag = false;
    options.forEach((option) => {
      if (option.value && option.selected) {
        flag = true;
      }
    });
    return flag;
  }

  _validateSelect(parent, input) {
    const options = input.querySelectorAll('option');
    const customSelectText = parent.querySelector('.custom-select__text');
    input.setAttribute('aria-invalid', 'false');
    let flag = true;
    if (this._findSelectedOption(options)) {
      this._setItemValidState(parent, input);
    } else {
      this._setItemInvalidState(parent, input);
      parent.classList.remove('not-empty');
      customSelectText.innerHTML = '';
      flag = false;
    }
    return flag;
  }

  _returnCheckedElements(inputs) {
    let flag = false;
    inputs.forEach((input) => {
      if (input.checked) {
        flag = true;
      }
    });
    return flag;
  }

  _removeGroupAria(inputs) {
    inputs.forEach((input) => {
      if (!input.checked) {
        input.removeAttribute('aria-required');
        input.removeAttribute('aria-invalid');
      } else {
        input.setAttribute('aria-required', true);
        input.setAttribute('aria-invalid', false);
      }
    });
  }

  _setGroupAria(inputs) {
    inputs.forEach((input) => {
      input.setAttribute('aria-required', true);
      input.setAttribute('aria-invalid', true);
    });
  }

  _validateToggleGroup(parent) {
    const formElements = parent.querySelectorAll('input');
    let flag = true;
    if (this._returnCheckedElements(formElements)) {
      this._removeGroupAria(formElements);
      parent.classList.remove('is-invalid');
      parent.classList.add('is-valid');
      this._message.removeMessage(parent);
    } else {
      this._setGroupAria(formElements);
      parent.classList.remove('is-valid');
      flag = false;
    }
    return flag;
  }

  _customExample(parent, input) {
    let flag = true;
    if (!input.value.length) {
      parent.dataset.messageBase = 'Поле обязательно к заполнению';
      this._setItemInvalidState(parent, input);
      flag = false;
    } else if (input.value.length < input.minLength) {
      parent.dataset.messageBase = `Осталось ввести ещё ${input.minLength - input.value.length} символов`;
      this._setItemInvalidState(parent, input);
      flag = false;
    } else if (input.value.length > input.minLength) {
      parent.dataset.messageBase = `Вы ввели ${input.value.length - input.minLength} лишних символов`;
      this._setItemInvalidState(parent, input);
      flag = false;
    } else {
      parent.dataset.messageSuccess = 'Поле заполнено корректно';
      this._setItemValidState(parent, input);
      flag = true;
    }
    return flag;
  }

  _validateFile(parent, input) {
    let flag = true;
    const sizeTest = parent.dataset.maxSize && input.files[0] ? input.files[0].size < +parent.dataset.maxSize : true;
    if (input.value && sizeTest) {
      this._setItemValidState(parent, input);
    } else {
      this._setItemInvalidState(parent, input);
      flag = false;
    }
    return flag;
  }

  _validateInput(type, parent, input) {
    switch (type) {
      case 'text':
        return this._validateTextInput(parent, input);
      case 'matrix':
        return this._validateMatrixInput(parent, input);
      case 'email':
        return this._validateEmailInput(parent, input);
      case 'phone':
        return this._validatePhoneInput(parent, input);
      case 'checkbox':
        return this._validateCheckbox(parent, input);
      case 'select':
        return this._validateSelect(parent, input);
      case 'toggle-group':
        return this._validateToggleGroup(parent, input);
      case 'file':
        return this._validateFile(parent, input);
      case 'custom-example':
        return this._customExample(parent, input);
      default:
        return false;
    }
  }

  validateFormElement(formElement, fullValidate = false) {
    const parent = formElement.closest('[data-validate-type]');
    if (!parent) {
      return;
    }

    if (!parent.hasAttribute('data-required')) {
      const removeElement = parent.querySelector('input') || parent.querySelector('select') || parent.querySelector('textarea');

      if (!removeElement.value) {
        parent.classList.remove('is-valid');
        parent.classList.remove('is-invalid');
      }
    }

    const onInputValidate = parent.hasAttribute('data-on-input-validate');

    if (parent.hasAttribute('data-limitation')) {
      this._simpleLimitation(formElement, parent.dataset.limitation);
    }

    if (parent.dataset.validateType === 'matrix') {
      this._matrixLimitation(formElement, parent.dataset.matrix, this._getMatrixLimitationsRegEx(parent.dataset.matrixLimitation));
    }

    const isValid = this._validateInput(parent.dataset.validateType, parent, formElement);

    if (onInputValidate || fullValidate) {
      this._renderMessage(isValid, parent, formElement);
    }
  }

  _fullValidate(items) {
    let result = true;
    items.forEach((item) => {
      const formElement = item.querySelector('input') || item.querySelector('select') || item.querySelector('textarea');
      this.validateFormElement(formElement, true);
      if (item.classList.contains('is-invalid')) {
        result = false;
      }
    });
    return result;
  }

  validateForm(form) {
    const validateItems = form.querySelectorAll('[data-validate-type]');
    const result = this._fullValidate(validateItems);
    return result;
  }
}

class Form {
  constructor() {
    this._validator = new Validator();
    this._initPhoneInput = initPhoneInput;
    this._callbacks = callbacks;
  }

  _resetSelect(select) {
    const nativeSelect = select.querySelector('select');
    const activeIndex = nativeSelect.options.selectedIndex;
    const selectedOption = nativeSelect.options[activeIndex];
    const buttonText = select.querySelector('.custom-select__text');
    const selectItems = select.querySelectorAll('.custom-select__item');
    buttonText.textContent = selectedOption.textContent;
    selectItems.forEach((item, index) => {
      if (index === activeIndex - 1) {
        item.setAttribute('aria-selected', 'true');
        return;
      }
      item.setAttribute('aria-selected', 'false');
    });
    if (!nativeSelect.value) {
      select.classList.remove('not-empty');
      select.classList.remove('is-valid');
    }
  }

  _resetSelects(form) {
    const selects = form.querySelectorAll('[data-select]');
    selects.forEach((select) => {
      this._resetSelect(select);
    });
  }

  reset(form) {
    form.reset();
    form.querySelectorAll('.is-invalid').forEach((item) => item.classList.remove('is-invalid'));
    form.querySelectorAll('.is-valid').forEach((item) => item.classList.remove('is-valid'));
    form.querySelectorAll('.input-message').forEach((item) => item.remove());
    setTimeout(() => {
      this._resetSelects(form);
    });
  }

  initPhoneInput(parent) {
    this._initPhoneInput(parent);
  }

  validateForm(form) {
    return this._validator.validateForm(form);
  }

  validateFormElement(item) {
    return this._validator.validateFormElement(item);
  }

  _onFormSubmit(event, callback = null) {
    if (this.validateForm(event.target) && callback) {
      this._callbacks[callback].successCallback(event);
      if (this._callbacks[callback].reset) {
        setTimeout(() => {
          this.reset(event.target);
        }, this._callbacks[callback].resetTimeout ? this._callbacks[callback].resetTimeout : 500);
      }
      return;
    }
    if (!this.validateForm(event.target) && callback) {
      this._callbacks[callback].errorCallback(event);
      return;
    }
  }

  _onFormInput(item) {
    this.validateFormElement(item);
  }

  _initValidate(parent) {
    const form = parent.querySelector('form');
    if (!form) {
      return;
    }

    const phoneParents = form.querySelectorAll('[data-validate-type="phone"]');
    phoneParents.forEach((item) => this._initPhoneInput(item));

    const callback = parent.dataset.callback;
    form.noValidate = true;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._onFormSubmit(event, callback);
    });

    form.addEventListener('input', (event) => {
      this._onFormInput(event.target);
    });

    form.addEventListener('reset', (event) => {
      this.reset(event.target);
    });
  }

  init() {
    this._validateParent = document.querySelectorAll('[data-form-validate]');
    if (!this._validateParent.length) {
      return;
    }
    this._validateParent.forEach((parent) => this._initValidate(parent));
  }
}


window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    const form = new Form();
    window.form = form;
    form.init();
  });
});

/* Form */

async function handleFormSubmit(evt) {
  evt.preventDefault();
  const formData = serializeForm(evt.target);
  fetch('#', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (response.ok) {
        modals.open('modal-success');
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      throw new Error('Error submitting form:', error);
    });
}

function serializeForm(formNode) {
  return new FormData(formNode);
}

const subscribeForm = document.querySelector('.modal__form');
subscribeForm.addEventListener('submit', handleFormSubmit);

/* Scroll */

const scrollStepsElements = document.querySelectorAll('[data-name="steps"]');
const stepsElement = document.querySelector('.steps');
const scrollLookbookElements = document.querySelectorAll('[data-name="lookbook"]');
const lookbookElement = document.querySelector('.lookbook');
const scrollReviewsElements = document.querySelectorAll('[data-name="reviews"]');
const reviewsElement = document.querySelector('.reviews');

scrollStepsElements.forEach((el) => {
  el.addEventListener('click', (evt) => {
    evt.preventDefault();
    stepsElement.scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  });
});

scrollLookbookElements.forEach((el) => {
  el.addEventListener('click', (evt) => {
    evt.preventDefault();
    lookbookElement.scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  });
});

scrollReviewsElements.forEach((el) => {
  el.addEventListener('click', (evt) => {
    evt.preventDefault();
    reviewsElement.scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  });
});

/* Fullscreen */

const fullScreenButtons = document.querySelectorAll('.lookbook__fullscreen');
const modalContent = document.querySelector('.modal__img');

fullScreenButtons.forEach((el) => el.addEventListener('click', (evt) => {
  evt.preventDefault();
  const imageSrc = `img/lookbook-${evt.target.dataset.id}-desktop@1x.png`;
  const image = new Image();
  image.src = imageSrc;
  image.style.minWidth = '294px';
  image.style.minHeight = '291px';
  image.onload = () => {
    modalContent.innerHTML = '';
    modalContent.appendChild(image);
    modals.open('modal-img');
  };
}));
