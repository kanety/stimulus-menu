var e=require("@hotwired/stimulus");require("@kanety/stimulus-static-actions");class s extends e.Controller{get menus(){return this.scope.findAllElements("ul")}get isActive(){return null!=this.scope.findElement(".st-menu--opened")}toggle(e){var s=e.target.closest("li");if(s&&this.hasMenu(s)){if(this.isOpened(s)){var t=Array.from(s.children).find(e=>e.matches("ul"));this.closeMenu(t)}else this.openMenus(s),e.target.focus();e.preventDefault()}else this.keepOpenValue||this.closeAllMenus()}open(e){var s=e.target.closest("li");s&&this.hasMenu(s)&&((this.isActive||this.autoOpenValue)&&(this.openMenus(s),e.target.focus()),e.preventDefault())}closeAll(e){this.element.contains(e.target)||this.closeAllMenus()}hasMenu(e){return Array.from(e.children).some(e=>e.matches("ul"))}isOpened(e){return e.matches(".st-menu--opened")}openMenus(e){this.closeAllMenus(),this.findAscMenus(e).concat(this.findChildMenus(e)).forEach(e=>this.openMenu(e))}closeAllMenus(){this.menus.forEach(e=>this.closeMenu(e))}openMenu(e){var s=e.parentNode;s&&this.element.contains(s)&&s.classList.add("st-menu--opened")}closeMenu(e){var s=e.parentNode;s&&this.element.contains(s)&&s.classList.remove("st-menu--opened")}findAscMenus(e){var s=e.parentNode;return s==this.element?[s]:s&&s.parentNode?this.findAscMenus(s.parentNode).concat([s]):[]}findChildMenus(e){return Array.from(e.children).filter(e=>e.matches("ul"))}}s.values={autoOpen:{type:Boolean,default:!1},keepOpen:{type:Boolean,default:!1}},s.actions=[["element","click->toggle"],["element","click@window->closeAll"],["element","mouseover->open"]],module.exports=s;
//# sourceMappingURL=index.js.map
