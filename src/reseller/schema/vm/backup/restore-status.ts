import { type Type, type } from 'arktype'

type VmBackupRestoreStatusRequest = {
	backup_id: string
}
export const VmBackupRestoreStatusRequestSchema: Type<VmBackupRestoreStatusRequest> =
	type({
		backup_id: 'string.uuid.v4',
	})

export type VmBackupRestoreStatus = {
	status: 'pending' | 'finished'
	progress: {
		percentage: number
	}
}
export const VmBackupRestoreStatusSchema: Type<VmBackupRestoreStatus> = type({
	status: "'pending' | 'finished'",
	progress: {
		percentage: 'number',
	},
})
