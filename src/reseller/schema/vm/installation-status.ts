import { type Type, type } from 'arktype'

//
// VM Installation Status
//
export type VmInstallationStatus = {
	status: 'pending' | 'finished'
	progress: { percentage: number } | null
}
export const VmInstallationStatusSchema: Type<VmInstallationStatus> = type({
	status: "'pending'",
	progress: {
		percentage: 'number.integer <= 100 | number.integer >= 0',
	},
}).or({
	status: "'finished'",
	progress: type.null,
})
