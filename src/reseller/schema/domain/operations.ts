import { type Type, type } from 'arktype'

//
// Domain Delete Response
//
export type DomainDelete = {
	domain: string
	termination_date: string
}
export const DomainDeleteSchema: Type<DomainDelete> = type({
	domain: 'string',
	termination_date: 'string',
})

//
// Domain Undelete Response
//
export type DomainUndelete = {
	domain: string
}
export const DomainUndeleteSchema: Type<DomainUndelete> = type({
	domain: 'string',
})

//
// Domain Authcode Response
//
export type DomainAuthcode = {
	authcode: string
}
export const DomainAuthcodeSchema: Type<DomainAuthcode> = type({
	authcode: 'string',
})

//
// Domain Availability Response
//
export type DomainAvailability = { available: boolean }
export const DomainAvailabilitySchema: Type<DomainAvailability> = type({
	available: 'boolean',
})

//
// Domain Nameserver Update Request
//
export type DomainNameserverUpdateRequest = {
	ns1: string | 'default'
	ns2: string | 'default'
	ns3?: string
	ns4?: string
	ns5?: string
}
export const DomainNameserverUpdateRequestSchema: Type<DomainNameserverUpdateRequest> =
	type({
		ns1: "string | 'default'",
		ns2: "string | 'default'",
		'ns3?': 'string',
		'ns4?': 'string',
		'ns5?': 'string',
	})

//
// Domain Nameserver Update Response
//
export type DomainNameserverUpdate = {
	ns1: string
	ns2: string
	ns3: string | null
	ns4: string | null
	ns5: string | null
}
export const DomainNameserverUpdateSchema: Type<DomainNameserverUpdate> = type({
	ns1: 'string',
	ns2: 'string',
	ns3: 'string | null',
	ns4: 'string | null',
	ns5: 'string | null',
})
