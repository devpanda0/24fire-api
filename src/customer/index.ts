import { type } from 'arktype'
import { CustomerApiClient } from '../utils/ApiClient'
import { Account } from './account'
import { Domain } from './domain'
import { Kvm } from './kvm'
import { Webspace } from './webspace'

export class Customer {
	private apiUrl: string = 'https://manage.24fire.de'
	private readonly apiKey: string
	private readonly apiClient: CustomerApiClient

	public account: Account

	/**
	 * Creates a new Customer API entry point with the given API key.
	 * @param apiKey - API key used for authenticating requests against the 24fire Customer API.
	 */
	constructor(apiKey: string) {
		this.apiKey = apiKey
		this.apiClient = new CustomerApiClient(this.apiUrl, this.apiKey)

		this.account = new Account(this.apiClient)
	}

	/**
	 * Get domain interface for a specific internal identifier (UUID v4).
	 *
	 * @param internalId - A UUID v4 string representing the domain's internal ID.
	 * @throws {Error} If `internalId` is not a valid UUID v4 string.
	 * @returns An instance of `Domain` to perform domain operations.
	 */
	public domain(internalId: string): Domain {
		this.validateInternalId(internalId)
		return new Domain(this.apiClient, internalId)
	}

	/**
	 * Get KVM server interface for a specific internal identifier (UUID v4).
	 *
	 * @param internalId - A UUID v4 string representing the server's internal ID.
	 * @throws {Error} If `internalId` is not a valid UUID v4 string.
	 * @returns An instance of `Kvm` to perform KVM‐server related operations.
	 */
	public kvm(internalId: string): Kvm {
		this.validateInternalId(internalId)
		return new Kvm(this.apiClient, internalId)
	}

	/**
	 * Get Webspace interface for a specific internal identifier (UUID v4).
	 *
	 * @param internalId - A UUID v4 string representing the webspace's internal ID.
	 * @throws {Error} If `internalId` is not a valid UUID v4 string.
	 * @returns An instance of `Webspace` to perform webspace related operations.
	 */
	public webspace(internalId: string): Webspace {
		this.validateInternalId(internalId)
		return new Webspace(this.apiClient, internalId)
	}

	/**
	 * @private
	 * @description
	 * This method is used internally to validate the format of the internalId.
	 * It checks if the provided internalId matches the UUID v4 format.
	 * @param {string} internalId - The internal identifier to validate.
	 * @returns {boolean} - Returns true if the internalId is valid, otherwise false.
	 */
	private validateInternalId(internalId: string): void {
		const parsed = type('string.uuid.v4')(internalId)
		if (parsed instanceof type.errors) {
			throw new Error(
				'Invalid internalId format. Must be a valid UUID v4 string.',
			)
		}
	}
}
