import { type Type, type } from 'arktype'
import {
	type InvoicePositionVmEntry,
	InvoicePositionVmEntrySchema,
} from './invoice-details'

//
// Accounting Current Invoice
//
export type CurrentInvoice = {
	currentInvoiceTotal: number
	nextInvoiceDate: string
	estimatedInvoiceTotal: number
	positions: {
		vms: Record<string, InvoicePositionVmEntry[]>
	}
}
export const AccountingCurrentInvoiceSchema: Type<CurrentInvoice> = type({
	currentInvoiceTotal: 'number',
	nextInvoiceDate: 'string.date.iso',
	estimatedInvoiceTotal: 'number',
	positions: {
		vms: { '[string]': InvoicePositionVmEntrySchema.array() },
	},
})
