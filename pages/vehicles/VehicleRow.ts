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

  // get checkbox() {
  //   return this.row.locator('input[type="checkbox"]');
  // }
  get checkbox() {
    return this.row.locator('span.surf-checkbox');
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
   * Get device IMEI from the IMEI column
   */
  async getImei(): Promise<string> {
    // IMEI column is the 3rd cell in the row (Camera Name, Current Driver, IMEI, ...)
    const imeiCell = this.row.getByRole('cell').nth(2);
    return (await imeiCell.textContent())?.trim() ?? '';
  }

  /**
   * Get current device status from the Camera Name cell
   * @returns 'Online' | 'Standby' | 'Offline'
   */
  async getDeviceStatus(): Promise<'Online' | 'Standby' | 'Offline'> {
    const nameCell = this.row.getByRole('cell').first();
    if (await nameCell.getByText('Online', { exact: true }).count() > 0) return 'Online';
    if (await nameCell.getByText('Standby', { exact: true }).count() > 0) return 'Standby';
    return 'Offline';
  }

  /**
   * Click the dropdown toggle arrow on the Live Stream split button
   * to open the camera selection menu, then wait for the menu to appear.
   */
  async openLiveStreamDropdown(): Promise<void> {
    // The Live Stream split button contains two buttons:
    // 1. The main "Live Stream" button
    // 2. The dropdown toggle arrow button (last button in the cell)
    const liveStreamCell = this.row.locator('td').filter({
      has: this.page.getByRole('button', { name: 'Live Stream', exact: true }),
    });
    const dropdownToggle = liveStreamCell.getByRole('button').last();
    await expect(dropdownToggle).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await dropdownToggle.click();

    // Wait for at least one camera option to appear in the dropdown
    await this.page
      .getByText(/Front Camera|Rear Camera|Interior Camera|Cab Camera/)
      .first()
      .waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
  }

  /**
   * Click the first visible (enabled) camera option in the Live Stream dropdown menu.
   * Call openLiveStreamDropdown() first.
   */
  async clickFirstEnabledCameraOption(): Promise<void> {
    const knownCameras = ['Front Camera', 'Rear Camera', 'Interior Camera', 'Cab Camera'];
    for (const name of knownCameras) {
      const option = this.page.getByText(name, { exact: true });
      try {
        // Use waitFor with a short timeout — unlike isVisible(), this retries
        await option.waitFor({ state: 'visible', timeout: 3000 });
        await option.click();
        return;
      } catch {
        // This camera name not found/visible, try next
      }
    }
    throw new Error('No active camera option found in the Live Stream dropdown');
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

  
/**
 * Select this vehicle using checkbox (for bulk actions)
 */
async selectCheckbox(): Promise<void> {
  await this.checkbox.click();
}

/**
 * Deselect this vehicle
 */
async deselectCheckbox(): Promise<void> {
  const isChecked = await this.checkbox.isChecked();
  if (isChecked) {
    await this.checkbox.click();
  }
}
}
