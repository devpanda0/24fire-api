import { type Type, type } from 'arktype'

//
// Domain Pricings Response
//
export type DomainPricings = Record<
	string,
	{
		price_net: {
			create: number
			renew: number
			transfer: number
		}
		price_gross: {
			create: number
			renew: number
			transfer: number
		}
	}
>
export const DomainPricingsSchema: Type<DomainPricings> = type({
	'[string]': {
		price_net: {
			create: 'number',
			renew: 'number',
			transfer: 'number',
		},
		price_gross: {
			create: 'number',
			renew: 'number',
			transfer: 'number',
		},
	},
})
