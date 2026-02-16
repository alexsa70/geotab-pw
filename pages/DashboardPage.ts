import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { TIMEOUTS } from '../constants/timeouts';

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
   * Get Add-Ins menuitem button
   */
  getMenuItemButton() {
    return this.page.getByRole('menuitem', { name: 'Add-Ins'});
  }

  /**
   * Get Vehicles menuitem
   */
  getVehiclesButton() {
    return this.page.getByRole('menuitem', { name: 'Vehicles' });
  }

  /**
   * Get Video Events menuitem
   */
  getEventsButton() {
    return this.page.getByRole('menuitem', { name: 'Video Events' });
  }

  /**
   * Get Recordings menuitem
   */
  getRecordingsButton() {
    return this.page.getByRole('menuitem', { name: 'Recordings',  exact: true  });
  }

  /**
   * Get Video Rules menuitem
   */
  getVideoRulesButton() {
    return this.page.getByRole('menuitem', { name: 'Video Rules', exact: true });
  }

  // ==========================================
  // Actions
  // ==========================================

  /**
   * Open Add-Ins menu and wait for it to expand
   * This is the RELIABLE way to open the menu
   */
  async openAddInsMenu(): Promise<void> {
    const menuButton = this.getMenuItemButton();
    
    // Click and wait for menu to be visible
    await expect(menuButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await menuButton.click();
    
    // Wait for menu to expand - check that first item is visible
    await expect(this.getVehiclesButton()).toBeVisible({ 
      timeout: TIMEOUTS.LONG 
    });
  }

  /**
   * Verify all Add-Ins menu items are visible
   */
  async verifyAllAddInsMenuItems(): Promise<void> {
    const menuItems = [
      this.getVehiclesButton(),
      this.getEventsButton(),
      this.getRecordingsButton(),
      this.getVideoRulesButton()
    ];
    
    for (const item of menuItems) {
      await expect(item).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    }
  }

  /**
   * Navigate to Vehicles page via menu
   */
  async navigateToVehicles(): Promise<void> {
    await this.openAddInsMenu();
    await this.getVehiclesButton().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Navigate to Events page via menu
   */
  async navigateToEvents(): Promise<void> {
    await this.openAddInsMenu();
    await this.getEventsButton().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Navigate to Recordings page via menu
   */
  async navigateToRecordings(): Promise<void> {
    await this.openAddInsMenu();
    await this.getRecordingsButton().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Navigate to Video Rules page via menu
   */
  async navigateToVideoRules(): Promise<void> {
    await this.openAddInsMenu();
    await this.getVideoRulesButton().click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}