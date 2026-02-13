import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage - Page Object for MyGeotab login page
 * https://my.geotab.com/login
 */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   * @param database - if provided, use direct URL https://my.geotab.com/{database}/login.html
   *   to skip the "Specify database" step (e.g. surftesting_ordernow)
   */
  async goto(database?: string): Promise<void> {
    if (database) {
      await this.navigate(`/${database}/login.html`);
    } else {
      await this.navigate('/login');
    }
  }

  //**Get Cookie Consent Button */
  getCookieConsentButton() {
    return this.page.getByRole('button', { name: 'Accept' });
  }
  
  /**
   * Get database/server input locator
   */
  getDatabaseInput() {
    return this.page.locator('input[name="database"], input[placeholder*="database" i], input[id*="database" i], input[aria-label*="database" i]').first();
  }

  /**
   * Get username/email input locator
   */
  getUsernameInput() {
    return this.page.getByRole('textbox', { name: /username|email|user/i }).or(
      this.page.locator('input[name="userName"], input[name="username"], input[type="email"], input[placeholder*="email" i], input[placeholder*="user" i], input[id*="user" i], input[autocomplete="username"]')
    ).first();
  }

  /**
   * Get password input locator
   */
  getPasswordInput() {
    return this.page.getByRole('textbox', { name: /password/i }).or(
      this.page.locator('input[name="password"], input[type="password"], input[autocomplete="current-password"]')
    ).first();
  }

  /**
   * Get Next button (MyGeotab uses two-step: username -> Next -> password)
   */
  getNextButton() {
    return this.page.getByRole('button', { name: /^next$/i });
  }

  /**
   * Get sign in / login button locator (appears after password step)
   */
  getSignInButton() {
    return this.page.getByRole('button', { name: /sign in|log in|login|submit/i }).or(
      this.page.locator('button[type="submit"], input[type="submit"], [type="submit"]')
    ).first();
  }

  /**
   * Dismiss cookie consent if present
   */
  async dismissCookieBanner(): Promise<void> {
    const acceptBtn = this.page.getByRole('button', { name: 'Accept' });
    if (await acceptBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await acceptBtn.click();
    }
  }

  /**
   * Fill credentials and submit login form
   * MyGeotab uses two-step flow: username -> Next -> password -> Sign in
   * When database is in URL (goto(database)), "Specify database" is skipped.
   * @param username - email or username
   * @param password - password
   * @param database - unused when goto(database) was used; otherwise click "Specify database"
   */
  async fillCredentials(username: string, password: string, database?: string): Promise<void> {
    await this.dismissCookieBanner();

    // Only use "Specify database" when we're on /login (not on /{database}/login.html)
    const url = this.getCurrentURL();
    if (database && !url.includes(`/${database}/`)) {
      const specifyDbBtn = this.page.getByRole('button', { name: 'Specify database' });
      if (await specifyDbBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await specifyDbBtn.click();
        const databaseInput = this.getDatabaseInput();
        await databaseInput.fill(database);
      }
    }

    const usernameInput = this.getUsernameInput();
    await usernameInput.fill(username);
    await this.getNextButton().click();

    // Wait for password step to appear
    const passwordInput = this.getPasswordInput();
    await passwordInput.waitFor({ state: 'visible', timeout: 10000 });
    await passwordInput.fill(password);
  }

  /**
   * Submit login form (click Sign In button)
   */
  async submitLogin(): Promise<void> {
    await this.getSignInButton().click();
  }

  /**
   * Full login flow: fill credentials and submit
   */
  async login(username: string, password: string, database?: string): Promise<void> {
    await this.fillCredentials(username, password, database);
    await this.submitLogin();
  }

  /**
   * Get error message text if login failed
   */
  async getErrorMessage(): Promise<string> {
    const errorLocator = this.page.locator(
      '[role="alert"], .error, .alert, [class*="error"], [data-testid*="error"]'
    ).first();
    if (await errorLocator.isVisible()) {
      return (await errorLocator.textContent()) || '';
    }
    return '';
  }

  /**
   * Check if login form is visible
   */
  async isLoginFormVisible(): Promise<boolean> {
    return this.isVisible(this.getUsernameInput());
  }
}
