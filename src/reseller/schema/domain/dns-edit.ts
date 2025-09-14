import { type Type, type } from 'arktype'

export type DnsEditRequest = {
	record_id: number
	type?:
		| 'A'
		| 'AAAA'
		| 'CNAME'
		| 'ALIAS'
		| 'MX'
		| 'SRV'
		| 'TXT'
		| 'CAA'
		| 'PTR'
		| 'NS'
		| 'TLSA'
		| 'DS'
		| 'DNSKEY'
		| 'HTTP_REDIRECT'
		| 'HTTP_FRAME'
	name?: string
	data?: string
}
export const DnsEditRequestSchema: Type<DnsEditRequest> = type({
	record_id: 'number',
	'type?':
		"'A' |'AAAA' | 'CNAME' | 'ALIAS' | 'MX' | 'SRV' | 'TXT' | 'CAA' | 'PTR' | 'NS' | 'TLSA' | 'DS' | 'DNSKEY' | 'HTTP_REDIRECT' | 'HTTP_FRAME'",
	'name?': 'string',
	'data?': 'string',
})

export type DnsEdit = null
export const DnsEditSchema: Type<DnsEdit> = type.null
