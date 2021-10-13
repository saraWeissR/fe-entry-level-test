import Controller from './controller.js';
import Template from './template.js';
import Store from './store.js';
import View from './view.js';
import { listen } from "./helpers.js";

const store = new Store('todos-vanilla-es6');
const template = new Template();
const view = new View(template);
const controller = new Controller(store, view);

const setView = () => controller.setView(document.location.hash);

listen(window, 'load', setView)
listen(window, 'hashchange', setView)



