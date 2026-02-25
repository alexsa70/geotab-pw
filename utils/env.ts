/**
 * Environment configuration utility
 * Centralized access to environment variables with validation
 */

export interface Credentials {
  username: string;
  password: string;
}

export class EnvConfig {
  /**
   * Get database name from environment
   * @throws Error if MYGEOTAB_DATABASE is not set
   * @returns Database name
   */
  static getDatabase(): string {
    const database = process.env.MYGEOTAB_DATABASE?.trim();
    
    if (!database) {
      throw new Error(
        'MYGEOTAB_DATABASE is not set in .env file. ' +
        'Please set it to your database name (e.g., surftesting_ordernow)'
      );
    }
    
    return database;
  }

  /**
   * Get user credentials from environment
   * @throws Error if MYGEOTAB_USER or MYGEOTAB_PASSWORD are not set
   * @returns Credentials object with username and password
   */
  static getCredentials(): Credentials {
    const username = process.env.MYGEOTAB_USER?.trim();
    const password = process.env.MYGEOTAB_PASSWORD?.trim();
    
    if (!username || !password) {
      throw new Error(
        'MYGEOTAB_USER and MYGEOTAB_PASSWORD must be set in .env file. ' +
        'Please check your .env configuration.'
      );
    }
    
    return { username, password };
  }

  /**
   * Get base URL from environment or use default
   * @returns Base URL
   */
  static getBaseUrl(): string {
    return process.env.BASE_URL?.trim() || 'https://my.geotab.com';
  }

  /**
   * Check if running in CI environment
   * @returns true if running in CI
   */
  static isCI(): boolean {
    return !!process.env.CI;
  }

  /**
   * Get timeout value from environment or use default
   * @param defaultTimeout - Default timeout in milliseconds
   * @returns Timeout value
   */
  static getTimeout(defaultTimeout: number = 30000): number {
    const timeout = process.env.TIMEOUT;
    return timeout ? parseInt(timeout, 10) : defaultTimeout;
  }

  /**
   * Get Surfsight API base URL from environment
   * @returns API base URL (defaults to stage2)
   */
  static getSurfsightApiUrl(): string {
    return process.env.SURFSIGHT_API_URL?.trim() || 'https://api.stage2.surfsight.net';
  }

  /**
   * Get super admin email for Surfsight API authentication
   * @throws Error if SURFSIGHT_ADMIN_EMAIL is not set
   */
  static getSuperAdminEmail(): string {
    const email = process.env.SURFSIGHT_ADMIN_EMAIL?.trim();
    if (!email) {
      throw new Error('SURFSIGHT_ADMIN_EMAIL is not set in .env file.');
    }
    return email;
  }

  /**
   * Get super admin password for Surfsight API authentication
   * @throws Error if SURFSIGHT_ADMIN_PASSWORD is not set
   */
  static getSuperAdminPassword(): string {
    const password = process.env.SURFSIGHT_ADMIN_PASSWORD?.trim();
    if (!password) {
      throw new Error('SURFSIGHT_ADMIN_PASSWORD is not set in .env file.');
    }
    return password;
  }

  /**
   * Validate all required environment variables
   * @throws Error if any required variable is missing
   */
  static validate(): void {
    this.getDatabase();
    this.getCredentials();
    // Add more validations as needed
  }
}
