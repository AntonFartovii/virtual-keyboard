import {App} from "./components/App.js";
import {Board} from "./components/Board.js";
import {Textarea} from "./components/Textarea.js";
import {storage} from "./core/utils.js";
import {Toolbar} from "./components/Toolbar.js";
import {createStore} from "./core/store.js";

const defaultState = {
    lang: 'en',
    currentText: ''
}

export const initialState = storage('keyboard-state')
    ? storage('keyboard-state')
    : defaultState

const store = createStore(()=>{}, initialState )

const app = new App (
    '#app',
    {
        components: [Toolbar, Textarea, Board],
        store
    }
)

app.render()
