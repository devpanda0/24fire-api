import { type Type, type } from 'arktype'
import { type DedicatedItem, DedicatedItemSchema } from './available'

export type DedicatedAvailability =
	| { available: true; data: DedicatedItem }
	| { available: false; data: null }
export const DedicatedAvailabilitySchema: Type<DedicatedAvailability> = type({
	available: 'true',
	data: DedicatedItemSchema,
}).or({
	available: 'false',
	data: 'null',
})
