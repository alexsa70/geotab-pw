import { test, expect } from '../../fixtures';
import { TEST_DEVICES } from '../../fixtures';
import { TIMEOUTS } from '../../constants/timeouts';

test.describe('Recordings Page - Verification', () => {
  test.describe.configure({ mode: 'serial' });
  test('SOT-6922 | should verify recordings page title and URL @regression', 
    async ({ page, recordingsListPage }) => {
    // recordingsListPage fixture has already loaded the page!
    
    // Check URL
    await expect(page).toHaveURL(/#addin-surfsight_staging-recordings/i);
    
    // Check title
    await expect(recordingsListPage.pageTitle).toBeVisible();
    
    console.log('✅ Recordings page verified');
  });

  test('SOT-6923| should display recordings list headers @regression', 
    async ({ recordingsListPage }) => {
    // Check table headers
    await expect(recordingsListPage.cameraNameHeader).toBeVisible({ 
      timeout: TIMEOUTS.MEDIUM 
    });
    await expect(recordingsListPage.moreActionsHeader).toBeVisible({ 
      timeout: TIMEOUTS.MEDIUM 
    });
    
    console.log('✅ Recordings list headers verified');
  });

  test('SOT-6924 | should find recording by camera name @regression', 
    async ({ recordingsListPage }) => {
    // Find a recording by camera
    const recording = await recordingsListPage.findRecordingByCamera(
      TEST_DEVICES.DEVICE_12.name
    );
    
    // Check that the record has been found
    const cameraName = await recording.getCameraName();
    expect(cameraName).toContain('3.12.X');
    
    console.log('✅ Recording found by camera name');
  });
});
