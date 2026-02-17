import { Page, Locator } from '@playwright/test';

/**
 * BasePage - parent class for all Page Objects
 * Contains only methods that add real value (no simple wrappers)
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to URL and wait for page load
   * @param url - relative or absolute URL
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Check if element is visible without throwing error
   * @param locator - Playwright Locator
   * @param timeout - wait timeout (default 5000ms)
   * @returns true if visible, false otherwise
   */
  async isVisible(locator: Locator, timeout: number = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for element to be visible
   * @param locator - Playwright Locator
   * @param timeout - wait timeout (default 10000ms)
   */
  async waitForVisible(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   * @param locator - Playwright Locator
   * @param timeout - wait timeout (default 10000ms)
   */
  async waitForHidden(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Wait for page to load (networkidle)
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for DOM Content Loaded
   */
  async waitForDOMLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Take screenshot of the page
   * @param name - file name (without extension)
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ 
      path: `test-results/${name}.png`, 
      fullPage: true 
    });
  }

  /**
   * Get current URL
   */
  getCurrentURL(): string {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Reload page
   */
  async reload(): Promise<void> {
    await this.page.reload();
  }

  /**
   * Common Cancel button (used in modals/dialogs)
   * @returns Locator for Cancel button
   */
  get cancelButton(): Locator {
    return this.page.getByRole('button', { name: 'Cancel' });
  }

  // ==========================================
  // Back button
  // ==========================================
  /**
 * Back button (available on detail pages)
 */
get backButton(): Locator {
  return this.page.locator('button.back-btn.surf-back-button');
}

/**
 * Click back button and wait for page load
 */
async clickBack(): Promise<void> {
  await this.backButton.click();
  await this.page.waitForLoadState('domcontentloaded');
}

  /**
   * Close modal by clicking Cancel button
   */
  async closeModal(): Promise<void> {
    await this.cancelButton.click();
  }
}
