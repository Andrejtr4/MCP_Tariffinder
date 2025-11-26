import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for EnBW Tariff Finder
 * https://www.enbw.com/strom/privatkunden/produkte
 */
export class EnBWTariffFinderPage {
  readonly page: Page;
  readonly url = 'https://www.enbw.com/strom/privatkunden/produkte';

  // Form fields
  readonly plzInput: Locator;
  readonly ortInput: Locator;
  readonly searchButton: Locator;

  // Results
  readonly tariffCards: Locator;
  readonly tariffNames: Locator;
  readonly tariffPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.plzInput = page.locator('input[value*="PLZ"], textbox[name*="plz"]').first();
    this.ortInput = page.locator('textbox[name*="Ort"]').first();
    this.searchButton = page.locator('button:has-text("Jetzt Tarife finden")');
    this.tariffCards = page.locator('[class*="tariff"], [class*="product"], article');
    this.tariffNames = page.locator('h3, h2');
    this.tariffPrices = page.locator('[class*="price"], [class*="kosten"]');
  }

  /**
   * Navigate to the tariff finder page
   */
  async navigateTo(): Promise<void> {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Fill PLZ field
   */
  async fillPLZ(plz: string): Promise<void> {
    await this.plzInput.fill(plz);
  }

  /**
   * Fill Ort field
   */
  async fillOrt(ort: string): Promise<void> {
    await this.ortInput.fill(ort);
  }

  /**
   * Click search button
   */
  async clickSearch(): Promise<void> {
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Search for tariffs
   */
  async searchTariffs(plz: string, ort: string): Promise<void> {
    await this.fillPLZ(plz);
    await this.fillOrt(ort);
    await this.clickSearch();
  }

  /**
   * Get PLZ value
   */
  async getPLZValue(): Promise<string | null> {
    return await this.plzInput.inputValue();
  }

  /**
   * Get Ort value
   */
  async getOrtValue(): Promise<string | null> {
    return await this.ortInput.inputValue();
  }

  /**
   * Clear PLZ field
   */
  async clearPLZ(): Promise<void> {
    await this.plzInput.clear();
  }

  /**
   * Clear Ort field
   */
  async clearOrt(): Promise<void> {
    await this.ortInput.clear();
  }

  /**
   * Get number of tariff cards
   */
  async getTariffCount(): Promise<number> {
    return await this.tariffCards.count();
  }

  /**
   * Get tariff names
   */
  async getTariffNames(): Promise<string[]> {
    const names: string[] = [];
    const count = await this.tariffNames.count();
    for (let i = 0; i < count; i++) {
      const text = await this.tariffNames.nth(i).textContent();
      if (text && text.trim()) {
        names.push(text.trim());
      }
    }
    return names;
  }

  /**
   * Check if search button is visible
   */
  async isSearchButtonVisible(): Promise<boolean> {
    return await this.searchButton.isVisible();
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string | null> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    const timestamp = Date.now();
    await this.page.screenshot({ 
      path: `results/screenshots/${name}-${timestamp}.png`,
      fullPage: true 
    });
  }
}
