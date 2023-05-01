import {AppComponent} from '../core/AppComponent.js';
import * as actions from '../store/actions.js';
import {storage} from '../core/utils.js';
import {textareaHandler} from './TextareaHandler.js';

export class Textarea extends AppComponent {
  static className = 'section-output';

  constructor($root, options) {
    super($root, {
      listeners: ['keydown', 'keyup', 'click'],
      ...options,
    });
  }

  toHTML() {
    return `<div class="section-wrapper">
        <textarea class="output" placeholder="Here may to be your text...">
        </textarea></div>`;
  }

  focus() {
    this.textarea.focus();
  }

  onClick() {
    this.$emit('Textarea:focus');
  }

  onKeydown(event) {
    event.preventDefault();
    this.$emit('Textarea:keydown', event);
    this.focus();
  }

  onKeyup(event) {
    this.$emit('Textarea:keyup', event);
    this.focus();
  }

  init() {
    super.init();
    this.textarea = this.$root.$el.querySelector('.output');
    this.textarea.value = storage('keyboard-state').currentText;
    this.$on('Board:value', this.handler.bind(this));
    this.$on('Board:click', this.handler.bind(this));
    this.$on('Textarea:focus', this.focus.bind(this));
  }

  handler(value) {
    textareaHandler(value, this.textarea);
    const currentText = this.textarea.value;
    this.$dispatch(actions.inputText(currentText));
    this.textarea.focus();
  }
}


