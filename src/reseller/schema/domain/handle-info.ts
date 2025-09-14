import { type Type, type } from 'arktype'

export type HandleInfo = {
	handle: string
	type: string
	gender: 'MALE' | 'FEMALE'
	firstname: string
	lastname: string
	organisation: string | null
	street: string
	number: string
	zipcode: string
	city: string
	region: string
	country: string
	countrycode: string
	email: string
	phone: string
	fax: string | null
}
export const HandleInfoSchema: Type<HandleInfo> = type({
	handle: 'string',
	type: 'string',
	gender: "'MALE' | 'FEMALE'",
	firstname: 'string',
	lastname: 'string',
	organisation: 'string | null',
	street: 'string',
	number: 'string',
	zipcode: 'string',
	city: 'string',
	region: 'string',
	country: 'string',
	countrycode: 'string',
	email: 'string.email',
	phone: 'string',
	fax: 'string | null',
})
