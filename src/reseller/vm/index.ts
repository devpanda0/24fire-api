import { EmptySchema } from '../../schema/generel'
import type { ApiClient, ApiResult } from '../../utils/ApiClient'
import {
	type VmAbuses,
	VmAbusesSchema,
	type VmChangeConfig,
	type VmChangeConfigRequest,
	VmChangeConfigRequestSchema,
	VmChangeConfigSchema,
	type VmConfig,
	VmConfigSchema,
	type VmDelete,
	VmDeleteSchema,
	type VmInstallationStatus,
	VmInstallationStatusSchema,
	type VmNetwork,
	VmNetworkSchema,
	type VmNoVnc,
	VmNoVncSchema,
	type VmPasswordReset,
	VmPasswordResetSchema,
	type VmPower,
	VmPowerRequestSchema,
	VmPowerSchema,
	type VmReinstall,
	VmReinstallRequestSchema,
	VmReinstallSchema,
	type VmSettings,
	VmSettingsRequestSchema,
	VmSettingsSchema,
	type VmStatus,
	VmStatusSchema,
} from '../schema'
import { Backup } from './backup'
import { DDoS } from './ddos'
import { Iso } from './iso'
import { Monitoring } from './monitoring'
import { Rdns } from './rdns'
import { Sshkey } from './sshkey'
import { Traffic } from './traffic'

export class Vm {
	public backup: Backup
	public ddos: DDoS
	public iso: Iso
	public monitoring: Monitoring
	public rdns: Rdns
	public sshkey: Sshkey
	public traffic: Traffic

	constructor(
		private apiClient: ApiClient,
		private vmId: number,
	) {
		if (vmId.toString().length !== 5) {
			throw new Error('Invalid vmId: must be exactly 5 characters long')
		}

		this.backup = new Backup(apiClient, vmId)
		this.ddos = new DDoS(apiClient, vmId)
		this.iso = new Iso(apiClient, vmId)
		this.monitoring = new Monitoring(apiClient, vmId)
		this.rdns = new Rdns(apiClient, vmId)
		this.sshkey = new Sshkey(apiClient, vmId)
		this.traffic = new Traffic(apiClient, vmId)
	}

	/**
	 * Reinstall the VM with a new or same operating system.
	 *
	 * @param os - Optional operating system identifier to install.
	 * @returns A promise resolving to the reinstall confirmation.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/reinstall | fireapi.de API Documentation}
	 */
	async reinstall(os?: string): Promise<ApiResult<VmReinstall>> {
		return this.apiClient.post(
			`/vm/${this.vmId}/reinstall`,
			VmReinstallRequestSchema,
			VmReinstallSchema,
			{ os },
		)
	}

	/**
	 * Change the VM configuration (CPU, RAM, etc.).
	 *
	 * @param data - The new configuration settings.
	 * @returns A promise resolving to the configuration change confirmation.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/change | fireapi.de API Documentation}
	 */
	async changeConfig(
		data: VmChangeConfigRequest,
	): Promise<ApiResult<VmChangeConfig>> {
		return this.apiClient.post(
			`/vm/${this.vmId}/change`,
			VmChangeConfigRequestSchema,
			VmChangeConfigSchema,
			data,
		)
	}

	/**
	 * Get the current VM configuration.
	 *
	 * @returns A promise resolving to the VM configuration details.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/config | fireapi.de API Documentation}
	 */
	async getConfig(): Promise<ApiResult<VmConfig>> {
		return this.apiClient.get(`/vm/${this.vmId}/config`, VmConfigSchema)
	}

	/**
	 * Get the VM network configuration.
	 *
	 * @returns A promise resolving to the network configuration details.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/network | fireapi.de API Documentation}
	 */
	async getNetwork(): Promise<ApiResult<VmNetwork>> {
		return this.apiClient.get(`/vm/${this.vmId}/network`, VmNetworkSchema)
	}

	/**
	 * Update VM security settings.
	 *
	 * @param ROOT_PASSWORD_LOGIN - Whether to enable root password login.
	 * @returns A promise resolving to the settings update confirmation.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/settings | fireapi.de API Documentation}
	 */
	async updateSettings(
		ROOT_PASSWORD_LOGIN?: boolean,
	): Promise<ApiResult<VmSettings>> {
		return this.apiClient.post(
			`/vm/${this.vmId}/settings`,
			VmSettingsRequestSchema,
			VmSettingsSchema,
			{ ROOT_PASSWORD_LOGIN },
		)
	}

	/**
	 * Open a NoVNC console connection to the VM.
	 *
	 * @returns A promise resolving to the NoVNC connection details.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/novnc | fireapi.de API Documentation}
	 */
	async openNoVnc(): Promise<ApiResult<VmNoVnc>> {
		return this.apiClient.post(
			`/vm/${this.vmId}/novnc`,
			EmptySchema,
			VmNoVncSchema,
			{},
		)
	}

	/**
	 * Delete the VM.
	 *
	 * @returns A promise resolving to the deletion confirmation.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/delete | fireapi.de API Documentation}
	 */
	async delete(): Promise<ApiResult<VmDelete>> {
		return this.apiClient.delete(
			`/vm/${this.vmId}/delete`,
			EmptySchema,
			VmDeleteSchema,
			{},
		)
	}

	/**
	 * Get the current VM status.
	 *
	 * @returns A promise resolving to the VM status information.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/status | fireapi.de API Documentation}
	 */
	async getStatus(): Promise<ApiResult<VmStatus>> {
		return this.apiClient.get(`/vm/${this.vmId}/status`, VmStatusSchema)
	}

	/**
	 * Get the VM installation status.
	 *
	 * @returns A promise resolving to the installation status details.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/status/installation | fireapi.de API Documentation}
	 */
	async getInstallationStatus(): Promise<ApiResult<VmInstallationStatus>> {
		return this.apiClient.get(
			`/vm/${this.vmId}/status/installation`,
			VmInstallationStatusSchema,
		)
	}

	/**
	 * Reset the VM root password.
	 *
	 * @returns A promise resolving to the password reset confirmation.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/password-reset | fireapi.de API Documentation}
	 */
	async resetPassword(): Promise<ApiResult<VmPasswordReset>> {
		return this.apiClient.post(
			`/vm/${this.vmId}/password-reset`,
			EmptySchema,
			VmPasswordResetSchema,
			{},
		)
	}

	/**
	 * Control VM power state.
	 *
	 * @param mode - The power action to perform (start, stop, or restart).
	 * @returns A promise resolving to the power operation confirmation.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/power | fireapi.de API Documentation}
	 */
	async power(mode: 'start' | 'stop' | 'restart'): Promise<ApiResult<VmPower>> {
		return this.apiClient.post(
			`/vm/${this.vmId}/power`,
			VmPowerRequestSchema,
			VmPowerSchema,
			{ mode },
		)
	}

	/**
	 * Get abuse reports for the VM.
	 *
	 * @returns A promise resolving to the list of abuse reports.
	 * @see {@link https://docs.fireapi.de/request/vm/:vmid/abuses | fireapi.de API Documentation}
	 */
	async getAbuses(): Promise<ApiResult<VmAbuses>> {
		return this.apiClient.get(`/vm/${this.vmId}/abuses`, VmAbusesSchema)
	}
}
