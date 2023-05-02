import {$} from '../core/dom.js';
import {Emitter} from '../core/Emitter.js';

export class App {
  constructor(selector, options) {
    this.$body = $('body');
    this.$appContainer = $.create('div', 'app-container');
    this.components = options.components || [];
    this.store = options.store;
    this.emitter = new Emitter();
  }

  getRoot() {
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    };
    const $root = $.create('main', 'board-container');
    this.components = this.components.map((Component) => {
      const $el = $.create('section', Component.className);
      const component = new Component($el, componentOptions);
      const componentHtml = component.toHTML();
      $el.html(componentHtml);
      $root.append($el);
      return component;
    });
    return $root;
  }

  render() {
    const appHtml = this.$root = this.getRoot();
    this.$appContainer.append(appHtml);
    this.components.forEach((component) => component.init());
    this.toHTML();
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
  }

  toHTML() {
    const html = `<!doctype html>
      <html lang="en">
          <head><meta charset="UTF-8"><meta name="viewport" 
          content="width=device-width, user-scalable=no, initial-scale=1.0, 
          maximum-scale=1.0, minimum-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Document</title>
          </head>
          <body>
          ${this.$appContainer.html()}
          </div>
          </body>
          </html>`;
    this.$body.html(html);
  }
}


