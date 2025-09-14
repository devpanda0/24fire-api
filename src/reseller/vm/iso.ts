import { EmptySchema } from '../../schema/generel'
import type { ApiClient, ApiResult } from '../../utils/ApiClient'
import {
	type VmIsoInsert,
	VmIsoInsertRequestSchema,
	VmIsoInsertSchema,
	type VmIsoRemove,
	VmIsoRemoveSchema,
} from '../schema'

export class Iso {
	constructor(
		private apiClient: ApiClient,
		private vmId: number,
	) {}

	/**
	 * Insert an ISO file into the VM's virtual CD drive.
	 *
	 * @param iso - The ISO file identifier to insert.
	 * @returns A promise resolving to the ISO insertion confirmation.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/iso | fireapi.de API Documentation}
	 */
	async insert(iso: string): Promise<ApiResult<VmIsoInsert>> {
		return this.apiClient.put(
			`/vm/${this.vmId}/iso`,
			VmIsoInsertRequestSchema,
			VmIsoInsertSchema,
			{ iso },
		)
	}

	/**
	 * Remove the currently inserted ISO file from the VM's virtual CD drive.
	 *
	 * @returns A promise resolving to the ISO removal confirmation.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/iso | fireapi.de API Documentation}
	 */
	async remove(): Promise<ApiResult<VmIsoRemove>> {
		return this.apiClient.delete(
			`/vm/${this.vmId}/iso`,
			EmptySchema,
			VmIsoRemoveSchema,
			{},
		)
	}
}
