import { type Type, type } from 'arktype'

export type RangeConfig = {
	min: number
	max: number
	step: number
}
export const RangeConfigSchema: Type<RangeConfig> = type({
	min: 'number.integer',
	max: 'number.integer',
	step: 'number.integer',
})

export type VmHost = {
	name: string
	displayname: string
	datacenter: {
		name: string
		displayname: string
		country: string
		city: string
	}
	hardware: {
		processor: string
		memory: string
		nvme_hard_drives: string
	}
	configuration: {
		cores: RangeConfig
		mem: RangeConfig
		disk: RangeConfig
		ips: RangeConfig
		backup_slots: RangeConfig
		network_speed: RangeConfig
	}
}
export const VmHostSchema: Type<VmHost> = type({
	name: 'string',
	displayname: 'string',
	datacenter: {
		name: 'string',
		displayname: 'string',
		country: 'string',
		city: 'string',
	},
	hardware: {
		processor: 'string',
		memory: 'string',
		nvme_hard_drives: 'string',
	},
	configuration: {
		cores: RangeConfigSchema,
		mem: RangeConfigSchema,
		disk: RangeConfigSchema,
		ips: RangeConfigSchema,
		backup_slots: RangeConfigSchema,
		network_speed: RangeConfigSchema,
	},
})

export type VmListHosts = VmHost[]
export const VmListHostsSchema: Type<VmListHosts> = VmHostSchema.array()
