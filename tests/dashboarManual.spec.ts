import { test, expect } from '@playwright/test';

test('SOT-6851 | should verify all buttons in Dashboard menu @regression', async ({ page }) => {
  await page.goto('https://my.geotab.com/login.html');
  await page.getByRole('textbox', { name: 'Username (Email)' }).click();
  await page.getByRole('textbox', { name: 'Username (Email)' }).fill('alex.leshinski@lytx.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123@Alex');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForLoadState('domcontentloaded');

  const menuProductivity = page.getByRole('menuitem', { name: 'Productivity' });
  await menuProductivity.click();
  
  const menuSafety = page.getByRole('menuitem', { name: 'Safety' });
  await menuSafety.click();

  const Maintenance = page.getByRole('menuitem', { name: 'Maintenance' })
  await Maintenance.click();
  const menuFuelAndEnergy = page.getByRole('menuitem', { name: 'Fuel and Energy' });
  await menuFuelAndEnergy.click();
  const menuSustainability = page.getByRole('menuitem', { name: 'Sustainability' });
  await menuSustainability.click();
  const menuPeople = page.getByRole('menuitem', { name: 'People' });
  await menuPeople.click();
  
  //SurfSight plugin menu verification
  const menuAddIns = page.getByRole('menuitem', { name: 'Add-Ins' });
  const addInsSubMenuProbe = page.getByRole('menuitem', {
    name: /^(Add-In Subscriptions|Vehicles|Video Events|Recordings|Video Rules)$/
  });

  const openAddInsSubMenu = async () => {
    await menuAddIns.click();

    // On some pages Add-Ins needs a second click to show its submenu.
    if (!(await addInsSubMenuProbe.first().isVisible().catch(() => false))) {
      await menuAddIns.click();
    }

    await expect(addInsSubMenuProbe.first()).toBeVisible({ timeout: 10000 });
  };

  await openAddInsSubMenu();
  
  const menuAddInSubscriptions = page.getByRole('menuitem', { name: 'Add-In Subscriptions' });
  await menuAddInSubscriptions.click();
  
  const menuVehicles =  page.getByRole('menuitem', { name: 'Vehicles' });
  await menuVehicles.click();

  await openAddInsSubMenu();

   const menuVideoEvents = page.getByRole('menuitem', { name: 'Video Events' });
   await menuVideoEvents.click();

   await openAddInsSubMenu();

   const menuRecordings = page.getByRole('menuitem', { name: 'Recordings', exact: true });
   const menuVideoRecordingsHeader = page.getByRole('menuitem', { name: 'Video Recordings', exact: true });
   if (await menuRecordings.isVisible().catch(() => false)) {
    await menuRecordings.click();
   } else {
    await menuVideoRecordingsHeader.click();
   }

   await openAddInsSubMenu();

   const menuVideoRules = page.getByRole('menuitem', { name: /^(Video Rules|Geotab Video Rules)$/ });
   await expect(menuVideoRules).toBeVisible({ timeout: 10000 });
   await menuVideoRules.click();
   
   const menuVideoRulesText = page.getByText('Geotab Video Rules');
   await menuVideoRulesText.click();
   const menuInfo = page.getByRole('img', { name: 'surf-info' });
   await menuInfo.click();
   const menuAccount = page.getByRole('button', { name: 'Account' });
   await menuAccount.click();
   const menuLogOut = page.getByRole('menuitem', { name: 'Log out' });
   await menuLogOut.click();

});
