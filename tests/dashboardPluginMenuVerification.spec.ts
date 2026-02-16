// Import from fixtures/test-fixtures.ts
import { test, expect } from '../fixtures';
import { waitForPageLoad, clickAndWait ,safeClick} from '../utils/wait';
import { TIMEOUTS } from '../constants/timeouts';

test.describe('Dashboard Tests - Fixtures from fixtures folder', () => {
  test.describe.configure({ mode: 'serial' });
  
  test('SOT-6851 | should verify all buttons on the dashboard page(SurfSight Plugin) @regression', 
    async ({ dashboardPage }) => {
  
      await expect(dashboardPage.page).not.toHaveURL(/\/login/);
      expect(await dashboardPage.isOnDashboard()).toBeTruthy();
      await waitForPageLoad(dashboardPage.page, 'domcontentloaded');
  
      const menuAddIns = dashboardPage.getMenuItemButton();
      await clickAndWait(menuAddIns, TIMEOUTS.LONG)

      // Verify all sub-menu items are visible and clicable
      const linkVehicle = dashboardPage.getVehiclesButton()
      await expect(linkVehicle).toBeVisible()
      await clickAndWait(linkVehicle)
      await expect(dashboardPage.page).toHaveURL(/#addin-surfsight_staging-vehicles/i);

      const linkEvents = dashboardPage.getEventsButton()
      await expect(linkEvents).toBeVisible()
      await clickAndWait(linkEvents)
      await expect(dashboardPage.page).toHaveURL(/#addin-surfsight_staging-vehicleEvents/i);


      const linkRecordings = dashboardPage.getRecordingsButton()
      await expect(linkRecordings).toBeVisible()
      await clickAndWait(linkRecordings)
      await expect(dashboardPage.page).toHaveURL(/#addin-surfsight_staging-recordings/i);

      const linkRules = dashboardPage.getVideoRulesButton()
      await expect(linkRules).toBeVisible()
      await clickAndWait(linkRules)
      await expect(dashboardPage.page).toHaveURL(/#addin-surfsight_staging-videoRules/i);
    
     console.log('Testing verify menu buttons: PASSED');
    });
});
