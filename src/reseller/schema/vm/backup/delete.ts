import { type Type, type } from 'arktype'

type VmBackupDeleteRequest = {
	backup_id: string
}
export const VmBackupDeleteRequestSchema: Type<VmBackupDeleteRequest> = type({
	backup_id: 'string.uuid.v4',
})

export type VmBackupDelete = null
export const VmBackupDeleteSchema: Type<VmBackupDelete> = type.null
