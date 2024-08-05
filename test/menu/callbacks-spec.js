describe('callbacks', () => {
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

  let message;
  beforeEach(() => {
    $('[data-controller="menu"]').addEventListener('menu:opened', (e) => {
      message = 'opened: ' + e.detail.item.querySelector('a').getAttribute('href');
    });
    $('[data-controller="menu"]').addEventListener('menu:closed', (e) => {
      message = 'closed: ' + e.detail.item.querySelector('a').getAttribute('href');
    });
  });

  it('runs callbacks', () => {
    $('a[href="#Menu1"]').click();
    expect(message).toEqual('opened: #Menu1');

    $('a[href="#Menu1-1"]').click();
    expect(message).toEqual('opened: #Menu1-1');

    $('a[href="#Menu1-1"]').click();
    expect(message).toEqual('closed: #Menu1-1');
  });
});
