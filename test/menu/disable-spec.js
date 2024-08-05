describe('disable', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul data-controller="menu">
        <li>
          <a href="#Menu1">Menu1</a>
          <ul>
            <li>
              <a href="#Menu1-1" data-action="menu:enable->menu#enable menu:disable->menu#disable">Menu1-1</a>
              <input type="text" value="input">
              <textarea>textarea</textarea>
              <select><option value="option">option</option></select>
              <button type="button"></button>
              <ul>
                <li><a href="#Menu1-1-1">Menu1-1-1</a></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <button type="button" id="enable">Enable</button>
      <button type="button" id="disable">Disable</button>
      <script>
      </script>
    `;
  });

  beforeEach(() => {
    $('#enable').addEventListener('click', () => {
      document.querySelector('a[href="#Menu1-1"]').dispatchEvent(new CustomEvent('menu:enable'));
    });
    $('#disable').addEventListener('click', () => {
      document.querySelector('a[href="#Menu1-1"]').dispatchEvent(new CustomEvent('menu:disable'));
    });
  });

  it('disables menu', () => {
    $('#disable').click();
    expect($('a[href="#Menu1-1"]').closest('li').matches('.st-menu__item--disabled')).toEqual(true);
    expect($('a[href="#Menu1-1-1"]').closest('li').matches('.st-menu__item--disabled')).toEqual(true);

    $('#enable').click()
    expect($('a[href="#Menu1-1"]').closest('li').matches('.st-menu__item--disabled')).toEqual(false);
    expect($('a[href="#Menu1-1-1"]').closest('li').matches('.st-menu__item--disabled')).toEqual(false);
  });
});
