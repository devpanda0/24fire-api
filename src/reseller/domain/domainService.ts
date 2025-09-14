import type { ApiClient, ApiResult } from '../../utils/ApiClient'
import {
	type DomainList,
	DomainListSchema,
	type DomainPricings,
	DomainPricingsSchema,
	type DomainRegister,
	type DomainRegisterRequest,
	DomainRegisterRequestSchema,
	DomainRegisterSchema,
} from '../schema'
import { Handle } from './handle'

export class DomainService {
	public handle: Handle

	constructor(private apiClient: ApiClient) {
		this.handle = new Handle(apiClient)
	}

	/**
	 * List all domains owned by the reseller.
	 *
	 * @returns A promise resolving to the list of domains.
	 * @see {@link https://docs.fireapi.de/request/domain/list | fireapi.de API Documentation}
	 */
	async list(): Promise<ApiResult<DomainList>> {
		return this.apiClient.get(`/domain/list`, DomainListSchema)
	}

	/**
	 * Register a new domain.
	 *
	 * @param data - The domain registration configuration.
	 * @returns A promise resolving to the domain registration confirmation.
	 * @see {@link https://docs.fireapi.de/request/domain/register | fireapi.de API Documentation}
	 */
	async register(
		data: DomainRegisterRequest,
	): Promise<ApiResult<DomainRegister>> {
		return this.apiClient.post(
			`/domain/register`,
			DomainRegisterRequestSchema,
			DomainRegisterSchema,
			data,
		)
	}

	/**
	 * Get pricing information for domain registration and renewal.
	 *
	 * @returns A promise resolving to the domain pricing information.
	 * @see {@link https://docs.fireapi.de/request/domain/pricings | fireapi.de API Documentation}
	 */
	async getPricings(): Promise<ApiResult<DomainPricings>> {
		return this.apiClient.get(`/domain/pricings`, DomainPricingsSchema)
	}
}
