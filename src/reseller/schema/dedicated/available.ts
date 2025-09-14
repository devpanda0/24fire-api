import { type Type, type } from 'arktype'

export type DedicatedCpu = {
	amount: number
	cores: number
	type: string
}
export const DedicatedCpuSchema: Type<DedicatedCpu> = type({
	amount: 'number.integer',
	cores: 'number.integer',
	type: 'string',
})

export type DedicatedMemory = {
	size: number
	unit: string
	type: string
}
export const DedicatedMemorySchema: Type<DedicatedMemory> = type({
	size: 'number.integer',
	unit: 'string',
	type: 'string',
})

export type DedicatedDisk = {
	amount: number
	size: number
	total_size: number
	unit: string
	type: string
}
export const DedicatedDiskSchema: Type<DedicatedDisk> = type({
	amount: 'number.integer',
	size: 'number.integer',
	total_size: 'number.integer',
	unit: 'string',
	type: 'string',
})

export type DedicatedIpsFamily = {
	included: boolean
	amount: number | null
}
export const DedicatedIpsFamilySchema: Type<DedicatedIpsFamily> = type({
	included: 'boolean',
	amount: 'number.integer | null',
})

export type DedicatedItem = {
	identifier: string
	datacenter: {
		name: string
		displayname: string
		country: string
		city: string
	}
	hardware: {
		cpu: DedicatedCpu
		memory: DedicatedMemory
		disks: DedicatedDisk[]
	}
	ips: {
		ipv4: DedicatedIpsFamily
		ipv6: DedicatedIpsFamily
	}
	network: {
		traffic: { limit: boolean; amount: number | null; unit: string | null }
		connection: string
	}
	status: { type: string; description: string }
	price: {
		net: number
		gross: number
		runtime: { amount: number; unit: string }
	}
}
export const DedicatedItemSchema: Type<DedicatedItem> = type({
	identifier: 'string.uuid.v4',
	datacenter: {
		name: 'string',
		displayname: 'string',
		country: 'string',
		city: 'string',
	},
	hardware: {
		cpu: DedicatedCpuSchema,
		memory: DedicatedMemorySchema,
		disks: DedicatedDiskSchema.array(),
	},
	ips: {
		ipv4: DedicatedIpsFamilySchema,
		ipv6: DedicatedIpsFamilySchema,
	},
	network: {
		traffic: {
			limit: 'boolean',
			amount: 'number | null',
			unit: 'string | null',
		},
		connection: 'string',
	},
	status: { type: 'string', description: 'string' },
	price: {
		net: 'number',
		gross: 'number',
		runtime: { amount: 'number.integer', unit: 'string' },
	},
})

export type DedicatedAvailable = {
	list: DedicatedItem[]
}
export const DedicatedAvailableSchema: Type<DedicatedAvailable> = type({
	list: DedicatedItemSchema.array(),
})
