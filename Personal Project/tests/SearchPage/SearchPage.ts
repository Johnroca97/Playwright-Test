import { Page, Locator} from 'playwright';

class SearchPage {
  private page: Page;
  private departureCityBox: Locator;
  private clickDepartureCity: (cityDeparture: string) => Locator;
  private arrivalCityBox: Locator;
  private clickArrivalCity: (cityArrival: string) => Locator;
  private getDatePickerDeparture: Locator;
  private mmYY: (date: string) => Locator;
  private clickSearch: Locator;

  constructor(page: Page) {
    this.page = page;

    this.departureCityBox = page.getByPlaceholder('Origen');
    this.clickDepartureCity = (cityDeparture: string) => page.getByRole('option', { name: cityDeparture, exact: false });
    this.arrivalCityBox = page.getByPlaceholder('Destino');
    this.clickArrivalCity = (cityArrival: string) => page.getByRole('option', { name: cityArrival, exact: false });
    this.getDatePickerDeparture = page.getByPlaceholder('Selecciona');
    this.mmYY = (date: string) => page.getByRole('button', { name: date, exact: false });
    this.clickSearch = page.getByRole('button', { name: 'Buscar vuelos disponibles', exact: false });   
  }

  async goto() {
    await this.page.goto('https://www.latamairlines.com/co/es');
    await this.page.waitForLoadState('load');
  }

  async searchCityDeparture(cityDeparture: string) {
    await this.departureCityBox.fill(cityDeparture);
    const selectDepCity = await this.clickDepartureCity(cityDeparture);
    await selectDepCity.click();
  }

  async validateCityDeparture(): Promise<string|null> {
    await this.departureCityBox.waitFor();
    return await this.departureCityBox.inputValue();
  }

  async searchCityArrival(cityArrival: string) {
    await this.arrivalCityBox.fill(cityArrival);
    const selectDepCity = await this.clickArrivalCity(cityArrival);
    await selectDepCity.click();
  }

  async validateCityArrival(): Promise<string|null> {
    await this.arrivalCityBox.waitFor();
    return await this.arrivalCityBox.inputValue();
  }

  async getDatePicker() {
    await this.getDatePickerDeparture.click();
  }

  async getDate(date: string) {
    const selectDate = await this.mmYY(date);
    await selectDate.click(); 
  }

  async getSearch() {
    await this.clickSearch.waitFor();
    await this.clickSearch.click();
  }

  async flowSelectTicket(ticket: string, price: string) {
    const page1Promise = this.page.waitForEvent('popup');
    await this.clickSearch.click();
    const page1 = await page1Promise;

    const selectTicket = page1.getByRole('button', { name: ticket }).first()
    const selectTypeTicket = page1.locator(`//span[normalize-space()='Elegir la tarifa ${price} y pasa al siguiente vuelo']`);
    const sureMSG = page1.locator('//span[contains(text(),"Aceptar restricciones")]');
    const selectTypeTicketArrival = page1.locator(`//span[normalize-space()='Eligir la tarifa ${price} y continuar']`);
    const selectSeats = page1.getByRole('button', { name: 'Confirmar vuelos seleccionados' }).first();

    await selectTicket.click();

    const textCompleteDp = await selectTypeTicket.innerText();

    await selectTypeTicket.click();

    const containBasicDp = textCompleteDp.includes('BASIC');
    if (containBasicDp) {
      await sureMSG.click();
    } else
    
    await page1.waitForTimeout(1000); 
    
    await selectTicket.click();

    await page1.waitForTimeout(3000);

    await selectTypeTicketArrival.waitFor();
    const textCompleteAr = await selectTypeTicketArrival.innerText();

    await selectTypeTicketArrival.click();

    const containBasicAr = textCompleteAr.includes('BASIC')

    if (containBasicAr) {
      await sureMSG.click();
    } else

    await selectSeats.waitFor();
    await selectSeats.click();

  }
  
}
export default SearchPage;
