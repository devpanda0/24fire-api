import { type Type, type } from 'arktype'

export type VmStatus = {
	status: 'running' | 'stopped'
	uptime: number
	task:
		| 'BOOTING'
		| 'REINSTALL'
		| 'BACKUP_CREATE'
		| 'BACKUP_RESTORE'
		| 'HDD_MOUNT'
		| null
	usage: {
		cpu: {
			data: number
			unit: string
		}
		mem: {
			data: number
			unit: string
		}
		nvme_storage: {
			data: number
			unit: string
		}
	}
}
export const VmStatusSchema: Type<VmStatus> = type({
	status: "'running' | 'stopped'",
	uptime: 'number.integer >= 0',
	task: "'BOOTING' | 'REINSTALL' | 'BACKUP_CREATE' | 'BACKUP_RESTORE' | 'HDD_MOUNT' | null",
	usage: {
		cpu: {
			data: 'number',
			unit: 'string',
		},
		mem: {
			data: 'number',
			unit: 'string',
		},
		nvme_storage: {
			data: 'number',
			unit: 'string',
		},
	},
})
