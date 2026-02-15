import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { EventCameraRow } from './EventCameraRow';
import { TIMEOUTS } from '../../constants/timeouts';

/**
 * EventsListPage - Page Object for Video Events page
 * Shows list of cameras with Options menu for date selection
 */
export class EventsListPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ==========================================
  // Page elements
  // ==========================================

  get pageTitle() {
    // Находим первый элемент с текстом "Video Events"
    return  this.page.locator('.surf-title-header').filter({ hasText: 'Video Events' });
  }

  get cameraNameHeader() {
    return this.page.getByRole('columnheader', { name: 'Camera Name' });
  }

  get moreActionsHeader() {
    return this.page.getByRole('columnheader', { name: 'More Actions' });
  }

  // ==========================================
  // Working with camera rows
  // ==========================================

  /**
   * Find camera row by name
   * @param cameraName - Camera name (e.g., "AlexL - 3.12.X")
   */
  async findCameraByName(cameraName: string | RegExp): Promise<EventCameraRow> {
    const pattern = typeof cameraName === 'string' ? new RegExp(cameraName) : cameraName;
    const row = this.page.getByRole('row').filter({ hasText: pattern });
    
    await expect(row).toBeVisible({ timeout: TIMEOUTS.VERY_LONG });
    
    return new EventCameraRow(this.page, row);
  }

  /**
   * Get all camera rows
   */
  getAllCameraRows() {
    return this.page.getByRole('row').filter({ has: this.page.getByRole('cell') });
  }

  /**
   * Check if events list page is loaded
   */
  async isEventsListLoaded(): Promise<boolean> {
    return await this.isVisible(this.pageTitle, TIMEOUTS.LONG);
  }

  /**
   * Wait for events list to load
   */
  async waitForEventsListLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.waitForVisible(this.pageTitle, TIMEOUTS.VERY_LONG);
  }
}