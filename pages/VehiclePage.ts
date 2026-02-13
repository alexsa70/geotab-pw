import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * VehiclePage - Page Object for MyGeotab vehicle page
 * https://my.geotab.com/vehicles
 */
export class VehiclePage extends BasePage {
    readonly device12Row: Locator;
    readonly buttonAddCamera: Locator;
    readonly buttonBulkAddCameras: Locator;
    readonly buttonUpdateSettings: Locator;
    readonly buttonUserAccess: Locator;
    readonly buttonWiFi: Locator;
    readonly buttonAlarmsReport: Locator;
    readonly buttonHealth: Locator;
    readonly buttonBulkEditCameraRules: Locator;
    readonly buttonBulkEditCameraSettings: Locator;
    readonly buttonSettings: Locator;
    readonly buttonCameraRules: Locator;
    readonly buttonDataUsage: Locator;
    readonly buttonUnpairCamera: Locator;
    readonly buttonLiveStream: Locator;
   

    constructor(public readonly page: Page){
        super(page)
        this.device12Row = page.getByRole('row').filter({ hasText: /AlexL - 3\.12\.X/ });
        this.buttonAddCamera = page.getByRole('button', { name: 'Add Camera', exact: true })
        this.buttonBulkAddCameras = page.getByRole('button', { name: 'Bulk Add Cameras', exact: true })
        this.buttonUpdateSettings = page.getByRole('button', { name: 'Update Settings', exact: true })
        this.buttonUserAccess = page.getByRole('button', { name: 'User Access' })
        this.buttonWiFi = page.getByRole('button', { name: 'WiFi', exact: true })
        this.buttonAlarmsReport = page.getByRole('button', { name: 'Alarms Report' })
        this.buttonHealth = page.getByRole('button', { name: 'Health' })    
        this.buttonBulkEditCameraRules = page.getByRole('button', { name: 'Bulk Edit Camera Rules', exact: true })   
        this.buttonBulkEditCameraSettings = page.getByRole('button', { name: 'Bulk Edit Camera Settings', exact: true })
        this.buttonSettings = this.device12Row.getByRole('button', { name: 'Settings', exact: true })
        this.buttonCameraRules = this.device12Row.getByRole('button', { name: 'Camera Rules', exact: true })
        this.buttonDataUsage = this.device12Row.getByRole('button', { name: 'Data Usage', exact: true })
        this.buttonUnpairCamera = this.device12Row.getByRole('button', { name: 'Unpair Camera', exact: true })
        this.buttonLiveStream = this.device12Row.getByRole('button', { name: 'Live Stream', exact: true })
       
        
    }

    // async getVehiclesPage(){
    //     const pluginSurfSight = this.page.getByRole('menuitem', { name: 'Add-Ins' });
        
    //     // ✅ ИСПРАВЛЕНО: Добавлено ожидание видимости
    //     await pluginSurfSight.waitFor({ state: 'visible', timeout: 15000 });
    //     await pluginSurfSight.click();
    //     await this.page.waitForLoadState('networkidle');
        
    //     const vehiclesPage = this.page.getByLabel('Vehicles', { exact: true });
        
    //     // ✅ ИСПРАВЛЕНО: Добавлено ожидание видимости
    //     await vehiclesPage.waitFor({ state: 'visible', timeout: 15000 });
    //     await vehiclesPage.click();
    //     await this.page.waitForLoadState('networkidle');
        
    //     // ✅ ИСПРАВЛЕНО: Используем более гибкую проверку URL
    //     await expect(this.page).toHaveURL(/surftesting_ordernow\/#addin-surfsight_staging-vehicles/);
    // }

    // async goto(){
    //     await this.page.goto('https://my1431.geotab.com/surftesting_ordernow/#addin-surfsight_staging-vehicles');
    //     await this.page.waitForLoadState('networkidle');
        
    //     // Проверка что не редирект на логин
    //     const url = this.page.url();
    //     if (url.includes('login.html')) {
    //         throw new Error('❌ Session expired - redirected to login');
    //     }
    // }

}

// await page.getByRole('button', { name: 'Settings' }).nth(1).click();
// await page.getByRole('button', { name: 'Cancel' }).click();
// await page.getByRole('button', { name: 'Camera Rules' }).first().click();
// await page.getByText('Camera Video Rules - Alex - 3.11.X -').click();
// await page.getByRole('button', { name: 'Cancel' }).click();
// await page.getByRole('button', { name: 'Data Usage' }).first().click();
// await page.getByText('Data usage - Alex - 3.11.X').click();
// await page.getByRole('img', { name: 'surf-close-alert' }).click();
// await page.getByRole('button', { name: 'Unpair Camera' }).nth(1).hover();
// await page.getByRole('button', { name: 'Live Stream' }).first().click();
// await page.getByRole('cell', { name: '357660102685229' }).click();
// await page.getByRole('cell', { name: 'G7B2210ACA51' }).click();
// await page.getByRole('cell', { name: '78980401' }).click();
// await page.locator('tr:nth-child(3) > td > .surf-table-cell-content-with-checkbox > .surf-checkbox > .fa-icon').click();
// await page.getByRole('cell', { name: 'AlexL - 3.12.X AlexL,' }).click();
// await page.getByRole('cell', { name: 'AlexL - 3.12.X AlexL,' }).click();
// await page.locator('tr:nth-child(3) > td > .surf-table-cell-content-with-checkbox > .surf-checkbox > .fa-icon').click();
// await page.locator('.fa-icon').first().click();
// await page.locator('.fa-icon').first().click();
// await page.getByRole('cell', { name: 'Alex - 3.11.X Vehicle Standby' }).click();
// await page.locator('.fa-icon').first().click();
// await page.getByText('SettingsCamera RulesData').nth(1).click();
// await page.getByRole('button', { name: 'Cancel' }).click();
// await page.getByRole('cell', { name: 'Settings Camera Rules Data' }).nth(1).click();
// await page.getByRole('button', { name: 'Cancel' }).click();