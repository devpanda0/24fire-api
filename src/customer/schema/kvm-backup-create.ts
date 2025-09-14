import { type Type, type } from 'arktype'

//
// Create KVM Backup
//
export type CreateKvmBackupRequest = {
	description?: string
}
export const CreateKvmBackupRequestSchema: Type<CreateKvmBackupRequest> = type({
	'description?': 'string <= 24',
})

export type CreateKvmBackup = {
	backup_id: string
}
export const CreateKvmBackupSchema: Type<CreateKvmBackup> = type({
	backup_id: 'string.uuid.v4',
})
