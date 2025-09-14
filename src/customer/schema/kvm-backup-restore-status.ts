import { type Type, type } from 'arktype'

export type VmBackupRestoreProgress = { percentage: number }
export const VmBackupRestoreProgressSchema: Type<VmBackupRestoreProgress> =
	type({
		percentage: '0 <= number.integer <= 100',
	})
export type KvmBackupRestoreStatusRequest = {
	backup_id: string
}
export const KvmBackupRestoreStatusRequestSchema: Type<KvmBackupRestoreStatusRequest> =
	type({
		backup_id: 'string.uuid.v4',
	})

export type KvmBackupRestoreStatus = {
	status: 'pending' | 'finished'
	progress: VmBackupRestoreProgress
}
export const KvmBackupRestoreStatusSchema: Type<KvmBackupRestoreStatus> = type({
	status: "'pending' | 'finished'",
	progress: VmBackupRestoreProgressSchema,
})
