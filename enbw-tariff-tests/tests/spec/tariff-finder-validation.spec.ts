// spec: EnBW Tariff Finder - Validation & Error Handling
// This test file covers form validation and error scenarios

import { test, expect } from '@playwright/test';
import { EnBWTariffFinderPage } from '../pages/EnBWTariffFinderPage';

test.describe('EnBW Tariff Finder - Validation & Error Handling', () => {
  let tariffFinderPage: EnBWTariffFinderPage;

  test.beforeEach(async ({ page }) => {
    tariffFinderPage = new EnBWTariffFinderPage(page);
    await tariffFinderPage.navigateTo();
  });

  test('should validate empty PLZ field', async () => {
    // 1. Leave PLZ empty and try to search
    await tariffFinderPage.fillOrt('Stutensee');
    
    // Try to submit with empty PLZ
    const plzValue = await tariffFinderPage.getPLZValue();
    expect(plzValue).toBe('');
  });

  test('should validate empty Ort field', async () => {
    // 1. Fill PLZ but leave Ort empty
    await tariffFinderPage.fillPLZ('76297');
    
    const ortValue = await tariffFinderPage.getOrtValue();
    expect(ortValue).toBe('');
  });

  test('should handle field clearing correctly', async () => {
    // 1. Fill both fields
    await tariffFinderPage.fillPLZ('76297');
    await tariffFinderPage.fillOrt('Stutensee');
    
    // 2. Clear PLZ field
    await tariffFinderPage.clearPLZ();
    let plzValue = await tariffFinderPage.getPLZValue();
    expect(plzValue).toBe('');

    // 3. Clear Ort field
    await tariffFinderPage.clearOrt();
    let ortValue = await tariffFinderPage.getOrtValue();
    expect(ortValue).toBe('');
  });
});
