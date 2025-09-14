import { type Type, type } from 'arktype'
import { type DomainStatus, DomainStatusSchema } from './register'

//
// Domain Info Response
//
export type DomainInfo = {
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
		expire: string | null
	}
}
export const DomainInfoSchema: Type<DomainInfo> = type({
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
		expire: 'string | null',
	},
})
