import { test, expect } from '../../fixtures';
import { TIMEOUTS } from '../../constants/timeouts';

test.describe('Video Rules Page - Verification', () => {
  test.describe.configure({ mode: 'serial' });
  
  test('SOT-6918 | should verify video rules page title and URL @regression', 
    async ({ page, videoRulesListPage }) => {
    // videoRulesListPage fixture has already loaded the page!
    
    // Check URL
    await expect(page).toHaveURL(/#addin-surfsight_staging-videoRules/i);
    
    // Check title
    await expect(videoRulesListPage.pageTitle).toBeVisible();
    
    console.log('✅ Video Rules page verified');
  });

  test('SOT-6919 | should display Save and Help buttons @regression', 
    async ({ videoRulesListPage }) => {
    // Check the buttons
    await expect(videoRulesListPage.saveButton).toBeVisible({ 
      timeout: TIMEOUTS.MEDIUM 
    });
    await expect(videoRulesListPage.helpButton).toBeVisible({ 
      timeout: TIMEOUTS.MEDIUM 
    });
    
    console.log('✅ Save and Help buttons verified');
  });

  test('SOT-6920 | should find rule by name and verify On/Off buttons @regression', 
    async ({ videoRulesListPage }) => {
    // Find the Speeding rule
    const speedingRule = await videoRulesListPage.findRuleByName('Speeding');
    
    // Check that the On/Off buttons are visible
    await expect(speedingRule.onButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await expect(speedingRule.offButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    
    console.log('✅ Rule found and On/Off buttons verified');
  });

  test('SOT-6921 | should toggle rule on and off @regression', 
    async ({ videoRulesListPage }) => {
    // Find a rule
    const seatBeltRule = await videoRulesListPage.findRuleByName('Seat belt');
    
    // Turn on
    await seatBeltRule.turnOn();
    
    // Turn off
    await seatBeltRule.turnOff();
    
    // Save changes
    await videoRulesListPage.clickSave();
    
    console.log('✅ Rule toggled successfully');
  });
});