import { type Type, type } from 'arktype'

type VmRDNSDeleteRequest = {
	ip_address: string
}
export const VmRDNSDeleteRequestSchema: Type<VmRDNSDeleteRequest> = type({
	ip_address: 'string.ip',
})

export type VmRDNSDelete = {
	ip_version: 4 | 6
	ip_address: string
}
export const VmRDNSDeleteSchema: Type<VmRDNSDelete> = type({
	ip_version: '4 | 6',
	ip_address: 'string',
})
