describe('toggle', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul data-controller="menu" data-menu-toggle-element-value="a[href]">
        <li>
          <a href="#Menu1">Root Menu1</a>
          <ul>
            <li>
              <a href="#Menu1-1">Menu1-1</a>
              <form>
                <input type="text" name="text">
                <input type="submit" value="Submit">
              </form>
            </li>
          </ul>
        </li>
      </ul>
    `;
  });

  it('toggles menu by clicking toggle element', () => {
    $('a[href="#Menu1"]').click();
    expect($('a[href="#Menu1"]').parentNode.matches('.st-menu--opened')).toEqual(true);

    $('input').click();
    expect($('a[href="#Menu1"]').parentNode.matches('.st-menu--opened')).toEqual(true);

    $('a[href="#Menu1-1"]').click();
    expect($('a[href="#Menu1"]').parentNode.matches('.st-menu--opened')).toEqual(false);
  });
});
