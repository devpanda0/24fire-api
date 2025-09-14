import { type Type, type } from 'arktype'

export type VmMonitoringTimingEntry = {
	date: string
	cpu: string
	mem: string
	ping: number
}
export const VmMonitoringTimingEntrySchema: Type<VmMonitoringTimingEntry> =
	type({
		date: 'string.date.iso',
		cpu: 'string',
		mem: 'string',
		ping: 'number',
	})

export type VmMonitoringTimings = {
	timings: VmMonitoringTimingEntry[]
}
export const VmMonitoringTimingsSchema: Type<VmMonitoringTimings> = type({
	timings: VmMonitoringTimingEntrySchema.array(),
})
