import { test, expect } from '../../fixtures';
import { TEST_DEVICES } from '../../fixtures';
import { TIMEOUTS } from '../../constants/timeouts';
import { clickAndWait } from '../../utils/wait';
import { EventCameraRow } from '../../pages/events/EventCameraRow';
import { CameraEventsPage } from '../../pages/events/cameraEventsPage';

test.describe('Events Page - Events List Filter', () => {
  test.describe.configure({ mode: 'serial' });

  let camera: EventCameraRow;

  test.beforeEach(async ({ eventsListPage }) => {
    camera = await eventsListPage.findCameraByName(TEST_DEVICES.DEVICE_12.name);
    
  });

  test('SOT-6931 | should open Options dropdown for camera Last 30 Days and verify Events List Filter dropdown @regression', 
        async ({ page, eventsListPage }) => {
        
        // Open Options dropdown
        const dropdown = await camera.openOptionsMenu();        
        // Check that the dropdown has opened
        expect(await dropdown.isDropdownOpen()).toBeTruthy();        
        // Check all options
        await dropdown.verifyAllDateOptionsVisible();
        //Click last 30 days button
        await dropdown.selectLast30Days();   

        // Open Camera Events page
        const cameraEventsPage = new CameraEventsPage(page);
        await cameraEventsPage.waitForPageLoad();

        // Verify Camera Events page is loaded
        await expect(page).toHaveURL(/vehicleEvents.*deviceID/i);

        // Verify Filter and Sort By buttons are visible
        await expect(cameraEventsPage.filterButton).toBeVisible({ 
            timeout: TIMEOUTS.MEDIUM 
          });
          await expect(cameraEventsPage.sortByButton).toBeVisible({ 
            timeout: TIMEOUTS.MEDIUM 
          });

        // Click events list filter dropdown    
        await cameraEventsPage.openFilter();
        expect(await cameraEventsPage.isFilterOpen()).toBeTruthy();

        // Check that the dropdown has opened
       await cameraEventsPage.verifyAtLeastOneFilterOptionVisible();

       //close filter
       await cameraEventsPage.closeFilter();
           
        // Click button to go back to events list page
        await eventsListPage.clickBack();

        // Verify we back to events list page
        await expect(page).toHaveURL(/#addin-surfsight_staging-vehicleEvents$/i);
        
        console.log('✅ Events list filter dropdown verified');
    });
    
});