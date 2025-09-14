import type { ApiResult, CustomerApiClient } from '../../utils/ApiClient'
import {
	type KvmDdosChange,
	type KvmDdosChangeRequest,
	KvmDdosChangeRequestSchema,
	KvmDdosChangeSchema,
	type KvmDdosSettings,
	KvmDdosSettingsSchema,
} from '../schema'

export class Ddos {
	constructor(
		private apiClient: CustomerApiClient,
		private internalId: string,
	) {}

	/**
	 * Retrieves the DDoS protection settings for the specified KVM server.
	 *
	 * @returns {Promise<ApiResult<KvmDdosSettings>>} A promise that resolves to the DDoS settings.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/kvm/%3Ainternal_id/ddos | API Documentation}
	 */
	async getSettings(): Promise<ApiResult<KvmDdosSettings>> {
		return this.apiClient.get(
			`/api/kvm/${this.internalId}/ddos`,
			KvmDdosSettingsSchema,
		)
	}

	/**
	 * Changes the DDoS protection settings for the specified KVM server.
	 *
	 * @remarks
	 * Requires a **24fire+ subscription** to use it.
	 *
	 * @param {KvmDdosChangeRequest} body - The DDoS settings to be applied.
	 * @returns {Promise<ApiResult<KvmDdosChange>>} A promise that resolves to the result of the DDoS settings change.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/kvm/%3Ainternal_id/ddos/change | API Documentation}
	 */
	async change(body: KvmDdosChangeRequest): Promise<ApiResult<KvmDdosChange>> {
		return this.apiClient.post(
			`/api/kvm/${this.internalId}/ddos/change`,
			KvmDdosChangeRequestSchema,
			KvmDdosChangeSchema,
			body,
		)
	}
}
