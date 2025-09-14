import { type Type, type } from 'arktype'

export type VmBackupTaskProgress = {
	percentage: number
	data_stored: number
	total_data: number
}
export const VmBackupTaskProgressSchema: Type<VmBackupTaskProgress> = type({
	percentage: '0 <= number.integer <= 100',
	data_stored: 'number',
	total_data: 'number',
})

export type KvmBackupCreateStatusRequest = {
	backup_id: string
}
export const KvmBackupCreateStatusRequestSchema: Type<KvmBackupCreateStatusRequest> =
	type({
		backup_id: 'string.uuid.v4',
	})

export type KvmBackupCreateStatus = {
	status: 'pending' | 'finished'
	progress: VmBackupTaskProgress | null
}
export const KvmBackupCreateStatusSchema: Type<KvmBackupCreateStatus> = type({
	status: "'pending' | 'finished'",
	progress: VmBackupTaskProgressSchema.or(type.null),
})
