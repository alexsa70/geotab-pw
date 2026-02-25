/**
 * Surfsight API helper
 * Handles authentication and device wake-up calls
 */

export class SurfsightApi {
  constructor(private readonly baseUrl: string) {}

  /**
   * Authenticate as super admin and return bearer token
   */
  async authenticate(email: string, password: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/v2/authenticate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    return json.data.token as string;
  }

  /**
   * Send wake-up request for a device
   * @param token - Bearer token from authenticate()
   * @param deviceImei - Device IMEI (serial number)
   */
  async wakeUpDevice(token: string, deviceImei: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/v2/devices/${deviceImei}/wakeup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-request-id': crypto.randomUUID(),
      },
    });

    if (response.status !== 200) {
      throw new Error(`Wake-up failed: ${response.status} ${response.statusText}`);
    }
  }
}
