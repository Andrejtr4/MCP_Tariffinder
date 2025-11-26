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

  test('should search for different locations', async () => {
    // Test multiple locations
    const locations = [
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

  test('should allow consecutive searches', async () => {
    // 1. First search: Stutensee
    await tariffFinderPage.searchTariffs('76297', 'Stutensee');
    let count1 = await tariffFinderPage.getTariffCount();
    expect(count1).toBeGreaterThan(0);

    // 2. Second search: Stuttgart
    await tariffFinderPage.navigateTo();
    await tariffFinderPage.searchTariffs('70173', 'Stuttgart');
    let count2 = await tariffFinderPage.getTariffCount();
    expect(count2).toBeGreaterThan(0);
  });
});
