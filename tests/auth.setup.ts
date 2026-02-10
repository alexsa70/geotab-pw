import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { LoginPage } from '../pages/LoginPage';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const userName = process.env.MYGEOTAB_USER;
  const password = process.env.MYGEOTAB_PASSWORD;
  const database = process.env.MYGEOTAB_DATABASE?.trim() || undefined;

  if (!userName || !password) {
    throw new Error('MYGEOTAB_USER and MYGEOTAB_PASSWORD must be set in .env for authenticated tests');
  }

  const loginPage = new LoginPage(page);
  await loginPage.goto(database);
  await loginPage.login(userName, password, database);

  // Wait for redirect after successful login (leave login page)
  try {
    await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 60000 });
  } catch {
    throw new Error(
      'Login failed or timed out. Check MYGEOTAB_USER and MYGEOTAB_PASSWORD in .env. ' +
      'You may need to run "Specify database" if the user has multiple databases.'
    );
  }

  // Ensure auth directory exists
  const authDir = path.dirname(authFile);
  fs.mkdirSync(authDir, { recursive: true });

  await page.context().storageState({ path: authFile });
});
