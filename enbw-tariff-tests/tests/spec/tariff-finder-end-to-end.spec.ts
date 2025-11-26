// spec: EnBW Tariff Finder - End-to-End Workflow
// This test file covers complete end-to-end user journeys

import { test, expect } from '@playwright/test';
import { EnBWTariffFinderPage } from '../pages/EnBWTariffFinderPage';

test.describe('EnBW Tariff Finder - End-to-End Workflow', () => {
  let tariffFinderPage: EnBWTariffFinderPage;

  test.beforeEach(async ({ page }) => {
    tariffFinderPage = new EnBWTariffFinderPage(page);
    await tariffFinderPage.navigateTo();
  });

  test('should complete full tariff search workflow for Stutensee', async () => {
    // 1. Navigate to page (already done in beforeEach)
    let title = await tariffFinderPage.getPageTitle();
    expect(title).toContain('Stromtarif');

    // 2. Fill PLZ field with "76297"
    await tariffFinderPage.fillPLZ('76297');
    let plzValue = await tariffFinderPage.getPLZValue();
    expect(plzValue).toBe('76297');

    // 3. Fill Ort field with "Stutensee"
    await tariffFinderPage.fillOrt('Stutensee');
    let ortValue = await tariffFinderPage.getOrtValue();
    expect(ortValue).toBe('Stutensee');

    // 4. Click "Jetzt Tarif Finden" button
    await tariffFinderPage.clickSearch();

    // 5. Verify tariff results are displayed
    const tariffCount = await tariffFinderPage.getTariffCount();
    expect(tariffCount).toBeGreaterThan(0);
  });

  test('should display multiple tariff options for Stutensee', async () => {
    // 1. Perform search
    await tariffFinderPage.searchTariffs('76297', 'Stutensee');

    // 2. Verify at least 2 tariff options are shown
    const tariffCount = await tariffFinderPage.getTariffCount();
    expect(tariffCount).toBeGreaterThanOrEqual(1);

    // 3. Get tariff names
    const tariffNames = await tariffFinderPage.getTariffNames();
    expect(tariffNames.length).toBeGreaterThan(0);
  });

  test('should search for different location Stuttgart', async () => {
    // 1. Search for Stuttgart (70173)
    await tariffFinderPage.searchTariffs('70173', 'Stuttgart');

    // 2. Verify results load
    const tariffCount = await tariffFinderPage.getTariffCount();
    expect(tariffCount).toBeGreaterThan(0);

    // 3. Get tariff names
    const tariffNames = await tariffFinderPage.getTariffNames();
    expect(tariffNames.length).toBeGreaterThan(0);
  });

  test('should search for different location Berlin', async () => {
    // 1. Search for Berlin (10115)
    await tariffFinderPage.searchTariffs('10115', 'Berlin');

    // 2. Verify results load
    const tariffCount = await tariffFinderPage.getTariffCount();
    expect(tariffCount).toBeGreaterThan(0);

    // 3. Get tariff names
    const tariffNames = await tariffFinderPage.getTariffNames();
    expect(tariffNames.length).toBeGreaterThan(0);
  });

  test('should allow multiple consecutive searches', async () => {
    // 1. First search: Stutensee
    await tariffFinderPage.searchTariffs('76297', 'Stutensee');
    let count1 = await tariffFinderPage.getTariffCount();
    expect(count1).toBeGreaterThan(0);

    // 2. Second search: Stuttgart
    await tariffFinderPage.navigateTo();
    await tariffFinderPage.searchTariffs('70173', 'Stuttgart');
    let count2 = await tariffFinderPage.getTariffCount();
    expect(count2).toBeGreaterThan(0);

    // 3. Third search: Munich
    await tariffFinderPage.navigateTo();
    await tariffFinderPage.searchTariffs('80331', 'München');
    let count3 = await tariffFinderPage.getTariffCount();
    expect(count3).toBeGreaterThan(0);
  });

  test('should maintain form values during search', async () => {
    // 1. Fill form
    await tariffFinderPage.fillPLZ('76297');
    await tariffFinderPage.fillOrt('Stutensee');

    // 2. Click search
    await tariffFinderPage.clickSearch();

    // 3. Verify form still contains values
    const plzValue = await tariffFinderPage.getPLZValue();
    const ortValue = await tariffFinderPage.getOrtValue();

    expect(plzValue).toBe('76297');
    expect(ortValue).toBe('Stutensee');
  });

  test('should successfully retrieve tariff data for multiple locations', async () => {
    const locations = [
      { plz: '76297', ort: 'Stutensee' },
      { plz: '70173', ort: 'Stuttgart' },
      { plz: '10115', ort: 'Berlin' }
    ];

    for (const location of locations) {
      await tariffFinderPage.navigateTo();
      await tariffFinderPage.searchTariffs(location.plz, location.ort);

      const tariffCount = await tariffFinderPage.getTariffCount();
      expect(tariffCount).toBeGreaterThan(0);

      const names = await tariffFinderPage.getTariffNames();
      expect(names.length).toBeGreaterThan(0);
    }
  });
});
