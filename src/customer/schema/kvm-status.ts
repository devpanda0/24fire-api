import { type Type, type } from 'arktype'

export type VmCpuUsage = { data: number; unit: '%' }
export const VmCpuUsageSchema: Type<VmCpuUsage> = type({
	data: 'number',
	unit: "'%'",
})

export type VmMemUsage = { data: number; unit: 'GB' | 'MB' }
export const VmMemUsageSchema: Type<VmMemUsage> = type({
	data: 'number',
	unit: "'GB' | 'MB'",
})

export type VmStorageUsage = { data: number; unit: 'GB' }
export const VmStorageUsageSchema: Type<VmStorageUsage> = type({
	data: 'number',
	unit: "'GB'",
})

export type VmUsage = {
	cpu: VmCpuUsage
	mem: VmMemUsage
	nvme_storage: VmStorageUsage
}
export const VmUsageSchema: Type<VmUsage> = type({
	cpu: VmCpuUsageSchema,
	mem: VmMemUsageSchema,
	nvme_storage: VmStorageUsageSchema,
})

export type KvmStatus = {
	status: 'running' | 'stopped'
	uptime: number
	task:
		| 'BOOTING'
		| 'REINSTALL'
		| 'BACKUP_CREATE'
		| 'BACKUP_RESTORE'
		| 'HDD_MOUNT'
		| null
	usage: VmUsage
}
export const KvmStatusSchema: Type<KvmStatus> = type({
	status: "'running' | 'stopped'",
	uptime: 'number.integer >= 0',
	task: "'BOOTING' | 'REINSTALL' | 'BACKUP_CREATE' | 'BACKUP_RESTORE' | 'HDD_MOUNT' | null",
	usage: VmUsageSchema,
})
