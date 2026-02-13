/**
 * Type definitions for devices and related entities
 */

/**
 * Device/Vehicle information
 */
export interface Device {
  name: string;
  serialNumber?: string;
  model?: string;
  imei?: string;
}

/**
 * Available device actions in the UI
 */
export type DeviceAction = 
  | 'settings'
  | 'cameraRules'
  | 'dataUsage'
  | 'unpair'
  | 'liveStream';

/**
 * Device settings modal actions
 */
export type DeviceSettingsAction =
  | 'calibrate'
  | 'formatSD'
  | 'reboot'
  | 'info';

/**
 * Device status
 */
export type DeviceStatus =
  | 'online'
  | 'offline'
  | 'standby';
