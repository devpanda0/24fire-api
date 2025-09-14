import { type Type, type } from 'arktype'
import { type KvmAbuseStatus, KvmAbuseStatusSchema } from './kvm-abuse-status'

export type KvmHostSystem = {
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
export const KvmHostSystemSchema: Type<KvmHostSystem> = type({
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
})

export type KvmOsRef = { name: string; displayname: string }
export const KvmOsRefSchema: Type<KvmOsRef> = type({
	name: 'string',
	displayname: 'string',
})

export type KvmIsoRef = { name: string; displayname: string; attached: boolean }
export const KvmIsoRefSchema: Type<KvmIsoRef> = type({
	name: 'string',
	displayname: 'string',
	attached: 'boolean',
})

export type KvmIPv4 = {
	ip_address: string
	ip_gateway: string
	ddos_protection: string
}
export const KvmIPv4Schema: Type<KvmIPv4> = type({
	ip_address: 'string.ip.v4',
	ip_gateway: 'string.ip.v4',
	ddos_protection: 'string',
})

export type KvmIPv6 = {
	ip_address: string
	ip_gateway: string
	requires_restart: boolean
}
export const KvmIPv6Schema: Type<KvmIPv6> = type({
	ip_address: 'string.ip.v6',
	ip_gateway: 'string.ip.v6',
	requires_restart: 'boolean',
})

export type KvmMonitoring = { enabled: boolean; port: number }
export const KvmMonitoringSchema: Type<KvmMonitoring> = type({
	enabled: 'boolean',
	port: 'number.integer > 0',
})

export type KvmConfigData = {
	cores: number
	mem: number
	disk: number
	os?: KvmOsRef | null
	iso?: KvmIsoRef | null
	username: string
	password: string
	hostname: string
	network_speed: number
	backup_slots: number
	ipv4: KvmIPv4[]
	ipv6: KvmIPv6[]
	monitoring: KvmMonitoring
}
export const KvmConfigDataSchema: Type<KvmConfigData> = type({
	cores: 'number.integer',
	mem: 'number.integer',
	disk: 'number.integer',
	'os?': KvmOsRefSchema.or(type.null),
	'iso?': KvmIsoRefSchema.or(type.null),
	username: 'string',
	password: 'string',
	hostname: 'string',
	network_speed: 'number.integer',
	backup_slots: 'number.integer',
	ipv4: KvmIPv4Schema.array(),
	ipv6: KvmIPv6Schema.array(),
	monitoring: KvmMonitoringSchema,
})

export type KvmMaxConfig = {
	cores: number
	mem: number
	disk: number
	network_speed: number
	backup_slots: number
	ipv4: number
}
export const KvmMaxConfigSchema: Type<KvmMaxConfig> = type({
	cores: 'number.integer',
	mem: 'number.integer',
	disk: 'number.integer',
	network_speed: 'number.integer',
	backup_slots: 'number.integer',
	ipv4: 'number.integer',
})

export type KvmConfig = {
	identifier: number
	hostsystem: KvmHostSystem
	config: KvmConfigData
	max_config: KvmMaxConfig
	abuse_status: KvmAbuseStatus
}
export const KvmConfigSchema: Type<KvmConfig> = type({
	identifier: 'number.integer',
	hostsystem: KvmHostSystemSchema,
	config: KvmConfigDataSchema,
	max_config: KvmMaxConfigSchema,
	abuse_status: KvmAbuseStatusSchema,
})
