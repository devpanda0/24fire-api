import type { ApiClient, ApiResult } from '../../utils/ApiClient'
import {
	type VmBackupCreate,
	VmBackupCreateRequestSchema,
	VmBackupCreateSchema,
	type VmBackupCreateStatus,
	VmBackupCreateStatusRequestSchema,
	VmBackupCreateStatusSchema,
	type VmBackupDelete,
	VmBackupDeleteRequestSchema,
	VmBackupDeleteSchema,
	type VmBackupRestore,
	VmBackupRestoreRequestSchema,
	VmBackupRestoreSchema,
	type VmBackupRestoreStatus,
	VmBackupRestoreStatusRequestSchema,
	VmBackupRestoreStatusSchema,
	type VmBackupsList,
	VmBackupsListSchema,
} from '../schema'

export class Backup {
	constructor(
		private apiClient: ApiClient,
		private vmId: number,
	) {}

	/**
	 * List all backups for the VM.
	 *
	 * @returns A promise resolving to the list of VM backups.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/backup/list | fireapi.de API Documentation}
	 */
	async list(): Promise<ApiResult<VmBackupsList>> {
		return this.apiClient.get(
			`/vm/${this.vmId}/backup/list`,
			VmBackupsListSchema,
		)
	}

	/**
	 * Create a new backup of the VM.
	 *
	 * @param description - Optional description for the backup.
	 * @returns A promise resolving to the backup creation confirmation.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/backup/create | fireapi.de API Documentation}
	 */
	async create(description?: string): Promise<ApiResult<VmBackupCreate>> {
		return this.apiClient.post(
			`/vm/${this.vmId}/backup/create`,
			VmBackupCreateRequestSchema,
			VmBackupCreateSchema,
			description ? { description } : {},
		)
	}

	/**
	 * Get the status of a backup creation process.
	 *
	 * @param backup_id - The backup ID to check status for.
	 * @returns A promise resolving to the backup creation status.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/backup/create/status | fireapi.de API Documentation}
	 */
	async getCreateStatus(
		backup_id: string,
	): Promise<ApiResult<VmBackupCreateStatus>> {
		return this.apiClient.post(
			`/vm/${this.vmId}/backup/create/status`,
			VmBackupCreateStatusRequestSchema,
			VmBackupCreateStatusSchema,
			{ backup_id },
		)
	}

	/**
	 * Restore the VM from a backup.
	 *
	 * @param backup_id - The backup ID to restore from.
	 * @returns A promise resolving to the restore operation confirmation.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/backup/restore | fireapi.de API Documentation}
	 */
	async restore(backup_id: string): Promise<ApiResult<VmBackupRestore>> {
		return this.apiClient.post(
			`/vm/${this.vmId}/backup/restore`,
			VmBackupRestoreRequestSchema,
			VmBackupRestoreSchema,
			{ backup_id },
		)
	}

	/**
	 * Get the status of a backup restore process.
	 *
	 * @param backup_id - The backup ID to check restore status for.
	 * @returns A promise resolving to the restore status.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/backup/restore/status | fireapi.de API Documentation}
	 */
	async getRestoreStatus(
		backup_id: string,
	): Promise<ApiResult<VmBackupRestoreStatus>> {
		return this.apiClient.post(
			`/vm/${this.vmId}/backup/restore/status`,
			VmBackupRestoreStatusRequestSchema,
			VmBackupRestoreStatusSchema,
			{ backup_id },
		)
	}

	/**
	 * Delete a VM backup.
	 *
	 * @param backup_id - The backup ID to delete.
	 * @returns A promise resolving to the deletion confirmation.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/backup/delete | fireapi.de API Documentation}
	 */
	async delete(backup_id: string): Promise<ApiResult<VmBackupDelete>> {
		return this.apiClient.delete(
			`/vm/${this.vmId}/backup/delete`,
			VmBackupDeleteRequestSchema,
			VmBackupDeleteSchema,
			{ backup_id },
		)
	}
}
