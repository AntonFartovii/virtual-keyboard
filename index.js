import {App} from "./core/App.js";
import {Board} from "./components/Board.js";
import {Textarea} from "./components/Textarea.js";


const app = new App (
    '#app',
    {
        components: [Textarea, Board]
    }
)

app.render()
