# stimulus-menu

A stimulus controller for simple menu.

## Dependencies

* @hotwired/stimulus 3.0+

## Installation

Install from npm:

    $ npm install @kanety/stimulus-menu --save

## Usage

Register controller:

```javascript
import { Application } from '@hotwired/stimulus';
import MenuController from '@kanety/stimulus-menu';

const application = Application.start();
application.register('menu', MenuController);
```

Import css:

```css
@import '@kanety/stimulus-menu';
```

Build html as follows:

```html
<ul class="st-menu st-menu--horizontal" data-controller="menu">
  <li>
    <span class="st-menu__icon"><a href="#">Menu1</a></span>
    <ul class="st-menu--vertical">
      <li><a href="#">Menu1-1</a></li>
      <li><a href="#">Menu1-2</a></li>
      <li><a href="#">Menu1-3</a></li>
    </ul>
  </li>
  <li>
    <span class="st-menu__icon"><a href="#">Menu2</a></span>
    <ul class="st-menu--vertical">
      <li><a href="#">Menu2-1</a></li>
      <li><a href="#">Menu2-2</a></li>
      <li><a href="#">Menu2-3</a></li>
    </ul>
  </li>
</ul>
```

You can also build vertical menu as follows:

```html
<!-- set st-menu--vertial -->
<ul class="st-menu st-menu--vertical" data-controller="menu">
  <li>
    <span class="st-menu__icon"><a href="#">Menu1</a></span>
    <ul class="st-menu--vertical">
      <li><a href="#">Menu1-1</a></li>
      <li><a href="#">Menu1-2</a></li>
      <li><a href="#">Menu1-3</a></li>
    </ul>
  </li>
  <li>
    <span class="st-menu__icon"><a href="#">Menu2</a></span>
    <ul class="st-menu--vertical">
      <li><a href="#">Menu2-1</a></li>
      <li><a href="#">Menu2-2</a></li>
      <li><a href="#">Menu2-3</a></li>
    </ul>
  </li>
</ul>
```

### Options

#### auto-open

Open menu by mouse hovering:

```javascript
<ul data-controller="menu"
    data-menu-auto-open-value="true">
</ul>
```

#### keep-open

Keep menu opened after clicking menu items:

```javascript
<ul data-controller="menu"
    data-menu-keep-open-value="true">
</ul>
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
