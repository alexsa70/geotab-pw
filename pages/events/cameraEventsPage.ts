import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { TIMEOUTS } from '../../constants/timeouts';

/**
 * CameraEventsPage - Page Object for Video Events detail page
 * Shows list of events for a specific camera after selecting date range
 * URL: #addin-surfsight_staging-vehicleEvents,dateRange:(...),deviceID:...
 */
export class CameraEventsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ==========================================
  // Page elements
  // ==========================================

  get pageTitle() {
    return this.page.locator('.surf-title-header')
      .filter({ hasText: /Video Events/ });
  }

  // ✅ Correct locator from codegen
  get filterButton() {
    return this.page.locator('#vehicle-events-filter');
  }

  get sortByButton() {
    return this.page.getByText('Sort by:', { exact: true });
  }

  get playFrontCamera() {
    return this.page.getByText('Front Camera');
  }

  get playRearCamera() {
    return this.page.getByText('Rear Camera');
  }
  
  // ==========================================
  // Filter dropdown container
  // ✅ Correct container from codegen: #header-menu-main
  // ==========================================

  get filterContainer() {
    return this.page.locator('#header-menu-main');
  }

  // ==========================================
  // Geotab Events (5)
  // ==========================================

  get filterAfterHoursUsage() {
    return this.filterContainer.getByText('Geotab Event - After Hours Usage', { exact: true });
  }

  get filterHarshCornering() {
    return this.filterContainer.getByText('Geotab Event - Harsh Cornering', { exact: true });
  }

  get filterSpeeding() {
    return this.filterContainer.getByText('Geotab Event - Speeding', { exact: true });
  }

  get filterTripDurationLess5m() {
    return this.filterContainer.getByText('Geotab Event - Trip Duration < 5m', { exact: true });
  }

  get filterTripDuration() {
    return this.filterContainer.getByText('Geotab Event - TripDuration', { exact: true });
  }

  // ==========================================
  // Surfsight Events (13)
  // ==========================================

  get filter3rdPartyEvent() {
    return this.filterContainer.getByText('Surfsight Event - 3rd Party Event', { exact: true });
  }

  get filterAcceleration() {
    return this.filterContainer.getByText('Surfsight Event - Acceleration', { exact: true });
  }

  get filterDistractedDriving() {
    return this.filterContainer.getByText('Surfsight Event - Distracted Driving', { exact: true });
  }

  get filterDriverUnbelted() {
    return this.filterContainer.getByText('Surfsight Event - Driver Unbelted', { exact: true });
  }

  get filterEnteringStandby() {
    return this.filterContainer.getByText('Surfsight Event - Entering Standby', { exact: true });
  }

  get filterExitingStandby() {
    return this.filterContainer.getByText('Surfsight Event - Exiting Standby', { exact: true });
  }

  get filterFence() {
    return this.filterContainer.getByText('Surfsight Event - Fence', { exact: true });
  }

  get filterLaneWeaving() {
    return this.filterContainer.getByText('Surfsight Event - Lane weaving', { exact: true });
  }

  get filterPassengerUnbelted() {
    return this.filterContainer.getByText('Surfsight Event - Passenger Unbelted', { exact: true });
  }

  get filterSpeedLimit() {
    return this.filterContainer.getByText('Surfsight Event - Speed Limit', { exact: true });
  }

  get filterTailgating() {
    return this.filterContainer.getByText('Surfsight Event - Tailgating', { exact: true });
  }

  get filterVibration() {
    return this.filterContainer.getByText('Surfsight Event - Vibration', { exact: true });
  }

  get filterViolentTurn() {
    return this.filterContainer.getByText('Surfsight Event - Violent', { exact: true });
  }

  // ==========================================
  // Filter action buttons
  // ==========================================

  get filterCancelButton() {
    return this.page.getByRole('button', { name: 'Cancel', exact: true });
  }

  get filterApplyButton() {
    return this.page.getByRole('button', { name: 'Apply', exact: true });
  }

  // ==========================================
  // Events list
  // ==========================================

  get playButtons() {
    return this.page.getByRole('button', { name: 'Play' });
  }

  // ==========================================
  // Actions
  // ==========================================

  /**
   * Wait for page to load
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.filterButton).toBeVisible({ timeout: TIMEOUTS.VERY_LONG });
  }

  /**
   * Open Filter dropdown
   */
  async openFilter(): Promise<void> {
    await expect(this.filterButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await this.filterButton.click();
    await expect(this.filterCancelButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
  }

  /**
   * Close Filter without applying
   */
  async closeFilter(): Promise<void> {
    await this.filterCancelButton.click();
    await expect(this.filterCancelButton).toBeHidden({ timeout: TIMEOUTS.SHORT });
  }

  /**
   * Apply selected filters
   */
  async applyFilter(): Promise<void> {
    await this.filterApplyButton.click();
    await expect(this.filterCancelButton).toBeHidden({ timeout: TIMEOUTS.SHORT });
  }

  /**
   * Check if filter dropdown is open
   */
  async isFilterOpen(): Promise<boolean> {
    return await this.isVisible(this.filterCancelButton, TIMEOUTS.SHORT);
  }

  /**
   * Verify all Geotab filter options visible
   */
  async verifyGeotabFilterOptionsVisible(): Promise<void> {
    const options = [
      { element: this.filterAfterHoursUsage, name: 'After Hours Usage' },
      { element: this.filterHarshCornering, name: 'Harsh Cornering' },
      { element: this.filterSpeeding, name: 'Speeding' },
      { element: this.filterTripDurationLess5m, name: 'Trip Duration < 5m' },
      { element: this.filterTripDuration, name: 'TripDuration' },
    ];

    for (const { element, name } of options) {
      await expect(element).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    }
  }

  /**
   * Verify all Surfsight filter options visible
   */
  async verifySurfsightFilterOptionsVisible(): Promise<void> {
    const options = [
      { element: this.filter3rdPartyEvent, name: '3rd Party Event' },
      { element: this.filterAcceleration, name: 'Acceleration' },
      { element: this.filterDistractedDriving, name: 'Distracted Driving' },
      { element: this.filterDriverUnbelted, name: 'Driver Unbelted' },
      { element: this.filterEnteringStandby, name: 'Entering Standby' },
      { element: this.filterExitingStandby, name: 'Exiting Standby' },
      { element: this.filterFence, name: 'Fence' },
      { element: this.filterLaneWeaving, name: 'Lane weaving' },
      { element: this.filterPassengerUnbelted, name: 'Passenger Unbelted' },
      { element: this.filterSpeedLimit, name: 'Speed Limit' },
      { element: this.filterTailgating, name: 'Tailgating' },
      { element: this.filterVibration, name: 'Vibration' },
      { element: this.filterViolentTurn, name: 'Violent Turn' },
    ];

    for (const { element, name } of options) {
      await expect(element).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    }
  }

  /**
   * Verify all filter options (Geotab + Surfsight)
   */
  async verifyAllFilterOptionsVisible(): Promise<void> {
    await this.verifyGeotabFilterOptionsVisible();
    await this.verifySurfsightFilterOptionsVisible();
  }

  /**
   * Check if events list has events
   */
  async hasData(): Promise<boolean> {
    return await this.isVisible(this.playButtons.first(), TIMEOUTS.SHORT);
  }

  /**
   * Play first event in the list
   */
  async playFirstEvent(): Promise<void> {
    await expect(this.playButtons.first()).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await this.playButtons.first().click();
  }
  /**
 * Verify at least one filter option is visible
 * (Events are created by camera - not all types may be present)
 */
async verifyAtLeastOneFilterOptionVisible(): Promise<void> {
    const allOptions = [
      // Geotab Events
      this.filterAfterHoursUsage,
      this.filterHarshCornering,
      this.filterSpeeding,
      this.filterTripDurationLess5m,
      this.filterTripDuration,
      // Surfsight Events
      this.filter3rdPartyEvent,
      this.filterAcceleration,
      this.filterDistractedDriving,
      this.filterDriverUnbelted,
      this.filterEnteringStandby,
      this.filterExitingStandby,
      this.filterFence,
      this.filterLaneWeaving,
      this.filterPassengerUnbelted,
      this.filterSpeedLimit,
      this.filterTailgating,
      this.filterVibration,
      this.filterViolentTurn,
    ];
  
    // Check that at least one option is visible
    let foundCount = 0;
    for (const option of allOptions) {
      const visible = await this.isVisible(option, TIMEOUTS.SHORT);
      if (visible) foundCount++;
    }
  
    // Fail only if NO options found at all
    if (foundCount === 0) {
      throw new Error('No filter options found - filter dropdown may not be open');
    }
    
    console.log(`✅ Found ${foundCount} filter options out of ${allOptions.length}`);
  }
}