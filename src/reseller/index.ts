import { type } from 'arktype'
import { ApiClient } from '../utils/ApiClient'
import { Account } from './account'
import { Accounting } from './accounting'
import { Dedicated } from './dedicated'
import { Domain } from './domain'
import { DomainService } from './domain/domainService'
import { Ip } from './ip'
import { EnvironmentMode } from './schema/EnvironmentMode'
import { Vm } from './vm'
import { Vms } from './vm/vms'

export class Reseller {
	private readonly apiUrl: string
	private readonly apiKey: string
	private readonly apiClient: ApiClient

	public vms: Vms
	public domains: DomainService
	public account: Account
	public accounting: Accounting
	public ip: Ip
	public dedicated: Dedicated

	/**
	 * Creates a new Reseller API entry point with the given environment mode and API key.
	 *
	 * @param mode - Environment mode ('LIVE' or 'SANDBOX') to determine the API endpoint.
	 * @param apiKey - API key used for authenticating requests against the fireapi.de Reseller API.
	 * @throws {Error} If `mode` is not a valid EnvironmentMode.
	 * @see {@link https://docs.fireapi.de/request | fireapi.de API Documentation}
	 */
	constructor(mode: EnvironmentMode, apiKey: string) {
		const parsed = EnvironmentMode(mode)
		if (parsed instanceof type.errors) {
			throw new Error(`Invalid EnvironmentMode: ${parsed.summary}`)
		}

		this.apiUrl =
			parsed === 'LIVE'
				? 'https://live.fireapi.de'
				: 'https://sandbox.fireapi.de'

		this.apiKey = apiKey
		this.apiClient = new ApiClient(this.apiUrl, this.apiKey)

		this.vms = new Vms(this.apiClient)
		this.domains = new DomainService(this.apiClient)
		this.account = new Account(this.apiClient)
		this.accounting = new Accounting(this.apiClient)
		this.ip = new Ip(this.apiClient)
		this.dedicated = new Dedicated(this.apiClient)
	}

	/**
	 * Get VM interface for a specific virtual machine ID.
	 *
	 * @param id - A 5-digit number representing the VM's ID.
	 * @throws {Error} If `id` is not exactly 5 digits long.
	 * @returns An instance of `Vm` to perform VM-related operations.
	 * @see {@link https://docs.fireapi.de/request | fireapi.de API Documentation}
	 */
	public vm(id: number): Vm | undefined {
		if (id.toString().length !== 5) {
			throw new Error('Invalid vmId: must be exactly 5 characters long')
		}
		return new Vm(this.apiClient, id)
	}

	/**
	 * Get domain interface for a specific domain name.
	 *
	 * @param domain - A valid domain name (must contain a dot).
	 * @throws {Error} If `domain` is not a valid domain format.
	 * @returns An instance of `Domain` to perform domain operations.
	 * @see {@link https://docs.fireapi.de/request | fireapi.de API Documentation}
	 */
	public domain(domain: string): Domain | undefined {
		if (!domain.includes('.')) {
			throw new Error('Invalid domain')
		}
		return new Domain(this.apiClient, domain)
	}
}
