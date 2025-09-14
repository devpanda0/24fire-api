import { type Type, type } from 'arktype'

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
export const DomainStatusSchema: Type<DomainStatus> = type(
	"'OK' | 'PENDING' | 'QUARANTINED'| 'SUSPENDED'| 'RESTRICTED'| 'DELAYED'| 'FAILED'| 'RGP' | 'LOCK' | 'HOLD'",
)

export type DomainRegisterRequest = {
	domain: string
	handle: string
	authcode?: string
	ns1?: string
	ns2?: string
}
export const DomainRegisterRequestSchema: Type<DomainRegisterRequest> = type({
	domain: 'string',
	handle: 'string',
	'authcode?': 'string',
	'ns1?': 'string',
	'ns2?': 'string',
})

//
// Domain Register Response
//
export type DomainRegister = {
	domain: {
		name: string
		sld: string
		tld: string
		authcode: string | null
		status: DomainStatus
		terminated: boolean
	}
	handle: {
		ownerC: string
		adminC: string
		techC: string
		zoneC: string
	}
	nameserver: {
		ns1: string
		ns2: string
		ns3: string | null
		ns4: string | null
		ns5: string | null
	}
	timings: {
		create: string
		expire: string
	}
}
export const DomainRegisterSchema: Type<DomainRegister> = type({
	domain: {
		name: 'string',
		sld: 'string',
		tld: 'string',
		authcode: 'string | null',
		status: DomainStatusSchema,
		terminated: 'boolean',
	},
	handle: {
		ownerC: 'string',
		adminC: 'string',
		techC: 'string',
		zoneC: 'string',
	},
	nameserver: {
		ns1: 'string',
		ns2: 'string',
		ns3: 'string | null',
		ns4: 'string | null',
		ns5: 'string | null',
	},
	timings: {
		create: 'string',
		expire: 'string',
	},
})
