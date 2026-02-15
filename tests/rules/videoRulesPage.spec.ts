import { test, expect } from '../../fixtures';
import { TIMEOUTS } from '../../constants/timeouts';

test.describe('Video Rules Page - Verification', () => {
  test.describe.configure({ mode: 'serial' });
  
  test('SOT-XXXX | should verify video rules page title and URL @regression', 
    async ({ page, videoRulesListPage }) => {
    // videoRulesListPage fixture уже загрузил страницу!
    
    // Проверить URL
    await expect(page).toHaveURL(/#addin-surfsight_staging-videoRules/i);
    
    // Проверить title
    await expect(videoRulesListPage.pageTitle).toBeVisible();
    
    console.log('✅ Video Rules page verified');
  });

  test('SOT-XXXX | should display Save and Help buttons @regression', 
    async ({ videoRulesListPage }) => {
    // Проверить кнопки
    await expect(videoRulesListPage.saveButton).toBeVisible({ 
      timeout: TIMEOUTS.MEDIUM 
    });
    await expect(videoRulesListPage.helpButton).toBeVisible({ 
      timeout: TIMEOUTS.MEDIUM 
    });
    
    console.log('✅ Save and Help buttons verified');
  });

  test('SOT-XXXX | should find rule by name and verify On/Off buttons @regression', 
    async ({ videoRulesListPage }) => {
    // Найти правило Speeding
    const speedingRule = await videoRulesListPage.findRuleByName('Speeding');
    
    // Проверить что кнопки On/Off видны
    await expect(speedingRule.onButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await expect(speedingRule.offButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    
    console.log('✅ Rule found and On/Off buttons verified');
  });

  test('SOT-XXXX | should toggle rule on and off @regression', 
    async ({ videoRulesListPage }) => {
    // Найти правило
    const seatBeltRule = await videoRulesListPage.findRuleByName('Seat belt');
    
    // Включить
    await seatBeltRule.turnOn();
    
    // Выключить
    await seatBeltRule.turnOff();
    
    // Сохранить изменения
    await videoRulesListPage.clickSave();
    
    console.log('✅ Rule toggled successfully');
  });
});