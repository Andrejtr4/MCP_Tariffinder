// spec: EnBW Tariff Finder - Basic Workflow
// This test file covers basic search functionality

import { test, expect } from '@playwright/test';
import { EnBWTariffFinderPage } from '../pages/EnBWTariffFinderPage';

test.describe('EnBW Tariff Finder - Basic Workflow', () => {
  let tariffFinderPage: EnBWTariffFinderPage;

  test.beforeEach(async ({ page }) => {
    tariffFinderPage = new EnBWTariffFinderPage(page);
    await tariffFinderPage.navigateTo();
  });

  test('should navigate to tariff finder page successfully', async ({ page }) => {
    // Verify page is loaded
    const title = await tariffFinderPage.getPageTitle();
    expect(title).toContain('Stromtarif');

    const url = await tariffFinderPage.getCurrentUrl();
    expect(url).toContain('enbw.com');
  });

  test('should fill PLZ and Ort fields correctly', async () => {
    // Fill PLZ field with "76297"
    await tariffFinderPage.fillPLZ('76297');
    let plzValue = await tariffFinderPage.getPLZValue();
    expect(plzValue).toBe('76297');

    // Fill Ort field with "Stutensee"
    await tariffFinderPage.fillOrt('Stutensee');
    let ortValue = await tariffFinderPage.getOrtValue();
    expect(ortValue).toBe('Stutensee');
  });

  test('should complete search and display tariff results', async () => {
    // Perform complete search workflow
    await tariffFinderPage.fillPLZ('76297');
    await tariffFinderPage.fillOrt('Stutensee');
    await tariffFinderPage.clickSearch();

    // Verify tariff results are displayed
    const tariffCount = await tariffFinderPage.getTariffCount();
    expect(tariffCount).toBeGreaterThan(0);

    // Verify tariff names are present
    const names = await tariffFinderPage.getTariffNames();
    expect(names.length).toBeGreaterThan(0);
  });
});

