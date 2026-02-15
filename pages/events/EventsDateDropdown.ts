import { Page, expect } from '@playwright/test';
import { TIMEOUTS } from '../../constants/timeouts';

/**
 * EventsDateDropdown - Dropdown menu for selecting date range in Events page
 * Appears when clicking Options button for a camera
 */
export class EventsDateDropdown {
  constructor(private readonly page: Page) {}

  // ==========================================
  // Dropdown options
  // ==========================================

  get todayOption() {
    return this.page.getByText('Today', { exact: true });
  }

  get yesterdayOption() {
    return this.page.getByText('Yesterday', { exact: true });
  }

  get last7DaysOption() {
    return this.page.getByText('Last 7 Days', { exact: true });
  }

  get last30DaysOption() {
    return this.page.getByText('Last 30 Days', { exact: true });
  }

  get thisMonthOption() {
    return this.page.getByText('This Month', { exact: true });
  }

  get lastMonthOption() {
    return this.page.getByText('Last Month', { exact: true });
  }

  get customOption() {
    return this.page.getByText('$Custom', { exact: true });
  }

  get applyChangesButton() {
    return this.page.getByRole('button', { name: 'Apply changes' });
  }

  // ==========================================
  // Actions
  // ==========================================

  /**
   * Wait for dropdown to be visible
   */
  async waitForDropdown(): Promise<void> {
    // Wait for first option to be visible
    await expect(this.todayOption).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
  }

  /**
   * Check if dropdown is open
   */
  async isDropdownOpen(): Promise<boolean> {
    try {
      await this.todayOption.waitFor({ state: 'visible', timeout: TIMEOUTS.SHORT });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verify all date options are visible
   */
  async verifyAllDateOptionsVisible(): Promise<void> {
    const options = [
      this.todayOption,
      this.yesterdayOption,
      this.last7DaysOption,
      this.last30DaysOption,
      this.thisMonthOption,
      this.lastMonthOption,
    ];

    for (const option of options) {
      await expect(option).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    }
  }

  /**
   * Close dropdown without selecting option (ESC key)
   */
  async close(): Promise<void> {
    await this.page.keyboard.press('Escape');
    // Wait for dropdown to close
    await expect(this.todayOption).toBeHidden({ timeout: TIMEOUTS.SHORT });
  }

  /**
   * Select Today and apply
   */
  async selectToday(): Promise<void> {
    await this.todayOption.click();
    await this.applyChangesButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Select Yesterday and apply
   */
  async selectYesterday(): Promise<void> {
    await this.yesterdayOption.click();
    await this.applyChangesButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Select Last 7 Days and apply
   */
  async selectLast7Days(): Promise<void> {
    await this.last7DaysOption.click();
    await this.applyChangesButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Select Last 30 Days and apply
   */
  async selectLast30Days(): Promise<void> {
    await this.last30DaysOption.click();
    await this.applyChangesButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Select This Month and apply
   */
  async selectThisMonth(): Promise<void> {
    await this.thisMonthOption.click();
    await this.applyChangesButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Select Last Month and apply
   */
  async selectLastMonth(): Promise<void> {
    await this.lastMonthOption.click();
    await this.applyChangesButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}