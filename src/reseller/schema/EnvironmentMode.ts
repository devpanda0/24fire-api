import { type Type, type } from 'arktype'

export const EnvironmentMode: Type<'LIVE' | 'SANDBOX'> =
	type('"LIVE" | "SANDBOX"')
export type EnvironmentMode = typeof EnvironmentMode.infer
