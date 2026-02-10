import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * DashboardPage - Page Object for MyGeotab dashboard (post-login)
 * Base page for tests that require authentication
 */
export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to dashboard / home
   * @param database - optional; when set (e.g. surftesting_ordernow), navigates to /{database}/ to stay in auth context
   */
  async goto(database?: string): Promise<void> {
    const path = database ? `/${database}/` : '/';
    await this.navigate(path);
  }

  /**
   * Check if user is on dashboard (not login page)
   */
  async isOnDashboard(): Promise<boolean> {
    const url = this.getCurrentURL();
    return !url.includes('/login');
  }

  /**
   * Get main content area locator (adjust selector based on actual MyGeotab structure)
   */
  getMainContent() {
    return this.page.locator('main, [role="main"], .dashboard, #content').first();
  }
}
