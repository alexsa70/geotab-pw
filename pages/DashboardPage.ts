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

  /**
   * Get MENUITEM Button
   */
  getMenuItemButton() {
    return this.page.getByRole('menuitem', { name: 'Add-Ins', exact: true });
  }

  /**
   * Get Vehicles Button
   */
  getVehiclesButton() {
    return this.page.getByRole('menuitem', { name: 'Vehicles', exact: true });
  }

  /**
   * Get Video Events  Button
   */
  getEventsButton() {
    return this.page.getByRole('menuitem', { name: 'Video Events', exact: true });
  }

  /**
   * Get Recordings Button
   */
  getRecordingsButton() {
    return this.page.getByRole('menuitem', { name: 'Recordings', exact: true });
  }

  /**
   * Get Settings Button
   */
  getVideoRulesButton() {
    return this.page.getByRole('menuitem', { name: 'Video Rules', exact: true });
  }
}
