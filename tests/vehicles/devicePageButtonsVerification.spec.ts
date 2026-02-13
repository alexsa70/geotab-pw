import { test, expect } from '../../fixtures';
import { TEST_DEVICES } from '../../fixtures';
import { waitForPageLoad } from '../../utils/wait';
import { TIMEOUTS } from '../../constants/timeouts';

test.describe('Device Page Buttons Verification', () => {
    test.describe.configure({ mode: 'serial' });
    test.beforeEach(async ({vehiclePage, devicesPage}) => {
        await devicesPage.getDevice12();
        await waitForPageLoad(vehiclePage.page)
    });

    test('should verify button SETTINGS and all sub-buttons for devices @regression', async ({  vehiclePage, devicesPage }) => {
                      
        await expect(vehiclePage.buttonSettings).toBeVisible();
        await vehiclePage.buttonSettings.click();

        const buttons = [
            devicesPage.buttonCalibrate,
            devicesPage.buttonFormatSD,
            devicesPage.buttonReboot, 
            devicesPage.buttonInfo];

       for (const btn of buttons) {
            await expect(btn).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
        }
        await vehiclePage.getCancelButton().click();
        console.log('Testing verify button SETTINGS for devices: PASSED');
    });
    test('should verify button CAMERA RULES for devices @regression', async ({ vehiclePage }) => {
        
        //await waitForPageLoad(vehiclePage.page);
        await expect(vehiclePage.buttonCameraRules).toBeVisible();
        await vehiclePage.buttonCameraRules.click();
        console.log('Testing verify button CAMERA RULES for devices: PASSED');
    });

    test('should verify button Data Usage for devices @regression', async ({  vehiclePage }) => {
        //await devicesPage.getDevice12();
        //await waitForPageLoad(vehiclePage.page);

        await expect(vehiclePage.buttonDataUsage).toBeVisible();
        await vehiclePage.buttonDataUsage.click();
        console.log('Testing verify button Data Usage for devices: PASSED');
    });

    test('should verify button Unpair Camera for devices @regression', async ({  vehiclePage }) => {
        //await devicesPage.getDevice12();
        //await waitForPageLoad(vehiclePage.page);

        await expect(vehiclePage.buttonUnpairCamera).toBeVisible();    
        await vehiclePage.buttonUnpairCamera.click();
        console.log('Testing verify button Unpair Camera for devices: PASSED');
    });
 

    test('should verify button Live Stream for devices @regression', async ({ vehiclePage }) => {
        // await devicesPage.getDevice12();
        // await waitForPageLoad(vehiclePage.page);

        await expect(vehiclePage.buttonLiveStream).toBeVisible();
        await vehiclePage.buttonLiveStream.click();
    console.log('Testing verify button Live Stream for devices: PASSED');
    });
   
});