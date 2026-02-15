import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { TIMEOUTS } from '../../constants/timeouts';

/**
 * BulkEditCameraRulesModal - Modal dialog for bulk editing camera video rules
 * Appears when clicking "Bulk Edit Camera Rules" button with selected cameras
 */
export class BulkEditCameraRulesModal extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ==========================================
  // Modal container
  // ==========================================

  get modalContainer() {
    return this.page.locator('#react-component-screen').filter({ 
      hasText: 'Camera Video Rules - Bulk Edit' 
    });
  }

  get modalTitle() {
    return this.page.getByText('Camera Video Rules - Bulk Edit');
  }

  // ==========================================
  // Event rule options (текст из модалки)
  // ==========================================

  // Vehicle settings
  get vehicleSize() {
    return this.modalContainer.getByText('Vehicle size',{ exact: true });
  }

  // Driver behavior events
  get buttonPressed() {
    return this.modalContainer.getByText('Button Pressed',{ exact: true });
  }

  get deAcceleration() {
    return this.modalContainer.getByText('De-Acceleration',{ exact: true });
  }

  get acceleration() {
    return this.modalContainer.getByText('Acceleration',{ exact: true });
  }

  get violentLeftTurn() {
    return this.modalContainer.getByText('Violent Left Turn',{ exact: true });
  }

  get violentRightTurn() {
    return this.modalContainer.getByText('Violent Right Turn',{ exact: true });
  }

  get vibration() {
    return this.modalContainer.getByText('Vibration',{ exact: true });
  }

  // Driver distraction events
  get distractedDriving() {
    return this.modalContainer.getByText('Distracted Driving',{ exact: true });
  }

  get smoking() {
    return this.modalContainer.getByText('Smoking',{ exact: true });
  }

  get foodAndDrink() {
    return this.modalContainer.getByText('Food and Drink',{ exact: true });
  }

  get cellPhoneUse() {
    return this.modalContainer.getByText('Cell Phone Use',{ exact: true } );
  }

  get driverUnbelted() {
    return this.modalContainer.getByText('Driver Unbelted',{ exact: true });
  }

  get passengerUnbelted() {
    return this.modalContainer.getByText('Passenger unbelted',{ exact: true });
  }

  // Safety events
  get accident() {
    return this.modalContainer.getByText('Accident',{ exact: true });
  }

  get tailgating() {
    return this.modalContainer.getByText('Tailgating',{ exact: true });
  }

  get obstruction() {
    return this.modalContainer.getByText('Obstruction',{ exact: true });
  }

  get laneWeaving() {
    return this.modalContainer.getByText('Lane weaving',{ exact: true });
  }

  get possibleFatigue() {
    return this.modalContainer.getByText('Possible Fatigue',{ exact: true });
  }

  // System events
  get tamper() {
    return this.modalContainer.getByText('Tamper',{ exact: true });
  }

  get powerDisconnect() {
    return this.modalContainer.getByText('Power Disconnect',{ exact: true });
  }

  get gsensorRegular() {
    return this.modalContainer.getByText('Gsensor regular',{ exact: true });
  }

  get gsensorHigh() {
    return this.modalContainer.getByText('Gsensor High',{ exact: true });
  }

  get wrongPINCode() {
    return this.modalContainer.getByText('Wrong PIN code',{ exact: true } );
  }

  get sdCardFormatted() {
    return this.modalContainer.getByText('SD card formatted',{ exact: true });
  }

  // Standby events
  get qrCode() {
    return this.modalContainer.getByText('QR Code',{ exact: true });
  }

  get enteringStandby() {
    return this.modalContainer.getByText('Entering Standby',{ exact: true });
  }

  get exitingStandby() {
    return this.modalContainer.getByText('Exiting Standby',{ exact: true });
  }

  // Driver events
  get driverCheckIn() {
    return this.modalContainer.getByText('Driver Check-In',{ exact: true });
  }

  get driverCheckOut() {
    return this.modalContainer.getByText('Driver Check-Out',{ exact: true });
  }

  get noCheckIn() {
    return this.modalContainer.getByText('No Check-In',{ exact: true });
  }

  // ==========================================
  // Actions
  // ==========================================

  /**
   * Wait for modal to be visible
   */
  async waitForModal(): Promise<void> {
    await expect(this.modalTitle).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
  }

  /**
   * Check if modal is open
   */
  async isModalOpen(): Promise<boolean> {
    return await this.isVisible(this.modalTitle, TIMEOUTS.SHORT);
  }

  /**
   * Verify all event rule options are visible
   */
  async verifyAllEventRulesVisible(): Promise<void> {
    const eventRules = [
      { element: this.vehicleSize, name: 'Vehicle size' },
      { element: this.buttonPressed, name: 'Button Pressed' },
      { element: this.deAcceleration, name: 'De-Acceleration' },
      { element: this.acceleration, name: 'Acceleration'},
      { element: this.violentLeftTurn, name: 'Violent Left Turn' },
      { element: this.violentRightTurn, name: 'Violent Right Turn' },
      { element: this.vibration, name: 'Vibration' },
      { element: this.distractedDriving, name: 'Distracted Driving' },
      { element: this.tamper, name: 'Tamper' },
      { element: this.powerDisconnect, name: 'Power Disconnect' },
      { element: this.smoking, name: 'Smoking' },
      { element: this.foodAndDrink, name: 'Food and Drink' },
      { element: this.cellPhoneUse, name: 'Cell Phone Use' },
      { element: this.driverUnbelted, name: 'Driver Unbelted' },
      { element: this.accident, name: 'Accident' },
      { element: this.gsensorRegular, name: 'Gsensor regular' },
      { element: this.gsensorHigh, name: 'Gsensor High' },
      { element: this.wrongPINCode, name: 'Wrong PIN code' },
      { element: this.tailgating, name: 'Tailgating' },
      { element: this.obstruction, name: 'Obstruction' },
      { element: this.laneWeaving, name: 'Lane weaving' },
      { element: this.possibleFatigue, name: 'Possible Fatigue' },
      { element: this.qrCode, name: 'QR Code' },
      { element: this.enteringStandby, name: 'Entering Standby' },
      { element: this.exitingStandby, name: 'Exiting Standby' },
      { element: this.driverCheckIn, name: 'Driver Check-In' },
      { element: this.driverCheckOut, name: 'Driver Check-Out' },
      { element: this.noCheckIn, name: 'No Check-In' },
      { element: this.sdCardFormatted, name: 'SD card formatted' },
      { element: this.passengerUnbelted, name: 'Passenger unbelted' },
    ];

    for (const { element, name } of eventRules) {
      await expect(element).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    }
  }

  /**
   * Verify specific event rules are present (shorthand)
   */
  async verifyEventRulesPresent(ruleNames: string[]): Promise<void> {
    for (const ruleName of ruleNames) {
      await expect(this.modalContainer.getByText(ruleName)).toBeVisible({
        timeout: TIMEOUTS.MEDIUM
      });
    }
  }

  /**
   * Close modal by clicking Cancel button
   */
  async close(): Promise<void> {
    await this.closeModal();
    await expect(this.modalTitle).toBeHidden({ timeout: TIMEOUTS.SHORT });
  }
}