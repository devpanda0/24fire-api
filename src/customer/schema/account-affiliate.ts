import { type Type, type } from 'arktype'

//
// Common Affiliate Types
//
export type AffiliateStatus = 'confirmed' | 'not_confirmed' | 'canceled'
export const AffiliateStatusSchema: Type<AffiliateStatus> = type.enumerated(
	'confirmed',
	'not_confirmed',
	'canceled',
)

export type AffiliateInformation = { link: string }
export const AffiliateInformationSchema: Type<AffiliateInformation> = type({
	link: 'string.url',
})

export type AffiliateSummary = {
	confirmed_leads: number
	url_clicks: number
	balance_paid: number
	balance_pending: number
}
export const AffiliateSummarySchema: Type<AffiliateSummary> = type({
	confirmed_leads: 'number.integer',
	url_clicks: 'number.integer',
	balance_paid: 'number',
	balance_pending: 'number',
})

export type AffiliateLead = {
	customer: string
	date: string
	buy_price: number
	product_name: string
	status: AffiliateStatus
}
export const AffiliateLeadSchema: Type<AffiliateLead> = type({
	customer: 'string',
	date: 'string.date.iso',
	buy_price: 'number',
	product_name: 'string',
	status: AffiliateStatusSchema,
})

//
// Account Affiliate
//
export type AccountAffiliate = {
	information: AffiliateInformation
	summary: AffiliateSummary
	leads: AffiliateLead[]
}
export const AccountAffiliateSchema: Type<AccountAffiliate> = type({
	information: AffiliateInformationSchema,
	summary: AffiliateSummarySchema,
	leads: AffiliateLeadSchema.array(),
})
