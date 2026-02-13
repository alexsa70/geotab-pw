/**
 * Type definitions for test configuration and utilities
 */

import type { Device } from './device.types';

/**
 * Test configuration
 */
export interface TestConfig {
  database: string;
  baseUrl: string;
  testDevice?: Device;
}

/**
 * Page load state options
 */
export type PageLoadState = 
  | 'load' 
  | 'domcontentloaded' 
  | 'networkidle';

/**
 * Test tags for organizing test runs
 */
export type TestTag = 
  | '@regression'
  | '@smoke'
  | '@critical'
  | '@slow';
