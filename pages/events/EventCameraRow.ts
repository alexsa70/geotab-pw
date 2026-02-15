import { Page, Locator, expect } from '@playwright/test';
import { EventsDateDropdown } from './EventsDateDropdown';
import { TIMEOUTS } from '../../constants/timeouts';

/**
 * EventCameraRow - represents a single camera row in events list
 * Provides access to Options menu for date selection
 */
export class EventCameraRow {
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
   * Click Options button and return EventsDateDropdown
   */
  async openOptionsMenu(): Promise<EventsDateDropdown> {
    await expect(this.optionsButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await this.optionsButton.click();
    
    const dropdown = new EventsDateDropdown(this.page);
    await dropdown.waitForDropdown();
    
    return dropdown;
  }

  /**
   * Select date option and wait for events to load
   * @param dateOption - 'Today', 'Yesterday', 'Last 7 Days', etc.
   */
  async selectDateOption(dateOption: 'Today' | 'Yesterday' | 'Last 7 Days' | 'Last 30 Days' | 'This Month' | 'Last Month'): Promise<void> {
    const dropdown = await this.openOptionsMenu();
    
    switch (dateOption) {
      case 'Today':
        await dropdown.selectToday();
        break;
      case 'Yesterday':
        await dropdown.selectYesterday();
        break;
      case 'Last 7 Days':
        await dropdown.selectLast7Days();
        break;
      case 'Last 30 Days':
        await dropdown.selectLast30Days();
        break;
      case 'This Month':
        await dropdown.selectThisMonth();
        break;
      case 'Last Month':
        await dropdown.selectLastMonth();
        break;
    }
  }
}