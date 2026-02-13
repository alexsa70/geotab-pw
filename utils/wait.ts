/**
 * Wait utilities for common waiting patterns
 */

import type { Page, Locator } from '@playwright/test';
import type { PageLoadState } from '../types/test.types';
import { DEFAULT_TIMEOUTS } from '../constants/timeouts';

/**
 * Wait for page to be fully loaded
 * @param page - Playwright page object
 * @param state - Load state to wait for
 * @param timeout - Optional timeout in milliseconds
 */
export async function waitForPageLoad(
  page: Page, 
  state: PageLoadState = 'networkidle',
  timeout?: number
): Promise<void> {
  await page.waitForLoadState(state, { timeout: timeout || DEFAULT_TIMEOUTS.pageLoad });
}

/**
 * Wait for element to be visible with custom timeout
 * @param locator - Playwright locator
 * @param timeout - Optional timeout in milliseconds
 */
export async function waitForVisible(
  locator: Locator, 
  timeout?: number
): Promise<void> {
  await locator.waitFor({ 
    state: 'visible', 
    timeout: timeout || DEFAULT_TIMEOUTS.visibility 
  });
}

/**
 * Wait for element to be hidden
 * @param locator - Playwright locator
 * @param timeout - Optional timeout in milliseconds
 */
export async function waitForHidden(
  locator: Locator,
  timeout?: number
): Promise<void> {
  await locator.waitFor({ 
    state: 'hidden', 
    timeout: timeout || DEFAULT_TIMEOUTS.visibility 
  });
}

/**
 * Check if element is visible without throwing error
 * @param locator - Playwright locator
 * @param timeout - Optional timeout in milliseconds
 * @returns true if visible, false otherwise
 */
export async function isVisible(
  locator: Locator,
  timeout?: number
): Promise<boolean> {
  try {
    await waitForVisible(locator, timeout);
    return true;
  } catch {
    return false;
  }
}

/**
 * Wait for multiple elements to be visible
 * @param locators - Array of Playwright locators
 * @param timeout - Optional timeout in milliseconds
 */
export async function waitForMultipleVisible(
  locators: Locator[],
  timeout?: number
): Promise<void> {
  await Promise.all(
    locators.map(locator => waitForVisible(locator, timeout))
  );
}
