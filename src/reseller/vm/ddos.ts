import type { ApiClient, ApiResult } from '../../utils/ApiClient'
import {
	type VmDDoSSettings,
	type VmDDoSSettingsRequest,
	VmDDoSSettingsRequestSchema,
	VmDDoSSettingsSchema,
} from '../schema'

export class DDoS {
	constructor(
		private apiClient: ApiClient,
		private vmId: number,
	) {}

	/**
	 * Get current DDoS protection settings for the VM.
	 *
	 * @returns A promise resolving to the current DDoS settings.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/ddos | fireapi.de API Documentation}
	 */
	async get(): Promise<ApiResult<VmDDoSSettings>> {
		return this.apiClient.get(`/vm/${this.vmId}/ddos`, VmDDoSSettingsSchema)
	}

	/**
	 * Update DDoS protection settings for the VM.
	 *
	 * @param data - The new DDoS protection configuration.
	 * @returns A promise resolving to the updated DDoS settings.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/ddos | fireapi.de API Documentation}
	 */
	async updateSettings(
		data: VmDDoSSettingsRequest,
	): Promise<ApiResult<VmDDoSSettings>> {
		return this.apiClient.post(
			`/vm/${this.vmId}/ddos`,
			VmDDoSSettingsRequestSchema,
			VmDDoSSettingsSchema,
			data,
		)
	}
}
