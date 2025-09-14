import type { ApiResult, CustomerApiClient } from '../../utils/ApiClient'
import {
	type KvmConfig,
	KvmConfigSchema,
	type KvmPower,
	KvmPowerRequestSchema,
	KvmPowerSchema,
	type KvmStatus,
	KvmStatusSchema,
} from '../schema'
import { Backup } from './backup'
import { Ddos } from './ddos'
import { Monitoring } from './monitoring'
import { Traffic } from './traffic'

export class Kvm {
	public backups: Backup
	public monitoring: Monitoring
	public traffic: Traffic
	public ddos: Ddos

	constructor(
		private apiClient: CustomerApiClient,
		private internalId: string,
	) {
		this.backups = new Backup(apiClient, internalId)
		this.monitoring = new Monitoring(apiClient, internalId)
		this.traffic = new Traffic(apiClient, internalId)
		this.ddos = new Ddos(apiClient, internalId)
	}

	/**
	 * Retrieves the configuration of the specified KVM server.
	 *
	 * @returns {Promise<ApiResult<KvmConfig>>} A promise that resolves to the KVM configuration.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/kvm/%3Ainternal_id/config | API Documentation}
	 */
	async getConfig(): Promise<ApiResult<KvmConfig>> {
		return this.apiClient.get(
			`/api/kvm/${this.internalId}/config`,
			KvmConfigSchema,
		)
	}

	/**
	 * Retrieves the status of the specified KVM server.
	 *
	 * @returns {Promise<ApiResult<KvmStatus>>} A promise that resolves to the KVM status.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/kvm/%3Ainternal_id/status | API Documentation}
	 */
	async getStatus(): Promise<ApiResult<KvmStatus>> {
		return this.apiClient.get(
			`/api/kvm/${this.internalId}/status`,
			KvmStatusSchema,
		)
	}

	/**
	 * Powers on, off, or restarts the specified KVM server.
	 *
	 * @param {('start' | 'stop' | 'restart')} mode - The power action to perform.
	 * @returns {Promise<ApiResult<KvmPower>>} A promise that resolves to the result of the power action.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/kvm/%3Ainternal_id/power | API Documentation}
	 */
	async power(
		mode: 'start' | 'stop' | 'restart',
	): Promise<ApiResult<KvmPower>> {
		return this.apiClient.post(
			`/api/kvm/${this.internalId}/power`,
			KvmPowerRequestSchema,
			KvmPowerSchema,
			{ mode },
		)
	}
}
