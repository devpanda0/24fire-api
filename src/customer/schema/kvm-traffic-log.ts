import { type Type, type } from 'arktype'

export type VmTrafficLogEntry = {
	date: string
	in: number
	out: number
}
export const VmTrafficLogEntrySchema: Type<VmTrafficLogEntry> = type({
	date: 'string.date.iso',
	in: 'number',
	out: 'number',
})

export type KvmTrafficLog = {
	month:
		| 'JANUARY'
		| 'FEBRUARY'
		| 'MARCH'
		| 'APRIL'
		| 'MAY'
		| 'JUNE'
		| 'JULY'
		| 'AUGUST'
		| 'SEPTEMBER'
		| 'OCTOBER'
		| 'NOVEMBER'
		| 'DECEMBER'
	log: VmTrafficLogEntry[]
}
export const KvmTrafficLogSchema: Type<KvmTrafficLog> = type({
	month:
		"'JANUARY' | 'FEBRUARY' | 'MARCH' | 'APRIL' | 'MAY' | 'JUNE' | 'JULY' | 'AUGUST' | 'SEPTEMBER' | 'OCTOBER' | 'NOVEMBER' | 'DECEMBER'",
	log: VmTrafficLogEntrySchema.array(),
})
