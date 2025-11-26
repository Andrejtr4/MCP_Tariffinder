import { test as base, expect } from '@playwright/test';
import { EnBWTariffFinderPage } from './pages/EnBWTariffFinderPage';

/**
 * Custom test fixtures for EnBW Tariff Finder tests
 */

type EnBWTestFixtures = {
  tariffFinderPage: EnBWTariffFinderPage;
};

export const test = base.extend<EnBWTestFixtures>({
  tariffFinderPage: async ({ page }, use) => {
    const tariffFinderPage = new EnBWTariffFinderPage(page);
    await tariffFinderPage.navigateTo();
    await use(tariffFinderPage);
  },
});

export { expect };
