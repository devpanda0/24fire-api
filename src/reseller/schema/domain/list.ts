import { type Type, type } from 'arktype'

export type DomainList = {
	list: string[]
}
export const DomainListSchema: Type<DomainList> = type({
	list: 'string[]',
})
