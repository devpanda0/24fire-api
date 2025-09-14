import type { ApiResult, CustomerApiClient } from '../../utils/ApiClient'
import { type WebspaceInfo, WebspaceInfoSchema } from '../schema'

export class Webspace {
	constructor(
		private apiClient: CustomerApiClient,
		private internalId: string,
	) {}

	/**
	 * Fetches information about the specified webspace.
	 *
	 * @returns {Promise<ApiResult<WebspaceInfo>>} A promise that resolves to the webspace information.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/webspace/%3Ainternal_id | API Documentation}
	 */
	async getInfo(): Promise<ApiResult<WebspaceInfo>> {
		return this.apiClient.get(
			`/api/webspace/${this.internalId}`,
			WebspaceInfoSchema,
		)
	}
}
