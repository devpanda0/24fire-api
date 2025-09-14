import { type Type, type } from 'arktype'

export type KvmAbuseStatus =
	| 'CLEAN'
	| 'WARNED'
	| 'STATEMENT_EXPECTED'
	| 'BLOCKED'
export const KvmAbuseStatusSchema: Type<KvmAbuseStatus> = type(
	"'CLEAN' | 'WARNED' | 'STATEMENT_EXPECTED' | 'BLOCKED'",
)
