import { type Type, type } from 'arktype'

export type VmAbuseStatus =
	| 'CLEAN'
	| 'WARNED'
	| 'STATEMENT_EXPECTED'
	| 'BLOCKED'
export const VmAbuseStatusSchema: Type<VmAbuseStatus> = type(
	"'CLEAN' | 'WARNED' | 'STATEMENT_EXPECTED' | 'BLOCKED'",
)
