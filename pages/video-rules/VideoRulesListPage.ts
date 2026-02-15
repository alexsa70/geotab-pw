import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { VideoRuleRow } from './VideoRuleRow';
import { TIMEOUTS } from '../../constants/timeouts';

/**
 * VideoRulesListPage - Page Object for Geotab Video Rules page
 * Shows list of video rules with On/Off toggles
 */
export class VideoRulesListPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ==========================================
  // Page elements
  // ==========================================

  get pageTitle() {
    return this.page.locator('.surf-title-header').filter({ hasText: 'Geotab Video Rules' });
  }

  get saveButton() {
    return this.page.getByRole('button', { name: 'Save', exact: true });
  }

  get helpButton() {
    return this.page.getByRole('button', { name: 'Help', exact: true });
  }

  // ==========================================
  // Working with video rule rows
  // ==========================================

  /**
   * Find video rule row by rule name
   * @param ruleName - Rule name (e.g., "Speeding", "Seat belt")
   */
  async findRuleByName(ruleName: string | RegExp): Promise<VideoRuleRow> {
    const pattern = typeof ruleName === 'string' ? new RegExp(ruleName) : ruleName;
    const row = this.page.locator('div, tr').filter({ hasText: pattern });
    
    await expect(row.first()).toBeVisible({ timeout: TIMEOUTS.VERY_LONG });
    
    return new VideoRuleRow(this.page, row.first());
  }

  /**
   * Get all video rule rows
   */
  getAllRuleRows() {
    return this.page.locator('div').filter({ 
      has: this.page.getByRole('button', { name: 'On' }) 
    });
  }

  /**
   * Click Save button
   */
  async clickSave(): Promise<void> {
    await expect(this.saveButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await this.saveButton.click();
  }

  /**
   * Click Help button
   */
  async clickHelp(): Promise<void> {
    await expect(this.helpButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await this.helpButton.click();
  }

  /**
   * Check if video rules page is loaded
   */
  async isVideoRulesListLoaded(): Promise<boolean> {
    return await this.isVisible(this.pageTitle, TIMEOUTS.LONG);
  }

  /**
   * Wait for video rules list to load
   */
  async waitForVideoRulesListLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.waitForVisible(this.pageTitle, TIMEOUTS.VERY_LONG);
  }
}