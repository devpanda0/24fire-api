import { type Type, type } from 'arktype'

//
// Pricing Item
//
export type PricingItem = {
	price_net: number
	price_gross: number
	info: string
}
export const PricingItemSchema: Type<PricingItem> = type({
	price_net: 'number',
	price_gross: 'number',
	info: 'string',
})

//
// KVM Host Pricing
//
export type KvmHostPricing = {
	core: PricingItem
	mem: PricingItem
	nvme: PricingItem
	ipv4: PricingItem
	backup: PricingItem
	network: PricingItem
}
export const KvmHostPricingSchema: Type<KvmHostPricing> = type({
	core: PricingItemSchema,
	mem: PricingItemSchema,
	nvme: PricingItemSchema,
	ipv4: PricingItemSchema,
	backup: PricingItemSchema,
	network: PricingItemSchema,
})

//
// KVM Pricing
//
export type KvmPricing = Record<string, KvmHostPricing>
export const KvmPricingSchema: Type<KvmPricing> = type({
	'[string]': KvmHostPricingSchema,
})

//
// Domain Action Prices
//
export type DomainActionPrices = {
	create: number
	renew: number
	transfer: number
}
export const DomainActionPricesSchema: Type<DomainActionPrices> = type({
	create: 'number',
	renew: 'number',
	transfer: 'number',
})

//
// Domain TLD Pricing
//
export type DomainTldPricing = {
	price_net: DomainActionPrices
	price_gross: DomainActionPrices
}
export const DomainTldPricingSchema: Type<DomainTldPricing> = type({
	price_net: DomainActionPricesSchema,
	price_gross: DomainActionPricesSchema,
})

//
// Domain Pricing
//
export type DomainPricing = Record<string, DomainTldPricing>
export const DomainPricingSchema: Type<DomainPricing> = type({
	'[string]': DomainTldPricingSchema,
})

//
// Accounting Pricings
//
export type Pricings = {
	kvm: KvmPricing
	domains: DomainPricing
}
export const AccountingPricingsSchema: Type<Pricings> = type({
	kvm: KvmPricingSchema,
	domains: DomainPricingSchema,
})
