import { type Type, type } from 'arktype'

export type HandleUpdateRequest = {
	gender?: 'MALE' | 'FEMALE'
	street?: string
	number?: string
	zipcode?: string
	city?: string
	region?: string
	countrycode?: string
	email?: string
}
export const HandleUpdateRequestSchema: Type<HandleUpdateRequest> = type({
	'gender?': "'MALE' | 'FEMALE'",
	'street?': 'string',
	'number?': 'string',
	'zipcode?': 'string',
	'city?': 'string',
	'region?': 'string',
	'countrycode?': 'string',
	'email?': 'string.email',
})

export type HandleUpdate = null
export const HandleUpdateSchema: Type<HandleUpdate> = type.null
