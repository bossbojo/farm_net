import { FarmNetFrontendPage } from './app.po';

describe('farm-net-frontend App', () => {
  let page: FarmNetFrontendPage;

  beforeEach(() => {
    page = new FarmNetFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
