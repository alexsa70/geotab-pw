/**
 * Fixtures exports
 * 
 * Contains both:
 * - Test data fixtures (devices, users, etc.)
 * - Playwright test fixtures (Page Objects)
 */

// Test data fixtures
export * from './devices';

// Playwright fixtures - for test imports
// Usage in tests: import { test, expect } from '../fixtures/test-fixtures';
export { test, expect } from './test-fixutures';
