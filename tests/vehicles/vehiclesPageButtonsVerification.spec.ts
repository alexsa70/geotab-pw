import { test, expect, TEST_DEVICES } from '../fixtures';
import {waitForPageLoad} from '../utils/wait';
import { TIMEOUTS } from '../constants';

test.describe('SurfSight Plugin Vehicles Page Verification', () => {
  

  test('SOT-6852 | should load dashboard when authenticated @regression', async ({ page, dashboardPage }) => {
    await expect(page).not.toHaveURL(/\/login/);    
    expect(await dashboardPage.isOnDashboard()).toBeTruthy();
    await expect(page).toHaveURL(/dashboard/);
    
  });

  test('SOT-6853 | should verify buttons on dashboard @regression', async ({  vehiclePage }) => {
    await waitForPageLoad(vehiclePage.page);
    await expect(vehiclePage.buttonSettings).toBeVisible();    
    await expect(vehiclePage.buttonCameraRules).toBeVisible();  
    await expect(vehiclePage.buttonDataUsage).toBeVisible();  
    await expect(vehiclePage.buttonUnpairCamera).toBeVisible();  
    await expect(vehiclePage.buttonLiveStream).toBeVisible();  
    
  });

  test('SOT-6854 | should verify buttons for devices @regression', async ({ page, vehiclePage, devicesPage }) => {
    await devicesPage.getDevice12();
    await waitForPageLoad(devicesPage.page);

    await expect(vehiclePage.buttonSettings).toBeVisible();    
    await expect(vehiclePage.buttonCameraRules).toBeVisible();  
    await expect(vehiclePage.buttonDataUsage).toBeVisible();  
    await expect(vehiclePage.buttonUnpairCamera).toBeVisible();  
    await expect(vehiclePage.buttonLiveStream).toBeVisible();     
       

    // await expect(devicesPage.buttonCalibrate).toBeVisible();
    // await expect(devicesPage.buttonFormatSD).toBeVisible();
    // await expect(devicesPage.buttonReboot).toBeVisible();
    // await expect(devicesPage.buttonInfo).toBeVisible();
  });
});
