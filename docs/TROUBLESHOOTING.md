# 🔧 Troubleshooting Guide

Common issues and solutions for Geotab-PW test automation.

---

## 🚨 Quick Diagnosis

Before diving in, run these commands:

```bash
# Check if tests run at all
npx playwright test tests/auth.setup.ts

# Check specific test
npx playwright test tests/vehicles/vehiclesPage.spec.ts --headed

# Check with debug
npx playwright test tests/vehicles/vehiclesPage.spec.ts --debug
```

---

## ❌ Common Errors & Fixes

---

### 1. Authentication Failed

**Error:**
```
Error: Authentication failed
❌ Login failed
```

**Causes & Fixes:**

```bash
# Fix 1: Check .env file exists
cat .env

# Fix 2: Verify credentials are correct
GEOTAB_USERNAME=correct_email@lytx.com
GEOTAB_PASSWORD=correct_password
GEOTAB_DATABASE=surftesting_ordernow

# Fix 3: Delete cached auth state and re-run
rm -rf playwright/.auth/
npm test
```

---

### 2. Element Not Found (Timeout)

**Error:**
```
Error: expect(locator).toBeVisible() failed
Expected: visible
Timeout: 5000ms
Error: element(s) not found
```

**Causes & Fixes:**

```typescript
// Fix 1: Add explicit timeout
// ❌ Too short (default 5 sec)
await expect(element).toBeVisible();

// ✅ Explicit timeout
await expect(element).toBeVisible({ timeout: TIMEOUTS.MEDIUM });

// Fix 2: Wait for page to load first
await page.waitForLoadState('domcontentloaded');
await expect(element).toBeVisible({ timeout: TIMEOUTS.MEDIUM });

// Fix 3: Check selector in DevTools
// Open DevTools → Elements → Search for your selector
```

---

### 3. Strict Mode Violation

**Error:**
```
Error: strict mode violation: locator resolved to X elements
1) <div>Element 1</div>
2) <div>Element 2</div>
```

**Causes & Fixes:**

```typescript
// Fix 1: Use exact: true
// ❌ Finds both "Acceleration" and "De-Acceleration"
this.page.getByText('Acceleration');

// ✅ Finds only exact match
this.page.getByText('Acceleration', { exact: true });

// Fix 2: Use .first()
this.page.getByText('Video Events').first();

// Fix 3: Use more specific locator
// ❌ Too generic
this.page.getByText('Save');

// ✅ More specific
this.page.getByRole('button', { name: 'Save', exact: true });
```

---

### 4. Wrong URL / Page Not Loading

**Error:**
```
Error: expect(page).toHaveURL(expected) failed
Expected: "https://my.geotab.com/#addin-..."
Received: "https://my.geotab.com/surftesting_ordernow/#addin-..."
```

**Cause:** Using string instead of regex for URL check.

**Fix:**
```typescript
// ❌ String doesn't match full URL with database
await expect(page).toHaveURL(ROUTES.PLUGIN.VEHICLES);

// ✅ Regex matches anywhere in URL
await expect(page).toHaveURL(/#addin-surfsight_staging-vehicles/i);
```

---

### 5. Unknown Fixture Parameter

**Error:**
```
Error: beforeEach hook has unknown parameter "vehiclesListPage"
```

**Cause:** Test imports from wrong location or fixture not registered.

**Fix:**
```typescript
// ❌ Wrong import (base playwright test)
import { test, expect } from '@playwright/test';

// ✅ Correct import (our extended test)
import { test, expect } from '../../fixtures';
```

Also check `fixtures/test-fixtures.ts` has the fixture defined:
```typescript
type PageFixtures = {
  vehiclesListPage: VehiclesListPage;  // ← Must be here
};
```

---

### 6. Flaky Tests (Sometimes Pass, Sometimes Fail)

**Symptoms:** Test passes locally but fails in CI, or fails randomly.

**Causes & Fixes:**

```typescript
// Fix 1: Add explicit waits after clicks
// ❌ Click then immediately check
await menuButton.click();
await expect(menuItem).toBeVisible();  // May fail - menu animating

// ✅ Use clickAndWait for animated menus
import { clickAndWait } from '../../utils/wait';
await clickAndWait(menuButton, 1000);  // Wait 1 sec after click
await expect(menuItem).toBeVisible({ timeout: TIMEOUTS.MEDIUM });

// Fix 2: Wait for first element before checking all
await expect(dashboardPage.getVehiclesButton()).toBeVisible({
  timeout: TIMEOUTS.LONG  // ← Wait for menu to expand
});
// Now safe to check other items
for (const item of menuItems) {
  await expect(item).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
}

// Fix 3: Use domcontentloaded instead of networkidle
// ❌ Too slow and sometimes times out
await page.waitForLoadState('networkidle');

// ✅ Faster and more reliable
await page.waitForLoadState('domcontentloaded');
```

---

### 7. Cannot Find Module / Import Error

**Error:**
```
Error: Cannot find module '../../fixtures'
```

**Fix:** Check import path depth:

```typescript
// File location: tests/vehicles/mytest.spec.ts
import { test, expect } from '../../fixtures';  // ✅ Two levels up

// File location: tests/mytest.spec.ts
import { test, expect } from '../fixtures';     // ✅ One level up
```

---

### 8. Modal / Dropdown Not Found

**Error:**
```
Error: expect(locator).toBeVisible() failed
Locator: getByText('Navigation Rules')
Expected: visible
```

**Cause:** Wrong class used for modal/dropdown.

**Fix:** Check what the element actually looks like in DevTools:

