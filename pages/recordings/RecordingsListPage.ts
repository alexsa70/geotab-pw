import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { RecordingRow } from './RecordingRow';
import { TIMEOUTS } from '../../constants/timeouts';

/**
 * RecordingsListPage - Page Object for Recordings page
 * Shows list of video recordings
 */
export class RecordingsListPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ==========================================
  // Page elements
  // ==========================================

  get pageTitle() {
    return this.page.locator('.surf-title-header').filter({ hasText: 'Recordings' });
  }

  get cameraNameHeader() {
    return this.page.getByRole('columnheader', { name: 'Camera Name' });
  }

  get moreActionsHeader() {
    return this.page.getByRole('columnheader', { name: 'More Actions' });
  }

  // ==========================================
  // Working with recording rows
  // ==========================================

  /**
   * Find recording row by camera name
   * @param cameraName - Camera name (e.g., "AlexL - 3.12.X")
   */
  async findRecordingByCamera(cameraName: string | RegExp): Promise<RecordingRow> {
    const pattern = typeof cameraName === 'string' ? new RegExp(cameraName) : cameraName;
    const row = this.page.getByRole('row').filter({ hasText: pattern });
    
    await expect(row).toBeVisible({ timeout: TIMEOUTS.VERY_LONG });
    
    return new RecordingRow(this.page, row);
  }

  /**
   * Get all recording rows
   */
  getAllRecordingRows() {
    return this.page.getByRole('row').filter({ has: this.page.getByRole('cell') });
  }

  /**
   * Check if recordings list page is loaded
   */
  async isRecordingsListLoaded(): Promise<boolean> {
    return await this.isVisible(this.pageTitle, TIMEOUTS.LONG);
  }

  /**
   * Wait for recordings list to load
   */
  async waitForRecordingsListLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.waitForVisible(this.pageTitle, TIMEOUTS.VERY_LONG);
  }
}
