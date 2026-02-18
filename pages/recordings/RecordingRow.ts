import { Page, Locator, expect } from '@playwright/test';
import { TIMEOUTS } from '../../constants/timeouts';

/**
 * RecordingRow - represents a single recording row
 * Provides access to recording actions
 */
export class RecordingRow {
  constructor(
    private readonly page: Page,
    public readonly row: Locator
  ) {}

  // ==========================================
  // Row elements
  // ==========================================

  get cameraName() {
    return this.row.getByRole('cell').first();
  }

  get optionsButton() {
    return this.row.getByRole('button', { name: 'Options' });
  }

  get playButton() {
    return this.row.getByRole('button', { name: 'Play' });
  }

  get downloadButton() {
    return this.row.getByRole('button', { name: 'Download' });
  }

  get timelineButton() {
    return this.row.getByRole('button', { name: 'Timeline' });
  }
  
  // ==========================================
  // Actions
  // ==========================================

  /**
   * Get camera name text
   */
  async getCameraName(): Promise<string> {
    return (await this.cameraName.textContent()) || '';
  }

  /**
   * Click Play button
   */
  async play(): Promise<void> {
    await expect(this.playButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await this.playButton.click();
  }

  /**
   * Click Download button
   */
  async download(): Promise<void> {
    await expect(this.downloadButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await this.downloadButton.click();
  }

  /**
   * Click Options button
   */
  async openOptions(): Promise<void> {
    await expect(this.optionsButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await this.optionsButton.click();
  }

    
  async clickTimeline(): Promise<void> {
    await this.timelineButton.click();
  }
}
