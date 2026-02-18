import { test, expect } from '../../fixtures';
import { TEST_DEVICES } from '../../fixtures';
import { CameraRecordingsPage } from '../../pages/recordings/cameraRecordingsPage';
import { TIMEOUTS } from '../../constants/timeouts';

test.describe('Camera Recordings - Timeline Verification', () => {
    

  test('SOT-6933 | should verify timeline page controls @regression',
    async ({ page, recordingsListPage }) => {    
    // 1. Find camera and click Timeline
    const recording = await recordingsListPage.findRecordingByCamera(
        TEST_DEVICES.DEVICE_12.name
      );
    await recording.clickTimeline();        
    // 2. Create CameraRecordingsPage
    const timelinePage = new CameraRecordingsPage(page);
    await timelinePage.waitForPageLoad();    
    // 3. Verify all controls visible
    await timelinePage.verifyAllControlsVisible();    
    console.log('✅ Timeline controls verified');
  });
});

test.describe('Camera Recordings - Recording Actions', () => {
  test.describe.configure({mode: 'serial'})

    let timelinePage: CameraRecordingsPage;

    test.beforeEach(async ({ page, recordingsListPage }) => {        
        const recording = await recordingsListPage.findRecordingByCamera(
            TEST_DEVICES.DEVICE_12.name
          );
        await recording.clickTimeline();  
        timelinePage = new CameraRecordingsPage(page);
        await timelinePage.waitForPageLoad();
    });


  test('SOT-6934 | should switch between cameras @regression',
    async () => {   
     // Camera switching doesn't require recordings        
    // Switch to Rear Camera
    await timelinePage.selectRearCamera();    
    // Switch back to Front Camera
    await timelinePage.selectFrontCamera();
    
    console.log('✅ Camera switching verified');
  });

  test('SOT-6935 | should switch quality settings @regression',
    async () => {

     // Quality switching doesn't require recordings     
    // Switch to High Quality
    await timelinePage.selectHighQuality();    
    // Switch back to Normal Quality
    await timelinePage.selectNormalQuality();
    
    console.log('✅ Quality switching verified');
  });

  test('SOT-6936 | should open download modal and verify controls @regression',
    async () => {
      // ✅ Ensure we have recordings before testing download
      await timelinePage.ensureHasRecordings();
      // Open Download modal
      await timelinePage.clickDownload();
      // Verify modal controls
      await timelinePage.verifyDownloadModalControls();    
      // Close modal
      await timelinePage.closeDownloadModal();    
      console.log('✅ Download modal verified');
  });

  test('SOT-6937 | should prepare and download recording @regression',
    async () => {    
       // ✅ Ensure we have recordings before testing download
      await timelinePage.ensureHasRecordings();        
    // Open Download modal
    await timelinePage.clickDownload();    
    // Configure download
    await timelinePage.selectDownloadQuality('high');
    //await timelinePage.setSecondsBefore(5);
    //await timelinePage.setSecondsAfter(10);    
    // Prepare download
    await timelinePage.prepareDownloadButton.click();
    // ✅ Verify preparation started (button disabled)
    await expect(timelinePage.prepareDownloadButton).toBeDisabled({
      timeout: TIMEOUTS.SHORT
    })    
    // Download (if needed - may take time)
    //await timelinePage.downloadNow();  
    console.log('✅ Download preparation started');  
    // Close modal
    await timelinePage.closeDownloadModal();
    
    
  });
});
