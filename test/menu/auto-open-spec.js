describe('auto-open', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul data-controller="menu" data-menu-auto-open-value="true">
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
              <a href="#Menu1-2">Menu1-3</a>
              <ul>
                <li><a href="#Menu1-2-1">Menu1-3-1</a></li>
                <li><a href="#Menu1-2-2">Menu1-3-2</a></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    `;
  });

  it('opens root menu by hover', () => {
    $('a[href="#Menu1"]').dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    expect($('a[href="#Menu1"]').parentNode.matches('.st-menu--opened')).toEqual(true);

    $('a[href="#Menu1"]').click();
    expect($('a[href="#Menu1"]').parentNode.matches('.st-menu--opened')).toEqual(false);
  });
});
