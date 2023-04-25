import {AppComponent} from "../core/AppComponent.js";


export class Textarea extends AppComponent {
    static className = 'output-area'

    constructor($root) {
        super($root, {
            listeners: ['click']
        })
    }

    toHTML() {
        return `<textarea placeholder="Here may to be your text..."></textarea>`
    }

    onClick() {
        console.log('click')
    }



}
