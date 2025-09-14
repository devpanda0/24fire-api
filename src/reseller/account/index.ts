import { type } from 'arktype'
import type { ApiClient, ApiResult } from '../../utils/ApiClient'
import {
	AccountRequestsListRequestSchema,
	AccountRequestsListSchema,
	type OtpGenerate,
	OtpGenerateSchema,
	type RequestListOptions,
	type RequestsList,
} from '../schema'

export class Account {
	constructor(private apiClient: ApiClient) {}

	/**
	 * List API requests made to the reseller account.
	 *
	 * @param data - Optional parameters for pagination and response parsing.
	 * @returns A promise resolving to the list of API requests.
	 * @see {@link https://docs.fireapi.de/request/account/requests | fireapi.de API Documentation}
	 */
	async listRequests(
		data?: RequestListOptions,
	): Promise<ApiResult<RequestsList>> {
		const body = data?.offset ? { offset: data.offset } : {}
		const res = await this.apiClient.post(
			`/account/requests`,
			AccountRequestsListRequestSchema,
			AccountRequestsListSchema,
			body,
		)
		if (res.status === 'success' && data?.parseResBodies) {
			res.data = res.data.map((entry) => {
				try {
					return {
						...entry,
						response_body: JSON.parse(entry.response_body),
					}
				} catch {
					return entry
				}
			})
		}
		return res
	}

	/**
	 * Generate a one-time password (OTP) for account security.
	 *
	 * @returns A promise resolving to the generated OTP details.
	 * @see {@link https://docs.fireapi.de/request/account/otp | fireapi.de API Documentation}
	 */
	async generateOtp(): Promise<ApiResult<OtpGenerate>> {
		return this.apiClient.post(`/account/otp`, type({}), OtpGenerateSchema, {})
	}
}
