import { test, expect, TEST_DEVICES } from '../../fixtures';
import { waitForPageLoad } from '../../utils/wait';
import { TIMEOUTS } from '../../constants/timeouts';
import { VehicleRow } from '../../pages/vehicles/VehicleRow';

test.describe('Device Page Buttons Verification', () => {
    test.describe.configure({ mode: 'serial' });
    let vehicle: VehicleRow;
    test.beforeEach(async ({vehiclesListPage}) => {
        vehicle = await vehiclesListPage.findVehicleByName(TEST_DEVICES.DEVICE_12.name);
        await waitForPageLoad(vehiclesListPage.page)
    });

    test('should verify button SETTINGS and all sub-buttons for devices @regression', async () => {        
        const settingModal = await vehicle.openSettings();
        await settingModal.verifyAllButtonsVisible();
        await settingModal.close();
       
        console.log('✅ Testing verify button SETTINGS for devices: PASSED');
    });

    test('should verify button CAMERA RULES for devices @regression', async () => {        
        const cameraRulesModal = await vehicle.openCameraRules();
        await cameraRulesModal.waitForModal();
        await cameraRulesModal.close();
        console.log('Testing verify button CAMERA RULES for devices: PASSED');
    });

    test('should verify button Data Usage for devices @regression', async () => {
        const dataUsageModal = await vehicle.openDataUsage();
        await dataUsageModal.waitForModal();
        //await dataUsageModal.close();
        console.log('✅ Testing verify button Data Usage for devices: PASSED');
    });

    test('should verify button Unpair Camera for devices @regression', async () => {
        await expect(vehicle.unpairCameraButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });    
        console.log('✅ Testing verify button Unpair Camera for devices: PASSED');
    });
 

    test('should verify button Live Stream for devices @regression', async () => {        
        await expect(vehicle.liveStreamButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });        
        console.log('✅ Testing verify button Live Stream for devices: PASSED');
    });
   
});