import { type Type, type } from 'arktype'

export type DomainDnsList = {
	record_id: number
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
	ttl: number
}[]
export const DomainDnsListSchema: Type<DomainDnsList> = type({
	record_id: 'number.integer',
	type: "'A' | 'AAAA' | 'CNAME' | 'ALIAS' | 'MX' | 'SRV' | 'TXT' | 'CAA' | 'PTR' | 'NS' | 'TLSA' | 'DS' | 'DNSKEY' | 'HTTP_REDIRECT' | 'HTTP_FRAME'",
	name: 'string',
	data: 'string',
	ttl: 'number.integer',
}).array()
