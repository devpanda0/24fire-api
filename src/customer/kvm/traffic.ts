import type { ApiResult, CustomerApiClient } from '../../utils/ApiClient'
import {
	type KvmTrafficChart,
	type KvmTrafficChartRequest,
	KvmTrafficChartRequestSchema,
	KvmTrafficChartSchema,
	type KvmTrafficCurrent,
	KvmTrafficCurrentSchema,
	type KvmTrafficLog,
	KvmTrafficLogSchema,
} from '../schema'

export class Traffic {
	constructor(
		private apiClient: CustomerApiClient,
		private internalId: string,
	) {}

	/**
	 * Retrieves the current traffic usage for the specified KVM server.
	 *
	 *
	 * @returns {Promise<ApiResult<KvmTrafficCurrent>>} A promise that resolves to the current traffic usage.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/kvm/%3Ainternal_id/traffic/current | API Documentation}
	 */
	async getCurrent(): Promise<ApiResult<KvmTrafficCurrent>> {
		return this.apiClient.get(
			`/api/kvm/${this.internalId}/traffic/current`,
			KvmTrafficCurrentSchema,
		)
	}

	/**
	 * Incoming and outgoing traffic is measured every 10 minutes. The consumption relative to the previous measurement is specified; the results are not cumulative.
	 *
	 * @returns {Promise<ApiResult<KvmTrafficLog>>} A promise that resolves to the traffic log.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/kvm/%3Ainternal_id/traffic/log | API Documentation}
	 */
	async getLog(): Promise<ApiResult<KvmTrafficLog>> {
		return this.apiClient.get(
			`/api/kvm/${this.internalId}/traffic/log`,
			KvmTrafficLogSchema,
		)
	}

	/**
	 * Enables easy visualization of traffic consumption in a chart. The configuration for ChartJS and ApexCharts can be generated, or a rendered image can be output in Base64 format.
	 *
	 * @remarks
	 * Requires a **24fire+ subscription** to use it.
	 *
	 * @param {KvmTrafficChartRequest} data - The request body containing the chart parameters.
	 * @returns {Promise<ApiResult<KvmTrafficChart>>} A promise that resolves to the traffic chart.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/kvm/%3Ainternal_id/traffic/chart | API Documentation}
	 */
	async getChart(
		data: KvmTrafficChartRequest,
	): Promise<ApiResult<KvmTrafficChart>> {
		return this.apiClient.post(
			`/api/kvm/${this.internalId}/traffic/chart`,
			KvmTrafficChartRequestSchema,
			KvmTrafficChartSchema,
			data,
		)
	}
}
