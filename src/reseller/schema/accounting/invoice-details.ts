import { type Type, type } from 'arktype'
import {
	type AccountingInvoiceStatus,
	AccountingInvoiceStatusSchema,
} from './invoices'

//
// Invoice Position VM Entry
//
export type InvoicePositionVmEntry = {
	type: string
	start: string
	stop: string
	totalRuntime: number | null
	monthlyPrice: number
	totalPrice: number | null
}
export const InvoicePositionVmEntrySchema: Type<InvoicePositionVmEntry> = type({
	type: 'string',
	start: 'string.date.iso',
	stop: 'string.date.iso',
	totalRuntime: 'number | null',
	monthlyPrice: 'number',
	totalPrice: 'number | null',
})

//
// Accounting Invoice Positions
//
export type AccountingInvoicePositions = {
	vms: Record<string, InvoicePositionVmEntry[]>
}
export const AccountingInvoicePositionsSchema: Type<AccountingInvoicePositions> =
	type({
		vms: { '[string]': InvoicePositionVmEntrySchema.array() },
	})

//
// Accounting Invoice Details
//
export type InvoiceDetails = {
	created: string
	total: number
	status: AccountingInvoiceStatus
	invoice: string
	positions: AccountingInvoicePositions
}
export const AccountingInvoiceDetailsSchema: Type<InvoiceDetails> = type({
	created: 'string.date.iso',
	total: 'number',
	status: AccountingInvoiceStatusSchema,
	invoice: 'string.url',
	positions: AccountingInvoicePositionsSchema,
})
