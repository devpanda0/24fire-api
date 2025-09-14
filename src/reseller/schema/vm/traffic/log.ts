import { type Type, type } from 'arktype'

export type VmTrafficLogRequest = {
	start?: string
	end?: string
}
export const VmTrafficLogRequestSchema: Type<VmTrafficLogRequest> = type({
	'start?': 'string',
	'end?': 'string',
})

type VmTraffic = {
	date: string
	in: number
	out: number
}

const VaTraffic = type({
	date: 'string',
	in: 'number',
	out: 'number',
})

export type VmTrafficLog = {
	month: string
	log: VmTraffic[]
}
export const VmTrafficLogSchema: Type<VmTrafficLog> = type({
	month: 'string',
	log: VaTraffic.array(),
})
