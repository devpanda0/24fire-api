import { type Type, type } from 'arktype'
import { type VmAbuseStatus, VmAbuseStatusSchema } from './abuse-status'

export type VmAbuses = {
	status: VmAbuseStatus
	abuses: {
		date: string
		type: 'RESOURCES' | 'NETWORK' | 'IP' | 'OTHER' | 'NO_STATEMENT_SUBMITTED'
		level: 'WARNED' | 'STATEMENT_EXPECTED' | 'BLOCKED'
		affected: string[]
		message: string
	}[]
}
export const VmAbusesSchema: Type<VmAbuses> = type({
	status: VmAbuseStatusSchema,
	abuses: type({
		date: 'string.date.iso',
		type: "'RESOURCES' | 'NETWORK' | 'IP' | 'OTHER' | 'NO_STATEMENT_SUBMITTED'",
		level: "'WARNED' | 'STATEMENT_EXPECTED' | 'BLOCKED'",
		affected: 'string[]',
		message: 'string',
	}).array(),
})
