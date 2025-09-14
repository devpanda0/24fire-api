import type { ApiResult, CustomerApiClient } from '../../utils/ApiClient'
import {
	type AddDnsRecord,
	type AddDnsRecordRequest,
	AddDnsRecordRequestSchema,
	AddDnsRecordSchema,
	type DomainDnsList,
	DomainDnsListSchema,
	type DomainInfo,
	DomainInfoSchema,
	type EditDnsRecord,
	type EditDnsRecordRequest,
	EditDnsRecordRequestSchema,
	EditDnsRecordSchema,
	type RemoveDnsRecord,
	type RemoveDnsRecordRequest,
	RemoveDnsRecordRequestSchema,
	RemoveDnsRecordSchema,
} from '../schema'

export class Domain {
	constructor(
		private apiClient: CustomerApiClient,
		private internalId: string,
	) {}

	/**
	 * Retrieves information about the domain.
	 *
	 * @returns {Promise<ApiResult<DomainInfo>>} A promise that resolves to the domain information.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/domain/%3Ainternal_id | API Documentation}
	 */
	async getInfo(): Promise<ApiResult<DomainInfo>> {
		return this.apiClient.get(
			`/api/domain/${this.internalId}`,
			DomainInfoSchema,
		)
	}

	/**
	 * Retrieves the DNS records associated with the domain.
	 *
	 * @returns {Promise<ApiResult<DomainDnsList>>} A promise that resolves to the list of DNS records.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/domain/%3Ainternal_id/dns | API Documentation}
	 */
	async getDnsRecords(): Promise<ApiResult<DomainDnsList>> {
		return this.apiClient.get(
			`/api/domain/${this.internalId}/dns`,
			DomainDnsListSchema,
		)
	}

	/**
	 * Adds a new DNS record to the domain.
	 *
	 * @remarks
	 * Requires a **24fire+ subscription** to use it.
	 *
	 * @param {AddDnsRecordRequest} data - The DNS record data to be added.
	 * @returns {Promise<ApiResult<AddDnsRecord>>} A promise that resolves to the result of the DNS record addition.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/domain/%3Ainternal_id/dns/add | API Documentation}
	 */
	async addDnsRecord(
		data: AddDnsRecordRequest,
	): Promise<ApiResult<AddDnsRecord>> {
		return this.apiClient.put(
			`/api/domain/${this.internalId}/dns/add`,
			AddDnsRecordRequestSchema,
			AddDnsRecordSchema,
			data,
		)
	}

	/**
	 * Edits an existing DNS record for the domain.
	 *
	 * @remarks
	 * Requires a **24fire+ subscription** to use it.
	 *
	 * @param {EditDnsRecordRequest} data - The updated DNS record data.
	 * @returns {Promise<ApiResult<EditDnsRecord>>} A promise that resolves to the result of the DNS record edit.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/domain/%3Ainternal_id/dns/edit | API Documentation}
	 */
	async editDnsRecord(
		data: EditDnsRecordRequest,
	): Promise<ApiResult<EditDnsRecord>> {
		return this.apiClient.post(
			`/api/domain/${this.internalId}/dns/edit`,
			EditDnsRecordRequestSchema,
			EditDnsRecordSchema,
			data,
		)
	}

	/**
	 * Removes a DNS record from the domain.
	 *
	 * @remarks
	 * Requires a **24fire+ subscription** to use it.
	 *
	 * @param {RemoveDnsRecordRequest} data - The DNS record data to be removed.
	 * @returns {Promise<ApiResult<RemoveDnsRecord>>} A promise that resolves to the result of the DNS record removal.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/domain/%3Ainternal_id/dns/remove | API Documentation}
	 */
	async removeDnsRecord(
		data: RemoveDnsRecordRequest,
	): Promise<ApiResult<RemoveDnsRecord>> {
		return this.apiClient.delete(
			`/api/domain/${this.internalId}/dns/remove`,
			RemoveDnsRecordRequestSchema,
			RemoveDnsRecordSchema,
			data,
		)
	}
}
