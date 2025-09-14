import { type Type, type } from 'arktype'

export type AccountInvoiceAddress = {
	name: string
	street: string
	number: string
	zip: string
	city: string
	country: string
}
export const AccountInvoiceAddressSchema: Type<AccountInvoiceAddress> = type({
	name: 'string',
	street: 'string',
	number: 'string',
	zip: 'string',
	city: 'string',
	country: 'string',
})

export type AccountInfo = {
	id: number
	firstname: string
	lastname: string
	email: string
	profile_image: string
	balance: number
	is_plus_user: boolean
	registry_date: string
	discord_id: string | null
	invoice_address: AccountInvoiceAddress
}
export const AccountInfoSchema: Type<AccountInfo> = type({
	id: 'number.integer',
	firstname: 'string',
	lastname: 'string',
	email: 'string.email',
	profile_image: 'string.url',
	balance: 'number',
	is_plus_user: 'boolean',
	registry_date: 'string.date.iso',
	discord_id: 'string | null',
	invoice_address: AccountInvoiceAddressSchema,
})
