import type { ApiClient, ApiResult } from '../../utils/ApiClient'
import {
	type VmTrafficAddonBuy,
	VmTrafficAddonBuyRequestSchema,
	VmTrafficAddonBuySchema,
	type VmTrafficAddons,
	VmTrafficAddonsSchema,
	type VmTrafficChart,
	type VmTrafficChartRequest,
	VmTrafficChartRequestSchema,
	VmTrafficChartSchema,
	type VmTrafficCurrent,
	VmTrafficCurrentSchema,
	type VmTrafficLog,
	type VmTrafficLogRequest,
	VmTrafficLogRequestSchema,
	VmTrafficLogSchema,
} from '../schema'

export class Traffic {
	constructor(
		private apiClient: ApiClient,
		private vmId: number,
	) {}

	/**
	 * Get current traffic usage statistics for the VM.
	 *
	 * @returns A promise resolving to the current traffic statistics.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/traffic/current | fireapi.de API Documentation}
	 */
	async getCurrent(): Promise<ApiResult<VmTrafficCurrent>> {
		return this.apiClient.get(
			`/vm/${this.vmId}/traffic/current`,
			VmTrafficCurrentSchema,
		)
	}

	/**
	 * Get traffic usage log for the VM.
	 *
	 * @param data - The traffic log request parameters.
	 * @returns A promise resolving to the traffic log data.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/traffic/current/log | fireapi.de API Documentation}
	 */
	async getLog(data: VmTrafficLogRequest): Promise<ApiResult<VmTrafficLog>> {
		return this.apiClient.post(
			`/vm/${this.vmId}/traffic/current/log`,
			VmTrafficLogRequestSchema,
			VmTrafficLogSchema,
			{ params: data },
		)
	}

	/**
	 * Get traffic usage chart data for the VM.
	 *
	 * @param data - The traffic chart request parameters.
	 * @returns A promise resolving to the traffic chart data.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/traffic/chart | fireapi.de API Documentation}
	 */
	async getChart(
		data: VmTrafficChartRequest,
	): Promise<ApiResult<VmTrafficChart>> {
		return this.apiClient.post(
			`/vm/${this.vmId}/traffic/chart`,
			VmTrafficChartRequestSchema,
			VmTrafficChartSchema,
			data,
		)
	}

	/**
	 * Get available traffic add-ons for the VM.
	 *
	 * @returns A promise resolving to the list of available traffic add-ons.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/traffic/addons | fireapi.de API Documentation}
	 */
	async getAddons(): Promise<ApiResult<VmTrafficAddons>> {
		return this.apiClient.get(
			`/vm/${this.vmId}/traffic/addons`,
			VmTrafficAddonsSchema,
		)
	}

	/**
	 * Purchase a traffic add-on for the VM.
	 *
	 * @param addon - The traffic add-on identifier to purchase.
	 * @returns A promise resolving to the add-on purchase confirmation.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/traffic/addons/buy | fireapi.de API Documentation}
	 */
	async buyAddon(addon: string): Promise<ApiResult<VmTrafficAddonBuy>> {
		return this.apiClient.post(
			`/vm/${this.vmId}/traffic/addons/buy`,
			VmTrafficAddonBuyRequestSchema,
			VmTrafficAddonBuySchema,
			{ addon },
		)
	}
}
