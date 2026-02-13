import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { LoginPage } from '../pages/LoginPage';
import { EnvConfig } from '../utils/env';
import { TIMEOUTS } from '../constants/timeouts';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Get credentials using EnvConfig
  const { username, password } = EnvConfig.getCredentials();
  const database = EnvConfig.getDatabase();

  const loginPage = new LoginPage(page);
  await loginPage.goto(database);
  await loginPage.login(username, password, database);

  // Wait for redirect after successful login (leave login page)
  try {
    await page.waitForURL(
      (url) => !url.pathname.includes('/login'), 
      { timeout: TIMEOUTS.AUTH }
    );
  } catch {
    throw new Error(
      'Login failed or timed out. Check credentials in .env file. ' +
      `Current user: ${username}, Database: ${database}`
    );
  }

  // Ensure auth directory exists
  const authDir = path.dirname(authFile);
  fs.mkdirSync(authDir, { recursive: true });

  await page.context().storageState({ path: authFile });
  
  console.log(`✅ Authentication successful for user: ${username}`);
});
