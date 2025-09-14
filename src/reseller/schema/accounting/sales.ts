import { type Type, type } from 'arktype'

//
// Sale Pricing Resource
//
export type SalePricingResource = {
	price_net: number | string
	price_gross: number
}
export const SalePricingResourceSchema: Type<SalePricingResource> = type({
	price_net: 'number | string',
	price_gross: 'number',
})

//
// Sale Host Pricing
//
export type SaleHostPricing = Record<string, SalePricingResource>
export const SaleHostPricingSchema: Type<SaleHostPricing> = type({
	'[string]': SalePricingResourceSchema,
})

//
// Sale Pricings Value
//
export type SalePricingsValue = Record<string, SaleHostPricing>
export const SalePricingsValueSchema: Type<SalePricingsValue> = type({
	'[string]': SaleHostPricingSchema,
})

//
// Accounting Sale
//
export type AccountingSale = {
	title: string
	startDate: { value: string; description: string }
	stopDate: { value: string | null; description: string }
	upgradable: { value: boolean; description: string }
	maxVolume: { value: number; description: string }
	usedVolume: { value: number; description: string }
	pricings: { value: SalePricingsValue; description: string }
}
export const AccountingSaleSchema: Type<AccountingSale> = type({
	title: 'string',
	startDate: { value: 'string.date.iso', description: 'string' },
	stopDate: { value: 'string.date.iso | null', description: 'string' },
	upgradable: { value: 'boolean', description: 'string' },
	maxVolume: { value: 'number.integer', description: 'string' },
	usedVolume: { value: 'number.integer', description: 'string' },
	pricings: { value: SalePricingsValueSchema, description: 'string' },
})

//
// Accounting Sales
//
export type Sales = AccountingSale[]
export const AccountingSalesSchema: Type<Sales> = AccountingSaleSchema.array()
