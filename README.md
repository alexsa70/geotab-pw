# 🚀 Geotab-PW - SurfSight Plugin Test Automation

Automated E2E testing for SurfSight plugin in MyGeotab using Playwright + TypeScript.

---

## ⚡ Quick Start (5 minutes)

```bash
# 1. Install dependencies
npm install
npx playwright install

# 2. Configure credentials
cp .env.example .env
# Edit .env with your credentials

# 3. Run tests
npm test
```

**See [QUICK-START.md](./docs/QUICK-START.md) for detailed setup.**

---

## 📋 What's Tested

- ✅ **Vehicles** - Camera management, settings, bulk operations
- ✅ **Events** - Video events, date filtering
- ✅ **Recordings** - Video recordings management
- ✅ **Video Rules** - Geotab video rules configuration

---

## 🏗️ Project Structure

```
Geotab-PW/
├── pages/          # Page Object Models
│   ├── vehicles/
│   ├── events/
│   ├── recordings/
│   ├── video-rules/
│   └── modals/
├── fixtures/       # Test fixtures & data
├── tests/          # Test files
├── constants/      # Routes, timeouts
└── utils/          # Helper functions
```

---

## 📖 Documentation

**Start Here:**
1. [Quick Start](./docs/QUICK-START.md) - Setup & run in 10 minutes
2. [Writing Tests](./docs/WRITING-TESTS.md) - How to write tests with examples
3. [Troubleshooting](./docs/TROUBLESHOOTING.md) - Common issues & fixes

**Architecture (optional):**
- [Architecture Overview](./docs/ARCHITECTURE.md) - If you want to understand internals

---

## 🎯 Example Test

```typescript
import { test, expect } from '../fixtures';
import { TEST_DEVICES } from '../fixtures';

test('should verify vehicle settings', async ({ vehiclesListPage }) => {
  // Find vehicle
  const vehicle = await vehiclesListPage.findVehicleByName(
    TEST_DEVICES.DEVICE_12.name
  );
  
  // Open settings
  const modal = await vehicle.openSettings();
  
  // Verify
  await modal.verifyAllButtonsVisible();
  await modal.close();
});
```

---

## 🛠️ Common Commands

```bash
# Run all tests
npm test

# Run specific test file
npx playwright test tests/vehicles/vehiclesPage.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Show HTML report
npx playwright show-report

# List all tests
npx playwright test --list
```

---

## 📊 Test Results

- **HTML Report**: Auto-opens after test run
- **Screenshots**: `test-results/` folder (only on failure)
- **Videos**: `test-results/` folder (only on failure)
- **Console logs**: Live during test execution

---

## 🔧 Configuration

- **Environment**: `.env` file (credentials, database)
- **Playwright**: `playwright.config.ts` (browsers, timeouts)
- **TypeScript**: `tsconfig.json` (compiler options)

---

## 📝 Test Structure

```
tests/
├── auth.setup.ts       # Authentication (runs once)
├── vehicles/           # Vehicles page tests
├── events/             # Events page tests
├── recordings/         # Recordings page tests
└── rules/              # Video Rules tests
```

Each test uses **fixtures** for automatic page setup:

```typescript
test('test name', async ({ vehiclesListPage }) => {
  // vehiclesListPage is already initialized and on correct page!
});
```

---

## 🎨 Key Concepts

### 1. **Page Objects** 
Encapsulate page structure in classes:
```typescript
// pages/vehicles/VehiclesListPage.ts
export class VehiclesListPage {
  async findVehicleByName(name: string): Promise<VehicleRow> { ... }
}
```

### 2. **Fixtures**
Auto-setup for tests:
```typescript
// Fixture automatically goes to page
vehiclesListPage: async ({ page, database }, use) => { ... }
```

### 3. **Constants**
Centralized configuration:
```typescript
// constants/routes.ts
ROUTES.PLUGIN.VEHICLES = '#addin-surfsight_staging-vehicles'
```

---

## 🚨 Important Notes

### Authentication
- Tests use **global authentication** - login happens once in `auth.setup.ts`
- Auth state saved to `.auth/user.json`
- All tests reuse this state (fast!)

### Parallelization
- Currently set to **sequential** (workers: 1)
- Prevents race conditions on MyGeotab
- Can be increased if tests are independent

### Environment Variables
```env
GEOTAB_USERNAME=your_email@example.com
GEOTAB_PASSWORD=your_password
GEOTAB_DATABASE=surftesting_ordernow
```

⚠️ **Never commit `.env` file!**

---

## 🐛 Troubleshooting

### Tests won't run?
```bash
rm -rf node_modules package-lock.json
npm install
npx playwright install
```

### Authentication failing?
- Check credentials in `.env`
- Verify database name is correct
- Ensure account has access to SurfSight plugin

### Elements not found?
- Page might not be loaded - check `waitForPageLoad()`
- Selector might be wrong - use Playwright Inspector
- Element might be in iframe - check page structure

**See [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) for more.**

---

## 📞 Support

- 📧 Contact QA team for questions
- 📖 Read docs in `/docs` folder
- 🐛 Check troubleshooting guide first

---

## 🎓 Learning Path

**Day 1:** Setup & run tests (Quick Start)
**Day 2:** Write first test (Writing Tests guide)
**Day 3:** Understand Page Objects
**Week 2:** Add new test cases
**Month 2:** Extend framework with new pages

---

## ✅ Next Steps

1. ✅ Read [QUICK-START.md](./docs/QUICK-START.md)
2. ✅ Run existing tests to verify setup
3. ✅ Read [WRITING-TESTS.md](./docs/WRITING-TESTS.md)
4. ✅ Write your first test
5. ✅ Explore existing tests in `/tests` folder

---

**Last Updated:** February 2026  
**Maintained by:** QA Automation Team

Happy Testing! 🎉
