import { test, expect, TEST_DEVICES } from '../../fixtures';
import { waitForPageLoad } from '../../utils/wait';
import { TIMEOUTS } from '../../constants/timeouts';
import { VehicleRow } from '../../pages/vehicles/VehicleRow';
import { DashboardPage } from '../../pages/DashboardPage';

test.describe('SurfSight Plugin Vehicles Page Verification', () => {
  
  let vehicle: VehicleRow;

  test('SOT-6852 | should load dashboard when authenticated @regression', async ({ page, dashboardPage }) => {
    await expect(page).not.toHaveURL(/\/login/);    
    expect(await dashboardPage.isOnDashboard()).toBeTruthy();
    await expect(page).toHaveURL(/dashboard/);
    
  });

  test('SOT-6853 | should verify TOOLBAR buttons on vehicles page @regression', async ({  vehiclesListPage }) => {
   
    const toolbarButtons = [
      vehiclesListPage.addCameraButton,
      vehiclesListPage.bulkAddCamerasButton,
      vehiclesListPage.updateSettingsButton,
      vehiclesListPage.userAccessButton,
      vehiclesListPage.wifiButton,
      vehiclesListPage.alarmsReportButton,
      vehiclesListPage.healthButton,
    ];

    for (const button of toolbarButtons) {
      await expect(button).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    }
    const bulkEditButtons = [
      vehiclesListPage.bulkEditCameraRulesButton,
      vehiclesListPage.bulkEditCameraSettingsButton,
    ];    
    for (const button of bulkEditButtons) {
      await expect(button).toBeHidden({ timeout: TIMEOUTS.MEDIUM });
    }

    console.log('✅ Testing verify toolbar buttons on vehicles page: PASSED');
  });
  
});

