import { type Type, type } from 'arktype'

type VmPowerRequest = {
	mode: 'start' | 'stop' | 'restart'
}
export const VmPowerRequestSchema: Type<VmPowerRequest> = type({
	mode: "'start' | 'stop' | 'restart'",
})

export type VmPower = Record<string, unknown> | null
export const VmPowerSchema: Type<VmPower> = type
	.Record('string', 'unknown')
	.or(type.null)
