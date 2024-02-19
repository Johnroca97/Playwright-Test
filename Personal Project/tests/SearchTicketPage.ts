import { Page, Locator, BrowserContext } from 'playwright';

class SearchTicketPage {
  private page: Page;
  private getTicketDeparture: Locator;

  constructor(page: Page) {
    this.page = page;

    this.getTicketDeparture = page.getByRole('button', { name: 'Vuelo recomendado, más' });
  }

  async waitForLoad() {
    await this.page.waitForLoadState('load');
  }

  async selectTicketDeparture() {
    await this.getTicketDeparture.click();
  }
}

export default SearchTicketPage;