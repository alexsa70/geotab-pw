import { test, expect, TEST_DEVICES } from '../../fixtures';
import { waitForPageLoad } from '../../utils/wait';
import { TIMEOUTS } from '../../constants/timeouts';
import { VehicleRow } from '../../pages/vehicles/VehicleRow';
import { BulkEditCameraRulesModal, BulkEditCameraSettingsModal } from '@pages/modals';

test.describe('SurfSight Plugin Vehicles Page Bulk Settings', () => {  
  let vehicle: VehicleRow;
  test.beforeEach(async ({vehiclesListPage}) => {
    vehicle = await vehiclesListPage.findVehicleByName(TEST_DEVICES.DEVICE_12.name);
    await waitForPageLoad(vehiclesListPage.page)
});


  test('SOT-6855 | should verify bulk settings on vehicles page @regression', async ({ vehiclesListPage }) => {
    await vehicle.selectCheckbox();
    const bulkEditButtons = [
        vehiclesListPage.bulkEditCameraRulesButton,
        vehiclesListPage.bulkEditCameraSettingsButton,
      ];
    
      for (const button of bulkEditButtons) {
        await expect(button).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
      }
  
      console.log('✅ Testing verify bulk edit buttons on vehicles page: PASSED');
    
  });
  test('should open bulk edit cameras EVENTS modal', async ({ vehiclesListPage }) => {
    const vehicle = await vehiclesListPage.findVehicleByName(TEST_DEVICES.DEVICE_12.name);
    await vehicle.selectCheckbox();
    
    // ✅Checking the functionality of a Events button
    await vehiclesListPage.bulkEditCameraRulesButton.click();
    
    // TODO: проверить что модалка открылась
    const bulkEvents = new BulkEditCameraRulesModal(vehiclesListPage.page);
    await bulkEvents.waitForModal();
    await expect(bulkEvents.modalTitle).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await bulkEvents.verifyAllEventRulesVisible();

    await bulkEvents.close();
    console.log('✅ Testing verify bulk edit cameras EVENTS modal: PASSED');
  });

  test('should open bulk SETTINGS cameras modal', async ({ vehiclesListPage }) => {
    const vehicle = await vehiclesListPage.findVehicleByName(TEST_DEVICES.DEVICE_12.name);
    await vehicle.selectCheckbox();
    
    // ✅Checking the functionality of a Settings button
    await vehiclesListPage.bulkEditCameraSettingsButton.click();
    
    
    const bulkSettings= new BulkEditCameraSettingsModal(vehiclesListPage.page);
    await bulkSettings.waitForModal();   
    await expect(bulkSettings.modalTitle).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await bulkSettings.verifyAllCameraSettingsVisible();
    await bulkSettings.close();
    console.log('✅ Testing verify bulk edit cameras SETTINGS modal: PASSED');
  });

});
