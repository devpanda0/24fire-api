import type { ApiClient, ApiResult } from '../../utils/ApiClient'
import {
	type VmCreate,
	type VmCreateRequest,
	VmCreateRequestSchema,
	VmCreateSchema,
	type VmListHosts,
	VmListHostsSchema,
	type VmListIso,
	VmListIsoSchema,
	type VmListOs,
	VmListOsSchema,
	type VmListSummary,
	VmListSummarySchema,
} from '../schema'

export class Vms {
	constructor(private apiClient: ApiClient) {}

	/**
	 * List all VMs owned by the reseller.
	 *
	 * @returns A promise resolving to the list of VMs.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/list | fireapi.de API Documentation}
	 */
	async list(): Promise<ApiResult<VmListSummary>> {
		return await this.apiClient.get('/vm/list', VmListSummarySchema)
	}

	/**
	 * List available VM hosts.
	 *
	 * @returns A promise resolving to the list of available hosts.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/list/hosts | fireapi.de API Documentation}
	 */
	async hosts(): Promise<ApiResult<VmListHosts>> {
		return await this.apiClient.get('/vm/list/hosts', VmListHostsSchema)
	}

	/**
	 * List available operating systems for VM creation.
	 *
	 * @returns A promise resolving to the list of available operating systems.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/list/os | fireapi.de API Documentation}
	 */
	async os(): Promise<ApiResult<VmListOs>> {
		return await this.apiClient.get('/vm/list/os', VmListOsSchema)
	}

	/**
	 * List available ISO files for VM creation.
	 *
	 * @returns A promise resolving to the list of available ISO files.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/list/iso | fireapi.de API Documentation}
	 */
	async iso(): Promise<ApiResult<VmListIso>> {
		return await this.apiClient.get('/vm/list/iso', VmListIsoSchema)
	}

	/**
	 * Create a new VM.
	 *
	 * @param data - The VM creation configuration.
	 * @returns A promise resolving to the VM creation confirmation.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/create | fireapi.de API Documentation}
	 */
	async create(data: VmCreateRequest): Promise<ApiResult<VmCreate>> {
		return this.apiClient.put(
			`/vm/create`,
			VmCreateRequestSchema,
			VmCreateSchema,
			data,
		)
	}
}
