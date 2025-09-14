import { type Type, type } from 'arktype'

//
// Common Domain Types
//
export type DomainStatus =
	| 'OK'
	| 'PENDING'
	| 'QUARANTINED'
	| 'SUSPENDED'
	| 'RESTRICTED'
	| 'DELAYED'
	| 'FAILED'
	| 'RGP'
	| 'LOCK'
	| 'HOLD'
export const DomainStatusSchema: Type<DomainStatus> = type.enumerated(
	'OK',
	'PENDING',
	'QUARANTINED',
	'SUSPENDED',
	'RESTRICTED',
	'DELAYED',
	'FAILED',
	'RGP',
	'LOCK',
	'HOLD',
)

export type DomainEntity = {
	name: string
	sld: string
	tld: string
	authcode: string
	status: DomainStatus
	terminated: boolean
}
export const DomainEntitySchema: Type<DomainEntity> = type({
	name: 'string',
	sld: 'string',
	tld: 'string',
	authcode: 'string',
	status: DomainStatusSchema,
	terminated: 'boolean',
})

export type DomainHandle = {
	ownerC: string
	adminC: string
	techC: string
	zoneC: string
}
export const DomainHandleSchema: Type<DomainHandle> = type({
	ownerC: 'string',
	adminC: 'string',
	techC: 'string',
	zoneC: 'string',
})

export type DomainNameserver = {
	ns1: string
	ns2: string
	ns3: string | null
	ns4: string | null
	ns5: string | null
}
export const DomainNameserverSchema: Type<DomainNameserver> = type({
	ns1: 'string',
	ns2: 'string',
	ns3: 'string | null',
	ns4: 'string | null',
	ns5: 'string | null',
})

export type DomainTimings = {
	create: string
	expire: string
}
export const DomainTimingsSchema: Type<DomainTimings> = type({
	create: 'string',
	expire: 'string',
})

//
// Domain Info
//
export type DomainInfo = {
	domain: DomainEntity
	handle: DomainHandle
	nameserver: DomainNameserver
	timings: DomainTimings
}
export const DomainInfoSchema: Type<DomainInfo> = type({
	domain: DomainEntitySchema,
	handle: DomainHandleSchema,
	nameserver: DomainNameserverSchema,
	timings: DomainTimingsSchema,
})
