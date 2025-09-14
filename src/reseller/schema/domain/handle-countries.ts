import { type Type, type } from 'arktype'

export type HandleCountries = {
	code: string
	title: string
}[]
export const HandleCountriesSchema: Type<HandleCountries> = type({
	code: 'string',
	title: 'string',
}).array()
