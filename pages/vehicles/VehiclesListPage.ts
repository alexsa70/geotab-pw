import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { VehicleRow } from './VehicleRow';
import { TIMEOUTS } from '../../constants/timeouts';

/**
 * VehiclesListPage - Page Object for SurfSight Vehicles page
 * Represents the list of vehicles and page-level actions
 */
export class VehiclesListPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ==========================================
  // Page-level buttons (toolbar)
  // ==========================================

  get addCameraButton() {
    return this.page.getByRole('button', { name: 'Add Camera', exact: true });
  }

  get bulkAddCamerasButton() {
    return this.page.getByRole('button', { name: 'Bulk Add Cameras', exact: true });
  }

  get updateSettingsButton() {
    return this.page.getByRole('button', { name: 'Update Settings', exact: true });
  }

  get userAccessButton() {
    return this.page.getByRole('button', { name: 'User Access' });
  }

  get wifiButton() {
    return this.page.getByRole('button', { name: 'WiFi', exact: true });
  }

  get alarmsReportButton() {
    return this.page.getByRole('button', { name: 'Alarms Report' });
  }

  get healthButton() {
    return this.page.getByRole('button', { name: 'Health' });
  }

  get bulkEditCameraRulesButton() {
    return this.page.getByRole('button', { name: 'Bulk Edit Camera Rules', exact: true });
  }

  get bulkEditCameraSettingsButton() {
    return this.page.getByRole('button', { name: 'Bulk Edit Camera Settings', exact: true });
  }

  // ==========================================
  // Working with vehicle list
  // ==========================================

  /**
   * Find vehicle row by name
   * @param name - Vehicle name or pattern (e.g., "AlexL - 3.12.X")
   * @returns VehicleRow instance
   */
  async findVehicleByName(name: string | RegExp): Promise<VehicleRow> {
    const pattern = typeof name === 'string' ? new RegExp(name) : name;
    const row = this.page.getByRole('row').filter({ hasText: pattern });
    
    await expect(row).toBeVisible({ timeout: TIMEOUTS.VERY_LONG });
    await row.scrollIntoViewIfNeeded();
    
    return new VehicleRow(this.page, row);
  }

  /**
   * Select vehicle by clicking on its row
   * @param name - Vehicle name or pattern
   */
  async selectVehicle(name: string | RegExp): Promise<VehicleRow> {
    const vehicle = await this.findVehicleByName(name);
    await vehicle.select();
    return vehicle;
  }

  /**
   * Get all visible vehicle rows
   * Note: This returns all rows currently in the DOM
   */
  getAllVehicleRows() {
    return this.page.getByRole('row').filter({ has: this.page.getByRole('cell') });
  }

  /**
   * Poll device status every intervalMs until it becomes 'Online' or timeout is reached.
   * Reloads the page between each check.
   * @param vehicleName - Vehicle name to find after each reload
   * @param timeoutMs - Max total wait time in ms (default 5 minutes)
   * @param intervalMs - Time between checks in ms (default 10 seconds)
   * @returns A fresh VehicleRow instance for the online device
   */
  async waitForDeviceOnline(
    vehicleName: string | RegExp,
    timeoutMs: number = 300000,
    intervalMs: number = 10000,
  ): Promise<VehicleRow> {
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
      const vehicle = await this.findVehicleByName(vehicleName);
      const status = await vehicle.getDeviceStatus();

      if (status === 'Online') return vehicle;

      console.log(`Device status: ${status}. Retrying in ${intervalMs / 1000}s...`);
      await this.page.waitForTimeout(intervalMs);
      await this.page.reload();
      // Use networkidle so device statuses are fully loaded before re-checking
      await this.page.waitForLoadState('networkidle');
      const firstRow = this.page.getByRole('row').first();
      await firstRow.waitFor({ state: 'visible', timeout: TIMEOUTS.VERY_LONG });
    }

    throw new Error(
      `Device "${vehicleName}" did not come Online within ${timeoutMs / 1000}s`
    );
  }

  /**
   * Check if vehicles list is loaded
   */
  async isVehiclesListLoaded(): Promise<boolean> {
    const firstRow = this.page.getByRole('row').first();
    return await this.isVisible(firstRow, TIMEOUTS.LONG);
  }

  /**
   * Wait for vehicles list to load
   */
  async waitForVehiclesListLoad(): Promise<void> {
    await this.waitForPageLoad();
    const firstRow = this.page.getByRole('row').first();
    await this.waitForVisible(firstRow, TIMEOUTS.VERY_LONG);
  }
}
