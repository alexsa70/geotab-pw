import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * DevicesPage - Page Object for MyGeotab devices page
 * https://my.geotab.com/devices
 */
export class DevicesPage extends BasePage {
    readonly buttonCalibrate: Locator;
    readonly buttonFormatSD: Locator;
    readonly buttonReboot: Locator;
    readonly buttonInfo: Locator;
    readonly device12: Locator;

    constructor(public readonly page: Page){
        super(page)
        this.device12 = page.getByRole('cell').filter({hasText: /AlexL - 3\.12\.X/}).first();
        this.buttonCalibrate = page.getByRole('button', { name: 'Calibrate' })
        this.buttonFormatSD = page.getByRole('button', { name: 'Format SD Card' })
        this.buttonReboot = page.getByRole('button', { name: 'Reboot camera' })
        this.buttonInfo = page.getByRole('button', { name: 'info' })
        
    }
    
        
    async getDevice12() {
        await this.page.waitForLoadState('networkidle');
        try {
          await expect(this.device12).toBeVisible({ timeout: 30000 });
          await this.device12.scrollIntoViewIfNeeded();
          await this.device12.click();
          await this.page.waitForLoadState('networkidle');
        } catch (error) {
          throw new Error(`Device not found: ${error}`);
        }
      }

    // async getDevice12(){
    //     //Wait for the page to load
    //     await this.page.waitForLoadState('networkidle');
    //     //Click on the device
    //     const AI12 = this.page.getByRole('cell').filter({hasText: /AlexL - 3\.12\.X/}).first();
    //     try {   
    //         await expect(AI12).toBeVisible({timeout: 30000});
    //         await AI12.scrollIntoViewIfNeeded();
    //         await AI12.click();
    //         //Wait for the device to load
    //         await this.page.waitForLoadState('networkidle');
    //         //Check if the device is loaded
    //     } catch (error) {
    //         throw new Error(`Device not found: ${error}`);
    //     }
    // }
    
    async getDevice14(){
        //Wait for the page to load
        await this.page.waitForLoadState('networkidle');
        //Click on the device
        const AI14 = this.page.getByRole('cell').filter({hasText: /AlexL-AI14/}).first();
        try {
            await expect(AI14).toBeVisible({timeout: 30000});
            await AI14.scrollIntoViewIfNeeded();
            await AI14.click();
        } catch (error) {
            throw new Error(`Device not found: ${error}`);
        }
    }           
}
