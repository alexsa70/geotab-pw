import { Page, Locator, expect } from '@playwright/test';
import { DeviceSettingsModal } from '../modals/DeviceSettingsModal';
import { CameraRulesModal } from '../modals/CameraRulesModal';
import { DataUsageModal } from '../modals/DataUsageModal';
import { TIMEOUTS } from '../../constants/timeouts';

/**
 * VehicleRow - represents a single vehicle row in the vehicles list
 * Provides access to row-level actions and buttons
 */
export class VehicleRow {
  constructor(
    private readonly page: Page,
    private readonly row: Locator
  ) {}

  // ==========================================
  // Row-level action buttons
  // ==========================================

  get settingsButton() {
    return this.row.getByRole('button', { name: 'Settings', exact: true });
  }

  get cameraRulesButton() {
    return this.row.getByRole('button', { name: 'Camera Rules', exact: true });
  }

  get dataUsageButton() {
    return this.row.getByRole('button', { name: 'Data Usage', exact: true });
  }

  get unpairCameraButton() {
    return this.row.getByRole('button', { name: 'Unpair Camera', exact: true });
  }

  get liveStreamButton() {
    return this.row.getByRole('button', { name: 'Live Stream', exact: true });
  }

  // ==========================================
  // Row information getters
  // ==========================================

  /**
   * Get vehicle name from the row
   */
  async getVehicleName(): Promise<string> {
    const nameCell = this.row.getByRole('cell').first();
    return (await nameCell.textContent()) || '';
  }

  /**
   * Check if row is selected
   */
  async isSelected(): Promise<boolean> {
    const selectedClass = await this.row.getAttribute('class');
    return selectedClass?.includes('selected') || false;
  }

  // ==========================================
  // Actions
  // ==========================================

  /**
   * Select this vehicle row (click on it)
   */
  async select(): Promise<void> {
    await this.row.scrollIntoViewIfNeeded();
    await this.row.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click Settings button and return Settings modal
   */
  async openSettings(): Promise<DeviceSettingsModal> {
    await expect(this.settingsButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await this.settingsButton.click();
    return new DeviceSettingsModal(this.page);
  }

  /**
   * Click Camera Rules button and return Camera Rules modal
   */
  async openCameraRules(): Promise<CameraRulesModal> {
    await expect(this.cameraRulesButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await this.cameraRulesButton.click();
    return new CameraRulesModal(this.page);
  }

  /**
   * Click Data Usage button and return Data Usage modal
   */
  async openDataUsage(): Promise<DataUsageModal> {
    await expect(this.dataUsageButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await this.dataUsageButton.click();
    return new DataUsageModal(this.page);
  }

  /**
   * Click Live Stream button
   */
  async openLiveStream(): Promise<void> {
    await expect(this.liveStreamButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await this.liveStreamButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click Unpair Camera button
   */
  async clickUnpairCamera(): Promise<void> {
    await expect(this.unpairCameraButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await this.unpairCameraButton.click();
  }

  /**
   * Verify all row buttons are visible
   */
  async verifyAllButtonsVisible(): Promise<void> {
    const buttons = [
      this.settingsButton,
      this.cameraRulesButton,
      this.dataUsageButton,
      this.unpairCameraButton,
      this.liveStreamButton,
    ];

    for (const button of buttons) {
      await expect(button).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    }
  }
}
