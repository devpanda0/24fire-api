import { type Type, type } from 'arktype'

//
// VM Password Reset
//
export type VmPasswordReset = {
	password: string
}
export const VmPasswordResetSchema: Type<VmPasswordReset> = type({
	password: 'string',
})
