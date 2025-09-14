import { type Type, type } from 'arktype'
import { type VmAbuseStatus, VmAbuseStatusSchema } from './abuse-status'

export type VmConfig = {
	identifier: number
	hostsystem: {
		datacenter: {
			name: string
			country: string
			city: string
		}
		name: string
		node: string
		processor: string
		memory: string
		nvme_hard_drives: string
	}
	config: {
		cores: number
		mem: number
		disk: number
		storage: null
		traffic_limit: null
		os: { name: string; displayname: string } | null
		iso: { name: string; displayname: string; attached: boolean } | null
		username: string
		password: string
		password_enabled: boolean
		hostname: string
		network_speed: number
		backup_slots: number
		ipv4: {
			ip_address: string
			ip_gateway: string
			ddos_protection: string
		}[]
		ipv6: {
			ip_address: string
			ip_gateway: string
			requires_restart: boolean
		}[]
		monitoring: { enabled: boolean; port: number }
	}
	max_config: {
		cores: number
		mem: number
		disk: number
		network_speed: number
		backup_slots: number
		ipv4: number
		storage: number
	}
	abuse_status: VmAbuseStatus
}
export const VmConfigSchema: Type<VmConfig> = type({
	identifier: 'number.integer',
	hostsystem: {
		datacenter: {
			name: 'string',
			country: 'string',
			city: 'string',
		},
		name: 'string',
		node: 'string',
		processor: 'string',
		memory: 'string',
		nvme_hard_drives: 'string',
	},
	config: {
		cores: 'number.integer',
		mem: 'number.integer',
		disk: 'number.integer',
		storage: type.null,
		traffic_limit: type.null,
		os: type({
			name: 'string',
			displayname: 'string',
		}).or(type.null),
		iso: type({
			name: 'string',
			displayname: 'string',
			attached: 'boolean',
		}).or(type.null),
		username: 'string',
		password: 'string',
		password_enabled: 'boolean',
		hostname: 'string',
		network_speed: 'number.integer',
		backup_slots: 'number.integer',
		ipv4: [
			{
				ip_address: 'string.ip.v4',
				ip_gateway: 'string.ip.v4',
				ddos_protection: 'string',
			},
		],
		ipv6: [
			{
				ip_address: 'string.ip.v6',
				ip_gateway: 'string.ip.v6',
				requires_restart: 'boolean',
			},
		],
		monitoring: {
			enabled: 'boolean',
			port: 'number.integer > 0',
		},
	},
	max_config: {
		cores: 'number.integer',
		mem: 'number.integer',
		disk: 'number.integer',
		network_speed: 'number.integer',
		backup_slots: 'number.integer',
		ipv4: 'number.integer',
		storage: 'number.integer',
	},
	abuse_status: VmAbuseStatusSchema,
})
