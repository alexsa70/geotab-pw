# 📘 TypeScript Types Reference

Complete guide to TypeScript types used in the Geotab-PW project.

---

## 📂 Structure

```
types/
├── device.types.ts    # Device/Camera related types
├── test.types.ts      # Test configuration types
└── index.ts           # Barrel exports (convenience)
```

---

## 🎯 Why Types?

TypeScript types provide:
- ✅ **Type Safety** - Catch errors at compile time
- ✅ **IDE Support** - Autocomplete and IntelliSense
- ✅ **Documentation** - Self-documenting code
- ✅ **Refactoring** - Safe code changes

---

## 📦 device.types.ts

Types for devices (cameras) and device-related operations.

### Device Interface

```typescript
export interface Device {
  name: string;           // Camera display name
  serialNumber?: string;  // Optional serial number
  model?: string;         // Camera model (e.g., '3.12.X')
  imei?: string;          // Optional IMEI
}
```

**Usage:**
```typescript
import type { Device } from '../types';

const camera: Device = {
  name: 'AlexL - 3.12.X',
  model: '3.12.X'
};
```

**Where used:**
- `fixtures/devices.ts` - Test device data
- Page Objects that work with device data

---

### DeviceAction Type

Available actions on a device row.

```typescript
export type DeviceAction = 
  | 'settings'      // Open settings modal
  | 'cameraRules'   // Open camera rules modal
  | 'dataUsage'     // Open data usage modal
  | 'unpair'        // Unpair camera
  | 'liveStream';   // Open live stream
```

**Usage:**
```typescript
import type { DeviceAction } from '../types';

async function performAction(action: DeviceAction) {
  // TypeScript ensures only valid actions
  if (action === 'settings') { ... }
}
```

**Where used:**
- `pages/vehicles/VehicleRow.ts` - Action methods
- Tests that interact with device actions

---

### DeviceSettingsAction Type

Actions available in device settings modal.

```typescript
export type DeviceSettingsAction =
  | 'calibrate'   // Calibrate camera
  | 'formatSD'    // Format SD card
  | 'reboot'      // Reboot camera
  | 'info';       // Show info
```

**Usage:**
```typescript
import type { DeviceSettingsAction } from '../types';

const modal = await vehicle.openSettings();
const action: DeviceSettingsAction = 'calibrate';
```

**Where used:**
- `pages/modals/DeviceSettingsModal.ts`
- Tests that interact with settings modal

---

### DeviceStatus Type

Camera connection status.

```typescript
export type DeviceStatus =
  | 'online'    // Camera is connected
  | 'offline'   // Camera is disconnected
  | 'standby';  // Camera is in standby mode
```

**Usage:**
```typescript
import type { DeviceStatus } from '../types';

const status: DeviceStatus = await vehicle.getStatus();
if (status === 'online') {
  // Can use live stream
}
```

**Where used:**
- Page Objects that display/check device status
- Tests that verify device connectivity

---

## 📦 test.types.ts

Types for test configuration and utilities.

### TestConfig Interface

Test configuration structure.

```typescript
export interface TestConfig {
  database: string;      // Database name (e.g., 'surftesting_ordernow')
  baseUrl: string;       // Base URL (e.g., 'https://my.geotab.com')
  testDevice?: Device;   // Optional default test device
}
```

**Usage:**
```typescript
import type { TestConfig } from '../types';

const config: TestConfig = {
  database: process.env.GEOTAB_DATABASE!,
  baseUrl: process.env.BASE_URL!
};
```

**Where used:**
- `utils/env.ts` - Environment configuration
- Test fixtures

---

### PageLoadState Type

Page load states for Playwright's `waitForLoadState()`.

```typescript
export type PageLoadState = 
  | 'load'              // Wait for 'load' event
  | 'domcontentloaded'  // Wait for DOMContentLoaded event (faster)
  | 'networkidle';      // Wait for network to be idle (slower)
```

**Usage:**
```typescript
import type { PageLoadState } from '../types';

export async function waitForPageLoad(
  page: Page, 
  state: PageLoadState = 'domcontentloaded'
): Promise<void> {
  await page.waitForLoadState(state);
}
```

**When to use:**
- `'domcontentloaded'` - Most cases (default, fast)
- `'networkidle'` - When page has dynamic content loading
- `'load'` - When you need all resources loaded

**Where used:**
- `utils/wait.ts` - Wait utilities
- Page Objects
- Test fixtures

---

### TestTag Type

Test tags for organizing and filtering test runs.

```typescript
export type TestTag = 
  | '@regression'  // Full regression tests
  | '@smoke'       // Quick smoke tests
  | '@critical'    // Critical path tests
  | '@slow';       // Slow-running tests
```

**Usage in tests:**
```typescript
import type { TestTag } from '../types';

test('SOT-6851 | should verify title @regression', async ({ ... }) => {
  // Test code
});
```

**Run tests by tag:**
```bash
# Run only regression tests
npx playwright test --grep @regression

# Run only smoke tests
npx playwright test --grep @smoke

# Exclude slow tests
npx playwright test --grep-invert @slow
```

**Where used:**
- All test files
- CI/CD pipelines for selective test runs

---

## 🔄 Importing Types

### Single Import
```typescript
import type { Device } from '../types/device.types';
import type { PageLoadState } from '../types/test.types';
```

