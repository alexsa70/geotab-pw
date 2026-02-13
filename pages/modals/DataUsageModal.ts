import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { TIMEOUTS } from '../../constants/timeouts';

/**
 * DataUsageModal - Modal dialog for data usage information
 * Appears when clicking Data Usage button on a vehicle row
 */
export class DataUsageModal extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ==========================================
  // Modal elements
  // ==========================================

  get modalTitle() {
    // Более специфичный локатор - ищем заголовок модалки (span или h1/h2/h3)
    return this.page.locator('span, h1, h2, h3').filter({ hasText: /^Data usage/i });
  }

  get closeIcon() {
    return this.page.getByRole('img', { name: 'surf-close-alert' });
  }

  // ==========================================
  // Actions
  // ==========================================

  /**
   * Wait for modal to be visible
   */
  async waitForModal(): Promise<void> {
    // Ждём заголовок модалки или close icon
    try {
      await expect(this.modalTitle.first()).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    } catch {
      // Если заголовок не найден, пробуем найти close icon
      await expect(this.closeIcon).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    }
  }

  /**
   * Check if modal is open
   */
  async isModalOpen(): Promise<boolean> {
    try {
      await this.modalTitle.first().waitFor({ state: 'visible', timeout: TIMEOUTS.SHORT });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Close modal by clicking close icon
   */
  async closeByIcon(): Promise<void> {
    await this.closeIcon.click();
    await expect(this.modalTitle.first()).toBeHidden({ timeout: TIMEOUTS.SHORT });
  }

  /**
   * Close modal by clicking Cancel button
   */
  async close(): Promise<void> {
    await this.closeModal();
    await expect(this.modalTitle.first()).toBeHidden({ timeout: TIMEOUTS.SHORT });
  }
}