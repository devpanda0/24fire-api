import { type Type, type } from 'arktype'

export type VmBackupCreateStatusRequest = {
	backup_id: string
}
export const VmBackupCreateStatusRequestSchema: Type<VmBackupCreateStatusRequest> =
	type({
		backup_id: 'string.uuid.v4',
	})

export type VmBackupCreateStatus = {
	status: 'pending' | 'finished'
	progress: {
		percentage: number
		data_stored: number
		total_data: number
	} | null
}
export const VmBackupCreateStatusSchema: Type<VmBackupCreateStatus> = type({
	status: "'pending'",
	progress: {
		percentage: 'number',
		data_stored: 'number',
		total_data: 'number',
	},
}).or({
	status: "'finished'",
	progress: type.null,
})
