import type { ApiClient, ApiResult } from '../../utils/ApiClient'
import {
	type VmRDNSCreate,
	type VmRDNSCreateRequest,
	VmRDNSCreateRequestSchema,
	VmRDNSCreateSchema,
	type VmRDNSDelete,
	VmRDNSDeleteRequestSchema,
	VmRDNSDeleteSchema,
	type VmRDNSList,
	VmRDNSListSchema,
} from '../schema'

export class Rdns {
	constructor(
		private apiClient: ApiClient,
		private vmId: number,
	) {}

	/**
	 * List all reverse DNS entries for the VM.
	 *
	 * @returns A promise resolving to the list of reverse DNS entries.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/rdns/list | fireapi.de API Documentation}
	 */
	async list(): Promise<ApiResult<VmRDNSList>> {
		return this.apiClient.get(`/vm/${this.vmId}/rdns/list`, VmRDNSListSchema)
	}

	/**
	 * Create a new reverse DNS entry for the VM.
	 *
	 * @param data - The reverse DNS configuration.
	 * @returns A promise resolving to the reverse DNS creation confirmation.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/rdns/create | fireapi.de API Documentation}
	 */
	async create(data: VmRDNSCreateRequest): Promise<ApiResult<VmRDNSCreate>> {
		return this.apiClient.put(
			`/vm/${this.vmId}/rdns/create`,
			VmRDNSCreateRequestSchema,
			VmRDNSCreateSchema,
			data,
		)
	}

	/**
	 * Delete a reverse DNS entry for the VM.
	 *
	 * @param ip_address - The IP address to remove reverse DNS for.
	 * @returns A promise resolving to the reverse DNS deletion confirmation.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/rdns/delete | fireapi.de API Documentation}
	 */
	async delete(ip_address: string): Promise<ApiResult<VmRDNSDelete>> {
		return this.apiClient.delete(
			`/vm/${this.vmId}/rdns/delete`,
			VmRDNSDeleteRequestSchema,
			VmRDNSDeleteSchema,
			{ ip_address },
		)
	}
}
