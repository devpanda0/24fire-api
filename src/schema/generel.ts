import { type Type, type } from 'arktype'

export const EmptySchema: Type<Record<string, unknown>> = type.Record(
	'string',
	'unknown',
)
