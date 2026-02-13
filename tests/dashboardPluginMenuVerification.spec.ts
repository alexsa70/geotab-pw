// Import from fixtures/test-fixtures.ts
import { test, expect } from '../fixtures';
import { waitForPageLoad } from '../utils/wait';
import { TIMEOUTS } from '../constants/timeouts';

test.describe('Dashboard Tests - Fixtures from fixtures folder', () => {
  test('SOT-6850 | should load dashboard @regression', 
    async ({ page, dashboardPage }) => {
    // dashboardPage is ready to use
    await expect(page).not.toHaveURL(/\/login/);
    expect(await dashboardPage.isOnDashboard()).toBeTruthy();
    console.log('Testing load dashboard: PASSED');
  });

  test('SOT-6851 | should verify buttons @regression', 
    async ({ page, dashboardPage }) => {
    await waitForPageLoad(page, 'networkidle');
    // Verify and click Add-Ins menu
    const menuItemButton = dashboardPage.getMenuItemButton();
    await expect(menuItemButton).toBeVisible({ 
      timeout: TIMEOUTS.MEDIUM 
    });
    await menuItemButton.click();
    
    await waitForPageLoad(page, 'networkidle');
    // Verify all sub-menu items are visible
    const menuItems = [
      dashboardPage.getVehiclesButton(),
      dashboardPage.getEventsButton(),
      dashboardPage.getRecordingsButton(),
      dashboardPage.getVideoRulesButton()
    ]
    for (const item of menuItems){
      await expect(item).toBeVisible();
    }
    console.log('Testing verify menu buttons: PASSED');
  });
  
});