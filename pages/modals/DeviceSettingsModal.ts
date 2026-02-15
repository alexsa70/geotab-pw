import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { TIMEOUTS } from '../../constants/timeouts';

/**
 * DeviceSettingsModal - Modal dialog for device settings
 * Appears when clicking Settings button on a vehicle row
 */
export class DeviceSettingsModal extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ==========================================
  // Modal buttons
  // ==========================================

  get calibrateButton() {
    return this.page.getByRole('button', { name: 'Calibrate' });
  }

  get formatSDButton() {
    return this.page.getByRole('button', { name: 'Format SD Card' });
  }

  get rebootButton() {
    return this.page.getByRole('button', { name: 'Reboot camera' });
  }

  get infoButton() {
    return this.page.getByRole('button', { name: 'info' });
  }

  // ==========================================
  // Modal title/header
  // ==========================================

  get modalTitle() {
    return this.page.getByRole('heading', { name: /settings/i });
  }

  // ==========================================
  // Actions
  // ==========================================

  /**
   * Wait for modal to be visible
   */
  async waitForModal(): Promise<void> {
    // Wait for any of the key buttons to be visible
    await expect(this.calibrateButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
  }

  /**
   * Verify all settings buttons are visible
   */
  async verifyAllButtonsVisible(): Promise<void> {
    const buttons = [
      { button: this.calibrateButton, name: 'Calibrate' },
      { button: this.formatSDButton, name: 'Format SD Card' },
      { button: this.rebootButton, name: 'Reboot camera' },
      { button: this.infoButton, name: 'Info' },
    ];

    for (const { button, name } of buttons) {
      await expect(button).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    }
  }

  /**
   * Click Calibrate button
   */
  async clickCalibrate(): Promise<void> {
    await this.calibrateButton.click();
  }

  /**
   * Click Format SD Card button
   */
  async clickFormatSD(): Promise<void> {
    await this.formatSDButton.click();
  }

  /**
   * Click Reboot camera button
   */
  async clickReboot(): Promise<void> {
    await this.rebootButton.click();
  }

  /**
   * Click Info button
   */
  async clickInfo(): Promise<void> {
    await this.infoButton.click();
  }

  /**
   * Close modal by clicking Cancel button
   */
  async close(): Promise<void> {
    await this.closeModal();
    // Wait for modal to disappear
    await expect(this.calibrateButton).toBeHidden({ timeout: TIMEOUTS.SHORT });
  }
}
