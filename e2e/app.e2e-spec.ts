import { HomeLibraryPage } from './app.po';

describe('home-library App', () => {
  let page: HomeLibraryPage;

  beforeEach(() => {
    page = new HomeLibraryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
