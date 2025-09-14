import type { ApiResult, CustomerApiClient } from '../../utils/ApiClient'
import {
	type AccountAffiliate,
	AccountAffiliateSchema,
	type AccountDonations,
	AccountDonationsSchema,
	type AccountInfo,
	AccountInfoSchema,
	type AccountServices,
	AccountServicesSchema,
} from '../schema'

export class Account {
	constructor(private readonly apiClient: CustomerApiClient) {}

	/**
	 * Retrieves account information.
	 *
	 * @returns {Promise<ApiResult<AccountInfo>>} A promise that resolves to the account information.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/account | API Documentation}
	 */
	async getAccountInfo(): Promise<ApiResult<AccountInfo>> {
		return this.apiClient.get('/api/account', AccountInfoSchema)
	}

	/**
	 * Retrieves the list of services associated with the account.
	 *
	 * @returns {Promise<ApiResult<AccountServices>>} A promise that resolves to the account services.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/account/services | API Documentation}
	 */
	async getServices(): Promise<ApiResult<AccountServices>> {
		return this.apiClient.get('/api/account/services', AccountServicesSchema)
	}

	/**
	 * Retrieves donation site data for the account.
	 *
	 * @returns {Promise<ApiResult<AccountDonations>>} A promise that resolves to the donation site data.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/account/donations | API Documentation}
	 */
	async getDonationSiteData(): Promise<ApiResult<AccountDonations>> {
		return this.apiClient.get('/api/account/donations', AccountDonationsSchema)
	}

	/**
	 * Retrieves affiliate data for the account.
	 *
	 * @returns {Promise<ApiResult<AccountAffiliate>>} A promise that resolves to the affiliate data.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/account/affiliate | API Documentation}
	 */
	async getAffiliateData(): Promise<ApiResult<AccountAffiliate>> {
		return this.apiClient.get('/api/account/affiliate', AccountAffiliateSchema)
	}
}
