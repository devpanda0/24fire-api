import { type Type, type } from 'arktype'

//
// VM Create
//
export type VmCreateRequest = {
	cores: number
	mem: number
	disk: number
	os: string
	hostsystem: string
	ips?: number
	backup_slots?: number
	network_speed?: number
	hostname?: string
	storage?: number
	ssh_key?: string
	ssh_key_displayname?: string
	allowFallbackIps?: boolean
	default_ptr?: string
}
export const VmCreateRequestSchema: Type<VmCreateRequest> = type({
	cores: 'number.integer > 0',
	mem: 'number.integer > 0',
	disk: 'number.integer > 0',
	os: 'string',
	hostsystem: 'string',
	'ips?': 'number.integer > 0',
	'backup_slots?': 'number.integer > 0',
	'network_speed?': 'number.integer > 0',
	'hostname?': 'string',
	'storage?': 'number.integer > 0',
	'ssh_key?': 'string',
	'ssh_key_displayname?': 'string',
	'allowFallbackIps?': 'boolean',
	'default_ptr?': 'string',
})

//
// VM Create
//
export type VmCreate = {
	identifier: number
	hostsystem: {
		datacenter: {
			name: string
			country: string
			city: string
		}
		node: string
		processor: string
		memory: string
		nvme_hard_drives: string
	}
	config: {
		cores: number
		mem: number
		disk: number
		os: {
			name: string
			displayname: string
		}
		username: string
		password: string
		hostname: string
		network_speed: number
		backup_slots: number
		ipv4: {
			address: string
			gateway: string
			ddos_protection: string
		}[]
		ipv6: {
			ip_address: string
			ip_gateway: string
		}[]
	}
	pricings?: {
		monthly: number
		monthly_gross: number
	}
}
export const VmCreateSchema: Type<VmCreate> = type({
	identifier: 'number.integer',
	hostsystem: {
		datacenter: {
			name: 'string',
			country: 'string',
			city: 'string',
		},
		node: 'string',
		processor: 'string',
		memory: 'string',
		nvme_hard_drives: 'string',
	},
	config: {
		cores: 'number.integer',
		mem: 'number.integer',
		disk: 'number.integer',
		os: {
			name: 'string',
			displayname: 'string',
		},
		username: 'string',
		password: 'string',
		hostname: 'string',
		network_speed: 'number.integer',
		backup_slots: 'number.integer',
		ipv4: [
			{
				address: 'string.ip.v4',
				gateway: 'string.ip.v4',
				ddos_protection: 'string',
			},
		],
		ipv6: [
			{
				ip_address: 'string',
				ip_gateway: 'string',
			},
		],
	},
	pricings: {
		monthly: 'number',
		monthly_gross: 'number',
	},
})
