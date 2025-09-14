import { type Type, type } from 'arktype'

export type VmBackupsList = {
	backup_id: string
	backup_os: string
	backup_description: string
	size: number
	created: string
	status: 'pending' | 'finished'
}[]
export const VmBackupsListSchema: Type<VmBackupsList> = type({
	backup_id: 'string.uuid.v4',
	backup_os: 'string',
	backup_description: 'string',
	size: 'number >= 0',
	created: 'string',
	status: "'pending' | 'finished'",
}).array()
