import type { ApiClient, ApiResult } from '../../utils/ApiClient'
import {
	type HandleCountries,
	HandleCountriesSchema,
	type HandleCreate,
	type HandleCreateRequest,
	HandleCreateRequestSchema,
	HandleCreateSchema,
	type HandleInfo,
	HandleInfoSchema,
	type HandleUpdate,
	type HandleUpdateRequest,
	HandleUpdateRequestSchema,
	HandleUpdateSchema,
} from '../schema'

export class Handle {
	constructor(private apiClient: ApiClient) {}

	/**
	 * Create a new domain handle for domain registration.
	 * INFO: The first and last name cannot be changed later.
	 *
	 * @param data - The handle creation configuration.
	 * @returns A promise resolving to the handle creation confirmation.
	 * @see {@link https://docs.fireapi.de/request/domain/handle/create | fireapi.de API Documentation}
	 */
	async create(data: HandleCreateRequest): Promise<ApiResult<HandleCreate>> {
		return this.apiClient.put(
			`/domain/handle/create`,
			HandleCreateRequestSchema,
			HandleCreateSchema,
			data,
		)
	}

	/**
	 * Get information about a domain handle.
	 *
	 * @param handle - The handle identifier to get information for.
	 * @returns A promise resolving to the handle information.
	 * @see {@link https://docs.fireapi.de/request/domain/handle/:handle/info | fireapi.de API Documentation}
	 */
	async getInfo(handle: string): Promise<ApiResult<HandleInfo>> {
		return this.apiClient.get(`/domain/handle/${handle}/info`, HandleInfoSchema)
	}

	/**
	 * Update an existing domain handle.
	 * INFO: The first and last name cannot be changed later.
	 *
	 * @param handle - The handle identifier to update.
	 * @param data - The handle update configuration.
	 * @returns A promise resolving to the handle update confirmation.
	 * @see {@link https://docs.fireapi.de/request/domain/handle/:handle/update | fireapi.de API Documentation}
	 */
	async update(
		handle: string,
		data: HandleUpdateRequest,
	): Promise<ApiResult<HandleUpdate>> {
		return this.apiClient.post(
			`/domain/handle/${handle}/update`,
			HandleUpdateRequestSchema,
			HandleUpdateSchema,
			data,
		)
	}

	/**
	 * Get the list of available countries for handle creation.
	 *
	 * @returns A promise resolving to the list of available countries.
	 * @see {@link https://docs.fireapi.de/request/domain/handle/countries | fireapi.de API Documentation}
	 */
	async getCountries(): Promise<ApiResult<HandleCountries>> {
		return this.apiClient.get(`/domain/handle/countries`, HandleCountriesSchema)
	}
}
