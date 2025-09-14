import { type Type, type } from 'arktype'

//
// VM Monitoring Change
//
export type VmMonitoringChangeRequest = {
	enabled: boolean
	port: number
}
export const VmMonitoringChangeRequestSchema: Type<VmMonitoringChangeRequest> =
	type({
		enabled: 'boolean',
		port: 'number.integer > 0',
	})

export type VmMonitoringChange = {
	enabled: boolean
	port: number
}
export const VmMonitoringChangeSchema: Type<VmMonitoringChange> = type({
	enabled: 'boolean',
	port: 'number.integer > 0',
})
