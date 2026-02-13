/**
 * Application routes and paths
 * Centralized location for all URL paths used in the application
 */

export const ROUTES = {
  // Authentication
  LOGIN: '/login',
  
  // Main pages
  DASHBOARD: '#dashboard',
  
  // SurfSight Plugin routes
  PLUGIN: {
    BASE: '#addin-surfsight_staging',
    VEHICLES: '#addin-surfsight_staging-vehicles',
    EVENTS: '#addin-surfsight_staging-events',
    RECORDINGS: '#addin-surfsight_staging-recordings',
    VIDEO_RULES: '#addin-surfsight_staging-video-rules',
  },
} as const;

/**
 * Build full URL with database prefix
 * @param database - Database name (e.g., 'surftesting_ordernow')
 * @param path - Route path from ROUTES constant
 * @returns Full URL path
 * 
 * @example
 * buildUrl('surftesting_ordernow', ROUTES.DASHBOARD)
 * // Returns: '/surftesting_ordernow/#dashboard'
 * 
 * buildUrl('surftesting_ordernow', ROUTES.PLUGIN.VEHICLES)
 * // Returns: '/surftesting_ordernow/#addin-surfsight_staging-vehicles'
 */
export function buildUrl(database: string, path: string): string {
  return `/${database}/${path}`;
}

/**
 * Build login URL with database
 * @param database - Database name
 * @returns Login URL path
 * 
 * @example
 * buildLoginUrl('surftesting_ordernow')
 * // Returns: '/surftesting_ordernow/login.html'
 */
export function buildLoginUrl(database: string): string {
  return `/${database}/login.html`;
}
