import { type Type, type } from 'arktype'

type VmReinstallRequest = { os?: string }
export const VmReinstallRequestSchema: Type<VmReinstallRequest> = type({
	'os?': 'string',
})

export type VmReinstall = null
export const VmReinstallSchema: Type<VmReinstall> = type.null
