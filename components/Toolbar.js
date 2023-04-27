import {AppComponent} from "../core/AppComponent.js";

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

    onClick() {

    }


    toHTML() {
        return '<div class="lang lang-ru">RU</div><div class="lang lang-en">EN</div>'
    }
}
