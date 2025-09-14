import { type Type, type } from 'arktype'

//
// Common Donation Types
//
export type DonationStatus = 'open' | 'paid'
export const DonationStatusSchema: Type<DonationStatus> = type.enumerated(
	'open',
	'paid',
)

export type DonationInformation = {
	enabled: boolean
	description: string
	link: string
	background_image: string
}
export const DonationInformationSchema: Type<DonationInformation> = type({
	enabled: 'boolean',
	description: 'string',
	link: 'string.url',
	background_image: 'string.url',
})

export type DonationBundleOption = {
	name: string
	description: string
	price: number
	input_field: string
}
export const DonationBundleOptionSchema: Type<DonationBundleOption> = type({
	name: 'string',
	description: 'string',
	price: 'number',
	input_field: 'string',
})

export type DonationBundleRef = {
	name: string
	input_field: string
}
export const DonationBundleRefSchema: Type<DonationBundleRef> = type({
	name: 'string',
	input_field: 'string',
})

export type Donation = {
	id: string
	date: string
	donator: string
	amount: number
	bundle: DonationBundleRef | null
	status: DonationStatus
}
export const DonationSchema: Type<Donation> = type({
	id: 'string',
	date: 'string.date.iso',
	donator: 'string',
	amount: 'number',
	bundle: DonationBundleRefSchema.or(type.null),
	status: DonationStatusSchema,
})

//
// Account Donations
//
export type AccountDonations = {
	information: DonationInformation
	bundles: DonationBundleOption[] | null
	donations: Donation[]
}
export const AccountDonationsSchema: Type<AccountDonations> = type({
	information: DonationInformationSchema,
	bundles: DonationBundleOptionSchema.array().or(type.null),
	donations: DonationSchema.array(),
})
