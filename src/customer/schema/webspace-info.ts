import { type Type, type } from 'arktype'

//
// Common Webspace Types
//
export type WebspaceAccounting = {
	buy_date: string
	buy_price: number
	renew_date: string
	renew_price: number
	renew_interval: number
	auto_renew: boolean
}
export const WebspaceAccountingSchema: Type<WebspaceAccounting> = type({
	buy_date: 'string.date.iso',
	buy_price: 'number',
	renew_date: 'string.date.iso',
	renew_price: 'number',
	renew_interval: 'number.integer',
	auto_renew: 'boolean',
})

export type WebspaceResources = {
	domains: number
	subdomains: number
	emails: number
	databases: number
	ssd_storage: number
	traffic: number
	memory_limit: number
	ip_address: string
}
export const WebspaceResourcesSchema: Type<WebspaceResources> = type({
	domains: 'number.integer',
	subdomains: 'number.integer',
	emails: 'number.integer',
	databases: 'number.integer',
	ssd_storage: 'number.integer',
	traffic: 'number.integer',
	memory_limit: 'number.integer',
	ip_address: 'string',
})

export type WebspaceAccess = {
	host: string
	email: string
	username: string
	password: string
}
export const WebspaceAccessSchema: Type<WebspaceAccess> = type({
	host: 'string',
	email: 'string.email',
	username: 'string',
	password: 'string',
})

//
// Webspace Info
//
export type WebspaceInfo = {
	accounting: WebspaceAccounting
	resources: WebspaceResources
	access: WebspaceAccess
}
export const WebspaceInfoSchema: Type<WebspaceInfo> = type({
	accounting: WebspaceAccountingSchema,
	resources: WebspaceResourcesSchema,
	access: WebspaceAccessSchema,
})
