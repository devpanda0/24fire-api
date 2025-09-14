import { type Type, type } from 'arktype'

export type IpNetLocation = {
	name: string
	displayname: string
	country: string
	city: string
}
export const IpNetLocationSchema: Type<IpNetLocation> = type({
	name: 'string',
	displayname: 'string',
	country: 'string',
	city: 'string',
})

export type IpNetPrice = {
	net: number
	gross: number
}
export const IpNetPriceSchema: Type<IpNetPrice> = type({
	net: 'number',
	gross: 'number',
})

export type PurchasableIpNet = {
	info: string
	netID: string
	price: IpNetPrice
	renewInterval: string
	cidr: string
	gateway: string
	usable_ips: string[]
	location: IpNetLocation
}
export const PurchasableIpNetSchema: Type<PurchasableIpNet> = type({
	info: 'string',
	netID: 'string.uuid.v4',
	price: IpNetPriceSchema,
	renewInterval: 'string',
	cidr: 'string',
	gateway: 'string.ip.v4',
	usable_ips: 'string.ip.v4[]',
	location: IpNetLocationSchema,
})

export type IpAvailable = PurchasableIpNet[]
export const IpAvailableSchema: Type<IpAvailable> =
	PurchasableIpNetSchema.array()
