import{Controller as e}from"@hotwired/stimulus";import"@kanety/stimulus-static-actions";class t extends e{get rootItems(){return Array.from(this.element.children).filter(e=>e.matches("li"))}get items(){return this.rootItems.flatMap(e=>this.findDescendants(e))}get isActive(){return null!=this.items.find(e=>this.isOpened(e))}toggle(e){var t=e.target.closest("li");t&&this.hasMenu(t)?(this.isOpened(t)?this.closeItem(t):(this.openItemsFrom(t),e.target.focus()),e.preventDefault()):this.keepOpenValue||this.closeAllItems()}open(e){var t=e.target.closest("li");t&&this.hasMenu(t)&&((this.isActive||this.autoOpenValue)&&(this.openItemsFrom(t),e.target.focus()),e.preventDefault())}closeAll(e){this.element.contains(e.target)||this.closeAllItems()}hasMenu(e){return 0!=this.findChildMenus(e).length}isOpened(e){return e.matches(".st-menu--opened")}isClosed(e){return!this.isOpened(e)}openItemsFrom(e){var t=this.findAscendants(e).concat([e]);this.items.forEach(e=>{t.includes(e)||this.closeItem(e)}),t.forEach(e=>this.openItem(e))}closeAllItems(){this.items.forEach(e=>this.closeItem(e))}openItem(e){e&&this.isClosed(e)&&this.hasMenu(e)&&this.element.contains(e)&&e.classList.add("st-menu--opened")}closeItem(e){e&&this.isOpened(e)&&this.hasMenu(e)&&this.element.contains(e)&&e.classList.remove("st-menu--opened")}findChildMenus(e){return Array.from(e.children).filter(e=>e.matches("ul"))}findAscendants(e){var t,s=null==(t=e.parentNode)?void 0:t.parentNode;return s&&this.scope.containsElement(s)?this.findAscendants(s).concat([e]):[e]}findDescendants(e){return[e].concat(this.findChildren(e).flatMap(e=>this.findDescendants(e)))}findChildren(e){return this.findChildMenus(e).flatMap(e=>Array.from(e.children).filter(e=>e.matches("li")))}}t.values={autoOpen:{type:Boolean,default:!1},keepOpen:{type:Boolean,default:!1}},t.actions=[["element","click->toggle"],["element","click@window->closeAll"],["element","mouseover->open"]];export{t as default};
//# sourceMappingURL=index.module.mjs.map
