import { test as base, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { VehiclesListPage } from '../pages/vehicles/VehiclesListPage';
import { EventsListPage } from '../pages/events/EventsListPage';
import { RecordingsListPage } from '../pages/recordings/RecordingsListPage';
import { VideoRulesListPage } from '../pages/video-rules/VideoRulesListPage';
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
  eventsListPage: EventsListPage;
  recordingsListPage: RecordingsListPage;
  videoRulesListPage: VideoRulesListPage;
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
    await expect(page).not.toHaveURL(/\/login/, { timeout: 5000 });
    await page.waitForLoadState('domcontentloaded');
    
    const firstRow = page.getByRole('row').first();
    await firstRow.waitFor({ state: 'visible', timeout: 30000 });
    
    await use(vehiclesListPage);
  },

  /**
   * Events List Page fixture
   * Navigates to events page and waits for list to load
   */
  eventsListPage: async ({ page, database }, use) => {
    const eventsListPage = new EventsListPage(page);
    const url = buildUrl(database, ROUTES.PLUGIN.EVENTS);
    
    await page.goto(url);
    await page.waitForLoadState('domcontentloaded');
    
    const firstRow = page.getByRole('row').first();
    await firstRow.waitFor({ state: 'visible', timeout: 30000 });
    
    await use(eventsListPage);
  },

  /**
   * Recordings List Page fixture
   * Navigates to recordings page and waits for list to load
   */
  recordingsListPage: async ({ page, database }, use) => {
    const recordingsListPage = new RecordingsListPage(page);
    const url = buildUrl(database, ROUTES.PLUGIN.RECORDINGS);
    
    await page.goto(url);
    await page.waitForLoadState('domcontentloaded');
    
    const firstRow = page.getByRole('row').first();
    await firstRow.waitFor({ state: 'visible', timeout: 30000 });
    
    await use(recordingsListPage);
  },

  /**
   * Video Rules List Page fixture
   * Navigates to video rules page and waits for page to load
   */
  videoRulesListPage: async ({ page, database }, use) => {
    const videoRulesListPage = new VideoRulesListPage(page);
    const url = buildUrl(database, ROUTES.PLUGIN.VIDEO_RULES);
    
    await page.goto(url);
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for page title to be visible
    await videoRulesListPage.pageTitle.waitFor({ state: 'visible', timeout: 30000 });
    
    await use(videoRulesListPage);
  },
});

export { expect } from '@playwright/test';
