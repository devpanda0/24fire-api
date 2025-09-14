import { type Type, type } from 'arktype'

export type VmRDNS = {
	ip_address: string
	ptr: string
	note: string
	last_update: string
}
export const VmRDNSSchema: Type<VmRDNS> = type({
	ip_address: 'string.ip',
	ptr: 'string',
	note: 'string',
	last_update: 'string.date.iso',
})

export type VmRDNSList = {
	ipv4: VmRDNS[]
	ipv6: VmRDNS[]
}
export const VmRDNSListSchema: Type<VmRDNSList> = type({
	ipv4: VmRDNSSchema.array(),
	ipv6: VmRDNSSchema.array(),
})
