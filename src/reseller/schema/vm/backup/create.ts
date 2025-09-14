import { type Type, type } from 'arktype'

//
// VM Backup Create
//
export type VmBackupCreateRequest = {
	description?: string
}
export const VmBackupCreateRequestSchema: Type<VmBackupCreateRequest> = type({
	'description?': 'string <= 24',
})

export type VmBackupCreate = {
	backup_id: string
}
export const VmBackupCreateSchema: Type<VmBackupCreate> = type({
	backup_id: 'string.uuid.v4',
})
