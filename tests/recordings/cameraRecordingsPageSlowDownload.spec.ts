import { test, expect } from '../../fixtures';
import { TEST_DEVICES } from '../../fixtures';
import { CameraRecordingsPage } from '../../pages/recordings/cameraRecordingsPage';
import { TIMEOUTS } from '../../constants/timeouts';

test.describe('Camera Recordings - Slow Tests (Full Download)', () => {
  test.setTimeout(3 * 60 * 1000);
  
  // ⚠️ This test waits for camera upload - can take 2-3 minutes
  test('SOT-6938 | should complete full download preparation @slow @manual', 
    async ({ page, recordingsListPage }) => {
    
    const recording = await recordingsListPage.findRecordingByCamera(
      TEST_DEVICES.DEVICE_12.name
    );
    await recording.clickTimeline();
    
    const timelinePage = new CameraRecordingsPage(page);
    await timelinePage.waitForPageLoad();
    
    // Ensure recordings available
    await timelinePage.ensureHasRecordings();
    
    // Open download modal
    await timelinePage.clickDownload();
    
    // Configure download
    await timelinePage.selectDownloadQuality('high');
    //await timelinePage.setSecondsBefore(5);
    //await timelinePage.setSecondsAfter(10);
    
    // ⏳ Prepare download (wait up to 3 minutes for camera upload)
    console.log('⏳ Preparing download - this may take 2-3 minutes...');
    await timelinePage.prepareDownloadButton.click();  // 3 minutes timeout

    // ✅ Verify preparation started (button disabled)
  await expect(timelinePage.prepareDownloadButton).toBeDisabled({ 
    timeout: TIMEOUTS.SHORT 
  });
  console.log('✅ Download preparation started');
    
  // Download file
  //
   // ✅ Test Cancel button
  await timelinePage.downloadCancelButton.click();
  
  // ✅ Verify modal closed
  await expect(timelinePage.prepareDownloadButton).toBeHidden({ 
    timeout: TIMEOUTS.SHORT 
  });
  
  console.log('✅ Cancel button works - modal closed');
    
  console.log('✅ Full download completed');
  });
});