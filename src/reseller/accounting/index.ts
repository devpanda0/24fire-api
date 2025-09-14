import type { ApiClient, ApiResult } from '../../utils/ApiClient'
import {
	AccountingCurrentInvoiceSchema,
	AccountingInvoiceDetailsSchema,
	AccountingInvoicesSchema,
	AccountingPricingsSchema,
	AccountingSalesSchema,
	type CurrentInvoice,
	type InvoiceDetails,
	type Invoices,
	type Pricings,
	type Sales,
} from '../schema'

export class Accounting {
	constructor(private apiClient: ApiClient) {}

	/**
	 * List all invoices for the reseller account.
	 *
	 * @returns A promise resolving to the list of invoices.
	 * @see {@link https://docs.fireapi.de/request/accounting/invoices | fireapi.de API Documentation}
	 */
	async listInvoices(): Promise<ApiResult<Invoices>> {
		return this.apiClient.get('/accounting/invoices', AccountingInvoicesSchema)
	}

	/**
	 * Get detailed information about a specific invoice.
	 *
	 * @param invoiceID - The invoice ID to retrieve details for.
	 * @returns A promise resolving to the invoice details.
	 * @see {@link https://docs.fireapi.de/request/accounting/invoices/:invoiceID | fireapi.de API Documentation}
	 */
	async getInvoiceDetails(
		invoiceID: string,
	): Promise<ApiResult<InvoiceDetails>> {
		return this.apiClient.get(
			`/accounting/invoices/${invoiceID}`,
			AccountingInvoiceDetailsSchema,
		)
	}

	/**
	 * Get the current invoice for the reseller account.
	 *
	 * @returns A promise resolving to the current invoice details.
	 * @see {@link https://docs.fireapi.de/request/accounting/invoices/current | fireapi.de API Documentation}
	 */
	async getCurrentInvoice(): Promise<ApiResult<CurrentInvoice>> {
		return this.apiClient.get(
			'/accounting/invoices/current',
			AccountingCurrentInvoiceSchema,
		)
	}

	/**
	 * Get pricing information for all services.
	 *
	 * @returns A promise resolving to the pricing details.
	 * @see {@link https://docs.fireapi.de/request/accounting/pricings | fireapi.de API Documentation}
	 */
	async getPricings(): Promise<ApiResult<Pricings>> {
		return this.apiClient.get('/accounting/pricings', AccountingPricingsSchema)
	}

	/**
	 * List all sales for the reseller account.
	 *
	 * @returns A promise resolving to the list of sales.
	 * @see {@link https://docs.fireapi.de/request/accounting/sales | fireapi.de API Documentation}
	 */
	async listSales(): Promise<ApiResult<Sales>> {
		return this.apiClient.get('/accounting/sales', AccountingSalesSchema)
	}
}
