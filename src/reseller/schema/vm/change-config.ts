import { type Type, type } from 'arktype'

//
// VM Change Config
//
export type VmChangeConfigRequest = {
	cores?: number
	mem?: number
	disk?: number
	storage?: number
	backup_slots?: number
	network_speed?: number
	allowFallbackIps?: boolean
}
export const VmChangeConfigRequestSchema: Type<VmChangeConfigRequest> = type({
	'cores?': 'number.integer > 0',
	'mem?': 'number.integer > 0',
	'disk?': 'number.integer > 0',
	'storage?': 'number.integer >= 0',
	'backup_slots?': 'number.integer >= 2',
	'network_speed?': 'number.integer > 0',
	'allowFallbackIps?': 'boolean',
})

export type VmChangeConfig = {
	newConfig: {
		cores: number
		memory: number
		nvme_storage: number
		backup_amount: number
		network_speed: number
		ip_amount: number
		hostsystem: string
	}
	pricings: {
		monthly: number
	}
}
export const VmChangeConfigSchema: Type<VmChangeConfig> = type({
	newConfig: {
		cores: 'number.integer',
		memory: 'number.integer',
		nvme_storage: 'number.integer',
		backup_amount: 'number.integer',
		network_speed: 'number.integer',
		ip_amount: 'number.integer',
		hostsystem: 'string',
	},
	pricings: {
		monthly: 'number',
	},
})
