import { test, expect } from '../../fixtures';
import { TEST_DEVICES } from '../../fixtures';
import { TIMEOUTS } from '../../constants/timeouts';

test.describe('Events Page - Verification', () => {
  
  test('SOT-XXXX | should verify events page title and URL @regression', 
    async ({ page, eventsListPage }) => {
    // eventsListPage fixture уже загрузил страницу!
    
    // 1. Проверить URL
    await expect(page).toHaveURL(/#addin-surfsight_staging-vehicleEvents/i);
    
    // 2. Проверить title
    await expect(eventsListPage.pageTitle).toBeVisible();
    
    console.log('✅ Events page verified');
  });

  test('SOT-XXXX | should display camera list with headers @regression', 
    async ({ eventsListPage }) => {
    // Проверить заголовки таблицы
    await expect(eventsListPage.cameraNameHeader).toBeVisible({ 
      timeout: TIMEOUTS.MEDIUM 
    });
    await expect(eventsListPage.moreActionsHeader).toBeVisible({ 
      timeout: TIMEOUTS.MEDIUM 
    });
    
    console.log('✅ Camera list headers verified');
  });

  test('SOT-XXXX | should find camera by name @regression', 
    async ({ eventsListPage }) => {
    // Найти камеру
    const camera = await eventsListPage.findCameraByName(TEST_DEVICES.DEVICE_12.name);
    
    // Проверить что камера найдена
    const cameraName = await camera.getCameraName();
    expect(cameraName).toContain('3.12.X');
    
    console.log('✅ Camera found by name');
  });

  test('SOT-XXXX | should open Options dropdown for camera @regression', 
    async ({ eventsListPage }) => {
    // Найти камеру
    const camera = await eventsListPage.findCameraByName(TEST_DEVICES.DEVICE_12.name);
    
    // Открыть Options dropdown
    const dropdown = await camera.openOptionsMenu();
    
    // Проверить что dropdown открылся
    expect(await dropdown.isDropdownOpen()).toBeTruthy();
    
    // Проверить все опции
    await dropdown.verifyAllDateOptionsVisible();
    
    // Закрыть dropdown
    await dropdown.close();
    
    console.log('✅ Options dropdown verified');
  });
});