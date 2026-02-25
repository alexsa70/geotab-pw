import { Page, expect } from '@playwright/test';
import { TIMEOUTS } from '../../constants/timeouts';

/**
 * LiveVideoPlayer - represents the WebRTC video player panel
 * that opens on the right side of the page after selecting a live stream camera
 */
export class LiveVideoPlayer {
  constructor(private readonly page: Page) {}

  /**
   * The "WebRTC" label visible in the player panel footer
   * Uses the specific surf-player-type-label class to avoid matching
   * the "WebRTC" option inside the player's settings dropdown
   */
  get webRtcLabel() {
    return this.page.locator('span.surf-player-type-label');
  }

  /**
   * Wait until the video player panel becomes visible
   */
  async waitForPlayerVisible(timeout: number = TIMEOUTS.VERY_LONG): Promise<void> {
    await expect(this.webRtcLabel).toBeVisible({ timeout });
  }

  /**
   * Verify the WebRTC label is visible (player is open and streaming)
   */
  async verifyWebRtcLabel(): Promise<void> {
    await expect(this.webRtcLabel).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
  }
}
