const header=document.querySelector(".main-header"),navToggle=document.querySelector(".main-header__toggle");header.classList.remove("main-header--no-js"),navToggle.addEventListener("click",(()=>{header.classList.contains("main-header--opened")?header.classList.remove("main-header--opened"):header.classList.add("main-header--opened")}));const lookbookSlider=document.querySelector(".lookbook__slider"),breakpoint=window.matchMedia("(min-width: 880px)"),initLookbookSlider=()=>{let e;const t=()=>{let e;e||(e=setTimeout((function(){e=null,s()}),100))},s=()=>{!0===breakpoint.matches?void 0!==e&&e.destroy(!0,!0):!1===breakpoint.matches&&lookbookSlider&&(e=new Swiper(lookbookSlider,{slidesPerView:"auto",slideToClickedSlide:!0,spaceBetween:8}))};breakpoint.addListener(t),t()};initLookbookSlider();const sliderReviewsElement=document.querySelector(".reviews__slider");if(sliderReviewsElement){new Swiper(".reviews__slider",{slidesPerView:"auto",autoHeight:!0,slideToClickedSlide:!0,spaceBetween:8,speed:1e3,pagination:{el:".reviews__pagination",type:"bullets",clickable:!0},breakpoints:{768:{slidesPerView:2,slidesPerGroup:2,spaceBetween:16}}})}const sliderPromoElement=document.querySelector(".promo__slider");if(sliderPromoElement){new Swiper(".promo__slider",{loop:!0,slidesPerView:1,autoHeight:!0,effect:"fade",fadeEffect:{crossFade:!0},speed:1500,autoplay:{delay:5e3},pagination:{el:".promo__pagination",type:"bullets",clickable:!0}})}class Tabs{constructor(){this._windowWidth=window.innerWidth,this._documentClickHandler=this._documentClickHandler.bind(this),this._init()}_init(){this._initAllTabs(),document.addEventListener("click",this._documentClickHandler)}_resizeObserver(){return new ResizeObserver((e=>{for(let t of e)t.target.classList.contains("is-active")&&this._updateTabHeight()}))}_documentClickHandler(e){const t=e.target;if(!t.closest('[data-tabs="control"]'))return;e.preventDefault();const s=t.closest('[data-tabs="control"]');this.openTab(s)}_initAllTabs(){const e=document.querySelectorAll('[data-tabs="parent"]'),t=document.querySelectorAll('[data-tabs="element"].for-load');e.forEach((e=>{this._initTab(e)})),t.forEach((e=>{e.classList.remove("for-load")}))}_removeAllActiveClasses(e,t){t.forEach((e=>{e.classList.remove("is-active")})),e.forEach(((e,t)=>{e.classList.remove("is-active"),e.setAttribute("data-index",t)}))}_setTabStartState(e,t,s,a,i,o){const n=this._returnActiveIndex(i),l="max"===t?this._returnMaxHeight(s):s[n].offsetHeight;this._removeAllActiveClasses(i,s),e.classList.add("no-transition"),i[n].classList.add("is-active"),s[n].classList.add("is-active"),"unset"!==t&&(a.style.height=`${l}px`),setTimeout((()=>{o&&e.classList.remove("no-transition")}),o)}_returnActiveIndex(e){let t=0,s=!0;return e.forEach(((e,a)=>{e.classList.contains("is-active")&&s&&(t=a,s=!1)})),t}_returnMaxHeight(e){let t=[];return e.forEach((e=>{t.push(e.offsetHeight)})),t.sort(((e,t)=>e-t)),t[t.length-1]}_returnScopeList(e,t){const s=[];return e.forEach((e=>{e.closest('[data-tabs="parent"]')===t&&s.push(e)})),s}_returnScopeChild(e,t){let s;return e.forEach((e=>{e.closest('[data-tabs="parent"]')===t&&(s=e)})),s}_updateTabHeight(){document.querySelectorAll('[data-tabs="element"].is-active').forEach((e=>{let t=!1;e.closest('[data-tabs="parent"]').closest('[data-tabs="element"]')&&(t=!0),this._setTabElementHeight(e,t)}))}_setTabElementHeight(e,t){const s=e.closest('[data-tabs="parent"]'),a=s.dataset.height,i=this._returnScopeChild(s.querySelectorAll('[data-tabs="content"]'),s),o=this._returnScopeList(s.querySelectorAll('[data-tabs="element"]'),s);t||s.classList.add("no-transition"),i.style.height="max"===a?`${this._returnMaxHeight(o)}px`:"unset"===a?null:`${this._returnScopeChild(s.querySelectorAll('[data-tabs="element"].is-active'),s).offsetHeight}px`,setTimeout((()=>s.classList.remove("no-transition")))}_initTab(e){const t=e.dataset.height,s=e.dataset.delay?e.dataset.delay:0,a=e.querySelector('[data-tabs="content"]'),i=this._returnScopeList(e.querySelectorAll('[data-tabs="control"]'),e),o=this._returnScopeList(e.querySelectorAll('[data-tabs="element"]'),e);this._setTabStartState(e,t,o,a,i,s),"unset"!==t&&o.forEach((e=>{this._resizeObserver().observe(e)})),setTimeout((()=>{e.classList.remove("no-transition-global")}))}reInit(){this._initAllTabs()}openTab(e){const t=e.dataset.index,s=e.closest('[data-tabs="parent"]');if(e.classList.contains("is-active")||s.classList.contains("no-action"))return;const a=s.dataset.delay?s.dataset.delay:0,i=s.dataset.height,o=s.querySelector('[data-tabs="content"]'),n=this._returnScopeList(s.querySelectorAll('[data-tabs="element"]'),s),l=this._returnScopeChild(s.querySelectorAll('[data-tabs="control"].is-active'),s),r=this._returnScopeChild(s.querySelectorAll('[data-tabs="element"].is-active'),s),c=o.offsetHeight,d=n[t].offsetHeight;s.classList.add("no-action"),document.activeElement.blur(),l&&l.classList.remove("is-active"),r&&r.classList.remove("is-active"),c>d?setTimeout((()=>{"max"!==i&&"unset"!==i&&(o.style.height=d+"px"),e.classList.add("is-active"),n[t].classList.add("is-active"),s.classList.remove("no-action")}),a):("max"!==i&&"unset"!==i&&(o.style.height=d+"px"),setTimeout((()=>{e.classList.add("is-active"),n[t].classList.add("is-active"),s.classList.remove("no-action")}),a))}}let tabs;const initTabs=()=>{tabs=new Tabs,window.tabs=tabs},control=document.querySelector(".faq__link");window.addEventListener("DOMContentLoaded",(()=>{window.addEventListener("load",(()=>{tabs=new Tabs,window.tabs=tabs}))}));class Accordions{constructor(){this._openHeight=0,this._windowWidth=window.innerWidth,this._documentClickHandler=this._documentClickHandler.bind(this),this._windowResizeHandler=this._windowResizeHandler.bind(this),this._init()}_init(){this.fullUpdate(),document.addEventListener("click",this._documentClickHandler),window.addEventListener("resize",this._windowResizeHandler)}_documentClickHandler(e){const t=e.target;if(!t.closest('[data-accordion="button"]'))return;e.preventDefault();const s=t.closest('[data-accordion="parent"]');if(s.dataset.destroy&&!window.matchMedia(s.dataset.destroy).matches)return;const a=t.closest('[data-accordion="element"]');a.classList.contains("is-active")?this.closeAccordion(a):this.openAccordion(a)}_windowResizeHandler(){this._windowWidth!==window.innerWidth&&(this._windowWidth=window.innerWidth,this.updateAccordionsHeight())}closeAllAccordion(e){e.querySelectorAll('[data-accordion="element"]').forEach((t=>{t.closest('[data-accordion="parent"]')===e&&this.closeAccordion(t)}))}updateAccordionsHeight(e=null){if(e){const t=e.querySelector('[data-accordion="content"]');return t.style.transition="none",t.style.maxHeight=`${t.scrollHeight}px`,void setTimeout((()=>{t.style.transition=null}))}document.querySelectorAll('[data-accordion="element"]:not(.is-active)').forEach((e=>{const t=e.closest('[data-accordion="parent"]'),s=e.querySelector('[data-accordion="content"]');!t.dataset.destroy||window.matchMedia(t.dataset.destroy).matches?s.style.maxHeight=null:s.style.maxHeight="100%"}));document.querySelectorAll('[data-accordion="element"].is-active').forEach((e=>{const t=e.querySelector('[data-accordion="content"]'),s=e.closest('[data-accordion="parent"]');!s.dataset.destroy||window.matchMedia(s.dataset.destroy).matches?(t.style.transition="none",t.style.maxHeight=`${t.scrollHeight}px`,setTimeout((()=>{t.style.transition=null}))):t.style.maxHeight="100%"}))}fullUpdate(e=null,t=!1){let s;s=e?e.querySelectorAll('[data-accordion="element"].is-active'):document.querySelectorAll('[data-accordion="element"].is-active'),s.forEach((e=>{e.querySelector('[data-accordion="parent"]')||this.openAccordion(e,t)})),this.updateAccordionsHeight()}openAccordion(e,t=!0){const s=e.closest('[data-accordion="parent"]'),a=e.querySelector('[data-accordion="content"]');this._openHeight+=a.scrollHeight,s.hasAttribute("data-single")&&this.closeAllAccordion(s),e.classList.add("is-active"),t?a.style.maxHeight=`${this._openHeight}px`:(a.style.transition="none",a.style.maxHeight=`${this._openHeight}px`,setTimeout((()=>{a.style.transition=null}))),s.closest('[data-accordion="element"]')?this.openAccordion(s.closest('[data-accordion="element"]'),t):this._openHeight=0}closeAccordion(e,t=!0){const s=e.querySelector('[data-accordion="content"]');s&&(e.classList.remove("is-active"),t?s.style.maxHeight="0":(s.style.transition="none",s.style.maxHeight="0",setTimeout((()=>{s.style.transition=null}))))}}let accordions;const initAccordions=()=>{accordions=new Accordions,window.accordions=accordions};window.addEventListener("DOMContentLoaded",(()=>{window.addEventListener("load",(()=>{accordions=new Accordions,window.accordions=accordions}))}));const iosChecker=()=>["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"ontouchend"in document,SELECTORS=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden])","iframe","object","embed","[contenteditable]",'[tabindex]:not([tabindex^="-"])'];class FocusLock{constructor(){this._lockedSelector=null,this._focusableElements=null,this._endElement=null,this._selectors=SELECTORS,this._documentKeydownHandler=this._documentKeydownHandler.bind(this)}_documentKeydownHandler(e){const t=document.activeElement;if("Tab"===e.key){if(!this._focusableElements.length)return e.preventDefault(),void t.blur();if(1===this._focusableElements.length)return e.preventDefault(),void this._focusableElements[0].focus();if(this._focusableElements.length>1&&!t.closest(this._lockedSelector))return e.preventDefault(),void this._focusableElements[0].focus()}"Tab"!==e.key||e.shiftKey||t!==this._focusableElements[this._focusableElements.length-1]||(e.preventDefault(),this._focusableElements[0].focus()),"Tab"===e.key&&e.shiftKey&&t===this._focusableElements[0]&&(e.preventDefault(),this._focusableElements[this._focusableElements.length-1].focus())}lock(e,t=!0){this.unlock(),this._lockedSelector=e;const s=document.querySelector(this._lockedSelector);if(!s)return;this._focusableElements=s.querySelectorAll(this._selectors),this._endElement=document.activeElement;const a=s.querySelector("[data-focus]")||this._focusableElements[0];this._endElement&&this._endElement.blur(),a&&t&&a.focus(),document.addEventListener("keydown",this._documentKeydownHandler)}unlock(e=!0){this._endElement&&e&&this._endElement.focus(),this._lockedSelector=null,this._focusableElements=null,this._endElement=null,document.removeEventListener("keydown",this._documentKeydownHandler)}}window.focusLock=new FocusLock;class ScrollLock{constructor(){this._iosChecker=iosChecker,this._lockClass=this._iosChecker()?"scroll-lock-ios":"scroll-lock",this._scrollTop=null,this._fixedBlockElements=document.querySelectorAll("[data-fix-block]")}_getScrollbarWidth(){return window.innerWidth-document.documentElement.clientWidth}_getBodyScrollTop(){return self.pageYOffset||document.documentElement&&document.documentElement.ScrollTop||document.body&&document.body.scrollTop}disableScrolling(){this._scrollTop=document.body.dataset.scroll=document.body.dataset.scroll?document.body.dataset.scroll:this._getBodyScrollTop(),this._getScrollbarWidth()&&(document.body.style.paddingRight=`${this._getScrollbarWidth()}px`,this._fixedBlockElements.forEach((e=>{e.style.paddingRight=`${this._getScrollbarWidth()}px`}))),document.body.style.top=`-${this._scrollTop}px`,document.body.classList.add(this._lockClass)}enableScrolling(){document.body.classList.remove(this._lockClass),window.scrollTo(0,+document.body.dataset.scroll),document.body.style.paddingRight=null,document.body.style.top=null,this._fixedBlockElements.forEach((e=>{e.style.paddingRight=null})),document.body.removeAttribute("data-scroll"),this._scrollTop=null}}window.scrollLock=new ScrollLock;class Modals{constructor(e={}){this._scrollLock=new ScrollLock,this._focusLock=new FocusLock,this._modalOpenElements=document.querySelectorAll("[data-open-modal]"),this._stackModalElements=[],this._openedModalElement=null,this._modalName=null,this._enableScrolling=!0,this._settingKey="default",this._settings=e,this._preventDefault=this._settings[this._settingKey].preventDefault,this._stopPlay=this._settings[this._settingKey].stopPlay,this._lockFocus=this._settings[this._settingKey].lockFocus,this._startFocus=this._settings[this._settingKey].startFocus,this._focusBack=this._settings[this._settingKey].focusBack,this._eventTimeout=this._settings[this._settingKey].eventTimeout,this._resetScrollPos=this._settings[this._settingKey].resetScrollPos,this._openCallback=this._settings[this._settingKey].openCallback,this._closeCallback=this._settings[this._settingKey].closeCallback,this._documentKeydownHandler=this._documentKeydownHandler.bind(this),this._documentClickHandler=this._documentClickHandler.bind(this),this._modalClickHandler=this._modalClickHandler.bind(this),this._init()}_init(){this._modalOpenElements.length&&document.addEventListener("click",this._documentClickHandler)}_setSettings(e=this._settingKey){this._settings[e]&&(this._preventDefault="boolean"==typeof this._settings[e].preventDefault?this._settings[e].preventDefault:this._settings[this._settingKey].preventDefault,this._stopPlay="boolean"==typeof this._settings[e].stopPlay?this._settings[e].stopPlay:this._settings[this._settingKey].stopPlay,this._lockFocus="boolean"==typeof this._settings[e].lockFocus?this._settings[e].lockFocus:this._settings[this._settingKey].lockFocus,this._startFocus="boolean"==typeof this._settings[e].startFocus?this._settings[e].startFocus:this._settings[this._settingKey].startFocus,this._focusBack="boolean"==typeof this._settings[e].lockFocus?this._settings[e].focusBack:this._settings[this._settingKey].focusBack,this._resetScrollPos="boolean"==typeof this._settings[e].resetScrollPos?this._settings[e].resetScrollPos:this._settings[this._settingKey].resetScrollPos,this._eventTimeout="number"==typeof this._settings[e].eventTimeout?this._settings[e].eventTimeout:this._settings[this._settingKey].eventTimeout,this._openCallback=this._settings[e].openCallback||this._settings[this._settingKey].openCallback,this._closeCallback=this._settings[e].closeCallback||this._settings[this._settingKey].closeCallback)}_documentClickHandler(e){const t=e.target;t.closest("[data-open-modal]")&&(e.preventDefault(),this._modalName=t.closest("[data-open-modal]").dataset.openModal,this._modalName&&this.open())}_documentKeydownHandler(e){("Escape"===e.key||"Esc"===e.key)&&(e.preventDefault(),this.close(document.querySelector(".modal.is-active").dataset.modal))}_modalClickHandler(e){const t=e.target;t.closest("[data-close-modal]")&&(t.closest('[data-close-modal="back"]')?this.back():(this.close(t.closest("[data-modal]").dataset.modal),this._stackModalElements=[]))}_addListeners(e){e.addEventListener("click",this._modalClickHandler),document.addEventListener("keydown",this._documentKeydownHandler)}_removeListeners(e){e.removeEventListener("click",this._modalClickHandler),document.removeEventListener("keydown",this._documentKeydownHandler)}_stopInteractive(e){this._stopPlay&&(e.querySelectorAll("video, audio").forEach((e=>e.pause())),e.querySelectorAll("[data-iframe]").forEach((e=>{e.querySelector("iframe").contentWindow.postMessage('{"event": "command", "func": "pauseVideo", "args": ""}',"*")})))}_autoPlay(e){e.querySelectorAll("[data-iframe]").forEach((e=>{e.closest("[data-auto-play]")&&e.querySelector("iframe").contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*")}))}open(e=this._modalName){const t=document.querySelector(`[data-modal="${e}"]`);t&&!t.classList.contains("is-active")&&(document.removeEventListener("click",this._documentClickHandler),this._openedModalElement=document.querySelector(".modal.is-active"),this._openedModalElement&&(this._enableScrolling=!1,this.close(this._openedModalElement.dataset.modal)),this._setSettings(e),t.classList.add("is-active"),e!==this._stackModalElements[this._stackModalElements.length-1]&&this._stackModalElements.push(e),this._openedModalElement||this._scrollLock.disableScrolling(),this._openCallback&&this._openCallback(),this._lockFocus&&this._focusLock.lock(".modal.is-active",this._startFocus),this._resetScrollPos&&t.scrollTo(0,0),setTimeout((()=>{this._addListeners(t),this._autoPlay(t),document.addEventListener("click",this._documentClickHandler)}),this._eventTimeout))}back(){if(!this._stackModalElements.length)return;const e=this._stackModalElements[this._stackModalElements.length-1],t=this._stackModalElements[this._stackModalElements.length-2];1===this._stackModalElements.length&&(this._stackModalElements=[]),t&&(this._stackModalElements.pop(),this.open(t)),this.close(e)}close(e=this._modalName){const t=document.querySelector(`[data-modal="${e}"]`);document.removeEventListener("click",this._documentClickHandler),t&&t.classList.contains("is-active")&&(this._lockFocus&&this._focusLock.unlock(this._focusBack),t.classList.remove("is-active"),this._removeListeners(t),this._stopInteractive(t),this._closeCallback&&this._closeCallback(),this._enableScrolling&&setTimeout((()=>{this._scrollLock.enableScrolling()}),this._eventTimeout),setTimeout((()=>{document.addEventListener("click",this._documentClickHandler)}),this._eventTimeout),this._setSettings("default"),this._enableScrolling=!0)}}let modals;const settings={default:{preventDefault:!0,stopPlay:!0,lockFocus:!0,startFocus:!0,focusBack:!0,resetScrollPos:!1,eventTimeout:400,openCallback:!1,closeCallback:!1}},initModals=()=>{const e=document.querySelectorAll(".modal");e.length&&e.forEach((e=>{setTimeout((()=>{e.classList.remove("modal--preload")}),100)})),modals=new Modals(settings),window.modals=modals};window.addEventListener("DOMContentLoaded",(()=>{window.addEventListener("load",(()=>{initModals()}))}));const baseSuccessCallback=e=>{e.preventDefault(),modals.open("modal-success")},baseErrorCallback=e=>{e.preventDefault()},callbacks={base:{reset:!0,resetTimeout:500,successCallback:baseSuccessCallback,errorCallback:baseErrorCallback}};class Message{constructor(){this._baseErrorText="This field is required"}_messageTemplate(e,t){return`<span class="input-message ${"valid"===t?"is-valid":"is-invalid"}">${e}</span>`}removeMessage(e){const t=e.querySelector(".input-message");t&&t.remove()}renderMessage(e,t,s){this.removeMessage(e),e.insertAdjacentHTML("beforeend",this._messageTemplate(t,s))}}const setLimitationError=e=>{console.error(`Переданный формат ограничения(data-limitation="${e}") - не поддерживается. Проверьте корректность введённых значений.`)},getLimitationsRegEx=e=>{switch(e){case"digit":return/[^\d]/g;case"name":return/[^a-zA-Zа-яёА-ЯЁ\-\s]/g;case"letters":return/[^a-zA-Zа-яёА-ЯЁ\s]/g;case"letters-and-digit":return/[^a-zA-Zа-яёА-ЯЁ\s\d]/g;case"cyrillic":return/[^а-яёА-ЯЁ\s]/g;case"latin":return/[^a-zA-Z\s]/g;default:return setLimitationError(e)}},getMatrixLimitationsRegEx=e=>{switch(e){case"digit":return/[^\d]/g;case"name":return/[^\а-яё\А-ЯЁ\a-z\A-Z\-]]/g;case"letters":return/[^\а-яё\А-ЯЁ\a-z\A-Z]/g;case"letters-and-digit":return/[^\а-яё\А-ЯЁ\a-z\A-Z\d]/g;case"cyrillic":return/[^\а-яё\А-ЯЁ]/g;case"latin":return/[^\a-z\A-Z]/g;default:return!1}},matrixReplace=(e,t,s)=>{if(!t)return console.error('При валидации по матрице обязательно указывать формат матрицы: data-matrix=""'),void(e.value="");if(!s)return console.error('При валидации по матрице обязательно указывать формат ограничений: data-matrix-limitations=""'),void(e.value="");const a=t.replace(s,"");let i=e.value.replace(s,""),o=0;a.length>=i.length&&(i=a),e.value=t.replace(/./g,(e=>/[_\^]/.test(e)&&o<i.length?i.charAt(o++):o>=i.length?"":e))},getMailRegEx=()=>/[a-zA-Zа-яёА-ЯЁ0-9]{1}([a-zA-Zа-яёА-ЯЁ0-9\-_\.]{1,})?@[a-zA-Zа-яёА-ЯЁ0-9\-]{1}([a-zA-Zа-яёА-ЯЁ0-9.\-]{1,})?[a-zA-Zа-яёА-ЯЁ0-9\-]{1}\.[a-zA-Zа-яёА-ЯЁ]{2,6}/,baseCountryCode="+",baseMatrix="_(___) ___ __ __",phoneLength="+".length+baseMatrix.length,onPhoneInputInput=e=>{const t=`+${baseMatrix}`,s=t.replace(/\D/g,"");let a=0,i=e.target.value.replace(/\D/g,"");s.length>=i.length&&(i=s),e.target.value=t.replace(/./g,(e=>/[_\d]/.test(e)&&a<i.length?i.charAt(a++):a>=i.length?"":e))},onPhoneInputFocus=({target:e})=>{e.value||(e.value="+"),e.addEventListener("input",onPhoneInputInput),e.addEventListener("blur",onPhoneInputBlur),e.addEventListener("keydown",onPhoneInputKeydown),e.addEventListener("paste",onPhoneInputPaste),e.addEventListener("click",onPhoneInputClick)},onPhoneInputClick=e=>{e.target.selectionStart<4&&(e.preventDefault(),e.target.setSelectionRange(3,3))},onPhoneInputPaste=e=>{e.target.setSelectionRange(0,0),e.target.selectionStart||setTimeout((()=>{e.target.value.startsWith("+7")||(e.target.value.startsWith("+8")?e.target.value=`+7 ${e.target.value.slice(3)}`:e.target.value="")}))},onPhoneInputKeydown=e=>{e.target.selectionStart<4&&(37===e.keyCode||13===e.keyCode)&&(e.preventDefault(),e.target.setSelectionRange(3,3))},onPhoneInputBlur=({target:e})=>{if("+"===e.value){const t=e.closest('[data-validate-type="phone"]');if(e.value="",!t.hasAttribute("data-required")){t.classList.remove("is-valid"),t.classList.remove("is-invalid");const e=t.querySelector(".input-message");e&&e.remove()}t.classList.remove("not-empty"),e.removeEventListener("input",onPhoneInputInput),e.removeEventListener("blur",onPhoneInputBlur),e.removeEventListener("keydown",onPhoneInputKeydown),e.removeEventListener("paste",onPhoneInputPaste),e.removeEventListener("click",onPhoneInputClick)}},initPhoneInput=e=>{const t=e.querySelector("input");e.dataset.phoneLength=phoneLength,t.addEventListener("focus",onPhoneInputFocus)};class Validator{constructor(){this._getLimitationsRegEx=getLimitationsRegEx,this._getMatrixLimitationsRegEx=getMatrixLimitationsRegEx,this._getMailRegEx=getMailRegEx,this._matrixReplace=matrixReplace,this._message=new Message}_renderMessage(e,t,s){(t.hasAttribute("data-required")||s.value)&&(e?t.hasAttribute("data-message-success")?this._message.renderMessage(t,t.dataset.messageSuccess,"valid"):this._message.removeMessage(t):(t.classList.add("is-invalid"),s.classList.add("error"),t.hasAttribute("data-message-base")&&!s.value?this._message.renderMessage(t,t.dataset.messageBase,"invalid"):t.hasAttribute("data-message-extra")&&s.value?this._message.renderMessage(t,t.dataset.messageExtra,"invalid"):!t.hasAttribute("data-message-extra")&&t.hasAttribute("data-message-base")&&s.value?this._message.renderMessage(t,t.dataset.messageBase,"invalid"):this._message.removeMessage(t)))}_setItemValidState(e,t){(e.hasAttribute("data-required")||t.value)&&(e.classList.add("is-valid"),e.classList.remove("is-invalid"),t.setAttribute("aria-invalid","false"),this._message.removeMessage(e))}_setItemInvalidState(e,t){(e.hasAttribute("data-required")||t.value)&&(e.classList.remove("is-valid"),t.setAttribute("aria-invalid","true"))}_simpleLimitation(e,t){e.value=e.value.replace(this._getLimitationsRegEx(t),"")}_matrixLimitation(e,t,s){this._matrixReplace(e,t,s)}_validateTextInput(e,t){let s=!0;return t.value.length>=(+t.getAttribute("minlength")||1)?this._setItemValidState(e,t):(this._setItemInvalidState(e,t),s=!1),s}_validateMatrixInput(e,t){let s=!0;return t.value.length===t.closest("[data-matrix]").dataset.matrix.length?this._setItemValidState(e,t):(this._setItemInvalidState(e,t),s=!1),s}_validateEmailInput(e,t){let s=!0;return new RegExp(this._getMailRegEx(),"").test(t.value)?this._setItemValidState(e,t):(this._setItemInvalidState(e,t),s=!1),s}_validatePhoneInput(e,t){let s=!0;return t.value.length>=+e.dataset.phoneLength?this._setItemValidState(e,t):(this._setItemInvalidState(e,t),s=!1),s}_validateCheckbox(e,t){let s=!0;return t.checked?this._setItemValidState(e,t):(this._setItemInvalidState(e,t),s=!1),s}_findSelectedOption(e){let t=!1;return e.forEach((e=>{e.value&&e.selected&&(t=!0)})),t}_validateSelect(e,t){const s=t.querySelectorAll("option"),a=e.querySelector(".custom-select__text");t.setAttribute("aria-invalid","false");let i=!0;return this._findSelectedOption(s)?this._setItemValidState(e,t):(this._setItemInvalidState(e,t),e.classList.remove("not-empty"),a.innerHTML="",i=!1),i}_returnCheckedElements(e){let t=!1;return e.forEach((e=>{e.checked&&(t=!0)})),t}_removeGroupAria(e){e.forEach((e=>{e.checked?(e.setAttribute("aria-required",!0),e.setAttribute("aria-invalid",!1)):(e.removeAttribute("aria-required"),e.removeAttribute("aria-invalid"))}))}_setGroupAria(e){e.forEach((e=>{e.setAttribute("aria-required",!0),e.setAttribute("aria-invalid",!0)}))}_validateToggleGroup(e){const t=e.querySelectorAll("input");let s=!0;return this._returnCheckedElements(t)?(this._removeGroupAria(t),e.classList.remove("is-invalid"),e.classList.add("is-valid"),this._message.removeMessage(e)):(this._setGroupAria(t),e.classList.remove("is-valid"),s=!1),s}_customExample(e,t){let s=!0;return t.value.length?t.value.length<t.minLength?(e.dataset.messageBase=`Осталось ввести ещё ${t.minLength-t.value.length} символов`,this._setItemInvalidState(e,t),s=!1):t.value.length>t.minLength?(e.dataset.messageBase=`Вы ввели ${t.value.length-t.minLength} лишних символов`,this._setItemInvalidState(e,t),s=!1):(e.dataset.messageSuccess="Поле заполнено корректно",this._setItemValidState(e,t),s=!0):(e.dataset.messageBase="Поле обязательно к заполнению",this._setItemInvalidState(e,t),s=!1),s}_validateFile(e,t){let s=!0;const a=!e.dataset.maxSize||!t.files[0]||t.files[0].size<+e.dataset.maxSize;return t.value&&a?this._setItemValidState(e,t):(this._setItemInvalidState(e,t),s=!1),s}_validateInput(e,t,s){switch(e){case"text":return this._validateTextInput(t,s);case"matrix":return this._validateMatrixInput(t,s);case"email":return this._validateEmailInput(t,s);case"phone":return this._validatePhoneInput(t,s);case"checkbox":return this._validateCheckbox(t,s);case"select":return this._validateSelect(t,s);case"toggle-group":return this._validateToggleGroup(t,s);case"file":return this._validateFile(t,s);case"custom-example":return this._customExample(t,s);default:return!1}}validateFormElement(e,t=!1){const s=e.closest("[data-validate-type]");if(!s)return;if(!s.hasAttribute("data-required")){(s.querySelector("input")||s.querySelector("select")||s.querySelector("textarea")).value||(s.classList.remove("is-valid"),s.classList.remove("is-invalid"))}const a=s.hasAttribute("data-on-input-validate");s.hasAttribute("data-limitation")&&this._simpleLimitation(e,s.dataset.limitation),"matrix"===s.dataset.validateType&&this._matrixLimitation(e,s.dataset.matrix,this._getMatrixLimitationsRegEx(s.dataset.matrixLimitation));const i=this._validateInput(s.dataset.validateType,s,e);(a||t)&&this._renderMessage(i,s,e)}_fullValidate(e){let t=!0;return e.forEach((e=>{const s=e.querySelector("input")||e.querySelector("select")||e.querySelector("textarea");this.validateFormElement(s,!0),e.classList.contains("is-invalid")&&(t=!1)})),t}validateForm(e){const t=e.querySelectorAll("[data-validate-type]");return this._fullValidate(t)}}class Form{constructor(){this._validator=new Validator,this._initPhoneInput=initPhoneInput,this._callbacks=callbacks}_resetSelect(e){const t=e.querySelector("select"),s=t.options.selectedIndex,a=t.options[s],i=e.querySelector(".custom-select__text"),o=e.querySelectorAll(".custom-select__item");i.textContent=a.textContent,o.forEach(((e,t)=>{t!==s-1?e.setAttribute("aria-selected","false"):e.setAttribute("aria-selected","true")})),t.value||(e.classList.remove("not-empty"),e.classList.remove("is-valid"))}_resetSelects(e){e.querySelectorAll("[data-select]").forEach((e=>{this._resetSelect(e)}))}reset(e){e.reset(),e.querySelectorAll(".is-invalid").forEach((e=>e.classList.remove("is-invalid"))),e.querySelectorAll(".is-valid").forEach((e=>e.classList.remove("is-valid"))),e.querySelectorAll(".input-message").forEach((e=>e.remove())),setTimeout((()=>{this._resetSelects(e)}))}initPhoneInput(e){this._initPhoneInput(e)}validateForm(e){return this._validator.validateForm(e)}validateFormElement(e){return this._validator.validateFormElement(e)}_onFormSubmit(e,t=null){if(this.validateForm(e.target)&&t)return this._callbacks[t].successCallback(e),void(this._callbacks[t].reset&&setTimeout((()=>{this.reset(e.target)}),this._callbacks[t].resetTimeout?this._callbacks[t].resetTimeout:500));this.validateForm(e.target)||!t||this._callbacks[t].errorCallback(e)}_onFormInput(e){this.validateFormElement(e)}_initValidate(e){const t=e.querySelector("form");if(!t)return;t.querySelectorAll('[data-validate-type="phone"]').forEach((e=>this._initPhoneInput(e)));const s=e.dataset.callback;t.noValidate=!0,t.addEventListener("submit",(e=>{e.preventDefault(),this._onFormSubmit(e,s)})),t.addEventListener("input",(e=>{this._onFormInput(e.target)})),t.addEventListener("reset",(e=>{this.reset(e.target)}))}init(){this._validateParent=document.querySelectorAll("[data-form-validate]"),this._validateParent.length&&this._validateParent.forEach((e=>this._initValidate(e)))}}async function handleFormSubmit(e){e.preventDefault();const t=serializeForm(e.target);fetch("#",{method:"POST",body:t}).then((e=>{if(!e.ok)throw new Error("Form submission failed");modals.open("modal-success")})).catch((e=>{throw new Error("Error submitting form:",e)}))}function serializeForm(e){return new FormData(e)}window.addEventListener("DOMContentLoaded",(()=>{window.addEventListener("load",(()=>{const e=new Form;window.form=e,e.init()}))}));const subscribeForm=document.querySelector(".modal__form");subscribeForm.addEventListener("submit",handleFormSubmit);const scrollStepsElements=document.querySelectorAll('[data-name="steps"]'),stepsElement=document.querySelector(".steps"),scrollLookbookElements=document.querySelectorAll('[data-name="lookbook"]'),lookbookElement=document.querySelector(".lookbook"),scrollReviewsElements=document.querySelectorAll('[data-name="reviews"]'),reviewsElement=document.querySelector(".reviews");scrollStepsElements.forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault(),stepsElement.scrollIntoView({block:"start",behavior:"smooth"})}))})),scrollLookbookElements.forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault(),lookbookElement.scrollIntoView({block:"start",behavior:"smooth"})}))})),scrollReviewsElements.forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault(),reviewsElement.scrollIntoView({block:"start",behavior:"smooth"})}))}));const fullScreenButtons=document.querySelectorAll(".lookbook__fullscreen"),modalContent=document.querySelector(".modal__img");fullScreenButtons.forEach((e=>e.addEventListener("click",(e=>{e.preventDefault();const t=`img/lookbook-${e.target.dataset.id}-desktop@1x.png`,s=new Image;s.src=t,s.style.minWidth="294px",s.style.minHeight="291px",s.onload=()=>{modalContent.innerHTML="",modalContent.appendChild(s),modals.open("modal-img")}}))));