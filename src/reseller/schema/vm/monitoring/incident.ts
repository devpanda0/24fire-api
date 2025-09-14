import { type Type, type } from 'arktype'

export type VmMonitoringStatistic = {
	downtime: number
	availability: number
	incidences: number
	longest_incidence: number
	average_incidence: number
}
export const VmMonitoringStatisticSchema: Type<VmMonitoringStatistic> = type({
	downtime: 'number',
	availability: 'number',
	incidences: 'number',
	longest_incidence: 'number',
	average_incidence: 'number',
})

export type VmMonitoringIncidence = {
	start: string
	end: string | null
	downtime: number
	type: 'PING_TIMEOUT' | 'VM_STOPPED'
}
export const VmMonitoringIncidenceSchema: Type<VmMonitoringIncidence> = type({
	start: 'string.date.iso',
	end: 'string.date.iso | null',
	downtime: 'number',
	type: "'PING_TIMEOUT' | 'VM_STOPPED'",
})

export type VmMonitoringIncidences = {
	statistic: {
		LAST_24_HOURS: VmMonitoringStatistic
		LAST_7_DAYS: VmMonitoringStatistic
		LAST_14_DAYS: VmMonitoringStatistic
		LAST_30_DAYS: VmMonitoringStatistic
		LAST_90_DAYS: VmMonitoringStatistic
		LAST_180_DAYS: VmMonitoringStatistic
	}
	incidences: VmMonitoringIncidence[]
}
export const VmMonitoringIncidencesSchema: Type<VmMonitoringIncidences> = type({
	statistic: {
		LAST_24_HOURS: VmMonitoringStatisticSchema,
		LAST_7_DAYS: VmMonitoringStatisticSchema,
		LAST_14_DAYS: VmMonitoringStatisticSchema,
		LAST_30_DAYS: VmMonitoringStatisticSchema,
		LAST_90_DAYS: VmMonitoringStatisticSchema,
		LAST_180_DAYS: VmMonitoringStatisticSchema,
	},
	incidences: VmMonitoringIncidenceSchema.array(),
})
