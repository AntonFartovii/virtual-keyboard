import {AppComponent} from "../core/AppComponent.js";
import {$} from "../core/dom.js";
import * as actions from '../store/actions.js'
import {storage} from "../core/utils.js";

export class Toolbar extends AppComponent {
    static className = 'toolbar-area'

  constructor($root, options) {
    super($root, {
      listeners: ['click'],
      ...options
    })
  }

  toHTML() {
    return `<div class="lang" data-id="ru">RU</div>
      <div class="lang" data-id="en">EN</div>`
  }

  init() {
    super.init();
    this.$on('Board:ChangeLang', this.changeLang.bind(this))
    const {lang} = storage('keyboard-state')
    this.changeLang( lang )
  }

  onClick( event ) {
    const $el = $(event.target)
    if ($el.containClass('lang')) {
      const lang = $el.data.id
      this.changeLang( lang )
      this.$dispatch(actions.langChange(lang))
      this.$emit('Toolbar:ChangeLang', lang)
    }
  }

  changeLang( lang ) {
    const $el = this.$root.find(`[data-id='${lang}']`)
    const items = this.$root.findAll('.lang')
    items.forEach( item => $(item).removeClass('active'))
    $el && $el.toggleClass('active')
  }
}
