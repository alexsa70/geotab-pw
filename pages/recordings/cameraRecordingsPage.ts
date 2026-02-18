import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { TIMEOUTS } from '../../constants/timeouts';

/**
 * CameraRecordingsPage - Page Object for Camera Recordings Timeline
 * Shows timeline with recordings for a specific camera
 * URL: #addin-surfsight_staging-recordings
 */
export class CameraRecordingsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ==========================================
  // Page elements
  // ==========================================

  get pageTitle() {
    return this.page.locator('div').filter({ hasText: /Timeline - .* - / }).nth(3);
  }

  // ==========================================
  // Filter controls
  // ==========================================

  get dateLabel() {
    return this.page.getByText('Date', { exact: true });
  }

  get dateInput() {
    return this.page.getByRole('textbox', { name: 'C', exact: true });
  }

  get cameraLabel() {
    return this.page.getByText('Camera', { exact: true });
  }

  get cameraDropdown() {
    return this.page.getByRole('combobox', { name: /Front Camera|Rear Camera/ });
  }

  get frontCameraOption() {
    return this.page.getByRole('option', { name: 'Front Camera' });
  }

  get rearCameraOption() {
    return this.page.getByRole('option', { name: 'Rear Camera' });
  }

  get timezoneLabel() {
    return this.page.getByText('Timezone');
  }

  get timezoneDropdown() {
    return this.page.getByRole('combobox', { name: /GMT/ });
  }

  get qualityDropdown() {
    return this.page.getByRole('combobox', { name: /Normal Quality|High Quality/ });
  }

  get normalQualityOption() {
    return this.page.getByRole('option', { name: 'Normal Quality' });
  }

  get highQualityOption() {
    return this.page.getByRole('option', { name: 'High Quality' });
  }

  // ==========================================
  // Timeline & Player
  // ==========================================

  get timelineSlider() {
    return this.page.getByRole('slider');
  }

  get playButton() {
    return this.page.getByRole('button', { name: 'Play' });
  }

  get downloadButton() {
    return this.page.getByRole('button', { name: 'Download' });
  }

  // ==========================================
  // Download Modal elements
  // ==========================================

  get downloadModalContainer() {
    return this.page.locator('div').filter({ hasText: /Camera:.*Date:/ }).nth(3);
  }

  get downloadCameraInfo() {
    return this.downloadModalContainer.filter({ hasText: /Camera:Front Camera|Camera:Rear Camera/ });
  }

  get downloadDateInfo() {
    return this.downloadModalContainer.filter({ hasText: /Date:/ });
  }

  get downloadTimeInput() {
    return this.page.getByRole('textbox').filter({ hasText: /^$/ });
  }

  get downloadTimeIcon() {
    return this.page.locator('.fas');
  }

  get incrementHoursLink() {
    return this.page.getByRole('link', { name: ' Increment Hours' });
  }

  get incrementMinutesLink() {
    return this.page.getByRole('link', { name: ' Increment Minutes' });
  }

  get incrementSecondsButton() {
    return this.page.getByTitle('Increment Second');
  }

  get pickHourButton() {
    return this.page.getByTitle('Pick Hour');
  }

  get downloadQualityDropdown() {
    return this.page.getByRole('textbox', { name: /Normal Quality|High Quality/ });
  }

  get downloadNormalQualityOption() {
    return this.page.getByRole('option', { name: 'Normal Quality' });
  }

  get downloadHighQualityOption() {
    return this.page.getByRole('option', { name: 'High Quality' });
  }

  get secondsBeforeLabel() {
    return this.page.getByText('Seconds Before');
  }

  get secondsBeforeInput() {
    return this.page.getByRole('textbox', { name: '0' }).first();
  }

  get secondsAfterLabel() {
    return this.page.getByText('Seconds After');
  }

  get secondsAfterInput() {
    return this.page.getByRole('textbox', { name: '10' });
  }

  get prepareDownloadButton() {
    return this.page.getByRole('button', { name: 'Prepare Download' });
  }

  get downloadNowLink() {
    //return this.page.getByRole('link', { name: ' Download Now ' });
    return this.page.locator('#recording-file-link');
  }

  get downloadCancelButton() {
    return this.page.getByRole('button', { name: 'Cancel' });
  }

  // ==========================================
  // Actions - Page controls
  // ==========================================

  /**
   * Wait for page to load
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.playButton).toBeVisible({ timeout: TIMEOUTS.VERY_LONG });
  }

  /**
   * Select date from calendar
   * @param day - Day number (e.g., 17)
   */
  async selectDate(day: number): Promise<void> {
    await this.dateInput.click();
    await this.page.getByRole('cell', { name: `◥ ${day}` }).click();
  }

  /**
   * Switch to Front Camera
   */
  async selectFrontCamera(): Promise<void> {
    await this.cameraDropdown.click();
    await this.frontCameraOption.click();
  }

  /**
   * Switch to Rear Camera
   */
  async selectRearCamera(): Promise<void> {
    await this.cameraDropdown.click();
    await this.rearCameraOption.click();
  }

  /**
   * Select Normal Quality
   */
  async selectNormalQuality(): Promise<void> {
    await this.qualityDropdown.click();
    await this.normalQualityOption.click();
  }

  /**
   * Select High Quality
   */
  async selectHighQuality(): Promise<void> {
    await this.qualityDropdown.click();
    await this.highQualityOption.click();
  }

  /**
   * Click Play button
   */
  async clickPlay(): Promise<void> {
    await expect(this.playButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await this.playButton.click();
  }

  /**
   * Click Download button (opens modal)
   */
  async clickDownload(): Promise<void> {
    await expect(this.downloadButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await this.downloadButton.click();
    // Wait for modal to appear
    await expect(this.prepareDownloadButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
  }

  // ==========================================
  // Actions - Download Modal
  // ==========================================

  /**
   * Wait for download modal to be visible
   */
  async waitForDownloadModal(): Promise<void> {
    await expect(this.prepareDownloadButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
  }

  /**
   * Select download quality in modal
   * @param quality - 'normal' or 'high'
   */
  async selectDownloadQuality(quality: 'normal' | 'high'): Promise<void> {
    await this.downloadQualityDropdown.click();
    if (quality === 'normal') {
      await this.downloadNormalQualityOption.click();
    } else {
      await this.downloadHighQualityOption.click();
    }
  }

  /**
   * Set Seconds Before value
   * @param seconds - Number (0, 5, 10, etc.)
   */
  async setSecondsBefore(seconds: number): Promise<void> {
    await this.secondsBeforeInput.click();
    await this.page.getByRole('option', { name: seconds.toString(), exact: true }).click();
  }

  /**
   * Set Seconds After value
   * @param seconds - Number (5, 10, 15, etc.)
   */
  async setSecondsAfter(seconds: number): Promise<void> {
    await this.secondsAfterInput.click();
    await this.page.getByRole('option', { name: seconds.toString(), exact: true }).click();
  }

//   /**
//    * Click Prepare Download and wait for Download Now link
//    */
//   async prepareDownload(): Promise<void> {
//     await this.prepareDownloadButton.click();
//     // Wait for "Download Now" link to appear
//     await expect(this.downloadNowLink).toBeVisible({ timeout: TIMEOUTS.VERY_LONG });
//   }

/**
 * Click Prepare Download and wait for Download Now link
 * @param timeout - Max wait time in ms (default 90 seconds)
 */
async prepareDownload(timeout: number = 90000): Promise<void> {
  console.log('🔍 Clicking Prepare Download...');
  await this.prepareDownloadButton.click();
  
  // Verify button becomes disabled (upload started)
  // await expect(this.prepareDownloadButton).toBeDisabled({ 
  //   timeout: TIMEOUTS.SHORT 
  // });
  this.page.on('console', msg => console.log(msg.text()));
  this.page.on('requestfailed', req => console.log('FAILED', req.url()));
  await this.page.waitForTimeout(1000);
  
  console.log(`⏳ Waiting for camera upload (up to ${timeout/1000} seconds)...`);
  
  // Wait for Download Now link (camera upload completes)
  await expect(this.downloadNowLink).toBeVisible({ timeout });
  
  console.log('✅ Upload complete, ready to download');
}

  /**
   * Click Download Now link and wait for download to start
   */
  async downloadNow(): Promise<void> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadNowLink.click();
    const download = await downloadPromise;
    console.log(`✅ Download started: ${await download.suggestedFilename()}`);
  }

  /**
   * Close download modal
   */
  async closeDownloadModal(): Promise<void> {
    await this.downloadCancelButton.click();
    await expect(this.prepareDownloadButton).toBeHidden({ timeout: TIMEOUTS.SHORT });
  }

  /**
   * Increment time controls in download modal
   */
  async incrementHours(): Promise<void> {
    await this.incrementHoursLink.click();
  }

  async incrementMinutes(): Promise<void> {
    await this.incrementMinutesLink.click();
  }

  async incrementSeconds(): Promise<void> {
    await this.incrementSecondsButton.click();
  }

  /**
   * Select specific hour
   * @param hour - Hour number (01-12 or 00-23 depending on format)
   */
  async selectHour(hour: string): Promise<void> {
    await this.pickHourButton.click();
    await this.page.getByRole('cell', { name: hour }).click();
  }

  // ==========================================
  // Verification methods
  // ==========================================

  /**
   * Verify all main controls are visible
   */
  async verifyAllControlsVisible(): Promise<void> {
    const controls = [
      { element: this.dateLabel, name: 'Date' },
      { element: this.cameraLabel, name: 'Camera' },
      { element: this.timezoneLabel, name: 'Timezone' },
      { element: this.qualityDropdown, name: 'Quality' },
      { element: this.playButton, name: 'Play' },
      { element: this.downloadButton, name: 'Download' },
    ];

    for (const { element, name } of controls) {
      await expect(element).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    }
  }

  /**
   * Verify download modal controls are visible
   */
  async verifyDownloadModalControls(): Promise<void> {
    const controls = [
      { element: this.downloadQualityDropdown, name: 'Download Quality' },
      { element: this.secondsBeforeLabel, name: 'Seconds Before' },
      { element: this.secondsAfterLabel, name: 'Seconds After' },
      { element: this.prepareDownloadButton, name: 'Prepare Download' },
      { element: this.downloadCancelButton, name: 'Cancel' },
    ];

    for (const { element, name } of controls) {
      await expect(element).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    }
  }

  // ==========================================
  // Recording availability checks
  // ==========================================

  /**
   * Check if timeline has recordings for current date
   * @returns true if recordings exist, false if "No Timeline" message shown
   */
  async hasRecordings(): Promise<boolean> {
    const noTimelineMessage = this.page.getByText('No Timeline for selected date and camera');
    
    try {
      await noTimelineMessage.waitFor({ state: 'visible', timeout: 2000 });
      return false;  // Message visible = no recordings
    } catch {
      return true;   // Message not visible = has recordings
    }
  }

  /**
   * Check if Download button is enabled
   * @returns true if enabled, false if disabled
   */
  async isDownloadEnabled(): Promise<boolean> {
    const isDisabled = await this.downloadButton.getAttribute('disabled');
    return isDisabled === null;  // null = enabled, 'disabled' = disabled
  }

  /**
   * Select a date with available recordings
   * Tries yesterday first, then goes back day by day up to 7 days
   * @returns true if date with recordings found, false otherwise
   */
  async selectDateWithRecordings(): Promise<boolean> {
    const today = new Date();
    
    // Try up to 7 days back
    for (let daysBack = 1; daysBack <= 7; daysBack++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() - daysBack);
      const day = targetDate.getDate();
      
      console.log(`🔍 Trying date: ${day} (${daysBack} days back)...`);
      
      // Select date
      await this.selectDate(day);
      await this.page.waitForTimeout(2000);  // Wait for timeline to load
      
      // Check if has recordings
      if (await this.hasRecordings()) {
        console.log(`✅ Found recordings on day ${day}`);
        return true;
      }
    }
    
    console.log('❌ No recordings found in last 7 days');
    return false;
  }

  /**
   * Ensure page has recordings before continuing tests
   * If no recordings for today, automatically searches previous days (up to 7 days back)
   * @throws Error if no recordings found in last 7 days
   */
  async ensureHasRecordings(): Promise<void> {
    // Check if current date has recordings
    if (await this.hasRecordings()) {
      console.log('✅ Timeline has recordings for current date');
      return;
    }
    
    console.log('⚠️ No recordings for today, searching other dates...');
    const found = await this.selectDateWithRecordings();
    
    if (!found) {
      throw new Error('No recordings found in last 7 days - cannot run download tests');
    }
  }
}