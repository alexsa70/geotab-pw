import { test as base, Page } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { VehiclePage } from '../pages/VehiclePage';
import { DevicesPage } from '../pages/DevicesPage';
import { EnvConfig } from '../utils/env';
import { ROUTES, buildUrl } from '../constants/routes';
import { waitForPageLoad } from '../utils/wait';

/**
 * Extended test fixtures with Page Objects
 * Usage: import { test, expect } from './test-fixtures';
 */

type PageFixtures = {
  database: string;
  dashboardPage: DashboardPage;
  loginPage: LoginPage;
  vehiclePage: VehiclePage;
  devicesPage: DevicesPage;
};

export const test = base.extend<PageFixtures>({
  /**
   * Database fixture - provides database name from env
   * Available in all tests automatically
   */
  database: async ({}, use) => {
    const db = EnvConfig.getDatabase();
    await use(db);
  },

  /**
   * Dashboard Page fixture
   * Automatically navigates to dashboard and waits for load
   */
  dashboardPage: async ({ page, database }, use) => {
    const dashboardPage = new DashboardPage(page);
    const url = buildUrl(database, ROUTES.DASHBOARD);
    await dashboardPage.navigate(url);
    await waitForPageLoad(page);
    await use(dashboardPage);
  },

  /**
   * Login Page fixture
   * Just creates instance, doesn't navigate
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  /**
   * Vehicle Page fixture
   * Navigates to vehicles page
   */
  vehiclePage: async ({ page, database }, use) => {
    const vehiclePage = new VehiclePage(page);
    const url = buildUrl(database, ROUTES.PLUGIN.VEHICLES);
    await page.goto(url);
    await waitForPageLoad(page);
    await use(vehiclePage);
  },

  /**
   * Devices Page fixture
   * Navigates to vehicles page (same as vehiclePage for now)
   */
  devicesPage: async ({ page, database }, use) => {
    const devicesPage = new DevicesPage(page);
    const url = buildUrl(database, ROUTES.PLUGIN.VEHICLES);
    await page.goto(url);
    await waitForPageLoad(page);
    await use(devicesPage);
  },
});

// Re-export expect from Playwright
export { expect } from '@playwright/test';