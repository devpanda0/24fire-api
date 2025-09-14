import { type Type, type } from 'arktype'

type DnsRemoveRequest = {
	record_id: number
}
export const DnsRemoveRequestSchema: Type<DnsRemoveRequest> = type({
	record_id: 'number.integer',
})

export type DnsRemove = null
export const DnsRemoveSchema: Type<DnsRemove> = type.null
