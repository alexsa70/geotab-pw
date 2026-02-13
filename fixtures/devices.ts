/**
 * Test devices fixtures
 * Centralized location for test device data
 */

import type { Device } from '../types/device.types';

/**
 * Test devices available in the test environment
 * Update these values based on your actual test devices
 */
export const TEST_DEVICES = {
  /**
   * Device with firmware 3.12.X
   */
  DEVICE_12: {
    name: 'AlexL - 3.12.X',
    model: '3.12.X',
  },
  
  /**
   * Device with AI14 model
   */
  DEVICE_14: {
    name: 'AlexL-AI14',
    model: 'AI14',
  },
  
  /**
   * Device with firmware 3.11.X
   */
  DEVICE_11: {
    name: 'Alex - 3.11.X',
    model: '3.11.X',
  },
} as const satisfies Record<string, Device>;

/**
 * Default device for tests
 */
export const DEFAULT_TEST_DEVICE = TEST_DEVICES.DEVICE_12;

/**
 * Get device by name
 * @param name - Device name
 * @returns Device or undefined if not found
 */
export function getDeviceByName(name: string): Device | undefined {
  return Object.values(TEST_DEVICES).find(device => device.name === name);
}
