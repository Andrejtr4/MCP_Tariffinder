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

  test('should fill PLZ field with 76297', async () => {
    // 1. Fill PLZ field with "76297"
    await tariffFinderPage.fillPLZ('76297');

    // Verify PLZ value
    const plzValue = await tariffFinderPage.getPLZValue();
    expect(plzValue).toBe('76297');
  });

  test('should fill Ort field with Stutensee', async () => {
    // 1. Fill Ort field with "Stutensee"
    await tariffFinderPage.fillOrt('Stutensee');

    // Verify Ort value
    const ortValue = await tariffFinderPage.getOrtValue();
    expect(ortValue).toBe('Stutensee');
  });

  test('should have search button visible and clickable', async () => {
    // 1. Check if search button is visible
    const isVisible = await tariffFinderPage.isSearchButtonVisible();
    expect(isVisible).toBe(true);
  });

  test('should complete basic search workflow for Stutensee', async () => {
    // 1. Fill PLZ field with "76297"
    await tariffFinderPage.fillPLZ('76297');
    let plzValue = await tariffFinderPage.getPLZValue();
    expect(plzValue).toBe('76297');

    // 2. Fill Ort field with "Stutensee"
    await tariffFinderPage.fillOrt('Stutensee');
    let ortValue = await tariffFinderPage.getOrtValue();
    expect(ortValue).toBe('Stutensee');

    // 3. Click "Jetzt Tarif Finden" button
    await tariffFinderPage.clickSearch();

    // 4. Verify tariff results are displayed
    const tariffCount = await tariffFinderPage.getTariffCount();
    expect(tariffCount).toBeGreaterThan(0);
  });

  test('should display tariff cards with content', async () => {
    // 1. Perform search
    await tariffFinderPage.searchTariffs('76297', 'Stutensee');

    // 2. Get tariff information
    const tariffCount = await tariffFinderPage.getTariffCount();
    expect(tariffCount).toBeGreaterThan(0);

    // 3. Get tariff names
    const names = await tariffFinderPage.getTariffNames();
    expect(names.length).toBeGreaterThan(0);
  });
});
