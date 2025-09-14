import { type Type, type } from 'arktype'

export type HandleCreateRequest = {
	gender: 'MALE' | 'FEMALE'
	firstname: string
	lastname: string
	street: string
	number: string
	zipcode: string
	city: string
	region: string
	countrycode: string
	email: string
}
export const HandleCreateRequestSchema: Type<HandleCreateRequest> = type({
	gender: "'MALE' | 'FEMALE'",
	firstname: 'string',
	lastname: 'string',
	street: 'string',
	number: 'string',
	zipcode: 'string',
	city: 'string',
	region: 'string',
	countrycode: 'string',
	email: 'string.email',
})

export type HandleCreate = {
	handle: string
}
export const HandleCreateSchema: Type<HandleCreate> = type({
	handle: 'string',
})
