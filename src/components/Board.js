import {AppComponent} from "../core/AppComponent.js";
import {createBoard} from "./BoardBuilder.js";
import {storage} from "../core/utils.js";
import * as actions from '../store/actions.js'

export class Board extends AppComponent {
  static className = 'section-input'

  constructor($root, options) {
    super($root, {
      listeners: ['click', 'keydown'],
      ...options
    })
  }

  toHTML( ) {
    const lang = storage('keyboard-state').lang
    return createBoard( lang )
  }

  render() {
    const html = this.toHTML()
    this.$root.html( html )
    this.initCapslock()
  }

  onKeydown() {
    super.onKeydown();
  }

  onClick( event ) {
    const clickedKey = getClickedItem( event.target )
    const value = this.getKeyValue( clickedKey )
    clickedKey && this.$emit('Board:click', value )
    this.keyEffect( clickedKey )
    this.$emit('Textarea:focus')
  }

  keyEffect( clickedKey ) {
    const keyCode = clickedKey && clickedKey.dataset.keycode
    keyCode === '20' && this.switchCapslock()
  }

  init() {
    super.init();
    this.$on('Textarea:keydown', this.keyDownHandle.bind(this))
    this.$on('Textarea:keyup', this.keyUpHandle.bind(this))
    this.$on('Toolbar:ChangeLang', this.render.bind(this))
    this.initCapslock()
  }

  keyDownHandle( event ) {
    const $key = this.$root.find(`[data-code='${event.code}']`)
    event.code !== 'CapsLock' && $key.addClass('active')

    this.switchLanguage( event )

    const value = this.getKeyValue( $key.$el, event )

    this.$emit('Board:value', value)

    event.shiftKey === true && this.toUpperCase( true )
  }

  keyUpHandle( event ) {
    const $key = this.$root.find(`[data-code='${event.code}']`)

    event.code === 'CapsLock'
        ? this.switchCapslock()
        : $key.removeClass('active')
    event.shiftKey === false && this.toUpperCase( false )
  }

  getKeyValue( clickedKey, event = {}) {
    const type = clickedKey && clickedKey.dataset.type
    const shiftValue = clickedKey && clickedKey.dataset.shiftValue
    let value = null
    if (type === 'alphabet') {
      value = clickedKey.dataset.value
      if ( event.shiftKey === true ) {
        if ( shiftValue ) value = shiftValue
        value = value.toUpperCase()
      }
    }
    if (type === 'service') value = clickedKey.dataset.code
    return value
  }

  toUpperCase( condition ) {
    const keysForUp = this.$root.findAll('.key-alphabet .value')
    keysForUp.forEach( key => {
      condition
          ? key.classList.add('active')
          : key.classList.remove('active')
    })
    const keysSpecial = this.$root.findAll('.key-special .shift-value')
    keysSpecial.forEach( key => {
      condition
          ? key.classList.add('active')
          : key.classList.remove('active')
    })
  }

  switchCapslock() {
    this.$dispatch(actions.switchCapslock())
    this.initCapslock()
  }

  switchLanguage( event ) {
  if (event.shiftKey && event.altKey) {
    this.toUpperCase( false )
    if (event.code === 'KeyE') {
            this.$emit('Board:ChangeLang', 'en')
        }
        if (event.code === 'KeyR') {
            this.$emit('Board:ChangeLang', 'ru')
        }
    return
    }
  }

  initCapslock() {
    const $capslock = this.$root.find(`[data-keycode="20"`)
    storage('keyboard-state').capslock
    ? $capslock.addClass('active')
    : $capslock.removeClass('active')
  }
}

function getClickedItem( targetElement ) {

    if ( targetElement.classList.contains('key') ) {
        return targetElement
    }

    const parentElement = targetElement.parentElement
    if ( parentElement.classList.contains('key') )  {
        return parentElement
    }

    return null
}

