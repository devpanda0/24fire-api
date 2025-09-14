import type { ApiClient, ApiResult } from '../../utils/ApiClient'
import {
	type VmSshKeyGenerate,
	VmSshKeyGenerateRequestSchema,
	VmSshKeyGenerateSchema,
	type VmSshKeyList,
	VmSshKeyListSchema,
	type VmSshKeyRemove,
	VmSshKeyRemoveRequestSchema,
	VmSshKeyRemoveSchema,
	type VmSshKeyUpload,
	type VmSshKeyUploadRequest,
	VmSshKeyUploadRequestSchema,
	VmSshKeyUploadSchema,
} from '../schema'

export class Sshkey {
	constructor(
		private apiClient: ApiClient,
		private vmId: number,
	) {}

	/**
	 * List all SSH keys for the VM.
	 *
	 * @returns A promise resolving to the list of SSH keys.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/sshkey/list | fireapi.de API Documentation}
	 */
	async list(): Promise<ApiResult<VmSshKeyList>> {
		return this.apiClient.get(
			`/vm/${this.vmId}/sshkey/list`,
			VmSshKeyListSchema,
		)
	}

	/**
	 * Generate a new SSH key pair for the VM.
	 *
	 * @param displayname - Optional display name for the SSH key.
	 * @returns A promise resolving to the generated SSH key details.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/sshkey/generate | fireapi.de API Documentation}
	 */
	async generate(displayname?: string): Promise<ApiResult<VmSshKeyGenerate>> {
		return this.apiClient.post(
			`/vm/${this.vmId}/sshkey/generate`,
			VmSshKeyGenerateRequestSchema,
			VmSshKeyGenerateSchema,
			{ displayname },
		)
	}

	/**
	 * Upload an existing SSH public key to the VM.
	 *
	 * @param data - The SSH key upload configuration.
	 * @returns A promise resolving to the SSH key upload confirmation.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/sshkey/upload | fireapi.de API Documentation}
	 */
	async upload(
		data: VmSshKeyUploadRequest,
	): Promise<ApiResult<VmSshKeyUpload>> {
		return this.apiClient.post(
			`/vm/${this.vmId}/sshkey/upload`,
			VmSshKeyUploadRequestSchema,
			VmSshKeyUploadSchema,
			data,
		)
	}

	/**
	 * Remove an SSH key from the VM.
	 *
	 * @param key_id - The SSH key ID to remove.
	 * @returns A promise resolving to the SSH key removal confirmation.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/sshkey/remove | fireapi.de API Documentation}
	 */
	async remove(key_id?: string): Promise<ApiResult<VmSshKeyRemove>> {
		return this.apiClient.delete(
			`/vm/${this.vmId}/sshkey/remove`,
			VmSshKeyRemoveRequestSchema,
			VmSshKeyRemoveSchema,
			{ key_id },
		)
	}
}
