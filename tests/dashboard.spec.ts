import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('MyGeotab Dashboard', () => {
  test('should load dashboard when authenticated', async ({ page }) => {
    const database = process.env.MYGEOTAB_DATABASE?.trim() || undefined;
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(database);

    await expect(page).not.toHaveURL(/\/login/);
    expect(await dashboardPage.isOnDashboard()).toBeTruthy();
  });
});
