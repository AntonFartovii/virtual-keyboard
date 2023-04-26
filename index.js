import {App} from "./components/App.js";
import {Board} from "./components/Board.js";
import {Textarea} from "./components/Textarea.js";
import {storage} from "./core/utils.js";

const defaultState = {
    lang: 'en',
    currentText: ''
}

export const initialState = storage('keyboard-state')
    ? storage('keyboard-state')
    : defaultState

const app = new App (
    '#app',
    {
        components: [Textarea, Board]
    }
)

app.render()
