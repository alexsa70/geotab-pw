import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { TIMEOUTS } from '../../constants/timeouts';

/**
 * BulkEditCameraSettingsModal - Modal dialog for bulk editing camera settings
 * Appears when clicking "Bulk Edit Camera Settings" button with selected cameras
 */
export class BulkEditCameraSettingsModal extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ==========================================
  // Modal container
  // ==========================================

  get modalContainer() {
    return this.page.locator('#react-component-screen').filter({ 
      hasText: 'Camera Settings - Bulk Edit' 
    });
  }

  get modalTitle() {
    return this.page.getByText('Camera Settings - Bulk Edit');
  }

  // ==========================================
  // Camera settings options
  // ==========================================

  // Recording settings
  get audioRecording() {
    return this.modalContainer.getByText('Audio Recording', { exact: true });
  }

  get inCabinRecordings() {
    return this.modalContainer.getByText('In Cabin Recordings', { exact: true });
  }

  get recordingEncryption() {
    return this.modalContainer.getByText('Recording Encryption', { exact: true });
  }

  // Driver monitoring settings
  get distractedDriver() {
    return this.modalContainer.getByText('Distracted Driver', { exact: true });
  }

  get activateDriversCamera() {
    return this.modalContainer.getByText('Activate drivers camera', { exact: true });
  }

  // Alert settings
  get audioAlerts() {
    return this.modalContainer.getByText('Audio Alerts', { exact: true });
  }

  get audioAlert() {
    return this.modalContainer.getByText('Audio Alert', { exact: true });
  }

  // Display settings
  get videoTextOverlay() {
    return this.modalContainer.getByText('Video Text Overlay', { exact: true });
  }

  get speedUnitsInTextOverlay() {
    return this.modalContainer.getByText('Speed Units in Text Overlay', { exact: true });
  }

  get timeFormat() {
    return this.modalContainer.getByText('Time Format', { exact: true });
  }

  // Streaming settings
  get liveVideoStreaming() {
    return this.modalContainer.getByText('Live Video Streaming', { exact: true });
  }

  // Standby settings
  get idleMinutesToEnterStandby() {
    return this.modalContainer.getByText('Idle minutes to enter standby', { exact: true });
  }

  // Driver identification settings
  get driverIdentification() {
    return this.modalContainer.getByText('Driver Identification', { exact: true });
  }

  get visualPrompt() {
    return this.modalContainer.getByText('Visual prompt', { exact: true });
  }

  get driverPromptDurationInSeconds() {
    return this.modalContainer.getByText('Driver Prompt Duration in Seconds', { exact: true });
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
   * Verify all camera settings options are visible
   */
  async verifyAllCameraSettingsVisible(): Promise<void> {
    const cameraSettings = [
      { element: this.audioRecording, name: 'Audio Recording' },
      { element: this.distractedDriver, name: 'Distracted Driver' },
      { element: this.audioAlerts, name: 'Audio Alerts' },
      { element: this.inCabinRecordings, name: 'In Cabin Recordings' },
      { element: this.videoTextOverlay, name: 'Video Text Overlay' },
      { element: this.speedUnitsInTextOverlay, name: 'Speed Units in Text Overlay' },
      { element: this.timeFormat, name: 'Time Format' },
      { element: this.liveVideoStreaming, name: 'Live Video Streaming' },
      { element: this.idleMinutesToEnterStandby, name: 'Idle minutes to enter standby' },
      { element: this.activateDriversCamera, name: 'Activate drivers camera' },
      { element: this.recordingEncryption, name: 'Recording Encryption' },
      { element: this.driverIdentification, name: 'Driver Identification' },
      { element: this.visualPrompt, name: 'Visual prompt' },
      { element: this.audioAlert, name: 'Audio Alert' },
      { element: this.driverPromptDurationInSeconds, name: 'Driver Prompt Duration in Seconds' },
    ];

    for (const { element, name } of cameraSettings) {
      await expect(element).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    }
  }

  /**
   * Verify specific camera settings are present (shorthand)
   */
  async verifyCameraSettingsPresent(settingNames: string[]): Promise<void> {
    for (const settingName of settingNames) {
      await expect(
        this.modalContainer.getByText(settingName, { exact: true })
      ).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
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