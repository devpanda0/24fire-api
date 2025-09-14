import { type Type, type } from 'arktype'

//
// Common Monitoring Types
//
export type VmMonitoringType = 'PING_TIMEOUT' | 'VM_STOPPED'
export const VmMonitoringTypeSchema: Type<VmMonitoringType> = type.enumerated(
	'PING_TIMEOUT',
	'VM_STOPPED',
)

export type VmMonitoringStatsWindow = {
	downtime: number
	availability: number
	incidences: number
	longest_incidence: number
	average_incidence: number
}
export const VmMonitoringStatsWindowSchema: Type<VmMonitoringStatsWindow> =
	type({
		downtime: 'number.integer',
		availability: 'number',
		incidences: 'number.integer',
		longest_incidence: 'number.integer',
		average_incidence: 'number',
	})

export type VmMonitoringStatistics = {
	LAST_24_HOURS: VmMonitoringStatsWindow
	LAST_7_DAYS: VmMonitoringStatsWindow
	LAST_14_DAYS: VmMonitoringStatsWindow
	LAST_30_DAYS: VmMonitoringStatsWindow
	LAST_90_DAYS: VmMonitoringStatsWindow
	LAST_180_DAYS: VmMonitoringStatsWindow
}
export const VmMonitoringStatisticsSchema: Type<VmMonitoringStatistics> = type({
	LAST_24_HOURS: VmMonitoringStatsWindowSchema,
	LAST_7_DAYS: VmMonitoringStatsWindowSchema,
	LAST_14_DAYS: VmMonitoringStatsWindowSchema,
	LAST_30_DAYS: VmMonitoringStatsWindowSchema,
	LAST_90_DAYS: VmMonitoringStatsWindowSchema,
	LAST_180_DAYS: VmMonitoringStatsWindowSchema,
})

export type VmMonitoringIncidence = {
	start: string
	end: string | null
	downtime: number
	type: VmMonitoringType
}
export const VmMonitoringIncidenceSchema: Type<VmMonitoringIncidence> = type({
	start: 'string.date.iso',
	end: 'string.date.iso | null',
	downtime: 'number.integer',
	type: VmMonitoringTypeSchema,
})

//
// KVM Monitoring Incidences
//
export type KvmMonitoringIncidences = {
	statistic: VmMonitoringStatistics
	incidences: VmMonitoringIncidence[]
}
export const KvmMonitoringIncidencesSchema: Type<KvmMonitoringIncidences> =
	type({
		statistic: VmMonitoringStatisticsSchema,
		incidences: VmMonitoringIncidenceSchema.array(),
	})
