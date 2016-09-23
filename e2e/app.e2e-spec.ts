import { Ngcli3Page } from './app.po';

describe('ngcli3 App', function() {
  let page: Ngcli3Page;

  beforeEach(() => {
    page = new Ngcli3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
