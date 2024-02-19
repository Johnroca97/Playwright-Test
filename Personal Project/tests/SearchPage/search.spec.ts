import { test, expect } from '@playwright/test';
import SearchPage from './SearchPage';


test.describe ('Flow to Search Flights on Latam Airlines', () => {
    let searchPage: SearchPage;

    const cityDeparture = 'Bogotá';
    const cityArrival = 'Cartagena';
    const dateDeparture = "19 de abril de 2024";
    const dateArrival = "23 de abril de 2024";
    const ticket = "más económico"
    const typeTicket = "BASIC"
    

    test.beforeEach(async ({ page }) => {
        searchPage = new SearchPage(page);
        await searchPage.goto();
    });

    test('Verify Search Flights', async ({ page }) => {
        //Select and validate City Departure
        await searchPage.searchCityDeparture(cityDeparture);
        expect (await searchPage.validateCityDeparture()).toContain(cityDeparture);
        //Select and validate City Arrival
        await searchPage.searchCityArrival(cityArrival);
        expect (await searchPage.validateCityArrival()).toContain(cityArrival);
        //Select Date Departure
        await searchPage.getDatePicker();
        await searchPage.getDate(dateDeparture);
        await searchPage.getDate(dateArrival);
        //Flow to select Tickets
        await searchPage.flowSelectTicket(ticket, typeTicket);
    })


})