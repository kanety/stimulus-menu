global.$ = document.querySelector.bind(document);
global.$$ = document.querySelectorAll.bind(document);

import { Application } from '@hotwired/stimulus';
import MenuController from 'index';

const application = Application.start();
application.register('menu', MenuController);
