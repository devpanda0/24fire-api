import { type Type, type } from 'arktype'

//
// Accounting Invoice Status
//
export type AccountingInvoiceStatus = 'OPEN' | 'PAID' | 'CANCELED'
export const AccountingInvoiceStatusSchema: Type<AccountingInvoiceStatus> =
	type("'OPEN' | 'PAID' | 'CANCELED'")

//
// Accounting Invoice Entry
//
export type AccountingInvoiceEntry = {
	created: string
	total: number
	status: AccountingInvoiceStatus
	invoice: string
}
export const AccountingInvoiceEntrySchema: Type<AccountingInvoiceEntry> = type({
	created: 'string.date.iso',
	total: 'number',
	status: AccountingInvoiceStatusSchema,
	invoice: 'string.url',
})

//
// Accounting Invoices
//
export type Invoices = Record<string, AccountingInvoiceEntry>
export const AccountingInvoicesSchema: Type<Invoices> = type({
	'[string]': AccountingInvoiceEntrySchema,
})
