import { type Type, type } from 'arktype'

type Disk = {
	amount: number
	size: number
	total_size: number
	unit: string
	type: string
}
const DiskSchema: Type<Disk> = type({
	amount: 'number.integer',
	size: 'number.integer',
	total_size: 'number.integer',
	unit: 'string',
	type: 'string',
})

export type DedicatedInfo = {
	identifier: string
	deployed: boolean
	accounting: {
		price: { net: number; gross: number }
		runtime: { amount: number; unit: string }
		renew: string | null
		terminated: boolean
	}
	management: {
		dashboard: string
		username: string
		email: string
		password: string
	} | null
	datacenter: {
		name: string
		displayname: string
		country: string
		city: string
	}
	hardware: {
		cpu: { cores: number; type: string }
		memory: { size: number; unit: string; type: string }
		disks: Disk[]
	}
	ips: {
		ipv4: { address: string; gateway: string }[]
		ipv6: { address: string; gateway: string }[]
	}
	network: {
		traffic: { limit: boolean; amount: number | null; unit: string | null }
		connection: string
	}
}
export const DedicatedInfoSchema: Type<DedicatedInfo> = type({
	identifier: 'string.uuid.v4',
	deployed: 'boolean',
	accounting: {
		price: { net: 'number', gross: 'number' },
		runtime: { amount: 'number.integer', unit: 'string' },
		renew: 'string.date.iso | null',
		terminated: 'boolean',
	},
	management: type({
		dashboard: 'string.url',
		username: 'string',
		email: 'string',
		password: 'string',
	}).or('null'),
	datacenter: {
		name: 'string',
		displayname: 'string',
		country: 'string',
		city: 'string',
	},
	hardware: {
		cpu: { cores: 'number.integer', type: 'string' },
		memory: { size: 'number.integer', unit: 'string', type: 'string' },
		disks: DiskSchema.array(),
	},
	ips: {
		ipv4: [{ address: 'string.ip.v4', gateway: 'string.ip.v4' }],
		ipv6: [{ address: 'string.ip.v6', gateway: 'string.ip.v6' }],
	},
	network: {
		traffic: {
			limit: 'boolean',
			amount: 'number | null',
			unit: 'string | null',
		},
		connection: 'string',
	},
})