```typescript
// ❌ Wrong - uses modal title that doesn't exist
const modal = new NavigationRulesModal(page);
await modal.waitForModal();  // Looks for "Navigation Rules" text

// ✅ Correct - uses actual dropdown class
const dropdown = new EventsDateDropdown(page);
await dropdown.waitForDropdown();  // Looks for "Today" option
```

---

### 9. Checkbox / Button Not Clickable

**Error:**
```
Error: element is not visible
Locator: input[type="checkbox"]
```

**Cause:** Hidden input behind styled element.

**Fix:**
```typescript
// ❌ Hidden input element
vehicle.row.locator('input[type="checkbox"]');

// ✅ Visible styled checkbox wrapper
vehicle.row.locator('span.surf-checkbox');

// ✅ For On/Off buttons (Video Rules)
row.locator('div.surf-button', { hasText: 'On' }).first();
```

---

### 10. Test Runs But Nothing Happens

**Symptoms:** Test passes but UI doesn't change.

**Cause:** Locator found element but it's the wrong one.

**Fix:** Use `--headed` mode to see what's happening:

```bash
npx playwright test tests/mytest.spec.ts --headed --slow-mo 1000
```

`--slow-mo 1000` adds 1 second delay between actions.

---

### 11. Tests Run in Wrong Order

**Cause:** Tests are parallel by default.

**Fix:** Use serial mode:

```typescript
test.describe('My Tests', () => {
  test.describe.configure({ mode: 'serial' });  // ← Add this
  
  test('test 1', ...);
  test('test 2', ...);  // Runs after test 1
});
```

---

### 12. beforeEach Variable Not Available in Test

**Error:**
```
TypeError: Cannot read property 'xxx' of undefined
```

**Cause:** Variable declared inside `beforeEach` scope.

**Fix:**
```typescript
test.describe('Tests', () => {
  
  // ❌ Wrong - variable inside beforeEach (not accessible in tests)
  test.beforeEach(async ({ vehiclesListPage }) => {
    const vehicle = await vehiclesListPage.findVehicleByName(...);
  });
  
  test('test', async () => {
    await vehicle.openSettings();  // ❌ vehicle is undefined here!
  });
  
  // ✅ Correct - declare outside beforeEach
  let vehicle: VehicleRow;  // ← Declare here
  
  test.beforeEach(async ({ vehiclesListPage }) => {
    vehicle = await vehiclesListPage.findVehicleByName(...);  // ← Assign here
  });
  
  test('test', async () => {
    await vehicle.openSettings();  // ✅ Works!
  });
});
```

---

## 🔍 Debugging Techniques

### 1. Playwright Inspector (Best Tool)

```bash
npx playwright test tests/mytest.spec.ts --debug
```

Opens interactive UI to:
- Step through test
- See element highlights
- Inspect locators
- Check page state

---

### 2. Headed Mode + Slow Motion

```bash
# See what browser is doing
npx playwright test tests/mytest.spec.ts --headed

# Slow it down
npx playwright test tests/mytest.spec.ts --headed --slow-mo 500
```

---

### 3. Screenshot on Failure

Already configured in `playwright.config.ts`:
```typescript
screenshot: 'only-on-failure'
```

Find screenshots in:
```
test-results/
└── test-name/
    └── test-failed-1.png  ← Screenshot of failure
```

---

### 4. Console Logging

Add logs to your tests:

```typescript
test('test', async ({ vehiclesListPage }) => {
  console.log('🔍 Finding vehicle...');
  const vehicle = await vehiclesListPage.findVehicleByName(...);
  console.log('✅ Vehicle found:', await vehicle.getCameraName());
  
  console.log('🔍 Opening modal...');
  const modal = await vehicle.openSettings();
  console.log('✅ Modal opened');
});
```

---

### 5. Pause Test Execution

```typescript
test('test', async ({ page, vehiclesListPage }) => {
  const vehicle = await vehiclesListPage.findVehicleByName(...);
  
  await page.pause();  // ← Browser pauses here, open Inspector
  
  const modal = await vehicle.openSettings();
});
```

---

### 6. Check Current URL

```typescript
test('test', async ({ page }) => {
  console.log('Current URL:', page.url());
  
  // After navigation
  await page.goto('/somewhere');
  console.log('New URL:', page.url());
});
```

---

## 📋 Error Reference Table

| Error | Cause | Fix |
|-------|-------|-----|
| `element(s) not found` | Wrong selector or page not loaded | Add timeout, check selector |
| `strict mode violation` | Multiple elements found | Use `exact: true` or `.first()` |
| `unknown fixture parameter` | Wrong import path | Import from `../../fixtures` |
| `toHaveURL failed` | String vs full URL | Use regex `/pattern/i` |
| `not visible` | Hidden element | Find visible parent element |
| `variable undefined` | Scope issue in beforeEach | Declare `let` outside beforeEach |
| `timeout exceeded` | Slow page or wrong element | Increase timeout, check selector |
| `Cannot find module` | Wrong import path | Fix relative path `../../` |

---

## ✅ Before Asking for Help

Run through this checklist:

- [ ] Checked error message carefully
- [ ] Ran test in `--headed` mode
- [ ] Checked element in DevTools
- [ ] Verified import paths
- [ ] Checked `.env` credentials
- [ ] Tried `--debug` mode
- [ ] Checked screenshots in `test-results/`

---

## 🆘 Still Stuck?

1. **Check existing tests** for similar patterns
2. **Check DevTools** for correct selectors
3. **Ask the team** with:
   - Error message
   - Test code
   - Screenshot
   - What you already tried

---

**Back to:** [WRITING-TESTS.md](./WRITING-TESTS.md) | [QUICK-START.md](./QUICK-START.md)
