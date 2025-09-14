import { EmptySchema } from '../../schema/generel'
import type { ApiClient, ApiResult } from '../../utils/ApiClient'
import {
	type DomainAuthcode,
	DomainAuthcodeSchema,
	type DomainAvailability,
	DomainAvailabilitySchema,
	type DomainDelete,
	DomainDeleteSchema,
	type DomainInfo,
	DomainInfoSchema,
	type DomainNameserverUpdate,
	type DomainNameserverUpdateRequest,
	DomainNameserverUpdateRequestSchema,
	DomainNameserverUpdateSchema,
	type DomainUndelete,
	DomainUndeleteSchema,
} from '../schema'
import Dns from './dns'

export class Domain {
	public dns: Dns

	constructor(
		private apiClient: ApiClient,
		private domain: string,
	) {
		if (!this.domain.includes('.')) {
			throw new Error('Invalid domain')
		}
		this.dns = new Dns(apiClient, domain)
	}

	/**
	 * Delete/cancel a domain.
	 *
	 * @returns A promise resolving to the deletion confirmation.
	 * @see {@link https://docs.fireapi.de/request/domain/:domain/delete | fireapi.de API Documentation}
	 */
	async delete(): Promise<ApiResult<DomainDelete>> {
		return this.apiClient.delete(
			`/domain/${this.domain}/delete`,
			EmptySchema,
			DomainDeleteSchema,
			{},
		)
	}

	/**
	 * Restore a deleted domain.
	 *
	 * @returns A promise resolving to the restoration confirmation.
	 * @see {@link https://docs.fireapi.de/request/domain/:domain/undelete | fireapi.de API Documentation}
	 */
	async undelete(): Promise<ApiResult<DomainUndelete>> {
		return this.apiClient.post(
			`/domain/${this.domain}/undelete`,
			EmptySchema,
			DomainUndeleteSchema,
			{},
		)
	}

	/**
	 * Get the authcode for domain transfer.
	 *
	 * @returns A promise resolving to the domain authcode.
	 * @see {@link https://docs.fireapi.de/request/domain/:domain/authcode | fireapi.de API Documentation}
	 */
	async getAuthcode(): Promise<ApiResult<DomainAuthcode>> {
		return this.apiClient.post(
			`/domain/${this.domain}/authcode`,
			EmptySchema,
			DomainAuthcodeSchema,
			{},
		)
	}

	/**
	 * Get detailed information about the domain.
	 *
	 * @returns A promise resolving to the domain information.
	 * @see {@link https://docs.fireapi.de/request/domain/:domain/info | fireapi.de API Documentation}
	 */
	async info(): Promise<ApiResult<DomainInfo>> {
		return this.apiClient.get(`/domain/${this.domain}/info`, DomainInfoSchema)
	}

	/**
	 * Check if the domain is available for registration.
	 *
	 * @returns A promise resolving to the domain availability status.
	 * @see {@link https://docs.fireapi.de/request/domain/:domain/check | fireapi.de API Documentation}
	 */
	async checkAvailability(): Promise<ApiResult<DomainAvailability>> {
		return this.apiClient.get(
			`/domain/${this.domain}/check`,
			DomainAvailabilitySchema,
		)
	}

	/**
	 * Update the nameservers for the domain.
	 *
	 * @param data - The nameserver configuration to set.
	 * @returns A promise resolving to the nameserver update confirmation.
	 * @see {@link https://docs.fireapi.de/request/domain/:domain/nameserver | fireapi.de API Documentation}
	 */
	async setNameservers(
		data: DomainNameserverUpdateRequest,
	): Promise<ApiResult<DomainNameserverUpdate>> {
		return this.apiClient.post(
			`/domain/${this.domain}/nameserver`,
			DomainNameserverUpdateRequestSchema,
			DomainNameserverUpdateSchema,
			data,
		)
	}
}
