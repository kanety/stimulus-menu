import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';
import './index.scss';

export default class extends Controller {
  static values = {
    autoOpen: { type: Boolean, default: false },
    keepOpen: { type: Boolean, default: false }
  };
  static actions = [
    ['element', 'click->toggle'],
    ['element', 'click@window->closeAll'],
    ['element', 'mouseover->open']
  ];

  get menus() {
    return this.scope.findAllElements('ul');
  }

  get isActive() {
    return this.scope.findElement('.st-menu--opened') != null;
  }

  toggle(e) {
    let item = e.target.closest('li');
    if (item && this.hasMenu(item)) {
      if (this.isOpened(item)) {
        let menus = this.findChildMenus(item);
        menus.forEach(menu => this.closeMenu(menu));
      } else {
        this.openMenus(item);
        e.target.focus();
      }
      e.preventDefault();
    } else {
      if (!this.keepOpenValue) {
        this.closeAllMenus();
      }
    }
  }

  open(e) {
    let item = e.target.closest('li');
    if (item && this.hasMenu(item)) {
      if (this.isActive || this.autoOpenValue) {
        this.openMenus(item);
        e.target.focus();
      }
      e.preventDefault();
    }
  }

  closeAll(e) {
    if (!this.element.contains(e.target)) {
      this.closeAllMenus();
    }
  }

  hasMenu(item) {
    return this.findChildMenus(item).length != 0;
  }

  isOpened(item) {
    return item.matches(`.st-menu--opened`);
  }

  isClosed(item) {
    return !this.isOpened(item);
  }

  openMenus(item) {
    let targetMenus = this.findAscMenus(item).concat(this.findChildMenus(item));
    this.menus.forEach(menu => {
      if (!targetMenus.includes(menu)) this.closeMenu(menu);
    });
    targetMenus.forEach(menu => this.openMenu(menu));
  }

  closeAllMenus() {
    this.menus.forEach(menu => this.closeMenu(menu));
  }

  openMenu(menu) {
    let item = menu.parentNode;
    if (item && this.isClosed(item) && this.element.contains(item)) {
      item.classList.add('st-menu--opened');
    }
  }

  closeMenu(menu) {
    let item = menu.parentNode;
    if (item && this.isOpened(item) && this.element.contains(item)) {
      item.classList.remove('st-menu--opened');
    }
  }

  findAscMenus(item) {
    let menu = item.parentNode;
    if (menu == this.element) {
      return [menu];
    } else if (menu && menu.parentNode) {
      return this.findAscMenus(menu.parentNode).concat([menu]);
    } else {
      return [];
    }
  }

  findChildMenus(item) {
    return Array.from(item.children).filter(child => child.matches('ul'));
  }
}
