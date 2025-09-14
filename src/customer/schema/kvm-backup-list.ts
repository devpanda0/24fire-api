import { type Type, type } from 'arktype'

export type KvmBackupList = {
	backup_id: string
	backup_os: string
	backup_description: string
	size: number | null
	created: string
	status: 'pending' | 'finished'
}[]
export const KvmBackupListSchema: Type<KvmBackupList> = type({
	backup_id: 'string.uuid.v4',
	backup_os: 'string',
	backup_description: 'string',
	size: '(number >= 0) | null',
	created: 'string',
	status: "'pending' | 'finished'",
}).array()
