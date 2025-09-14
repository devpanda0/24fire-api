import { type Type, type } from 'arktype'

//
// Delete KVM Backup
//
export type DeleteKvmBackupRequest = {
	backup_id: string
}
export const DeleteKvmBackupRequestSchema: Type<DeleteKvmBackupRequest> = type({
	backup_id: 'string.uuid.v4',
})

export type DeleteKvmBackup = null
export const DeleteKvmBackupSchema: Type<DeleteKvmBackup> = type.null
