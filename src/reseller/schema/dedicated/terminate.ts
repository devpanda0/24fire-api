import { type Type, type } from 'arktype'

export type Terminate = {
	identifier: string
	termination_date: string
}

export const DedicatedTerminateSchema: Type<Terminate> = type({
	identifier: 'string.uuid.v4',
	termination_date: 'string.date.iso',
})
