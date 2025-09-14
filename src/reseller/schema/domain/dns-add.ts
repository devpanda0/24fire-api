import { type Type, type } from 'arktype'

export type DnsAddRequest = {
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
export const DnsAddRequestSchema: Type<DnsAddRequest> = type({
	type: "'A' | 'AAAA' | 'CNAME' | 'ALIAS' | 'MX' | 'SRV' | 'TXT' | 'CAA' | 'PTR' | 'NS' | 'TLSA' | 'DS' | 'DNSKEY' | 'HTTP_REDIRECT' | 'HTTP_FRAME'",
	name: 'string',
	data: 'string',
})

export type DnsAdd = null
export const DnsAddSchema: Type<DnsAdd> = type.null
