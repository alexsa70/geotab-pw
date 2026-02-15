import { Page, Locator, expect } from '@playwright/test';
import { TIMEOUTS } from '../../constants/timeouts';

/**
 * VideoRuleRow - represents a single video rule row
 * Provides access to On/Off toggle
 */
export class VideoRuleRow {
  constructor(
    private readonly page: Page,
    public readonly row: Locator
  ) {}

  // ==========================================
  // Row elements
  // ==========================================

  get ruleName() {
    return this.row;
  }

  get onButton() {
    // Ищем div с классом surf-button и текстом On
    return this.row.locator('div.surf-button', { hasText: 'On' }).first();
  }

  get offButton() {
    // Ищем div с классом surf-button и текстом Off
    return this.row.locator('div.surf-button', { hasText: 'Off' }).first();
  }

  // ==========================================
  // Actions
  // ==========================================

  /**
   * Get rule name text
   */
  async getRuleName(): Promise<string> {
    return (await this.ruleName.textContent()) || '';
  }

  /**
   * Check if rule is enabled (On button is active)
   */
  async isEnabled(): Promise<boolean> {
    try {
      // Если On кнопка имеет определённый класс или атрибут когда активна
      const onButtonClass = await this.onButton.getAttribute('class');
      return onButtonClass?.includes('active') || onButtonClass?.includes('selected') || false;
    } catch {
      return false;
    }
  }

  /**
   * Turn rule On
   */
  async turnOn(): Promise<void> {
    await expect(this.onButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await this.onButton.click();
  }

  /**
   * Turn rule Off
   */
  async turnOff(): Promise<void> {
    await expect(this.offButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await this.offButton.click();
  }

  /**
   * Toggle rule (switch between On and Off)
   */
  async toggle(): Promise<void> {
    const isOn = await this.isEnabled();
    if (isOn) {
      await this.turnOff();
    } else {
      await this.turnOn();
    }
  }
}