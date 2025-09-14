import { type Type, type } from 'arktype'

type IpNetLocation = {
	name: string
	displayname: string
	country: string
	city: string
}
const IpNetLocationSchema: Type<IpNetLocation> = type({
	name: 'string',
	displayname: 'string',
	country: 'string',
	city: 'string',
})

type IpNetPrice = {
	net: number
	gross: number
}
const IpNetPriceSchema: Type<IpNetPrice> = type({
	net: 'number',
	gross: 'number',
})

export type IpOwnedItem = {
	netID: string
	price: IpNetPrice
	renewInterval: string
	buyDate: string
	renewDate: string
	cidr: string
	gateway: string
	total_ips: number
	available_ips: number
	ip_usage: Record<string, boolean | null>
	location: IpNetLocation
}
export const IpOwnedItemSchema: Type<IpOwnedItem> = type({
	netID: 'string.uuid.v4',
	price: IpNetPriceSchema,
	renewInterval: 'string',
	buyDate: 'string.date.iso',
	renewDate: 'string.date.iso',
	cidr: 'string',
	gateway: 'string.ip.v4',
	total_ips: 'number',
	available_ips: 'number',
	ip_usage: type.Record('string', 'boolean | null'),
	location: IpNetLocationSchema,
})

export type IpOwnedList = {
	summary: {
		total_nets: number
		total_ips: number
		available_ips: number
	}
	list: IpOwnedItem[]
}
export const IpOwnedListSchema: Type<IpOwnedList> = type({
	summary: {
		total_nets: 'number',
		total_ips: 'number',
		available_ips: 'number',
	},
	list: IpOwnedItemSchema.array(),
})
