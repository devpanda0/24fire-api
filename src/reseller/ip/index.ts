import type { ApiClient, ApiResult } from '../../utils/ApiClient'
import {
	type IpAvailable,
	IpAvailableSchema,
	type IpDelete,
	IpDeleteRequestSchema,
	IpDeleteSchema,
	type IpOwnedList,
	IpOwnedListSchema,
	type IpPurchase,
	IpPurchaseRequestSchema,
	IpPurchaseSchema,
} from '../schema'

export class Ip {
	constructor(private apiClient: ApiClient) {}

	/**
	 * List all available IP networks for purchase.
	 *
	 * @returns A promise resolving to the list of available IP networks.
	 * @see {@link https://docs.fireapi.de/request/ip/available | fireapi.de API Documentation}
	 */
	async listPurchasableIpNets(): Promise<ApiResult<IpAvailable>> {
		return this.apiClient.get('/ip/available', IpAvailableSchema)
	}

	/**
	 * Purchase an IP network.
	 *
	 * @param netID - The network ID to purchase.
	 * @returns A promise resolving to the purchase confirmation.
	 * @see {@link https://docs.fireapi.de/request/ip/purchase | fireapi.de API Documentation}
	 */
	async purchaseIpNet(netID: string): Promise<ApiResult<IpPurchase>> {
		return this.apiClient.post(
			`/ip/purchase`,
			IpPurchaseRequestSchema,
			IpPurchaseSchema,
			{ netID },
		)
	}

	/**
	 * List all owned IP networks.
	 *
	 * @returns A promise resolving to the list of owned IP networks.
	 * @see {@link https://docs.fireapi.de/request/ip/list | fireapi.de API Documentation}
	 */
	async listOwnedIpNets(): Promise<ApiResult<IpOwnedList>> {
		return this.apiClient.get('/ip/list', IpOwnedListSchema)
	}

	/**
	 * Terminate an IP network.
	 *
	 * @param netID - The network ID to terminate.
	 * @returns A promise resolving to the termination confirmation.
	 * @see {@link https://docs.fireapi.de/request/ip/delete | fireapi.de API Documentation}
	 */
	async terminateIpNet(netID: string): Promise<ApiResult<IpDelete>> {
		return this.apiClient.delete(
			'/ip/delete',
			IpDeleteRequestSchema,
			IpDeleteSchema,
			{ netID },
		)
	}
}
