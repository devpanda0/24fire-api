import { type Type, type } from 'arktype'

//
// Common Monitoring Types
//
export type MonitoringTiming = {
	date: string
	cpu: string
	mem: string
	ping: number
}
export const MonitoringTimingSchema: Type<MonitoringTiming> = type({
	date: 'string.date.iso',
	cpu: 'string.numeric',
	mem: 'string.numeric',
	ping: 'number.integer',
})

//
// KVM Monitoring Timings
//
export type KvmMonitoringTimings = { timings: MonitoringTiming[] }
export const KvmMonitoringTimingsSchema: Type<KvmMonitoringTimings> = type({
	timings: MonitoringTimingSchema.array(),
})
