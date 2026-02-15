// Import from fixtures/test-fixtures.ts
import { test, expect } from '../fixtures';
import { waitForPageLoad } from '../utils/wait';
import { TIMEOUTS } from '../constants/timeouts';

test.describe('Dashboard Tests - Fixtures from fixtures folder', () => {
  test.describe.configure({ mode: 'serial' });
  
  test('SOT-6851 | should verify buttons @regression', 
    async ({ page, dashboardPage }) => {
  
      await expect(page).not.toHaveURL(/\/login/);
      expect(await dashboardPage.isOnDashboard()).toBeTruthy();
      await waitForPageLoad(page, 'domcontentloaded');
  
      // Verify and click Add-Ins menu
      const menuItemButton = dashboardPage.getMenuItemButton();
      await expect(menuItemButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
      await menuItemButton.click();
      
      // Add a delay for opening the menu
      await page.waitForTimeout(3000);
  
      // Verify all sub-menu items are visible
      const menuItems = [
        dashboardPage.getVehiclesButton(),
        dashboardPage.getEventsButton(),
        dashboardPage.getRecordingsButton(),
        dashboardPage.getVideoRulesButton()
      ];
      
      for (const item of menuItems){
        await expect(item).toBeVisible({ timeout: TIMEOUTS.LONG });  // ← Увеличить timeout
      }
      console.log('Testing verify menu buttons: PASSED');
    });
});
