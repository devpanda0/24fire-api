import { type Type, type } from 'arktype'

type KvmPowerRequest = {
	mode: 'start' | 'stop' | 'restart'
}
export const KvmPowerRequestSchema: Type<KvmPowerRequest> = type({
	mode: "'start' | 'stop' | 'restart'",
})

export type KvmPower = Record<string, unknown> | null
export const KvmPowerSchema: Type<KvmPower> = type
	.Record('string', 'unknown')
	.or(type.null)
