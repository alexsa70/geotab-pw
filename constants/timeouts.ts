/**
 * Timeout constants for consistent wait times across the project
 * All values are in milliseconds
 */

export const TIMEOUTS = {
  // Short timeouts
  VERY_SHORT: 2000,   // 2 seconds - for quick checks
  SHORT: 5000,        // 5 seconds - default expect timeout
  
  // Medium timeouts
  MEDIUM: 10000,      // 10 seconds - for navigation and actions
  LONG: 15000,        // 15 seconds - for page loads
  
  // Long timeouts
  VERY_LONG: 30000,   // 30 seconds - for complex operations
  AUTH: 60000,        // 60 seconds - for authentication flows
  
  // Extra long
  EXTREME: 90000,     // 90 seconds - for setup operations
} as const;

/**
 * Default timeouts for different operations
 */
export const DEFAULT_TIMEOUTS = {
  visibility: TIMEOUTS.SHORT,
  navigation: TIMEOUTS.LONG,
  action: TIMEOUTS.MEDIUM,
  pageLoad: TIMEOUTS.LONG,
  modalOpen: TIMEOUTS.MEDIUM,
} as const;
