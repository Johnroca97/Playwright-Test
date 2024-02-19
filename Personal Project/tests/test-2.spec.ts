import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.latamairlines.com/co/es');
  await page.getByPlaceholder('Origen').click();
  await page.getByPlaceholder('Origen').fill('bogota');
  await page.getByRole('option', { name: 'Bogotá, BOG - Colombia El' }).click();
  await page.getByPlaceholder('Destino').click();
  await page.getByPlaceholder('Destino').fill('barranquilla');
  await page.getByRole('option', { name: 'Barranquilla, BAQ - Colombia' }).click();
  await page.getByPlaceholder('Selecciona').click();
  await page.getByLabel('Elija miércoles, 17 de abril').click();
  await page.getByLabel('Elija viernes, 19 de abril de').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Buscar vuelos disponibles. A' }).click();
  const page1 = await page1Promise;
  await page1.locator('[data-test="aed6613efb"]').getByRole('button', { name: 'Vuelo más económico. Hora de' }).click();
  await page1.getByRole('button', { name: 'Elegir la tarifa BASIC y pasa al siguiente vuelo', exact: true }).click();
  await page1.getByTestId('RestrictionModal-O00QP5ZB--dialog__content').getByRole('button', { name: 'Elegir la tarifa BASIC y pasa al siguiente vuelo', exact: true }).click();
  await page1.getByRole('button', { name: 'Vuelo recomendado, más econó' }).click();
  await page1.getByRole('button', { name: 'Eligir la tarifa BASIC y continuar', exact: true }).click();
  await page1.getByTestId('RestrictionModal-O00QP5ZB--dialog__content').getByRole('button', { name: 'Eligir la tarifa BASIC y continuar', exact: true }).click();
  await page1.getByTestId('button9--button').click();
  await page1.goto('https://www.latamairlines.com/co/es/seleccion-asientos?id=LA0354199SKEL');
  await page1.getByRole('button', { name: 'Pasar al siguiente vuelo' }).click();
  await page1.getByRole('button', { name: 'Continuar al siguiente paso' }).click();
});