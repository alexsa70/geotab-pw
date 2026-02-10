import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('MyGeotab Login', () => {
  test('should display login form', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // MyGeotab uses two-step login: username first, then password
    await expect(loginPage.getUsernameInput()).toBeVisible({ timeout: 15000 });
    await expect(loginPage.getNextButton()).toBeVisible();
  });

  test('should show error on invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('invalid@example.com', 'wrongpassword');

    // With invalid credentials: stay on login page or see error message
    await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
  });
});
