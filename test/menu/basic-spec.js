describe('basic', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul data-controller="menu">
        <li>
          <a href="#Menu1">Menu1</a>
          <ul>
            <li>
              <a href="#Menu1-1">Menu1-1</a>
              <ul>
                <li><a href="#Menu1-1-1">Menu1-1-1</a></li>
                <li><a href="#Menu1-1-2">Menu1-1-2</a></li>
              </ul>
            </li>
            <li>
              <a href="#Menu1-2">Menu1-2</a>
              <ul>
                <li><a href="#Menu1-2-1">Menu1-2-1</a></li>
                <li><a href="#Menu1-2-2">Menu1-2-2</a></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    `;
  });

  it('opens and closes menu', () => {
    $('a[href="#Menu1"]').click();
    expect($('a[href="#Menu1"]').parentNode.matches('.st-menu--opened')).toEqual(true);

    $('a[href="#Menu1-1"]').dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    expect($('a[href="#Menu1-1"]').parentNode.matches('.st-menu--opened')).toEqual(true);

    $('a[href="#Menu1-1-1"]').click();
    expect($('a[href="#Menu1"]').parentNode.matches('.st-menu--opened')).toEqual(false);
    expect($('a[href="#Menu1-1"]').parentNode.matches('.st-menu--opened')).toEqual(false);
  });

  it('closes menus by click root menu', () => {
    $('a[href="#Menu1"]').click();
    expect($('a[href="#Menu1"]').parentNode.matches('.st-menu--opened')).toEqual(true);

    $('a[href="#Menu1-1"]').click();
    expect($('a[href="#Menu1-1"]').parentNode.matches('.st-menu--opened')).toEqual(true);

    $('a[href="#Menu1"]').click();
    expect($('a[href="#Menu1"]').parentNode.matches('.st-menu--opened')).toEqual(false);
  });

  it('closes all menus by click window', () => {
    $('a[href="#Menu1"]').click();
    expect($('a[href="#Menu1"]').parentNode.matches('.st-menu--opened')).toEqual(true);

    $('a[href="#Menu1-1"]').click();
    expect($('a[href="#Menu1-1"]').parentNode.matches('.st-menu--opened')).toEqual(true);

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect($('a[href="#Menu1"]').parentNode.matches('.st-menu--opened')).toEqual(false);
  });
});
