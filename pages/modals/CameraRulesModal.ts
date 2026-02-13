import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { TIMEOUTS } from '../../constants/timeouts';

/**
 * CameraRulesModal - Modal dialog for camera video rules
 * Appears when clicking Camera Rules button on a vehicle row
 */
export class CameraRulesModal extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ==========================================
  // Modal elements
  // ==========================================

  get modalTitle() {
    return this.page.getByText(/Camera Video Rules/i);
  }

  get saveButton() {
    return this.page.getByRole('button', { name: 'Save', exact: true });
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
   * Click Save button
   */
  async save(): Promise<void> {
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Close modal by clicking Cancel button
   */
  async close(): Promise<void> {
    await this.closeModal();
    // Wait for modal to disappear
    await expect(this.modalTitle).toBeHidden({ timeout: TIMEOUTS.SHORT });
  }
}
