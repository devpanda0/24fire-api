import { type Type, type } from 'arktype'

//
// Restore KVM Backup
//
export type KvmBackupRestoreRequest = {
	backup_id: string
}
export const KvmBackupRestoreRequestSchema: Type<KvmBackupRestoreRequest> =
	type({
		backup_id: 'string.uuid.v4',
	})

export type KvmBackupRestore = {
	backup_id: string
}
export const KvmBackupRestoreSchema: Type<KvmBackupRestore> = type({
	backup_id: 'string.uuid.v4',
})
