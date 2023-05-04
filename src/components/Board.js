import {AppComponent} from '../core/AppComponent.js';
import {createBoard} from './BoardBuilder.js';
import {storage} from '../core/utils.js';
import {getClickedItem} from '../core/utils.js';

export class Board extends AppComponent {
  static className = 'section-input';

  constructor($root, options) {
    super($root, {
      listeners: ['mousedown', 'mouseup'],
      ...options,
    });
    this.isShiftPressed = false;
    this.isCapsPressed = false;
    this.isEn = false;
    this.mode = 'default';
  }

  toHTML() {
    const lang = storage('keyboard-state').lang;
    return createBoard(lang);
  }

  render() {
    this.$root.html(this.toHTML());
    this.initCapslock();
  }

  onMousedown(event) {
    this.keyHandler(event);
    this.$emit('Textarea:focus');
  }

  onMouseup(event) {
    this.keyHandler(event);
    this.$emit('Textarea:focus');
  }

  init() {
    super.init();
    this.initLanguage();
    this.$on('Textarea:keydown', this.keyHandler.bind(this));
    this.$on('Textarea:keyup', this.keyHandler.bind(this));
    this.$on('Toolbar:ChangeLang', this.render.bind(this));
  }

  keyHandler(event) {
    if (!event) return;
    const isBoardEvent = ['mousedown', 'mouseup'].includes(event.type);
    const isDownEvent = ['mousedown', 'keydown'].includes(event.type);

    const $key = isBoardEvent ?
        getClickedItem(event.target) :
        this.$root.find(`[data-code='${event.code}']`);
    if (!$key) return;
    const code = $key && $key.data.code;
    isBoardEvent && (event.code = code);
    isDownEvent ?
        this.keyDownHandle($key, event) :
        this.keyUpHandle($key, event);
    this.switchKeyBoard();
  }

  keyDownHandle($key, event) {
    event.code.toLowerCase().includes('shift') && (this.isShiftPressed = true);
    event.code.toLowerCase().includes('shift') && this.switchShiftMode(true);
    event.code === 'CapsLock' ?
        this.switchCapsMode() :
        $key.addClass('active');
    const value = this.getKeyValue($key.$el, event);
    this.$emit('Board:value', value);
    this.switchLanguage(event);
  }

  keyUpHandle($key, event) {
    event.code.toLowerCase().includes('shift') && (this.isShiftPressed = false);
    event.code !== 'CapsLock' && $key.removeClass('active');
    this.isShiftPressed === false && this.switchShiftMode(false);
  }

  getKeyValue(clickedKey, event = {}) {
    const type = clickedKey && clickedKey.dataset.type;
    const shiftValue = clickedKey && clickedKey.dataset.shiftValue;
    let value = clickedKey.dataset.value;
    if (type === 'alphabet') {
      if (this.mode === 'shift') {
        value = shiftValue ? shiftValue : value.toUpperCase();
        if (this.isCapsPressed) {
          value = shiftValue ? shiftValue : value.toLowerCase();
        }
      }
      if (this.mode === 'capslock') {
        value = value.toUpperCase();
        if (this.isShiftPressed) {
          value = shiftValue ? shiftValue : value.toLowerCase();
        }
      }
    }
    if (type === 'service') value = clickedKey.dataset.code;
    return value;
  }

  switchShiftMode() {
    if (this.isShiftPressed) {
      this.mode = 'shift';
    } else if (this.isCapsPressed) {
      this.mode = 'capslock';
    } else {
      this.mode = 'default';
    }
    this.switchKeyBoard();
  }

  switchCapsMode() {
    this.isCapsPressed = !this.isCapsPressed;
    const $capslock = this.$root.find(`[data-keycode="20"`);
    this.isCapsPressed ?
        $capslock.addClass('active') :
        $capslock.removeClass('active');

    if (this.isCapsPressed) {
      this.mode = 'capslock';
    } else if (this.isShiftPressed) {
      this.mode = 'shift';
    } else {
      this.mode = 'default';
    }
    this.switchKeyBoard();
  }

  switchKeyBoard() {
    this.toggleKeysMode('.key-alphabet .caps-shift-mode', false);
    this.toggleKeysMode('.key-alphabet .shift-value', false);
    if (this.mode === 'shift') {
      this.toggleKeysMode('.key-alphabet .default', false);
      this.toggleKeysMode('.key-alphabet .caps-mode', false);
      this.toggleKeysMode('.key-alphabet .shift-value', true);
      if (this.isCapsPressed) {
        this.toggleKeysMode('.key-alphabet .caps-shift-mode', true);
      } else {
        this.toggleKeysMode('.key-alphabet .shift-mode', true);
      }
    }
    if (this.mode === 'capslock') {
      this.toggleKeysMode('.key-alphabet .default', false);
      this.toggleKeysMode('.key-alphabet .shift-mode', false);
      if (this.isShiftPressed) {
        this.toggleKeysMode('.key-alphabet .caps-shift-mode', true);
        this.toggleKeysMode('.key-alphabet .shift-value', true);
      } else {
        this.toggleKeysMode('.key-alphabet .caps-mode', true);
      }
    }
    if (this.mode === 'default') {
      this.toggleKeysMode('.key-alphabet .shift-mode', false);
      this.toggleKeysMode('.key-alphabet .caps-mode', false);
      this.toggleKeysMode('.key-alphabet .default', true);
    }
  }

  toggleKeysMode(selector, condition) {
    const items = this.$root.findAll(selector);
    items.forEach((item) => {
      condition ?
          item.classList.add('active') :
          item.classList.remove('active');
    });
  }

  switchLanguage(event) {
    if (event.ctrlKey && event.altKey) {
      this.isEn ?
        this.$emit('Board:ChangeLang', 'ru') :
        this.$emit('Board:ChangeLang', 'en');
      this.isEn = !this.isEn;
    }
    this.initCapslock();
  }

  initCapslock() {
    if (this.isCapsPressed === true) {
      const $capslock = this.$root.find(`[data-keycode="20"`);
      $capslock.addClass('active');
    }
  }

  initLanguage() {
    const currentLang = storage('keyboard-state').lang;
    this.isEn = currentLang === 'en';
  }
}

