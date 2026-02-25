import { test, TEST_DEVICES } from '../../fixtures';
import { waitForPageLoad } from '../../utils/wait';
import { SurfsightApi } from '../../utils/surfsightApi';
import { EnvConfig } from '../../utils/env';
import { LiveVideoPlayer } from '../../pages/vehicles/LiveVideoPlayer';
import { VehicleRow } from '../../pages/vehicles/VehicleRow';

test.describe('Live Stream Wake Up', () => {
  test.describe.configure({ mode: 'serial' });
        let vehicle: VehicleRow;

  test.beforeEach(async ({ vehiclesListPage }) => {
    // Wait for network idle so device statuses are fully loaded from the API
    await waitForPageLoad(vehiclesListPage.page, 'networkidle');
    vehicle = await vehiclesListPage.findVehicleByName(TEST_DEVICES.DEVICE_11.name);
  });

  test('SOT-6951 | E2E Live Stream test - should wake up standby device and verify live stream @regression', async ({ vehiclesListPage, page }) => {
    // This test may wait up to 5 minutes for the device to come online
    test.setTimeout(360000);

    // ── Step 1: Open Vehicles page and find the target device ──────────────
    // (handled in beforeEach)

    // ── Step 2: Verify device status ───────────────────────────────────────
    const initialStatus = await vehicle.getDeviceStatus();
    console.log(`Device "${TEST_DEVICES.DEVICE_11.name}" initial status: ${initialStatus}`);

    // Offline devices cannot be woken up — skip with a clear message
    test.skip(
      initialStatus === 'Offline',
      `Device "${TEST_DEVICES.DEVICE_11.name}" is Offline. Wake-up is not supported for offline devices.`
    );

    // ── Step 3 & 4: If Standby, send wake-up and poll until Online ─────────
    if (initialStatus === 'Standby') {
      const imei = await vehicle.getImei();
      console.log(`Device IMEI: ${imei}`);

      // Authenticate as super admin
      const api = new SurfsightApi(EnvConfig.getSurfsightApiUrl());
      const token = await api.authenticate(
        EnvConfig.getSuperAdminEmail(),
        EnvConfig.getSuperAdminPassword(),
      );
      console.log('Super admin authentication: OK');

      // Send wake-up request (expects 200 OK)
      await api.wakeUpDevice(token, imei);
      console.log('Wake-up request: 200 OK');

      // Poll status every 10 seconds until Online (max 5 minutes)
      const onlineVehicle = await vehiclesListPage.waitForDeviceOnline(
        TEST_DEVICES.DEVICE_11.name,
        300000,
        10000,
      );
      console.log(`Device is now Online`);

      // Re-assign vehicle reference after page reloads during polling
      Object.assign(vehicle, onlineVehicle);
    }

    // ── Step 5: Device is Online — click the Live Stream dropdown ──────────
    const onlineVehicle = await vehiclesListPage.findVehicleByName(TEST_DEVICES.DEVICE_11.name);
    await onlineVehicle.openLiveStreamDropdown();

    // ── Step 6: Find the first activated (enabled) camera and click it ─────
    await onlineVehicle.clickFirstEnabledCameraOption();

    // ── Step 7: Verify video player has opened ─────────────────────────────
    const player = new LiveVideoPlayer(page);
    await player.waitForPlayerVisible();
    await player.verifyWebRtcLabel();

    console.log('✅ Live stream player opened successfully (WebRTC verified)');
  });

});
