import { type Type, type } from 'arktype'

export type DedicatedPurchaseRequest = {
	webhook?: string
	connect?: string
}
export const DedicatedPurchaseRequestSchema: Type<DedicatedPurchaseRequest> =
	type({
		'webhook?': 'string.url <= 256',
		'connect?': 'string.uuid.v4',
	})

export type DedicatedPurchase = { identifier: string }
export const DedicatedPurchaseSchema: Type<DedicatedPurchase> = type({
	identifier: 'string.uuid.v4',
})
