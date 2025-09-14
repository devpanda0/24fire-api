import { type Type, type } from 'arktype'

type IpPurchaseRequest = {
	netID: string
}
export const IpPurchaseRequestSchema: Type<IpPurchaseRequest> = type({
	netID: 'string.uuid.v4',
})

export type IpPurchase = null
export const IpPurchaseSchema: Type<IpPurchase> = type.null
