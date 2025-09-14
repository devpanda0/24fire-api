import { type Type, type } from 'arktype'

export type VmTrafficCurrent = {
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
	usage: {
		total: number
		in: number
		out: number
	}
	limit: {
		monthly: number
		additional: number | null
		remaining: number
		vm_status: 'normal' | 'throttled'
	} | null
}
export const VmTrafficCurrentSchema: Type<VmTrafficCurrent> = type({
	month:
		"'JANUARY' | 'FEBRUARY' | 'MARCH' | 'APRIL' | 'MAY' | 'JUNE' | 'JULY' | 'AUGUST' | 'SEPTEMBER' | 'OCTOBER' | 'NOVEMBER' | 'DECEMBER'",
	usage: {
		total: 'number >= 0',
		in: 'number >= 0',
		out: 'number >= 0',
	},
	limit: type({
		monthly: 'number >= 0',
		additional: 'number >= 0 | null',
		remaining: 'number >= 0',
		vm_status: "'normal' | 'throttled'",
	}).or(type.null),
})
