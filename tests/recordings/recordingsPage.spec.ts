import { test, expect } from '../../fixtures';
import { TEST_DEVICES } from '../../fixtures';
import { TIMEOUTS } from '../../constants/timeouts';

test.describe('Recordings Page - Verification', () => {
  test.describe.configure({ mode: 'serial' });
  test('SOT-XXXX | should verify recordings page title and URL @regression', 
    async ({ page, recordingsListPage }) => {
    // recordingsListPage fixture уже загрузил страницу!
    
    // Проверить URL
    await expect(page).toHaveURL(/#addin-surfsight_staging-recordings/i);
    
    // Проверить title
    await expect(recordingsListPage.pageTitle).toBeVisible();
    
    console.log('✅ Recordings page verified');
  });

  test('SOT-XXXX | should display recordings list headers @regression', 
    async ({ recordingsListPage }) => {
    // Проверить заголовки таблицы
    await expect(recordingsListPage.cameraNameHeader).toBeVisible({ 
      timeout: TIMEOUTS.MEDIUM 
    });
    await expect(recordingsListPage.moreActionsHeader).toBeVisible({ 
      timeout: TIMEOUTS.MEDIUM 
    });
    
    console.log('✅ Recordings list headers verified');
  });

  test('SOT-XXXX | should find recording by camera name @regression', 
    async ({ recordingsListPage }) => {
    // Найти запись по камере
    const recording = await recordingsListPage.findRecordingByCamera(
      TEST_DEVICES.DEVICE_12.name
    );
    
    // Проверить что запись найдена
    const cameraName = await recording.getCameraName();
    expect(cameraName).toContain('3.12.X');
    
    console.log('✅ Recording found by camera name');
  });
});
