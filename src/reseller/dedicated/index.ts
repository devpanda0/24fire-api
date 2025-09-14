import { EmptySchema } from '../../schema/generel'
import type { ApiClient, ApiResult } from '../../utils/ApiClient'
import {
	type DedicatedAvailability,
	DedicatedAvailabilitySchema,
	type DedicatedAvailable,
	DedicatedAvailableSchema,
	type DedicatedInfo,
	DedicatedInfoSchema,
	type DedicatedOwnedList,
	DedicatedOwnedListSchema,
	type DedicatedPurchase,
	type DedicatedPurchaseRequest,
	DedicatedPurchaseRequestSchema,
	DedicatedPurchaseSchema,
	DedicatedTerminateSchema,
	DedicatedUndeleteSchema,
	type Terminate,
	type Undelete,
} from '../schema'

export class Dedicated {
	constructor(private apiClient: ApiClient) {}

	/**
	 * List all available dedicated servers for purchase.
	 *
	 * @returns A promise resolving to the list of available dedicated servers.
	 * @see {@link https://docs.fireapi.de/request/dedicated/available | fireapi.de API Documentation}
	 */
	async listAvailable(): Promise<ApiResult<DedicatedAvailable>> {
		return this.apiClient.get('/dedicated/available', DedicatedAvailableSchema)
	}

	/**
	 * Get availability information for a specific dedicated server.
	 *
	 * @param id - The dedicated server ID to check availability for.
	 * @returns A promise resolving to the server availability details.
	 * @see {@link https://docs.fireapi.de/request/dedicated/available/:identifier | fireapi.de API Documentation}
	 */
	async availableById(id: string): Promise<ApiResult<DedicatedAvailability>> {
		return this.apiClient.get(
			`/dedicated/available/${id}`,
			DedicatedAvailabilitySchema,
		)
	}

	/**
	 * Purchase a dedicated server.
	 *
	 * @param id - The dedicated server ID to purchase.
	 * @param data - Purchase configuration data.
	 * @returns A promise resolving to the purchase confirmation.
	 * @see {@link https://docs.fireapi.de/request/dedicated/:identifier/purchase | fireapi.de API Documentation}
	 */
	async purchase(
		id: string,
		data: DedicatedPurchaseRequest,
	): Promise<ApiResult<DedicatedPurchase>> {
		return this.apiClient.put(
			`/dedicated/${id}/purchase`,
			DedicatedPurchaseRequestSchema,
			DedicatedPurchaseSchema,
			data,
		)
	}

	/**
	 * Get detailed information about a dedicated server.
	 *
	 * @param id - The dedicated server ID to get information for.
	 * @returns A promise resolving to the server information.
	 * @see {@link https://docs.fireapi.de/request/dedicated/:identifier/info | fireapi.de API Documentation}
	 */
	async getInfo(id: string): Promise<ApiResult<DedicatedInfo>> {
		return this.apiClient.get(`/dedicated/${id}/info`, DedicatedInfoSchema)
	}

	/**
	 * List all owned dedicated servers.
	 *
	 * @returns A promise resolving to the list of owned dedicated servers.
	 * @see {@link https://docs.fireapi.de/request/dedicated/list | fireapi.de API Documentation}
	 */
	async listOwned(): Promise<ApiResult<DedicatedOwnedList>> {
		return this.apiClient.get('/dedicated/list', DedicatedOwnedListSchema)
	}

	/**
	 * Cancel a dedicated server.
	 *
	 * @param id - The dedicated server ID to cancel.
	 * @returns A promise resolving to the cancellation confirmation.
	 * @see {@link https://docs.fireapi.de/request/dedicated/:identifier/delete | fireapi.de API Documentation}
	 */
	async cancel(id: string): Promise<ApiResult<Terminate>> {
		return this.apiClient.delete(
			`/dedicated/${id}/delete`,
			EmptySchema,
			DedicatedTerminateSchema,
			{},
		)
	}

	/**
	 * Restore a cancelled dedicated server.
	 *
	 * @param id - The dedicated server ID to restore.
	 * @returns A promise resolving to the restoration confirmation.
	 * @see {@link https://docs.fireapi.de/request/dedicated/:identifier/undelete | fireapi.de API Documentation}
	 */
	async undelete(id: string): Promise<ApiResult<Undelete>> {
		return this.apiClient.post(
			`/dedicated/${id}/undelete`,
			EmptySchema,
			DedicatedUndeleteSchema,
			{},
		)
	}
}
