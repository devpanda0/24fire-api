import { type Type, type } from 'arktype'

//
// Remove DNS Record
//
export type RemoveDnsRecordRequest = {
	record_id: string
}
export const RemoveDnsRecordRequestSchema: Type<RemoveDnsRecordRequest> = type({
	record_id: 'string',
})

export type RemoveDnsRecord = null
export const RemoveDnsRecordSchema: Type<RemoveDnsRecord> = type.null
