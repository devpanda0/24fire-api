import { type Type, type } from 'arktype'

export type VmRDNSCreateRequest = {
	ip_address: string
	ptr: string
	note?: string
}
export const VmRDNSCreateRequestSchema: Type<VmRDNSCreateRequest> = type({
	ip_address: 'string.ip',
	ptr: 'string',
	'note?': 'string',
})

export type VmRDNSCreate = {
	ip_version: 4 | 6
	ip_address: string
	ptr: string
	note: string
}
export const VmRDNSCreateSchema: Type<VmRDNSCreate> = type({
	ip_version: '4 | 6',
	ip_address: 'string.ip',
	ptr: 'string',
	note: 'string',
})
