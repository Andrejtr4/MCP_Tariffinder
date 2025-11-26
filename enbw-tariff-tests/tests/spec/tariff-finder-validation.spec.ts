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

  test('should handle PLZ field clearing correctly', async () => {
    // 1. Fill PLZ field
    await tariffFinderPage.fillPLZ('76297');
    let plzValue = await tariffFinderPage.getPLZValue();
    expect(plzValue).toBe('76297');

    // 2. Clear PLZ field
    await tariffFinderPage.clearPLZ();
    plzValue = await tariffFinderPage.getPLZValue();
    expect(plzValue).toBe('');
  });

  test('should handle Ort field clearing correctly', async () => {
    // 1. Fill Ort field
    await tariffFinderPage.fillOrt('Stutensee');
    let ortValue = await tariffFinderPage.getOrtValue();
    expect(ortValue).toBe('Stutensee');

    // 2. Clear Ort field
    await tariffFinderPage.clearOrt();
    ortValue = await tariffFinderPage.getOrtValue();
    expect(ortValue).toBe('');
  });

  test('should accept valid PLZ format 76297', async () => {
    // 1. Fill with valid PLZ
    await tariffFinderPage.fillPLZ('76297');
    
    // 2. Verify it's accepted
    const plzValue = await tariffFinderPage.getPLZValue();
    expect(plzValue).toBe('76297');
  });

  test('should accept various numeric PLZ formats', async () => {
    // Test different valid PLZ numbers
    const validPLZs = ['76297', '70173', '10115', '80331'];

    for (const plz of validPLZs) {
      await tariffFinderPage.clearPLZ();
      await tariffFinderPage.fillPLZ(plz);
      const value = await tariffFinderPage.getPLZValue();
      expect(value).toBe(plz);
    }
  });

  test('should allow field resubmission after correction', async () => {
    // 1. Start with first location
    await tariffFinderPage.fillPLZ('76297');
    await tariffFinderPage.fillOrt('Stutensee');

    // 2. Clear and fill with new location
    await tariffFinderPage.clearPLZ();
    await tariffFinderPage.clearOrt();

    await tariffFinderPage.fillPLZ('70173');
    await tariffFinderPage.fillOrt('Stuttgart');

    // 3. Verify new values
    const plzValue = await tariffFinderPage.getPLZValue();
    const ortValue = await tariffFinderPage.getOrtValue();

    expect(plzValue).toBe('70173');
    expect(ortValue).toBe('Stuttgart');
  });
});
