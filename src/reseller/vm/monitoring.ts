import type { ApiClient, ApiResult } from '../../utils/ApiClient'
import {
	type VmMonitoringChange,
	type VmMonitoringChangeRequest,
	VmMonitoringChangeRequestSchema,
	VmMonitoringChangeSchema,
	type VmMonitoringIncidences,
	VmMonitoringIncidencesSchema,
	type VmMonitoringTimings,
	VmMonitoringTimingsSchema,
} from '../schema'

export class Monitoring {
	constructor(
		private apiClient: ApiClient,
		private vmId: number,
	) {}

	/**
	 * Change monitoring settings for the VM.
	 *
	 * @param data - The new monitoring configuration.
	 * @returns A promise resolving to the monitoring change confirmation.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/monitoring/change | fireapi.de API Documentation}
	 */
	async change(
		data: VmMonitoringChangeRequest,
	): Promise<ApiResult<VmMonitoringChange>> {
		return this.apiClient.post(
			`/vm/${this.vmId}/monitoring/change`,
			VmMonitoringChangeRequestSchema,
			VmMonitoringChangeSchema,
			data,
		)
	}

	/**
	 * Get monitoring response time statistics for the VM.
	 *
	 * @returns A promise resolving to the monitoring timing data.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/monitoring/timings | fireapi.de API Documentation}
	 */
	async getTimings(): Promise<ApiResult<VmMonitoringTimings>> {
		return this.apiClient.get(
			`/vm/${this.vmId}/monitoring/timings`,
			VmMonitoringTimingsSchema,
		)
	}

	/**
	 * Get monitoring incident history for the VM.
	 *
	 * @returns A promise resolving to the monitoring incident data.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/monitoring/incidences | fireapi.de API Documentation}
	 */
	async getIncidences(): Promise<ApiResult<VmMonitoringIncidences>> {
		return this.apiClient.get(
			`/vm/${this.vmId}/monitoring/incidences`,
			VmMonitoringIncidencesSchema,
		)
	}
}
