import {AppComponent} from "../core/AppComponent.js";
import {createBoard} from "./BoardBuilder.js";
import {storage} from "../core/utils.js";
import * as actions from '../store/actions.js'

export class Board extends AppComponent {
  static className = 'input-area'

  constructor($root, options) {
    super($root, {
      listeners: ['click'],
      ...options
    })
  }

  init() {
    super.init();
    this.$on('Textarea:keydown', this.keyHandle.bind(this))
    this.$on('Textarea:keyup', this.keyHandle.bind(this))
    this.$on('Toolbar:ChangeLang', this.render.bind(this))
    this.initCapslock()
  }

  keyHandle( event ) {
    const $key = this.$root.find(`[data-keycode='${event.keyCode}']`)

    if (event.shiftKey && event.altKey) {
      if (event.code === 'KeyE') {
        this.$emit('Board:ChangeLang', 'en')
      }
      if (event.code === 'KeyR') {
        this.$emit('Board:ChangeLang', 'ru')
      }
    }

    if ( event.type === 'keyup') {
      if (event.keyCode == '20') {
        this.switchCapslock()
        return
      }
    }
    if ( event.type === 'keydown') {
      if (event.keyCode == '9') {
        event.preventDefault()
      }
    }

    event.type === 'keydown'
    ? $key.addClass('active')
    : $key.removeClass('active')
  }

  toHTML( lang ) {
    lang = lang || storage('keyboard-state').lang
    return createBoard( lang )
  }

  render( lang ) {
    const html = this.toHTML( lang )
    this.$root.html( html )
    this.initCapslock()
  }

  onClick( event ) {
    const clickedKey = getClickedItem( event.target )
    clickedKey && this.$emit('board:click', clickedKey )
    this.keyEffect( clickedKey )
  }

  keyEffect( clickedKey ) {
    const keyCode = clickedKey && clickedKey.dataset.keycode
    keyCode === '20' && this.switchCapslock()
  }

  switchCapslock() {
    this.$dispatch(actions.switchCapslock())
    this.initCapslock()
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

