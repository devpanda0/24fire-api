import { type Type, type } from 'arktype'

type VmBackupRestoreRequest = {
	backup_id: string
}
export const VmBackupRestoreRequestSchema: Type<VmBackupRestoreRequest> = type({
	backup_id: 'string.uuid.v4',
})

export type VmBackupRestore = {
	backup_id: string
}
export const VmBackupRestoreSchema: Type<VmBackupRestore> = type({
	backup_id: 'string.uuid.v4',
})
