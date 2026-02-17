# ✍️ Writing Tests Guide

Complete guide to writing tests in Geotab-PW project.

---

## 📋 Table of Contents

1. [Test Structure](#test-structure)
2. [Using Fixtures](#using-fixtures)
3. [Working with Page Objects](#working-with-page-objects)
4. [Working with Modals](#working-with-modals)
5. [Test Data](#test-data)
6. [Assertions](#assertions)
7. [Wait Strategies](#wait-strategies)
8. [Real Examples](#real-examples)
9. [Best Practices](#best-practices)

---

## 1. Test Structure

### Basic Template

```typescript
import { test, expect } from '../fixtures';           // Always import from fixtures
import { TEST_DEVICES } from '../fixtures';           // Test data
import { TIMEOUTS } from '../constants/timeouts';     // Timeouts

test.describe('Feature Name - Description', () => {
  
  test('SOT-XXXX | should do something @regression', 
    async ({ vehiclesListPage }) => {   // ← Fixture provides ready page
    
    // 1. Action
    const vehicle = await vehiclesListPage.findVehicleByName(
      TEST_DEVICES.DEVICE_12.name
    );
    
    // 2. Verify
    await expect(vehicle.settingsButton).toBeVisible();
    
    // 3. Log
    console.log('✅ Test passed');
  });
});
```

### Naming Convention

```typescript
// Format: 'SOT-[ticket] | should [action] @[tag]'
test('SOT-6851 | should verify dashboard loads @regression', ...)
test('SOT-6852 | should find vehicle by name @smoke', ...)
test('SOT-6853 | should open settings modal @critical', ...)
```

### Serial Mode (for dependent tests)

```typescript
test.describe('Settings Verification', () => {
  test.describe.configure({ mode: 'serial' });  // ← Run tests in order
  
  let vehicle: VehicleRow;  // ← Share state between tests
  
  test.beforeEach(async ({ vehiclesListPage }) => {
    vehicle = await vehiclesListPage.findVehicleByName(
      TEST_DEVICES.DEVICE_12.name
    );
  });
  
  test('test 1', async () => { ... });
  test('test 2', async () => { ... });  // Uses same vehicle
});
```

---

## 2. Using Fixtures

### Available Fixtures

```typescript
test('test', async ({ 
  page,               // Raw Playwright page
  dashboardPage,      // Dashboard (auto-navigated)
  vehiclesListPage,   // Vehicles page (auto-navigated)
  eventsListPage,     // Events page (auto-navigated)
  recordingsListPage, // Recordings page (auto-navigated)
  videoRulesListPage, // Video Rules page (auto-navigated)
  database            // Database name from .env
}) => { ... });
```

### Using Single Fixture

```typescript
// ✅ Just add what you need
test('test', async ({ vehiclesListPage }) => {
  // Already on vehicles page!
  await expect(vehiclesListPage.pageTitle).toBeVisible();
});
```

### Using Multiple Fixtures

```typescript
// ✅ Combine fixtures when needed
test('test', async ({ page, vehiclesListPage }) => {
  await expect(page).toHaveURL(/#addin-surfsight_staging-vehicles/i);
  await expect(vehiclesListPage.pageTitle).toBeVisible();
});
```

### What Fixtures Do For You

```typescript
// Without fixture (manual setup):
test('test', async ({ page }) => {
  await page.goto('https://my.geotab.com/surftesting_ordernow/#addin-surfsight_staging-vehicles');
  await page.waitForLoadState('domcontentloaded');
  const firstRow = page.getByRole('row').first();
  await firstRow.waitFor({ state: 'visible', timeout: 30000 });
  const vehiclesListPage = new VehiclesListPage(page);
  // Now we can use it...
});

// With fixture (automatic setup):
test('test', async ({ vehiclesListPage }) => {
  // All of the above happens automatically!
  // Just use vehiclesListPage directly
});
```

---

## 3. Working with Page Objects

### Vehicles Page

```typescript
test('vehicles test', async ({ vehiclesListPage }) => {
  
  // ── Find vehicle ──────────────────────────────
  const vehicle = await vehiclesListPage.findVehicleByName(
    TEST_DEVICES.DEVICE_12.name
  );
  
  // ── Select with checkbox (for bulk actions) ───
  await vehicle.selectCheckbox();
  
  // ── Verify row buttons ────────────────────────
  await vehicle.verifyAllButtonsVisible();
  
  // ── Open modals ───────────────────────────────
  const settingsModal = await vehicle.openSettings();
  const rulesModal = await vehicle.openCameraRules();
  const dataModal = await vehicle.openDataUsage();
  
  // ── Bulk actions (after selectCheckbox) ───────
  await vehiclesListPage.bulkEditCameraRulesButton.click();
  await vehiclesListPage.bulkEditCameraSettingsButton.click();
  
  // ── Toolbar buttons ───────────────────────────
  await expect(vehiclesListPage.addCameraButton).toBeVisible();
  await expect(vehiclesListPage.updateSettingsButton).toBeVisible();
});
```

### Events Page

```typescript
test('events test', async ({ eventsListPage }) => {
  
  // ── Find camera ───────────────────────────────
  const camera = await eventsListPage.findCameraByName(
    TEST_DEVICES.DEVICE_12.name
  );
  
  // ── Open options dropdown ─────────────────────
  const dropdown = await camera.openOptionsMenu();
  
  // ── Verify date options ───────────────────────
  await dropdown.verifyAllDateOptionsVisible();
  
  // ── Select date option ────────────────────────
  await camera.selectDateOption('Today');
  await camera.selectDateOption('Last 7 Days');
  await camera.selectDateOption('Last Month');
  
  // ── Close without selecting ───────────────────
  await dropdown.close();
});
```

### Video Rules Page

```typescript
test('video rules test', async ({ videoRulesListPage }) => {
  
  // ── Toolbar buttons ───────────────────────────
  await expect(videoRulesListPage.saveButton).toBeVisible();
  await expect(videoRulesListPage.helpButton).toBeVisible();
  
  // ── Find rule ─────────────────────────────────
  const rule = await videoRulesListPage.findRuleByName('Speeding');
  
  // ── Verify On/Off buttons ─────────────────────
  await expect(rule.onButton).toBeVisible();
  await expect(rule.offButton).toBeVisible();
  
  // ── Toggle rule ───────────────────────────────
  await rule.turnOn();
  await rule.turnOff();
  
  // ── Save changes ──────────────────────────────
  await videoRulesListPage.clickSave();
});
```

### Dashboard Page

```typescript
test('dashboard test', async ({ dashboardPage }) => {
  
  // ── Verify dashboard ──────────────────────────
  expect(await dashboardPage.isOnDashboard()).toBeTruthy();
  
  // ── Open Add-Ins menu ─────────────────────────
  await dashboardPage.openAddInsMenu();
  
  // ── Verify menu items ─────────────────────────
  await dashboardPage.verifyAllAddInsMenuItems();
  
  // ── Navigate to pages ─────────────────────────
  await dashboardPage.navigateToVehicles();
  await dashboardPage.navigateToEvents();
  await dashboardPage.navigateToRecordings();
  await dashboardPage.navigateToVideoRules();
});
```

---

## 4. Working with Modals

### Pattern: Open → Verify → Close

```typescript
test('modal test', async ({ vehiclesListPage }) => {
  const vehicle = await vehiclesListPage.findVehicleByName(
    TEST_DEVICES.DEVICE_12.name
  );
  
  // ── Settings Modal ────────────────────────────
  const settingsModal = await vehicle.openSettings();
  await settingsModal.verifyAllButtonsVisible();
  await settingsModal.close();
  
  // ── Camera Rules Modal ────────────────────────
  const rulesModal = await vehicle.openCameraRules();
  await rulesModal.waitForModal();
  expect(await rulesModal.isModalOpen()).toBeTruthy();
  await rulesModal.close();
  
  // ── Data Usage Modal ──────────────────────────
  const dataModal = await vehicle.openDataUsage();
  await dataModal.waitForModal();
  await dataModal.close();
});
```

### Bulk Edit Modals

```typescript
test('bulk modal test', async ({ vehiclesListPage }) => {
  
  // 1. Select camera with checkbox
  const vehicle = await vehiclesListPage.findVehicleByName(
    TEST_DEVICES.DEVICE_12.name
  );
  await vehicle.selectCheckbox();
  
  // 2. Open Bulk Edit Camera Rules
  await vehiclesListPage.bulkEditCameraRulesButton.click();
  
  const bulkRulesModal = new BulkEditCameraRulesModal(page);
  await bulkRulesModal.waitForModal();
  await bulkRulesModal.verifyAllEventRulesVisible();
  await bulkRulesModal.close();
  
  // 3. Open Bulk Edit Camera Settings
  await vehicle.selectCheckbox();  // re-select
  await vehiclesListPage.bulkEditCameraSettingsButton.click();
  
  const bulkSettingsModal = new BulkEditCameraSettingsModal(page);
  await bulkSettingsModal.waitForModal();
  await bulkSettingsModal.verifyAllCameraSettingsVisible();
  await bulkSettingsModal.close();
});
```

---

## 5. Test Data

### Using TEST_DEVICES

```typescript
import { TEST_DEVICES } from '../fixtures';

// Available devices:
TEST_DEVICES.DEVICE_12.name   // 'AlexL - 3.12.X'
TEST_DEVICES.DEVICE_14.name   // 'AlexL-AI14'
TEST_DEVICES.DEVICE_11.name   // 'Alex - 3.11.X'
```

### Using ROUTES

```typescript
import { ROUTES } from '../constants/routes';

// Available routes:
ROUTES.DASHBOARD                    // '#dashboard'
ROUTES.PLUGIN.VEHICLES              // '#addin-surfsight_staging-vehicles'
ROUTES.PLUGIN.EVENTS                // '#addin-surfsight_staging-vehicleEvents'
ROUTES.PLUGIN.RECORDINGS            // '#addin-surfsight_staging-recordings'
ROUTES.PLUGIN.VIDEO_RULES           // '#addin-surfsight_staging-videoRules'
```

### Using TIMEOUTS

```typescript
import { TIMEOUTS } from '../constants/timeouts';

TIMEOUTS.SHORT      // 5000ms  - Quick checks
TIMEOUTS.MEDIUM     // 10000ms - Normal operations
TIMEOUTS.LONG       // 15000ms - Slow operations
TIMEOUTS.VERY_LONG  // 30000ms - Page loads, heavy operations
```

---

## 6. Assertions

### URL Verification

```typescript
// ✅ Use regex - works with full URL
await expect(page).toHaveURL(/#addin-surfsight_staging-vehicles/i);

// ❌ Don't use string - misses database prefix
await expect(page).toHaveURL(ROUTES.PLUGIN.VEHICLES);
```

### Element Visibility

```typescript
// Check visible with timeout
await expect(element).toBeVisible({ timeout: TIMEOUTS.MEDIUM });

// Check hidden
await expect(element).toBeHidden({ timeout: TIMEOUTS.SHORT });

// Check exists (not necessarily visible)
await expect(element).toBeAttached();
```

### Text Content

```typescript
// Contains text
await expect(element).toContainText('Camera Name');

// Exact text
await expect(element).toHaveText('Camera Name');
```

### Boolean Checks

```typescript
// Check truthiness
expect(await dashboardPage.isOnDashboard()).toBeTruthy();
expect(await modal.isModalOpen()).toBeTruthy();
expect(await rule.isEnabled()).toBeFalsy();
```

### Multiple Elements

```typescript
// Check list of elements
const buttons = [
  vehiclesListPage.addCameraButton,
  vehiclesListPage.updateSettingsButton,
  vehiclesListPage.userAccessButton,
];

for (const button of buttons) {
  await expect(button).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
}
```

---

## 7. Wait Strategies

### Use Fixtures (Best)

```typescript
// Fixture handles waiting automatically
test('test', async ({ vehiclesListPage }) => {
  // Page is already loaded and ready!
});
```

### Use Built-in Waits (Good)

```typescript
// Wait for element
await expect(element).toBeVisible({ timeout: TIMEOUTS.LONG });

// Wait for URL
await expect(page).toHaveURL(/pattern/);

// Wait for load state
await page.waitForLoadState('domcontentloaded');
```

### Use Utility Functions (When Needed)

```typescript
import { waitForPageLoad, safeClick, clickAndWait } from '../utils/wait';

// Safe click (waits for visibility first)
await safeClick(button, TIMEOUTS.MEDIUM);

// Click and wait (for menus that animate)
await clickAndWait(menuButton, 1000);

// Wait for multiple elements
await waitForMultipleVisible([button1, button2, button3]);
```

### ⚠️ Avoid These Anti-Patterns

```typescript
// ❌ Hardcoded sleep - fragile and slow
await page.waitForTimeout(3000);

// ❌ networkidle - too slow for most cases
await page.waitForLoadState('networkidle');

// ❌ No timeout - uses default 5 seconds (may be too short)
await expect(element).toBeVisible();

// ✅ Instead use explicit timeout
await expect(element).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
```

---

## 8. Real Examples

### Example 1: Verify Vehicles Page Buttons

```typescript
import { test, expect } from '../../fixtures';
import { TEST_DEVICES } from '../../fixtures';
import { VehicleRow } from '../../pages/vehicles/VehicleRow';
import { TIMEOUTS } from '../../constants/timeouts';

test.describe('Vehicles Page - Button Verification', () => {
  test.describe.configure({ mode: 'serial' });
  
  let vehicle: VehicleRow;
  
  test.beforeEach(async ({ vehiclesListPage }) => {
    vehicle = await vehiclesListPage.findVehicleByName(
      TEST_DEVICES.DEVICE_12.name
    );
  });

  test('SOT-XXXX | should verify all row buttons @regression', async () => {
    await vehicle.verifyAllButtonsVisible();
    console.log('✅ All row buttons verified');
  });

  test('SOT-XXXX | should open settings modal @regression', async () => {
    const modal = await vehicle.openSettings();
    await modal.verifyAllButtonsVisible();
    await modal.close();
    console.log('✅ Settings modal verified');
  });

  test('SOT-XXXX | should open camera rules modal @regression', async () => {
    const modal = await vehicle.openCameraRules();
    await modal.waitForModal();
    expect(await modal.isModalOpen()).toBeTruthy();
    await modal.close();
    console.log('✅ Camera rules modal verified');
  });
});
```

### Example 2: Verify Video Rules

```typescript
import { test, expect } from '../../fixtures';
import { TIMEOUTS } from '../../constants/timeouts';

test.describe('Video Rules Page - Verification', () => {

  test('SOT-XXXX | should verify page loads @regression',
    async ({ page, videoRulesListPage }) => {
    await expect(page).toHaveURL(/#addin-surfsight_staging-videoRules/i);
    await expect(videoRulesListPage.pageTitle).toBeVisible();
    console.log('✅ Video Rules page verified');
  });

  test('SOT-XXXX | should verify rule toggle @regression',
    async ({ videoRulesListPage }) => {
    const rule = await videoRulesListPage.findRuleByName('Speeding');
    
    await expect(rule.onButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await expect(rule.offButton).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    
    await rule.turnOn();
    await rule.turnOff();
    await videoRulesListPage.clickSave();
    
    console.log('✅ Rule toggle verified');
  });
});
```

### Example 3: Verify Events Date Options

```typescript
import { test, expect } from '../../fixtures';
import { TEST_DEVICES } from '../../fixtures';

test.describe('Events Page - Date Options', () => {

  test('SOT-XXXX | should verify all date options @regression',
    async ({ eventsListPage }) => {
    
    const camera = await eventsListPage.findCameraByName(
      TEST_DEVICES.DEVICE_12.name
    );
    
    const dropdown = await camera.openOptionsMenu();
    await dropdown.verifyAllDateOptionsVisible();
    await dropdown.close();
    
    console.log('✅ All date options verified');
  });

  test('SOT-XXXX | should navigate to events for Today @regression',
    async ({ page, eventsListPage }) => {
    
    const camera = await eventsListPage.findCameraByName(
      TEST_DEVICES.DEVICE_12.name
    );
    
    await camera.selectDateOption('Today');
    
    await expect(page).toHaveURL(/vehicleEvents/);
    
    console.log('✅ Events for Today loaded');
  });
});
```

---

## 9. Best Practices

### ✅ DO

```typescript
// 1. Use fixtures for page initialization
test('test', async ({ vehiclesListPage }) => { ... });

// 2. Use TEST_DEVICES for test data
await vehiclesListPage.findVehicleByName(TEST_DEVICES.DEVICE_12.name);

// 3. Use TIMEOUTS constants
await expect(element).toBeVisible({ timeout: TIMEOUTS.MEDIUM });

// 4. Use regex for URL checks
await expect(page).toHaveURL(/#addin-surfsight_staging-vehicles/i);

// 5. Always close modals
const modal = await vehicle.openSettings();
await modal.close();  // ← Always close!

// 6. Add console.log at end
console.log('✅ Test name: PASSED');

// 7. Use serial mode when tests share state
test.describe.configure({ mode: 'serial' });

// 8. Use let for shared variables in serial tests
let vehicle: VehicleRow;
test.beforeEach(async ({ vehiclesListPage }) => {
  vehicle = await vehiclesListPage.findVehicleByName(...);
});
```

### ❌ DON'T

```typescript
// 1. Don't hardcode device names
await vehiclesListPage.findVehicleByName('AlexL - 3.12.X');  // ❌
await vehiclesListPage.findVehicleByName(TEST_DEVICES.DEVICE_12.name);  // ✅

// 2. Don't use waitForTimeout
await page.waitForTimeout(3000);  // ❌ Fragile!
await expect(element).toBeVisible({ timeout: TIMEOUTS.MEDIUM });  // ✅

// 3. Don't repeat findVehicleByName in each test
test('test 1', async ({ vehiclesListPage }) => {
  const vehicle = await vehiclesListPage.findVehicleByName(...);  // ❌ Duplicate
});
test('test 2', async ({ vehiclesListPage }) => {
  const vehicle = await vehiclesListPage.findVehicleByName(...);  // ❌ Duplicate
});

// ✅ Use beforeEach instead
let vehicle: VehicleRow;
test.beforeEach(async ({ vehiclesListPage }) => {
  vehicle = await vehiclesListPage.findVehicleByName(...);  // ✅ Once
});

// 4. Don't import page objects directly (use fixtures)
import { VehiclesListPage } from '../pages/vehicles/VehiclesListPage';  // ❌
test('test', async ({ vehiclesListPage }) => { ... });  // ✅

// 5. Don't check URL with string
await expect(page).toHaveURL(ROUTES.PLUGIN.VEHICLES);  // ❌ Missing database
await expect(page).toHaveURL(/#addin-surfsight_staging-vehicles/i);  // ✅
```

---

## 📝 Quick Reference

### Test Template

```typescript
import { test, expect } from '../../fixtures';
import { TEST_DEVICES } from '../../fixtures';
import { VehicleRow } from '../../pages/vehicles/VehicleRow';
import { TIMEOUTS } from '../../constants/timeouts';

test.describe('Module - Feature', () => {
  test.describe.configure({ mode: 'serial' });
  let vehicle: VehicleRow;

  test.beforeEach(async ({ vehiclesListPage }) => {
    vehicle = await vehiclesListPage.findVehicleByName(
      TEST_DEVICES.DEVICE_12.name
    );
  });

  test('SOT-XXXX | should do something @regression', async () => {
    // Action
    const modal = await vehicle.openSettings();
    
    // Verify
    await modal.verifyAllButtonsVisible();
    
    // Cleanup
    await modal.close();
    
    console.log('✅ Test passed');
  });
});
```

### Command Cheat Sheet

```bash
# Run all
npm test

# Run file
npx playwright test tests/vehicles/vehiclesPage.spec.ts

# Run by name
npx playwright test -g "should verify title"

# Run by tag
npx playwright test --grep @regression

# Debug
npx playwright test --debug

# List tests
npx playwright test --list

# Show report
npx playwright show-report
```

---

**Next:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
