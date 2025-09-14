import type { ApiResult, CustomerApiClient } from '../../utils/ApiClient'
import {
	type CreateKvmBackup,
	CreateKvmBackupRequestSchema,
	CreateKvmBackupSchema,
	type DeleteKvmBackup,
	DeleteKvmBackupRequestSchema,
	DeleteKvmBackupSchema,
	type KvmBackupCreateStatus,
	KvmBackupCreateStatusRequestSchema,
	KvmBackupCreateStatusSchema,
	type KvmBackupList,
	KvmBackupListSchema,
	type KvmBackupRestore,
	KvmBackupRestoreRequestSchema,
	KvmBackupRestoreSchema,
	type KvmBackupRestoreStatus,
	KvmBackupRestoreStatusRequestSchema,
	KvmBackupRestoreStatusSchema,
} from '../schema'

export class Backup {
	constructor(
		private apiClient: CustomerApiClient,
		private internalId: string,
	) {}

	/**
	 * Retrieves a list of all backups for the specified KVM server.
	 *
	 * @returns Resolves with the list of backups.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/kvm/%3Ainternal_id/backup/list | API Documentation}
	 */
	async list(): Promise<ApiResult<KvmBackupList>> {
		return this.apiClient.get(
			`/api/kvm/${this.internalId}/backup/list`,
			KvmBackupListSchema,
		)
	}

	/**
	 * Creates a new backup for the specified KVM server.
	 *
	 * @remarks
	 * Requires a **24fire+ subscription** to use it.
	 *
	 * @param {string} [description] - Optional description for the backup.
	 * @returns Resolves with the backup creation result.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/kvm/%3Ainternal_id/backup/create | API Documentation}
	 */
	async create(description?: string): Promise<ApiResult<CreateKvmBackup>> {
		return this.apiClient.post(
			`/api/kvm/${this.internalId}/backup/create`,
			CreateKvmBackupRequestSchema,
			CreateKvmBackupSchema,
			description ? { description } : {},
		)
	}

	/**
	 * Retrieves the creation status of a backup.
	 *
	 * @remarks
	 * Requires a **24fire+ subscription** to use it.
	 *
	 * @param {string} backup_id - The ID of the backup.
	 * @returns Resolves with the backup creation status.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/kvm/%3Ainternal_id/backup/create/status | API Documentation}
	 */
	async getCreateStatus(
		backup_id: string,
	): Promise<ApiResult<KvmBackupCreateStatus>> {
		return this.apiClient.post(
			`/api/kvm/${this.internalId}/backup/create/status`,
			KvmBackupCreateStatusRequestSchema,
			KvmBackupCreateStatusSchema,
			{ backup_id: backup_id },
		)
	}

	/**
	 * Restores a backup for the specified KVM server.
	 *
	 * @remarks
	 * Requires a **24fire+ subscription** to use it.
	 *
	 * @param {string} backup_id - The ID of the backup to restore.
	 * @returns Resolves with the backup restoration result.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/kvm/%3Ainternal_id/backup/restore | API Documentation}
	 */
	async restore(backup_id: string): Promise<ApiResult<KvmBackupRestore>> {
		return this.apiClient.post(
			`/api/kvm/${this.internalId}/backup/restore`,
			KvmBackupRestoreRequestSchema,
			KvmBackupRestoreSchema,
			{ backup_id },
		)
	}

	/**
	 * Retrieves the restore status of a backup.
	 *
	 * @remarks
	 * Requires a **24fire+ subscription** to use it.
	 *
	 * @param {string} backup_id - The ID of the backup.
	 * @returns Resolves with the backup restore status.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/kvm/%3Ainternal_id/backup/restore/status | API Documentation}
	 */
	async getRestoreStatus(
		backup_id: string,
	): Promise<ApiResult<KvmBackupRestoreStatus>> {
		return this.apiClient.post(
			`/api/kvm/${this.internalId}/backup/restore/status`,
			KvmBackupRestoreStatusRequestSchema,
			KvmBackupRestoreStatusSchema,
			{ backup_id: backup_id },
		)
	}

	/**
	 * Attention! A deleted backup cannot be restored.
	 *
	 * @remarks
	 * Requires a **24fire+ subscription** to use it.
	 *
	 * @param {string} backup_id - The ID of the backup to delete.
	 * @returns Resolves with the backup deletion result.
	 * @see {@link https://apidocs.24fire.de/v2/request/api/kvm/%3Ainternal_id/backup/delete | API Documentation}
	 */
	async delete(backup_id: string): Promise<ApiResult<DeleteKvmBackup>> {
		return this.apiClient.delete(
			`/api/kvm/${this.internalId}/backup/delete`,
			DeleteKvmBackupRequestSchema,
			DeleteKvmBackupSchema,
			{ backup_id: backup_id },
		)
	}
}
