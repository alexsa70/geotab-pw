import { test, expect } from '../../fixtures';
import { TEST_DEVICES } from '../../fixtures';
import { TIMEOUTS } from '../../constants/timeouts';

test.describe('Events Page - Verification', () => {
  test.describe.configure({ mode: 'serial' });
  
  test('SOT-6852 | should verify events page title and URL @regression', 
    async ({ page, eventsListPage }) => {
    // eventsListPage fixture have already loaded the page!
    
    // 1. Check URL
    await expect(page).toHaveURL(/#addin-surfsight_staging-vehicleEvents/i);
    
    // 2. Check title
    await expect(eventsListPage.pageTitle).toBeVisible();
    
    console.log('✅ Events page verified');
  });

  test('SOT-6853 | should display camera list with headers @regression', 
    async ({ eventsListPage }) => {
    // Check table headers
    await expect(eventsListPage.cameraNameHeader).toBeVisible({ 
      timeout: TIMEOUTS.MEDIUM 
    });
    await expect(eventsListPage.moreActionsHeader).toBeVisible({ 
      timeout: TIMEOUTS.MEDIUM 
    });
    
    console.log('✅ Camera list headers verified');
  });

  test('SOT-6906 | should find camera by name and verify dropdown options @regression', 
    async ({ eventsListPage }) => {
    // Найти камеру
    const camera = await eventsListPage.findCameraByName(TEST_DEVICES.DEVICE_12.name);
    
    // Check that the camera has been found
    const cameraName = await camera.getCameraName();
    expect(cameraName).toContain('3.12.X');
    
    console.log('✅ Camera found by name');
  });

  test('SOT-6907 | should open Options dropdown for camera @regression', 
    async ({ eventsListPage }) => {
    //Find a camera
    const camera = await eventsListPage.findCameraByName(TEST_DEVICES.DEVICE_12.name);
    
    // Открыть Options dropdown
    const dropdown = await camera.openOptionsMenu();
    
    // Check that the dropdown has opened
    expect(await dropdown.isDropdownOpen()).toBeTruthy();
    
    // Check all options
    await dropdown.verifyAllDateOptionsVisible();
    
    // Close dropdown
    await dropdown.close();
    
    console.log('✅ Options dropdown verified');
  });
});