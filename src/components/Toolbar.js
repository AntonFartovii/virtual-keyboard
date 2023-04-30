import {AppComponent} from "../core/AppComponent.js";
import {$} from "../core/dom.js";
import * as actions from '../store/actions.js'
import {storage} from "../core/utils.js";

export class Toolbar extends AppComponent {
    static className = 'section-toolbar'

  constructor($root, options) {
    super($root, {
      listeners: ['click'],
      ...options
    })
  }


  toHTML() {
    return `<div class="section-wrapper toolbar-wrapper"><div class="lang" data-id="ru">RU</div>
      <div class="lang" data-id="en">EN</div></div>`
  }

  init() {
    super.init();
    this.$on('Board:ChangeLang', this.changeLang.bind(this))
    const {lang} = storage('keyboard-state')
    this.initLang( lang )
  }

  onClick( event ) {
    const $el = $(event.target)
    $el.containClass('lang') && this.changeLang( $el.data.id )
    this.$emit('Textarea:focus')
  }

  changeLang( lang ) {
    this.initLang( lang )
    this.$dispatch( actions.langChange(lang) )
    this.$emit('Toolbar:ChangeLang', lang )
  }

  initLang( lang ) {
    const $el = this.$root.find(`[data-id='${lang}']`)
    const items = this.$root.findAll('.lang')
    items.forEach( item => $(item).removeClass('active'))
    $el && $el.addClass('active')
  }
}
