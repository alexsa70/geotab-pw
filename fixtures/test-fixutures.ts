import { test as base } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { VehiclesListPage } from '../pages/vehicles/VehiclesListPage';
import { EnvConfig } from '../utils/env';
import { ROUTES, buildUrl } from '../constants/routes';

/**
 * Extended test fixtures with Page Objects
 * Location: fixtures/test-fixtures.ts
 * Usage: import { test, expect } from '../fixtures';
 */

type PageFixtures = {
  database: string;
  dashboardPage: DashboardPage;
  loginPage: LoginPage;
  vehiclesListPage: VehiclesListPage;
};

export const test = base.extend<PageFixtures>({
  /**
   * Database fixture - provides database name from env
   */
  database: async ({}, use) => {
    const db = EnvConfig.getDatabase();
    await use(db);
  },

  /**
   * Dashboard Page fixture
   */
  dashboardPage: async ({ page, database }, use) => {
    const dashboardPage = new DashboardPage(page);
    const url = buildUrl(database, ROUTES.DASHBOARD);
    await dashboardPage.navigate(url);
    await page.waitForLoadState('domcontentloaded');
    await use(dashboardPage);
  },

  /**
   * Login Page fixture
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  /**
   * Vehicles List Page fixture
   * Navigates to vehicles page and waits for list to load
   */
  vehiclesListPage: async ({ page, database }, use) => {
    const vehiclesListPage = new VehiclesListPage(page);
    const url = buildUrl(database, ROUTES.PLUGIN.VEHICLES);
    
    await page.goto(url);
    
    // Ждём DOM load (быстрее чем networkidle)
    await page.waitForLoadState('domcontentloaded');
    
    // Ждём появления первой строки (означает что список загрузился)
    const firstRow = page.getByRole('row').first();
    await firstRow.waitFor({ state: 'visible', timeout: 30000 });
    
    await use(vehiclesListPage);
  },
});

export { expect } from '@playwright/test';