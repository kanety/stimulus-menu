import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';
import './index.scss';

export default class extends Controller {
  static values = {
    autoOpen: { type: Boolean, default: false },
    keepOpen: { type: Boolean, default: false },
    toggleElement: { type: String, default: 'a' }
  };
  static actions = [
    ['element', 'click->toggle'],
    ['element', 'click@window->closeAll'],
    ['element', 'mouseover->open']
  ];

  get rootItems() {
    return Array.from(this.element.children).filter(child => child.matches('li'));
  }

  get items() {
    return this.rootItems.flatMap(rootItem => this.findDescendants(rootItem));
  }

  get isActive() {
    return this.items.find(item => this.isOpened(item)) != undefined;
  }

  toggle(e) {
    if (!this.isToggleElement(e.target)) return;

    let item = e.target.closest('li');
    if (item && this.hasMenu(item)) {
      if (this.isOpened(item)) {
        this.closeItem(item);
      } else {
        this.openItemsFrom(item);
        e.target.focus();
      }
      e.preventDefault();
    } else {
      if (!this.keepOpenValue) {
        this.closeAllItems();
      }
    }
  }

  open(e) {
    if (!this.isToggleElement(e.target)) return;

    let item = e.target.closest('li');
    if (item && this.hasMenu(item)) {
      if (this.isActive || this.autoOpenValue) {
        this.openItemsFrom(item);
        e.target.focus();
      }
      e.preventDefault();
    }
  }

  closeAll(e) {
    if (!this.element.contains(e.target)) {
      this.closeAllItems();
    }
  }

  enable(e) {
    let targetItem = e.target.closest('li');
    this.findDescendants(targetItem).forEach(item => this.enableItem(item));
  }

  disable(e) {
    let targetItem = e.target.closest('li');
    this.findDescendants(targetItem).forEach(item => this.disableItem(item));
  }

  isToggleElement(target) {
    return target.matches(this.toggleElementValue);
  }

  hasMenu(item) {
    return this.findChildMenus(item).length != 0;
  }

  isOpened(item) {
    return item.matches('.st-menu--opened');
  }

  isClosed(item) {
    return !this.isOpened(item);
  }

  openItemsFrom(item) {
    let targetItems = this.findAscendants(item).concat([item]);
    this.items.forEach(item => {
      if (!targetItems.includes(item)) this.closeItem(item);
    });
    targetItems.forEach(item => this.openItem(item));
  }

  closeAllItems() {
    this.items.forEach(item => this.closeItem(item));
  }

  openItem(item) {
    if (item && this.isClosed(item) && this.hasMenu(item) && this.element.contains(item)) {
      item.classList.add('st-menu--opened');
      this.dispatch('opened', { detail: { item: item } });
    }
  }

  closeItem(item) {
    if (item && this.isOpened(item) && this.hasMenu(item) && this.element.contains(item)) {
      item.classList.remove('st-menu--opened');
      this.dispatch('closed', { detail: { item: item } });
    }
  }

  enableItem(item) {
    item.classList.remove('st-menu__item--disabled');
    this.findContents(item).forEach(content => {
      [content, ...content.querySelectorAll('*')].forEach(elem => {
        if (elem.matches('a')) {
          elem.tabIndex = null;
        } else if (elem.matches('input, textarea, select, button')) {
          elem.disabled = false;
        }
      });
    });
  }

  disableItem(item) {
    item.classList.add('st-menu__item--disabled');
    this.findContents(item).forEach(content => {
      [content, ...content.querySelectorAll('*')].forEach(elem => {
        if (elem.matches('a')) {
          elem.tabIndex = '-1';
        } else if (elem.matches('input, textarea, select, button')) {
          elem.disabled = true;
        }
      });
    });
  }

  findChildMenus(item) {
    return Array.from(item.children).filter(child => child.matches('ul'));
  }

  findAscendants(item) {
    let parent = item.parentNode?.parentNode;
    if (parent && this.scope.containsElement(parent)) {
      return this.findAscendants(parent).concat([item]);
    } else {
      return [item];
    }
  }

  findDescendants(item) {
    return [item].concat(this.findChildren(item).flatMap(child => this.findDescendants(child)));
  }

  findChildren(item) {
    return this.findChildMenus(item).flatMap(menu => {
      return Array.from(menu.children).filter(child => child.matches('li'));
    });
  }

  findContents(item) {
    return Array.from(item.children).filter(child => !child.matches('ul'));
  }
}