### Barrel Import (Recommended)
```typescript
import type { Device, PageLoadState } from '../types';
```

### Import All
```typescript
import * as Types from '../types';

const device: Types.Device = { ... };
```

---

## 📝 Adding New Types

### Step 1: Choose File

- **Device-related?** → `device.types.ts`
- **Test-related?** → `test.types.ts`
- **New category?** → Create new file in `types/`

### Step 2: Define Type

```typescript
// types/device.types.ts

/**
 * New type with JSDoc comment
 */
export type MyNewType = 
  | 'option1'
  | 'option2'
  | 'option3';
```

### Step 3: Export (if new file)

```typescript
// types/index.ts
export * from './device.types';
export * from './test.types';
export * from './my-new-types';  // Add new export
```

### Step 4: Use in Code

```typescript
import type { MyNewType } from '../types';

function doSomething(option: MyNewType) {
  // Type-safe!
}
```

---

## 💡 Best Practices

### 1. Use `type` for Type Imports

```typescript
// ✅ Good - explicitly type-only import
import type { Device } from '../types';

// ❌ Avoid - could be value or type
import { Device } from '../types';
```

**Why:** Makes it clear it's only a type, helps with tree-shaking.

---

### 2. Prefer Union Types for Limited Options

```typescript
// ✅ Good - limited set of options
export type DeviceAction = 'settings' | 'cameraRules' | 'dataUsage';

// ❌ Avoid - too open-ended
export type DeviceAction = string;
```

---

### 3. Use Interfaces for Object Shapes

```typescript
// ✅ Good - object structure
export interface Device {
  name: string;
  model?: string;
}

// ❌ Avoid - use interface instead
export type Device = {
  name: string;
  model?: string;
};
```

---

### 4. Add JSDoc Comments

```typescript
/**
 * Device information
 * Used across fixtures and tests
 */
export interface Device {
  /** Camera display name (e.g., 'AlexL - 3.12.X') */
  name: string;
  
  /** Optional camera model */
  model?: string;
}
```

---

## 🔍 Common Patterns

### Optional Properties

```typescript
export interface Device {
  name: string;       // Required
  model?: string;     // Optional (can be undefined)
}

// Usage
const device: Device = { name: 'Camera 1' };  // ✅ Valid
const device2: Device = { name: 'Camera 2', model: '3.12.X' };  // ✅ Valid
```

---

### Union Types

```typescript
export type Status = 'online' | 'offline' | 'standby';

// Usage
let status: Status = 'online';   // ✅ Valid
status = 'connected';            // ❌ Error - not in union
```

---

### Extending Types

```typescript
// Base type
export interface Device {
  name: string;
}

// Extended type
export interface DetailedDevice extends Device {
  serialNumber: string;
  model: string;
}
```

---

## 🎯 Real-World Examples

### Example 1: Type-Safe Device Data

```typescript
// fixtures/devices.ts
import type { Device } from '../types';

export const TEST_DEVICES: Record<string, Device> = {
  DEVICE_12: {
    name: 'AlexL - 3.12.X',
    model: '3.12.X'
  },
  DEVICE_14: {
    name: 'AlexL-AI14',
    model: 'AI14'
  }
};
```

### Example 2: Type-Safe Page Load

```typescript
// utils/wait.ts
import type { Page } from '@playwright/test';
import type { PageLoadState } from '../types';

export async function waitForPageLoad(
  page: Page,
  state: PageLoadState = 'domcontentloaded'  // ✅ Type-safe parameter
): Promise<void> {
  await page.waitForLoadState(state);
}

// Usage in test
await waitForPageLoad(page, 'networkidle');  // ✅ Valid
await waitForPageLoad(page, 'invalid');      // ❌ TypeScript error
```

### Example 3: Type-Safe Actions

```typescript
// pages/vehicles/VehicleRow.ts
import type { DeviceAction } from '../types';

export class VehicleRow {
  async performAction(action: DeviceAction): Promise<void> {
    switch (action) {
      case 'settings':
        return this.openSettings();
      case 'cameraRules':
        return this.openCameraRules();
      // TypeScript ensures all cases covered
    }
  }
}
```

---

## 🐛 Troubleshooting

### "Cannot find module '../types'"

**Solution:** Check import path - might need `../../types`

```typescript
// If file is in tests/vehicles/
import type { Device } from '../../types';  // Two levels up
```

---

### "Type ... is not assignable to type ..."

**Solution:** Check if value matches type definition

```typescript
// ❌ Error
const status: DeviceStatus = 'connected';

// ✅ Fixed
const status: DeviceStatus = 'online';  // Use valid union value
```

---

### Types Not Showing in IDE

**Solution:** Restart TypeScript server in VS Code

- Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
- Type "TypeScript: Restart TS Server"
- Press Enter

---

## ✅ Quick Reference

```typescript
// Import types
import type { Device, PageLoadState, DeviceAction } from '../types';

// Define device
const camera: Device = {
  name: 'AlexL - 3.12.X',
  model: '3.12.X'
};

// Use page load state
await waitForPageLoad(page, 'domcontentloaded');

// Use device action
const action: DeviceAction = 'settings';
```

---

## 📚 Further Reading

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Playwright TypeScript Guide](https://playwright.dev/docs/test-typescript)

---

**Updated:** February 2026
