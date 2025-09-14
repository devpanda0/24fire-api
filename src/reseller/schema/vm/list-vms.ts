import { type Type, type } from 'arktype'

const VmSchema = type({
	vmid: 'number.integer',
	createDate: 'string.date.iso',
	node: 'string',
	hostsystem: {
		datacenter: {
			name: 'string',
			country: 'string',
			city: 'string',
		},
		name: 'string',
		node: 'string',
	},
	config: {
		cores: 'number.integer',
		mem: 'number.integer',
		disk: 'number.integer',
	},
})

export type VmListSummary = {
	total_vms: number
	total_stats: {
		cores: number
		mem: number
		disk: number
	}
	list: {
		vmid: number
		createDate: string
		node: string
		hostsystem: {
			datacenter: {
				name: string
				country: string
				city: string
			}
			name: string
			node: string
		}
		config: {
			cores: number
			mem: number
			disk: number
		}
	}[]
}
export const VmListSummarySchema: Type<VmListSummary> = type({
	total_vms: 'number.integer',
	total_stats: {
		cores: 'number.integer',
		mem: 'number.integer',
		disk: 'number.integer',
	},
	list: VmSchema.array(),
})
