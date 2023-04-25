import {AppComponent} from "../core/AppComponent.js";


export class Board extends AppComponent {
    static className = 'input-area'

    constructor($root) {
        super($root, {
            listeners: ['click']
        })
    }

    toHTML() {
        return 'i am input-area'
    }

    onClick() {
      console.log('click')
    }



}
