import {AppComponent} from "../core/AppComponent.js";
import {$} from "../core/dom.js";

export class Toolbar extends AppComponent {
    static className = 'toolbar-area'

    constructor($root, options) {
        super($root, {
            listeners: ['click'],
            ...options
        })
    }

    init() {
        super.init();
    }

    onClick( event ) {
        if (event.target.classList.contains('lang')) {
            const $el = $(event.target)
            console.log($el)
            $el && $el.toggleClass('active')
        }
    }


    toHTML() {
        return `<div class="lang lang-ru">RU</div>
            <div class="lang lang-en">EN</div>`
    }
}
