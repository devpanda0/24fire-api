import { type Type, type } from 'arktype'

export type EditDnsRecordRequest = {
	record_id: string
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
export const EditDnsRecordRequestSchema: Type<EditDnsRecordRequest> = type({
	record_id: 'string',
	'type?':
		"'A' | 'AAAA' | 'CNAME' | 'ALIAS' | 'MX' | 'SRV' | 'TXT' | 'CAA' | 'PTR' | 'NS' | 'TLSA' | 'DS' | 'DNSKEY' | 'HTTP_REDIRECT' | 'HTTP_FRAME'",
	'name?': 'string',
	'data?': 'string',
})

export type EditDnsRecord = null
export const EditDnsRecordSchema: Type<EditDnsRecord> = type.null
