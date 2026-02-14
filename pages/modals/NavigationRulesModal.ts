import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { TIMEOUTS } from '../../constants/timeouts';

/**
 * NavigationRulesModal - Modal dialog for navigation rules date selection
 * Appears when accessing navigation/rules functionality with date options
 */
export class NavigationRulesModal extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ==========================================
  // Date range options
  // ==========================================

  get todayOption() {
    return this.page.getByRole('button', { name: 'Today' });
  }

  get yesterdayOption() {
    return this.page.getByRole('button', { name: 'Yesterday' });
  }

  get last7DaysOption() {
    return this.page.getByRole('button', { name: 'Last 7 Days' });
  }

  get last30DaysOption() {
    return this.page.getByRole('button', { name: 'Last 30 Days' });
  }

  get thisMonthOption() {
    return this.page.getByRole('button', { name: 'This Month' });
  }

  get lastMonthOption() {
    return this.page.getByRole('button', { name: 'Last Month' });
  }

  // ==========================================
  // Modal header
  // ==========================================

  get modalTitle() {
    return this.page.getByText('Navigation Rules');
  }

  // ==========================================
  // Actions
  // ==========================================

  /**
   * Wait for modal to be visible
   */
  async waitForModal(): Promise<void> {
    await expect(this.modalTitle).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
  }

  /**
   * Check if modal is open
   */
  async isModalOpen(): Promise<boolean> {
    return await this.isVisible(this.modalTitle, TIMEOUTS.SHORT);
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
   * Select Today option
   */
  async selectToday(): Promise<void> {
    await this.todayOption.click();
  }

  /**
   * Select Yesterday option
   */
  async selectYesterday(): Promise<void> {
    await this.yesterdayOption.click();
  }

  /**
   * Select Last 7 Days option
   */
  async selectLast7Days(): Promise<void> {
    await this.last7DaysOption.click();
  }

  /**
   * Select Last 30 Days option
   */
  async selectLast30Days(): Promise<void> {
    await this.last30DaysOption.click();
  }

  /**
   * Select This Month option
   */
  async selectThisMonth(): Promise<void> {
    await this.thisMonthOption.click();
  }

  /**
   * Select Last Month option
   */
  async selectLastMonth(): Promise<void> {
    await this.lastMonthOption.click();
  }

  /**
   * Close modal by clicking Cancel button
   */
  async close(): Promise<void> {
    await this.closeModal();
    await expect(this.modalTitle).toBeHidden({ timeout: TIMEOUTS.SHORT });
  }
}