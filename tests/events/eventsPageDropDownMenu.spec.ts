import { test, expect } from '../../fixtures';
import { TEST_DEVICES } from '../../fixtures';
import { TIMEOUTS } from '../../constants/timeouts';
import { clickAndWait } from '../../utils/wait';
import { EventCameraRow } from '../../pages/events/EventCameraRow';

test.describe('Events Page - Verification', () => {
  test.describe.configure({ mode: 'serial' });

  let camera: EventCameraRow;

  test.beforeEach(async ({ eventsListPage }) => {
    camera = await eventsListPage.findCameraByName(TEST_DEVICES.DEVICE_12.name);
    
    
  });

  test('SOT-6925 | should open Options dropdown for camera and verify Today button opens today\'s events @regression', 
    async ({ eventsListPage }) => {
       
    // Open Options dropdown
    const dropdown = await camera.openOptionsMenu();
    
    // Check that the dropdown has opened
    expect(await dropdown.isDropdownOpen()).toBeTruthy();
    
    // Check all options
    await dropdown.verifyAllDateOptionsVisible();

    //Click Today button
    await dropdown.selectToday();   

    // Click button to go back to events list page
    await eventsListPage.clickBack();
    
    console.log('✅ Today button opens today\'s events');
  });

    test('SOT-6926 | should open Options dropdown for camera and verify Yesterday button opens yesterday\'s events @regression', 
        async ({ eventsListPage }) => {
        
        // Open Options dropdown
        const dropdown = await camera.openOptionsMenu();
        
        // Check that the dropdown has opened
        expect(await dropdown.isDropdownOpen()).toBeTruthy();
        
        // Check all options
        await dropdown.verifyAllDateOptionsVisible();

        //Click Today button
        await dropdown.selectYesterday();   

        // Click button to go back to events list page
        await eventsListPage.clickBack();
        
        console.log('✅ Yesterday button opens yesterday\'s events');
    });

    test('SOT-6927 | should open Options dropdown for camera and verify Last 7 Days button opens last 7 days events @regression', 
        async ({ eventsListPage }) => {
        
        // Open Options dropdown
        const dropdown = await camera.openOptionsMenu();
        
        // Check that the dropdown has opened
        expect(await dropdown.isDropdownOpen()).toBeTruthy();
        
        // Check all options
        await dropdown.verifyAllDateOptionsVisible();

        //Click Today button
        await dropdown.selectLast7Days();   

        // Click button to go back to events list page
        await eventsListPage.clickBack();
        
        console.log('✅ Last 7 Days button opens last 7 days events');
    });

    test('SOT-6928 | should open Options dropdown for camera and verify Last 30 Days button opens last 30 days events @regression', 
        async ({ eventsListPage }) => {
        
        // Open Options dropdown
        const dropdown = await camera.openOptionsMenu();
        
        // Check that the dropdown has opened
        expect(await dropdown.isDropdownOpen()).toBeTruthy();
        
        // Check all options
        await dropdown.verifyAllDateOptionsVisible();

        //Click Today button
        await dropdown.selectLast30Days();   

        // Click button to go back to events list page
        await eventsListPage.clickBack();
        
        console.log('✅ Last 30 Days button opens last 30 days events');
    });

    test('SOT-6929 | should open Options dropdown for camera and verify This Month button opens this month\'s events @regression', 
        async ({ eventsListPage }) => {
        
        // Open Options dropdown
        const dropdown = await camera.openOptionsMenu();
        
        // Check that the dropdown has opened
        expect(await dropdown.isDropdownOpen()).toBeTruthy();
        
        // Check all options
        await dropdown.verifyAllDateOptionsVisible();

        //Click Today button
        await dropdown.selectThisMonth();   

        // Click button to go back to events list page
        await eventsListPage.clickBack();
        
        console.log('✅ This Month button opens this month\'s events');
    });

    test('SOT-6930 | should open Options dropdown for camera and verify Last Month button opens last month\'s events @regression', 
        async ({ eventsListPage }) => {
        
        // Open Options dropdown
        const dropdown = await camera.openOptionsMenu();
        
        // Check that the dropdown has opened
        expect(await dropdown.isDropdownOpen()).toBeTruthy();
        
        // Check all options
        await dropdown.verifyAllDateOptionsVisible();

        //Click Today button
        await dropdown.selectLastMonth();   

        // Click button to go back to events list page
        await eventsListPage.clickBack();
        
        console.log('✅ Last Month button opens last month\'s events');
    });
});