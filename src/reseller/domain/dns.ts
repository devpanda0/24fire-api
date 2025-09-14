import type { ApiClient, ApiResult } from '../../utils/ApiClient'
import {
	type DnsAdd,
	type DnsAddRequest,
	DnsAddRequestSchema,
	DnsAddSchema,
	type DnsEdit,
	type DnsEditRequest,
	DnsEditRequestSchema,
	DnsEditSchema,
	type DnsList,
	DnsListSchema,
	type DnsRemove,
	DnsRemoveRequestSchema,
	DnsRemoveSchema,
} from '../schema'

export default class Dns {
	constructor(
		private apiClient: ApiClient,
		private domain: string,
	) {}

	/**
	 * List all DNS records for the domain.
	 *
	 * @returns A promise resolving to the list of DNS records.
	 * @see {@link https://docs.fireapi.de/request/domain/:domain/dns | fireapi.de API Documentation}
	 */
	async listRecords(): Promise<ApiResult<DnsList>> {
		return this.apiClient.get(`/domain/${this.domain}/dns`, DnsListSchema)
	}

	/**
	 * Add a new DNS record to the domain.
	 *
	 * @param data - The DNS record configuration to add.
	 * @returns A promise resolving to the DNS record addition confirmation.
	 * @see {@link https://docs.fireapi.de/request/domain/:domain/dns/add | fireapi.de API Documentation}
	 */
	async addRecord(data: DnsAddRequest): Promise<ApiResult<DnsAdd>> {
		return this.apiClient.put(
			`/domain/${this.domain}/dns/add`,
			DnsAddRequestSchema,
			DnsAddSchema,
			data,
		)
	}

	/**
	 * Edit an existing DNS record for the domain.
	 *
	 * @param data - The DNS record configuration to update.
	 * @returns A promise resolving to the DNS record edit confirmation.
	 * @see {@link https://docs.fireapi.de/request/domain/:domain/dns/edit | fireapi.de API Documentation}
	 */
	async editRecord(data: DnsEditRequest): Promise<ApiResult<DnsEdit>> {
		return this.apiClient.post(
			`/domain/${this.domain}/dns/edit`,
			DnsEditRequestSchema,
			DnsEditSchema,
			data,
		)
	}

	/**
	 * Remove a DNS record from the domain.
	 *
	 * @param record_id - The DNS record ID to remove.
	 * @returns A promise resolving to the DNS record removal confirmation.
	 * @see {@link https://docs.fireapi.de/request/domain/:domain/dns/remove | fireapi.de API Documentation}
	 */
	async removeRecord(record_id: number): Promise<ApiResult<DnsRemove>> {
		return this.apiClient.delete(
			`/domain/${this.domain}/dns/remove`,
			DnsRemoveRequestSchema,
			DnsRemoveSchema,
			{ record_id },
		)
	}
}
