import type { ApiResult, CustomerApiClient } from '../../utils/ApiClient'
import {
	type KvmMonitoringIncidences,
	KvmMonitoringIncidencesSchema,
	type KvmMonitoringTimings,
	KvmMonitoringTimingsSchema,
} from '../schema'

export class Monitoring {
	constructor(
		private apiClient: CustomerApiClient,
		private internalId: string,
	) {}

	/**
	 * Measurements are taken every 10 minutes. Data from the last 30 days is available, with older data being deleted gradually.
	 *
	 * @remarks
	 * Requires a **24fire+ subscription** to use it.
	 *
	 * @returns {Promise<ApiResult<KvmMonitoringTimings>>} A promise that resolves to the monitoring timings.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/kvm/%3Ainternal_id/monitoring/timings | API Documentation}
	 */
	async getTimings(): Promise<ApiResult<KvmMonitoringTimings>> {
		return this.apiClient.get(
			`/api/kvm/${this.internalId}/monitoring/timings`,
			KvmMonitoringTimingsSchema,
		)
	}

	/**
	 * Retrieves the monitoring incidences for the specified KVM server.
	 *
	 * @remarks
	 * Requires a **24fire+ subscription** to use it.
	 *
	 * @returns {Promise<ApiResult<KvmMonitoringIncidences>>} A promise that resolves to the monitoring incidences.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/kvm/%3Ainternal_id/monitoring/incidences | API Documentation}
	 */
	async getIncidences(): Promise<ApiResult<KvmMonitoringIncidences>> {
		return this.apiClient.get(
			`/api/kvm/${this.internalId}/monitoring/incidences`,
			KvmMonitoringIncidencesSchema,
		)
	}
}
