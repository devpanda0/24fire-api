import { type Type, type } from 'arktype'

export type AddDnsRecordRequest = {
	type:
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
	name: string
	data: string
}
export const AddDnsRecordRequestSchema: Type<AddDnsRecordRequest> = type({
	type: "'A' | 'AAAA' | 'CNAME' | 'ALIAS' | 'MX' | 'SRV' | 'TXT' | 'CAA' | 'PTR' | 'NS' | 'TLSA' | 'DS' | 'DNSKEY' | 'HTTP_REDIRECT' | 'HTTP_FRAME'",
	name: 'string',
	data: 'string',
})

export type AddDnsRecord = null
export const AddDnsRecordSchema: Type<AddDnsRecord> = type.null
