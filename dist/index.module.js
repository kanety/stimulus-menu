import{Controller as e}from"@hotwired/stimulus";import"@kanety/stimulus-static-actions";class t extends e{get menus(){return this.scope.findAllElements("ul")}get isActive(){return null!=this.scope.findElement(".st-menu--opened")}toggle(e){var t=e.target.closest("li");if(t&&this.hasMenu(t)){if(this.isOpened(t)){var s=Array.from(t.children).find(e=>e.matches("ul"));this.closeMenu(s)}else this.openMenus(t),e.target.focus();e.preventDefault()}else this.keepOpenValue||this.closeAllMenus()}open(e){var t=e.target.closest("li");t&&this.hasMenu(t)&&((this.isActive||this.autoOpenValue)&&(this.openMenus(t),e.target.focus()),e.preventDefault())}closeAll(e){this.element.contains(e.target)||this.closeAllMenus()}hasMenu(e){return Array.from(e.children).some(e=>e.matches("ul"))}isOpened(e){return e.matches(".st-menu--opened")}openMenus(e){this.closeAllMenus(),this.findAscMenus(e).concat(this.findChildMenus(e)).forEach(e=>this.openMenu(e))}closeAllMenus(){this.menus.forEach(e=>this.closeMenu(e))}openMenu(e){var t=e.parentNode;t&&this.element.contains(t)&&t.classList.add("st-menu--opened")}closeMenu(e){var t=e.parentNode;t&&this.element.contains(t)&&t.classList.remove("st-menu--opened")}findAscMenus(e){var t=e.parentNode;return t==this.element?[t]:t&&t.parentNode?this.findAscMenus(t.parentNode).concat([t]):[]}findChildMenus(e){return Array.from(e.children).filter(e=>e.matches("ul"))}}t.values={autoOpen:{type:Boolean,default:!1},keepOpen:{type:Boolean,default:!1}},t.actions=[["element","click->toggle"],["element","click@window->closeAll"],["element","mouseover->open"]];export{t as default};
//# sourceMappingURL=index.module.js.map
